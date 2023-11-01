import React from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useState } from "react";
const Deals = () => {
  const token = localStorage.getItem("token");
  const [isSideFilter, setIsSideFilter] = useState(false);

  const toggleSideFilter = () => {
    setIsSideFilter(!isSideFilter);
  };

  const filterClass = isSideFilter ? "col-md-3 d-block" : "col-md-0 d-none";
  const boardKanban = isSideFilter ? "col-md-9" : "col-md-12";
  const IconFilter = isSideFilter ? "bi bi-x-lg" : "bi bi-funnel";
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Deals</h1>
              <nav>
                <ol className="breadcrumb mt-2">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none">
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Deals</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col mb-2">
            <div className="d-flex float-end">
              <div className="dropdown button-flex">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Add Deals
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="">
                      Single Deals
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="">
                      Upload Deal
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="">
                      Upload Product
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown button-flex">
                <button
                  className="btn btn-outline-primary dropdown-toggle ms-2"
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
              <button
                className="btn btn-outline-primary ms-2"
                style={{ fontSize: "0.85rem" }}
              >
                Need Approval
              </button>
              <button
                className="btn btn-outline-primary ms-2"
                style={{ fontSize: "0.85rem" }}
              >
                Bulk Change
              </button>
              <button
                className="btn btn-outline-danger ms-2"
                style={{ fontSize: "0.85rem" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <Card className="shadow">
          <div className="row">
            <div id="filter" className={`${filterClass}`}>
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
                <div className="row">
                  <div className="col">
                    <select
                      name=""
                      id=""
                      className="form-select"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <option value="">Team</option>
                      <option value="">1</option>
                      <option value="">2</option>
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
                      <option value="">Stage</option>
                      <option value="">1</option>
                      <option value="">2</option>
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
                      <option value="">Status</option>
                      <option value="">1</option>
                      <option value="">2</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col">
                    <h6>
                      <i class="bi bi-currency-dollar"></i>
                      <span className="fw-semibold ms-2">Deals</span>
                    </h6>
                  </div>
                </div>
                <form action="">
                  <div className="mb-1">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Deals Name"
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                  <div className="mb-1">
                    <select
                      name=""
                      id=""
                      className="form-select"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <option value="">Source</option>
                      <option value="">1</option>
                      <option value="">2</option>
                    </select>
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
            <div className={`${boardKanban}`}>
              <button
                className="btn btn-primary mt-3"
                onClick={toggleSideFilter}
                style={{ fontSize: "0.85rem" }}
              >
                <i className={`${IconFilter}`}></i>
              </button>
            </div>
          </div>
        </Card>
      </Main>
    </body>
  );
};

export default Deals;
