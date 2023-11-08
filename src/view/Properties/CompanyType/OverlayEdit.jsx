import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import Swal from "sweetalert2";

const OverlayEdit = ({ visible, uid, onClose }) => {
  const token = localStorage.getItem("token");
  const [editCompType, setEditCompType] = useState({});
  const handleInput = (e) => {
    const { name, value } = e.target;
    setEditCompType({
      ...editCompType,
      [name]: value,
    });
  };
  const getDetailPost = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies-type/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const oldData = res.data.data;
        setEditCompType({
          name: oldData.name,
        });
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  useEffect(() => {
    if (visible && uid) {
      getDetailPost(token, uid);
    }
  }, [token, uid]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/companies-type/${uid}`,
        editCompType,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          title: res.data.message,
          text: "Updated Successfully",
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
        <Offcanvas.Title>Edit Position</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>
              Name Company Type <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editCompType.name}
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

export default OverlayEdit;
