import React, { useState, useMemo, useCallback } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Table, 
  Button, 
  Form, 
  Modal, 
  Alert,
  Badge,
  Spinner,
  OverlayTrigger,
  Tooltip,
  Tabs, 
  Tab,
    ListGroup

} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faCalendarWeek,
  faCalendarDay,
  faChartLine,
  faEye,
  faExternalLinkAlt,
  faClipboardList,
  
} from '@fortawesome/free-solid-svg-icons';

// Utils
import { formatDate } from '../utils/dateUtils';
import { calculateWeekStatistics, calculatePlanningStatistics, getPerformanceIndicator, formatPercentage } from '../utils/calculationUtils';
// Child components
import PlanningDetailModal from './PlanningDetailModal';
import OutsideActivityModal from './OutsideActivityModal';

const getDefaultCalculations = () => ({
  total_weekly_plan: 0, total_weekly_report: 0, daily_planning_pct: 0,
  total_outside: 0, daily_outside_pct: 0, total_report: 0,
});

const WeeklyPlanningGrid = ({
  planningData,
  planningUid,
  onUpdateWeek,
  onUpdateDay,
  onAddPlanningDetail,
  onUpdatePlanningDetail,
  onDeletePlanningDetail,
  onAddOutsideDetail,
  onUpdateOutsideDetail,
  onDeleteOutsideDetail,
  weeklyPlanMasters = [],
  loading = false,
  createPlanMaster
}) => {

    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showOutsideModal, setShowOutsideModal] = useState(false);
    const [editingDetail, setEditingDetail] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    
    const handleSavePlanningDetail = async (formData, editingDetail) => {
        setModalLoading(true);
        try {
            let success = false;
            if (editingDetail) {
                success = await onUpdatePlanningDetail(
                    selectedWeek?.uid,
                    selectedDay?.uid,
                    editingDetail.uid,
                    formData
                );
            } else {
                success = await onAddPlanningDetail(
                    selectedWeek?.uid,
                    selectedDay?.uid,
                    formData
                );
            }
            setModalLoading(false);
            if (success) {
                handleCloseModals();
            }
            return success; 
        } catch (error) {
            console.error('Failed to save planning detail:', error);
            setModalLoading(false);
            return false;
        }
    };

    const handleSaveOutsideActivity = async (formData, editingDetail) => {
        setModalLoading(true);
        try {
            let success = false;
            if (editingDetail) {
                success = await onUpdateOutsideDetail(
                    selectedWeek?.uid,
                    selectedDay?.uid,
                    editingDetail.uid,
                    formData
                );
            } else {
                success = await onAddOutsideDetail(
                    selectedWeek?.uid,
                    selectedDay?.uid,
                    formData
                );
            }
            setModalLoading(false);
            if (success) {
                handleCloseModals();
            }
            return success;
        } catch (error) {
            console.error('Failed to save outside activity:', error);
            setModalLoading(false);
            return false;
        }
    };

    const handleOpenDetailModal = (week, day, detail = null) => {
        setSelectedWeek(week);
        setSelectedDay(day);
        setEditingDetail(detail);
        setShowDetailModal(true);
    };

    const handleOpenOutsideModal = (week, day, detail = null) => {
        setSelectedWeek(week);
        setSelectedDay(day);
        setEditingDetail(detail); 
        setShowOutsideModal(true);
    };

    const handleCloseModals = () => {
        setShowDetailModal(false);
        setShowOutsideModal(false);
        setSelectedWeek(null);
        setSelectedDay(null);
        setEditingDetail(null);
        // setModalLoading(false);
    };

    const renderWeekHeader = (week) => {
        console.log("Week Statistics: ", week.statistics);
        const stats = week.statistics || { 
            total_weekly_plan: 0,
            total_weekly_report: 0,
            total_outside: 0,
            week_planning_pct: 0,
            week_outside_pct: 0,
        };
        const performance = stats.week_planning_pct !== undefined
            ? getPerformanceIndicator(stats.week_planning_pct)
            : { color: 'secondary', label: 'N/A' };

        return (
        <Card className="mb-3 border-primary">
            <Card.Header className="bg-primary text-white">
            <Row className="align-items-center">
                <Col md={4}> {/* Info Week */}
                <h6 className="mb-0">
                    <FontAwesomeIcon icon={faCalendarWeek} className="me-2" />
                    {/* ✅ Akses nama & nomor minggu dari data week */}
                    {week.week_name || `Week ${week.week_number}`}
                </h6>
                <small>
                    {/* ✅ Akses tanggal & format (asumsi formatDate ada) */}
                    {formatDate(new Date(week.start_date || week.week_start_date))} - {formatDate(new Date(week.end_date || week.week_end_date))}
                </small>
                </Col>
                <Col md={6}> {/* Statistik Week */}
                <Row className="text-center">
                    <Col>
                    <small>Plan</small>
                    {/* ✅ Gunakan key yg benar: total_weekly_plan */}
                    <div className="fw-bold">{stats.total_weekly_plan || 0}</div>
                    </Col>
                    <Col>
                    <small>Report</small>
                    {/* ✅ Gunakan key yg benar: total_weekly_report */}
                    <div className="fw-bold">{stats.total_weekly_report || 0}</div>
                    </Col>
                    <Col>
                    <small>Outside</small>
                    {/* ✅ Gunakan key yg benar: total_outside */}
                    <div className="fw-bold">{stats.total_outside || 0}</div>
                    </Col>
                    <Col>
                    <small>% Plan</small>
                    {/* ✅ Gunakan key yg benar & format (asumsi formatPercentage ada) */}
                    <div className="fw-bold">{formatPercentage(stats.week_planning_pct)}</div>
                    </Col>
                    <Col>
                    <small>% Outside</small>
                    {/* ✅ Gunakan key yg benar & format */}
                    <div className="fw-bold">{formatPercentage(stats.week_outside_pct)}</div>
                    </Col>
                    <Col>
                    <small>Perf.</small>
                    {/* ✅ Gunakan hasil getPerformanceIndicator */}
                    <div><Badge bg={performance.color}>{performance.label}</Badge></div>
                    </Col>
                </Row>
                </Col>
                <Col md={2} className="text-end">
                <small className="text-muted">
                    {/* ✅ Akses jumlah hari */}
                    Days: {week.days?.length || 0}
                </small>
                </Col>
            </Row>
            </Card.Header>
        </Card>
        );
    };


    const renderDayColumn = (week, day) => {
        // --- Data Preparation (Tetap Sama) ---
        const stats = day.calculations || getDefaultCalculations();
        const planningDetails = day.weeklyPlanningDetails || [];
        const outsideDetails = day.outsidePlanningDetails || [];

        // Tentukan key default untuk Tab (pilih "Planning" jika ada, jika tidak, "Outside")
        const defaultTabKey = planningDetails.length > 0 ? "planning" : "outside";

        // --- JSX Rombakan ---
        return (
            <Card className="h-100 shadow-sm day-card"> {/* Tambah class & shadow */}
                {/* 1. Header Ringkas (Sama seperti Konsep 1) */}
                <Card.Header className="d-flex justify-content-between align-items-center py-2 bg-light">
                    <div>
                        <h6 className="mb-0">{day.day_name}</h6>
                        <small className="text-muted">
                            {formatDate(new Date(day.day_date))}
                        </small>
                    </div>
                    <div className="btn-group" role="group">
                        <OverlayTrigger overlay={<Tooltip>Add Planning Detail</Tooltip>}>
                            <Button variant="outline-primary" size="sm" onClick={() => handleOpenDetailModal(week, day)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Add Outside Activity</Tooltip>}>
                            <Button variant="outline-warning" size="sm" onClick={() => handleOpenOutsideModal(week, day)}>
                                <FontAwesomeIcon icon={faExternalLinkAlt} /> 
                            </Button>
                        </OverlayTrigger>
                    </div>
                </Card.Header>

                {/* 2. Body Kartu (TANPA Ringkasan Cepat, langsung Tabs) */}
                <Card.Body className="p-0 d-flex flex-column"> {/* Padding 0, Tabs akan handle padding internal */}
                
                    {/* 3. Area Konten Utama (Tabbed) */}
                    {/* Gunakan unmountOnExit agar konten tab tidak dirender jika tidak aktif */}
                    <Tabs defaultActiveKey={defaultTabKey} id={`day-tabs-${day.uid}`} className="day-card-tabs px-3 pt-2" fill unmountOnExit> 
                        
                        {/* Tab Planning Details */}
                        <Tab 
                            eventKey="planning" 
                            // Judul Tab dengan jumlah item
                            title={
                                <span>
                                    <FontAwesomeIcon icon={faClipboardList} className="me-1"/> Plan 
                                    <Badge pill bg="primary" className="ms-1">{planningDetails.length}</Badge> 
                                </span>
                            }
                            disabled={planningDetails.length === 0} // Disable jika kosong
                            className="p-3 details-area" // Padding di dalam tab, kelas untuk styling scroll
                            style={{ overflowY: 'auto', maxHeight: '250px', flexGrow: 1 }} // Style scroll & tinggi
                        >
                            {planningDetails.length === 0 ? (
                                <p className="text-muted text-center small mt-3">No planned activities.</p>
                            ) : (
                                // Render list planning details (mirip Konsep 1, pakai ListGroup)
                                <ListGroup variant="flush">
                                    {planningDetails.map((detail) => (
                                        <ListGroup.Item key={detail.uid} className="d-flex justify-content-between align-items-start px-0 py-1">
                                            <div className="flex-grow-1 me-2">
                                                <span className="d-block">{detail.weekly_plan_text || 'No plan'}</span>
                                                {detail.weekly_report_text && (
                                                    <small className="text-success d-block">
                                                        <Badge bg="success" className="me-1">R</Badge> {detail.weekly_report_text}
                                                    </small>
                                                )}
                                                {detail.plan_notes && <small className="text-muted d-block fst-italic">P-Note: {detail.plan_notes}</small>}
                                                {detail.report_notes && <small className="text-muted d-block fst-italic">R-Note: {detail.report_notes}</small>}
                                            </div>
                                            <div className="btn-group">
                                                <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                                                    <Button variant="outline-secondary" size="sm" onClick={() => handleOpenDetailModal(week, day, detail)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                                                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteDetail(week.uid, day.uid, detail.uid)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Tab>

                        {/* Tab Outside Activities */}
                        <Tab 
                            eventKey="outside" 
                            title={
                                <span>
                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="me-1"/> Outside 
                                    <Badge pill bg="warning" text="dark" className="ms-1">{outsideDetails.length}</Badge> 
                                </span>
                            }
                            disabled={outsideDetails.length === 0}
                            className="p-3 details-area"
                            style={{ overflowY: 'auto', maxHeight: '250px', flexGrow: 1 }}
                        >
                            {outsideDetails.length === 0 ? (
                                <p className="text-muted text-center small mt-3">No outside activities.</p>
                            ) : (
                                // Render list outside activities (mirip Konsep 1, pakai ListGroup)
                                <ListGroup variant="flush">
                                    {outsideDetails.map((outside) => (
                                        <ListGroup.Item key={outside.uid} className="d-flex justify-content-between align-items-start px-0 py-1">
                                            <div className="flex-grow-1 me-2">
                                                <span className="d-block">{outside.activity_text || 'No description'}</span>
                                                {outside.notes && <small className="text-muted d-block fst-italic">Note: {outside.notes}</small>}
                                            </div>
                                            <div className="btn-group">
                                                <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                                                    <Button variant="outline-secondary" size="sm" onClick={() => handleOpenOutsideModal(week, day, outside)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                                                    <Button variant="outline-danger" size="sm" onClick={() => onDeleteOutsideDetail(week.uid, day.uid, outside.uid)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Tab>
                    </Tabs>

                    {/* 4. Footer (Hanya Achievement) */}
                    <Card.Footer className="py-1 bg-light mt-auto"> {/* mt-auto dorong ke bawah */}
                        <Row className="text-center">
                            <Col>
                                <small className="text-muted">Achievement:</small>
                                <div className={`fw-bold text-${stats.daily_planning_pct >= 80 ? 'success' : stats.daily_planning_pct >= 60 ? 'warning' : 'danger'}`}>
                                    {`${stats.daily_planning_pct || 0}%`}
                                </div>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card.Body>
            </Card>
        );
    };

    const renderWeekSummary = (week) => {
        const totalOutsideActivities = week.statistics?.total_outside || 0;

        if (totalOutsideActivities === 0) return null;

        return (
        <Alert variant="warning" className="mb-3">
            <Row className="align-items-center">
            <Col>
                <small>
                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                <strong>Week Summary:</strong> {totalOutsideActivities} outside activities across all days
                </small>
            </Col>
            </Row>
        </Alert>
        );
    };

    /**
     * Handle delete planning detail (Wrapper for prop function)
     */
    const handleDeleteDetail = async (week, day, detail) => {
        // ✅ Konfirmasi sebelum delete
        if (window.confirm('Are you sure you want to delete this planning detail?')) {
        try {
            // ✅ Panggil prop dari index.jsx (yang sudah handle refetch)
            await onDeletePlanningDetail(week.uid, day.uid, detail.uid);
        } catch (error) {
            console.error('Failed to delete planning detail:', error);
            // Error handling bisa ditambahkan di sini atau di index.jsx
        }
        }
    };
    
    const handleDeleteOutsideDetail = async (week, day, detail) => {
        // ✅ Konfirmasi sebelum delete
        if (window.confirm('Are you sure you want to delete this outside activity?')) {
        try {
            // ✅ Panggil prop dari index.jsx (yang sudah handle refetch)
            await onDeleteOutsideDetail(week.uid, day.uid, detail.uid);
        } catch (error) {
            console.error('Failed to delete outside detail:', error);
            // Error handling bisa ditambahkan di sini atau di index.jsx
        }
        }
    };

    // ✅ Loading state (sudah benar)
    if (loading) {
        return (
        <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading planning data...</p>
        </div>
        );
    }

    // ✅ No data state (sudah benar, cek planningData.weeks)
    if (!planningData || !planningData.weeks || planningData.weeks.length === 0) {
        console.log('WeeklyPlanningGrid: Merender "No Planning Data"');
        return (
            
        <Alert variant="info" className="text-center">
            <FontAwesomeIcon icon={faCalendarWeek} size="2x" className="mb-3 opacity-50" />
            <h5>No Planning Data</h5>
            <p>Please select a branch and month to view or create weekly planning.</p>
        </Alert>
        );
    }


    console.log("Planning Data: ", planningData);

    return (
    <>
    <div className="weekly-planning-grid">
        {planningData.weeks?.map((week, weekIndex) => {
            // ✅ Bagian 1: Bagi array 'days' menjadi dua (maks 3 per baris)
            const daysInWeek = week.days || [];
            const daysRow1 = daysInWeek.slice(0, 3); // Ambil 3 hari pertama (Senin, Selasa, Rabu)
            const daysRow2 = daysInWeek.slice(3);   // Ambil sisanya (Kamis, Jumat, Sabtu)

            return (
                <div key={week.uid || weekIndex} className="week-section mb-4">
                {/* Header Minggu */}
                {renderWeekHeader(week)}
                {/* Summary Minggu */}
                {renderWeekSummary(week)}

                {/* ✅ Gunakan row-cols untuk mengatur jumlah kolom per baris */}
                {/* xs=1 (1 kolom di HP), sm=2 (2 kolom di tablet kecil), md=3 (3 kolom di tablet besar dst) */}
                {/* g-3 menambahkan gutter (jarak) antar kolom */}
                <Row xs={1} sm={2} md={3} className="g-3"> 
                    {daysInWeek.map((day, dayIndex) => (
                        // ✅ Col tidak perlu ukuran spesifik lagi, Row yang mengatur
                        <Col key={day.uid || dayIndex}> 
                            {renderDayColumn(week, day)}
                        </Col>
                    ))}
                </Row>

                {/* 🗑️ HAPUS logic pembagian daysRow1 & daysRow2, serta Row kedua */}
                
            </div>
            );
        })}

        <PlanningDetailModal
            show={showDetailModal}
            onHide={handleCloseModals}
            onSave={handleSavePlanningDetail}
            editingDetail={editingDetail}
            selectedWeek={selectedWeek}
            selectedDay={selectedDay}
            weeklyPlanMasters={weeklyPlanMasters}
            loading={modalLoading}
            createPlanMaster={createPlanMaster}
        />

        <OutsideActivityModal
            show={showOutsideModal}
            onHide={handleCloseModals}
            onSave={handleSaveOutsideActivity}
            editingDetail={editingDetail}
            selectedWeek={selectedWeek}
            selectedDay={selectedDay}
            loading={modalLoading}
        />
    </div>
    </>
    );
};

export default WeeklyPlanningGrid;
