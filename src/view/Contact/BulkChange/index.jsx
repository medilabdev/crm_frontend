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
import Swal from "sweetalert2";

const BulkChange = () => {
  const token = localStorage.getItem("token");
  const animated = makeAnimated();
  const [user, setUser] = useState([]);
  const [bulkContact, setBulkContact] = useState([]);
  const [resultContact, setResultContact] = useState([]);
  const [owner, setOwner] = useState({
    owner_user_uid: "",
  });
  const [permission, setPermission] = useState({
    new_owner_user_uid: "",
  });

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

  const getAllUser = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data.data))
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

  const selectUser = () => {
    const result = [];
    user?.map((data) => {
      const dataUser = {
        value: data.uid,
        label: data.name,
      };
      result.push(dataUser);
    });
    return result;
  };

  const handleSelectBulk = (e) => {
    setResultContact(e.map((option) => option.value));
  };

  const handleOwner = (e) => {
    setOwner({
      ...owner,
      owner_user_uid: e.value,
    });
  };

  const handleNewOwner = (e) => {
    setPermission({
      ...permission,
      new_owner_user_uid: e.value,
    });
  };

  // console.log(permission);
  useEffect(() => {
    getContactTransfer(token);
    getAllUser(token);
  }, [token]);

  const handleSubmitBulk = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const uid of resultContact) {
        formData.append("contact_uid[]", uid);
      }
      formData.append("owner_user_uid", owner.owner_user_uid);
      formData.append("new_owner_user_uid", permission.new_owner_user_uid);
      formData.append("_method", "PUT");
      console.log("FormData Content:");
      for (const pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      const bulk = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/contacts/transfer/owner`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: bulk.data.message,
        text: "Successfully bulk change contact",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      }
    }
  };
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
              <form onSubmit={handleSubmitBulk}>
                <Form.Group className="mb-3 col-9">
                  <Form.Label className="fw-bold">Selected Contacts</Form.Label>
                  <Select
                    closeMenuOnSelect={false}
                    components={animated}
                    isMulti
                    options={bulkSelect()}
                    onChange={(selected) => handleSelectBulk(selected)}
                    name="contact_uid[]"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-5" md={5}>
                  <Form.Label className="fw-bold">Owner</Form.Label>
                  <Select
                    options={selectUser()}
                    name="owner_user_uid"
                    onChange={handleOwner}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-5" md={5}>
                  <Form.Label className="fw-bold">
                    Give Permission to
                  </Form.Label>
                  <Select
                    options={selectUser()}
                    name="new_owner_user_uid"
                    onChange={handleNewOwner}
                    required
                  />
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
