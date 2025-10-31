import React, { useState, useCallback } from 'react'; // Added useCallback
import {
    Row, Col, Card, Button, Form, Modal, Alert, Spinner, InputGroup
} from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus, faCalendarAlt, faBuilding, faRefresh, faFileExcel
} from '@fortawesome/free-solid-svg-icons';
import { usePlanningValidation } from '../hooks/usePlanningValidation';
import CreateBranchModal from './CreateBranchModal';
// Utils
import { formatDate, getWeekStartDate, formatDateForAPI } from '../utils/dateUtils';

/**
 * Header component with controls and filters
 */
const WeeklyPlanningHeader = ({
    selectedBranch,
    selectedMonth,
    branches = [],
    onBranchChange,
    onMonthChange,
    onCreatePlanning, 
    loading = false, 
    hasExistingPlanning = false,
    onRefetchBranches,
    onShowImportModal
}) => {
  // Local state for create modal
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [createError, setCreateError] = useState(null);
    const [showCreateBranchModal, setShowCreateBranchModal] = useState(false);


    const handleOpenCreateModal = () => {
        setCreateError(null); // Clear previous errors
        setShowCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        if (createLoading) return; 
        setShowCreateModal(false);
    };

    const handleShowCreateBranchModal = () => setShowCreateBranchModal(true);
    const handleHideCreateBranchModal = () => setShowCreateBranchModal(false);

    const handleBranchCreated = (newBranchData) => {
        console.log('Branch baru dibuat:', newBranchData, 'Memicu refetch...');
        // Panggil fungsi refetch dari parent (index.jsx)
        if (onRefetchBranches) {
            onRefetchBranches();
        }
        // Opsional: Langsung pilih branch baru?
        const newOption = { value: newBranchData.uid, label: newBranchData.name };
        onBranchChange(newOption); 
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        setCreateError(null);

        try {
            const success = await onCreatePlanning();
            if (success) {
                handleCloseCreateModal(); 
            } else {
                setCreateError('Failed to create weekly planning. Please try again.');
            }
        } catch (error) {
            console.error('Create planning error in header:', error);
            setCreateError('An error occurred while initiating the planning.');
        } finally {
            setCreateLoading(false);
        }
    };

    const branchOptions = branches || []; 

    return (
        <>
        {/* Header Controls */}

        <Card className="mb-4 shadow-sm"> {/* Tambah shadow untuk konsistensi */}
            <Card.Body>
                <Row className="align-items-center">

                    <Button 
                        variant="outline-success" 
                        onClick={onShowImportModal} // <-- Panggil handler dari parent
                        title="Import Masters from Excel"
                    >
                        <FontAwesomeIcon icon={faFileExcel} /> Import
                    </Button>
                    {/* Branch Selection */}
                    <Col md={4} className="mb-3 mb-md-0">
                        <Form.Group>
                            <Form.Label className="fw-bold">
                                <FontAwesomeIcon icon={faBuilding} className="me-2" /> Branch *
                            </Form.Label>
                            {/* ✅ 5. Tambahkan InputGroup & Tombol "+" */}
                            <InputGroup>
                                <Select
                                    className="flex-grow-1" // Agar select mengisi sisa ruang
                                    value={selectedBranch}
                                    onChange={onBranchChange}
                                    options={branchOptions}
                                    placeholder="Select branch..."
                                    isSearchable
                                    isClearable
                                    isLoading={loading}
                                    isDisabled={loading}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    menuPortalTarget={document.body}
                                />
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={handleShowCreateBranchModal}
                                    disabled={loading}
                                    title="Create New Branch"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </InputGroup>
                        </Form.Group>
                    </Col>

                    {/* Month Selection */}
                    <Col md={3} className="mb-3 mb-md-0">
                        <Form.Group>
                            <Form.Label className="fw-bold">
                                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                                Month *
                            </Form.Label>
                            {/* ✅ DatePicker Month sudah benar */}
                            <DatePicker
                                selected={selectedMonth}
                                onChange={onMonthChange} // Panggil prop dari index.jsx
                                dateFormat="MMMM yyyy"
                                showMonthYearPicker
                                className="form-control" // Bootstrap styling
                                disabled={loading}
                                wrapperClassName="d-block" // Ensure full width
                            />
                        </Form.Group>
                    </Col>

                    {/* Status Info */}
                    <Col md={3} className="mb-3 mb-md-0">
                        <Form.Group>
                            <Form.Label className="fw-bold">Status</Form.Label>
                            {/* ✅ Tampilkan status planning */}
                            <div style={{ paddingTop: '8px' }}> {/* Align vertical with inputs */}
                                {loading ? (
                                    <Spinner animation="border" size="sm" variant="secondary"/>
                                ) : hasExistingPlanning ? (
                                    <span className="badge bg-success fs-6">Planning Loaded</span>
                                ) : (
                                    <span className="badge bg-secondary fs-6">No Planning</span>
                                )}
                            </div>
                        </Form.Group>
                    </Col>

                    {/* Action Buttons */}
                    <Col md={2} className="text-end align-self-end"> {/* Align button ke bawah */}
                        {/* ✅ Tombol Create Planning */}
                        {selectedBranch?.label && !hasExistingPlanning && (
                            <Button
                                variant="primary"
                                onClick={handleOpenCreateModal} // Buka modal konfirmasi
                                disabled={loading}
                            >
                                <FontAwesomeIcon icon={faPlus} className="me-2" />
                                Create
                            </Button>
                        )}
                        {/* ✅ Tombol Refresh (opsional, reload simpel) */}
                        {hasExistingPlanning && (
                            <Button
                                variant="outline-secondary"
                                // Pertimbangkan ganti window.location.reload() dengan prop onRefresh dari index.jsx
                                // onClick={onRefresh} // Jika ada prop onRefresh yg panggil refetchPlanningData()
                                onClick={() => window.location.reload()} // Reload simpel
                                disabled={loading}
                                size="sm"
                                title="Refresh Data"
                            >
                                <FontAwesomeIcon icon={faRefresh} />
                            </Button>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>

        {/* Create Planning Confirmation Modal - ✅ SOLVED: Disederhanakan */}
        <Modal show={showCreateModal} onHide={handleCloseCreateModal} centered>
            <Modal.Header closeButton={!createLoading}>
                <Modal.Title>Confirm Create Planning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {createError && (
                    <Alert variant="danger">{createError}</Alert>
                )}
                <p>
                    Are you sure you want to create a new weekly planning for{' '}
                    <strong>{selectedBranch?.label}</strong> in{' '}
                    <strong>{selectedMonth?.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}</strong>?
                </p>
                <p className="text-muted small">
                    The system will generate the default weeks and working days for this period.
                </p>
                {/* 🗑️ HAPUS SEMUA FORM FIELDS DARI MODAL INI */}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleCloseCreateModal}
                    disabled={createLoading}
                >
                    Cancel
                </Button>
                {/* ✅ Tombol Create panggil handleSubmitCreate (yg call onCreatePlanning) */}
                <Button
                    variant="primary"
                    onClick={handleSubmitCreate} // Trigger create process
                    disabled={createLoading}
                >
                    {createLoading ? (
                        <><Spinner size="sm" className="me-2" /> Creating...</>
                    ) : (
                        <><FontAwesomeIcon icon={faPlus} className="me-2" /> Create Planning</>
                    )}
                </Button>
            </Modal.Footer>
        </Modal>

        <CreateBranchModal 
            show={showCreateBranchModal}
            onHide={handleHideCreateBranchModal}
            onBranchCreated={handleBranchCreated} // Kirim callback
        />

        </>
    );
};

export default WeeklyPlanningHeader;
