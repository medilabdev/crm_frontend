import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteContact = ({ visible, onClose, uid }) => {
  const token = localStorage.getItem("token");
  return (
    <>
      <Modal show={visible} onHide={onClose} centered>
        <Modal.Header closeButton>Delete Contact</Modal.Header>
        <Modal.Body>
          <h5>Are you sure delete this contact</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="danger" onClick={onClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteContact;
