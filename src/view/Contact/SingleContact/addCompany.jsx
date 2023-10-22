import React, { useState } from "react";
import {
  Card,
  Form,
  FloatingLabel,
  Button,
  Offcanvas,
  Row,
  Col,
} from "react-bootstrap";

const AddCompany = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [telephone, setTelephone] = useState([""]);

  // menambah telephone
  const addTelephone = () => {
    setTelephone([...telephone, ""]);
  };

  // mengubah nomor telephone pada indeks tertentu
  const handleChangeTelephone = (index, value) => {
    const NewTelephone = [...telephone];
    NewTelephone[index] = value;
    setTelephone(NewTelephone);
  };

  // menghapus telephone
  const handleDeleteTelephone = (index) => {
    const NewTelephone = [...telephone];
    NewTelephone.splice(index, 1);
    setTelephone(NewTelephone);
  };
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
      <Offcanvas
        show={showCanvas}
        onHide={handleCloseCanvas}
        placement="end"
        className="offcanvas-content"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Company</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form action="">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Company Name <span className="text-danger fs-5">*</span>
              </Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Company Website</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Owner</Form.Label>
              <Form.Select>
                <option value="">Select Owner</option>
                <option value="">1</option>
                <option value="">2</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Telephone</Form.Label>

              {telephone.map((telephone, index) => (
                <div key={index}>
                  <FloatingLabel
                    label={`Telephone #${index + 1}`}
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="@gg"
                      value={telephone}
                      onChange={(e) =>
                        handleChangeTelephone(index, e.target.value)
                      }
                    />
                  </FloatingLabel>
                  {index > 0 && (
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteTelephone(index)}
                      style={{ fontSize: "0.65rem" }}
                      className="mb-2"
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
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address(Google Map)</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Address <span className="text-danger fs-5">*</span>
              </Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
              <Col sm="8" md="8">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" />
              </Col>
              <Col sm="4" md="4">
                <Form.Control
                  type="number"
                  placeholder="zip"
                  style={{ marginTop: "23px" }}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Type<span className="text-danger fs-5">*</span>
              </Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Number of Employees</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Source</Form.Label>
              <Form.Select>
                <option value="">Select Source</option>
                <option value="">Event</option>
                <option value="">Database</option>
                <option value="">Referral</option>
                <option value="">Others</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Number of Patiens</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Deals</Form.Label>
              <Form.Select>
                <option value="">Select Deals</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Parent Company</Form.Label>
              <Form.Select>
                <option value="">Select Company</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
              </Form.Select>
            </Form.Group>
            <button className="btn btn-primary mb-4 ms-3">Add Company</button>
            <button className="btn btn-secondary mb-4 ms-2">Cancel</button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AddCompany;
