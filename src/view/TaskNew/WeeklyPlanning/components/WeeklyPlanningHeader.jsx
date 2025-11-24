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
        {/* ===================== HEADER CONTROLS ===================== */}
        <Card className="mb-4 border-0 shadow-sm">
        <Card.Body>
            <Row className="align-items-end g-3">

            {/* 1️⃣ Import Button */}
            <Col md="auto">
                <Button
                variant="outline-success"
                onClick={onShowImportModal}
                disabled={loading}
                title="Import Weekly Plan Masters from Excel"
                className="d-flex align-items-center px-3"
                >
                <FontAwesomeIcon icon={faFileExcel} className="me-2" />
                Import Excel
                </Button>
            </Col>

            {/* 2️⃣ Branch Selection */}
            <Col md={4}>
                <Form.Group controlId="branchSelect">
                <Form.Label className="fw-bold mb-1">
                    <FontAwesomeIcon icon={faBuilding} className="me-2" />
                    Branch <span className="text-danger">*</span>
                </Form.Label>
                <InputGroup>
                    <Select
                    className="flex-grow-1"
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

            {/* 3️⃣ Month Picker */}
            <Col md={3}>
                <Form.Group controlId="monthPicker">
                <Form.Label className="fw-bold mb-1">
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                    Month <span className="text-danger">*</span>
                </Form.Label>
                <DatePicker
                    selected={selectedMonth}
                    onChange={onMonthChange}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    className="form-control"
                    disabled={loading}
                    wrapperClassName="d-block"
                />
                </Form.Group>
            </Col>

            {/* 4️⃣ Status Info */}
            <Col md={2}>
                <Form.Group controlId="statusInfo">
                <Form.Label className="fw-bold mb-1">Status</Form.Label>
                <div className="pt-1">
                    {loading ? (
                    <Spinner animation="border" size="sm" variant="secondary" />
                    ) : hasExistingPlanning ? (
                    <span className="badge bg-success fs-6">Planning Loaded</span>
                    ) : (
                    <span className="badge bg-secondary fs-6">No Planning</span>
                    )}
                </div>
                </Form.Group>
            </Col>

            {/* 5️⃣ Action Buttons */}
            <Col md={2} className="text-end">
                {selectedBranch?.label && !hasExistingPlanning && (
                <Button
                    variant="primary"
                    onClick={handleOpenCreateModal}
                    disabled={loading}
                    className="px-3"
                >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Create
                </Button>
                )}

                {hasExistingPlanning && (
                <Button
                    variant="outline-secondary"
                    onClick={() => window.location.reload()}
                    disabled={loading}
                    title="Refresh Data"
                    className="px-3 ms-2"
                >
                    <FontAwesomeIcon icon={faRefresh} />
                </Button>
                )}
            </Col>
            </Row>
        </Card.Body>
        </Card>

        {/* ===================== CREATE PLANNING MODAL ===================== */}
        <Modal show={showCreateModal} onHide={handleCloseCreateModal} centered>
        <Modal.Header closeButton={!createLoading}>
            <Modal.Title>Create Weekly Planning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {createError && <Alert variant="danger">{createError}</Alert>}

            <p className="mb-1">
            Are you sure you want to create a new weekly planning for{" "}
            <strong>{selectedBranch?.label}</strong> in{" "}
            <strong>
                {selectedMonth?.toLocaleString("id-ID", {
                month: "long",
                year: "numeric",
                })}
            </strong>
            ?
            </p>
            <p className="text-muted small mb-0">
            The system will generate default weeks and working days for this period.
            </p>
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
            variant="primary"
            onClick={handleSubmitCreate}
            disabled={createLoading}
            className="px-3"
            >
            {createLoading ? (
                <>
                <Spinner size="sm" className="me-2" /> Creating...
                </>
            ) : (
                <>
                <FontAwesomeIcon icon={faPlus} className="me-2" /> Create Planning
                </>
            )}
            </Button>
        </Modal.Footer>
        </Modal>

        {/* ===================== CREATE BRANCH MODAL ===================== */}
        <CreateBranchModal
        show={showCreateBranchModal}
        onHide={handleHideCreateBranchModal}
        onBranchCreated={handleBranchCreated}
        />


        </>
    );
};

export default WeeklyPlanningHeader;
