import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const EditUser = ({
  visible,
  onClose,
  uid,
  roles,
  primary,
  refUsers,
  position,
}) => {
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    telp_number: "",
    pid: "",
    company_name: "",
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
        setEditUser({
          name: oldUserData.name,
          email: oldUserData.email,
          telp_number: oldUserData.telp_number,
          pid: oldUserData.pid,
          company_name: oldUserData.company_name,
          role_uid: oldUserData?.role?.uid,
          position_uid: oldUserData?.position?.uid,
          reff_uid: oldUserData?.refrence_user?.uid,
          secondary_team_uid: oldUserData?.secondary_team?.uid,
          primary_team_uid: oldUserData?.primary_team?.uid,
        });
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  useEffect(() => {
    if (visible && uid) {
      handleOpenEditModal(uid);
    }
  }, [visible, uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({
      ...editUser,
      [name]: value,
    });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editUser.name);
    formData.append("email", editUser.email);
    formData.append("telp_number", editUser.telp_number);
    formData.append("pid", editUser.pid);
    formData.append("company_name", editUser.company_name || "");
    formData.append("role_uid", editUser.role_uid || "");
    formData.append("primary_team_uid", editUser.primary_team_uid || "");
    formData.append("secondary_team_uid", editUser.secondary_team_uid || "");
    formData.append("position_uid", editUser.position_uid || "");
    formData.append("reff_uid", editUser.reff_uid || "");
    formData.append("_method", "put");
    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/users/${uid}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            text: "updated successfully",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
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
        Swal.fire({ text: err.response.data.message, icon: "error" });
      }
    }
  };
  return (
    <>
      <Modal show={visible} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateUser}>
            <Row>
              <Form.Group className="mb-3 col-6">
                <Form.Label>
                  <span className="text-danger fs-5">*</span>Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="input name"
                  name="name"
                  value={editUser.name}
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
                  name="email"
                  value={editUser.email}
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
                  name="telp_number"
                  value={editUser.telp_number}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 col-6">
                <Form.Label style={{ marginTop: "9px" }}>PID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="input pid"
                  name="pid"
                  value={editUser.pid}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="input company name"
                value={editUser.company_name}
                name="company_name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <span className="text-danger fs-5">*</span>Select Role
              </Form.Label>
              <select
                name="role_uid"
                className="form-select"
                value={editUser.role_uid}
                onChange={(e) => {
                  const selectRoleName = e.target.value;
                  setEditUser({
                    ...editUser,
                    role_uid: selectRoleName,
                  });
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
                value={editUser.position_uid}
                onChange={(e) => {
                  const positionUid = e.target.value;
                  setEditUser({
                    ...editUser,
                    position_uid: positionUid,
                  });
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
                    value={editUser.primary_team_uid}
                    onChange={(e) => {
                      const priUid = e.target.value;
                      setEditUser({
                        ...editUser,
                        primary_team_uid: priUid,
                      });
                    }}
                  >
                    <option value="">Select choose</option>
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
                    value={editUser.secondary_team_uid}
                    onChange={(e) => {
                      const SeUid = e.target.value;
                      setEditUser({
                        ...editUser,
                        secondary_team_uid: SeUid,
                      });
                    }}
                  >
                    <option value="">Select choose</option>
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
                  name="reff_uid"
                  className="form-select"
                  value={editUser.reff_uid}
                  onChange={(e) => {
                    const ReUid = e.target.value;
                    setEditUser({
                      ...editUser,
                      reff_uid: ReUid,
                    });
                  }}
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
            <Button variant="secondary" onClick={onClose} className="ms-2">
              Close
            </Button>
            <Button variant="primary" type="submit" className="ms-3">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUser;
