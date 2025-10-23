/**
 * Outside Activity Modal Component
 * Form modal for creating and editing outside activities with validation
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSave, 
  faTimes, 
  faChartPie, 
  faHashtag,
  faStickyNote,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';

// Custom hooks
import { usePlanningValidation } from '../hooks/usePlanningValidation';

/**
 * Modal for creating/editing outside activities
 */
const OutsideActivityModal = ({
  show,
  onHide,
  onSave,
  editingDetail = null,
  selectedWeek = null,
  loading = false
}) => {
  // Local state
  const [formData, setFormData] = useState({
    outside_text: '',
    outside_quantity: '',
    outside_note: ''
  });
  
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Validation hook
  const {
    errors,
    validateOutsideDetailForm,
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
          outside_text: editingDetail.outside_text || '',
          outside_quantity: editingDetail.outside_quantity?.toString() || '',
          outside_note: editingDetail.outside_note || ''
        });
      } else {
        // Create mode - reset form
        setFormData({
          outside_text: '',
          outside_quantity: '',
          outside_note: ''
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
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateOutsideDetailForm(formData)) {
      return;
    }

    setSaveLoading(true);
    setSaveError(null);

    try {
      // Prepare submission data
      const submitData = {
        ...formData,
        outside_quantity: parseFloat(formData.outside_quantity) || 0,
        weekly_planning_week_uid: selectedWeek?.uid
      };

      // Call parent save handler
      const success = await onSave(submitData, editingDetail);
      
      if (success) {
        onHide();
      } else {
        setSaveError('Failed to save outside activity. Please try again.');
      }
    } catch (error) {
      console.error('Save outside activity error:', error);
      setSaveError('An error occurred while saving the outside activity.');
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
   * Common outside activity suggestions
   */
  const activitySuggestions = [
    'Meeting with Client',
    'Training Session',
    'Administrative Work',
    'Research & Development',
    'Documentation',
    'System Maintenance',
    'Customer Support',
    'Marketing Activities',
    'Quality Assurance',
    'Team Building'
  ];

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
          <FontAwesomeIcon icon={faChartPie} className="me-2" />
          {editingDetail ? 'Edit Outside Activity' : 'Add Outside Activity'}
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
                <strong>Date Range:</strong> {
                  selectedWeek?.week_start_date && selectedWeek?.week_end_date 
                    ? `${new Date(selectedWeek.week_start_date).toLocaleDateString('id-ID')} - ${new Date(selectedWeek.week_end_date).toLocaleDateString('id-ID')}`
                    : 'N/A'
                }
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
            {/* Activity Description */}
            <Col md={12} className="mb-3">
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                  Activity Description *
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.outside_text}
                  onChange={(e) => handleFormChange('outside_text', e.target.value)}
                  placeholder="Describe the outside activity..."
                  isInvalid={getFieldValidation('outside_text').isInvalid}
                  disabled={saveLoading}
                />
                <Form.Control.Feedback type="invalid">
                  {getFieldValidation('outside_text').error}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Describe what activity was performed outside of regular planning.
                </Form.Text>
              </Form.Group>
            </Col>

            {/* Activity Suggestions */}
            <Col md={12} className="mb-3">
              <Form.Label className="small text-muted">Quick Suggestions:</Form.Label>
              <div className="d-flex flex-wrap gap-1">
                {activitySuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleFormChange('outside_text', suggestion)}
                    disabled={saveLoading}
                    className="mb-1"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </Col>

            {/* Quantity */}
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faHashtag} className="me-2" />
                  Quantity/Duration *
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.outside_quantity}
                    onChange={(e) => handleFormChange('outside_quantity', e.target.value)}
                    placeholder="0"
                    isInvalid={getFieldValidation('outside_quantity').isInvalid}
                    disabled={saveLoading}
                  />
                  <InputGroup.Text>units/hours</InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {getFieldValidation('outside_quantity').error}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Quantity or time spent on this activity.
                </Form.Text>
              </Form.Group>
            </Col>

            {/* Impact Indicator */}
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Impact Assessment</Form.Label>
                <div className="border rounded p-3 bg-light">
                  <div className="text-center">
                    <FontAwesomeIcon 
                      icon={faChartPie} 
                      size="2x" 
                      className="text-warning mb-2" 
                    />
                    <div className="h5 mb-1 text-warning">
                      {formData.outside_quantity || 0} units
                    </div>
                    <small className="text-muted">
                      Additional work performed
                    </small>
                  </div>
                </div>
              </Form.Group>
            </Col>

            {/* Notes */}
            <Col md={12}>
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faStickyNote} className="me-2" />
                  Additional Notes (Optional)
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={formData.outside_note}
                  onChange={(e) => handleFormChange('outside_note', e.target.value)}
                  placeholder="Add any additional notes, reasons, or context..."
                  isInvalid={getFieldValidation('outside_note').isInvalid}
                  disabled={saveLoading}
                />
                <Form.Control.Feedback type="invalid">
                  {getFieldValidation('outside_note').error}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Optional: Explain why this activity was necessary or any relevant context.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          {/* Help Text */}
          <Alert variant="light" className="mt-3 mb-0">
            <small>
              <strong>About Outside Activities:</strong> These are activities performed outside of your regular weekly planning. 
              They help track additional work that wasn't originally planned but needed to be done.
            </small>
          </Alert>
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
            variant="warning"
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
                {editingDetail ? 'Update' : 'Save'} Activity
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default OutsideActivityModal;