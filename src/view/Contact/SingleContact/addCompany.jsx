import React, { useState } from "react";
import { Card, Form, FloatingLabel, Button, Offcanvas } from "react-bootstrap";

const AddCompany = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);

  const handleCompanyChange = (e) => {
    const SelectedValue = e.target.value;
    setSelectedCompany(SelectedValue);
    setShowAdditionalForm(SelectedValue !== "SelectCompany");
  };

  const removeAdditionalForm = () => {
    setShowAdditionalForm(false);
  };

  const [showCanvas, setShowCanvas] = useState(false);
  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);
  return (
    <>
      <Card className="shadow">
        <Card.Header>
          <h5 className="mt-2">
            <i class="bi bi-building  fs-4"></i>{" "}
            <span className="ms-2 fs-5 fw-bold mt-5">Companies</span>
          </h5>
        </Card.Header>
        <Card.Body>
          <form action="" method="post">
            <FloatingLabel
              controlId="floatingInput"
              label="Primary Company"
              className="mb-3"
            >
              <Form.Select
                onChange={handleCompanyChange}
                value={selectedCompany}
              >
                <option value="SelectCompany">Select Company</option>
                <option value="">Company 1</option>
                <option value="">Company 2</option>
              </Form.Select>
            </FloatingLabel>
            {showAdditionalForm && (
              <>
                <FloatingLabel label="Additional Company" className="mb-3">
                  <Form.Select>
                    <option value="SelectCompany">Select Company</option>
                    <option value="">Company 2</option>
                  </Form.Select>
                </FloatingLabel>
                <Button
                  variant="danger"
                  onClick={removeAdditionalForm}
                  style={{ fontSize: "0.85rem" }}
                >
                  Remove Additional
                </Button>
              </>
            )}
            <div className="mt-3 text-center">
              <a
                onClick={handleShowCanvas}
                className="fw-semibold fs-6"
                style={{
                  cursor: "pointer",
                }}
              >
                Or Create Company
              </a>
            </div>
          </form>
        </Card.Body>
      </Card>
      <Offcanvas show={showCanvas} onHide={handleCloseCanvas} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Company</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <form action="">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Company Name <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <Form.Control type="text" placeholder="company name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Company Name
                  </Form.Label>
                  <Form.Control type="text" placeholder="company name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Company Name <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <Form.Control type="text" placeholder="company name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Company Name <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <Form.Control type="text" placeholder="company name" />
                </Form.Group>
              </form>
            </div>
          </div>
        </div>
      </Offcanvas>
    </>
  );
};

export default AddCompany;
