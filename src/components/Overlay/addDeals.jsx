import React from "react";
import { Form, Offcanvas } from "react-bootstrap";

const AddDeals = ({ visible, onClose }) => {
  return (
    <Offcanvas show={visible} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Deals</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form action="">
          <Form.Group className="mb-3">
            <Form.Label>Pipeline</Form.Label>
            <Form.Select>
              <option value="">Select Pipeline</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Stage <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Select>
              <option value="">Select Pipeline</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Deal Name <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Deal Size</Form.Label>
            <Form.Control type="number" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Owner</Form.Label>
            <Form.Select>
              <option value="">Select Owner</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select>
              <option value="">Select Priority</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Company Association</Form.Label>
            <Form.Select>
              <option value="">Select Choose</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Deal Status</Form.Label>
            <Form.Select>
              <option value="">Select Choose</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Deal Category</Form.Label>
            <Form.Select>
              <option value="">Select Choose</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Product Association</Form.Label>
            <Form.Select>
              <option value="">Select Choose</option>
            </Form.Select>
          </Form.Group>
          <button className="btn btn-primary mb-4 ms-3">Create Deal</button>
          <button className="btn btn-secondary mb-4 ms-2" onClick={onClose}>
            Cancel
          </button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddDeals;
