import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
const DeleteSingle = ({ visible, onClose, uid }) => {
  const token = localStorage.getItem("token");
  const arrUid = [uid];

  const deleteData = () => {
    try {
      const formData = new FormData();
      formData.append("product_uid[]", arrUid);
      formData.append("_method", "delete");
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/products/delete/item`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            text: "Successfully delete contact",
            icon: "success",
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.reload();
            }
          });
        });
    } catch (error) {
      if (error.response.data.message === "Unauthenticated.") {
        Swal.fire({
          title: error.response.data.message,
          text: "Tolong Login Kembali",
          icon: "warning",
        });
        localStorage.clear();
        window.location.href = "/login";
      }
      if (error.message) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      }
    }
  };
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
