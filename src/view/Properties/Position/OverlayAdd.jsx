import axios from "axios";
import React from "react";
import { useState } from "react";
import { Offcanvas, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const OverlayAdd = ({ visible, onClose }) => {
  const token = localStorage.getItem("token");
  const [input, setInput] = useState([]);
  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/positions`, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: res.data.message,
          text: "Successsfuly add position",
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          text: err.response.data.message,
          icon: "warning",
        });
      });
  };
  return (
    <Offcanvas
      show={visible}
      onHide={onClose}
      placement="end"
      className="offcanvas-content"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Position</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>
              Name Position <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleInput}
              required
            />
          </Form.Group>
          <div className="mt-5">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button className="btn btn-secondary ms-3">Cancel</button>
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OverlayAdd;