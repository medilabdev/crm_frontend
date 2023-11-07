import React, { useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import Footer from "../../../components/Template/Footer";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import IconPhoto from "../../../assets/img/person.png";
import { useEffect } from "react";
import axios from "axios";
const EditContact = () => {
  const [telephone, setTelephone] = useState([""]);
  const [editContact, setEditContact] = useState({});
  const { uid } = useParams();
  const token = localStorage.getItem("token");
  const getContactDetail = (uid, token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/contacts/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const contactDetail = res.data.data;
        console.log(contactDetail);
        const telp_number = contactDetail?.phone_number?.map(
          (phone) => phone.number
        );
        setEditContact({
          name: contactDetail.name,
          birthday: contactDetail.birthday,
          gender: contactDetail.gender,
          email: contactDetail.email,
          position: contactDetail.position,
          address: contactDetail.address,
          city: contactDetail.city,
          postal_code: contactDetail.postal_code,
          remarks: contactDetail.remarks,
          image: contactDetail.image,
          owner_user_uid: contactDetail.owner_user_uid,
          source_uid: contactDetail.source_uid,
          notes: contactDetail.notes,
          company_uid: contactDetail.company_uid,
          gps: contactDetail.gps,
        });
        setTelephone(telp_number ? telp_number : []);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
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
  useEffect(() => {
    getContactDetail(uid, token);
  }, [uid, token]);
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Edit Contact</h1>
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
                    <li className="breadcrumb-item active">Edit Contact</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Card className="shadow">
                <div className="row">
                  <div className="col-md-4 p-2 text-center">
                    <img
                      src={IconPhoto}
                      style={{
                        width: "60px",
                        marginTop: "25px",
                        marginLeft: "25px"
                      }}
                    />
                  </div>
                  <div className="col-md-8 p-4">
                    <h6 className="fw-bold mt-2">{editContact.name}</h6>
                    <span className="fw-norma">{editContact.position}</span>
                    <p className="fw-normal fs-6">
                      <i class="bi bi-geo-alt-fill"></i>{" "}
                      {editContact.address ? editContact.address : "-"}
                    </p>
                  </div>
                </div>
              </Card>
              {/* contact */}
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
                    label="Name"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Job Title"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingInput"
                    label="Owner"
                  >
                    <Form.Control type="text" placeholder="owner@example" />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingInput"
                    label="Email"
                  >
                    <Form.Control type="email" placeholder="@gmail.com" />
                  </FloatingLabel>
                  {telephone.map((telephone, index) => (
                    <div key={index}>
                      <FloatingLabel
                        controlId={`floatingInput${index}`}
                        label={`Telephone #${index + 1}`}
                        className="mb-2"
                      >
                        <Form.Control
                          type="number"
                          placeholder="@gmail."
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
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingInput"
                    label="Address"
                  >
                    <Form.Control type="text" placeholder="@gmail" />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingInput"
                    label="City"
                  >
                    <Form.Control type="text" placeholder="@gmail" />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingInput"
                    label="Zip Code"
                  >
                    <Form.Control type="number" placeholder="@gmail" />
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
                    />
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
                  <Form.Select
                    className="mb-3"
                    size="lg"
                    style={{ fontSize: "0.85rem" }}
                    name="sex"
                  >
                    <option>Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingInput"
                    label="Remarks(Other Source)"
                  >
                    <Form.Control
                      type="text"
                      name="remarks"
                      placeholder="@gmail"
                    />
                  </FloatingLabel>
                </Card.Body>
              </Card>
              {/* deals */}
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-currency-dollar fs-4"></i>
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
                      className="text-primary text-decoration-none fw-semibold"
                      style={{ cursor: "pointer" }}
                    >
                      <i class="bi bi-plus-lg" style={{ fontSize: "15px" }}></i>
                      <span className="fs-6"> Create Another Deal</span>
                    </a>
                  </div>
                </Card.Body>
              </Card>
              {/* Companies */}
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-building  fs-4"></i>{" "}
                    <span className="ms-2 fs-5 fw-bold mt-5">Companies</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <form action="" method="post">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Primary Company"
                      className="mb-3"
                    >
                      <Form.Select>
                        <option value="SelectCompany">Select Company</option>
                        <option value="">Company 1</option>
                        <option value="">Company 2</option>
                      </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel label="Additional Company" className="mb-3">
                      <Form.Select>
                        <option value="SelectCompany">Select Company</option>
                        <option value="">Company 2</option>
                      </Form.Select>
                    </FloatingLabel>
                    <Button variant="danger" style={{ fontSize: "0.85rem" }}>
                      Remove Additional
                    </Button>
                    <div className="mt-3 text-center">
                      <a
                        className="fw-semibold fs-6"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Or Create Company
                      </a>
                    </div>
                  </form>
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

export default EditContact;
