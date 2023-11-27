import axios from "axios";
import React from "react";
import { useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
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
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("type", input.type);
    formData.append("key", input.key);
    formData.append("route", input.route);
    formData.append("icon", input.icon);
    formData.append("is_active", input.is_active);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user-menus`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: res.data.message,
          text: "Successfully create item",
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
        <Offcanvas.Title>Add Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>
              Name Menu <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              Type <span className="text-danger fs-5">*</span>
            </Form.Label>
            <select
              className="form-control"
              name="type"
              onChange={handleInput}
              required
            >
              <option value="">Select Choose</option>
              <option value="collapse">Collapse</option>
              <option value="nonCollapse">Non Collapse</option>
            </select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              Key<span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="key"
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              Route <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="route"
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              Icon <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="icon"
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              Is Active <span className="text-danger fs-5">*</span>
            </Form.Label>
            <select
              className="form-control"
              name="is_active"
              onChange={handleInput}
              required
            >
              <option value="">Select Choose</option>
              <option value="1">Active</option>
              <option value="0">Non Active</option>
            </select>
          </Form.Group>
          <div className="mt-5">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button className="btn btn-secondary ms-3" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OverlayAdd;
