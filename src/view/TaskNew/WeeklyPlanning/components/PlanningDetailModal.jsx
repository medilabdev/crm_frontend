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
  faChartLine,
  faClipboardList,
  faStickyNote,
  faExternalLinkAlt,
  faBullseye
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
    <>
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
                {/* ✅ Ganti Ikon dan Judul */}
                <FontAwesomeIcon icon={faClipboardList} className="me-2" /> 
                {editingDetail ? 'Edit Planning Detail' : 'Add Planning Detail'}
            </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                {/* Context Info (Ini sudah benar) */}
                <Alert variant="info" className="mb-3">
                    <Row>
                        <Col md={6}><strong>Week:</strong> {selectedWeek?.week_name || `Week ${selectedWeek?.week_number}` || 'N/A'}</Col>
                        <Col md={6}><strong>Day:</strong> {selectedDay?.day_name || 'N/A'} ({selectedDay?.day_date ? new Date(selectedDay.day_date).toLocaleDateString('id-ID') : 'N/A'})</Col>
                    </Row>
                </Alert>

                {/* Error Alert (Ini sudah benar) */}
                {saveError && ( <Alert variant="danger" className="mb-3">{saveError}</Alert> )}

                {/* --- Planning Section --- */}
                <h5 className="mb-3"><FontAwesomeIcon icon={faBullseye} className="me-2 text-primary"/> Planning</h5>
                <Row>
                    {/* Plan Master Selection */}
                    <Col md={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Plan Template (Optional)</Form.Label>
                             {/* ✅ Gunakan CreatableSelect */}
                            <CreatableSelect
                                isClearable
                                options={planMasterOptions}
                                value={planMasterOptions.find(opt => opt.value === formData.weekly_plan_master_uid)}
                                onChange={handlePlanMasterChange}
                                onCreateOption={handleCreatePlanMaster} // Jika kamu ingin bisa buat baru
                                placeholder="Select or type to create a new plan template..."
                                isDisabled={saveLoading}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                menuPortalTarget={document.body}
                                // formatCreateLabel={(inputValue) => `Create new: "${inputValue}"`} // Opsional
                            />
                            <Form.Text>Select an existing plan or type to create a reusable template.</Form.Text>
                        </Form.Group>
                    </Col>

                    {/* Weekly Plan Text */}
                    <Col md={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Plan Description *</Form.Label>
                            {/* ✅ Hubungkan ke formData.weekly_plan_text */}
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.weekly_plan_text}
                                onChange={(e) => handleFormChange('weekly_plan_text', e.target.value)}
                                placeholder="Describe the planned activity..."
                                isInvalid={!!errors?.weekly_plan_text}
                                disabled={saveLoading}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.weekly_plan_text}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    
                    {/* Plan Notes */}
                    <Col md={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Plan Notes (Optional)</Form.Label>
                             {/* ✅ Hubungkan ke formData.plan_notes */}
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={formData.plan_notes}
                                onChange={(e) => handleFormChange('plan_notes', e.target.value)}
                                placeholder="Add any notes related to the plan (e.g., preparation, specific goals)..."
                                isInvalid={!!errors?.plan_notes}
                                disabled={saveLoading}
                            />
                             <Form.Control.Feedback type="invalid">
                                {errors?.plan_notes}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                 {/* --- Reporting Section --- */}
                 <hr className="my-4"/>
                 <h5 className="mb-3"><FontAwesomeIcon icon={faChartLine} className="me-2 text-success"/> Reporting</h5>
                 <Row>
                    {/* Weekly Report Text */}
                    <Col md={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Report / Actual Activity *</Form.Label>
                             {/* ✅ Hubungkan ke formData.weekly_report_text */}
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.weekly_report_text}
                                onChange={(e) => handleFormChange('weekly_report_text', e.target.value)}
                                placeholder="Describe the actual activity performed..."
                                isInvalid={!!errors?.weekly_report_text}
                                disabled={saveLoading}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.weekly_report_text}
                            </Form.Control.Feedback>
                            <Form.Text>Click suggestions below to quickly fill.</Form.Text> 
                        </Form.Group>
                    </Col>

                     {/* Report Suggestions (Opsional, sesuaikan jika perlu) */}
                     <Col md={12} className="mb-3">
                         <Form.Label className="small text-muted">Quick Report Suggestions:</Form.Label>
                         <div className="d-flex flex-wrap gap-1">
                             {activitySuggestions.map((suggestion, index) => ( // Ganti 'activitySuggestions' jika perlu
                                 <Button
                                    key={index} variant="outline-secondary" size="sm"
                                    // ✅ Isi 'weekly_report_text'
                                    onClick={() => handleFormChange('weekly_report_text', suggestion)} 
                                    disabled={saveLoading} className="mb-1"
                                 >
                                     {suggestion} 
                                 </Button>
                             ))}
                         </div>
                     </Col>

                    {/* Report Notes */}
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Report Notes (Optional)</Form.Label>
                            {/* ✅ Hubungkan ke formData.report_notes */}
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={formData.report_notes}
                                onChange={(e) => handleFormChange('report_notes', e.target.value)}
                                placeholder="Add any notes about the outcome, follow-up actions, etc..."
                                isInvalid={!!errors?.report_notes}
                                disabled={saveLoading}
                            />
                             <Form.Control.Feedback type="invalid">
                                {errors?.report_notes}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                 {/* 🗑️ HAPUS Help Text tentang Outside Activity */}

            </Modal.Body>

            <Modal.Footer>
                {/* Tombol Cancel (Sudah benar) */}
                <Button variant="secondary" onClick={handleClose} disabled={saveLoading}>
                    <FontAwesomeIcon icon={faTimes} className="me-2" /> Cancel
                </Button>
                {/* Tombol Save/Update */}
                <Button type="submit" variant="primary" disabled={saveLoading}> {/* Ganti warna jika perlu */}
                    {saveLoading ? (
                        <><Spinner size="sm" className="me-2" /> Saving...</>
                    ) : (
                        // ✅ Ganti teks tombol
                        <><FontAwesomeIcon icon={faSave} className="me-2" /> {editingDetail ? 'Update Detail' : 'Save Detail'}</> 
                    )}
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>
    
    </>
  );
};

export default PlanningDetailModal;