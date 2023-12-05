import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Col, Card, FloatingLabel, Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import OverlayAddCompany from "../../../components/Overlay/addCompany";
import OverlayAddDeals from "../../../components/Overlay/addDeals";
import Swal from "sweetalert2";
import OverlayAddContact from "../../../components/Overlay/addContact";

const SingleCompany = () => {
  const token = localStorage.getItem("token");
  const [inputCompany, setInputCompany] = useState({
    name: "",
    website_url: "",
    telp_number: [""],
    address: "",
    map_address: "",
    city: "",
    postal_code: "",
    number_of_employee: "",
    number_of_patient: "",
    parent_company_uid: "",
    owner_user_uid: "",
    company_source_uid: "",
    company_type_uid: "",
    contact_uid: [],
    notes: "",
  });
  const handleSelectParentCompany = (e) => {
    setInputCompany({
      ...inputCompany,
      parent_company_uid: e.value,
    });
  };
  const [ownerUser, setOwnerUser] = useState([]);
  const [typeCompany, setTypeCompany] = useState([]);
  const [sourceCompany, setSourceCompany] = useState([]);
  const [parentCompany, setParentCompany] = useState([]);
  const [contact, setContact] = useState([]);
  const [deals, setDeals] = useState([]);
  const animatedComponents = makeAnimated();
  const [showCanvas, setShowCanvas] = useState(false);
  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);

  const [showAddDeals, setShowAddDeals] = useState(false);
  const handleCloseDeals = () => setShowAddDeals(false);
  const handleShowDeals = () => setShowAddDeals(true);

  const [showAddContact, setShowAddContact] = useState(false);
  const handleCloseContact = () => setShowAddContact(false);
  const handleShowContact = () => setShowAddContact(true);

  const getDeals = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDeals(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  // console.log(inputCompany);
  const getContact = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setContact(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getCompanyParent = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setParentCompany(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getSourceCompany = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies-source`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSourceCompany(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getCompanyType = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies-type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTypeCompany(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getOwnerUser = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOwnerUser(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const addTelephone = () => {
    setInputCompany((prevInput) => ({
      ...prevInput,
      telp_number: [...prevInput.telp_number, ""],
    }));
  };

  const handleChangeTelephone = (index, value) => {
    setInputCompany((prevInput) => {
      const newTelpNumb = [...prevInput.telp_number];
      newTelpNumb[index] = value;
      return {
        ...prevInput,
        telp_number: newTelpNumb,
      };
    });
  };

  const removeTelephone = (index) => {
    setInputCompany((prevInput) => {
      const newTelp = [...prevInput.telp_number];
      newTelp.splice(index, 1);
      return {
        ...prevInput,
        telp_number: newTelp,
      };
    });
  };

  const contactSelect = () => {
    const result = [];
    contact?.map((data) => {
      const contact = {
        value: data.uid,
        label: data.name,
      };
      result.push(contact);
    });
    return result;
  };
  const selectCompany = () => {
    const result = [];
    parentCompany?.map((data) => {
      const parCo = {
        value: data.uid,
        label: data.name,
      };
      result.push(parCo);
    });
    return result;
  };

  const [resultContact, setResultContact] = useState([]);
  const handleSelectContact = (select) => {
    setResultContact(select.map((option) => option.value));
  };

  const [resultDeals, setResultDeals] = useState([]);
  const handleSelDeals = (e) => {
    setResultDeals(e.map((opt) => opt.value));
  };

  const ownerSelect = () => {
    const result = [];
    ownerUser?.map((data) => {
      const select = {
        value: data.uid,
        label: data.name,
      };
      result.push(select);
    });
    return result;
  };
  const dealsSelect = () => {
    const result = [];
    deals?.map((data) => {
      const sel = {
        value: data.uid,
        label: data.deal_name,
      };
      result.push(sel);
    });
    return result;
  };

  const handleInputOwner = (selected) => {
    setInputCompany({
      ...inputCompany,
      owner_user_uid: selected.value,
    });
  };

  const handleInputCompany = (e) => {
    setInputCompany({
      ...inputCompany,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const uid of resultContact) {
      formData.append("contact_uid[]", uid);
    }
    inputCompany.telp_number.forEach((number) => {
      formData.append("telp_number[]", number);
    });
    formData.append("name", inputCompany.name);
    formData.append("website_url", inputCompany.website_url);
    formData.append("address", inputCompany.address);
    formData.append("map_address", inputCompany.map_address);
    formData.append("city", inputCompany.city);
    formData.append("postal_code", inputCompany.postal_code);
    formData.append("number_of_employee", inputCompany.number_of_employee);
    formData.append("number_of_patient", inputCompany.number_of_patient);
    formData.append("parent_company_uid", inputCompany.parent_company_uid);
    formData.append("owner_user_uid", inputCompany.owner_user_uid);
    formData.append("company_source_uid", inputCompany.company_source_uid);
    formData.append("company_type_uid", inputCompany.company_type_uid);
    formData.append("notes", inputCompany.notes);
    // console.log("FormData Content:");
    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    try {
      const addCompany = await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/companies`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          Swal.fire({
            title: "Successfully",
            text: "Successfully create company",
            icon: "success",
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.href = "/company";
            }
          });
        });
    } catch (err) {
      if (err.response) {
        Swal.fire({
          text: err.response.data.message,
          icon: "warning",
        });
      } else {
        Swal.fire({
          text: "Something went wrong !",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    getOwnerUser();
    getCompanyType();
    getSourceCompany();
    getCompanyParent();
    getContact();
    getDeals();
  }, [token]);
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Add Single Company</h1>
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
                    <li className="breadcrumb-item active">
                      Add Single Company
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmitContact} className="row">
            <Col md={4}>
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-building-fill fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-2">Companies</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <FloatingLabel
                    label={
                      <span>
                        Company Name
                        <span style={{ color: "red" }} className="fs-6">
                          *
                        </span>
                      </span>
                    }
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      name="name"
                      onChange={handleInputCompany}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Website" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      name="website_url"
                      onChange={handleInputCompany}
                    />
                  </FloatingLabel>
                  <Form.Group className="mb-3">
                    <Form.Label controlId="floatingInput">
                      <span>
                        Owner
                        <span style={{ color: "red" }} className="fs-6">
                          *
                        </span>
                      </span>
                    </Form.Label>
                    <Select
                      name="owner_user_uid"
                      onChange={handleInputOwner}
                      options={ownerSelect()}
                      required
                    />
                  </Form.Group>
                  <Form.Label>
                    Telp.No/WhatApp
                    <span style={{ color: "red" }} className="fs-6">
                      *
                    </span>
                  </Form.Label>
                  {inputCompany.telp_number.map((telephone, index) => (
                    <div key={index}>
                      <Form.Control
                        className="mb-2"
                        type="number"
                        placeholder={`No.Telp ${index + 1}  `}
                        name={`telp_number[${index}]`}
                        value={inputCompany.telp_number[index]}
                        onChange={(e) =>
                          handleChangeTelephone(index, e.target.value)
                        }
                        required
                      />

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
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      name="map_address"
                      onChange={handleInputCompany}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label={
                      <span>
                        Address
                        <span style={{ color: "red" }} className="fs-6">
                          *
                        </span>
                      </span>
                    }
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      name="address"
                      onChange={handleInputCompany}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="City" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      name="city"
                      onChange={handleInputCompany}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Zip Code" className="mb-3">
                    <Form.Control
                      type="number"
                      placeholder="name@example.com"
                      name="postal_code"
                      onChange={handleInputCompany}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label={
                      <span>
                        Type Company
                        <span style={{ color: "red" }} className="fs-6">
                          *
                        </span>
                      </span>
                    }
                  >
                    <Form.Select
                      className="mb-3"
                      size="lg"
                      style={{ fontSize: "0.85rem" }}
                      name="company_type_uid"
                      onChange={handleInputCompany}
                      required
                    >
                      <option value="">Select Choose</option>
                      {typeCompany.map((type) => (
                        <option key={type.uid} value={type.uid}>
                          {type.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel label="Number of Employees" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      name="number_of_employee"
                      onChange={handleInputCompany}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label={
                      <span>
                        Source
                        <span style={{ color: "red" }} className="fs-6">
                          *
                        </span>
                      </span>
                    }
                  >
                    <Form.Select
                      className="mb-3"
                      size="lg"
                      style={{ fontSize: "0.85rem" }}
                      name="company_source_uid"
                      onChange={handleInputCompany}
                    >
                      <option value="">Select Choose</option>
                      {sourceCompany.map((source) => (
                        <option key={source.uid} value={source.uid}>
                          {source.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel label="Number of Patiens" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      name="number_of_patient"
                      onChange={handleInputCompany}
                    />
                  </FloatingLabel>
                </Card.Body>
              </Card>
              <Card className="shadow mt-3">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-currency-dollar  fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Deals</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Select
                    options={dealsSelect()}
                    isMulti
                    onChange={(e) => handleSelDeals(e)}
                    components={animatedComponents}
                    placeholder="Select Deals"
                    className="mb-3"
                  />

                  <div className="text-center">
                    {/* <a
                      //   onClick={handleShowCanvasDeals}
                      className="text-primary text-decoration-none fw-semibold"
                      style={{ cursor: "pointer" }}
                      onClick={handleShowDeals}
                    >
                      <i class="bi bi-plus-lg" style={{ fontSize: "15px" }}></i>
                      <span className="fs-6"> Create Another Deal</span>
                    </a> */}
                  </div>
                </Card.Body>
              </Card>
              <OverlayAddDeals
                visible={showAddDeals}
                onClose={handleCloseDeals}
              />
              <Card className="shadow mt-3">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-person-circle fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Contact</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form.Label controlId="floatingInput" className="mb-3">
                    Select Contact
                  </Form.Label>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={contactSelect()}
                    onChange={(selected) => handleSelectContact(selected)}
                    name="contact_uid[]"
                  />
                  <div className="text-center mt-3">
                    <a
                      onClick={handleShowContact}
                      className="text-primary text-decoration-none fw-semibold"
                      style={{ cursor: "pointer" }}
                    >
                      <i class="bi bi-plus-lg" style={{ fontSize: "15px" }}></i>
                      <span className="fs-6"> Create Another Contact</span>
                    </a>
                  </div>
                </Card.Body>
              </Card>
              <OverlayAddContact
                visible={showAddContact}
                onClose={handleCloseContact}
              />
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
                  <Select
                    onChange={handleSelectParentCompany}
                    options={selectCompany()}
                    className="mb-3"
                  />
                  <div className="text-center">
                    <a
                      onClick={handleShowCanvas}
                      className="text-primary text-decoration-none fw-semibold"
                      style={{ cursor: "pointer" }}
                    >
                      <i class="bi bi-plus-lg" style={{ fontSize: "15px" }}></i>
                      <span className="fs-6"> Create Company</span>
                    </a>
                  </div>
                </Card.Body>
              </Card>
              <OverlayAddCompany
                visible={showCanvas}
                onClose={handleCloseCanvas}
              />
            </Col>
            <Col md={8}>
              <Card className="shadow">
                <Card.Header>
                  <h6 className="fw-bold mt-2">Notes</h6>
                </Card.Header>
                <Card.Body>
                  <ReactQuill
                    className="p-2"
                    theme="snow"
                    name="notes"
                    value={inputCompany.notes}
                    onChange={(value) =>
                      handleInputCompany({ target: { name: "notes", value } })
                    }
                  />
                </Card.Body>
              </Card>
              <div className="float-end">
                <button className="btn btn-primary me-2" type="submit">
                  Save Changes
                </button>
                <a
                  href="/company"
                  className="btn btn-secondary text-decoration-none"
                >
                  Cancel
                </a>
              </div>
            </Col>
          </form>
        </div>
      </Main>
    </body>
  );
};

export default SingleCompany;
