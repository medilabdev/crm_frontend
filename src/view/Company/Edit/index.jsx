import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import Footer from "../../../components/Template/Footer";
import { Button, Card, CardHeader, FloatingLabel, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";
import { Chrono } from "react-chrono";
import OverlayAddDeals from "../../../components/Overlay/addDeals";
import OverlayAddCompany from "../../../components/Overlay/addCompany";
import DataTable from "react-data-table-component";
const EditCompany = () => {
  const { uid } = useParams();
  const token = localStorage.getItem("token");
  const [telephone, setTelephone] = useState([""]);
  const [editCompany, setEditCompany] = useState({});
  const [owner, setOwner] = useState([]);
  const [typeCompany, setTypeCompany] = useState([]);
  const [sourceCompany, setSourceCompany] = useState([]);
  const [parentCompany, setParentCompany] = useState([]);
  const [contact, setContact] = useState([]);
  const [deals, setDeals] = useState([])
  const animatedComponents = makeAnimated();
  const [showCanvasDeals, setShowCanvasDeals] = useState(false);
  const handleCloseCanvasDeals = () => setShowCanvasDeals(false);
  const handleOpenCanvasDeals = () => setShowCanvasDeals(true);
  const [showCanvasCompany, setShowCanvasCompany] = useState(false);
  const handleCloseCanvasCompany = () => setShowCanvasCompany(false);
  const handleOpenCanvasCompany = () => setShowCanvasCompany(true);
  const [history, setHistory] = useState([])
  const [oldAssociate, setOldAssociate] = useState([])

  const getDeals = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/deals`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res) => setDeals(res.data.data))
    .catch((err) => {
      if (err.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
    });
  }
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

  const getTypeCompany = () => {
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

  const getCompanyDetail = (uid, token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const companyDetail = res.data.data;
        const telp_number = companyDetail?.phone?.map(
          (phoneObj) => phoneObj.number
        );
        const oldAssociate = companyDetail?.associate?.map((data) => data)
        setOldAssociate(oldAssociate)
        setEditCompany({
          name: companyDetail.name,
          website_url: companyDetail.website_url,
          address: companyDetail.address,
          map_address: companyDetail.map_address,
          city: companyDetail.city,
          postal_code: companyDetail.postal_code,
          number_of_employee: companyDetail.number_of_employee,
          number_of_patient: companyDetail.number_of_patient,
          parent_company_uid: companyDetail?.parent_company?.uid,
          owner_user_uid: companyDetail?.owner?.uid,
          company_source_uid: companyDetail?.company_source?.uid,
          company_type_uid: companyDetail?.company_type?.uid,
        });
        setTelephone(telp_number ? telp_number : []);
        setHistory(companyDetail.history);
      });
  };
  const getOwnerUser = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOwner(res.data.data))
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

  const removeTelephone = (index) => {
    const newTelephone = [...telephone];
    newTelephone.splice(index, 1);
    setTelephone(newTelephone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditCompany({
      ...editCompany,
      [name]: value,
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
  
  const selectOwner = () => {
    const res = [];
    owner?.map((data) => {
      const theme = {
        value:data.uid,
        label: data.name
      }
      res.push(theme)
    })
    return res
  }
  // const selectComp = () => {
  //   const res = [];
  //   pare?.map((data) => {
  //     const theme = {
  //       value:data.uid,
  //       label: data.name
  //     }
  //     res.push(theme)
  //   })
  //   const filterData = res.filter((comp) => !oldAssociate.some((old) => old?.company?.uid))
  //   return filterData
  // }
  const selectDeals = () => {
    const rest = [];
    deals?.map((data) => {
      const theme ={
        value: data.uid,
        label: data.deal_name
      }
      rest.push(theme)
    })
    const filterDeals = rest.filter((deals) => !oldAssociate.some((old) => old?.deals?.uid === deals.value))
    return filterDeals;
  }
  useEffect(() => {
    getCompanyDetail(uid, token);
    getOwnerUser(token);
    getTypeCompany(token);
    getSourceCompany(token);
    getCompanyParent(token);
    getContact(token);
    getDeals(token)
  }, [uid, token]);

  // console.log(telephone);
  const updateCompany = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    telephone.forEach((number) => {
      formData.append("telp_number[]", number);
    });
    formData.append("name", editCompany.name || "");
    formData.append("website_url", editCompany.website_url || "");
    formData.append("address", editCompany.address || "");
    formData.append("map_address", editCompany.map_address || "");
    formData.append("city", editCompany.city || "");
    formData.append("postal_code", editCompany.postal_code || "");
    formData.append("number_of_employee", editCompany.number_of_employee || "");
    formData.append("number_of_patient", editCompany.number_of_patient || "");
    formData.append("parent_company_uid", editCompany.parent_company_uid || "");
    formData.append("owner_user_uid", editCompany.owner_user_uid || "");
    formData.append("company_source_uid", editCompany.company_source_uid || "");
    formData.append("company_type_uid", editCompany.company_type_uid || "");
    formData.append("notes", editCompany.notes || "");
    formData.append("_method", "put");
    console.log("FormData Content:");
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      const update = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/companies/${uid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: update.data.message,
        text: "Successfully add company",
        icon: "success",
      });
      window.location.reload();
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
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  const columnHistory = [
    {
      name: "Created By",
      selector: (row) => row.created_by?.name,
      sortable: true,
      width:'150px'
    },
    {
      name: "Note", 
      selector: (row) => (
        <div className="mt-2" style={{ whiteSpace: "normal", fontSize: "12px" }}
        >
          <p dangerouslySetInnerHTML={{ __html: row?.note }} /></div>
      ),
      wrap: true,
      width: "200px"
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
  ]

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
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Edit Company</h1>
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
                    <li className="breadcrumb-item active">Edit Company</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <form onSubmit={updateCompany}>
            <div className="row">
              <div className="col-md-12">
              <div className="float-end mb-3">
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
              <div className="col-md-4">
                {/* company */}
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
                        value={editCompany.name}
                        onChange={handleInputChange}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Website" className="mb-3">
                      <Form.Control
                        type="text"
                        name="website_url"
                        value={editCompany.website_url}
                        onChange={handleInputChange}
                        placeholder="name@example.com"
                      />
                    </FloatingLabel>
                    <Form.Group className="mb-3">
                      <Select options={selectOwner()} placeholder="Select Owner" />
                    </Form.Group>
                    {telephone.map((tel, index) => (
                      <div key={index}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Telephone #{index + 1} <span style={{ color: "red" }} className="fs-6">
                                *
                              </span>
                          </Form.Label>
                          <Form.Control
                            type="number"
                            value={tel}
                            onChange={(e) => {
                              const hp = e.target.value;
                              const update = [...telephone];
                              update[index] = hp;
                              setTelephone(update);
                            }}
                          />
                        </Form.Group>
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
                      label="Address (Google Map)"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        name="map_address"
                        value={editCompany.map_address}
                        onChange={handleInputChange}
                        placeholder="name@example.com"
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
                        value={editCompany.address}
                        onChange={handleInputChange}
                        placeholder="name@example.com"
                      />
                    </FloatingLabel>
                    <FloatingLabel label="City" className="mb-3">
                      <Form.Control
                        type="text"
                        name="city"
                        value={editCompany.city}
                        onChange={handleInputChange}
                        placeholder="name@example.com"
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Zip Code" className="mb-3">
                      <Form.Control
                        type="text"
                        name="postal_code"
                        value={editCompany.postal_code}
                        onChange={handleInputChange}
                        placeholder="name@example.com"
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
                        value={editCompany.company_type_uid}
                        onChange={(e) => {
                          const typeUid = e.target.value;
                          setEditCompany({
                            ...editCompany,
                            company_type_uid: typeUid,
                          });
                        }}
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
                        type="number"
                        placeholder="name@example.com"
                        name="number_of_employee"
                        value={editCompany.number_of_employee}
                        onChange={handleInputChange}
                      />
                    </FloatingLabel>
                    <FloatingLabel label="Source">
                      <Form.Select
                        className="mb-3"
                        size="lg"
                        style={{ fontSize: "0.85rem" }}
                        name="company_source_uid"
                        value={editCompany.company_source_uid}
                        onChange={(e) => {
                          const sourceUid = e.target.value;
                          setEditCompany({
                            ...editCompany,
                            company_source_uid: sourceUid,
                          });
                        }}
                      >
                        <option>Select Choose</option>
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
                        value={editCompany.number_of_patient}
                        onChange={handleInputChange}
                      />
                    </FloatingLabel>
                  </Card.Body>
                </Card>
                {/* deals */}
                <Card className="shadow mt-3">
                  <Card.Header>
                    <h5 className="mt-2">
                      <i class="bi bi-currency-dollar  fs-4"></i>
                      <span className="ms-2 fs-5 fw-bold mt-5">Deals</span>
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Select placeholder="Select Deals" isMulti options={selectDeals()} />
                    </Form.Group>
                    <div className="text-center">
                      <a
                        //   onClick={handleShowCanvasDeals}
                        className="text-primary text-decoration-none fw-semibold"
                        style={{ cursor: "pointer" }}
                        onClick={handleOpenCanvasDeals}
                      >
                        <i
                          class="bi bi-plus-lg"
                          style={{ fontSize: "15px" }}
                        ></i>
                        <span className="fs-6"> Create Another Deal</span>
                      </a>
                    </div>
                  </Card.Body>
                </Card>
                <OverlayAddDeals
                  visible={showCanvasDeals}
                  onClose={handleCloseCanvasDeals}
                />
                {/* contact */}
                <Card className="shadow mt-3">
                  <Card.Header>
                    <h5 className="mt-2">
                      <i class="bi bi-person-circle fs-4"></i>
                      <span className="ms-2 fs-5 fw-bold mt-5">Contact</span>
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <FloatingLabel controlId="floatingInput" className="mb-3">
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={contactSelect()}
                        name="contact_uid[]"
                      />
                    </FloatingLabel>
                    <div className="text-center">
                      <a
                        //   onClick={handleShowCanvasDeals}
                        className="text-primary text-decoration-none fw-semibold"
                        style={{ cursor: "pointer" }}
                        // onClick={handleOpenCanvasContact}
                      >
                        <i
                          class="bi bi-plus-lg"
                          style={{ fontSize: "15px" }}
                        ></i>
                        <span className="fs-6"> Create Another Contact</span>
                      </a>
                    </div>
                  </Card.Body>
                </Card>
                {/* parent company */}
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
                    {/* <Form.Group className="mb-3">
                      <Select options={selectComp()} onChange={(e) => {
                          const parentUid = e.target.value;
                          setEditCompany({
                            ...editCompany,
                            parent_company_uid: parentUid,
                          });
                        }} />
                    </Form.Group> */}
                    <div className="text-center">
                      <a
                        //   onClick={handleShowCanvasDeals}
                        className="text-primary text-decoration-none fw-semibold"
                        style={{ cursor: "pointer" }}
                        onClick={handleOpenCanvasCompany}
                      >
                        <i
                          class="bi bi-plus-lg"
                          style={{ fontSize: "15px" }}
                        ></i>
                        <span className="fs-6"> Create Another Company</span>
                      </a>
                    </div>
                  </Card.Body>
                </Card>
                <OverlayAddCompany
                  visible={showCanvasCompany}
                  onClose={handleCloseCanvasCompany}
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
                      onChange={(value) =>
                        handleInputChange({ target: { name: "notes", value } })
                      }
                    />
                  </Card.Body>
                </Card>

                <Card className="shadow">
                  <Card.Header>
                  <h6 className="fw-bold mt-2">History</h6>
                  </Card.Header>
                  <Card.Body>
                    <DataTable columns={columnHistory} data={history} customStyles={customStyles} pagination defaultSortFieldId={1} paginationComponentOptions={paginationComponentOptions} />
                  </Card.Body>
                  </Card>    
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </Main>
    </body>
  );
};

export default EditCompany;
