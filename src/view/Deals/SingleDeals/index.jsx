import React from "react";
import DatePicker from "react-datepicker";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import BreadcrumbSingleDeals from "../Component/BreadcrumbSingleDeals";
import { Card, Col, FloatingLabel, Form, Row, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import OverlayAddCompany from "../../../components/Overlay/addCompany";
import ReactQuill from "react-quill";
import OverlayAddContact from "../../../components/Overlay/addContact";
import AddProductOverlay from "../../../components/Overlay/addProduct";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

const SingleDeals = () => {
  const token = localStorage.getItem("token");
  const { uid } = useParams();
  const [owner, setOwner] = useState([]);
  const [priority, setPriority] = useState([]);
  const [dealCategory, setDealCategory] = useState([]);
  const [projectCategories, setProjectCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [contact, setContact] = useState([]);
  const [pipeline, setPipeline] = useState([]);
  const [products, setProducts] = useState([]);
  const [valueDeals, setValueDeals] = useState({}); // <-- PASTIKAN BARIS INI ADA

  // overlay add company
  const [showAddCampCanvas, setShowAddCampCanvas] = useState(false);
  const handleCloseAddCampCanvas = () => setShowAddCampCanvas(false);
  const handleShowAddCampCanvas = () => setShowAddCampCanvas(true);
  // overlay add contact
  const [showAddContact, setShowAddContact] = useState(false);
  const handleCloseContact = () => setShowAddContact(false);
  const handleShowContact = () => setShowAddContact(true);

  // handleSubmit
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  // overlay add product
  const [showAddProduct, setShowAddProduct] = useState(false);
  const handleCloseProduct = () => setShowAddProduct(false);
  const handleShowProduct = () => setShowAddProduct(true);
  const [allProductData, setAllProductData] = useState([]);
  const [mentionUsers, setMentionUsers] = useState([]);
  const [dealSize, setDealSize] = useState(null);

  const [price, setPrice] = useState(0); // Tidak diperlukan lagi
  const handlePrice = (e) => { // Tidak diperlukan lagi
      const value = e.target.value;
      setPrice(value);
  };

  const totalPrice = products.reduce((sum, item) => sum + (item.total_price || 0), 0);

  const [inputDeals, setInputDeals] = useState({
    deal_name: "",
    deal_size: "",
    priority_uid: "",
    deal_status: "",
    deal_category: "",
    project_category_uid: "", 
    staging: "",
    company_uid: "",
    product_uid: "",
    notes: "",
    gps: "",
    owner_user_uid: "",
    planned_implementation_date: null,
    next_project_date: null
  });
  
  const [inputContact, setInputContact] = useState([]);
  const handleInputDeals = (e) => {
    setInputDeals({
      ...inputDeals,
      [e.target.name]: e.target.value,
    });
  };

  const [selectedPipeline, setSelectedPipeline] = useState(null);

  const handleCheckboxChange = (stageObject) => {
    setSelectedPipeline(stageObject.uid);
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
      priority_uid: e.value,
    });
  };

  const handleInputDealCategory = (e) => {
    setInputDeals({
      ...inputDeals,
      deal_category: e.value,
    });
  };

  const handleCompanyUid = (selectedOption) => {
    setInputDeals((prevDeals) => ({
      ...prevDeals,
      company_uid: selectedOption ? selectedOption.value : "",
      deal_name: selectedOption ? selectedOption.label : "",
    }));
  };

  const handleContactUid = (e) => {
    setInputContact(e.map((opt) => opt.value));
  };
  
  const mantionUsersUid = (e) => {
    setMentionUsers(e.map((opt) => opt.value));
  };

  const handleInputProjectCategory = (selectedOption) => {
      setInputDeals(prevDeals => ({
          ...prevDeals,
          project_category_uid: selectedOption ? selectedOption.value : "",
      }));
  };

  // ambil data owner
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

  // ambil data priority
  const getPriority = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/priorities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPriority(response.data.data);
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
            getContact(retryCount + 1);
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

  // ambil data deal category
  const getDealCategory = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/deal-categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDealCategory(response.data.data);
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
            getDealCategory(retryCount + 1);
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
  // Ambil data company
  const getCompanies = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/companies/form/select`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompanies(response.data.data);
    } catch (error) {
      if (error.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getCompanies(retryCount + 1);
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

  const getProjectCategories = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/project-categories`, {
              headers: { Authorization: `Bearer ${token}` },
          });
          setProjectCategories(response.data.data);
      } catch (error) {
          console.error("Failed to fetch project categories:", error);
      }
  };

  // ambil data contact
  const getContact = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/contacts/form/select`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContact(response.data.data);
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
            getContact(retryCount + 1);
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

  const getPipeline = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/staging-masters`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPipeline(response.data.data);
      console.log("Pipeline data:", response.data.data); // Debugging line
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
            getPipeline(retryCount + 1);
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
        label: `${data.name} (${data.scale})`,
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
    const updateData = products.filter((product) => product.id !== productId);
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
      width: "150px",
    },
    {
      id: 2,
      name: "Quantity",
      selector: (row) => row.qty,
    },
    {
      id: 3,
      name: "Total Price",
      selector: (row) =>
        `Rp. ${new Intl.NumberFormat().format(row.total_price)}`,
      sortable: true,
      width: "140px",
    },
    {
      id: 4,
      name: "Discount(%)",
      selector: (row) => {
        if (row.discount_type === "nominal") {
          return `Rp. ${new Intl.NumberFormat().format(row.discount)}`;
        } else if (row.discount_type === "percent") {
          return `${row.discount} %`;
        } else {
          return "-";
        }
      },
    },

    {
      id: 5,
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

  const projectCategorySelectOptions = () => {
      return projectCategories.map(cat => ({
          value: cat.uid,
          label: cat.name,
      }));
  };

  // Fungsi ini akan dipanggil oleh overlay setelah produk disimpan
  const handleProductsUpdate = () => {
    const updatedProducts = JSON.parse(localStorage.getItem("DataProduct") || "[]");
    setProducts(updatedProducts);
  };
    
  useEffect(() => {
    const initialize = async () => {
      getPipeline();
      getOwnerUser(token);
      getPriority(token);
      getDealCategory(token);
      getCompanies(token);
      getProjectCategories(token);
      getContact(token);

      // CREATE MODE ALWAYS
      localStorage.removeItem("DataProduct");
      localStorage.removeItem("companyStorage");
      localStorage.removeItem("contactPerson");
      setProducts([]);
    };

    initialize();
  }, [token]);


  const [selectFile, setSelectFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectFile(file);
  };

  // Ganti seluruh fungsi submit Anda dengan ini
  const handleSubmitDeals = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);

    const formData = new FormData();
    const dealData = inputDeals;

    // API endpoint khusus create
    const url = `${process.env.REACT_APP_BACKEND_URL}/deals`;

    // ---- DATA DEAL ----
    formData.append("deal_name", dealData.deal_name || "");
    formData.append("deal_status", dealData.deal_status || "");
    formData.append("priority_uid", dealData.priority_uid ?? "");
    formData.append("deal_category", dealData.deal_category || "");
    formData.append("project_category_uid", dealData.project_category_uid || "");
    formData.append("company_uid", dealData.company_uid || "");
    formData.append("owner_user_uid", dealData.owner_user_uid || "");
    formData.append("notes", dealData.notes || "");
    formData.append("staging_uid", selectedPipeline ?? "");
    formData.append("deal_size", dealSize || 0);
    formData.append("file", selectFile || "");

    // ---- TANGGAL ----
    if (dealData.planned_implementation_date) {
        const date = new Date(dealData.planned_implementation_date);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
        formData.append("planned_implementation_date", formattedDate);
    }

    if (dealData.next_project_date) {
        const date = new Date(dealData.next_project_date);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
        formData.append("next_project_date", formattedDate);
    }

    // ---- CONTACT ----
    inputContact.forEach(uid => formData.append("contact_person[]", uid));

    // ---- MENTION ----
    mentionUsers.forEach((uid, index) =>
        formData.append(`mention_user[${index}]`, uid)
    );

    // ---- PRODUCTS ----
    const productsToSave = JSON.parse(localStorage.getItem("DataProduct") || "[]");
    productsToSave.forEach((product, index) => {
        formData.append(`products[${index}][product_uid]`, product.product_uid);
        formData.append(`products[${index}][product_name]`, product.product_name);
        formData.append(`products[${index}][qty]`, product.qty);
        formData.append(`products[${index}][discount_type]`, product.discount_type);
        formData.append(`products[${index}][discount]`, product.discount);
        formData.append(`products[${index}][price]`, product.price);
        formData.append(`products[${index}][total_price]`, product.total_price);
    });

    try {
        const res = await axios.post(url, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire({
            title: res.data.message,
            text: "Successfully created deal",
            icon: "success",
        }).then(() => {
            localStorage.removeItem("DataProduct");
            window.location.href = "/deals";
        });
    } catch (err) {
        Swal.fire({
            text: err.response?.data?.message || "An error occurred!",
            icon: "warning",
        });
    } finally {
        setButtonDisabled(false);
    }
  };


  const currentSelectedStage = pipeline.find(p => p.uid === selectedPipeline);

  console.log('deal size state:', dealSize);

  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row mt-2">
            <BreadcrumbSingleDeals />
          </div>
          <form className="row" onSubmit={handleSubmitDeals}>
            <div className="col-md-12">
              <div className="float-end mt-2 mb-2">
                <button
                  className="btn btn-primary me-2"
                  type="submit"
                  disabled={isButtonDisabled}
                >
                  Save Changes
                </button>
                <a
                  onclick="window.history.back()"
                  className="btn btn-secondary text-decoration-none"
                >
                  Cancel
                </a>
              </div>
            </div>
            <div className="col-md-12">
              <Card>
                <Card.Header>
                  <h5 className="mt-2">
                    <i className="bi bi-caret-right-square-fill fs-4"></i>
                    <span className="ms-2 fs-5 fw-semibold mt-5">Pipeline</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  {pipeline.map((data) => (
                    <div className="form-check form-check-inline ms-3">
                      <input
                        type="radio"
                        name="pipeline"
                        className="form-check-input me-2"
                        value={data.uid}
                        checked={data.uid === selectedPipeline}
                        onChange={() => handleCheckboxChange(data)}
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
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <FontAwesomeIcon
                      icon={faSackDollar}
                      className="fs-5 me-2"
                    />
                    <span className="ms-2 fs-5 fw-semibold mt-5">Deals</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <FloatingLabel label={
                          <span>
                          Deal Name
                          <span style={{ color: "red" }} className="fs-6">
                              *
                          </span>
                          </span>
                      }
                      className="mb-3">
                      <Form.Control
                          type="text"
                          placeholder="Deal Name"
                          name="deal_name"
                          value={inputDeals.deal_name} 
                          onChange={handleInputDeals}
                          required
                      />
                  </FloatingLabel>

                  <FloatingLabel
                      label={<span>Deal Size</span>}
                      className="mb-3"
                  >
                      <Form.Control
                          type="number"
                          placeholder="text"
                          value={dealSize || ''} // <-- GANTI dari price
                          onChange={(e) => setDealSize(e.target.value)} // <-- GANTI dari handlePrice
                          name="deal_size"
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
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Deal Category</Form.Label>
                    <Select
                      options={dealCategorySelect()}
                      onChange={(e) => handleInputDealCategory(e)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Project Category</Form.Label>
                    <CreatableSelect
                        isClearable
                        options={projectCategorySelectOptions()}
                        onChange={handleInputProjectCategory}
                        placeholder="Select or create a project category..."
                    />
                  </Form.Group>

                  {currentSelectedStage?.name === 'Approaching' && (
                      <Card className="shadow mt-4">
                          <Card.Body>
                              <Form.Group>
                                  <Form.Label>
                                      <span className="text-danger">*</span> Planned Implementation Date
                                  </Form.Label>
                                  <DatePicker
                                      selected={inputDeals.planned_implementation_date}
                                      onChange={(date) => setInputDeals({ ...inputDeals, planned_implementation_date: date })}
                                      className="form-control"
                                      dateFormat="dd/MM/yyyy"
                                      placeholderText="Select a date"
                                      required // <-- Membuat field ini wajib diisi jika muncul
                                  />
                                  <Form.Text className="text-muted">
                                      This date is mandatory for the Approaching stage.
                                  </Form.Text>
                              </Form.Group>
                          </Card.Body>
                      </Card>
                  )}

                  <Form.Group as={Col} md={6} className="mb-3">
                    <Form.Label>Next Project Date</Form.Label>
                    <DatePicker
                        selected={inputDeals.next_project_date}
                        onChange={(date) => setInputDeals({ ...inputDeals, next_project_date: date })}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Optional: Set a follow-up date"
                        isClearable
                    />
                </Form.Group>


                </Card.Body>
              </Card>

              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i className="bi bi-building  fs-4"></i>
                    <span className="ms-2 fs-5 fw-semibold mt-5">
                      Companies
                    </span>
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
                    <i className="bi bi-person-circle fs-4"></i>
                    <span className="ms-2 fs-5 fw-semibold mt-5">Contact</span>
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
            </div>
          
            <div className="col-md-8">
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i className="bi bi-box-seam-fill fs-4"></i>
                    <span className="ms-2 fs-5 fw-semibold mt-5">Product</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div>
                    <DataTable
                      data={products} // <-- PERBAIKAN: Gunakan state 'products'
                      columns={columns}
                      customStyles={customStyle}
                    />
                  </div>
                  <div className="row">
                    <div className="mt-3 me-3">
                      <span className="float-end" style={{ fontWeight: 400, fontSize: "0.80rem" }}>
                        Total Price Product:
                        <span className="ms-3 me-2" style={{ fontWeight: 600 }}>
                          {/* PERBAIKAN: Gunakan variabel totalPrice yang reaktif */}
                          Rp. {new Intl.NumberFormat().format(totalPrice)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="mt-3 text-center">
                      <Button variant="outline-primary" onClick={handleShowProduct}>
                        Add Product
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <AddProductOverlay
                  visible={showAddProduct}
                  onClose={handleCloseProduct}
                  onProductsUpdated={handleProductsUpdate} // <-- PERBAIKAN: Pastikan prop ini ada
              />

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
                      File :
                    </Form.Label>
                    <Col lg={8} style={{ marginLeft: "-5rem" }}>
                      <Form.Control
                        type="file"
                        name="file"
                        size="sm"
                        className="p-2"
                        onChange={handleFileChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} xs={2} md={4} lg={6} className="p-2">
                    <Form.Label column lg={4} className="fw-semibold fs-6">
                      Mention Users :
                    </Form.Label>
                    <Col lg={8} style={{ marginLeft: "-5rem" }}>
                      <Select
                        options={ownerSelect()}
                        isMulti
                        onChange={(e) => mantionUsersUid(e)}
                      />
                    </Col>
                  </Form.Group>
                </Card.Body>
              </Card>
            </div>
            

          </form>
          </div>


      </Main>
    </body>
  );
};

export default SingleDeals;
