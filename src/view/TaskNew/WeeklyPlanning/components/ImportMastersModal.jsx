import React, { useState, useCallback } from 'react';
import {
    Modal,
    Form,
    Button,
    Alert,
    Spinner,
    ListGroup
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileExcel,
    faUpload,
    faDownload,
    faTimes,
    faCheckCircle,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

// Impor hook API utama kita
import { useWeeklyPlanningAPI } from '../hooks/useWeeklyPlanningAPI'; 
// (Asumsi) Anda punya hook SweetAlert
import Swal from 'sweetalert2';
/**
 * Modal untuk meng-upload file Excel (Task 3)
 */
const ImportMastersModal = ({
    show,
    onHide,
    onImportSuccess // Fungsi (opsional) untuk memicu refetch master list di parent
}) => {
    
    // State untuk file yang dipilih
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // State untuk hasil respons
    const [apiError, setApiError] = useState(null);
    const [apiSuccess, setApiSuccess] = useState(null);

    // Panggil hook API kita (Task 5.1)
    const { masterImport } = useWeeklyPlanningAPI();

    // Handler saat file dipilih
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setApiError(null); // Hapus error lama
            setApiSuccess(null);
        } else {
            setSelectedFile(null);
        }
    };

    // Handler untuk men-download template
    const handleDownloadTemplate = () => {
        // Buat data CSV/Excel sederhana di client-side
        const headers = "client_name,category_name";
        const exampleData = [
            "PT ABC Indonesia,Perusahaan",
            "Sekolah Cendekia,Pendidikan",
            "Aktivitas Kantor,Internal/Office"
        ].join("\n");
        
        const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + exampleData;
        
        // Buat link download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "template_import_masters.csv"); // Beri nama .csv
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Handler saat form di-submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedFile) {
            setApiError("Please select a file to upload.");
            return;
        }

        setIsUploading(true);
        setApiError(null);
        setApiSuccess(null);

        // 1. Siapkan FormData (wajib untuk upload file)
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // 2. Panggil API Impor Excel (Task 3)
            const response = await masterImport.importExcel(formData);
            
            // 3. Tampilkan hasil sukses
            setApiSuccess(response); // Simpan data { success_count, failed_count, errors }

            // (Opsional) Tampilkan SweetAlert sukses
            Swal.fire({
                icon: 'success',
                title: 'Import Completed',
                text: response.message || 'Masters imported successfully.',
            });

            // 4. Reset file input
            setSelectedFile(null);
            e.target.reset(); // Reset form

            // 5. Beri tahu parent (index.jsx) agar me-refetch master
            if (onImportSuccess) {
                onImportSuccess();
            }

        } catch (error) {
            // Tangkap error validasi 422 atau error 500
            const errorMsg = error.response?.data?.message || error.message || "An unexpected error occurred.";
            const validationErrors = error.response?.data?.errors;

            if (validationErrors?.file) {
                setApiError(`Validation Error: ${validationErrors.file[0]}`);
            } else {
                setApiError(errorMsg);
            }
        } finally {
            setIsUploading(false);
        }
    };

    // Handler tutup modal
    const handleClose = () => {
        if (isUploading) return; // Jangan tutup saat sedang upload
        
        // Reset semua state saat modal ditutup
        setSelectedFile(null);
        setApiError(null);
        setApiSuccess(null);
        onHide();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            backdrop="static"
            keyboard={!isUploading}
        >
            <Modal.Header closeButton={!isUploading}>
                <Modal.Title>
                    <FontAwesomeIcon icon={faFileExcel} className="me-2" />
                    Import Klien / Master from Excel
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    
                    {/* --- 1. Tombol Download Template --- */}
                    <Alert variant="info">
                        <strong>Step 1: Download Template</strong>
                        <p className="mb-2">
                            Download the template file (.csv) and fill in your client/master data.
                            Make sure the `category_name` matches exactly (e.g., "Perusahaan", "Pendidikan").
                        </p>
                        <Button
                            variant="info"
                            size="sm"
                            onClick={handleDownloadTemplate}
                        >
                            <FontAwesomeIcon icon={faDownload} className="me-2" />
                            Download Template
                        </Button>
                    </Alert>

                    {/* --- 2. Form Upload --- */}
                    <h5 className="mt-4">Step 2: Upload File</h5>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Select .xlsx or .csv file</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".xlsx, .xls, .csv" // Terima CSV juga
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                    </Form.Group>

                    {/* --- 3. Hasil Alert (Sukses atau Gagal) --- */}
                    {apiError && (
                        <Alert variant="danger">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                            <strong>Upload Failed:</strong> {apiError}
                        </Alert>
                    )}

                    {apiSuccess && (
                        <Alert variant={apiSuccess.data.failed_count > 0 ? "warning" : "success"}>
                            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                            <strong>Import Finished.</strong>
                            <ul className="mb-0 mt-2">
                                <li>{apiSuccess.data.success_count} rows imported successfully.</li>
                                <li>{apiSuccess.data.failed_count} rows failed.</li>
                            </ul>

                            {/* Tampilkan rincian error dari BE */}
                            {apiSuccess.data.errors && apiSuccess.data.errors.length > 0 && (
                                <ListGroup className="mt-2" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                    <ListGroup.Item variant="danger">
                                        <strong>Failure Details:</strong>
                                    </ListGroup.Item>
                                    {apiSuccess.data.errors.map((err, index) => (
                                        <ListGroup.Item key={index} variant="light">
                                            <small>{err}</small>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Alert>
                    )}

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isUploading}>
                        <FontAwesomeIcon icon={faTimes} className="me-2" /> Close
                    </Button>
                    <Button 
                        type="submit" 
                        variant="success" 
                        disabled={!selectedFile || isUploading}
                    >
                        {isUploading ? (
                            <><Spinner size="sm" className="me-2" /> Uploading...</>
                        ) : (
                            <><FontAwesomeIcon icon={faUpload} className="me-2" /> Upload & Import</>
                        )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ImportMastersModal;