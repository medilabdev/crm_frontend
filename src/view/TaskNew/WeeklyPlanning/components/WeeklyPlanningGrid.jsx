/**
 * Weekly Planning Grid Component
 * Main planning interface with week/day layout and interactive planning items
 */

import React, { useState, useMemo } from 'react';
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
import { generateWeeksForMonth, formatDate } from '../utils/dateUtils';
import { calculateWeekStatistics, calculateDayStatistics } from '../utils/calculationUtils';

/**
 * Planning grid with weeks and days layout
 */
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
  loading = false
}) => {
  // Local state
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showOutsideModal, setShowOutsideModal] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Generate weeks for display
  const weeks = useMemo(() => {
    if (!planningData) return [];
    
    const planningDate = new Date(planningData.week_start_date);
    return generateWeeksForMonth(planningDate);
  }, [planningData]);

  // Get planning data with calculations
  const enrichedPlanningData = useMemo(() => {
    if (!planningData) return null;

    const enrichedWeeks = planningData.weeks?.map(week => {
      const enrichedDays = week.days?.map(day => ({
        ...day,
        statistics: calculateDayStatistics(day)
      })) || [];

      return {
        ...week,
        days: enrichedDays,
        statistics: calculateWeekStatistics(week)
      };
    }) || [];

    return {
      ...planningData,
      weeks: enrichedWeeks
    };
  }, [planningData]);

  /**
   * Handle opening planning detail modal
   */
  const handleOpenDetailModal = (week, day, detail = null) => {
    setSelectedWeek(week);
    setSelectedDay(day);
    setEditingDetail(detail);
    setShowDetailModal(true);
  };

  /**
   * Handle opening outside detail modal
   */
  const handleOpenOutsideModal = (week, detail = null) => {
    setSelectedWeek(week);
    setEditingDetail(detail);
    setShowOutsideModal(true);
  };

  /**
   * Handle closing modals
   */
  const handleCloseModals = () => {
    setShowDetailModal(false);
    setShowOutsideModal(false);
    setSelectedWeek(null);
    setSelectedDay(null);
    setEditingDetail(null);
    setModalLoading(false);
  };

  /**
   * Render week header with statistics
   */
  const renderWeekHeader = (week) => {
    const stats = week.statistics || {};
    
    return (
      <Card className="mb-3 border-primary">
        <Card.Header className="bg-primary text-white">
          <Row className="align-items-center">
            <Col md={4}>
              <h6 className="mb-0">
                <FontAwesomeIcon icon={faCalendarWeek} className="me-2" />
                {week.week_name || `Week ${week.week_number}`}
              </h6>
              <small>
                {formatDate(new Date(week.week_start_date))} - {formatDate(new Date(week.week_end_date))}
              </small>
            </Col>
            <Col md={6}>
              <Row className="text-center">
                <Col>
                  <small>Total Planning</small>
                  <div className="fw-bold">{stats.totalPlanning || 0}</div>
                </Col>
                <Col>
                  <small>Total Outside</small>
                  <div className="fw-bold">{stats.totalOutside || 0}</div>
                </Col>
                <Col>
                  <small>Achievement</small>
                  <div className="fw-bold">
                    {stats.achievementRate ? `${stats.achievementRate}%` : '0%'}
                  </div>
                </Col>
                <Col>
                  <small>Performance</small>
                  <div>
                    <Badge bg={stats.performanceLevel === 'excellent' ? 'success' : 
                               stats.performanceLevel === 'good' ? 'primary' : 
                               stats.performanceLevel === 'average' ? 'warning' : 'danger'}>
                      {stats.performanceLevel || 'N/A'}
                    </Badge>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={2} className="text-end">
              <Button
                variant="light"
                size="sm"
                onClick={() => handleOpenOutsideModal(week)}
              >
                <FontAwesomeIcon icon={faPlus} className="me-1" />
                Outside
              </Button>
            </Col>
          </Row>
        </Card.Header>
      </Card>
    );
  };

  /**
   * Render day column with planning details
   */
  const renderDayColumn = (week, day) => {
    const stats = day.statistics || {};
    const planningDetails = day.planning_details || [];
    
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
                Planning: {stats.totalPlanning || 0}
              </small>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleOpenDetailModal(week, day)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
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
                        {detail.plan_text}
                      </h6>
                      <small className="text-muted d-block">
                        Target: {detail.target_quantity || 0} | 
                        Actual: {detail.actual_quantity || 0}
                      </small>
                      {detail.plan_note && (
                        <small className="text-muted d-block">
                          Note: {detail.plan_note}
                        </small>
                      )}
                      <div className="mt-1">
                        <Badge 
                          bg={detail.actual_quantity >= detail.target_quantity ? 'success' : 'warning'}
                          className="me-1"
                        >
                          {detail.actual_quantity >= detail.target_quantity ? 'Achieved' : 'Pending'}
                        </Badge>
                        {detail.achievement_percentage !== undefined && (
                          <Badge bg="info">
                            {detail.achievement_percentage}%
                          </Badge>
                        )}
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
                          onClick={() => handleDeleteDetail(detail)}
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
        </Card.Body>

        <Card.Footer className="py-1 bg-light">
          <Row className="text-center">
            <Col>
              <small className="text-muted">Achievement:</small>
              <div className="fw-bold text-primary">
                {stats.achievementRate ? `${stats.achievementRate}%` : '0%'}
              </div>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
  };

  /**
   * Render outside details section
   */
  const renderOutsideDetails = (week) => {
    const outsideDetails = week.outside_details || [];
    
    if (outsideDetails.length === 0) return null;

    return (
      <Card className="mb-3">
        <Card.Header className="bg-warning text-dark">
          <h6 className="mb-0">
            <FontAwesomeIcon icon={faChartLine} className="me-2" />
            Outside Activities
          </h6>
        </Card.Header>
        <Card.Body>
          <Row>
            {outsideDetails.map((detail, index) => (
              <Col md={4} key={detail.uid || index} className="mb-2">
                <div className="border rounded p-2 bg-light">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{detail.outside_text}</h6>
                      <small className="text-muted">
                        Quantity: {detail.outside_quantity || 0}
                      </small>
                      {detail.outside_note && (
                        <small className="text-muted d-block">
                          Note: {detail.outside_note}
                        </small>
                      )}
                    </div>
                    <div className="d-flex">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleOpenOutsideModal(week, detail)}
                        className="me-1"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteOutsideDetail(detail)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    );
  };

  /**
   * Handle delete planning detail
   */
  const handleDeleteDetail = async (detail) => {
    if (window.confirm('Are you sure you want to delete this planning detail?')) {
      try {
        await onDeletePlanningDetail(detail.uid);
      } catch (error) {
        console.error('Failed to delete planning detail:', error);
      }
    }
  };

  /**
   * Handle delete outside detail
   */
  const handleDeleteOutsideDetail = async (detail) => {
    if (window.confirm('Are you sure you want to delete this outside activity?')) {
      try {
        await onDeleteOutsideDetail(detail.uid);
      } catch (error) {
        console.error('Failed to delete outside detail:', error);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading planning data...</p>
      </div>
    );
  }

  // No data state
  if (!enrichedPlanningData) {
    return (
      <Alert variant="info" className="text-center">
        <FontAwesomeIcon icon={faCalendarWeek} size="2x" className="mb-3 opacity-50" />
        <h5>No Planning Data</h5>
        <p>Please select a branch and month to view or create weekly planning.</p>
      </Alert>
    );
  }

  return (
    <div className="weekly-planning-grid">
      {enrichedPlanningData.weeks?.map((week, weekIndex) => (
        <div key={week.uid || weekIndex} className="week-section mb-4">
          {/* Week Header */}
          {renderWeekHeader(week)}

          {/* Outside Details */}
          {renderOutsideDetails(week)}

          {/* Days Grid */}
          <Row>
            {week.days?.map((day, dayIndex) => (
              <Col md={2} key={day.uid || dayIndex} className="mb-3">
                {renderDayColumn(week, day)}
              </Col>
            ))}
          </Row>
        </div>
      ))}

      {/* Planning Detail Modal (placeholder) */}
      <Modal show={showDetailModal} onHide={handleCloseModals} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingDetail ? 'Edit Planning Detail' : 'Add Planning Detail'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info">
            Planning Detail Modal content will be implemented next.
            <br />
            Selected Day: {selectedDay?.day_name} ({formatDate(new Date(selectedDay?.day_date || ''))})
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Outside Detail Modal (placeholder) */}
      <Modal show={showOutsideModal} onHide={handleCloseModals} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingDetail ? 'Edit Outside Activity' : 'Add Outside Activity'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info">
            Outside Activity Modal content will be implemented next.
            <br />
            Selected Week: {selectedWeek?.week_name}
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WeeklyPlanningGrid;
