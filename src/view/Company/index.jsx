import React, { useState } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Card from "../../components/Card";
import Footer from "../../components/Template/Footer";
import DataTable from "react-data-table-component";

const Company = () => {
  const [isSideBar, setIsSideBar] = useState(false);
  const toggleSideBarCard = () => {
    setIsSideBar(!isSideBar);
  };
  const filterClass = isSideBar ? "col-md-3 d-block" : "col-sm-0 d-none";
  const datatableClass = isSideBar ? "col-md-9" : "col-sm-12";
  const showTooltip = isSideBar ? (
    <Tooltip id="tooltip">Close Filter</Tooltip>
  ) : (
    <Tooltip id="tooltip">Show Filter</Tooltip>
  );
  const iconFilter = isSideBar ? "bi bi-x-lg" : "bi bi-funnel";
  //   console.log(isSideBar);

  const columns = [
    {
      name: "Company Name",
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
                      <a class="dropdown-item" href="#">
                        Single Company
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
                <a href="#" class="btn btn-outline-primary ms-2 bulk-change">
                  Bulk Change
                </a>
                <button class="btn btn-danger ms-2 delete">Delete</button>
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
                        <div className="col mt-5">
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
                        </div>
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
                        placeholder="search company"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>
                  <DataTable pagination selectableRows />
                </div>
              </div>
            </Card>
          </div>
          <Footer />
        </Main>
      </body>
    </>
  );
};

export default Company;
