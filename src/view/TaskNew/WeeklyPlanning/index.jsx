import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, Container, Row, Col, Alert, Spinner, Button } from 'react-bootstrap';
import Topbar from '../../../components/Template/Topbar';
import Sidebar from '../../../components/Template/Sidebar';
import Main from '../../../components/Template/Main';
import WeeklyPlanningHeader from './components/WeeklyPlanningHeader';
import WeeklyPlanningGrid from './components/WeeklyPlanningGrid';
import CalculationStats from './components/CalculationStats';
import { useWeeklyPlanningAPI, useBranches, useWeeklyPlanMasters } from './hooks/useWeeklyPlanningAPI';
import { useWeeklyPlanningState } from './hooks/useWeeklyPlanningState';
import { useCalculations } from './hooks/useCalculations';

const WeeklyPlanning = () => {
    // Local UI state
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [currentPlanningUid, setCurrentPlanningUid] = useState(null);

    // Data hooks
    const { branches, loading: branchesLoading } = useBranches();
    const { planMasters: weeklyPlanMasters, loading: planMastersLoading, createPlanMaster } = useWeeklyPlanMasters();

    // API hooks
    const {
        loading: apiLoading, // Rename biar gak bentrok dgn branchesLoading
        error,
        clearError,
        plannings,
        // weeks: apiWeeks, // Tidak dipakai langsung
        days: apiDays,   // Tidak dipakai langsung
        details,
        outsideDetails,
    } = useWeeklyPlanningAPI();

    // State management hook
    const {
        planning,
        weeks,
        updatePlanning,
        updateWeeks,
        updateDayInWeek,
        addPlanningDetailOptimistic,
        setActiveWeekUid, // Jika dipakai
        setActiveDayUid,   // Jika dipakai
    } = useWeeklyPlanningState(null); // Mulai null

    const combinedPlanningData = useMemo(() => {
        // Jika 'planning' (metadata) belum ada, kirim null
        if (!planning) {
            return null;
        }

        // Jika 'planning' ada, gabungkan dengan 'weeks'
        return {
            ...planning, // Sebar semua metadata (uid, status, dll)
            weeks,       // Tambahkan array 'weeks' dari state 'weeks'
        };
        }, [planning, weeks]); // <-- Dibuat ulang hanya jika planning atau weeks berubah

        // Calculations hook
        const {
        getDashboardStats,
        hasSignificantData,
        // ... ambil kalkulasi lain jika perlu
        } = useCalculations(combinedPlanningData); // ✅ BENAR: Kirim data gabungan


    // Gabungkan loading state
    const loading = apiLoading || branchesLoading || planMastersLoading;

    const handleLoadOrCreatePlanning = useCallback(async () => {
        if (!selectedBranch?.value) {
            // Jika belum ada cabang yang dipilih, reset state
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

            // ✅ SOLUSI: Pastikan 'response.data.data' dibaca dengan benar
            if (response && response.status === 'success' && response.data) {
                const planningsList = response?.data?.data;

                if (planningsList && planningsList.length > 0) {
                const planningFromApi = planningsList[0]; // Ambil planning pertama

                // Set metadata
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
                    // Reset jika tidak ada planning
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


    /**
     * ✅ SOLVED: Fungsi Refetch (wrapper handleLoadOrCreatePlanning)
     */
    const refetchPlanningData = useCallback(() => {
        handleLoadOrCreatePlanning();
    }, [handleLoadOrCreatePlanning]);

    /**
     * Trigger load saat branch/month berubah
     */
    useEffect(() => {
        handleLoadOrCreatePlanning(); // Panggil fungsi load/clear
    // ✅ Dependensi sudah benar (panggil fungsi dari useCallback)
    }, [handleLoadOrCreatePlanning]);

    useEffect(() => {
    console.log('📦 Fetching planning for', selectedBranch?.value, selectedMonth);
    }, [selectedBranch, selectedMonth]);

    const handleCreatePlanning = useCallback(async () => {
        if (!selectedBranch?.value) return false;
        clearError();

        try {
            // 1. Panggil API create — 'response' berisi data baru
            const response = await plannings.create({
            branch_uid: selectedBranch.value,
            month: selectedMonth.getMonth() + 1,
            year: selectedMonth.getFullYear(),
            });

            // 2. Pastikan create sukses dan 'data' ada
            if (response && response.status === 'success' && response.data) {
            const newPlanningData = response.data; // Ambil data baru
            console.log('✅ New planning created, updating state locally:', newPlanningData.uid);

            // 3. Update state lokal — tidak perlu refetch
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

        // ✅ Sesuaikan dependency: hapus 'handleLoadOrCreatePlanning'
    }, [selectedBranch, selectedMonth, plannings, updatePlanning, updateWeeks, clearError]);



    // --- Handlers Branch & Month Change (Sudah Benar) ---
    const handleBranchChange = useCallback((selectedOption) => {
        setSelectedBranch(selectedOption);
        // useEffect akan otomatis trigger handleLoadOrCreatePlanning
    }, []); // Hanya perlu setSelectedBranch

    const handleMonthChange = useCallback((newMonth) => {
        setSelectedMonth(newMonth);
         // useEffect akan otomatis trigger handleLoadOrCreatePlanning
    }, []); 

    const refetchDayData = useCallback(async (weekUid, dayUid) => {
    if (!currentPlanningUid) return;
    try {
        // Panggil API untuk get data 1 hari (asumsi ada endpointnya)
        const dayResponse = await apiDays.getById(currentPlanningUid, weekUid, dayUid); // Butuh getById di service & API hook
        if (dayResponse.status === 'success') {
            // Panggil fungsi di useWeeklyPlanningState untuk update HANYA hari itu
            updateDayInWeek(weekUid, dayUid, dayResponse.data); // Butuh fungsi ini di state hook
        }
    } catch (err) {
        console.error("Failed to refetch day data:", err);
    }
    }, [currentPlanningUid, apiDays, updateDayInWeek]); // Tambah dependensi yg relevan

    const handleAddPlanningDetail = useCallback(async (weekUid, dayUid, detailData) => {
        try {
            const response = await details.create(currentPlanningUid, weekUid, dayUid, detailData);

            if (response && response.status === 'success' && response.data) {
                const newDetailData = response.data;
                console.log('✅ Detail created, updating state locally:', newDetailData);

                addPlanningDetailOptimistic(weekUid, dayUid, newDetailData); 

                return true; // Sukses
            } else {
                console.error('❌ Create detail succeeded but no data returned:', response);
                return false; // Gagal (meski aneh jika status success tapi data kosong)
            }
        } catch(err) {
            console.error('❌ Failed add detail:', err);
            return false; // Gagal karena error API
        }
    // ✅ Hapus 'refetchDayData' dari dependency array
    }, [currentPlanningUid, details, addPlanningDetailOptimistic]);

    const handleUpdatePlanningDetail = useCallback(async (weekUid, dayUid, detailUid, updatedData) => {
        // ... (try catch call details.update -> refetchPlanningData) ...
        try {
            const response = await details.update(currentPlanningUid, weekUid, dayUid, detailUid, updatedData);
            if (response.status === 'success') { refetchPlanningData(); return true; } return false;
        } catch(err) { console.error('Failed update detail:', err); return false; }
    }, [currentPlanningUid, details, refetchPlanningData]);

    const handleDeletePlanningDetail = useCallback(async (weekUid, dayUid, detailUid) => {
        // ... (try catch call details.delete -> refetchPlanningData) ...
        try {
            const response = await details.delete(currentPlanningUid, weekUid, dayUid, detailUid);
            if (response.status === 'success') { refetchPlanningData(); return true; } return false;
        } catch(err) { console.error('Failed delete detail:', err); return false; }
    }, [currentPlanningUid, details, refetchPlanningData]);

    const handleAddOutsideDetail = useCallback(async (weekUid, dayUid, detailData) => {
         // ... (try catch call outsideDetails.create -> refetchPlanningData) ...
        try {
            const response = await outsideDetails.create(currentPlanningUid, weekUid, dayUid, detailData);
            if (response.status === 'success') { refetchPlanningData(); return true; } return false;
        } catch(err) { console.error('Failed add outside:', err); return false; }
    }, [currentPlanningUid, outsideDetails, refetchPlanningData]);

     const handleUpdateOutsideDetail = useCallback(async (weekUid, dayUid, detailUid, updatedData) => {
        try {
            const response = await outsideDetails.update(currentPlanningUid, weekUid, dayUid, detailUid, updatedData);
            if (response.status === 'success') {
                refetchPlanningData(); // ✅ Trigger refetch
                return true;
            }
            return false;
        } catch (error) { // ✅ Ganti 'err' jadi 'error' agar konsisten
            console.error('Failed to update outside detail:', error);
            return false;
        }
    // ✅ Tambahkan dependensi yg benar
    }, [currentPlanningUid, outsideDetails, refetchPlanningData]);

    // ✅ SOLVED: Handler Delete Outside Detail (Sudah pakai useCallback & dependensi)
    const handleDeleteOutsideDetail = useCallback(async (weekUid, dayUid, detailUid) => {
        try {
            const response = await outsideDetails.delete(currentPlanningUid, weekUid, dayUid, detailUid);
            if (response.status === 'success') {
                refetchPlanningData(); // ✅ Trigger refetch
                return true;
            }
            return false;
        } catch (err) { // ✅ Ganti 'err' jadi 'error' agar konsisten
            console.error('Failed to delete outside detail:', err);
            return false;
        }
    }, [currentPlanningUid, outsideDetails, refetchPlanningData]); // ✅ Dependensi benar

    /**
     * ✅ Render error state (Sudah Benar)
     * Menggunakan 'error' state dari useWeeklyPlanningAPI
     * Menyediakan tombol Try Again (refetch) dan Dismiss (clearError)
     */
    if (error && !loading) { // Tampilkan error hanya jika tidak loading
        return (
            <>
                <Topbar />
                <div className="d-flex">
                    <Sidebar />
                    <Main>
                        <Container fluid className="p-4"> {/* Tambah padding */}
                            <Alert variant="danger" className="mt-3">
                                <Alert.Heading>Error Loading Data</Alert.Heading>
                                <p>{error}</p> {/* Tampilkan pesan error dari state */}
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
            <Container fluid className="p-4"> {/* Standard padding */}
                <Row className="mb-4">
                    <Col>
                        <h2 className="mb-0">Weekly Planning</h2>
                        <p className="text-muted">Manage your weekly planning and track performance</p>
                    </Col>
                </Row>

                {/* ✅ Render Header dengan props yg benar (termasuk loading gabungan) */}
                <WeeklyPlanningHeader
                    selectedBranch={selectedBranch}
                    selectedMonth={selectedMonth}
                    branches={branches}
                    // weeklyPlanMasters={weeklyPlanMasters} // Prop ini tidak dipakai header lagi
                    onBranchChange={handleBranchChange}
                    onMonthChange={handleMonthChange}
                    onCreatePlanning={handleCreatePlanning} // Handler create yg solved
                    // onCreatePlanMaster={createPlanMaster} // Prop ini tidak dipakai header lagi
                    loading={loading} // Prop loading gabungan (sudah benar)
                    hasExistingPlanning={!!currentPlanningUid} // Flag status (sudah benar)
                />
                {currentPlanningUid && hasSignificantData && ( // Tambah cek currentPlanningUid
                    <Row className="mb-4">
                        <Col>
                            <CalculationStats
                                dashboardStats={getDashboardStats} // Kirim hasil hook kalkulasi
                                // planning={planning} // Prop ini tidak dipakai CalculationStats lagi
                            />
                        </Col>
                    </Row>
                )}
                
                {/* Tampilkan Loading Stats jika sedang load tapi sudah ada planning */}
                {currentPlanningUid && loading && !error && (
                    <div className="text-center my-3"><Spinner size="sm"/> Loading stats...</div>
                )}


                {/* ✅ Render Grid atau Pesan "No Planning" (kondisional benar) */}
                {currentPlanningUid && !loading ? ( // Tampilkan grid jika ada UID & tidak loading
                    <Row>
                        <Col>
                            <Card className="shadow-sm"> {/* Styling konsisten */}
                                <Card.Body>
                                    {/* ✅ Render Grid dengan props yg benar (tanpa onUpdateWeek/Day) */}
                                    <WeeklyPlanningGrid
                                        planningData={combinedPlanningData} // Kirim object planning lengkap
                                        planningUid={currentPlanningUid}
                                        // 🗑️ Hapus onUpdateWeek & onUpdateDay
                                        onAddPlanningDetail={handleAddPlanningDetail}
                                        onUpdatePlanningDetail={handleUpdatePlanningDetail}
                                        onDeletePlanningDetail={handleDeletePlanningDetail}
                                        onAddOutsideDetail={handleAddOutsideDetail}
                                        onUpdateOutsideDetail={handleUpdateOutsideDetail}
                                        onDeleteOutsideDetail={handleDeleteOutsideDetail}
                                        weeklyPlanMasters={weeklyPlanMasters} // Kirim masters untuk modal di grid
                                        loading={loading} // Kirim loading state (meski mungkin tdk dipakai grid)
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ) : !selectedBranch && !loading ? ( // Pesan jika branch belum dipilih
                    <Row> <Col> <Card> <Card.Body className="text-center py-5">
                        <h4 className="text-muted mb-3">Select Branch</h4>
                        <p className="text-muted">Please select a branch to view or create weekly planning.</p>
                    </Card.Body> </Card> </Col> </Row>
                ) : !currentPlanningUid && selectedBranch && !loading ? ( // Pesan jika branch dipilih TAPI belum ada planning (sebelum create)
                        <Row> <Col> <Card> <Card.Body className="text-center py-5">
                            <h4 className="text-muted mb-3">No Planning Found</h4>
                            <p className="text-muted">Click "Create" in the header to start planning for {selectedMonth?.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}.</p>
                        </Card.Body> </Card> </Col> </Row>
                    ) : loading ? ( // Tampilkan loading utama jika sedang fetch awal
                        <div className="text-center my-5">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <p className="mt-2">Loading planning data...</p>
                        </div>
                    ) : null /* Fallback jika ada kondisi lain */
                }
            </Container>
        </Main>
    </div>
    </>
  );
};

export default WeeklyPlanning;
