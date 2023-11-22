import React, { useEffect } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useState } from "react";
import Dummy from "./Dummy";
import DataTableComponet from "./Datatable";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";

const Deals = () => {
  const token = localStorage.getItem("token");
  const [isSideFilter, setIsSideFilter] = useState(false);
  const [search, setSearch] = useState([]);
  const [selectUid, setSelectUid] = useState([]);
  const [owner, setOwner] = useState([]);
  const [deals, setDataDeals] = useState([]);
  const [searchMultiple, setSearchMultiple] = useState([]);
  const [stage, setStage] = useState([])
  const [searchOwner, setSearchOwner] = useState([])
  const [searcStage, setSearchStage] = useState([])
  const getStage = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/staging-masters`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res) => setStage(res.data.data))
    .catch((err) => {
      if (err.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
    });
  }
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
  const selectUidDataTable = (e) => {
    const select = e.selectedRows.map((row) => row.uid);
    setSelectUid(select);
  };

  const getDeals = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataDeals(res.data.data);
        setSearch(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const handleDeleteSelect = async (e) => {
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
        selectUid.map((data, indek) => {
          formData.append(`deals_uid[${indek}]`, data);
        });

        for (const pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/deals/item/delete`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            Swal.fire({
              title: res.data.message,
              text: "Successfully deleted",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            });
          });
      } catch (err) {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
        if (err.message) {
          Swal.fire({
            text: err.response.data.message,
            icon: "warning",
          });
        }
      }
    }
  };
  const toggleSideFilter = () => {
    setIsSideFilter(!isSideFilter);
  };
  const filterClass = isSideFilter
    ? "col-md-3 d-block border-end"
    : "col-md-0 d-none";
  const boardKanbanDatatable = isSideFilter ? "col-md-9" : "col-md-12";
  const IconFilter = isSideFilter ? "bi bi-x-lg" : "bi bi-funnel";

  function handleSearchDatatable(e) {
    const newData = deals.filter((row) => {
      return row.deal_name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(newData);
  }

  const selectOwner = () => {
    const result = [];
    owner?.map((data) => {
      const ownRes = {
        value: data.uid,
        label: data.name,
      };
      result.push(ownRes);
    });
    return result;
  };
  const selectStage = () => {
    const res = [];
    stage?.map((data) => {
      const resThem = {
        value: data.uid,
        label: data.name
      }
      res.push(resThem)
    })
    return res
  }
  console.log(stage);
    useEffect(() => {
    getOwnerUser(token);
    getDeals(token);
    getStage(token)
  }, [token]);

  const uid = localStorage.getItem("uid");
  const handleDealsMyOrPerson = (e) => {
    const target = e.target.value;
    let filter = [];
    if (target === "all") {
      setSearch(deals);
    } else {
      filter = deals.filter((row) => row.owner_user_uid === uid);
      setSearch(filter);
    }
  };
  const handleSelectOwner = (e) => {
    setSearchOwner(e.map((data) => data.value))
  }
  const handleSelectStage = (e) => {
    setSearchStage(e.map((data) => data.value))
  }
  const handleSearchMultiple = (e) => {
    setSearchMultiple({
      ...searchMultiple,
      [e.target.name]: e.target.value,
    });
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
                    <Link className="dropdown-item" to="/deals/single-deals">
                      Single Deal
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item text-decoration-none" href="/deals/upload-deals">
                      Upload Deals
                    </a>
                  </li>
                  {/* <li>
                    <Link className="dropdown-item" to="">
                      Upload Product
                    </Link>
                  </li> */}
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
              <Link
                to="/deals/need-approval"
                className="btn btn-outline-primary ms-2"
                style={{ fontSize: "0.85rem" }}
              >
                Need Approval
              </Link>
              <Link
                to="/deals/bulk-change"
                className="btn btn-outline-primary ms-2 text-decoration-none"
                style={{ fontSize: "0.85rem" }}
              >
                Bulk Change
              </Link>
              <button
                onClick={handleDeleteSelect}
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
                      name="select"
                      id=""
                      className="form-select"
                      style={{ fontSize: "0.85rem" }}
                      onChange={handleDealsMyOrPerson}
                    >
                      <option value="all">All Contact</option>
                      <option value="my">My Contact</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col mb-2">
                    <Select
                      options={selectOwner()}
                      isMulti
                      onChange={(value)=> handleSelectOwner(value)}
                      placeholder="Select Owner"
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col">
                    <Select options={selectStage()} onChange={(e) =>handleSelectStage(e)} isMulti placeholder="Select Stage" />
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
                  <Link
                    to="/deals"
                    className="btn btn-secondary mt-2 ms-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Cancel
                  </Link>
                </form>
              </div>
            </div>
            <div className={`${boardKanbanDatatable}`}>
              <div className="row">
                <div className="col d-flex">
                  <button
                    className="btn btn-primary mt-3"
                    onClick={toggleSideFilter}
                    style={{ fontSize: "0.85rem" }}
                  >
                    <i className={`${IconFilter}`}></i>
                  </button>
                  <div
                    className="input-group mt-3 ms-3"
                    style={{ width: "20rem" }}
                  >
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
                      placeholder="Search"
                      onChange={handleSearchDatatable}
                      className="form-control"
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                  {/* <div className="mt-3 ms-3">
                    <select
                      name=""
                      id=""
                      className="form-select"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <opti              on value="">Select Sales</opti>
                      <option value="">Sales Pipeline</option>
                    </select>
                  </div> */}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <DataTableComponet
                    data={search}
                    selectUidDataTable={selectUidDataTable}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Main>
    </body>
  );
};

export default Deals;
