import React, { useState, useEffect, useCallback, useMemo } from 'react'; // <-- Pastikan 'useMemo' ada
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
import Select from 'react-select'; 
import CreatableSelect from 'react-select/creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSave,
    faTimes,
    // faChartPie, // Unused? Maybe faExternalLinkAlt is better?
    // faHashtag, // Unused?
    faStickyNote,
    faExternalLinkAlt // Icon for 'Outside Activity'
} from '@fortawesome/free-solid-svg-icons';

import { useCategories, useWeeklyPlanMasters } from '../hooks/useWeeklyPlanningAPI';
// Custom hooks
import { usePlanningValidation } from '../hooks/usePlanningValidation'; // Assuming path is correct

const OutsideActivityModal = ({
    show,
    onHide,
    onSave,
    editingDetail = null,
    selectedWeek = null, 
    selectedDay = null, 
    createPlanMaster
}) => {
    const [formData, setFormData] = useState({
        activity_text: '',
        notes: '',
        weekly_plan_master_uid: '',
    });

    const [saveLoading, setSaveLoading] = useState(false);
    const [saveError, setSaveError] = useState(null);

    
    const [isCreatingMaster, setIsCreatingMaster] = useState(false); // <-- [PENAMBAHAN]
    const { categories, loading: categoriesLoading } = useCategories(); 
    const { planMasters, loading: planMastersLoading } = useWeeklyPlanMasters();
    const [selectedCategory, setSelectedCategory] = useState(null);

  // Validation hook
    const {
        errors,
        validateOutsidePlanningForm,
        clearErrors
    } = usePlanningValidation();

  
    useEffect(() => {
        if (show) {
            if (editingDetail) {
                setFormData({
                    activity_text: editingDetail.activity_text || '',
                    notes: editingDetail.notes || '',
                    weekly_plan_master_uid: editingDetail.weekly_plan_master_uid || '',
                });

                if (planMasters.length > 0 && categories.length > 0) {
                    const master = planMasters.find(m => m.uid === editingDetail.weekly_plan_master_uid);
                    if (master) {
                        const category = categories.find(c => c.value === master.weekly_category_uid);
                        setSelectedCategory(category || null);
                    } else {
                        setSelectedCategory(null);
                    }
                }
            } else {
                setFormData({
                    activity_text: '',
                    notes: '',
                    weekly_plan_master_uid: ''
                });

                setSelectedCategory(null);
            }
            clearErrors();
            setSaveError(null);
        }
    }, [show, editingDetail, categories, planMasters, clearErrors]);

    const handleFormChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setSaveError(null);
    };

    const filteredMasterOptions = useMemo(() => {
        if (!selectedCategory) return [];

        return planMasters.filter(master => master && master.weekly_category_uid === selectedCategory.value).map(master => ({
            value: master.uid,
            label: master.plan_text,
        }));
    }, [selectedCategory, planMasters]);


    const stableHandleFormChange = useCallback(handleFormChange, []);

    const handlePlanMasterChange = useCallback((selectedOption) => {
        if (selectedOption) {
            stableHandleFormChange('weekly_plan_master_uid', selectedOption.value);
        } else {
            stableHandleFormChange('weekly_plan_master_uid', '');
        }
    }, [stableHandleFormChange]);

    const handleCreatePlanMaster = useCallback(
        (inputValue) => {
            const newOption = {
                value: null,
                label: inputValue,
                __isNew__: true,
            };
            handlePlanMasterChange(newOption);

            stableHandleFormChange('activity_text', inputValue);

            return Promise.resolve(newOption);
        },
        [handlePlanMasterChange, stableHandleFormChange]
    );

    const handleClose = () => {
        if (!saveLoading) {
        onHide();
        }
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  // --- [VALIDASI] ---
  if (!selectedCategory) {
    setSaveError("Please select a category.");
    return;
  }

  if (!formData.activity_text) {
    setSaveError("Activity Text is required.");
    return;
  }

  if (!validateOutsidePlanningForm(formData)) {
    return;
  }
  // --- [AKHIR VALIDASI] ---

  setSaveLoading(true);
  setSaveError(null);

  try {
    // Ambil UID master yang ada, atau siapkan jika baru
    let finalMasterUid = formData.weekly_plan_master_uid;
    const isNewMaster = !formData.weekly_plan_master_uid && !!formData.activity_text;

    // --- [LOGIKA CREATE MASTER BARU] ---
    if (isNewMaster) {
      if (typeof createPlanMaster !== "function") {
        setSaveError("createPlanMaster is not available.");
        setSaveLoading(false);
        return;
      }

      setIsCreatingMaster(true);
      try {
        // Backend hanya butuh field plan_text (string)
        const newMasterData = {
          plan_text: String(formData.activity_text).trim(),
          // Catatan: weekly_category_uid hanya digunakan sementara di sini
          weekly_category_uid: selectedCategory?.value,
        };

        const createdMaster = await createPlanMaster(newMasterData);
        finalMasterUid = createdMaster?.uid || createdMaster?.id;

        if (!finalMasterUid) {
          throw new Error("createPlanMaster did not return a valid UID.");
        }
      } catch (err) {
        console.error("Gagal create master:", err);
        setSaveError(
          err?.response?.data?.message ||
          err?.message ||
          "Gagal membuat master baru."
        );
        setSaveLoading(false);
        return;
      } finally {
        setIsCreatingMaster(false);
      }
    }
    // --- [AKHIR LOGIKA CREATE MASTER BARU] ---

    // --- [DATA UNTUK OUTSIDE_PLANNING_DETAILS] ---
    const submitData = {
      activity_text: formData.activity_text,
      notes: formData.notes,
      weekly_plan_master_uid: finalMasterUid, // hanya kirim UID master
    };
    // --------------------------------------------

    const success = await onSave(submitData, editingDetail);

    if (success) {
      onHide();
    } else {
      setSaveError("Failed to save outside activity. Please try again.");
    }
  } catch (error) {
    console.error("Save outside activity error:", error);
    setSaveError("An error occurred while saving.");
  } finally {
    setSaveLoading(false);
  }
};




    const activitySuggestions = [
    'Meeting with Client',
    'Training Session',
    ];

    console.log(typeof formData.activity_text);

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

                    {/* Dropdown 1: Kategori */}
                    <Col md={12} className="mb-3">
                        <Form.Group>
                        <Form.Label>Category *</Form.Label>

                        <Select
                        options={categories}
                        value={selectedCategory}
                        onChange={option => {
                        setSelectedCategory(option);
                        handleFormChange('weekly_plan_master_uid', '');
                        handleFormChange('activity_text', '');
                        }}
                        placeholder="Select Category..."
                        isLoading={categoriesLoading}
                        isDisabled={saveLoading || isCreatingMaster}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        menuPortalTarget={document.body}
                        />

                        {saveError && !selectedCategory && (
                            <Form.Text className="text-danger">{saveError}</Form.Text>
                        )}
                        </Form.Group>
                    </Col>

                    <Col md={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Klien / Master *</Form.Label>

                            <CreatableSelect
                            isClearable
                            options={filteredMasterOptions}
                            value={
                                filteredMasterOptions.find(
                                opt => opt.value === formData.weekly_plan_master_uid
                                ) ||
                                (formData.activity_text && !formData.weekly_plan_master_uid
                                ? { value: null, label: formData.activity_text }
                                : null)
                            }
                            onChange={handlePlanMasterChange}
                            onCreateOption={handleCreatePlanMaster}
                            placeholder={
                                selectedCategory
                                ? 'Select or create a Client...'
                                : 'Select a Category first'
                            }
                            isLoading={isCreatingMaster || planMastersLoading}
                            isDisabled={!selectedCategory || saveLoading || isCreatingMaster}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            menuPortalTarget={document.body}
                            formatCreateLabel={inputValue => `New Client: "${inputValue}"`}
                            />
                        </Form.Group>
                        </Col>

                    {/* Activity Description */}
                    <Col md={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>
                            <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" />
                            Activity Description *
                            </Form.Label>

                            {/* [FIX BUG 2] Hapus 'readOnly' */}
                            <Form.Control
                            as="textarea"
                            rows={3}
                            value={formData.activity_text}
                            onChange={(e) => handleFormChange('activity_text', e.target.value)}
                            placeholder="Write activity description here..."
                            isInvalid={!!errors?.activity_text}
                            disabled={saveLoading || isCreatingMaster}
                            />

                            <Form.Control.Feedback type="invalid">
                            {errors?.activity_text}
                            </Form.Control.Feedback>

                            <Form.Text className="text-muted">
                            {/* [FIX BUG 2] Teks helper baru */}
                            Anda bisa memilih Klien (untuk mengisi teks) ATAU mengetik manual.
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