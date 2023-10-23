import React, { useState } from "react";
import { Card, FloatingLabel, Form, Offcanvas } from "react-bootstrap";

const AddDeals = () => {
  const [showCanvasDeals, setShowCanvasDeals] = useState(false);
  const handleCloseCanvasDeals = () => setShowCanvasDeals(false);
  const handleShowCanvasDeals = () => setShowCanvasDeals(true);
  return (
    <>
      <Card className="shadow">
        <Card.Header>
          <h5 className="mt-2">
            <i class="bi bi-currency-dollar  fs-4"></i>
            <span className="ms-2 fs-5 fw-bold mt-5">Deals</span>
          </h5>
        </Card.Header>
        <Card.Body>
          <form action="" method="post">
            <FloatingLabel
              controlId="floatingInput"
              label="Search Deals"
              className="mb-3"
            >
              <Form.Select>
                <option>Select Company</option>
                <option value="">Company 1</option>
                <option value="">Company 2</option>
              </Form.Select>
            </FloatingLabel>
          </form>
          <div className="text-center">
            <a
              onClick={handleShowCanvasDeals}
              className="text-primary text-decoration-none fw-semibold"
              style={{ cursor: "pointer" }}
            >
              <i class="bi bi-plus-lg" style={{ fontSize: "15px" }}></i>
              <span className="fs-6"> Create Another Deal</span>
            </a>
          </div>
        </Card.Body>
      </Card>
      <Offcanvas
        show={showCanvasDeals}
        onHide={handleCloseCanvasDeals}
        placement="end"
      >
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
              <Form.Label>
                Deal Size
              </Form.Label>
              <Form.Control type="number" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Owner
              </Form.Label>
              <Form.Select>
                <option value="">Select Owner</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Priority
              </Form.Label>
              <Form.Select>
                <option value="">Select Priority</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Company Association
              </Form.Label>
              <Form.Select>
                <option value="">Select Choose</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Deal Status
              </Form.Label>
              <Form.Select>
                <option value="">Select Choose</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Deal Category
              </Form.Label>
              <Form.Select>
                <option value="">Select Choose</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>
                Product Association
              </Form.Label>
              <Form.Select>
                <option value="">Select Choose</option>
              </Form.Select>
            </Form.Group>
            <button className="btn btn-primary mb-4 ms-3">Create Deal</button>
            <button className="btn btn-secondary mb-4 ms-2">Cancel</button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AddDeals;
