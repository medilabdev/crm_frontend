import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Card, Form } from "react-bootstrap";
import Footer from "../../../components/Template/Footer";
import axios from "axios";
import { useState } from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { useEffect } from "react";

const BulkChange = () => {
  const token = localStorage.getItem("token");
  const animated = makeAnimated();
  const [bulkContact, setBulkContact] = useState([]);
  const [selectContact, setSelectContact] = useState([]);

  const getContactTransfer = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBulkContact(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const bulkSelect = () => {
    const result = [];
    bulkContact?.map((data) => {
      const dataContact = {
        value: data.uid,
        label: data.name,
      };
      result.push(dataContact);
    });
    return result;
  };

  const handleSelectContactChange = (selected) => {
    setSelectContact(selected);
    setBulkContact(selected.map((option) => option.value));
  };
  console.log(selectContact);
  useEffect(() => {
    getContactTransfer(token);
  }, [token]);
  return (
    <>
      <body id="body">
        <Topbar />
        <Sidebar />
        <Main>
          <div className="pagetitle">
            <h1>Bulk Change Contact</h1>
            <nav>
              <ol className="breadcrumb mt-2">
                <li className="breadcrumb-item">
                  <a href="/" className="text-decoration-none">
                    Dahsboard
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/contact" className="text-decoration-none">
                    Contact
                  </a>
                </li>
                <li className="breadcrumb-item active">Bulk Change</li>
              </ol>
            </nav>
          </div>
          <Card className="mt-5 shadow">
            <Card.Body>
              <form>
                <Form.Group className="mb-3 col-9">
                  <Form.Label className="fw-bold">Selected Contacts</Form.Label>
                  <Select
                    closeMenuOnSelect={false}
                    components={animated}
                    isMulti
                    options={bulkSelect()}
                    // value={selectContact}
                    // onChange={(selected) => handleSelectContactChange(selected)}
                    name="contact_uid[]"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-5" md={5}>
                  <Form.Label className="fw-bold">Owner</Form.Label>
                  <Form.Select>
                    <option value="">Select Owner</option>
                    <option value="">2</option>
                    <option value="">1</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col-5" md={5}>
                  <Form.Label className="fw-bold">
                    Give Permission to
                  </Form.Label>
                  <Form.Select>
                    <option value="">Select Choose</option>
                    <option value="">2</option>
                    <option value="">1</option>
                  </Form.Select>
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
          <Footer />
        </Main>
      </body>
    </>
  );
};

export default BulkChange;
