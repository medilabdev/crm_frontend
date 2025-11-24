import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const DeleteCompany = ({ visible, onClose, uid, isPending }) => {
  const token = localStorage.getItem("token");

  const requestDeleteCompany = async () => {
    if (isPending) return; // 🚫 stop kalau masih pending
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/companies/${uid}/request-delete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        title: "Request Sent!",
        text: "Your request to delete the company has been sent for approval.",
        icon: "success",
      }).then(() => window.location.reload());
      onClose();
    } catch (err) {
      const message = err.response?.data?.message || "Failed to send request.";
      Swal.fire("Error!", message, "error");
      onClose();
    }
  };

  return (
    <Modal show={visible} onHide={onClose} centered>
      <Modal.Header closeButton>Request Delete Company</Modal.Header>
      <Modal.Body>
        <h5>
          {isPending
            ? "This company already has a pending deletion request."
            : "Are you sure you want to request deletion for this company?"}
        </h5>
        <p className="text-muted small">
          This action will be sent to an admin for approval.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={isPending}
          onClick={requestDeleteCompany}
        >
          {isPending ? "Waiting Approval..." : "Yes, Send Request"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default DeleteCompany;
