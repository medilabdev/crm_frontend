import axios from "axios";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const DeleteCompany = ({ visible, onClose, uid }) => {
  const token = localStorage.getItem("token");
  const arrUid = [uid];
  const deleteCompany = async () => {
    try {
      const formData = new FormData();
      formData.append("company_uid[0]", arrUid);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/companies/delete/item`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
        Swal.fire({
          title: "Successfully delete company",
          text: "Successfully delete company",
          icon: "success",
        }).then((res) => {
          if(res.isConfirmed){
            window.location.reload();
          }
        })
      })
    } catch (err) {
      Swal.fire({
        title: err.response.data.message,
        text: "Gagal menghapus company",
        icon:"warning"
      })
      onClose();
    }
  };
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
          <Button variant="danger" onClick={deleteCompany}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteCompany;
