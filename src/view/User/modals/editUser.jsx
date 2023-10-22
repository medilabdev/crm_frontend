import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";

const EditUser = ({
  visible,
  onClose,
  uid,
  roles,
  primary,
  refUsers,
  position,
}) => {
  // console.log(uid);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
  const token = localStorage.getItem("token");
  const handleOpenEditModal = (uid) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const oldUserData = res.data.data;
        setFormData(oldUserData);
      })
      .catch((err) => {
        console.error("gagal memuat data", err);
      });
  };
  useEffect(() => {
    if (visible && uid) {
      handleOpenEditModal(uid);
    }
  }, [visible, uid]);

  const [role, setRoles] = useState(formData?.role?.name);
  console.log(formData);
  const handleChange = (e) => {
    const newValue = e.target.value;
    setFormData(newValue);
  };
  // console.log(formData);
  return (
    <>
      <Modal show={visible} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group className="mb-3 col-6">
                <Form.Label>
                  <span className="text-danger fs-5">*</span>Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="input name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 col-6">
                <Form.Label>
                  <span className="text-danger fs-5">*</span>Email
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="input email"
                  value={formData.email}
                  onChange={handleChange}
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
                  placeholder="input no.telp"
                  value={formData.telp_number}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 col-6">
                <Form.Label style={{ marginTop: "9px" }}>PID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="input pid"
                  value={formData.pid}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="input company name"
                value={formData.company_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="input company name"
                accept="image/*"
              />
              <Form.Text className="text-muted">Input Photo person</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <span className="text-danger fs-5">*</span>Select Role
              </Form.Label>
              <select
                name="role_uid"
                className="form-select"
                value={role || formData?.role?.name}
                onChange={(e) => {
                  const selectRoleName = e.target.value;
                  setRoles(selectRoleName);
                }}
              >
                {roles.map((role) => (
                  <option key={role.uid} value={role.uid}>
                    {role.name}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <span className="text-danger fs-5">*</span>Select Position
              </Form.Label>
              <select
                name="position_uid"
                className="form-select"
                value={position || formData?.role?.name}
                onChange={(e) => {
                  const selectRoleName = e.target.value;
                  setRoles(selectRoleName);
                }}
              >
                {position.map((role) => (
                  <option key={role.uid} value={role.uid}>
                    {role.name}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group>
              <Row>
                <Form.Group className="mb-3 col-6">
                  <Form.Label>Primary Team</Form.Label>
                  <select
                    name="primary_team_uid"
                    className="form-select"
                    value={formData?.primary_team?.name}
                  >
                    <option value="">Select choose</option>
                    <option value="">None</option>
                    {primary.map((pri) => (
                      <option key={pri.uid} value={pri.uid}>
                        {pri.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
                <Form.Group className="mb-3 col-6">
                  <Form.Label>Secondary Team</Form.Label>
                  <select
                    name="secondary_team_uid"
                    className="form-select"
                    value={formData?.primary_team?.name}
                  >
                    <option value="">Select choose</option>
                    <option value="">None</option>
                    {primary.map((pri) => (
                      <option key={pri.uid} value={pri.uid}>
                        {pri.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Reff User</Form.Label>
                <select
                  name="refrence_user_uid"
                  className="form-select"
                  value={formData?.refrence_user?.name}
                >
                  <option value="">Select Chose</option>
                  {refUsers.map((rf) => (
                    <option key={rf.uid} value={rf.uid}>
                      {rf.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUser;
