import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const DeleteContact = ({ visible, onClose, uid }) => {
  const token = localStorage.getItem("token");
  console.log(uid);
  const deleteContact = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/contacts/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Successfully delete contact",
        text: "Successfully delete contact",
        icon: "success",
      });
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("gagal menghapus contact");
    }
  };
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
          <Button variant="danger" onClick={deleteContact}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteContact;
