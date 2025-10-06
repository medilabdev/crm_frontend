import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const DeleteContact = ({ visible, onClose, uid }) => {
  const token = localStorage.getItem("token");

  // Nama fungsi diubah agar lebih sesuai
  const requestDeleteContact = async () => {
    try {
      // URL diubah ke endpoint request-delete
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/contacts/${uid}/request-delete`,
        {}, // Body kosong
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Pesan sukses diubah
      Swal.fire({
        title: "Request Sent!",
        text: "Your request to delete the contact has been sent for approval.",
        icon: "success",
      });
      onClose();
      window.location.reload(); // Reload untuk update UI
    } catch (err) {
      const message = err.response?.data?.message || "Failed to send request.";
      Swal.fire("Error!", message, "error");
      onClose();
    }
  };

  return (
    <Modal show={visible} onHide={onClose} centered>
      <Modal.Header closeButton>Request Delete Contact</Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want to request deletion for this contact?</h5>
        <p className="text-muted small">This action will be sent to an admin for approval.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={requestDeleteContact}>
          Yes, Send Request
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteContact;