import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Link, useParams } from "react-router-dom";
import { Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import Select from "react-select";
import ReactQuill from "react-quill";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import IconPerson from "../../../assets/img/telephone-call.png";
const EditDeals = () => {
  const token = localStorage.getItem("token");
  const { uid } = useParams();
  const [pipeline, setPipeline] = useState([]);
  const [valueDeals, setValueDeals] = useState({});
  const [owner, setOwner] = useState([]);
  const [priority, setPriority] = useState([]);
  const [dealCategory, setDealsCategory] = useState([]);
  const [company, setCompany] = useState([]);
  const [oldProduct, setOldProduct] = useState([]);
  const [contact, setContact] = useState([]);
  const [contactDetail, setContactDetail] = useState({});

  const getContact = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setContact(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getCompany = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCompany(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getDealsCategory = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deal-categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDealsCategory(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getPriority = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/priorities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPriority(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getOwner = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOwner(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getDealsValueOld = (token, uid) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deals/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const dealsOld = res.data.data;
        setValueDeals({
          deal_name: dealsOld.deal_name,
          deal_size: dealsOld.deal_size,
          priority_uid: dealsOld.priority_uid,
          deal_status: dealsOld.deal_status,
          deal_category: dealsOld.deal_category_uid,
          staging_uid: dealsOld.staging_uid,
          company_uid: dealsOld.company_uid,
          owner_user_uid: dealsOld.owner_user_uid,
        });
        if (dealsOld?.detail_product) {
          dealsOld?.detail_product?.map((data) => {
            if (data?.package_product) {
              console.log(data.package_product.name);
            }
            if (data?.product) {
              console.log(data.product.name);
            }
          });
        }
        if (dealsOld?.contact_person) {
          dealsOld?.contact_person?.map((data) => {
            localStorage.setItem("contactPerson", JSON.stringify(data));
            setContactDetail(data);
          });
        }
        if (dealsOld.detail_product) {
          dealsOld.detail_product?.map((data) => {
            setOldProduct(data);
          });
        }
      })
      .catch((error) => {
        if (error.response?.data?.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getPipeline = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/staging-masters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPipeline(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const selectOwner = () => {
    const result = [];
    owner?.map((data) => {
      const reOwn = {
        label: data.name,
        value: data.uid,
      };
      result.push(reOwn);
    });
    return result;
  };

  const selectPriority = () => {
    const result = [];
    priority?.map((data) => {
      const rePre = {
        label: data.name,
        value: data.uid,
      };
      result.push(rePre);
    });
    return result;
  };

  const selectDealCategory = () => {
    const result = [];
    dealCategory?.map((data) => {
      const deCat = {
        label: `${data.name} (${data.scale})`,
        value: data.uid,
      };
      result.push(deCat);
    });
    return result;
  };

  const selectCompany = () => {
    const result = [];
    company?.map((data) => {
      const comp = {
        label: data.name,
        value: data.uid,
      };
      result.push(comp);
    });
    return result;
  };
  const [resContact, setResContact] = useState([]);
  const handleResContact = (e) => {
    setResContact(e.map((opt) => opt.value));
  };

  const selectContact = () => {
    const result = [];
    contact?.map((data) => {
      const cont = {
        label: data.name,
        value: data.uid,
      };
      result.push(cont);
    });
    return result;
  };

  const handleChange = (e) => {
    setValueDeals({
      ...valueDeals,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    getPipeline(token);
    getDealsValueOld(token, uid);
    getOwner(token);
    getPriority(token);
    getDealsCategory(token);
    getCompany(token);
    getContact(token);
  }, [token, uid]);

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
        fontWeight: "600",
        marginTop: "4px",
      },
    },
  };
  const columns = [
    {
      name: "Name Product",
    },
    {
      name: "Quantity",
    },
    {
      name: "Price",
    },
    {
      name: "Discount",
    },
    {
      name: "Action",
    },
  ];

  const allContact = [];
  for (let i = 0; i < localStorage.length; i++) {
    const keys = localStorage.key(i);
    if (keys.startsWith("contactPerson")) {
      const data = JSON.parse(localStorage.getItem(keys));
      allContact.push(data);
    }
  }
  //   console.log(oldProduct);
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Edit Deals</h1>
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
                    <li className="breadcrumb-item active">Edit Deals</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Card>
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-caret-right-square-fill fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Pipeline</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  {pipeline.map((data) => (
                    <div className="form-check form-check-inline ms-3">
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        value={data.uid}
                        // checked={data.uid === selectedPipeline}
                        // onChange={() => handleCheckboxChange(data.uid)}
                        style={{
                          width: "15px",
                          height: "15px",
                          borderColor: "#012970",
                          boxShadow: "0 2 5px rgba(0, 0, 0, 0.3)",
                        }}
                      />
                      <label
                        className="form-check-label mt-1"
                        style={{ fontWeight: 400, fontSize: "0.75rem" }}
                      >
                        {data.name}
                      </label>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="shadow mb-4">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-currency-dollar fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Deals</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <FloatingLabel
                    label={
                      <span>
                        Deal Name
                        <span style={{ color: "red" }} className="fs-6">
                          *
                        </span>
                      </span>
                    }
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      value={valueDeals.deal_name}
                      onChange={handleChange}
                      name="deal_name"
                      placeholder="text"
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label={
                      <span>
                        Deal Size
                        <span style={{ color: "red" }} className="fs-6">
                          *
                        </span>
                      </span>
                    }
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      value={valueDeals.deal_size}
                      onChange={handleChange}
                      placeholder="text"
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Deal Status" className="mb-3">
                    <Form.Control
                      type="text"
                      value={valueDeals.deal_status}
                      onChange={handleChange}
                      name="deal_status"
                      placeholder="text"
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
                      required
                      options={selectOwner()}
                      value={selectOwner().find(
                        (e) => e.value === valueDeals.owner_user_uid
                      )}
                      onChange={(selected) =>
                        setValueDeals({
                          ...valueDeals,
                          owner_user_uid: selected.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Priority
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                    <Select
                      options={selectPriority()}
                      value={selectPriority().find(
                        (e) => e.value === valueDeals.priority_uid
                      )}
                      onChange={(e) =>
                        setValueDeals({ ...valueDeals, priority_uid: e.value })
                      }
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Deal Category
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                    <Select
                      options={selectDealCategory()}
                      value={selectDealCategory().find(
                        (e) => e.value === valueDeals.deal_category
                      )}
                      onChange={(e) =>
                        setValueDeals({
                          ...valueDeals,
                          deal_category: e.value,
                        })
                      }
                      required
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
              <Card className="shadow mb-4">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-building  fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Companies</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div>
                    <Select
                      options={selectCompany()}
                      value={selectCompany().find(
                        (e) => e.value === valueDeals.company_uid
                      )}
                      onChange={(e) =>
                        setValueDeals({ ...valueDeals, company_uid: e.value })
                      }
                      placeholder="Companies Select"
                    />
                  </div>
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
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-person-circle fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Contact</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div>
                    {contactDetail !== null && (
                      <Card className="shadow p-4">
                        <div className="row d-flex">
                          <div className="col">
                            <pre style={{ fontSize: "14px" }}>
                              {contactDetail?.contact?.name ?? "-"}
                            </pre>
                            <div className="d-flex">
                              <img
                                src={IconPerson}
                                className="mt-3 ms-2"
                                alt=""
                                style={{ width: "30px" }}
                              />
                              <pre>
                                {contactDetail?.contact?.phone[0]?.number ??
                                  "-"}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    <Select
                      options={selectContact()}
                      onChange={(e) => handleResContact(e)}
                      placeholder="Select Contact"
                      isMulti
                    />
                  </div>
                  <div>
                    <div className="mt-3 text-center">
                      <a
                        className="fw-semibold fs-6"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Or Create Contact
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-8">
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-box-seam-fill fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Product</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div>
                    <DataTable
                      data={oldProduct}
                      customStyles={customStyles}
                      columns={columns}
                    />
                  </div>
                  <div className="row">
                    <div className="mt-3 me-3">
                      <span
                        className="float-end"
                        style={{ fontWeight: 400, fontSize: "0.80rem" }}
                      >
                        {/* Total Price Product:
                        <span className="ms-3 me-2" style={{ fontWeight: 600 }}>
                          Rp. {new Intl.NumberFormat().format(totalPrice)}
                        </span> */}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="mt-3 text-center">
                      <a
                        // onClick={handleShowProduct}
                        className="fw-semibold fs-6 btn btn-outline-primary"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Add Product
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card className="shadow">
                <Card.Header>
                  <h6 className="fw-bold mt-2">Notes</h6>
                </Card.Header>
                <Card.Body>
                  <ReactQuill
                    className="p-2"
                    theme="snow"
                    name="notes"
                    value={valueDeals.notes}
                    // onChange={(value) =>
                    //   handleInputDeals({ target: { name: "notes", value } })
                    // }
                  />
                  <Form.Group as={Row} xs={2} md={4} lg={6} className="p-2">
                    <Form.Label column lg={4} className="fw-semibold fs-6">
                      Mention Users :
                    </Form.Label>
                    <Col lg={6} style={{ marginLeft: "-5rem" }}>
                      <Select
                      // options={ownerSelect()}
                      // isMulti
                      // onChange={(e) => mantionUsersUid(e)}
                      />
                    </Col>
                  </Form.Group>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </Main>
    </body>
  );
};

export default EditDeals;
