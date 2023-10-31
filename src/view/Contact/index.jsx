import React, { useEffect, useState } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Footer from "../../components/Template/Footer";
import Main from "../../components/Template/Main";
import DataTable from "react-data-table-component";
import dumyData from "./Dummy/index";
import Card from "../../components/Card";
import IconImage from "../../assets/img/person.png";
import "../Contact/style.css";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import DeleteContact from "./Modals/deleteContact";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Contact = () => {
  const token = localStorage.getItem("token");
  const [isSidebarToggleCard, setSidebarToggled] = useState(false);
  const [selectUid, setSelectedUid] = useState([]);

  const toggleSidebarCard = () => {
    setSidebarToggled(!isSidebarToggleCard);
  };

  const filterClass = isSidebarToggleCard
    ? "col-md-3 d-block"
    : "col-sm-0 d-none";

  const datatableClass = isSidebarToggleCard ? "col-md-9" : "col-sm-12";

  const IconFilter = isSidebarToggleCard ? "bi bi-x-lg" : "bi bi-funnel";

  const showTooltip = isSidebarToggleCard ? (
    <Tooltip id="tooltip">Close Filter</Tooltip>
  ) : (
    <Tooltip id="tooltip">Show Filter</Tooltip>
  );

  const [deleteContact, setDeleteContact] = useState(false);
  const handleDeleteContact = () => setDeleteContact(false);
  // console.log(deleteContact);
  const [contact, setContact] = useState([]);
  const [search, setSearch] = useState(contact);
  const navigate = useNavigate();
  const TokenAuth = localStorage.getItem("token");

  const getContactAll = (url, token, state) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        state(res.data.data);
        setSearch(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  // console.log(contact);
  useEffect(() => {
    getContactAll("contacts", TokenAuth, setContact);
  }, [TokenAuth]);

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <div className="image-name">
          <div className="d-flex align-items-center">
            <img src={IconImage} className="rounded-circle" />
            <div className="mt-3">
              <span className="fw-semibold">{row.name}</span>
              <p
                className="mt-1"
                style={{
                  fontSize: "11px",
                }}
              >
                {row.position}
              </p>
            </div>
          </div>
        </div>
      ),
      left: true,
      width: "150px",
    },
    {
      name: "Contact Info",
      selector: (row) => row?.phone?.[0]?.number,
      sortable: true,
    },
    {
      name: "Associated With",
      sortable: true,
      width: "150px",
    },
    {
      name: "Created/Updated",
      selector: (row) => {
        const createdAt = new Date(row.created_at);
        const updatedAt = new Date(row.updated_at);
        const formatOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        const formatter = new Intl.DateTimeFormat("en-US", formatOptions);
        const createdDateTime = formatter.format(createdAt);
        const updatedDateTime = formatter.format(updatedAt);

        return (
          <div className="mt-2">
            <p className="mt-1">{createdDateTime}</p>
            <p style={{ marginTop: "-12px" }}>{updatedDateTime}</p>
          </div>
        );
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Owner",
      selector: (row) => (
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id={`tooltip-${row?.owner?.name}`}>
              {row?.owner?.name}
            </Tooltip>
          }
        >
          <div className="image-name">
            <img
              src={IconImage}
              className="rounded-circle"
              data-tip={row.name}
            />
          </div>
        </OverlayTrigger>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <button
            onClick={() => navigate(`/contact/${row.uid}/edit`)}
            className="ms-2 icon-button"
            title="edit"
          >
            <i className="bi bi-pen edit"></i>
          </button>
          <button
            className="ms-2 icon-button"
            title="delete"
            onClick={() => setDeleteContact(row.uid)}
          >
            <i className="bi bi-trash-fill danger"></i>
          </button>
        </div>
      ),
      width: "150px",
    },
  ];
  // console.log(contact);

  function handleFilter(event) {
    const newData = contact.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setSearch(newData);
  }
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  const selectUidDataTable = (state) => {
    const select = state.selectedRows.map((row) => row.uid);
    setSelectedUid(select);
  };

  const handleDeleteSelected = async (e) => {
    e.preventDefault();
    const isResult = await Swal.fire({
      title: "Apakah Anda Yakin",
      text: "Anda tidak dapat mengembalikan data ini setelah menghapusnya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });
    if (isResult.isConfirmed) {
      try {
        const formData = new FormData();
        for (const uid of selectUid) {
          formData.append("contact_uid[]", uid);
        }
        const deleteForSelect = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/contacts/delete/item`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire({
          title: deleteForSelect.data.message,
          text: "Successfully delete contact",
          icon: "success",
        });
        window.location.reload();
      } catch (error) {
        if (error.response.data.message === "Unauthenticated.") {
          Swal.fire({
            title: error.response.data.message,
            text: "Tolong Login Kembali",
            icon: "warning",
          });
          localStorage.clear();
          window.location.href = "/login";
        }
        if (error.message) {
          Swal.fire({
            text: error.response.data.message,
            icon: "warning",
          });
        }
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
                <h1>Contact</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <Link to="/" className="text-decoration-none">
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item active fw-bold">Contact</li>
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
                  Add Contact
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to="/single-contact">
                      Single Contact
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/contact/upload-file">
                      Upload File
                    </Link>
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
                    <a class="dropdown-item" href="#">
                      Donwload Selected
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Donwload All
                    </a>
                  </li>
                </ul>
              </div>
              <Link
                to="/contact/bulk-change"
                class="btn btn-outline-primary ms-2 bulk-change"
              >
                Bulk Change
              </Link>
              <button
                class="btn btn-danger ms-2 delete"
                onClick={handleDeleteSelected}
              >
                Delete
              </button>
            </div>
          </div>

          <Card className="shadow">
            <div className="row">
              <div className={` ${filterClass}`} id="filter">
                <div className="container">
                  <div className="row mt-3">
                    <div className="col">
                      <h6>
                        <i class="bi bi-funnel ml"></i>
                        <span className="fw-semibold ms-2">Filter</span>
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
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
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <select
                        name=""
                        id=""
                        className="form-select"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <option disabled selected>
                          Owner
                        </option>
                        <option value="">Person 1</option>
                        <option value="">Person 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <select
                        name=""
                        id=""
                        className="form-select"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <option disabled selected>
                          Team
                        </option>
                        <option value="">Team 1</option>
                        <option value="">Team 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col">
                      <h6>
                        <i class="bi bi-link-45deg"></i>
                        <span className="fw-semibold ms-2">Associated</span>
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <select
                        name=""
                        id=""
                        className="form-select"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <option value="">Select Company</option>
                        <option value="">Company 1</option>
                        <option value="">Company 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <select
                        name=""
                        id=""
                        className="form-select"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <option disabled selected>
                          Select Deals
                        </option>
                        <option value="">Deals 1</option>
                        <option value="">Deals 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col">
                      <h6>
                        <i class="bi bi-person-circle"></i>
                        <span className="fw-semibold ms-2">Contacts</span>
                      </h6>
                    </div>
                  </div>
                  <form action="">
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="name"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div className="mb-1">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="email"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        name="job_title"
                        placeholder="Job Title"
                        style={{ fontSize: "0.85rem" }}
                      />
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
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Address"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        placeholder="City"
                        style={{ fontSize: "0.85rem" }}
                      />
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
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        name="notes"
                        placeholder="Notes"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        name="remarks"
                        placeholder="Remarks (Other Source)"
                        style={{ fontSize: "0.85rem" }}
                      />
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
              <div className={` ${datatableClass}`} id="datatable-content">
                <OverlayTrigger placement="top" overlay={showTooltip}>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={toggleSidebarCard}
                    style={{
                      fontSize: "0.85rem",
                    }}
                  >
                    <i className={`${IconFilter}`}></i>
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
                      placeholder="search name..."
                      onChange={handleFilter}
                      className="form-control search"
                      style={{
                        fontSize: "0.85rem",
                      }}
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
                  onSelectedRowsChange={selectUidDataTable}
                />
              </div>
            </div>
            <DeleteContact
              onClose={handleDeleteContact}
              visible={deleteContact !== false}
              uid={deleteContact}
            />
          </Card>
          <Footer />
        </div>
      </Main>
    </body>
  );
};

export default Contact;
