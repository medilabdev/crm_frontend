import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DeleteUser = ({ visible, onClose, uid }) => {
  const token = localStorage.getItem("token");
  const deleteUser = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Successfully delete user",
        text: "Successfuly delete user",
        icon: "success",
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("gagal menghapus pengguna");
    }
  };

  return (
    <>
      <Modal show={visible} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure delete this user? </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteUser;
