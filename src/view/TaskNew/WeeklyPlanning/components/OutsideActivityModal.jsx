import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import {
    Modal,
    Form,
    Button,
    Row,
    Col,
    Alert,
    Spinner,
    // InputGroup // Unused import?
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSave,
    faTimes,
    // faChartPie, // Unused? Maybe faExternalLinkAlt is better?
    // faHashtag, // Unused?
    faStickyNote,
    faExternalLinkAlt // Icon for 'Outside Activity'
} from '@fortawesome/free-solid-svg-icons';

// Custom hooks
import { usePlanningValidation } from '../hooks/usePlanningValidation'; // Assuming path is correct

const OutsideActivityModal = ({
  show,
    onHide,
    onSave,
    editingDetail = null,
    selectedWeek = null, 
    selectedDay = null, 
}) => {
    const [formData, setFormData] = useState({
        activity_text: '',
        notes: '' 
    });

    const [saveLoading, setSaveLoading] = useState(false);
    const [saveError, setSaveError] = useState(null);


  // Validation hook
    const {
        errors,
        validateOutsideDetailForm,
        clearErrors
    } = usePlanningValidation();

  
    useEffect(() => {
        if (show) {
        if (editingDetail) {
            // Edit mode - populate with existing data
            setFormData({
                activity_text: editingDetail.activity_text || '',
                notes: editingDetail.notes || ''
            });
        } else {
            // Create mode - reset form
            setFormData({
            activity_text: '',
            notes: ''
            });
        }
        clearErrors();
        setSaveError(null);
        }
    }, [show, editingDetail, clearErrors]);

    const handleFormChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setSaveError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ⚠️ Ensure validation hook checks 'activity_text'
        if (!validateOutsideDetailForm(formData)) {
            return;
        }

        setSaveLoading(true);
        setSaveError(null);

        try {
            // ✅ Prepare submission data with keys matching BE model
            const submitData = {
                activity_text: formData.activity_text,
                notes: formData.notes
                // 🗑️ Removed quantity, week/day UIDs (handled by parent/API path)
            };

            // ✅ Call parent save handler (index.jsx -> API -> Refetch)
            const success = await onSave(submitData, editingDetail);

            if (success) {
                onHide(); // Close modal on success
            } else {
                setSaveError('Failed to save outside activity. Please try again.');
            }
        } catch (error) {
            console.error('Save outside activity error:', error);
            setSaveError('An error occurred while saving.');
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
                            {activitySuggestions.map((suggestion, index) => ( // Pastikan activitySuggestions ada
                                <Button
                                    key={index} variant="outline-secondary" size="sm"
                                    onClick={() => handleFormChange('activity_text', suggestion)} // ✅ Update activity_text
                                    disabled={saveLoading} className="mb-1"
                                >
                                    {suggestion}
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
                <Alert variant="light" className="mt-3 mb-0 border"> {/* Ganti variant agar lebih soft */}
                    <small>
                         <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2 text-info" /> {/* Ganti ikon jika perlu */}
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

export default OutsideActivityModal;