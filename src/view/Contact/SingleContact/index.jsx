import React, { useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import Footer from "../../../components/Template/Footer";
import { Card, Col } from "react-bootstrap";
import AddContact from "./addContact";
import AddCompany from "./addCompany";
import AddDeals from "./addDeals";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const SingleContact = () => {
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Add Single Contact</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <a href="/" className="text-decoration-none">
                        Dashboard
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/contact" className="text-decoration-none">
                        Contact
                      </a>
                    </li>
                    <li className="breadcrumb-item active">
                      Add Single Contact
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <Col md={4}>
              <AddContact />
              <AddCompany />
              <AddDeals />
            </Col>
            <Col md={8}>
              <Card className="shadow">
                <Card.Header>
                  <h6 className="fw-bold mt-2">Notes</h6>
                </Card.Header>
                <Card.Body
                //   style={{
                //     minHeight: "100px",
                //   }}
                >
                  <ReactQuill
                    className="p-2"
                    theme="snow"
                    
                    // style={{
                    //   minHeight: "100px",
                    // }}
                  />
                </Card.Body>
              </Card>
            </Col>
          </div>
        </div>
        <Footer />
      </Main>
    </body>
  );
};

export default SingleContact;
