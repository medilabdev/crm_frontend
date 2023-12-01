import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import DataTable from "react-data-table-component";

const UserAccessMenu = () => {
  const token = localStorage.getItem("token");
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState([]);
  const navigate = useNavigate()

  const getAccessMenu = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setRoles(data);
        setSearch(data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  function handleFilter(e) {
    const newData = roles.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(newData);
  }

  useEffect(() => {
    getAccessMenu(token);
  }, [token]);

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };
  
  const customStyles = {
    headRow: {
      style: {
        background: "rgba(66, 125, 157, 0.9)",
        color: "white",
        fontWeight: "600",
        marginTop: "12px",
        borderRadius: "5px",
      },
    },
    cells: {
      style: {
        fontWeight: "500",
      },
    },
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            title="Detail Access"
            className="icon-button"
            onClick={() => navigate(`/access-menu/${row.uid}/detail`)}
          >
            <i className="bi bi-arrow-right-circle-fill"></i>
          </button>
        </div>
      ),
      sortable: true,
    },
  ];
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Properties</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <Link to="/" className="text-decoration-none">
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item active fw-bold">
                      Properties
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <Card className="shadow">
              <div className="container">
                <div className="row">
                  <div className="col-md-3 p-2">
                  <div className="d-flex flex-column border rounded shadow mt-4">
                      <Link
                        to="/properties"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-people-fill mt-2 ms-2" style={{ fontSize:"1.3rem" }}></i>
                          <p className="ms-3" style={{ fontSize:"0.95rem", marginTop:"10px" }}>Teams</p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/position"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-diagram-3 mt-2 ms-2" style={{ fontSize:"1.3rem"  }}></i>
                          <p className="ms-3" style={{ fontSize:"0.95rem", marginTop:"10px", fontWeight:"500" }}>Position</p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/roles" 
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-person-badge-fill mt-2 ms-2" style={{ fontSize:"1.3rem" }}></i>
                          <p className="ms-3" style={{ fontSize:"0.95rem", marginTop:"10px", fontWeight:"500"  }} >Roles</p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/source"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-building-fill-up mt-2 ms-2" style={{ fontSize:"1.3rem" }}></i>
                          <p className="ms-3" style={{ fontSize:"0.95rem", marginTop:"10px", fontWeight:"500"  }}>Source</p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/company-type"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-buildings mt-2 ms-2" style={{ fontSize:"1.3rem" }}></i>
                          <p className="ms-3" style={{ fontSize:"0.95rem", marginTop:"10px", fontWeight:"500" }}>Company Type</p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/deal-stage"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-coin mt-2 ms-2" style={{ fontSize:"1.3rem" }}></i>
                          <p className="ms-3" style={{ fontSize:"0.95rem", marginTop:"10px", fontWeight:"500" }}>Deal Stage</p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/category-expanse"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group ">
                          <i class="bi bi-c-circle mt-2 ms-2" style={{ fontSize:"1.3rem" }}></i>
                          <p className="ms-3" style={{ fontSize:"0.95rem", marginTop:"10px", fontWeight:"500" }}>Category Expense</p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/menu-management"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-menu-button-wide-fill mt-2 ms-2" style={{ fontSize:"1.3rem" }}></i>
                          <p className="ms-3" style={{ fontSize:"0.95rem", marginTop:"10px", fontWeight:"500" }}>Menu Management</p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/user-access-menu"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group active-side">
                          <i class="bi bi-menu-button-fill mt-2 ms-2" style={{ fontSize:"1.3rem" }}></i>
                          <p className="ms-3"style={{ fontSize:"0.95rem", marginTop:"10px", fontWeight:"500" }}>User Access Menu</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="float-end col-5 me-3">
                      <div className="input-group mt-5">
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
                          placeholder="Search UserAccessMenu..."
                          className="form-control"
                          onChange={handleFilter}
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                    </div>
                    <div className="p-2">
                      <DataTable
                        className="mt-2"
                        data={search}
                        columns={columns}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Main>
    </body>
  );
};

export default UserAccessMenu;
