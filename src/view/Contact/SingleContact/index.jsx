import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import Footer from "../../../components/Template/Footer";
import { Card, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import OverlayAddDeals from "../../../components/Overlay/addDeals";
import OverlayAddCompany from "../../../components/Overlay/addCompany";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import { Link } from "react-router-dom";

const SingleContact = () => {
  const token = localStorage.getItem("token");
  const [showCanvasDeals, setShowCanvasDeals] = useState(false);
  const handleCloseCanvasDeals = () => setShowCanvasDeals(false);
  const handleShowCanvasDeals = () => setShowCanvasDeals(true);
  const [inputContact, setInputContact] = useState({
    name: "",
    birthday: "",
    gender: "",
    email: "",
    position: "",
    address: "",
    city: "",
    postal_code: "",
    remarks: "",
    image: "",
    phone_number: [""],
    owner_user_uid: "",
    source_uid: "",
    notes: "",
    gps: "",
  });
  const [ownerUser, setOwnerUser] = useState([]);
  const [source, setSource] = useState([]);
  const [company, setCompany] = useState([]);
  const [deals, setDeals] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const getDeals = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/deals/form/select`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeals(response.data.data);
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.data.message === "Unauthenticated."
      ) {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getDeals(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("Unhandled error:", error);
      }
    }
  };

  const getCompany = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/companies/form/select`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompany(response.data.data);
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.data.message === "Unauthenticated."
      ) {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getCompany(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("Unhandled error:", error);
      }
    }
  };

  const getSource = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/companies-source`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSource(response.data.data);
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.data.message === "Unauthenticated."
      ) {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getSource(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("Unhandled error:", error);
      }
    }
  };

  const getOwnerUser = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOwnerUser(response.data.data);
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.data.message === "Unauthenticated."
      ) {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getOwnerUser(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("Unhandled error:", error);
      }
    }
  };

  const [showCanvas, setShowCanvas] = useState(false);
  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);

  //  menambah telephone
  const addTelephone = () => {
    setInputContact((input) => ({
      ...input,
      phone_number: [...input.phone_number, ""],
    }));
  };

  //   mengubah nomor telepon pada indeks tertentu
  const handleChangeTelephone = (index, value) => {
    setInputContact((input) => {
      const telp = [...input.phone_number];
      telp[index] = value;
      return {
        ...input,
        phone_number: telp,
      };
    });
  };
  const ownerSelected = () => {
    const resultOwner = [];
    ownerUser.map((data) => {
      const selectOwner = {
        value: data.uid,
        label: data.name,
      };
      resultOwner.push(selectOwner);
    });
    return resultOwner;
  };

  const selectSource = () => {
    const result = [];
    source?.map((data) => {
      const seSourc = {
        value: data.uid,
        label: data.name,
      };
      result.push(seSourc);
    });
    return result;
  };

  const selectComp = () => {
    const result = [];
    company?.map((data) => {
      const comSe = {
        value: data.uid,
        label: data.name,
      };
      result.push(comSe);
    });
    return result;
  };

  const selDeals = () => {
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

  const [resultDeals, setResultDeals] = useState([]);
  const handleDeals = (e) => {
    setResultDeals(e.map((opt) => opt.value));
  };

  const handleSourceSelect = (e) => {
    setInputContact({
      ...inputContact,
      source_uid: e.value,
    });
  };
  const handleInputOwner = (selected) => {
    setInputContact({
      ...inputContact,
      owner_user_uid: selected.value,
    });
  };
  //   menghapus telephone
  const removeTelephone = (index) => {
    setInputContact((input) => {
      const telp = [...input.phone_number];
      telp.splice(index, 1);
      return {
        ...input,
        phone_number: telp,
      };
    });
  };

  const handleInputContact = (e) => {
    setInputContact({
      ...inputContact,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getOwnerUser(token);
    getSource(token);
    getCompany(token);
    getDeals(token);
  }, [token]);
  const [compParent, setCompParent] = useState([]);
  const handleSelectParentComp = (e) => {
    setCompParent(e.map((opt) => opt.value));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      compParent.forEach((comp, index) => {
        formData.append(`company_uid[${index}]`, comp);
      });
      formData.append("name", inputContact.name);
      formData.append("birthday", inputContact.birthday);
      formData.append("email", inputContact.email);
      formData.append("gender", inputContact.gender);
      formData.append("position", inputContact.position);
      formData.append("address", inputContact.address);
      formData.append("city", inputContact.city);
      formData.append("remarks", inputContact.remarks);
      formData.append("source_uid", inputContact.source_uid);
      formData.append("owner_user_uid", inputContact.owner_user_uid);
      for (const phone of inputContact?.phone_number) {
        formData.append(`phone_number[]`, phone);
      }
      resultDeals.forEach((deals, index) => {
        formData.append(`deals_uid[${index}]`, deals);
      });
      // console.log("FormData Content:");
      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }
      setButtonDisabled(true);
      const addContact = await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/contacts`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            text: "Successfully add contact",
            icon: "success",
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.href = "/contact";
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
                      <Link to="/" className="text-decoration-none">
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/contact" className="text-decoration-none">
                        Contact
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Add Single Contact
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="row">
            <Col md={4}>
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-person-circle fs-4"></i>
                    <span className="ms-2 fs-5 fw-semibold mt-5">Contact</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <FloatingLabel
                    controlId="floatingInput"
                    label={
                      <span>
                        Name
                        <span style={{ color: "red" }} className="fs-6">
                          *
                        </span>
                      </span>
                    }
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      name="name"
                      onChange={handleInputContact}
                      placeholder="name@example.com"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Job Title"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      name="position"
                      onChange={handleInputContact}
                      placeholder="name@example.com"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingInput"
                    label="Email"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={handleInputContact}
                      placeholder="@gmail.com"
                    />
                  </FloatingLabel>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Owner
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                    <Select
                      name="owner_user_uid"
                      onChange={handleInputOwner}
                      options={ownerSelected()}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      No.Telp/WhatsApp
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                  </Form.Group>
                  {inputContact.phone_number.map((telephone, index) => (
                    <div key={index}>
                      <Form.Control
                        type="number"
                        className="mb-2"
                        placeholder={`No.Telp ${index + 1} `}
                        name={`phone_number[${index}]`}
                        value={inputContact.phone_number[index]}
                        onChange={(e) =>
                          handleChangeTelephone(index, e.target.value)
                        }
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
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingInput"
                    label="Address"
                  >
                    <Form.Control
                      type="text"
                      name="address"
                      onChange={handleInputContact}
                      placeholder="@gmail"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingInput"
                    label="City"
                  >
                    <Form.Control
                      type="text"
                      name="city"
                      onChange={handleInputContact}
                      placeholder="@gmail"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingInput"
                    label="Zip Code"
                  >
                    <Form.Control
                      type="number"
                      name="postal_code"
                      onChange={handleInputContact}
                      placeholder="@gmail"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingInput"
                    label="Date"
                  >
                    <Form.Control
                      type="date"
                      placeholder="@gmail"
                      name="birthday"
                      onChange={handleInputContact}
                    />
                  </FloatingLabel>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Source<span className="text-danger fs-6">*</span>
                    </Form.Label>
                    <Select
                      options={selectSource()}
                      onChange={handleSourceSelect}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      Gender<span className="text-danger fs-6">*</span>
                    </Form.Label>
                    <Form.Select
                      className="mb-3"
                      size="lg"
                      style={{ fontSize: "0.85rem" }}
                      name="gender"
                      onChange={handleInputContact}
                      required
                    >
                      <option value="">Select Choose</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                      type="text"
                      name="remarks"
                      onChange={handleInputContact}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-building  fs-4"></i>
                    <span className="ms-2 fs-5 fw-semibold mt-5">
                      Companies
                    </span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Select
                    closeMenuOnSelect={false}
                    options={selectComp()}
                    onChange={(e) => handleSelectParentComp(e)}
                    className="mb-3"
                    placeholder="Primary Company"
                    isMulti
                  />
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
                </Card.Body>
              </Card>
              <OverlayAddCompany
                visible={showCanvas}
                onClose={handleCloseCanvas}
              />
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-currency-dollar  fs-4"></i>
                    <span className="ms-2 fs-5 fw-semibold mt-5">Deals</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Select
                    options={selDeals()}
                    closeMenuOnSelect={false}
                    onChange={(e) => handleDeals(e)}
                    isMulti
                    placeholder="Select Deals"
                    className="mb-3"
                  />
                  {/* <div className="text-center">
                    <a
                      onClick={handleShowCanvasDeals}
                      className="text-primary text-decoration-none fw-semibold"
                      style={{ cursor: "pointer" }}
                    >
                      <i class="bi bi-plus-lg" style={{ fontSize: "15px" }}></i>
                      <span className="fs-6"> Create Another Deal</span>
                    </a>
                  </div> */}
                </Card.Body>
              </Card>
              <OverlayAddDeals
                visible={showCanvasDeals}
                onClose={handleCloseCanvasDeals}
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
                    value={inputContact.notes}
                    onChange={(value) =>
                      handleInputContact({ target: { name: "notes", value } })
                    }
                  />
                </Card.Body>
              </Card>
              <div className="float-end">
                <button
                  className="btn btn-primary me-2"
                  type="submit"
                  disabled={isButtonDisabled}
                >
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
        <Footer />
      </Main>
    </body>
  );
};

export default SingleContact;
