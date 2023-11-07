import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Offcanvas, Button } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";

const OverlayAddContact = ({ visible, onClose }) => {
  const token = localStorage.getItem("token");
  const [owner, setOwner] = useState([]);
  const [source, setSource] = useState([]);
  const [inputContact, setInputContact] = useState({
    name: "",
    birthday: "",
    gender: "",
    email: "",
    position: "",
    address: "",
    city: "",
    remarks: "",
    phone_number: [""],
    owner_user_uid: "",
    source_uid: "",
  });

  const addTelephone = () => {
    setInputContact((input) => ({
      ...input,
      phone_number: [...input.phone_number, ""],
    }));
  };
  const handleChangeTelephone = (index, value) => {
    setInputContact((input) => {
      const telp = [...input.phone_number];
      telp[index] = value;
      return {
        ...input,
        phone_number: telp,
      };
    });
  };
  const removeTelephone = (index) => {
    setInputContact((input) => {
      const telp = [...input.phone_number];
      telp.splice(index, 1);
      return {
        ...input,
        phone_number: telp,
      };
    });
  };
  const handleInputContact = (e) => {
    setInputContact({
      ...inputContact,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputOwner = (e) => {
    setInputContact({
      ...inputContact,
      owner_user_uid: e.value,
    });
  };
  const handleInputSource = (e) => {
    setInputContact({
      ...inputContact,
      source_uid: e.value,
    });
  };
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
    const resultOwner = [];
    owner?.map((data) => {
      const selectOwner = {
        value: data.uid,
        label: data.name,
      };
      resultOwner.push(selectOwner);
    });
    return resultOwner;
  };

  const selectSource = () => {
    return (
      source?.map((data) => {
        const dataSource = {
          value: data.uid,
          label: data.name,
        };
        return dataSource;
      }) || []
    );
  };
  useEffect(() => {
    getOwner(token);
    getSource(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addContact = await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/contacts`, inputContact, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            text: "Successfully add user",
            icon: "success",
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.reload();
            }
          });
        });
    } catch (err) {
      if (err.response) {
        Swal.fire({
          text: err.response.data.message,
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
        <form method="post" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              Name <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleInputContact}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Gender <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Select name="gender" onChange={handleInputContact} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Owner <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Select
              name="owner_user_uid"
              options={selectOwner()}
              onChange={(selected) => handleInputOwner(selected)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Job Title <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="position"
              onChange={handleInputContact}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder=""
              name="email"
              onChange={handleInputContact}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              No.Telp/WhatsApp
              <span style={{ color: "red" }} className="fs-6">
                *
              </span>
            </Form.Label>
          </Form.Group>
          {inputContact.phone_number.map((telephone, index) => (
            <div key={index}>
              <Form.Control
                type="number"
                className="mb-2"
                placeholder={`No.Telp ${index + 1} `}
                name={`phone_number[${index}]`}
                value={inputContact.phone_number[index]}
                onChange={(e) => handleChangeTelephone(index, e.target.value)}
              />
              {index > 0 && (
                <Button
                  variant="danger"
                  onClick={() => removeTelephone(index)}
                  style={{ fontSize: "0.65rem" }}
                  className="mb-1"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="primary"
            onClick={addTelephone}
            style={{ fontSize: "0.65rem" }}
            className="mb-2"
          >
            Add Telephone
          </Button>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="address"
              onChange={handleInputContact}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="city"
              onChange={handleInputContact}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date Birthday</Form.Label>
            <Form.Control
              type="date"
              placeholder=""
              name="birthday"
              onChange={handleInputContact}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Source <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Select
              name="source_uid"
              options={selectSource()}
              onChange={(selected) => handleInputSource(selected)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Remarks(Other Soure)</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="remarks"
              onChange={handleInputContact}
            />
          </Form.Group>
          <div className="float-end mt-3">
            <Button
              variant="primary"
              onClick={handleSubmit}
              className="mb-3 me-2"
            >
              Save Changes
            </Button>
            <a
              onClick={onClose}
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
