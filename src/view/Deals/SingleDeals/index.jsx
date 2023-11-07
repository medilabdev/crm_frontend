import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";

import BreadcrumbSingleDeals from "../Component/BreadcrumbSingleDeals";
import { Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Select from "react-select";
import OverlayAddCompany from "../../../components/Overlay/addCompany";
import ReactQuill from "react-quill";
import OverlayAddContact from "../../../components/Overlay/addContact";
import AddProductOverlay from "../../../components/Overlay/addProduct";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
const SingleDeals = () => {
  const token = localStorage.getItem("token");
  const [owner, setOwner] = useState([]);
  const [priority, setPriority] = useState([]);
  const [dealCategory, setDealCategory] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [contact, setContact] = useState([]);
  // overlay add company
  const [showAddCampCanvas, setShowAddCampCanvas] = useState(false);
  const handleCloseAddCampCanvas = () => setShowAddCampCanvas(false);
  const handleShowAddCampCanvas = () => setShowAddCampCanvas(true);
  // overlay add contact
  const [showAddContact, setShowAddContact] = useState(false);
  const handleCloseContact = () => setShowAddContact(false);
  const handleShowContact = () => setShowAddContact(true);

  // overlay add product
  const [showAddProduct, setShowAddProduct] = useState(false);
  const handleCloseProduct = () => setShowAddProduct(false);
  const handleShowProduct = () => setShowAddProduct(true);
  const [allProductData, setAllProductData] = useState([]);

  const allData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("DataProduct")) {
      const data = JSON.parse(localStorage.getItem(key));
      allData.push(data);
    }
  }

  const [inputDeals, setInputDeals] = useState({
    deal_name: "",
    deal_size: "",
    priority: "",
    deal_status: "",
    deal_category: "",
    staging: "",
    company_uid: "",
    product_uid: "",
    notes: "",
    gps: "",
    owner_user_uid: "",
  });

  const [inputContact, setInputContact] = useState([]);
  const handleInputDeals = (e) => {
    setInputDeals({
      ...inputDeals,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputOwner = (e) => {
    setInputDeals({
      ...inputDeals,
      owner_user_uid: e.value,
    });
  };
  const handleInputPriority = (e) => {
    setInputDeals({
      ...inputDeals,
      priority: e.value,
    });
  };
  const handleInputDealCategory = (e) => {
    setInputDeals({
      ...inputDeals,
      deal_category: e.value,
    });
  };

  const handleCompanyUid = (e) => {
    setInputDeals({
      ...inputDeals,
      company_uid: e.value,
    });
  };
  const handleContactUid = (e) => {
    setInputContact(e.map((opt) => opt.value));
  };
  // ambil data owner
  const getOwnerUser = () => {
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
  // ambil data priority
  const getPriority = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/priorities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPriority(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  // ambil data deal category
  const getDealCategory = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deal-categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDealCategory(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  // Ambil data company
  const getCompanies = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCompanies(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  // ambil data contact
  const getContact = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setContact(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  // select owner
  const ownerSelect = () => {
    const result = [];
    owner.map((data) => {
      const selectOwner = {
        value: data.uid,
        label: data.name,
      };
      result.push(selectOwner);
    });
    return result;
  };
  // select priority
  const prioritySelect = () => {
    const result = [];
    priority.map((data) => {
      const selPri = {
        value: data.uid,
        label: data.name,
      };
      result.push(selPri);
    });
    return result;
  };
  // select category deal
  const dealCategorySelect = () => {
    const result = [];
    dealCategory.map((data) => {
      const deCat = {
        value: data.uid,
        label: data.name,
      };
      result.push(deCat);
    });
    return result;
  };
  // select company
  const companySelect = () => {
    const result = [];
    companies.map((data) => {
      const comp = {
        value: data.uid,
        label: data.name,
      };
      result.push(comp);
    });
    return result;
  };
  // select contact
  const contactSelect = () => {
    const result = [];
    contact.map((data) => {
      const cont = {
        value: data.uid,
        label: data.name,
      };
      result.push(cont);
    });
    return result;
  };

  // handle delete product product
  const handleDeleteProduct = (productId) => {
    const updateData = allData[0].filter((product) => product.id !== productId);
    setAllProductData(updateData);
    localStorage.setItem("DataProduct", JSON.stringify(updateData));
  };

  // columns datatable produk
  const columns = [
    {
      id: 1,
      name: "Name Product",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      id: 2,
      name: "Action",
      selector: (row) => (
        <button
          onClick={() => handleDeleteProduct(row.id)}
          className="icon-button"
        >
          <i className="bi bi-trash-fill danger"></i>
        </button>
      ),
    },
  ];
  // custom style
  const customStyle = {
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
  useEffect(() => {
    getOwnerUser(token);
    getPriority(token);
    getDealCategory(token);
    getCompanies(token);
    getContact(token);

    // jika windows di reload maka data product akan hilang
    const clearDataProductLocalStorage = () => {
      localStorage.removeItem("DataProduct");
    };
    window.addEventListener("beforeunload", clearDataProductLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", clearDataProductLocalStorage);
    };
  }, [token]);

  const uidProduct = allData[0]?.map((data) => data.product_uid);
  const qtyProduct = allData[0]?.map((data) => data.qty);
  // const 
  // console.log(qtyProduct);
  const handleSubmitDeals = (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      for (const uidContact of inputContact) {
        formdata.append("contact_person[]", uidContact);
      }
      // for(){
        
      // }
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
  console.log(inputDeals);
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row mt-2">
            <BreadcrumbSingleDeals />
          </div>
          <form onSubmit="" className="row">
            <div className="col-12">
              <Card>
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-caret-right-square-fill fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Pipeline</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <select
                    className="form-select"
                    name="staging"
                    onChange={handleInputDeals}
                  >
                    <option value="">Select Pipeline</option>
                    <option value="leads">Leads</option>
                    <option value="qualifying">Qualifying</option>
                    <option value="approaching">Approaching</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="implementation">Implementation</option>
                    <option value="payment">Payment</option>
                    <option value="closed_won">Closed Won</option>
                    <option value="closed_lost">Closed Lost</option>
                  </select>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="shadow">
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
                      name="deal_name"
                      onChange={handleInputDeals}
                      placeholder="text"
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Deal Size" className="mb-3">
                    <Form.Control
                      type="number"
                      name="deal_size"
                      placeholder="text"
                      onChange={handleInputDeals}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Deal Status" className="mb-3">
                    <Form.Control
                      type="text"
                      name="deal_status"
                      placeholder="text"
                      onChange={handleInputDeals}
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
                      options={ownerSelect()}
                      onChange={(e) => handleInputOwner(e)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Select
                      options={prioritySelect()}
                      onChange={(e) => handleInputPriority(e)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Deal Category</Form.Label>
                    <Select
                      options={dealCategorySelect()}
                      onChange={(e) => handleInputDealCategory(e)}
                      required
                    />
                  </Form.Group>
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
                  <div>
                    <Select
                      placeholder="Companies Select"
                      onChange={(e) => handleCompanyUid(e)}
                      options={companySelect()}
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <a
                      onClick={handleShowAddCampCanvas}
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
                visible={showAddCampCanvas}
                onClose={handleCloseAddCampCanvas}
              />
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-person-circle fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Contact</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div>
                    <Select
                      placeholder="Select Contact"
                      isMulti
                      options={contactSelect()}
                      onChange={(e) => handleContactUid(e)}
                    />
                  </div>
                  <div>
                    <div className="mt-3 text-center">
                      <a
                        onClick={handleShowContact}
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
              <OverlayAddContact
                onClose={handleCloseContact}
                visible={showAddContact}
              />
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
                      data={allData[0]}
                      columns={columns}
                      customStyles={customStyle}
                    />
                  </div>
                  <div>
                    <div className="mt-3 text-center">
                      <a
                        onClick={handleShowProduct}
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
              <AddProductOverlay
                onClose={handleCloseProduct}
                visible={showAddProduct}
              />
            </div>
            <div className="col-md-8">
              <Card className="shadow">
                <Card.Header>
                  <h6 className="fw-bold mt-2">Notes</h6>
                </Card.Header>
                <Card.Body>
                  <ReactQuill
                    className="p-2"
                    theme="snow"
                    name="notes"
                    value={inputDeals.notes}
                    onChange={(value) =>
                      handleInputDeals({ target: { name: "notes", value } })
                    }
                  />
                  <Form.Group as={Row} xs={2} md={4} lg={6} className="p-2">
                    <Form.Label column lg={4} className="fw-semibold fs-6">
                      Mention Users :
                    </Form.Label>
                    <Col lg={6} style={{ marginLeft: "-5rem" }}>
                      <Select options={ownerSelect()} isMulti />
                    </Col>
                  </Form.Group>
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
            </div>
          </form>
        </div>
      </Main>
    </body>
  );
};

export default SingleDeals;
