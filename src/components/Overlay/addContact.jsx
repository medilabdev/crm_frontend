import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Offcanvas, Overlay } from "react-bootstrap";
import Select from "react-select";

const OverlayAddContact = ({ visible, onClose }) => {
  const token = localStorage.getItem("token");
  const [owner, setOwner] = useState([]);
  const [source, setSource] = useState([]);

  const getSource = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies-source`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSource(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getOwner = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOwner(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const selectOwner = () => {
    const result = [];
    owner?.map((data) => {
      const dataOwner = {
        value: data.uid,
        label: data.name,
      };
      result.push(dataOwner);
    });
    return result;
  };
  const selectSource = () => {
    const result = [];
    source?.map((data) => {
      const dataOwner = {
        value: data.uid,
        label: data.name,
      };
      result.push(dataOwner);
    });
    return result;
  };
  useEffect(() => {
    getOwner(token);
    getSource(token);
  }, [token]);
  return (
    <Offcanvas
      placement="end"
      className="offcanvas-content"
      show={visible}
      onHide={onClose}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Contact</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form>
          <Form.Group className="mb-3">
            <Form.Label>
              Name <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="" name="name" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Gender <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Select name="gender" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Owner <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Select name="owner_user_uid" options={selectOwner()} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Job Title <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="" name="position" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="" name="email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Telephone <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="" name="telephone[]" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="" name="address" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="" name="city" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date Birthday</Form.Label>
            <Form.Control type="date" placeholder="" name="birthday" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Source <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Select name="source_uid" options={selectSource()} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Remarks(Other Soure)</Form.Label>
            <Form.Control type="text" placeholder="" name="remarks" />
          </Form.Group>
          <div className="float-end mt-3">
            <button className="btn btn-primary me-2 mb-3" type="submit">
              Save Changes
            </button>
            <a
              href="/company"
              className="btn btn-secondary text-decoration-none mb-3"
            >
              Cancel
            </a>
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OverlayAddContact;
