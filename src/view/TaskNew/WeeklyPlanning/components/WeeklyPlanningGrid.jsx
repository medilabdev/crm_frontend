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
  Tooltip
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faCalendarWeek,
  faCalendarDay,
  faChartLine,
  faEye
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
        setModalLoading(true); // Mulai loading
        try {
            let success = false;
            if (editingDetail) {
                // Panggil handler dari index.jsx untuk Update
                success = await onUpdatePlanningDetail(
                    selectedWeek?.uid,
                    selectedDay?.uid,
                    editingDetail.uid,
                    formData
                );
            } else {
                // Panggil handler dari index.jsx untuk Create
                success = await onAddPlanningDetail(
                    selectedWeek?.uid,
                    selectedDay?.uid,
                    formData
                );
            }
            setModalLoading(false); // Selesai loading
            if (success) {
                handleCloseModals(); // Tutup modal jika sukses
            }
            // Jika !success, error handling mungkin sudah di index.jsx atau biarkan modal terbuka
            return success; // Kembalikan status sukses
        } catch (error) {
            console.error('Failed to save planning detail:', error);
            setModalLoading(false); // Selesai loading meskipun error
            // Mungkin tampilkan notifikasi error di sini
            return false;
        }
    };

    // Fungsi Save Outside Activity (Create/Update)
    const handleSaveOutsideActivity = async (formData, editingDetail) => {
        setModalLoading(true);
        try {
            let success = false;
            if (editingDetail) {
                // Panggil handler dari index.jsx untuk Update
                success = await onUpdateOutsideDetail(
                    selectedWeek?.uid,
                    selectedDay?.uid,
                    editingDetail.uid,
                    formData
                );
            } else {
                // Panggil handler dari index.jsx untuk Create
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

    // Fungsi Buka Modal Planning Detail
    const handleOpenDetailModal = (week, day, detail = null) => {
        setSelectedWeek(week);
        setSelectedDay(day);
        setEditingDetail(detail); // null jika create, object detail jika edit
        setShowDetailModal(true);
    };

    // Fungsi Buka Modal Outside Activity
    const handleOpenOutsideModal = (week, day, detail = null) => {
        setSelectedWeek(week);
        setSelectedDay(day);
        setEditingDetail(detail); // null jika create, object detail jika edit
        setShowOutsideModal(true);
    };

    // Fungsi Tutup Semua Modal
    const handleCloseModals = () => {
        setShowDetailModal(false);
        setShowOutsideModal(false);
        setSelectedWeek(null);
        setSelectedDay(null);
        setEditingDetail(null);
        // setModalLoading(false); // Reset loading state saat modal ditutup
    };

    const renderWeekHeader = (week) => {
        // ✅ Gunakan week.statistics yang SUDAH DIHITUNG di useWeeklyPlanningState
        console.log("Week Statistics: ", week.statistics);
        const stats = week.statistics || { // Sediakan default object kosong jika statistics null/undefined
            total_weekly_plan: 0,
            total_weekly_report: 0,
            total_outside: 0,
            week_planning_pct: 0,
            week_outside_pct: 0,
            // Tambahkan default lain jika perlu
        };
        // ✅ Hitung performance indicator dari week_planning_pct
        const performance = stats.week_planning_pct !== undefined
            ? getPerformanceIndicator(stats.week_planning_pct)
            : { color: 'secondary', label: 'N/A' }; // Default jika pct tidak ada

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

        console.log(`FINAL CHECK Achievement for ${day.day_name}: ${stats.daily_planning_pct}`);

        return (
        <Card className="h-100 border-light">
            <Card.Header className="bg-light py-2">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                <h6 className="mb-0">{day.day_name}</h6>
                <small className="text-muted">
                    {formatDate(new Date(day.day_date))}
                </small>
                </div>
                <div className="text-end">
                    <small className="text-muted d-block">
                        Plan: {planningDetails.length} | Outside: {outsideDetails.length}
                    </small>
                    <div className="btn-group" role="group">
                        <Button variant="primary" size="sm" onClick={() => handleOpenDetailModal(week, day)}> <FontAwesomeIcon icon={faPlus} /> </Button>
                        <Button variant="warning" size="sm" onClick={() => handleOpenOutsideModal(week, day)} title="Add Outside Activity"> <FontAwesomeIcon icon={faChartLine} /> </Button>
                    </div>
                </div>
            </div>
            </Card.Header>
            
            <Card.Body className="p-2" style={{ minHeight: '200px', maxHeight: '300px', overflowY: 'auto' }}>
            {planningDetails.length === 0 ? (
                <div className="text-center text-muted py-3">
                <FontAwesomeIcon icon={faCalendarDay} size="2x" className="mb-2 opacity-50" />
                <p className="mb-0">No planning yet</p>
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleOpenDetailModal(week, day)}
                    className="mt-2"
                >
                    Add Planning
                </Button>
                </div>
            ) : (
                <div className="planning-details">
                {planningDetails.map((detail, index) => (
                    <div
                    key={detail.uid || index}
                    className="planning-item mb-2 p-2 border rounded bg-white"
                    >
                    <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                        <h6 className="mb-1 text-primary">
                            {detail.weekly_plan_text || 'No plan text'}
                        </h6>
                        {detail.plan_notes && (
                            <small className="text-muted d-block">
                            <strong>Plan Note:</strong> {detail.plan_notes}
                            </small>
                        )}
                        {detail.weekly_report_text && (
                            <small className="text-success d-block">
                            <strong>Report:</strong> {detail.weekly_report_text}
                            </small>
                        )}
                        {detail.report_notes && (
                            <small className="text-muted d-block">
                            <strong>Report Note:</strong> {detail.report_notes}
                            </small>
                        )}
                        <div className="mt-1">
                            <Badge 
                            bg={detail.weekly_report_text ? 'success' : 'warning'}
                            className="me-1"
                            >
                            {detail.weekly_report_text ? 'Reported' : 'Planned Only'}
                            </Badge>
                        </div>
                        </div>
                        <div className="d-flex flex-column">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Edit Planning</Tooltip>}
                        >
                            <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleOpenDetailModal(week, day, detail)}
                            className="mb-1"
                            >
                            <FontAwesomeIcon icon={faEdit} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Delete Planning</Tooltip>}
                        >
                            <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteDetail(week, day, detail)}
                            >
                            <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </OverlayTrigger>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}

            {/* Outside Activities for this day */}
            {(day.outside_details || []).length > 0 && (
                <div className="outside-activities mt-2 pt-2 border-top">
                <small className="text-warning fw-bold d-block mb-1">Outside Activities:</small>
                {day.outside_details.map((outside, index) => (
                    <div
                    key={outside.uid || index}
                    className="outside-item mb-1 p-1 border rounded bg-warning bg-opacity-10"
                    >
                    <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                        <small className="fw-bold text-warning d-block">
                            {outside.outside_text}
                        </small>
                        <small className="text-muted">
                            Qty: {outside.outside_quantity || 0}
                        </small>
                        </div>
                        <div className="d-flex">
                        <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={() => handleOpenOutsideModal(week, day, outside)}
                            className="me-1"
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteOutsideDetail(week, day, outside)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </Card.Body>

            <Card.Footer className="py-1 bg-light">
            <Row className="text-center">
                <Col>
                <small className="text-muted">Achievement:</small>
                <div className="fw-bold text-primary">
                    {stats.daily_planning_pct ? `${stats.daily_planning_pct}%` : '0%'}
                </div>
                </Col>
            </Row>
            </Card.Footer>
        </Card>
        );
    };

    const renderWeekSummary = (week) => {
        // ✅ Gunakan week.statistics yg sudah dihitung dari state hook
        const totalOutsideActivities = week.statistics?.total_outside || 0;

        // ✅ Return null jika tidak ada outside activity
        if (totalOutsideActivities === 0) return null;

        // ✅ JSX untuk menampilkan summary (sudah benar)
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

    /**
     * Handle delete outside detail (Wrapper for prop function)
     */
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
      {planningData.weeks?.map((week, weekIndex) => (
        <div key={week.uid || weekIndex} className="week-section mb-4">
          {renderWeekHeader(week)}
          {renderWeekSummary(week)}
          <Row>
            {week.days?.map((day, dayIndex) => (
              <Col md={2} key={day.uid || dayIndex} className="mb-3">
                {renderDayColumn(week, day)}
              </Col>
            ))}
          </Row>
        </div>
      ))}

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
