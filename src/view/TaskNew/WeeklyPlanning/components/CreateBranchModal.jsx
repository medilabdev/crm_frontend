import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { branchService } from '../services/weeklyPlanningService';
// Asumsi kita akan butuh API call (misal dari hook atau service)
// import { branchService } from '../services/weeklyPlanningService'; // Sesuaikan path

const CreateBranchModal = ({ show, onHide, onBranchCreated }) => {
    // State untuk form
    const [branchName, setBranchName] = useState('');
    const [branchAddress, setBranchAddress] = useState('');
    // State untuk loading & error
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Reset form saat modal dibuka/ditutup
    useEffect(() => {
        if (!show) {
            setBranchName('');
            setBranchAddress('');
            setError(null);
            setIsLoading(false);
        }
    }, [show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!branchName.trim()) {
            setError('Branch name is required.');
            return;
        }

        setIsLoading(true);
        try {
            console.log('Calling API branchService.create...');
            const branchData = { 
                name: branchName, 
                address: branchAddress || null // Kirim null jika alamat kosong
                // Tambahkan is_active: 1 jika diperlukan oleh backend
            };
            const response = await branchService.create(branchData); 

            if (response && response.data) {
                 const newBranchData = response.data;
                 console.log('API Create Branch Success:', newBranchData);

                 if (onBranchCreated) {
                     onBranchCreated(newBranchData); 
                 }
                 onHide();
            } else {
                 console.error('Create branch API succeeded but returned no data:', response);
                 setError('Branch created, but failed to load new data.');
            }

        } catch (err) {
            console.error("Failed to create branch:", err);
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred while creating the branch.';
            
            if (err.response?.status === 422 && err.response?.data?.errors) {
                const validationErrors = Object.values(err.response.data.errors).flat().join(' ');
                setError(`Validation failed: ${validationErrors}`);
            } else {
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} backdrop="static" keyboard={!isLoading} centered>
                <Modal.Header closeButton={!isLoading}>
                <Modal.Title>
                    <FontAwesomeIcon icon={faBuilding} className="me-2" /> Create New Branch
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group className="mb-3" controlId="createBranchName">
                        <Form.Label>Branch Name *</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter branch name"
                            value={branchName}
                            onChange={(e) => setBranchName(e.target.value)}
                            isInvalid={!branchName.trim() && error} // Tampilkan error jika kosong & ada submit error
                            disabled={isLoading}
                            required
                        />
                         <Form.Control.Feedback type="invalid">
                             Please provide a branch name.
                         </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="createBranchAddress">
                        <Form.Label>Address (Optional)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter branch address"
                            value={branchAddress}
                            onChange={(e) => setBranchAddress(e.target.value)}
                            disabled={isLoading}
                        />
                    </Form.Group>
                    {/* Tambahkan field lain jika perlu (misal is_active) */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide} disabled={isLoading}>
                        <FontAwesomeIcon icon={faTimes} className="me-2" /> Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={isLoading}>
                        {isLoading ? (
                            <><Spinner size="sm" className="me-2" /> Saving...</>
                        ) : (
                            <><FontAwesomeIcon icon={faSave} className="me-2" /> Save Branch</>
                        )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CreateBranchModal;