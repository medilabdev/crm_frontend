import React, { useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import Footer from "../../../components/Template/Footer";
import { Button, Card, Col, FloatingLabel, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import IconPhoto from "../../../assets/img/person.png";
import { useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import DataTable from "react-data-table-component";
import IconCompany from "../../../assets/img/condo.png";
import IconDeals from "../../../assets/img/coin.png";
import Swal from "sweetalert2";
const EditContact = () => {
  const [telephone, setTelephone] = useState([""]);
  const [editContact, setEditContact] = useState({});
  const [source, setSource] = useState([]);
  const [owner, setOwner] = useState([]);
  const [company, setCompany] = useState([]);
  const [valueComp, setValueComp] = useState([]);
  const [valueDeals, setValueDeals] = useState([]);
  const [deals, setDeals] = useState([]);
  const [history, setHistory] = useState([]);
  const [oldComp, setOldComp] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { uid } = useParams();
  const token = localStorage.getItem("token");
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

  const getOwner = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users?limit=100`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOwner(response.data.data);
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
            getOwner(retryCount + 1);
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

  const getContactDetail = async (uid, token, retryCount = 0) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/contacts/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const contactDetail = res.data.data;
      const telp_number = contactDetail?.phone?.map((phone) => phone);
      const companyOld = contactDetail?.associate?.map((data) => data);
      setOldComp(companyOld);
      
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
        gps: contactDetail.gps,
      });
      setTelephone(telp_number ? telp_number : []);
      setHistory(contactDetail.history);
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
            getContactDetail(retryCount + 1);
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

  const addTelephone = () => {
    setTelephone([...telephone, ""]);
  };
  // console.log(editContact);
  const handleChangeTelephone = (index, value) => {
    const newTelephone = [...telephone];
    if (newTelephone[index]) {
      newTelephone[index] = { ...newTelephone[index], number: value };
    } else {
      newTelephone[index] = { uid: "", number: value };
    }
    setTelephone(newTelephone);
  };

  const removeTelephone = (telephone) => {
    if (telephone) {
      Swal.fire({
        title: "Konfirmasi",
        text: "Apa anda yakin ingin menghapus item ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      }).then((res) => {
        if (res.isConfirmed) {
          const formData = new FormData();
          formData.append("_method", "delete");
          axios
            .post(
              `${process.env.REACT_APP_BACKEND_URL}/contacts/delete/item/telp/${telephone}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(() => {
              window.location.reload();
            });
        }
      });
    } else {
      setTelephone((prevState) => {
        const telp = [...prevState];
        telp.pop();
        return telp;
      });
    }
  };
  const selectOwner = () => {
    const res = [];
    owner?.map((data) => {
      const thme = {
        label: data.name,
        value: data.uid,
      };
      res.push(thme);
    });
    return res;
  };
  const selectSource = () => {
    const res = [];
    source?.map((data) => {
      const thme = {
        label: data.name,
        value: data.uid,
      };
      res.push(thme);
    });
    return res;
  };

  const selectCompany = () => {
    const res = [];
    company?.map((data) => {
      const thme = {
        label: data.name,
        value: data.uid,
      };
      res.push(thme);
    });
    const filteredCompanies = res.filter(
      (company) =>
        !oldComp.some(
          (oldCompany) => oldCompany?.company?.uid === company.value
        )
    );
    return filteredCompanies;
  };

  const selectDeals = () => {
    const res = [];
    deals?.map((data) => {
      const thme = {
        label: data.deal_name,
        value: data.uid,
      };
      res.push(thme);
    });
    const filteredDeals = res.filter(
      (deals) => !oldComp.some((old) => old?.deals?.uid === deals.value)
    );
    return filteredDeals;
  };

  const handleInput = (e) => {
    setEditContact({
      ...editContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompany = (e) => {
    setValueComp(e.map((opt) => opt.value));
  };

  const handleDeals = (e) => {
    setValueDeals(e.map((opt) => opt.value));
  };

  useEffect(() => {
    getContactDetail(uid, token);
    getOwner(token);
    getSource(token);
    getCompany(token);
    getDeals(token);
  }, [uid, token]);

  const historyColumns = [
    {
      name: "Created By",
      selector: (row) => row?.created_by?.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Note",
      selector: (row) => (
        <div
          className="mt-2"
          style={{ whiteSpace: "normal", fontSize: "12px" }}
        >
          <p dangerouslySetInnerHTML={{ __html: row?.note }} />
        </div>
      ),
      wrap: true,
      width: "200px",
    },
    {
      name: "Created at",
      selector: (row) => {
        const date = new Date(row?.created_at);
        const formatDate = {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        const formatResult = new Intl.DateTimeFormat("en-US", formatDate);
        const time = formatResult.format(date);
        return (
          <div className="mt-2">
            <p style={{ whiteSpace: "normal", fontSize: "10px" }}>{time}</p>
          </div>
        );
      },
      width: "140px",
    },
  ];
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#427D9D",
        color: "white",
        marginTop: "12px",
        borderRadius: "5px",
      },
    },
    cells: {
      style: {
        fontSize: "4px",
        fontWeight: "500",
        marginTop: "4px",
      },
    },
  };
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // for(const telp of telephone){
    // }
    telephone?.forEach((telp, index) => {
      formData.append(`phone_number[${index}][uid]`, telp.uid);
      formData.append(`phone_number[${index}][number]`, telp.number);
    });
    formData.append("name", editContact.name);
    formData.append("birthday", editContact.birthday || "");
    formData.append("gender", editContact.gender || "");
    formData.append("email", editContact.email || "");
    formData.append("position", editContact.position || "");
    formData.append("address", editContact.address || "");
    formData.append("city", editContact.city || "");
    formData.append("postal_code", editContact.postal_code || "");
    formData.append("remarks", editContact.remarks || "");
    formData.append("owner_user_uid", editContact.owner_user_uid);
    formData.append("source_uid", editContact.source_uid);
    formData.append("notes", editContact.notes || "");
    if (valueComp) {
      valueComp.forEach((comp, index) => {
        formData.append(`company_uid[${index}]`, comp);
      });
    }
    if (valueDeals) {
      valueDeals.forEach((deals, index) => {
        formData.append(`deals_uid[${index}]`, deals);
      });
    }
    formData.append("_method", "put");
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/contacts/${uid}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setButtonDisabled(true);
      Swal.fire({
        title: res.data.message,
        text: "Successfully updated contact",
        icon: "success",
      }).then((res) => {
        if (res.isConfirmed) {
            window.location.reload();
          }
        });
      });
  };

  const handleDeleteDeals = (uid) => {
    // console.log(uid);
    Swal.fire({
      title: "Konfirmasi",
      text: "Apa anda yakin ingin menghapus item ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        const formData = new FormData();
        formData.append("associate_uid", uid);
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/contacts/delete/item/deals`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            window.location.reload();
          });
      }
    });
  };

  const handleDeleteComp = (uid) => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apa anda yakin ingin menghapus item ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        const formData = new FormData();
        formData.append("associate_uid", uid);
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/contacts/delete/item/company`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            window.location.reload();
          });
      }
    });
  };
  // console.log(editContact);
  
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
          {/* contact */}
          <form onSubmit={handleSubmit} className="row">
            <div className="col-md-12">
              <div className="float-end mb-2">
                <button
                  className="btn btn-primary me-2"
                  type="submit"
                  disabled={isButtonDisabled}
                >
                  Save Changes
                </button>
                <a
                  href="/contact"
                  className="btn btn-secondary text-decoration-none"
                >
                  Cancel
                </a>
              </div>
            </div>
            <div className="col-md-4">
              {/* <Card className="shadow">
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
              </Card> */}
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
                    label="Name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      name="name"
                      value={editContact.name}
                      placeholder="name@example.com"
                      onChange={handleInput}
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
                      value={editContact.position}
                      placeholder="name@example.com"
                      onChange={handleInput}
                    />
                  </FloatingLabel>
                  <Form.Label>
                    Owner
                    <span style={{ color: "red" }} className="fs-6">
                      *
                    </span>
                  </Form.Label>
                  <Select
                    className="mb-3"
                    required
                    options={selectOwner()}
                    value={selectOwner().find(
                      (e) => e.value === editContact.owner_user_uid
                    )}
                    onChange={(e) =>
                      setEditContact({
                        ...editContact,
                        owner_user_uid: e.value,
                      })
                    }
                  />
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={editContact.email}
                      onChange={handleInput}
                      placeholder="@gmail.com"
                    />
                  </Form.Group>
                  {telephone.map((telephone, index) => (
                    <div key={index}>
                      <FloatingLabel
                        controlId={`floatingInput${index}`}
                        label={`Telephone #${index + 1}`}
                        className="mb-2"
                      >
                        <Form.Control
                          type="number"
                          value={telephone.number}
                          onChange={(e) =>
                            handleChangeTelephone(index, e.target.value)
                          }
                        />
                      </FloatingLabel>
                      <Button
                        variant="danger"
                        onClick={() => removeTelephone(telephone.uid)}
                        style={{ fontSize: "0.65rem" }}
                        className="mb-1"
                      >
                        Remove
                      </Button>
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
                      value={editContact.address}
                      onChange={handleInput}
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
                      value={editContact.city}
                      onChange={handleInput}
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
                      value={editContact.postal_code}
                      onChange={handleInput}
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
                      name="birthday"
                      onChange={handleInput}
                      value={editContact.birthday}
                    />
                  </FloatingLabel>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Source{" "}
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                    <Select
                      options={selectSource()}
                      required
                      value={selectSource().find(
                        (e) => e.value === editContact.source_uid
                      )}
                      onChange={(e) =>
                        setEditContact({
                          ...editContact,
                          source_uid: e.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Select
                    className="mb-3"
                    size="lg"
                    style={{ fontSize: "0.85rem" }}
                    value={editContact.gender}
                    onChange={(e) =>
                      setEditContact({ ...e, gender: e.target.value })
                    }
                  >
                    <option>Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                  <Form.Group className="mb-3">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                      type="text"
                      name="remarks"
                      value={editContact.remarks}
                      onChange={handleInput}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
              {/* deals */}
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-currency-dollar fs-4"></i>
                    <span className="ms-2 fs-5 fw-semibold mt-5">Deals</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div>
                    {oldComp?.map((data, index) =>
                      data.deals ? (
                        <Card className="shadow p-2">
                          <div className="row d-flex">
                            <>
                              <Col md={10} sm={10} key={index}>
                                <div className="d-flex">
                                  <img
                                    src={IconDeals}
                                    alt={IconDeals}
                                    className="ms-1 me-3 mt-3"
                                    style={{ width: "30px", height: "30px" }}
                                  />

                                  <Col md={12} sm={12}>
                                    <p
                                      className="ms-1 mt-2 me-3"
                                      style={{
                                        fontSize: "10px",
                                        whiteSpace: "normal",
                                      }}
                                    >
                                      {" "}
                                      Name Deals :{" "}
                                      <strong className="ms-2">
                                        {data?.deals?.deal_name ?? null}
                                      </strong>{" "}
                                    </p>
                                    <p
                                      className="ms-1"
                                      style={{
                                        fontSize: "10px",
                                        marginTop: "-8px",
                                      }}
                                    >
                                      Stage :{" "}
                                      <strong className="ms-2">
                                        {data?.deals?.staging?.name}
                                      </strong>
                                    </p>
                                    <p
                                      className="ms-1"
                                      style={{
                                        fontSize: "10PX",
                                        marginTop: "-8px",
                                      }}
                                    >
                                      Deal Size :{" "}
                                      <strong className="ms-2">
                                        Rp.
                                        {new Intl.NumberFormat().format(
                                          data?.deals?.deal_size
                                        )}
                                      </strong>
                                    </p>
                                  </Col>
                                </div>
                              </Col>
                              <Col md={2} sm={2} style={{ marginTop: "-8px" }}>
                                <a
                                  onClick={() => handleDeleteDeals(data.uid)}
                                  className="ms-1"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  <i className="bi bi-x fs-5 text-danger"></i>
                                </a>
                              </Col>
                            </>
                          </div>
                        </Card>
                      ) : null
                    )}
                  </div>
                  <Form.Group className="mb-3">
                    <Select
                      options={selectDeals()}
                      isMulti
                      placeholder="Select Deals"
                      onChange={(e) => handleDeals(e)}
                      closeMenuOnSelect={false}
                    />
                  </Form.Group>
                  {/* <div className="text-center">
                    <a
                      className="text-primary text-decoration-none fw-semibold"
                      style={{ cursor: "pointer" }}
                    >
                      <i class="bi bi-plus-lg" style={{ fontSize: "15px" }}></i>
                      <span className="fs-6"> Create Another Deal</span>
                    </a>
                  </div> */}
                </Card.Body>
              </Card>
              {/* Companies */}
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
                  <div>
                    {oldComp?.map((data, index) =>
                      data.company ? (
                        <Card className="shadow p-2">
                          <div className="row d-flex">
                            <>
                              <Col md={10} sm={10} key={index}>
                                <div className="d-flex">
                                  <img
                                    src={IconCompany}
                                    alt={IconCompany}
                                    className="ms-1 me-3 mt-3"
                                    style={{ width: "30px", height: "30px" }}
                                  />

                                  <Col md={12} sm={12}>
                                    <p
                                      className="ms-1 mt-2 me-3"
                                      style={{
                                        fontSize: "10px",
                                        whiteSpace: "normal",
                                      }}
                                    >
                                      {" "}
                                      Name :{" "}
                                      <strong className="ms-2">
                                        {data?.company?.name ?? null}
                                      </strong>{" "}
                                    </p>
                                    <p
                                      className="ms-1"
                                      style={{
                                        fontSize: "10px",
                                        marginTop: "-8px",
                                      }}
                                    >
                                      Badan :{" "}
                                      <strong className="ms-2">
                                        {data?.company?.company_type?.name}
                                      </strong>
                                    </p>
                                  </Col>
                                </div>
                              </Col>
                              <Col md={2} sm={2} style={{ marginTop: "-8px" }}>
                                <a
                                  onClick={() => handleDeleteComp(data.uid)}
                                  className="ms-1"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  <i className="bi bi-x fs-5 text-danger"></i>
                                </a>
                              </Col>
                            </>
                          </div>
                        </Card>
                      ) : null
                    )}
                  </div>
                  <Select
                    options={selectCompany()}
                    closeMenuOnSelect={false}
                    isMulti
                    onChange={(e) => handleCompany(e)}
                    placeholder="Select Company"
                  />
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
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-8">
              <Card className="shadow mb-2">
                <Card.Header>
                  <h6 className="fw-bold mt-2">Notes</h6>
                </Card.Header>
                <Card.Body>
                  <ReactQuill
                    className="p-2"
                    theme="snow"
                    name="notes"
                    onChange={(value) =>
                      handleInput({ target: { name: "notes", value } })
                    }
                  />
                </Card.Body>
              </Card>
              <Card className="shadow">
                <Card.Header>
                  <h6 className="fw-bold mt-2">History</h6>
                </Card.Header>
                <Card.Body>
                  <DataTable
                    data={history}
                    columns={historyColumns}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    defaultSortFieldId={1}
                    customStyles={customStyles}
                  />
                </Card.Body>
              </Card>
            </div>
          </form>
        </div>
        <Footer />
      </Main>
    </body>
  );
};

export default EditContact;
