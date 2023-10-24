import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import Footer from "../../../components/Template/Footer";
import { Card, Form } from "react-bootstrap";

const BulkChangeCompany = () => {
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="pagetitle">
          <h1>Bulk Change Company</h1>
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
              <li className="breadcrumb-item active">Bulk Change</li>
            </ol>
          </nav>
        </div>
        <Card className="shadow">
          <Card.Body className="mt-2">
            <form action="">
              <Form.Group className="mb-3 col-9">
                <Form.Label className="fw-bold">Select Companies</Form.Label>
                <Form.Select>
                  <option value="">Select Choose</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 col-5" md={5}>
                <Form.Label className="fw-bold">Owner</Form.Label>
                <Form.Select>
                  <option value="">Select Owner</option>
                  <option value="">1</option>
                  <option value="">2</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 col-5" md={5}>
                <Form.Label className="fw-bold">Give Permission to</Form.Label>
                <Form.Select>
                  <option value="">Select Choose</option>
                  <option value="">2</option>
                  <option value="">1</option>
                </Form.Select>
              </Form.Group>
              <div className="mt-4"> 
                <a href="/company" className="btn btn-secondary me-4">
                  Cancel
                </a>
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </Card.Body>
        </Card>
        <Footer />
      </Main>
    </body>
  );
};

export default BulkChangeCompany;
