import React, { useEffect, useState } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Card from "../../components/Card";
import Footer from "../../components/Template/Footer";
import DataTable from "react-data-table-component";
import Dummy from "./Dummy/index";
import IconCompany from "../../assets/img/condo.png";
import { useNavigate } from "react-router-dom";
import "../Company/style.css";
import DeleteCompany from "./Modals/deleteCompany";
import phone from "../../../src/assets/img/phone.png";
import iconGedung from "../../../src/assets/img/office-building.png";
import axios, { all } from "axios";
import Swal from "sweetalert2";
const Company = () => {
  const [allCompany, setAllCompany] = useState([]);
  const token = localStorage.getItem("token");
  const [isSideBar, setIsSideBar] = useState(false);
  const toggleSideBarCard = () => {
    setIsSideBar(!isSideBar);
  };
  console.log(allCompany);
  const filterClass = isSideBar ? "col-md-3 d-block" : "col-sm-0 d-none";
  const datatableClass = isSideBar ? "col-md-9" : "col-sm-12";
  const showTooltip = isSideBar ? (
    <Tooltip id="tooltip">Close Filter</Tooltip>
  ) : (
    <Tooltip id="tooltip">Show Filter</Tooltip>
  );
  const iconFilter = isSideBar ? "bi bi-x-lg" : "bi bi-funnel";
  const navigate = useNavigate();
  const [search, setSearch] = useState(allCompany);
  const [selectedUIDs, setSelectedUIDs] = useState([]);
  const [deleteCompany, setDeleteCompany] = useState(false);
  const handleDeleteCompany = () => setDeleteCompany(false);
  const [owner, setOwner] = useState([]);

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

  function handleSearch(e) {
    const newData = allCompany.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(newData);
  }

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  // console.log(allCompany);

  const getAllCompany = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllCompany(res.data.data);
        setSearch(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const selectUid = (state) => {
    const selectedRows = state.selectedRows.map((row) => row.uid);
    setSelectedUIDs(selectedRows);
  };
  // console.log(selectedUIDs);
  const donwloadAll = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const uid of selectedUIDs) {
        formData.append("company_uid[]", uid);
      }

      const donwload = axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/companies/export/excel`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      }
    }
  };
  const handleSubmitDeleteSelect = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak dapat mengembalikan data ini setelah menghapusnya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });
    if (result.isConfirmed) {
      try {
        const formData = new FormData();
        for (const uid of selectedUIDs) {
          formData.append("company_uid[]", uid);
        }
        // console.log("FormData Content:");
        // for (const pair of formData.entries()) {
        //   console.log(pair[0] + ": " + pair[1]);
        // }
        const deleteSelect = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/companies/delete/item`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire({
          title: deleteSelect.data.message,
          text: "Successfully delete company",
          icon: "success",
        });
        window.location.reload();
      } catch (error) {
        if (error.response) {
          Swal.fire({
            text: error.response.data.message,
            icon: "warning",
          });
        }
      }
    }
  };
  useEffect(() => {
    getAllCompany(token);
    getOwnerUser(token);
  }, [token]);
  const columns = [
    {
      id: 1,
      name: "Company Name",
      selector: (row) => (
        <div className="image-name">
          <div className="d-flex align-items-center">
            <img src={IconCompany} style={{ width: "20px" }} />
            <div className="mt-1">
              <span className="fw-semibold">{row.name}</span>
            </div>
          </div>
        </div>
      ),
      left: true,
      width: "200px",
      sortable: true,
    },
    {
      id: 2,
      name: "Associated with",
      selector: (row) => (
        <div>
          {row?.associate?.map((item, index) => (
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip
                  id={`tooltip-${item?.contact?.name}- ${item?.contact?.phone?.[0]?.number}`}
                >
                  {item?.contact?.name}
                  <br />
                  {item?.contact?.phone?.[0]?.number}
                </Tooltip>
              }
            >
              <div>
                {item?.contact ? (
                  <img
                    src={phone}
                    style={{ width: "20px" }}
                    data-tip={item?.contact?.name}
                  />
                ) : (
                  <img
                    src={iconGedung}
                    style={{ width: "20px" }}
                    data-tip={item?.contact?.name}
                  />
                )}
              </div>
            </OverlayTrigger>
          ))}
        </div>
      ),
      sortable: true,
      width: "130px",
    },
    {
      id: 3,
      name: "Type",
      selector: (row) => (
        <div className="badge bg-secondary">{row?.company_type?.name}</div>
      ),
      sortable: true,
    },
    {
      id: 4,
      name: "Owner/Created",
      selector: (row) => {
        const date = new Date(row.created_at);
        const formatOptions = {
          year: "numeric",
          month: "long",
          day: "2-digit",
        };
        const formate = new Intl.DateTimeFormat("en-US", formatOptions);
        const time = formate.format(date);
        return (
          <div className="mt-2">
            <span className="fw-semibold">{row?.owner?.name}</span>
            <p className="mt-1" style={{ fontSize: "10px" }}>
              {time}
            </p>
          </div>
        );
      },
      sortable: true,
      width: "140px",
    },
    {
      id: 5,
      name: "Updated",
      selector: (row) => {
        const date = new Date(row.updated_at);
        const formatOptions = {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        const formatResult = new Intl.DateTimeFormat("en-US", formatOptions);
        const time = formatResult.format(date);
        return (
          <p className="mt-2" style={{ fontSize: "11px" }}>
            {time}
          </p>
        );
      },
      sortable: true,
      width: "180px",
    },
    {
      id: 6,
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <button
            title="show"
            className="icon-button"
            onClick={() => navigate(`/company/${row.uid}`)}
          >
            <i className="bi bi-building-fill"></i>
          </button>
          <button
            className="ms-2 icon-button"
            title="edit"
            onClick={() => navigate(`/company/${row.uid}/edit`)}
          >
            <i className="bi bi-pen"></i>
          </button>
          <button
            className="ms-2 icon-button"
            title="delete"
            onClick={() => setDeleteCompany(row.uid)}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      ),
      width: "150px",
    },
  ];

  return (
    <>
      <body id="body">
        <Topbar />
        <Sidebar />
        <Main>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="pagetitle">
                  <h1>Company</h1>
                  <nav>
                    <ol className="breadcrumb mt-2">
                      <li className="breadcrumb-item">
                        <a href="/" className="text-decoration-none">
                          Dashboard
                        </a>
                      </li>
                      <li className="breadcrumb-item active fw-bold">
                        Company
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="row button-contact mb-2">
              <div className="col d-flex mb-2">
                <div class="dropdown button-flex">
                  <button
                    class="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Add Company
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="/company/single-company">
                        Single Company
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/company/upload-file">
                        Upload File
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="dropdown donwload">
                  <button
                    class="btn btn-outline-primary dropdown-toggle ms-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Donwload
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item"
                        onClick={donwloadAll}
                        style={{ cursor: "pointer" }}
                      >
                        Donwload Selected
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        onClick={donwloadAll}
                        style={{ cursor: "pointer" }}
                      >
                        Donwload All
                      </a>
                    </li>
                  </ul>
                </div>
                <a
                  href="/company/bulkchange"
                  class="btn btn-outline-primary ms-2 bulk-change"
                >
                  Bulk Change
                </a>
                <button
                  class="btn btn-danger ms-2 delete"
                  onClick={handleSubmitDeleteSelect}
                >
                  Delete
                </button>
              </div>
            </div>
            <Card className="shadow">
              <div className="row">
                <div className={`${filterClass}`} id="filter">
                  <div className="container">
                    <div className="row mt-4">
                      <div className="col">
                        <h6>
                          <i className="bi bi-funnel ml"></i>
                          <span className="fw-semibold ms-2 fs-6 ">Filter</span>
                        </h6>
                      </div>
                      <form action="">
                        <div className="col mt-3">
                          <select
                            name=""
                            id=""
                            className="form-select"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <option value="">All Contact</option>
                            <option value="">My Contact</option>
                          </select>
                        </div>
                        <div className="col mt-2">
                          <select
                            name=""
                            id=""
                            className="form-select"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <option disabled selected>
                              Owner
                            </option>
                            <option value=""> 1</option>
                            <option value=""> 2</option>
                          </select>
                        </div>
                        <div className="col mt-2">
                          <select
                            name=""
                            id=""
                            className="form-select"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <option disabled selected>
                              Team
                            </option>
                            <option value="">1</option>
                            <option value="">2</option>
                          </select>
                        </div>
                        {/* <div className="col mt-5">
                          <h6>
                            <i className="bi bi-link-45deg"></i>
                            <span className="fw-semibold ms-2 fs-6">
                              Associated
                            </span>
                          </h6>
                        </div>
                        <div className="col mt-3">
                          <select
                            name=""
                            id=""
                            className="form-select"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <option value="">Select Company</option>
                            <option value="">1</option>
                            <option value="">2</option>
                          </select>
                        </div>
                        <div className="col mt-3">
                          <select
                            name=""
                            id=""
                            className="form-select"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <option value="">Select Deals</option>
                            <option value="">1</option>
                            <option value="">2</option>
                          </select>
                        </div> */}
                        <div className="col mt-5">
                          <h6>
                            <i className="bi bi-building"></i>
                            <span className="fw-semibold ms-2 fs-6">
                              Company
                            </span>
                          </h6>
                        </div>
                        <div className="col mt-3">
                          <div className="mb-1">
                            <input
                              type="text"
                              name=""
                              id=""
                              className="form-control"
                              placeholder="Company Name"
                              style={{ fontSize: "0.85rem" }}
                            />
                          </div>
                          <div className="mb-1">
                            <input
                              type="text"
                              name=""
                              id=""
                              className="form-control"
                              placeholder="Company Website"
                              style={{ fontSize: "0.85rem" }}
                            />
                          </div>
                          <div className="mb-1">
                            <input
                              type="text"
                              name=""
                              id=""
                              className="form-control"
                              placeholder="Telephone"
                              style={{ fontSize: "0.85rem" }}
                            />
                          </div>
                          <div className="mb-1">
                            <input
                              type="text"
                              name=""
                              id=""
                              className="form-control"
                              placeholder="Address"
                              style={{ fontSize: "0.85rem" }}
                            />
                          </div>
                          <div className="mb-1">
                            <input
                              type="text"
                              name=""
                              id=""
                              className="form-control"
                              placeholder="City"
                              style={{ fontSize: "0.85rem" }}
                            />
                          </div>
                          <div className="mb-1">
                            <select
                              name=""
                              id=""
                              className="form-select"
                              placeholder="Company type"
                              style={{ fontSize: "0.85rem" }}
                            >
                              <option disabled selected>
                                Company Type
                              </option>
                              <option value="">faskes</option>
                              <option value="">Badan</option>
                            </select>
                          </div>
                          <div className="mb-1">
                            <select
                              name="source"
                              id=""
                              className="form-select"
                              style={{ fontSize: "0.85rem" }}
                            >
                              <option disabled selected>
                                Source
                              </option>
                              <option value="event">Event</option>
                              <option value="referal">Referal</option>
                              <option value="database">Database</option>
                              <option value="others">Others</option>
                            </select>
                          </div>
                          <div className="mb-1">
                            <label htmlFor="date">Created</label>
                            <input
                              type="date"
                              name="date"
                              className="form-control"
                              style={{ fontSize: "0.85rem" }}
                            />
                          </div>
                          {/* <div className="mb-1">
                            <input
                              type="text"
                              className="form-control"
                              name="notes"
                              placeholder="Notes"
                              style={{ fontSize: "0.85rem" }}
                            />
                          </div> */}
                          <div className="mb-1">
                            <select
                              name="source"
                              id=""
                              className="form-select"
                              style={{ fontSize: "0.85rem" }}
                            >
                              <option disabled selected>
                                Parent Company
                              </option>
                              <option value="">1</option>
                              <option value="">2</option>
                            </select>
                          </div>
                          <div className="mb-1">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Number Of Patiens"
                              style={{ fontSize: "0.85rem" }}
                            />
                          </div>
                        </div>
                        <button
                          className="btn btn-primary mt-2"
                          style={{ fontSize: "0.85rem" }}
                        >
                          Apply
                        </button>
                        <button
                          className="btn btn-secondary mt-2 ms-2"
                          style={{ fontSize: "0.85rem" }}
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className={`${datatableClass}`} id="datatable-content">
                  <OverlayTrigger placement="top" overlay={showTooltip}>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={toggleSideBarCard}
                      style={{ fontSize: "0.85rem" }}
                    >
                      <i className={iconFilter}></i>
                    </button>
                  </OverlayTrigger>
                  <div className="col-md-4 ms-5 mt-5 float-end">
                    <div className="input-group search-users">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          style={{
                            borderEndEndRadius: 0,
                            borderStartEndRadius: 0,
                          }}
                        >
                          <i className="bi bi-search"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleSearch}
                        placeholder="search company"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>
                  <DataTable
                    columns={columns}
                    data={search}
                    defaultSortFieldId={1}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    selectableRows
                    onSelectedRowsChange={selectUid}
                  />
                </div>
              </div>
              <DeleteCompany
                onClose={handleDeleteCompany}
                visible={deleteCompany !== false}
                uid={deleteCompany}
              />
            </Card>
          </div>
          <Footer />
        </Main>
      </body>
    </>
  );
};

export default Company;
