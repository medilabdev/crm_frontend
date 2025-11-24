import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const UploadContactModal = ({ show, onClose, companyUid }) => {
  const token = localStorage.getItem("token");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Swal.fire("No File Selected", "Please select an Excel file to upload.", "warning");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile); 

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/companies/${companyUid}/contacts/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Upload Successful!",
        text: "Contacts have been added to the company.",
        icon: "success",
      }).then(() => {
        window.location.reload(); 
      });

    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong!";
      Swal.fire("Upload Failed", message, "error");
    } finally {
      setIsUploading(false);
      onClose();
    }
    
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload Contacts from Template</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Select the completed Excel template file. The contacts will be added to this company.
        </p>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control 
            type="file" 
            accept=".xlsx, .xls, .csv"
            onChange={handleFileChange} 
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleUpload} 
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadContactModal;