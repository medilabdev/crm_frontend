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
  faCalendarCheck,
  faCalendarTimes,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
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
  createPlanMaster,
  handleToggleWorkingDay
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
        const stats = day.calculations || getDefaultCalculations();
        const planningDetails = day.weeklyPlanningDetails || [];
        const outsideDetails = day.outsidePlanningDetails || [];

        const defaultTabKey = planningDetails.length > 0 ? "planning" : (outsideDetails.length > 0 ? "outside" : "planning");
        return (
            <Card className="h-100 shadow-sm day-card"> 
                <Card.Header className="d-flex justify-content-between align-items-center py-2 bg-light">
                    <div>
                        <h6 className="mb-0 d-inline-block">
                            {day.day_name}
                            {!day.is_working_day && ( 
                                <Badge bg="secondary" pill className="ms-2" title="Hari Libur">
                                    Libur 
                                </Badge>
                            )}
                        </h6>
                        <small className="text-muted d-block">
                            {formatDate(new Date(day.day_date))}
                        </small>
                    </div>
                    <div className="btn-group" role="group">
                        <OverlayTrigger overlay={<Tooltip>Add Planning Detail</Tooltip>}>
                            <Button variant="outline-primary" size="sm" onClick={() => handleOpenDetailModal(week, day)} disabled={!day.is_working_day}> 
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Add Outside Activity</Tooltip>}>
                            <Button variant="outline-warning" size="sm" onClick={() => handleOpenOutsideModal(week, day)} disabled={!day.is_working_day}>
                                <FontAwesomeIcon icon={faExternalLinkAlt} /> 
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>{day.is_working_day ? 'Tandai Libur' : 'Tandai Hari Kerja'}</Tooltip>}>
                            <Button 
                                variant={day.is_working_day ? "outline-secondary" : "outline-success"} 
                                size="sm" 
                                onClick={() => handleToggleWorkingDay(week.uid, day.uid)} 
                            >
                                <FontAwesomeIcon icon={day.is_working_day ? faCalendarTimes : faCalendarCheck} /> 
                            </Button>
                        </OverlayTrigger>
                    </div>
                </Card.Header>

                <Card.Body className="p-0 d-flex flex-column">
                    <Tabs 
                        defaultActiveKey={defaultTabKey} 
                        id={`day-tabs-${day.uid}`} 
                        className="day-card-tabs px-3 pt-2 flex-shrink-0"
                        justify 
                        unmountOnExit
                    > 
                        <Tab 
                            eventKey="planning" 
                            title={
                                <span title="Planning Details"> 
                                    <FontAwesomeIcon icon={faClipboardList} className="me-1"/> 
                                    <span className="d-none d-lg-inline">Plan</span>
                                    <Badge pill bg="primary" className="ms-1">{planningDetails.length}</Badge> 
                                </span>
                            }
                            // disabled={planningDetails.length === 0} 
                            className="p-3 details-area" 
                            style={{ overflowY: 'auto', flexGrow: 1 }}
                        >
                            {planningDetails.length === 0 ? (
                                <p className="text-muted text-center small mt-3 mb-0">No planned activities.</p>
                            ) : (
                                <ListGroup variant="flush">
                                    {planningDetails.map((detail) => (
                                        <ListGroup.Item key={detail.uid} className="d-flex justify-content-between align-items-center px-0 py-1">
                                            <div className="flex-grow-1 me-2" style={{wordBreak: 'break-word'}}> 
                                                <span className="d-block">{detail.weekly_plan_text || 'No plan'}</span>
                                                {detail.weekly_report_text && (
                                                    <small className="text-success d-block">
                                                        <Badge bg="success" className="me-1" pill>R</Badge> {detail.weekly_report_text}
                                                    </small>
                                                )}
                                                {detail.plan_notes && <small className="text-muted d-block fst-italic ms-1" title={detail.plan_notes}>P-Note: {(detail.plan_notes || '').substring(0, 30)}...</small>}
                                                {detail.report_notes && <small className="text-muted d-block fst-italic ms-1" title={detail.report_notes}>R-Note: {(detail.report_notes || '').substring(0, 30)}...</small>}
                                            </div>
                                            <div className="btn-group flex-shrink-0">
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

                        <Tab 
                            eventKey="outside" 
                            title={
                                <span title="Outside Activities">
                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="me-1"/> 
                                    <span className="d-none d-lg-inline">Outside</span>
                                    <Badge pill bg="warning" text="dark" className="ms-1">{outsideDetails.length}</Badge> 
                                </span>
                            }
                            // disabled={outsideDetails.length === 0}
                            className="p-3 details-area"
                            style={{ overflowY: 'auto', flexGrow: 1 }}
                        >
                            {outsideDetails.length === 0 ? (
                                <p className="text-muted text-center small mt-3 mb-0">No outside activities.</p>
                            ) : (
                                <ListGroup variant="flush">
                                    {outsideDetails.map((outside) => (
                                        <ListGroup.Item key={outside.uid} className="d-flex justify-content-between align-items-center px-0 py-1">
                                            <div className="flex-grow-1 me-2" style={{wordBreak: 'break-word'}}>
                                                <span className="d-block">{outside.activity_text || 'No description'}</span>
                                                {outside.notes && <small className="text-muted d-block fst-italic ms-1" title={outside.notes}>Note: {(outside.notes || '').substring(0, 30)}...</small>}
                                            </div>
                                            <div className="btn-group flex-shrink-0">
                                                <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                                                    <Button variant="outline-secondary" size="sm" onClick={() => handleOpenOutsideModal(week, day, outside)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                                                    <Button variant="outline-danger" size="sm" onClick={() => confirmDeleteOutsideDetail(week.uid, day.uid, outside.uid, outside.activity_text)}>
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

                    <Card.Footer className="py-1 bg-light mt-auto">
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

    const handleDeleteDetail = async (week, day, detail) => {
        Swal.fire({
            title: 'Hapus Detail Planning?',
            text: `Anda yakin ingin menghapus plan "${detail.weekly_plan_text || 'ini'}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', 
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then(async (result) => { 
            if (result.isConfirmed) {
                try {
                    console.log(`Mencoba hapus Planning Detail UID: ${detail.uid}`);
                    await onDeletePlanningDetail(week.uid, day.uid, detail.uid);
                    Swal.fire(
                        'Dihapus!',
                        'Detail planning berhasil dihapus.',
                        'success'
                    );
                } catch (error) {
                    console.error('Gagal menghapus planning detail:', error);
                    Swal.fire(
                        'Error!',
                        'Gagal menghapus detail planning. Coba lagi.',
                        'error'
                    );
                }
            }
        });
    };

    const confirmDeleteOutsideDetail = (weekUid, dayUid, outsideUid, outsideText) => {
        Swal.fire({
            title: 'Hapus Outside Activity?',
            text: `Anda yakin ingin menghapus aktivitas "${outsideText || 'ini'}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    console.log(`Mencoba hapus Outside Activity UID: ${outsideUid}`);

                    if (typeof onDeleteOutsideDetail === 'function') {
                        await onDeleteOutsideDetail(weekUid, dayUid, outsideUid);
                        Swal.fire('Dihapus!', 'Outside activity berhasil dihapus.', 'success');
                    } else {
                        console.error("Prop onDeleteOutsideDetail is not a function!");
                        throw new Error("Delete handler not available."); // Lempar error agar ditangkap catch

                    }
                } catch (error) {
                    console.error('Gagal menghapus outside activity:', error);
                    Swal.fire('Error!', 'Gagal menghapus outside activity. Coba lagi.', 'error');
                }
            }
        });
    }
    
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
                {renderWeekHeader(week)}
                {renderWeekSummary(week)}

                <Row xs={1} sm={2} md={3} className="g-3"> 
                    {daysInWeek.map((day, dayIndex) => (
                        <Col key={day.uid || dayIndex}> 
                            {renderDayColumn(week, day)}
                        </Col>
                    ))}
                </Row>
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
