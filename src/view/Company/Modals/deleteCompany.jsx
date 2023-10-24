import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteCompany = ({ visible, onClose, uid }) => {
  return (
    <>
      <Modal show={visible} onHide={onClose} centered>
        <Modal.Header closeButton>Delete Company</Modal.Header>
        <Modal.Body>
          <h5>Are you sure delete this company</h5>
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

export default DeleteCompany;
