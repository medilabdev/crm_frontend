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

  const allData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("DataProduct")) {
      const data = JSON.parse(localStorage.getItem(key));
      allData.push(data);
    }
  }

  console.log(allData[0]);

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

  const columns = [
    {
      id: 1,
      name: "Name Product",
      selector: (row) => row.product_uid,
      sortable: true,
    },
    {
      id: 2,
      name: "Action",
      // selector: (row) => (
      //   <button
      //     onClick={() => {
      //       Swal.fire({
      //         title: "Konfirmasi",
      //         text: "Apakah anda yakin ingin menghapus item product ini",
      //         icon: "warning",
      //         showCancelButton: true,
      //         confirmButtonColor: "#3085d6",
      //         cancelButtonColor: "#d33",
      //         confirmButtonText: "Ya, Hapus!",
      //         cancelButtonText: "Batal",
      //       }).then((res) => {
      //         if (res.isConfirmed) {
      //           const idDelete = row.id;
      //           const dataIndexToDelete = allData[0].findIndex(
      //             (data) => data.id === idDelete
      //           );
      //           if (dataIndexToDelete !== -1) {
      //             allData[0].splice(dataIndexToDelete, 1);
      //             localStorage.removeItem("DataProduct" );
      //             localStorage.setItem("DataProduct", JSON.stringify(allData));
      //             Swal.fire({
      //               title: res.data.message,
      //               text: "Successfully delete contact",
      //               icon: "success",
      //             }).then((res) => {
      //               if (res.isConfirmed) {
      //                 window.location.reload();
      //               }
      //             });
      //           } else {
      //             Swal.fire({
      //               title: "Error",
      //               text: "Item not found in data",
      //               icon: "error",
      //             });
      //           }
      //         }
      //       });
      //     }}
      //     className="icon-button"
      //   >
      //     <i className="bi bi-trash-fill danger"></i>
      //   </button>
      // ),
    },
  ];
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
  }, [token]);
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
                  <select name="" id="" className="form-select">
                    <option value="">Select Pipeline</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
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
                    <Form.Control type="text" placeholder="text" required />
                  </FloatingLabel>
                  <FloatingLabel label="Deal Size" className="mb-3">
                    <Form.Control type="number" placeholder="text" />
                  </FloatingLabel>
                  <FloatingLabel label="Deal Status" className="mb-3">
                    <Form.Control type="text" placeholder="text" />
                  </FloatingLabel>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Owner
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                    <Select options={ownerSelect()} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Select options={prioritySelect()} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Deal Category</Form.Label>
                    <Select options={dealCategorySelect()} required />
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
                      options={contactSelect()}
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
                  <ReactQuill className="p-2" theme="snow" />
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
