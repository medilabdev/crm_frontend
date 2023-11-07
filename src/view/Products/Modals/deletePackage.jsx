import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const DeletePackage = ({ onClose, visible, uid }) => {
  const token = localStorage.getItem("token");
  const uidArr = [uid];
  const deleteData = async () => {
    try {
      const formData = new FormData();
      formData.append("package_product[]", uidArr);
      formData.append("_method", "delete");
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/packages-product/package/delete`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            text: "Successfully delete package product",
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

export default DeletePackage;
