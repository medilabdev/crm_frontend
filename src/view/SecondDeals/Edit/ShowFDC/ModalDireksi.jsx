import { faAt, faPerson, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const ModalDireksi = ({ data, show, handleClose }) => {
  const token = localStorage.getItem("token");
  const [editDireksi, setEditDireksi] = useState({});
  useEffect(() => {
    setEditDireksi(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditDireksi({
      ...editDireksi,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let timerInterval;
      const { isConfirmed } = await Swal.fire({
        title: "Apakah kamu yakin untuk menyimpan?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });
      if (isConfirmed) {
        Swal.fire({
          title: "Loading...",
          html: "Tolong Tunggu <b></b> Beberapa Detik.",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
        const formData = new FormData();
        formData.append("name", editDireksi?.name || "");
        formData.append("email", editDireksi?.email || "");
        formData.append("phone_number", editDireksi?.phone_number || "");
        formData.append("position", editDireksi?.position || "");
        formData.append("_method", "put");
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/v2/fdc-document/direksi/${editDireksi?.uid}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.close();
        await Swal.fire({
          title: response.data.message,
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      } else {
        Swal.fire({
          text: "Something went wrong !",
          icon: "error",
        });
      }
    }
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit data {editDireksi?.position}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-floating mb-3">
          <input
            type="text"
            placeholder="Input in here"
            className="form-control"
            name="name"
            value={editDireksi.name || ""}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">
            <FontAwesomeIcon icon={faPerson} className="me-1" /> Nama
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            placeholder="Input in here"
            className="form-control"
            name="phone_number"
            value={editDireksi.phone_number || ""}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">
            <FontAwesomeIcon icon={faPhone} className="me-1" />
            No Telp/WA
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            placeholder="Input in here"
            className="form-control"
            name="email"
            value={editDireksi.email || ""}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">
            <FontAwesomeIcon icon={faAt} className="me-1" /> Email
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDireksi;
