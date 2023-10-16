import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteUser = ({ visible, onClose }) => {
  return (
    <>
      <Modal show={visible} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure delete this user?</h5>
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

export default DeleteUser;
