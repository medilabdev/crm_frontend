import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import Swal from "sweetalert2";
const OverlayEdit = ({ visible, uid, onClose }) => {
  const token = localStorage.getItem("token");
  const [input, setInput] = useState({});
  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const getDetail = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/staging-masters/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const oldData = res.data.data;
        setInput({
          name: oldData.name,
          start_exp_day: oldData.start_exp_day,
          percent_weight: oldData.percent_weight,
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
      getDetail(token, uid);
    }
  }, [token, uid]);
  // console.log(input);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("start_exp_day", input.start_exp_day);
    formData.append("percent_weight", input.percent_weight);
    formData.append("_method", "put");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/staging-masters/${uid}`,
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
        <Offcanvas.Title>Add Stage</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>
              Name Stage <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={input.name}
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              Expired Day <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="start_exp_day"
              value={input.start_exp_day}
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              Percent Weight (%) <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="percent_weight"
              value={input.percent_weight}
              onChange={handleInput}
              required
            />
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
