import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
} from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faTimes,
  faStickyNote,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';

import { useWeeklyPlanMasters } from '../hooks/useWeeklyPlanningAPI';
import { usePlanningValidation } from '../hooks/usePlanningValidation';

const OutsideActivityModal = ({
  show,
  onHide,
  onSave,
  editingDetail = null,
  selectedWeek = null,
  selectedDay = null,
  createPlanMaster,
}) => {
  const [createdLabel, setCreatedLabel] = useState(null);
  const [formData, setFormData] = useState({
    activity_text: '',
    notes: '',
    weekly_plan_master_uid: '',
  });

  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [isCreatingMaster, setIsCreatingMaster] = useState(false);

  const { planMasters, loading: planMastersLoading } = useWeeklyPlanMasters();
  const { errors, validateOutsidePlanningForm, clearErrors } = usePlanningValidation();

  // 🔄 Populate data saat modal dibuka
  useEffect(() => {
    if (!show) return;

    if (editingDetail) {
      setFormData({
        activity_text: editingDetail.activity_text || '',
        notes: editingDetail.notes || '',
        weekly_plan_master_uid: editingDetail.weekly_plan_master_uid || '',
      });
    } else {
      setFormData({
        activity_text: '',
        notes: '',
        weekly_plan_master_uid: '',
      });
      setCreatedLabel(null);
    }

    clearErrors();
    setSaveError(null);
  }, [show, editingDetail, planMasters, clearErrors]);

  // 🔧 Utility handlers
  const handleFormChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaveError(null);
  }, []);

  const handlePlanMasterChange = useCallback((selectedOption) => {
    handleFormChange('weekly_plan_master_uid', selectedOption ? selectedOption.value : '');
  }, [handleFormChange]);

  const handleCreatePlanMaster = useCallback((inputValue) => {
    setCreatedLabel(inputValue);
    handleFormChange('weekly_plan_master_uid', null);
    return { value: null, label: inputValue, __isNew__: true };
  }, [handleFormChange]);

  const filteredMasterOptions = useMemo(() => {
    // tampilkan semua master
    return planMasters.map(master => ({
      value: master.uid,
      label: master.plan_text,
    }));
  }, [planMasters]);

  const handleClose = () => {
    if (!saveLoading) onHide();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🧭 Validasi input dasar
    if (!formData.activity_text?.trim()) {
      setSaveError('Activity Description is required.');
      return;
    }

    if (!validateOutsidePlanningForm(formData)) return;

    setSaveLoading(true);
    setSaveError(null);

    try {
      let finalMasterUid = formData.weekly_plan_master_uid;
      const isNewMaster = !finalMasterUid && !!createdLabel;

      // 🆕 Buat master baru (jika belum ada)
      if (isNewMaster) {
        if (typeof createPlanMaster !== 'function') {
          setSaveError('createPlanMaster is not available.');
          setSaveLoading(false);
          return;
        }

        setIsCreatingMaster(true);
        try {
          const newMasterData = {
            plan_text: String(createdLabel).trim(),
          };

          const createdMaster = await createPlanMaster(newMasterData);
          finalMasterUid = createdMaster?.uid || createdMaster?.id;

          if (!finalMasterUid) {
            throw new Error('createPlanMaster did not return a valid UID.');
          }
        } catch (err) {
          console.error('Failed to create master:', err);
          setSaveError(err?.response?.data?.message || err?.message || 'Failed to create master.');
          setSaveLoading(false);
          return;
        } finally {
          setIsCreatingMaster(false);
        }
      }

      // 📦 Data yang dikirim ke backend
      const submitData = {
        activity_text: formData.activity_text.trim(),
        notes: formData.notes || null,
        weekly_plan_master_uid: finalMasterUid,
      };

      const success = await onSave(submitData, editingDetail);
      if (success) {
        onHide();
      } else {
        setSaveError('Failed to save outside activity. Please try again.');
      }
    } catch (error) {
      console.error('Save outside activity error:', error);
      setSaveError('An unexpected error occurred while saving.');
    } finally {
      setSaveLoading(false);
    }
  };

  const activitySuggestions = [
    'Meeting with Client',
    'Training Session',
    'Follow-up Coordination',
  ];

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={!saveLoading}>
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

          {saveError && <Alert variant="danger" className="mb-3">{saveError}</Alert>}

          <Row>
            {/* Master Client */}
            <Col md={12} className="mb-3">
              <Form.Group>
                <Form.Label>Client / Master *</Form.Label>
                <CreatableSelect
                  isClearable
                  options={filteredMasterOptions}
                  value={
                    filteredMasterOptions.find(opt => opt.value === formData.weekly_plan_master_uid)
                    || (createdLabel ? { value: null, label: createdLabel } : null)
                  }
                  onChange={handlePlanMasterChange}
                  onCreateOption={handleCreatePlanMaster}
                  placeholder="Select or create a Client..."
                  isLoading={isCreatingMaster || planMastersLoading}
                  isDisabled={saveLoading || isCreatingMaster}
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                  menuPortalTarget={document.body}
                  formatCreateLabel={inputValue => `New Client: "${inputValue}"`}
                />
              </Form.Group>
            </Col>

            {/* Deskripsi aktivitas */}
            <Col md={12} className="mb-3">
              <Form.Group>
                <Form.Label>
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                  Activity Description *
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.activity_text}
                  onChange={(e) => handleFormChange('activity_text', e.target.value)}
                  placeholder="Describe the activity performed..."
                  isInvalid={!!errors?.activity_text}
                  disabled={saveLoading || isCreatingMaster}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.activity_text}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Quick Suggestions */}
            <Col md={12} className="mb-3">
              <Form.Label className="small text-muted">Quick Suggestions:</Form.Label>
              <div className="d-flex flex-wrap gap-1">
                {activitySuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleFormChange('activity_text', suggestion)}
                    disabled={saveLoading}
                    className="mb-1"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
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
                  value={formData.notes}
                  onChange={(e) => handleFormChange('notes', e.target.value)}
                  placeholder="Add context, reason, or other relevant notes..."
                  isInvalid={!!errors?.notes}
                  disabled={saveLoading}
                />
              </Form.Group>
            </Col>
          </Row>

          <Alert variant="light" className="mt-3 mb-0 border">
            <small>
              <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2 text-info" />
              <strong>About Outside Activities:</strong> These are activities performed outside your regular weekly planning.
            </small>
          </Alert>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={saveLoading}>
            <FontAwesomeIcon icon={faTimes} className="me-2" /> Cancel
          </Button>
          <Button type="submit" variant="warning" disabled={saveLoading}>
            {saveLoading ? (
              <>
                <Spinner size="sm" className="me-2" /> Saving...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} className="me-2" /> {editingDetail ? 'Update' : 'Save'} Activity
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default OutsideActivityModal;
