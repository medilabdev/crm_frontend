import React, { useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import BreadcrumbAccounting from "./breadcrumb";
import { useParams } from "react-router-dom";
import { Card, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import axios from "axios";

const Accounting = () => {
  const token = localStorage.getItem("token");
  const { uid } = useParams();

  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <BreadcrumbAccounting />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="float-end mt-2 mb-2">
                <button className="btn btn-primary me-2" type="submit">
                  Save Changes
                </button>
                <a
                  href="/deals"
                  className="btn btn-secondary text-decoration-none"
                >
                  Cancel
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Card className="shadow">
                <Card.Header>
                  <h5 className="fw-bold mt-2">Payments</h5>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Date
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Payment Amount
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>Rp.</InputGroup.Text>
                      <Form.Control type="number" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Payement Method
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                    <select className="form-select">
                      <option disabled selected>
                        Select Choose
                      </option>
                      <option value="cash">Cash</option>
                      <option value="cheque">Cheque</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="debit_card">Debit Card</option>
                      <option value="transfer">Transfer</option>
                    </select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Reference Number
                    </Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <button className="btn btn-primary">Add Payment</button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6">
              <Card className="shadow">
                <Card.Header>
                  <h5 className="fw-bold mt-2">Expenses</h5>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Date
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Expense Amount
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>Rp.</InputGroup.Text>
                      <Form.Control type="number" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Category
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                    <select className="form-select">
                      <option disabled selected>
                        Select Choose
                      </option>
                      <option value="gas">Gas</option>
                      <option value="entertaiment">Entertaiment</option>
                      <option value="restaurant/dining">
                        Restaurant/Dining
                      </option>
                      <option value="airfare">Airfare</option>
                      <option value="hotel/lodging/accommmodation">
                        Hotel/Lodging/Accommmodation
                      </option>
                      <option value="taxi/parking">Taxi & Parking</option>
                    </select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Reference Number
                    </Form.Label>
                    <Form.Control as="textarea" />
                  </Form.Group>

                  <button className="btn btn-primary">Add Expanse</button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </Main>
    </body>
  );
};

export default Accounting;
