import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Offcanvas, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const OverlayEdit = ({ visible, onClose, uid }) => {
  const token = localStorage.getItem("token");
  const [editTeams, setEditTeams] = useState({});
  const handleInput = (e) => {
    setEditTeams({
      ...editTeams,
      [e.target.name]: e.target.value,
    });
  };
  const getTeamsData = (uid, token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/teams/${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const oldData = res.data.data;
        setEditTeams({
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
      getTeamsData(uid, token);
    }
  }, [visible, uid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/teams/${uid}`, editTeams, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: res.data.message,
          text: "Updated Successfully",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/properties";
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
        <Offcanvas.Title>Edit Teams</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSubmit}>
          <Form className="mb-2">
            <Form.Label>
              Name Teams <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editTeams.name}
              onChange={handleInput}
              required
            />
          </Form>
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
