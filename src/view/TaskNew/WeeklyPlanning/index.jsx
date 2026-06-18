import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Alert, Spinner, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import Topbar from '../../../components/Template/Topbar';
import Sidebar from '../../../components/Template/Sidebar';
import Main from '../../../components/Template/Main';
import WeeklyPlanningHeader from './components/WeeklyPlanningHeader';
import WeeklyPlanningGrid from './components/WeeklyPlanningGrid';
import ImportMastersModal from './components/ImportMastersModal';
import CalculationStats from './components/CalculationStats';
import { useWeeklyPlanningAPI, useBranches, useWeeklyPlanMasters } from './hooks/useWeeklyPlanningAPI';
import { useWeeklyPlanningState } from './hooks/useWeeklyPlanningState';
import { useCalculations } from './hooks/useCalculations';
import Swal from 'sweetalert2';

const ELEVATED_ROLES = ['super admin', 'director', 'manager'];

const WeeklyPlanning = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [currentPlanningUid, setCurrentPlanningUid] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const [recapData, setRecapData] = useState(null);
    const [recapLoading, setRecapLoading] = useState(false);
    const [recapError, setRecapError] = useState(null);

    // --- Role detection & target user (untuk Super Admin/Director/Manager) ---
    const roleName = (localStorage.getItem('role_name') || '').toLowerCase();
    const isElevatedRole = ELEVATED_ROLES.includes(roleName);

    const [selectedUser, setSelectedUser] = useState(null);
    const [userOptions, setUserOptions] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);

    const { branches, loading: branchesLoading, refetch: refetchBranches } = useBranches(); // Ambil fungsi refetch

    const { planMasters: weeklyPlanMasters, loading: planMastersLoading, createPlanMaster, refetch: refetchPlanMasters } = useWeeklyPlanMasters();

    const {
        loading: apiLoading,
        error,
        clearError,
        plannings,
        // weeks: apiWeeks, // Tidak dipakai langsung
        days: apiDays,
        details,
        outsideDetails,
        planningRecap,
    } = useWeeklyPlanningAPI();

    const {
        planning,
        weeks,
        updatePlanning,
        updateWeeks,
        updateDayInWeek,
        addPlanningDetailOptimistic,
        updateSingleDay,
        setActiveWeekUid,
        setActiveDayUid,
    } = useWeeklyPlanningState(null);

    const combinedPlanningData = useMemo(() => {
        if (!planning) {
            return null;
        }

        return {
            ...planning,
            weeks,
        };
    }, [planning, weeks]);

    const {
        getDashboardStats,
        hasSignificantData,
    } = useCalculations(combinedPlanningData);


    const loading = apiLoading || branchesLoading || planMastersLoading;

    const handleLoadOrCreatePlanning = useCallback(async () => {
        if (!selectedBranch?.value) {
            updatePlanning(null);
            updateWeeks([]);
            setCurrentPlanningUid(null);
            return;
        }

        // Kalau role elevated tapi belum pilih user, jangan fetch planning dulu
        if (isElevatedRole && !selectedUser?.value) {
            updatePlanning(null);
            updateWeeks([]);
            setCurrentPlanningUid(null);
            return;
        }

        clearError();

        try {
            const response = await plannings.getAll({
                branch_uid: selectedBranch.value,
                month: selectedMonth.getMonth() + 1,
                year: selectedMonth.getFullYear(),
                ...(isElevatedRole && selectedUser?.value ? { user_uid: selectedUser.value } : {}),
            });

            if (response && response.status === 'success' && response.data) {
                const planningsList = response?.data?.data;

                if (planningsList && planningsList.length > 0) {
                    const planningFromApi = planningsList[0];

                    updatePlanning({
                        uid: planningFromApi.uid,
                        branch_uid: planningFromApi.branch_uid,
                        status: planningFromApi.status,
                        week_name: planningFromApi.week_name,
                        week_start_date: planningFromApi.week_start_date,
                    });

                    // Set weeks
                    updateWeeks(planningFromApi.weeks || []);
                    setCurrentPlanningUid(planningFromApi.uid);
                } else {
                    updatePlanning(null);
                    updateWeeks([]);
                    setCurrentPlanningUid(null);
                }
            } else {
                // Reset jika response tidak sukses
                updatePlanning(null);
                updateWeeks([]);
                setCurrentPlanningUid(null);
            }
        } catch (err) {
            console.error('❌ Failed to load planning:', err);
            updatePlanning(null);
            updateWeeks([]);
            setCurrentPlanningUid(null);
        }
    }, [selectedBranch, selectedMonth, plannings, updatePlanning, updateWeeks, clearError]);

    const refetchPlanningData = useCallback(() => {
        handleLoadOrCreatePlanning();
    }, [handleLoadOrCreatePlanning]);

    useEffect(() => {
        handleLoadOrCreatePlanning();
    }, [handleLoadOrCreatePlanning]);

    // --- Ambil daftar user untuk dropdown, hanya kalau role login termasuk elevated ---
    useEffect(() => {
        if (!isElevatedRole) return;

        const fetchUsers = async () => {
            setUsersLoading(true);
            try {
                const token = localStorage.getItem('token'); // sesuaikan key-nya kalau berbeda di project ini
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/users`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const usersList = response?.data?.data || [];
                const options = usersList.map((u) => ({
                    value: u.uid,
                    label: u.name,
                }));
                setUserOptions(options);
            } catch (err) {
                console.error('❌ Failed to fetch users list:', err);
            } finally {
                setUsersLoading(false);
            }
        };

        fetchUsers();
    }, [isElevatedRole]);

    useEffect(() => {
        // Kalau role login termasuk elevated tapi belum pilih user, jangan fetch recap dulu
        if (isElevatedRole && !selectedUser?.value) {
            setRecapData(null);
            return;
        }

        // Jalankan hanya jika ada planning aktif
        if (currentPlanningUid && selectedBranch?.value) {
            setRecapLoading(true);
            setRecapError(null);

            // Format tanggal ke YYYY-MM-DD
            const monthString = selectedMonth.toISOString().split('T')[0];
            const branchUid = selectedBranch.value;
            const userUid = isElevatedRole ? selectedUser?.value : undefined;

            planningRecap
                .getRecap(monthString, branchUid, userUid)
                .then(response => {
                    setRecapData(response.data);
                })
                .catch(err => {
                    setRecapError(err.message || 'Failed to fetch recap');
                })
                .finally(() => {
                    setRecapLoading(false);
                });
        } else {
            // Jika tidak ada planning, reset data recap
            setRecapData(null);
        }
    }, [currentPlanningUid, selectedMonth, selectedBranch, planningRecap, weeks, isElevatedRole, selectedUser]);


    const handleCreatePlanning = useCallback(async () => {
        if (!selectedBranch?.value) return false;
        clearError();

        try {
            const response = await plannings.create({
                branch_uid: selectedBranch.value,
                month: selectedMonth.getMonth() + 1,
                year: selectedMonth.getFullYear(),
            });

            if (response && response.status === 'success' && response.data) {
                const newPlanningData = response.data; // Ambil data baru

                updatePlanning(newPlanningData); // Set metadata
                updateWeeks(newPlanningData.weeks || []); // Set weeks
                setCurrentPlanningUid(newPlanningData.uid);

                return true; // Sukses
            }

            console.error('❌ Create succeeded but no data returned from BE:', response);
            return false; // Gagal create
        } catch (err) {
            console.error('❌ Failed to create or initialize planning:', err);
            return false; // Gagal
        }

    }, [selectedBranch, selectedMonth, plannings, updatePlanning, updateWeeks, clearError]);



    const handleBranchChange = useCallback((selectedOption) => {
        setSelectedBranch(selectedOption);
    }, []);

    const handleMonthChange = useCallback((newMonth) => {
        setSelectedMonth(newMonth);
    }, []);

    const handleUserChange = useCallback((selectedOption) => {
        setSelectedUser(selectedOption);
    }, []);

    const refetchDayData = useCallback(async (weekUid, dayUid) => {
        if (!currentPlanningUid) return;
        try {
            const dayResponse = await apiDays.getById(currentPlanningUid, weekUid, dayUid);
            if (dayResponse.status === 'success') {
                updateDayInWeek(weekUid, dayUid, dayResponse.data);
            }
        } catch (err) {
            console.error("Failed to refetch day data:", err);
        }
    }, [currentPlanningUid, apiDays, updateDayInWeek]);

    const handleToggleWorkingDay = useCallback(async (weekUid, dayUid) => {
        try {
            // Panggil API hook
            const response = await apiDays.toggleWorking(currentPlanningUid, weekUid, dayUid);

            if (response && response.status === 'success' && response.data) {
                const updatedDayData = response.data; // Respons berisi objek Day baru

                // Panggil state updater
                updateSingleDay(weekUid, updatedDayData);
                // Opsional: Tampilkan notifikasi sukses (misal pakai SweetAlert)
                Swal.fire('Sukses!', `Status hari ${updatedDayData.day_name} diubah.`, 'success');
                return true;
            }
            return false;
        } catch (err) {
            console.error('❌ Failed to toggle day status:', err);
            // Opsional: Tampilkan notifikasi error
            Swal.fire('Error!', `Gagal mengubah status hari.`, 'error');
            return false;
        }
    }, [currentPlanningUid, apiDays, updateSingleDay]);

    const handleAddPlanningDetail = useCallback(async (weekUid, dayUid, detailData) => {
        try {
            const response = await details.create(currentPlanningUid, weekUid, dayUid, detailData);

            if (response && response.status === 'success' && response.data) {
                const newDetailData = response.data;

                updateSingleDay(weekUid, newDetailData);
                return true; // Sukses
            } else {
                console.error('❌ Create detail succeeded but no data returned:', response);
                return false;
            }
        } catch (err) {
            console.error('❌ Failed add detail:', err);
            return false;
        }
    }, [currentPlanningUid, details, updateSingleDay]);

    const handleUpdatePlanningDetail = useCallback(async (weekUid, dayUid, detailUid, updatedData) => {
        try {
            const response = await details.update(currentPlanningUid, weekUid, dayUid, detailUid, updatedData);

            if (response && response.status === 'success' && response.data) {
                const updatedDayData = response.data;

                updateSingleDay(weekUid, updatedDayData);

                return true;
            }
            return false;
        } catch (err) {
            console.error('❌ Failed update detail:', err);
            return false;
        }
    }, [currentPlanningUid, details, updateSingleDay]);

    const handleDeletePlanningDetail = useCallback(async (weekUid, dayUid, detailUid) => {
        try {
            const response = await details.delete(currentPlanningUid, weekUid, dayUid, detailUid);

            if (response && response.status === 'success' && response.data) {
                const updatedDayData = response.data;
                console.log('✅ Detail deleted. Updating single day state locally.');
                updateSingleDay(weekUid, updatedDayData);
                return true;
            }

            return false;

        } catch (err) {
            console.error('❌ Gagal menghapus detail (error tertangkap):', err);
            return false;
        } finally {
            console.log('--- Akhir handleDeletePlanningDetail ---');
        }
    }, [currentPlanningUid, details, updateSingleDay]);

    const handleAddOutsideDetail = useCallback(async (weekUid, dayUid, detailData) => {
        try {
            const response = await outsideDetails.create(currentPlanningUid, weekUid, dayUid, detailData);

            if (response && response.status === 'success' && response.data) {
                const updatedDayData = response.data;
                updateSingleDay(weekUid, updatedDayData);
                return true;
            }
            return false;

        } catch (err) {
            console.error('❌ Failed to add outside detail:', err);
        }
    }, [currentPlanningUid, outsideDetails, updateSingleDay]);

    const handleUpdateOutsideDetail = useCallback(async (weekUid, dayUid, detailUid, updatedData) => {
        try {
            const response = await outsideDetails.update(currentPlanningUid, weekUid, dayUid, detailUid, updatedData);

            if (response.status === 'success' && response.data) {
                const updatedDayData = response.data;
                updateSingleDay(weekUid, updatedDayData);
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ Failed to update outside detail:', error);
            return false;
        }
    }, [currentPlanningUid, outsideDetails, updateSingleDay]);

    const handleDeleteOutsideDetail = useCallback(async (weekUid, dayUid, detailUid) => {
        try {
            const response = await outsideDetails.delete(currentPlanningUid, weekUid, dayUid, detailUid);

            if (response.status === 'success' && response.data) {
                const updatedDayData = response.data;
                updateSingleDay(weekUid, updatedDayData);
                return true;
            }
            return false;
        } catch (err) {
            console.error('❌ Failed to delete outside detail:', err);
            return false;
        }
    }, [currentPlanningUid, outsideDetails, updateSingleDay]);

    const handleImportSuccess = () => {
        refetchPlanMasters();
        setShowImportModal(false);
    };

    if (error && !loading) {
        return (
            <>
                <Topbar />
                <div className="d-flex">
                    <Sidebar />
                    <Main>
                        <Container fluid className="p-4">
                            <Alert variant="danger" className="mt-3">
                                <Alert.Heading>Error Loading Data</Alert.Heading>
                                <p>{error}</p>
                                <Button onClick={() => refetchPlanningData()} variant="outline-danger" size="sm">Try Again</Button>
                                <Button onClick={clearError} variant="link" size="sm" className="ms-2">Dismiss</Button>
                            </Alert>
                        </Container>
                    </Main>
                </div>
            </>
        );
    }

    return (
        <>
            <Topbar />
            <div className="d-flex">
                <Sidebar />
                <Main>
                    <Container fluid className="p-4">
                        <Row className="mb-4">
                            <Col>
                                <h2 className="mb-0">Weekly Planning</h2>
                                <p className="text-muted mb-0">Manage your weekly planning and track performance</p>
                            </Col>
                        </Row>

                        <div className="mb-4">
                            {isElevatedRole && (
                                <Row className="mb-3">
                                    <Col md={4} xs={12}>
                                        <Form.Group className="mb-0">
                                            <Form.Label className="fw-semibold d-flex align-items-center gap-1">
                                                User
                                                <span style={{ color: "red" }} className="fs-6">*</span>
                                            </Form.Label>
                                            <Select
                                                options={userOptions}
                                                value={selectedUser}
                                                onChange={handleUserChange}
                                                isLoading={usersLoading}
                                                isClearable
                                                placeholder="Pilih user..."
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            )}

                            <WeeklyPlanningHeader
                                selectedBranch={selectedBranch}
                                selectedMonth={selectedMonth}
                                branches={branches}
                                onRefetchBranches={refetchBranches}
                                onBranchChange={handleBranchChange}
                                onMonthChange={handleMonthChange}
                                onCreatePlanning={handleCreatePlanning}
                                loading={loading}
                                hasExistingPlanning={!!currentPlanningUid}
                                onShowImportModal={() => setShowImportModal(true)}
                            />
                        </div>

                        {currentPlanningUid && (
                            <Row className="mb-4">
                                <Col>
                                    <CalculationStats
                                        recapData={recapData}
                                        isLoading={recapLoading}
                                        error={recapError}
                                    />
                                </Col>
                            </Row>
                        )}

                        {currentPlanningUid && loading && !error && (
                            <div className="text-center my-3"><Spinner size="sm" /> Loading stats...</div>
                        )}

                        {currentPlanningUid && !loading ? (
                            <Row>
                                <Col>
                                    <Card className="shadow-sm">
                                        <Card.Body>
                                            <WeeklyPlanningGrid
                                                planningData={combinedPlanningData}
                                                planningUid={currentPlanningUid}
                                                onAddPlanningDetail={handleAddPlanningDetail}
                                                onUpdatePlanningDetail={handleUpdatePlanningDetail}
                                                onDeletePlanningDetail={handleDeletePlanningDetail}
                                                onAddOutsideDetail={handleAddOutsideDetail}
                                                onUpdateOutsideDetail={handleUpdateOutsideDetail}
                                                onDeleteOutsideDetail={handleDeleteOutsideDetail}
                                                weeklyPlanMasters={weeklyPlanMasters}
                                                loading={loading}
                                                createPlanMaster={createPlanMaster}
                                                handleToggleWorkingDay={handleToggleWorkingDay}
                                            />

                                            <ImportMastersModal
                                                show={showImportModal}
                                                onHide={() => setShowImportModal(false)}
                                                onImportSuccess={handleImportSuccess}
                                            />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        ) : !selectedBranch && !loading ? (
                            <Row><Col><Card className="shadow-sm"><Card.Body className="text-center py-5">
                                <h4 className="text-muted mb-3">Select Branch</h4>
                                <p className="text-muted mb-0">Please select a branch to view or create weekly planning.</p>
                            </Card.Body></Card></Col></Row>
                        ) : !currentPlanningUid && selectedBranch && !loading ? (
                            <Row><Col><Card className="shadow-sm"><Card.Body className="text-center py-5">
                                <h4 className="text-muted mb-3">No Planning Found</h4>
                                <p className="text-muted mb-0">Click "Create" in the header to start planning for {selectedMonth?.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}.</p>
                            </Card.Body></Card></Col></Row>
                        ) : loading ? (
                            <div className="text-center my-5">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                <p className="mt-2">Loading planning data...</p>
                            </div>
                        ) : null}
                    </Container>
                </Main>
            </div>
        </>
    );
};

export default WeeklyPlanning;