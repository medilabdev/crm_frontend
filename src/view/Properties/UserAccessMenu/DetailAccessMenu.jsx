import React, { useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Link, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect } from "react";

const DetailAccessMenu = () => {
  const token = localStorage.getItem("token");
  const [detail, setDetail] = useState([]);
  const [search, setSearch] = useState([]);
  const uid = useParams();
  const getDetailAccess = (token, uid) => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/user-access-menus/role/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const detailData = res.data.data;
        console.log(detailData);
        setDetail(detailData);
        setSearch(detailData);
      });
  };

  const columns = [{}];
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
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  function handleFilter(e) {
    const DataFilter = detail.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(DataFilter);
  }
  useEffect(() => {
    getDetailAccess(token, uid);
  }, [token, uid]);
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Detail Access Menu</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <Link to="/" className="text-decoration-none">
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link
                        to="/properties/user-access-menu"
                        className="text-decoration-none"
                      >
                        Properties
                      </Link>
                    </li>
                    <li className="breadcrumb-item active fw-bold">
                      Detail Access Menu
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
                          <i class="bi bi-people-fill fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">Teams</h5>
                        </div>
                      </Link>
                      <Link
                        to="/properties/position"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-diagram-3 fs-4 ms-2 "></i>
                          <h5 className="mt-2 ms-2">Position</h5>
                        </div>
                      </Link>
                      <Link
                        to="/properties/roles"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-person-badge-fill fs-4 ms-2 "></i>
                          <h5 className="mt-2 ms-2">Roles</h5>
                        </div>
                      </Link>
                      <Link
                        to="/properties/source"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-building-fill-up fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">Source</h5>
                        </div>
                      </Link>
                      <Link
                        to="/properties/company-type"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-buildings fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">Company Type</h5>
                        </div>
                      </Link>
                      <Link
                        to="/properties/deal-stage"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-coin fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">Deal Stage</h5>
                        </div>
                      </Link>
                      <Link
                        to="/properties/category-expanse"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group ">
                          <i class="bi bi-c-circle fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">Category Expense</h5>
                        </div>
                      </Link>
                      <Link
                        to="/properties/menu-management"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-c-circle fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">Menu Management</h5>
                        </div>
                      </Link>
                      <Link
                        to="/properties/user-access-menu"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group active-side">
                          <i class="bi bi-c-circle fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">User Access Menu</h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div>
                      <button
                        className="btn btn-primary mt-5 ms-4"
                        style={{ fontSize: "0.85rem" }}
                        // onClick={handleOpenAdd}
                      >
                        Add Access
                      </button>
                    </div>
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
                          placeholder="Search.."
                          className="form-control"
                          onChange={handleFilter}
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                    </div>
                    <div className="p-2">
                      <DataTable
                        className="mt-2"
                        pagination
                        customStyles={customStyles}
                        paginationComponentOptions={paginationComponentOptions}
                        data={search}
                        columns={columns}
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

export default DetailAccessMenu;
