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

const Contact = () => {
  // const [isSidebarToggleCard, setSidebarToggled] = useState(false);

  // useEffect(() => {
  //   const toggleSideCard = document.querySelector(".toggle-sidebar-card");
  //   const body = document.getElementById("filter");
  //   const bodyDatatable = document.getElementById("datatable-content");

  //   const toggleSidebarCard = () => {
  //     setSidebarToggled(!isSidebarToggleCard);
  //     if (!isSidebarToggleCard) {
  //       body.classList = "col-md-5";
  //       bodyDatatable.classList = "col-md-7";
  //     } else {
  //       body.classList = "col-sm-0";
  //       bodyDatatable.classList = "col-sm-12";
  //     }
  //   };
  //   console.log(isSidebarToggleCard);
  //   if (toggleSideCard) {
  //     toggleSideCard.addEventListener("click", toggleSidebarCard);
  //   }

  //   return () => {
  //     if (toggleSideCard) {
  //       toggleSideCard.removeEventListener("click", toggleSidebarCard);
  //     }
  //   };
  // }, [isSidebarToggleCard]);
  const [isSidebarToggleCard, setSidebarToggled] = useState(false);

  const toggleSidebarCard = () => {
    setSidebarToggled(!isSidebarToggleCard);
  };
  const filterClass = isSidebarToggleCard ? "col-md-3" : "col-sm-0";
  const datatableClass = isSidebarToggleCard ? "col-md-9" : "col-sm-12";

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
      width: "200px",
    },
    {
      name: "Contact Info",
      selector: (row) => row.contact,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Created/Updated",
      selector: (row) => (
        <div>
          <span className="fw-normal">{row.created_at}</span>
          <p className="fw-normal">{row.updated_at}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Owner",
      selector: (row) => (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-${row.name}`}>{row.name}</Tooltip>}
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
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <button
            onClick={() => row.id}
            className="ms-2 icon-button"
            title="edit"
          >
            <i className="bi bi-pen edit"></i>
          </button>
          <button className="ms-2 icon-button" title="delete">
            <i className="bi bi-trash-fill danger"></i>
          </button>
        </div>
      ),
      width: "150px",
    },
  ];

  const [records, setRecords] = useState(dumyData);
  function handleFilter(event) {
    const newData = dumyData.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
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
                      <a href="/" className="text-decoration-none">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item active fw-bold">Contact</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="d-flex m-2">
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
                    <a class="dropdown-item" href="#">
                      Single Contact
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
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
                    <a class="dropdown-item" href="#">
                      Donwload Selected
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Donwload Selected With Detail
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Donwload All
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Donwload All With Detail
                    </a>
                  </li>
                </ul>
              </div>
              <button class="btn btn-outline-primary ms-2 bulk-change">
                Bulk Change
              </button>
              <button class="btn btn-danger ms-2 delete">Delete</button>
            </div>
          </div>

          <Card>
            <Row>
              <div className="row">
                <div className={` ${filterClass}`} id="filter"></div>
                <div className={` ${datatableClass}`} id="datatable-content">
                  <button
                    className="btn btn-primary mt-3 toggle-sidebar-card"
                    onClick={toggleSidebarCard}
                  >
                    <i className="bi bi-funnel"></i>
                  </button>
                  <div className="input-group search-users col-4">
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
                    />
                  </div>
                  <DataTable
                    columns={columns}
                    data={records}
                    defaultSortFieldId={1}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    selectableRows
                  />
                </div>
              </div>
              {/* <div className="col-sm-0" id="filter">
                jasd
              </div>
              <div className="col-md-12" id="datatable-content">
                <button className="btn btn-primary mt-3 ">
                  <i class="bi bi-funnel toggle-sidebar-card"></i>
                </button>
                <div className="input-group search-users col-4">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      style={{ borderEndEndRadius: 0, borderStartEndRadius: 0 }}
                    >
                      <i className="bi bi-search"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="search name..."
                    onChange={handleFilter}
                    className="form-control search"
                  />
                </div>

                <DataTable
                  columns={columns}
                  data={records}
                  defaultSortFieldId={1}
                  pagination
                  paginationComponentOptions={paginationComponentOptions}
                  selectableRows
                />
              </div> */}
            </Row>
          </Card>
          <Footer />
        </div>
      </Main>
    </body>
  );
};

export default Contact;
