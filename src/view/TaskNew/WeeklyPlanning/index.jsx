import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, Container, Row, Col, Alert, Spinner, Button } from 'react-bootstrap';
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

const WeeklyPlanning = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [currentPlanningUid, setCurrentPlanningUid] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const [recapData, setRecapData] = useState(null);
    const [recapLoading, setRecapLoading] = useState(false);
    const [recapError, setRecapError] = useState(null);

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
        console.log('[useMemo] Recalculating combinedPlanningData...'); // <-- Log ini
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

        clearError();

        try {
            const response = await plannings.getAll({
            branch_uid: selectedBranch.value,
            month: selectedMonth.getMonth() + 1,
            year: selectedMonth.getFullYear(),
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

                console.log('✅ Planning data loaded from BE:', planningFromApi.uid);
                } else {
                    updatePlanning(null);
                    updateWeeks([]);
                    setCurrentPlanningUid(null);
                    console.log('ℹ️ No existing planning found, ready to create');
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

    useEffect(() => {
    console.log('📦 Fetching planning for', selectedBranch?.value, selectedMonth);
    }, [selectedBranch, selectedMonth]);

    useEffect(() => {
        // Jalankan hanya jika ada planning aktif
        if (currentPlanningUid) {
            setRecapLoading(true);
            setRecapError(null);

            // Format tanggal ke YYYY-MM-DD
            const monthString = selectedMonth.toISOString().split('T')[0];

            planningRecap
            .getRecap(monthString)
            .then(response => {
                // Simpan objek recap dari response
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
        }, [currentPlanningUid, selectedMonth, planningRecap, weeks]);


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
            console.log('✅ New planning created, updating state locally:', newPlanningData.uid);

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
            console.log(`Toggling working status for day: ${dayUid}`);
            // Panggil API hook
            const response = await apiDays.toggleWorking(currentPlanningUid, weekUid, dayUid);

            if (response && response.status === 'success' && response.data) {
                const updatedDayData = response.data; // Respons berisi objek Day baru
                console.log('✅ Day status toggled. Updating state:', updatedDayData.uid);
                console.log('[HANDLER] Data Day dari API:', JSON.stringify(updatedDayData, null, 2));
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
                console.log('✅ Detail created, updating state locally:', newDetailData);

                updateSingleDay(weekUid, newDetailData);
                return true; // Sukses
            } else {
                console.error('❌ Create detail succeeded but no data returned:', response);
                return false;
            }
        } catch(err) {
            console.error('❌ Failed add detail:', err);
            return false;
        }
    }, [currentPlanningUid, details, updateSingleDay]);

    const handleUpdatePlanningDetail = useCallback(async (weekUid, dayUid, detailUid, updatedData) => {
        try {
            const response = await details.update(currentPlanningUid, weekUid, dayUid, detailUid, updatedData);

            if (response && response.status === 'success' && response.data) {
                const updatedDayData = response.data;
                console.log('✅ Detail updated. Updating single day state locally:', updatedDayData.uid);
                updateSingleDay(weekUid, updatedDayData); 

                return true;
            } 
            return false;
        } catch(err) { 
            console.error('❌ Failed update detail:', err); 
            return false; 
        }
    }, [currentPlanningUid, details, updateSingleDay]);

    const handleDeletePlanningDetail = useCallback(async (weekUid, dayUid, detailUid) => { 
        try {
            console.log('Memanggil API details.delete...');
            const response = await details.delete(currentPlanningUid, weekUid, dayUid, detailUid); 

            if (response && response.status === 'success' && response.data) {
                const updatedDayData = response.data;
                console.log('✅ Detail deleted. Updating single day state locally.');
                updateSingleDay(weekUid, updatedDayData); 
                return true;
            } 
            
            console.warn('Delete sukses tapi BE tidak mengirim data day baru:', response);
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

            console.log(`Attempting DELETE Outside Detail: 
            Planning UID: ${currentPlanningUid}
            Week UID: ${weekUid}
            Day UID: ${dayUid}
            Outside Detail UID: ${detailUid}`);

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
        console.log("Impor sukses! Me-refetch data master...");
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

    console.log('Weekly planning master', weeklyPlanMasters);

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
                        <p className="text-muted">Manage your weekly planning and track performance</p>
                    </Col>
                </Row>

                <WeeklyPlanningHeader
                    selectedBranch={selectedBranch}
                    selectedMonth={selectedMonth}
                    branches={branches}
                    onRefetchBranches={refetchBranches}
                    // weeklyPlanMasters={weeklyPlanMasters} // Prop ini tidak dipakai header lagi
                    onBranchChange={handleBranchChange}
                    onMonthChange={handleMonthChange}
                    onCreatePlanning={handleCreatePlanning} 
                    // onCreatePlanMaster={createPlanMaster} // Prop ini tidak dipakai header lagi
                    loading={loading} 
                    hasExistingPlanning={!!currentPlanningUid} 
                    onShowImportModal={() => setShowImportModal(true)}
                />
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

                
                {/* Tampilkan Loading Stats jika sedang load tapi sudah ada planning */}
                {currentPlanningUid && loading && !error && (
                    <div className="text-center my-3"><Spinner size="sm"/> Loading stats...</div>
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
                    <Row> <Col> <Card> <Card.Body className="text-center py-5">
                        <h4 className="text-muted mb-3">Select Branch</h4>
                        <p className="text-muted">Please select a branch to view or create weekly planning.</p>
                    </Card.Body> </Card> </Col> </Row>
                ) : !currentPlanningUid && selectedBranch && !loading ? (
                        <Row> <Col> <Card> <Card.Body className="text-center py-5">
                            <h4 className="text-muted mb-3">No Planning Found</h4>
                            <p className="text-muted">Click "Create" in the header to start planning for {selectedMonth?.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}.</p>
                        </Card.Body> </Card> </Col> </Row>
                    ) : loading ? (
                        <div className="text-center my-5">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <p className="mt-2">Loading planning data...</p>
                        </div>
                    ) : null 
                }
            </Container>
        </Main>
    </div>
    </>
  );
};

export default WeeklyPlanning;
