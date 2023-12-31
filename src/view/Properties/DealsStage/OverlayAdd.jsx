import axios from "axios";
import React from "react";
import { useState } from "react";
import { Form, InputGroup, Offcanvas } from "react-bootstrap";
import Swal from "sweetalert2";

const OverlayAdd = ({ visible, onClose }) => {
  const token = localStorage.getItem("token");
  const [input, setInput] = useState([]);
  const [needApproval, setNeedApproval] = useState('')
  
  const handleNeed = (e) => {
    const value = e.target.value
    if (needApproval === value) {
      setNeedApproval('');
    } else {
      setNeedApproval(value);
    }
  }
  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("name", input.name)
    formData.append("start_exp_day", input.start_exp_day)
    formData.append("percent_weight", input.percent_weight)
    formData.append("need_approval", needApproval)
    formData.append("numbering", input.numbering)
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/staging-masters`, formData, {
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
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              Number <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="numbering"
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
              onChange={handleInput}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              Need Approval <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Check
              type="checkbox"
              value="yes"
              label="Yes"
              checked={needApproval === 'yes'}
              onChange={handleNeed}
            />
            <Form.Check
              type="checkbox"
              value="no"
              label="No"
              checked={needApproval === 'no'}
              onChange={handleNeed}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              Percent Weight (%) <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="percent_weight"
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

export default OverlayAdd;
