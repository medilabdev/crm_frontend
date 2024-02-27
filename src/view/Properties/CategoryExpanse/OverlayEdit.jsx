import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import Swal from "sweetalert2";

const OverlayEdit = ({ visible, onClose, uid }) => {
  const token = localStorage.getItem("token");
  const [input, setInput] = useState({});

  const getExCat = (token, uid) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/expense-categories/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const oldData = res.data.data;
        setInput({
          name: oldData.name,
        });
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  useEffect(() => {
    if (visible && uid) {
      getExCat(token, uid);
    }
  }, [token, uid]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("_method", "put");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/expense-categories/${uid}`,
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
        // console.log(err);
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
        <Offcanvas.Title>Add Category Expanse</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSubmit}>
          <Form className="mb-2">
            <Form.Label>
              Name Expanse <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={input.name}
              onChange={handleInput}
              required
            />
          </Form>
          <div className="mt-5">
            <button className="btn btn-primary" onClick={handleSubmit}>
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
