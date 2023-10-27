import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteSingle = ({ visible, onClose, uid }) => {
  const token = localStorage.getItem("token");
  const arrUid = [uid];
  const deleteData = async () => {};
  return (
    <>
      <Modal show={visible} onHide={onClose} centered>
        <Modal.Header closeButton>Delete Product</Modal.Header>
        <Modal.Body>
          <h5>Are you sure delete this product </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteData}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteSingle;
