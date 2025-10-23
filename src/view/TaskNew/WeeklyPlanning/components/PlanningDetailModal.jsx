/**
 * Planning Detail Modal Component
 * Form modal for creating and editing planning details with validation
 */

import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Form, 
  Button, 
  Row, 
  Col, 
  Alert, 
  Spinner,
  InputGroup 
} from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSave, 
  faTimes, 
  faTargetArrow, 
  faChartLine,
  faClipboardList,
  faStickyNote
} from '@fortawesome/free-solid-svg-icons';

// Custom hooks
import { usePlanningValidation } from '../hooks/usePlanningValidation';

/**
 * Modal for creating/editing planning details
 */
const PlanningDetailModal = ({
  show,
  onHide,
  onSave,
  editingDetail = null,
  selectedWeek = null,
  selectedDay = null,
  weeklyPlanMasters = [],
  loading = false
}) => {
  // Local state
  const [formData, setFormData] = useState({
    weekly_plan_master_uid: '',
    plan_text: '',
    target_quantity: '',
    actual_quantity: '',
    plan_note: ''
  });
  
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Validation hook
  const {
    errors,
    validatePlanningDetailForm,
    getFieldValidation,
    clearErrors
  } = usePlanningValidation();

  /**
   * Initialize form data when modal opens or editing detail changes
   */
  useEffect(() => {
    if (show) {
      if (editingDetail) {
        // Edit mode - populate with existing data
        setFormData({
          weekly_plan_master_uid: editingDetail.weekly_plan_master_uid || '',
          plan_text: editingDetail.plan_text || '',
          target_quantity: editingDetail.target_quantity?.toString() || '',
          actual_quantity: editingDetail.actual_quantity?.toString() || '',
          plan_note: editingDetail.plan_note || ''
        });
      } else {
        // Create mode - reset form
        setFormData({
          weekly_plan_master_uid: '',
          plan_text: '',
          target_quantity: '',
          actual_quantity: '0',
          plan_note: ''
        });
      }
      clearErrors();
      setSaveError(null);
    }
  }, [show, editingDetail, clearErrors]);

  /**
   * Handle form input changes
   */
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setSaveError(null);
  };

  /**
   * Handle plan master selection
   */
  const handlePlanMasterChange = (selectedOption) => {
    if (selectedOption) {
      handleFormChange('weekly_plan_master_uid', selectedOption.value);
      
      // Auto-fill plan text if creating new option
      if (selectedOption.__isNew__) {
        handleFormChange('plan_text', selectedOption.label);
      } else {
        // Find selected master and use its plan text
        const selectedMaster = weeklyPlanMasters.find(
          master => master.uid === selectedOption.value
        );
        if (selectedMaster) {
          handleFormChange('plan_text', selectedMaster.plan_text);
        }
      }
    }
  };

  /**
   * Handle creating new plan master
   */
  const handleCreatePlanMaster = async (inputValue) => {
    const newOption = {
      value: `new_${Date.now()}`,
      label: inputValue,
      __isNew__: true
    };
    
    return newOption;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validatePlanningDetailForm(formData)) {
      return;
    }

    setSaveLoading(true);
    setSaveError(null);

    try {
      // Prepare submission data
      const submitData = {
        ...formData,
        target_quantity: parseFloat(formData.target_quantity) || 0,
        actual_quantity: parseFloat(formData.actual_quantity) || 0,
        weekly_planning_week_uid: selectedWeek?.uid,
        weekly_planning_day_uid: selectedDay?.uid
      };

      // Call parent save handler
      const success = await onSave(submitData, editingDetail);
      
      if (success) {
        onHide();
      } else {
        setSaveError('Failed to save planning detail. Please try again.');
      }
    } catch (error) {
      console.error('Save planning detail error:', error);
      setSaveError('An error occurred while saving the planning detail.');
    } finally {
      setSaveLoading(false);
    }
  };

  /**
   * Handle modal close
   */
  const handleClose = () => {
    if (!saveLoading) {
      onHide();
    }
  };

  /**
   * Calculate achievement percentage
   */
  const achievementPercentage = () => {
    const target = parseFloat(formData.target_quantity) || 0;
    const actual = parseFloat(formData.actual_quantity) || 0;
    
    if (target === 0) return 0;
    return Math.round((actual / target) * 100);
  };

  /**
   * Format plan master options for select
   */
  const planMasterOptions = weeklyPlanMasters.map(master => ({
    value: master.uid,
    label: `${master.plan_text} (${master.plan_category || 'General'})`
  }));

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      size="lg"
      backdrop="static"
      keyboard={!saveLoading}
    >
      <Modal.Header closeButton={!saveLoading}>
        <Modal.Title>
          <FontAwesomeIcon icon={faClipboardList} className="me-2" />
          {editingDetail ? 'Edit Planning Detail' : 'Add Planning Detail'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Context Info */}
          <Alert variant="info" className="mb-3">
            <Row>
              <Col md={6}>
                <strong>Week:</strong> {selectedWeek?.week_name || 'N/A'}
              </Col>
              <Col md={6}>
                <strong>Day:</strong> {selectedDay?.day_name || 'N/A'} 
                ({selectedDay?.day_date ? new Date(selectedDay.day_date).toLocaleDateString('id-ID') : 'N/A'})
              </Col>
            </Row>
          </Alert>

          {/* Error Alert */}
          {saveError && (
            <Alert variant="danger" className="mb-3">
              {saveError}
            </Alert>
          )}

          <Row>
            {/* Plan Master Selection */}
            <Col md={12} className="mb-3">
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faClipboardList} className="me-2" />
                  Plan Template *
                </Form.Label>
                <CreatableSelect
                  options={planMasterOptions}
                  onChange={handlePlanMasterChange}
                  onCreateOption={handleCreatePlanMaster}
                  placeholder="Select or create a plan template..."
                  isSearchable
                  isDisabled={saveLoading}
                  formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                  isValidNewOption={(inputValue) => inputValue.trim().length >= 3}
                  value={planMasterOptions.find(
                    option => option.value === formData.weekly_plan_master_uid
                  )}
                />
                {getFieldValidation('weekly_plan_master_uid').error && (
                  <Form.Text className="text-danger">
                    {getFieldValidation('weekly_plan_master_uid').error}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            {/* Plan Text */}
            <Col md={12} className="mb-3">
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faStickyNote} className="me-2" />
                  Plan Description *
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={formData.plan_text}
                  onChange={(e) => handleFormChange('plan_text', e.target.value)}
                  placeholder="Enter plan description..."
                  isInvalid={getFieldValidation('plan_text').isInvalid}
                  disabled={saveLoading}
                />
                <Form.Control.Feedback type="invalid">
                  {getFieldValidation('plan_text').error}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Target Quantity */}
            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faTargetArrow} className="me-2" />
                  Target Quantity *
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.target_quantity}
                    onChange={(e) => handleFormChange('target_quantity', e.target.value)}
                    placeholder="0"
                    isInvalid={getFieldValidation('target_quantity').isInvalid}
                    disabled={saveLoading}
                  />
                  <InputGroup.Text>units</InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {getFieldValidation('target_quantity').error}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Actual Quantity */}
            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faChartLine} className="me-2" />
                  Actual Quantity
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.actual_quantity}
                    onChange={(e) => handleFormChange('actual_quantity', e.target.value)}
                    placeholder="0"
                    isInvalid={getFieldValidation('actual_quantity').isInvalid}
                    disabled={saveLoading}
                  />
                  <InputGroup.Text>units</InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {getFieldValidation('actual_quantity').error}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Achievement Display */}
            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>Achievement</Form.Label>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="h4 mb-0 text-primary">
                      {achievementPercentage()}%
                    </div>
                    <small className="text-muted">
                      {formData.actual_quantity || 0} / {formData.target_quantity || 0}
                    </small>
                  </div>
                  <div className={`text-${achievementPercentage() >= 100 ? 'success' : achievementPercentage() >= 80 ? 'primary' : 'warning'}`}>
                    <FontAwesomeIcon 
                      icon={achievementPercentage() >= 100 ? faTargetArrow : faChartLine} 
                      size="2x" 
                    />
                  </div>
                </div>
              </Form.Group>
            </Col>

            {/* Plan Note */}
            <Col md={12}>
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faStickyNote} className="me-2" />
                  Notes (Optional)
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={formData.plan_note}
                  onChange={(e) => handleFormChange('plan_note', e.target.value)}
                  placeholder="Add any additional notes or comments..."
                  isInvalid={getFieldValidation('plan_note').isInvalid}
                  disabled={saveLoading}
                />
                <Form.Control.Feedback type="invalid">
                  {getFieldValidation('plan_note').error}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleClose}
            disabled={saveLoading}
          >
            <FontAwesomeIcon icon={faTimes} className="me-2" />
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            disabled={saveLoading}
          >
            {saveLoading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} className="me-2" />
                {editingDetail ? 'Update' : 'Save'} Planning
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PlanningDetailModal;