import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  faBullseye // Ikon yang benar
} from '@fortawesome/free-solid-svg-icons';

import { useCategories, useWeeklyPlanMasters } from '../hooks/useWeeklyPlanningAPI';
// Custom hooks
import { usePlanningValidation } from '../hooks/usePlanningValidation'; // Asumsi hook ini ada

/**
 * Modal for creating/editing planning details
 */
const PlanningDetailModal = ({
  show,
  onHide,
  onSave, // Fungsi dari parent untuk save DETAIL
  editingDetail = null,
  selectedWeek = null,
  selectedDay = null,
  weeklyPlanMasters = [], // List master yang ada {uid, plan_text} atau {value, label}
  loading = false, // Loading umum dari parent
  createPlanMaster, 
}) => {

  const [formData, setFormData] = useState({
    weekly_plan_master_uid: '',
    weekly_plan_text: '',
    plan_notes: '',
    weekly_report_text: '',
    report_notes: ''
  });

  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [isCreatingMaster, setIsCreatingMaster] = useState(false);
  const [createMasterError, setCreateMasterError] = useState(null);

  const { categories, loading: categoriesLoading } = useCategories(); 
  // Ini adalah data untuk Dropdown 2 (Klien/Master)
  const { planMasters, loading: planMastersLoading } = useWeeklyPlanMasters();
  const [selectedCategory, setSelectedCategory] = useState(null);


  // Hook validasi (asumsi sudah bekerja)
  const {
    errors,
    validatePlanningDetailForm,
    clearErrors
  } = usePlanningValidation();

  // Efek untuk mengisi form saat modal dibuka atau data edit berubah
  console.log('Editing Detail di Modal:', editingDetail);
  
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

        const master = weeklyPlanMasters.find(m => m.uid === editingDetail.weekly_plan_master_uid);
        if (master) {
          const category = categories.find(cat => cat.value === master.weekly_category_uid);
          setSelectedCategory(category || null);
        } else {
          setSelectedCategory(null);
        }
      } else {
        // Reset form untuk detail baru
        setFormData({
          weekly_plan_master_uid: '',
          weekly_plan_text: '',
          plan_notes: '',
          weekly_report_text: '',
          report_notes: ''
        });

        setSelectedCategory(null);
      }
      clearErrors(); // Hapus error validasi lama
      setSaveError(null); // Hapus error save lama
      setCreateMasterError(null); // Hapus error create master lama
    }
  }, [show, editingDetail, clearErrors, categories, weeklyPlanMasters]);

  const handleFormChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Hapus error saat user mulai mengetik lagi
    setSaveError(null);
    setCreateMasterError(null);
  }, []);

  const filteredMasterOptions = useMemo(() => {
    if (!selectedCategory) {
      return [];
    }
    return planMasters
      .filter(master => master && master.weekly_category_uid === selectedCategory.value)
      .map(master => ({
        value: master.uid,
        label: master.plan_text,
      }));
  }, [selectedCategory, planMasters]);

  const handlePlanMasterChange = useCallback((selectedOption) => {
    if (selectedOption) {
      const newUid = selectedOption.value; // Ini akan jadi UID asli (atau value temp jika error API)
      const newText = selectedOption.label;
      console.log(`Update formData: UID=${newUid}, Text=${newText}`);
      // Update UID dan Text di formData
      handleFormChange('weekly_plan_master_uid', newUid);
      handleFormChange('weekly_plan_text', newText);
    } else {
      // Jika pilihan dihapus (clear)
      console.log('Hapus pilihan plan master...');
      handleFormChange('weekly_plan_master_uid', '');
      handleFormChange('weekly_plan_text', '');
    }
    console.log('--- Akhir handlePlanMasterChange ---');
  }, [handleFormChange]); 

  const handleCreatePlanMaster = useCallback((inputValue) => {     
    const newOption = {
        value: null, 
        label: inputValue,
        __isNew__: true 
    };

    handlePlanMasterChange(newOption); 
    return Promise.resolve(newOption);
  }, [handlePlanMasterChange]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Cegah submit HTML biasa

    if (!selectedCategory) {
      setSaveError('Kategori wajib dipilih.');
      return;
    }

    // Validasi form
    if (!validatePlanningDetailForm(formData)) {
      console.warn('Validasi form gagal.');
      return; // Stop jika tidak valid
    }

    setSaveLoading(true);
    setSaveError(null);

    try {
      const submitData = { ...formData, weekly_category_uid: selectedCategory.value };
      console.log('Submit data detail:', submitData);

      // Panggil fungsi onSave dari parent (index.jsx)
      const success = await onSave(submitData, editingDetail);

      if (success) {
        console.log('Save detail sukses, tutup modal.');
        onHide(); // Tutup modal jika sukses
      } else {
        console.error('Fungsi onSave melaporkan kegagalan.');
        setSaveError('Gagal menyimpan detail. Coba lagi.');
      }
    } catch (error) {
      console.error('Error saat save detail tertangkap di modal:', error);
      setSaveError(error.response?.data?.message || 'Terjadi error tak terduga saat menyimpan detail.');
    } finally {
      setSaveLoading(false); // Pastikan loading berhenti
    }
  };

  // Handler tutup modal (cek loading state)
  const handleClose = () => {
    if (!saveLoading && !isCreatingMaster) { // Cek kedua loading
      onHide();
    }
  };

  const activitySuggestions = [
    'Meeting with Client',
    'Training Session',
  ];

  return (
    <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        // Keyboard={!saveLoading && !isCreatingMaster} // Bisa juga disable keyboard saat create master
        keyboard={!saveLoading}
    >
        <Modal.Header closeButton={!saveLoading && !isCreatingMaster}> {/* Disable close saat loading */}
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
                        <Col md={6}><strong>Week:</strong> {selectedWeek?.week_name || `Week ${selectedWeek?.week_number}` || 'N/A'}</Col>
                        <Col md={6}><strong>Day:</strong> {selectedDay?.day_name || 'N/A'} ({selectedDay?.day_date ? new Date(selectedDay.day_date).toLocaleDateString('id-ID') : 'N/A'})</Col>
                    </Row>
                </Alert>

                 {/* ✅ Error Create Master */}
                {createMasterError && ( <Alert variant="danger" className="mb-3">{createMasterError}</Alert> )}

                {/* Error Save Detail */}
                {saveError && ( <Alert variant="danger" className="mb-3">{saveError}</Alert> )}


                {/* --- Planning Section --- */}
                <h5 className="mb-3"><FontAwesomeIcon icon={faBullseye} className="me-2 text-primary"/> Planning</h5>
                <Row>

                    {/* Category Selection */}
                    <Col md={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Category *</Form.Label>
                            <Select
                                options={categories} 
                                value={selectedCategory}
                                onChange={(option) => {
                                    setSelectedCategory(option);
                                    handleFormChange('weekly_plan_master_uid', '');
                                    handleFormChange('weekly_plan_text', '');
                                }}
                                placeholder="Select Category..."
                                isLoading={categoriesLoading}
                                isDisabled={saveLoading || isCreatingMaster || loading}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
                            />
                            {saveError && !selectedCategory && (
                                <Form.Text className="text-danger">
                                    {saveError}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>

                    {/* Plan Master Selection */}
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Client / Office</Form.Label>

                        <CreatableSelect
                          isClearable
                          options={filteredMasterOptions}
                          value={
                            filteredMasterOptions.find(opt => opt.value === formData.weekly_plan_master_uid)
                            || (formData.weekly_plan_text && !formData.weekly_plan_master_uid
                              ? { value: null, label: formData.weekly_plan_text }
                              : null)
                          }
                          onChange={handlePlanMasterChange}
                          onCreateOption={handleCreatePlanMaster}
                          placeholder={
                            selectedCategory
                              ? 'Choose or create Client...'
                              : 'Select Category first'
                          }
                          isLoading={isCreatingMaster || planMastersLoading}
                          isDisabled={
                            !selectedCategory
                            || saveLoading
                            || loading
                            || isCreatingMaster
                          }
                          styles={{
                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                          }}
                          menuPortalTarget={document.body}
                          formatCreateLabel={inputValue => `[New] Create Client: "${inputValue}"`}
                        />

                        <Form.Text>
                          Choose an existing Client or type to create a new one.
                        </Form.Text>

                        {createMasterError && (
                          <Form.Text className="text-danger">
                            {createMasterError}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>


                    {/* Weekly Plan Text */}
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Plan Description *</Form.Label>

                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={formData.weekly_plan_text}
                          onChange={e => handleFormChange('weekly_plan_text', e.target.value)}
                          placeholder="Describe the planned activity..."
                          isInvalid={!!errors?.weekly_plan_text}
                          readOnly={!!formData.weekly_plan_master_uid}
                          disabled={saveLoading || isCreatingMaster}
                        />

                        {formData.weekly_plan_master_uid && (
                          <Form.Text>
                            Plan text is linked to the selected Client and cannot be edited directly.
                          </Form.Text>
                        )}

                        {/* Pesan error validasi */}
                        <Form.Control.Feedback type="invalid">
                          {errors?.weekly_plan_text}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>


                    {/* Plan Notes */}
                    <Col md={12} className="mb-3">
                        <Form.Group>
                            <Form.Label>Plan Notes (Optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={formData.plan_notes}
                                onChange={(e) => handleFormChange('plan_notes', e.target.value)}
                                placeholder="Add any notes related to the plan..."
                                isInvalid={!!errors?.plan_notes}
                                disabled={saveLoading || isCreatingMaster}
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
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.weekly_report_text}
                                onChange={(e) => handleFormChange('weekly_report_text', e.target.value)}
                                placeholder="Describe the actual activity performed..."
                                isInvalid={!!errors?.weekly_report_text}
                                disabled={saveLoading || isCreatingMaster}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors?.weekly_report_text}
                            </Form.Control.Feedback>
                            <Form.Text>Click suggestions below to quickly fill.</Form.Text>
                        </Form.Group>
                    </Col>

                     {/* Report Suggestions */}
                     <Col md={12} className="mb-3">
                         <Form.Label className="small text-muted">Quick Report Suggestions:</Form.Label>
                         <div className="d-flex flex-wrap gap-1">
                             {activitySuggestions.map((suggestion, index) => (
                                 <Button
                                    key={index} variant="outline-secondary" size="sm"
                                    onClick={() => handleFormChange('weekly_report_text', suggestion)}
                                    disabled={saveLoading || isCreatingMaster} className="mb-1"
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
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={formData.report_notes}
                                onChange={(e) => handleFormChange('report_notes', e.target.value)}
                                placeholder="Add any notes about the outcome..."
                                isInvalid={!!errors?.report_notes}
                                disabled={saveLoading || isCreatingMaster}
                            />
                             <Form.Control.Feedback type="invalid">
                                {errors?.report_notes}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

            </Modal.Body>

            <Modal.Footer>
                {/* Tombol Cancel */}
                <Button variant="secondary" onClick={handleClose} disabled={saveLoading || isCreatingMaster}>
                    <FontAwesomeIcon icon={faTimes} className="me-2" /> Cancel
                </Button>
                {/* Tombol Save/Update */}
                <Button type="submit" variant="primary" disabled={saveLoading || isCreatingMaster}>
                    {saveLoading ? (
                        <><Spinner size="sm" className="me-2" /> Saving...</>
                    ) : (
                        <><FontAwesomeIcon icon={faSave} className="me-2" /> {editingDetail ? 'Update Detail' : 'Save Detail'}</>
                    )}
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>
  );
};

export default PlanningDetailModal;