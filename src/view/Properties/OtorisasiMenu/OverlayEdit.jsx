import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import Swal from "sweetalert2";

const OverlayEdit = ({ visible, uid, onClose }) => {
  const token = localStorage.getItem("token");
  const [oldValue, setOldValue] = useState({});
  const handleInput = (e) => {
    setOldValue({
      ...oldValue,
      [e.target.name]: e.target.value,
    });
  };
  const getOldValue = (token, uid) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user-menus/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const oldData = res.data.data;
        setOldValue({
          name: oldData.name,
          type: oldData.type,
          key: oldData.key,
          route: oldData.route,
          icon: oldData.icon,
          is_active: oldData.is_active,
        });
      });
  };

  useEffect(() => {
    if (visible && uid) {
      getOldValue(token, uid);
    }
  }, [token, uid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", oldValue.name);
    formData.append("type", oldValue.type);
    formData.append("key", oldValue.key);
    formData.append("route", oldValue.route);
    formData.append("icon", oldValue.icon);
    formData.append("is_active", oldValue.is_active);
    formData.append("_method", "put");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/user-menus/${uid}`,
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
    <Offcanvas show={visible} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Menu</Offcanvas.Title>
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
              value={oldValue.name}
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
              value={oldValue.type}
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
              value={oldValue.key}
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
              value={oldValue.route}
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
              value={oldValue.icon}
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
              value={oldValue.is_active}
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

export default OverlayEdit;
