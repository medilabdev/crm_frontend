import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const AddUser = ({ visible, onClose, roles, primary, refUsers, position }) => {
  const tokenAuth = localStorage.getItem("token");
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    telp_number: "",
    pid: "",
    company_name: "",
    image: null,
    role_uid: "",
    primary_team_uid: "",
    secondary_team_uid: "",
    position_uid: "",
    reff_uid: "",
  });

  // console.log(inputUser);
  const handleChange = (e) => {
    setInputUser({
      ...inputUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      setInputUser({
        ...inputUser,
        image: file,
      });
    }
  };

  const handleInputUser = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (inputUser.image) {
      formData.append("image", inputUser.image);
    }
    formData.append("name", inputUser.name);
    formData.append("email", inputUser.email);
    formData.append("password", inputUser.password);
    formData.append("confirm_password", inputUser.confirm_password);
    formData.append("telp_number", inputUser.telp_number);
    formData.append("pid", inputUser.pid);
    formData.append("company_name", inputUser.company_name);
    formData.append("role_uid", inputUser.role_uid);
    formData.append("primary_team_uid", inputUser.primary_team_uid);
    formData.append("secondary_team_uid", inputUser.secondary_team_uid);
    formData.append("position_uid", inputUser.position_uid);
    formData.append("reff_uid", inputUser.reff_uid);
    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/users`, formData, {
          headers: {
            Authorization: `Bearer ${tokenAuth}`,
            "Content-Type": "multipart/form-data",
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
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      } else {
        Swal.fire({
          text: "Something went wrong!",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <Modal show={visible} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="post" onSubmit={handleInputUser}>
            <Form.Group className="mb-3 ">
              <Form.Label>
                <span className="text-danger fs-5" floating>
                  *
                </span>
                Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="input name"
                name="name"
                value={inputUser.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>
                  <span className="text-danger fs-5">*</span>Email
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="input email"
                  name="email"
                  value={inputUser.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2 col-6">
                <Form.Label>
                  <span className="text-danger fs-5">*</span>Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={inputUser.password}
                  onChange={handleChange}
                  placeholder="input password"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 col-6">
                <Form.Label>
                  <span className="text-danger fs-5">*</span>Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="confirm_password"
                  value={inputUser.confirm_password}
                  onChange={handleChange}
                  placeholder="input password"
                  required
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3 col-6">
                <Form.Label>
                  <span className="text-danger fs-5">*</span>No.Telp
                </Form.Label>
                <Form.Control
                  type="number"
                  name="telp_number"
                  value={inputUser.telp_number}
                  onChange={handleChange}
                  placeholder="input no.telp"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 col-6">
                <Form.Label className="mt-2">PID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="input pid"
                  name="pid"
                  value={inputUser.pid}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="input company name"
                name="company_name"
                value={inputUser.company_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="input company name"
                accept="image/*"
                name="image"
                onChange={handleImage}
              />
              <Form.Text className="text-muted">Input Photo person</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <span className="text-danger fs-5">*</span>Position
              </Form.Label>
              <Form.Select
                name="position_uid"
                value={inputUser.position_uid}
                onChange={handleChange}
              >
                <option value="">Select Chose</option>
                {position.map((pos) => (
                  <option key={pos.uid} value={pos.uid}>
                    {pos.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <span className="text-danger fs-5">*</span>Select Role
              </Form.Label>
              <Form.Select
                name="role_uid"
                value={inputUser.role_uid}
                onChange={handleChange}
              >
                <option value="">Select Choose</option>
                {roles.map((role) => (
                  <option key={role.uid} value={role.uid}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Row>
                <Form.Group className="mb-3 col-6">
                  <Form.Label>Primary Team</Form.Label>
                  <Form.Select
                    name="primary_team_uid"
                    value={inputUser.primary_team_uid}
                    onChange={handleChange}
                  >
                    <option value="">Select Chose</option>
                    {primary.map((pri) => (
                      <option key={pri.uid} value={pri.uid}>
                        {pri.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col-6">
                  <Form.Label>Secondary Team</Form.Label>
                  <Form.Select
                    name="secondary_team_uid"
                    value={inputUser.secondary_team_uid}
                    onChange={handleChange}
                  >
                    <option value="">Select Chose</option>
                    {primary.map((secondary) => (
                      <option key={secondary.uid} value={secondary.uid}>
                        {secondary.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Reff User</Form.Label>
                <Form.Select
                  name="reff_uid"
                  value={inputUser.reff_uid}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {refUsers.map((ref) => (
                    <option key={ref.uid} value={ref.uid}>
                      {ref.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form.Group>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" className="ms-3">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddUser;
