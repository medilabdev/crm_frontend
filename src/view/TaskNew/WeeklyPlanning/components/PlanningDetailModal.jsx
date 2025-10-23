import React, { useState, useEffect, useCallback } from 'react';
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
  faStickyNote,
  faExternalLinkAlt
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
        weekly_plan_text: '',
        plan_notes: '',
        weekly_report_text: '',
        report_notes: ''
    });
    
    const [saveLoading, setSaveLoading] = useState(false);
    const [saveError, setSaveError] = useState(null);

    // Validation hook
    const {
        errors,
        validatePlanningDetailForm,
        clearErrors
    } = usePlanningValidation();

    useEffect(() => {
        if (show) {
            if (editingDetail) {
                setFormData({
                    weekly_plan_master_uid: editingDetail.weekly_plan_master_uid || '',
                    weekly_plan_text: editingDetail.weekly_plan_text || '',
                    plan_notes: editingDetail.plan_notes || '',
                    weekly_report_text: editingDetail.weekly_report_text || '',
                    report_notes: editingDetail.report_notes || ''
                });
            } else {
                setFormData({
                    weekly_plan_master_uid: '',
                    weekly_plan_text: '',
                    plan_notes: '',
                    weekly_report_text: '',
                    report_notes: ''
                });
            }
            clearErrors(); // Clear validation errors on open
            setSaveError(null); // Clear save errors on open
        }
    }, [show, editingDetail, clearErrors]);

    const handleFormChange = (field, value) => {
        setFormData(prev => ({
        ...prev,
        [field]: value
        }));
        setSaveError(null);
    };

    const handlePlanMasterChange = (selectedOption) => {
        if (selectedOption) {
            handleFormChange('weekly_plan_master_uid', selectedOption.__isNew__ ? null : selectedOption.value);
            handleFormChange('weekly_plan_text', selectedOption.label);
        } else {
            handleFormChange('weekly_plan_master_uid', '');
            handleFormChange('weekly_plan_text', '');
        }
    };

  /**
   * Handle creating new plan master
   */
    const handleCreatePlanMaster = async (inputValue) => {
        const newOption = {
            value: `new_${inputValue.replace(/\s+/g, '_').toLowerCase()}`, 
            label: inputValue,
            __isNew__: true 
        };
        
        // try {
        //   const createdMaster = await apiHook.planMasters.create({ plan_text: inputValue });
        //   return { value: createdMaster.data.value, label: createdMaster.data.label };
        // } catch (err) { /* handle error */ return null; }
        return newOption;
    };

  /**
   * Handle form submission
   */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePlanningDetailForm(formData)) {
            return; // Stop submission if validation fails
        }

        setSaveLoading(true); 
        setSaveError(null); 

        try {
            const submitData = { ...formData };

            const success = await onSave(submitData, editingDetail);

            if (success) {
                onHide();
            } else {
                setSaveError('Failed to save. Please check the data or try again.');
            }
        } catch (error) {
            console.error('Save planning detail error caught in modal:', error);
            setSaveError('An unexpected error occurred while saving.');
        } finally {
            setSaveLoading(false); // Stop loading indicator
        }
    };

    const handleClose = () => {
        if (!saveLoading) { // Prevent closing if save is in progress
            onHide();
        }
    };

  /**
   * Format plan master options for select
   */
    const planMasterOptions = weeklyPlanMasters.map(master => ({
        value: master.value, // Assuming useWeeklyPlanMasters returns { value, label }
        label: master.label
    }));

    
  const activitySuggestions = [
    'Meeting with Client',
    'Training Session',
    // ... sisanya
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
                <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                {editingDetail ? 'Edit Outside Activity' : 'Add Outside Activity'}
            </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                {/* Context Info */}
                <Alert variant="info" className="mb-3">
                    <Row>
                        <Col md={6}><strong>Week:</strong> {selectedWeek?.week_name || `Week ${selectedWeek?.week_number}` || 'N/A'}</Col>
                        <Col md={6}><strong>Day:</strong> {selectedDay?.day_name || 'N/A'} ({selectedDay?.day_date ? new Date(selectedDay.day_date).toLocaleDateString('id-ID') : 'N/A'})</Col>
                    </Row>
                </Alert>

                {/* Error Alert */}
                {saveError && ( <Alert variant="danger" className="mb-3">{saveError}</Alert> )}

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
                                value={formData.activity_text} // ✅ Bind ke activity_text
                                onChange={(e) => handleFormChange('activity_text', e.target.value)}
                                placeholder="Describe the outside activity..."
                                isInvalid={!!errors?.activity_text} // ✅ Validasi activity_text
                                disabled={saveLoading}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.activity_text}
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
                            {planMasterOptions.map((suggestion, index) => (
                                <Button
                                    key={index} variant="outline-secondary" size="sm"
                                    onClick={() => handleFormChange('activity_text', suggestion)} // ✅ Update activity_text
                                    disabled={saveLoading} className="mb-1"
                                >
                                    {suggestion.label}
                                </Button>
                            ))}
                        </div>
                    </Col>

                    {/* 🗑️ BAGIAN QUANTITY & IMPACT SUDAH DIHAPUS */}

                    {/* Notes */}
                    <Col md={12}> {/* ✅ Full width */}
                        <Form.Group>
                            <Form.Label>
                                <FontAwesomeIcon icon={faStickyNote} className="me-2" />
                                Additional Notes (Optional)
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={formData.notes} // ✅ Bind ke notes
                                onChange={(e) => handleFormChange('notes', e.target.value)}
                                placeholder="Add any additional notes, reasons, or context..."
                                isInvalid={!!errors?.notes} // ✅ Validasi notes (jika ada)
                                disabled={saveLoading}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.notes}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Optional: Explain why this activity was necessary or any relevant context.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Help Text */}
                <Alert variant="light" className="mt-3 mb-0 border">
                    <small>
                         <FontAwesomeIcon icon={faChartLine} className="me-2 text-info" /> {/* Ganti ikon jika perlu */}
                        <strong>About Outside Activities:</strong> These are activities performed outside of your regular weekly planning.
                        They help track additional work that wasn't originally planned but needed to be done.
                    </small>
                </Alert>
            </Modal.Body>

            <Modal.Footer>
                {/* Tombol Cancel */}
                <Button variant="secondary" onClick={handleClose} disabled={saveLoading}>
                    <FontAwesomeIcon icon={faTimes} className="me-2" /> Cancel
                </Button>
                {/* Tombol Save/Update */}
                <Button type="submit" variant="warning" disabled={saveLoading}>
                    {saveLoading ? (
                        <><Spinner size="sm" className="me-2" /> Saving...</>
                    ) : (
                        <><FontAwesomeIcon icon={faSave} className="me-2" /> {editingDetail ? 'Update' : 'Save'} Activity</>
                    )}
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>
  );
};

export default PlanningDetailModal;