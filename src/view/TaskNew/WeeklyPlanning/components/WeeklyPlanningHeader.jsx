/**
 * Weekly Planning Header Component
 * Handles filters, month selection, branch selection, and planning creation
 */

import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Modal, 
  Alert,
  Spinner 
} from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faCalendarAlt, 
  faBuilding,
  faRefresh 
} from '@fortawesome/free-solid-svg-icons';

// Custom hooks
import { usePlanningValidation } from '../hooks/usePlanningValidation';

// Utils
import { formatDate, getWeekStartDate } from '../utils/dateUtils';

/**
 * Header component with controls and filters
 */
const WeeklyPlanningHeader = ({
  selectedBranch,
  selectedMonth,
  branches = [],
  weeklyPlanMasters = [],
  onBranchChange,
  onMonthChange,
  onCreatePlanning,
  loading = false,
  hasExistingPlanning = false
}) => {
  // Local state for create modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    weekly_plan_master_uid: '',
    week_start_date: getWeekStartDate(selectedMonth),
    week_name: '',
    plan_report: ''
  });

  // Validation hook
  const {
    errors,
    validateWeeklyPlanningForm,
    getFieldValidation,
    clearErrors
  } = usePlanningValidation();

  /**
   * Handle opening create modal
   */
  const handleOpenCreateModal = () => {
    // Reset form
    setFormData({
      weekly_plan_master_uid: '',
      week_start_date: getWeekStartDate(selectedMonth),
      week_name: generateDefaultWeekName(),
      plan_report: ''
    });
    clearErrors();
    setCreateError(null);
    setShowCreateModal(true);
  };

  /**
   * Handle closing create modal
   */
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setCreateLoading(false);
    setCreateError(null);
  };

  /**
   * Generate default week name based on selected month
   */
  const generateDefaultWeekName = () => {
    const monthName = selectedMonth.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
    return `Planning ${monthName}`;
  };

  /**
   * Handle form input changes
   */
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setCreateError(null);
  };

  /**
   * Handle weekly plan master selection (CreatableSelect)
   */
  const handlePlanMasterChange = (selectedOption) => {
    if (selectedOption) {
      handleFormChange('weekly_plan_master_uid', selectedOption.value);
    }
  };

  /**
   * Handle creating new plan master from CreatableSelect
   */
  const handleCreatePlanMaster = async (inputValue) => {
    try {
      // This would typically call API to create new plan master
      // For now, we'll add it to form as a new option
      const newOption = {
        value: `new_${Date.now()}`,
        label: inputValue,
        __isNew__: true
      };
      
      handleFormChange('weekly_plan_master_uid', newOption.value);
      return newOption;
    } catch (error) {
      console.error('Failed to create plan master:', error);
      return null;
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateWeeklyPlanningForm(formData)) {
      return;
    }

    setCreateLoading(true);
    setCreateError(null);

    try {
      const success = await onCreatePlanning(formData);
      
      if (success) {
        handleCloseCreateModal();
      } else {
        setCreateError('Failed to create weekly planning. Please try again.');
      }
    } catch (error) {
      console.error('Create planning error:', error);
      setCreateError('An error occurred while creating the planning.');
    } finally {
      setCreateLoading(false);
    }
  };

  /**
   * Format branches for react-select
   */
  const branchOptions = branches.map(branch => ({
    value: branch.uid,
    label: branch.name
  }));

  /**
   * Format weekly plan masters for CreatableSelect
   */
  const planMasterOptions = weeklyPlanMasters.map(master => ({
    value: master.uid,
    label: master.plan_text
  }));

  return (
    <>
      {/* Header Controls */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-center">
            {/* Branch Selection */}
            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faBuilding} className="me-2" />
                  Branch
                </Form.Label>
                <Select
                  value={selectedBranch}
                  onChange={onBranchChange}
                  options={branchOptions}
                  placeholder="Select branch..."
                  isSearchable
                  isClearable
                  isLoading={loading}
                  isDisabled={loading}
                />
              </Form.Group>
            </Col>

            {/* Month Selection */}
            <Col md={3}>
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                  Month
                </Form.Label>
                <DatePicker
                  selected={selectedMonth}
                  onChange={onMonthChange}
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  className="form-control"
                  disabled={loading}
                />
              </Form.Group>
            </Col>

            {/* Status Info */}
            <Col md={3}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <div className="d-flex align-items-center">
                  {hasExistingPlanning ? (
                    <span className="badge bg-success">
                      Planning Active
                    </span>
                  ) : (
                    <span className="badge bg-secondary">
                      No Planning
                    </span>
                  )}
                  {selectedBranch && (
                    <small className="text-muted ms-2">
                      {formatDate(getWeekStartDate(selectedMonth))}
                    </small>
                  )}
                </div>
              </Form.Group>
            </Col>

            {/* Action Buttons */}
            <Col md={2} className="text-end">
              {selectedBranch && !hasExistingPlanning && (
                <Button
                  variant="primary"
                  onClick={handleOpenCreateModal}
                  disabled={loading}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Create Planning
                </Button>
              )}
              
              {hasExistingPlanning && (
                <Button
                  variant="outline-secondary"
                  onClick={() => window.location.reload()}
                  disabled={loading}
                  size="sm"
                >
                  <FontAwesomeIcon icon={faRefresh} className="me-2" />
                  Refresh
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Create Planning Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Weekly Planning</Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={handleSubmitCreate}>
          <Modal.Body>
            {createError && (
              <Alert variant="danger" className="mb-3">
                {createError}
              </Alert>
            )}

            <Row>
              {/* Weekly Plan Master */}
              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Weekly Plan Template *</Form.Label>
                  <CreatableSelect
                    options={planMasterOptions}
                    onChange={handlePlanMasterChange}
                    onCreateOption={handleCreatePlanMaster}
                    placeholder="Select or create a plan template..."
                    isSearchable
                    isDisabled={createLoading}
                    formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                    isValidNewOption={(inputValue) => inputValue.trim().length >= 3}
                  />
                  {getFieldValidation('weekly_plan_master_uid').error && (
                    <Form.Text className="text-danger">
                      {getFieldValidation('weekly_plan_master_uid').error}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>

              {/* Week Name */}
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Week Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.week_name}
                    onChange={(e) => handleFormChange('week_name', e.target.value)}
                    placeholder="Enter week name..."
                    isInvalid={getFieldValidation('week_name').isInvalid}
                    disabled={createLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {getFieldValidation('week_name').error}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Week Start Date */}
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Week Start Date *</Form.Label>
                  <DatePicker
                    selected={formData.week_start_date}
                    onChange={(date) => handleFormChange('week_start_date', date)}
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    disabled={createLoading}
                  />
                  {getFieldValidation('week_start_date').error && (
                    <Form.Text className="text-danger">
                      {getFieldValidation('week_start_date').error}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>

              {/* Plan Report */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Plan Report (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.plan_report}
                    onChange={(e) => handleFormChange('plan_report', e.target.value)}
                    placeholder="Enter plan report or notes..."
                    isInvalid={getFieldValidation('plan_report').isInvalid}
                    disabled={createLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {getFieldValidation('plan_report').error}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={handleCloseCreateModal}
              disabled={createLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              disabled={createLoading}
            >
              {createLoading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Creating...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Create Planning
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default WeeklyPlanningHeader;
