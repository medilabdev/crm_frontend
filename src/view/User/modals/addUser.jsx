import React from "react";
import { Button, FloatingLabel, Form, Modal, Row } from "react-bootstrap";

const AddUser = ({ visible, onClose }) => {
  return (
    <>
      <Modal show={visible} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 ">
              <Form.Label>
                <span className="text-danger fs-5" floating>
                  *
                </span>
                Name
              </Form.Label>

              <Form.Control type="text" placeholder="input name" required />
            </Form.Group>
            <Row>
              <Form.Group className="mb-3 col-6">
                <Form.Label>
                  <span className="text-danger fs-5">*</span>Email
                </Form.Label>
                <Form.Control type="email" placeholder="input email" required />
              </Form.Group>
              <Form.Group className="mb-3 col-6">
                <Form.Label>
                  <span className="text-danger fs-5">*</span>Password
                </Form.Label>
                <Form.Control
                  type="password"
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
                  placeholder="input no.telp"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 col-6">
                <Form.Label>
                  <span className="text-danger fs-5">*</span>PID
                </Form.Label>
                <Form.Control type="number" placeholder="input pid" required />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>
                <span className="text-danger fs-5">*</span>Company Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="input company name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <span className="text-danger fs-5">*</span>Image
              </Form.Label>
              <Form.Control
                type="file"
                placeholder="input company name"
                required
                accept="image/*"
              />
              <Form.Text className="text-muted">Input Photo person</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <span className="text-danger fs-5">*</span>Select Role
              </Form.Label>
              <Form.Select>
                <option value="">Select Chose</option>
                <option value="">Sales</option>
                <option value="">Supervisor Sales</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Row>
                <Form.Group className="mb-3 col-6">
                  <Form.Label>
                    <span className="text-danger fs-5">*</span>Primary Team
                  </Form.Label>
                  <Form.Select>
                    <option value="">Select Chose</option>
                    <option value="">Team 1</option>
                    <option value="">Team 2</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col-6">
                  <Form.Label>Secondary Team</Form.Label>
                  <Form.Select>
                    <option value="">Select Chose</option>
                    <option value="">Team 1</option>
                    <option value="">Team 2</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>
                  <span className="text-danger fs-5">*</span>Reff User
                </Form.Label>
                <Form.Select>
                  <option value="">Select Chose</option>
                  <option value="">Team 1</option>
                  <option value="">Team 2</option>
                </Form.Select>
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

export default AddUser;
