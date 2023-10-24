import React, { useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import Footer from "../../../components/Template/Footer";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import ReactQuill from "react-quill";

const EditCompany = () => {
  const [telephone, setTelephone] = useState([""]);

  const addTelephone = () => {
    setTelephone([...telephone, ""]);
  };
  const handleChangeTelephone = (index, value) => {
    const newTelephone = [...telephone];
    newTelephone[index] = value;
    setTelephone(newTelephone);
  };
  const removeTelephone = (index) => {
    const newTelephone = [...telephone];
    newTelephone.splice(index, 1);
    setTelephone(newTelephone);
  };
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Edit Company</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <a href="/" className="text-decoration-none">
                        Dashboard
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/company" className="text-decoration-none">
                        Company
                      </a>
                    </li>
                    <li className="breadcrumb-item active">Edit Company</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              {/* company */}
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-building-fill fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-2">Companies</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <FloatingLabel label="Company Name" className="mb-3">
                    <Form.Control type="text" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel label="Website" className="mb-3">
                    <Form.Control type="text" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingInput"
                    label="Owner"
                  >
                    <Form.Control type="text" placeholder="owner@example" />
                  </FloatingLabel>
                  {telephone.map((telephone, index) => (
                    <div key={index}>
                      <FloatingLabel
                        label={`Telephone #${index + 1}`}
                        className="mb-2"
                      >
                        <Form.Control
                          type="number"
                          value={telephone}
                          onChange={(e) =>
                            handleChangeTelephone(index, e.target.value)
                          }
                        />
                      </FloatingLabel>
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
                  <FloatingLabel label="Address (Google Map)" className="mb-3">
                    <Form.Control type="text" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel label="Address" className="mb-3">
                    <Form.Control type="text" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel label="City" className="mb-3">
                    <Form.Control type="text" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel label="Zip Code" className="mb-3">
                    <Form.Control type="text" placeholder="name@example.com" />
                  </FloatingLabel>
                  <Form.Select
                    className="mb-3"
                    size="lg"
                    style={{ fontSize: "0.85rem" }}
                    name="source"
                  >
                    <option>Type</option>
                    <option value="database">Badan</option>
                    <option value="event">Faskes</option>
                  </Form.Select>
                  <FloatingLabel label="Number of Employees" className="mb-3">
                    <Form.Control type="text" placeholder="name@example.com" />
                  </FloatingLabel>
                  <Form.Select
                    className="mb-3"
                    size="lg"
                    style={{ fontSize: "0.85rem" }}
                    name="source"
                  >
                    <option>Source</option>
                    <option value="database">Database</option>
                    <option value="event">Event</option>
                    <option value="referral">Referral</option>
                    <option value="others">Others</option>
                  </Form.Select>
                  <FloatingLabel label="Number of Patiens" className="mb-3">
                    <Form.Control type="text" placeholder="name@example.com" />
                  </FloatingLabel>
                </Card.Body>
              </Card>
              {/* deals */}
              <Card className="shadow mt-3">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-currency-dollar  fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Deals</span>
                  </h5>
                </Card.Header>
                <Card.Body>
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
                  <div className="text-center">
                    <a
                      //   onClick={handleShowCanvasDeals}
                      className="text-primary text-decoration-none fw-semibold"
                      style={{ cursor: "pointer" }}
                    >
                      <i class="bi bi-plus-lg" style={{ fontSize: "15px" }}></i>
                      <span className="fs-6"> Create Another Deal</span>
                    </a>
                  </div>
                </Card.Body>
              </Card>
              {/* contact */}
              <Card className="shadow mt-3">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-currency-dollar  fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Deals</span>
                  </h5>
                </Card.Header>
                <Card.Body>
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
                  <div className="text-center">
                    <a
                      //   onClick={handleShowCanvasDeals}
                      className="text-primary text-decoration-none fw-semibold"
                      style={{ cursor: "pointer" }}
                    >
                      <i class="bi bi-plus-lg" style={{ fontSize: "15px" }}></i>
                      <span className="fs-6"> Create Another Deal</span>
                    </a>
                  </div>
                </Card.Body>
              </Card>
              {/* parent company */}
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-buildings-fill fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">
                      Parent Company
                    </span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Search Deals"
                    className="mb-3"
                  >
                    <Form.Select>
                      <option>Select Company</option>
                      <option value="">1</option>
                      <option value="">2</option>
                    </Form.Select>
                  </FloatingLabel>
                  <div className="text-center">
                    <a
                      //   onClick={handleShowCanvasDeals}
                      className="text-primary text-decoration-none fw-semibold"
                      style={{ cursor: "pointer" }}
                    >
                      <i class="bi bi-plus-lg" style={{ fontSize: "15px" }}></i>
                      <span className="fs-6"> Create Another Contact</span>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-8">
              <Card className="shadow">
                <Card.Header>
                  <h6 className="fw-bold mt-2">Notes</h6>
                </Card.Header>
                <Card.Body>
                  <ReactQuill className="p-2" theme="snow" />
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </Main>
    </body>
  );
};

export default EditCompany;
