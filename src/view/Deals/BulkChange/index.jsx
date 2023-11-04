import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Link } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import Select from "react-select";

const BulkChangeDeals = () => {
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="pagetitle">
          <h1>Bulk Change Deals</h1>
          <nav>
            <ol className="breadcrumb mt-2">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/deals" className="text-decoration-none">
                  Deals
                </Link>
              </li>
              <li className="breadcrumb-item active">Bulk Change</li>
            </ol>
          </nav>
        </div>
        <Card className="mt-5 shadow">
          <Card.Body>
            <form action="">
              <Form.Group className="mb-3 col-9">
                <Form.Label className="fw-bold">Select Deals</Form.Label>
                <Select closeMenuOnSelect={false} isMulti />
              </Form.Group>
              <Form.Group className="mb-3 col-5" md={5}>
                <Form.Label className="fw-bold">Give Permission to</Form.Label>
                <Select />
              </Form.Group>
              <div className="mt-4">
                <a href="/contact" className="btn btn-secondary me-4 shadow">
                  Cancel
                </a>
                <button className="btn btn-primary shadow" type="submit">
                  Save
                </button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Main>
    </body>
  );
};

export default BulkChangeDeals;
