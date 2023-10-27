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
    company_uid: [],
    gps: "",
  });
  const [ownerUser, setOwnerUser] = useState([]);
  const [source, setSource] = useState([]);
  const [company, setCompany] = useState([]);
  const [additionalForm, setAdditionalForm] = useState([]);
  console.log(inputContact);
  const getCompany = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCompany(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getSource = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies-source`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSource(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  // console.log(inputContact);
  const getOwnerUser = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOwnerUser(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const addAditionalCompany = () => {
    setAdditionalForm([...additionalForm, {}]);
  };

  const removeAdditionalComapany = (e) => {
    const removeCompany = [...additionalForm];
    removeCompany.splice(e, 1);
    setAdditionalForm(removeCompany);
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
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addContact = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/contacts`,
        inputContact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: addContact.data.message,
        text: "Successfully add contact",
        icon: "success",
      });
      window.location.href = "/contact";
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
          <form onSubmit={handleSubmit} className="row">
            <Col md={4}>
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-person-circle fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Contact</span>
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
                    label={
                      <span>
                        Owner
                        <span style={{ color: "red" }} className="fs-6">
                          *
                        </span>
                      </span>
                    }
                  >
                    <Form.Select
                      name="owner_user_uid"
                      onChange={handleInputContact}
                    >
                      <option value="">Select Choose</option>
                      {ownerUser.map((owner) => (
                        <option key={owner.uid} value={owner.uid}>
                          {owner.name}
                        </option>
                      ))}
                    </Form.Select>
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
                  {inputContact.phone_number.map((telephone, index) => (
                    <div key={index}>
                      <FloatingLabel
                        label={
                          <>
                            Telephone #{index + 1}
                            <span style={{ color: "red" }} className="fs-6">
                              *
                            </span>
                          </>
                        }
                        className="mb-2"
                      >
                        <Form.Control
                          type="number"
                          placeholder="@gmail."
                          name={`phone_number[${index}]`}
                          value={inputContact.phone_number[index]}
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
                      name="source_uid"
                    >
                      <option value="">Source Choose</option>
                      {source.map((so) => (
                        <option key={so.uid} value={so.uid}>
                          {so.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel
                    label={
                      <span>
                        Gender
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
                      name="gender"
                      onChange={handleInputContact}
                    >
                      <option value="">Select Choose</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingInput"
                    label="Remarks(Other Source)"
                  >
                    <Form.Control
                      type="text"
                      name="remarks"
                      onChange={handleInputContact}
                      placeholder="@gmail"
                    />
                  </FloatingLabel>
                </Card.Body>
              </Card>
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-building  fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Companies</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Primary Company"
                    className="mb-3"
                  >
                    <Form.Select
                      name={`company_uid[]`}
                      onChange={handleInputContact}
                    >
                      <option value="">Select Company</option>
                      {company.map((com) => (
                        <option key={com.uid} value={com.uid}>
                          {com.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                  {additionalForm.map((_, index) => (
                    <div key={index}>
                      <FloatingLabel
                        label="Additional Company"
                        className="mb-3"
                      >
                        <Form.Select
                          name={`company_uid[]`}
                          onChange={handleInputContact}
                        >
                          <option value="">Select Company</option>
                          {company.map((com) => (
                            <option key={com.uid} value={com.uid}>
                              {com.name}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                      <Button
                        variant="danger"
                        className="mb-2"
                        style={{ fontSize: "0.65rem" }}
                        onClick={() => removeAdditionalComapany(index)}
                      >
                        Remove Additional
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="primary"
                    style={{ fontSize: "0.65rem" }}
                    onClick={addAditionalCompany}
                  >
                    Add Additional
                  </Button>
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
                    <span className="ms-2 fs-5 fw-bold mt-5">Deals</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <form action="" method="post">
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
                  </form>
                  <div className="text-center">
                    <a
                      onClick={handleShowCanvasDeals}
                      className="text-primary text-decoration-none fw-semibold"
                      style={{ cursor: "pointer" }}
                    >
                      <i class="bi bi-plus-lg" style={{ fontSize: "15px" }}></i>
                      <span className="fs-6"> Create Another Deal</span>
                    </a>
                  </div>
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
        <Footer />
      </Main>
    </body>
  );
};

export default SingleContact;
