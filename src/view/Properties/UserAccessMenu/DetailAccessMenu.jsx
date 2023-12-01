import React, { useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Link, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import AddOverlay from "./addOverlay";

const DetailAccessMenu = () => {
  const token = localStorage.getItem("token");
  const [detail, setDetail] = useState([]);
  const [search, setSearch] = useState([]);
  const uid = useParams();
  const [addDetail, setAddDetail] = useState(false);
  const handleOpenAdd = () => setAddDetail(true);
  const handleCloseAdd = () => setAddDetail(false);

  const getDetailAccess = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/user-access-menus/role/${uid.uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const detailData = res.data.data;
        setDetail(detailData);
        setSearch(detailData);
      })
      .catch((err) => {
        if (err.response?.data?.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const handleDelete = (uidDelete) => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah kamu yakin ingin menghapus ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(
            `${process.env.REACT_APP_BACKEND_URL}/user-access-menus/${uidDelete}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            Swal.fire({
              title: res.data.message,
              text: "Successfully Delete item",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            });
          })
          .catch((err) => {
            if (err.response.data.message === "Delete failed!") {
              Swal.fire({
                title: "Delete Failed",
                text: "Tidak dapat menghapus, data master ini terkait dengan data lainnya",
                icon: "warning",
              });
            }
          });
      }
    });
  };
  const columns = [
    {
      name: "Access Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Menu",
      selector: (row) => row.menu?.name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            className="icon-button"
            title="Delete"
            onClick={() => handleDelete(row.uid)}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      ),
    },
  ];
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
    getDetailAccess();
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
                          <i
                            class="bi bi-people-fill mt-2 ms-2"
                            style={{ fontSize: "1.3rem" }}
                          ></i>
                          <p
                            className="ms-3"
                            style={{ fontSize: "0.95rem", marginTop: "10px" }}
                          >
                            Teams
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/position"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i
                            class="bi bi-diagram-3 mt-2 ms-2"
                            style={{ fontSize: "1.3rem" }}
                          ></i>
                          <p
                            className="ms-3"
                            style={{
                              fontSize: "0.95rem",
                              marginTop: "10px",
                              fontWeight: "500",
                            }}
                          >
                            Position
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/roles"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i
                            class="bi bi-person-badge-fill mt-2 ms-2"
                            style={{ fontSize: "1.3rem" }}
                          ></i>
                          <p
                            className="ms-3"
                            style={{
                              fontSize: "0.95rem",
                              marginTop: "10px",
                              fontWeight: "500",
                            }}
                          >
                            Roles
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/source"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i
                            class="bi bi-building-fill-up mt-2 ms-2"
                            style={{ fontSize: "1.3rem" }}
                          ></i>
                          <p
                            className="ms-3"
                            style={{
                              fontSize: "0.95rem",
                              marginTop: "10px",
                              fontWeight: "500",
                            }}
                          >
                            Source
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/company-type"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i
                            class="bi bi-buildings mt-2 ms-2"
                            style={{ fontSize: "1.3rem" }}
                          ></i>
                          <p
                            className="ms-3"
                            style={{
                              fontSize: "0.95rem",
                              marginTop: "10px",
                              fontWeight: "500",
                            }}
                          >
                            Company Type
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/deal-stage"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i
                            class="bi bi-coin mt-2 ms-2"
                            style={{ fontSize: "1.3rem" }}
                          ></i>
                          <p
                            className="ms-3"
                            style={{
                              fontSize: "0.95rem",
                              marginTop: "10px",
                              fontWeight: "500",
                            }}
                          >
                            Deal Stage
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/category-expanse"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group ">
                          <i
                            class="bi bi-c-circle mt-2 ms-2"
                            style={{ fontSize: "1.3rem" }}
                          ></i>
                          <p
                            className="ms-3"
                            style={{
                              fontSize: "0.95rem",
                              marginTop: "10px",
                              fontWeight: "500",
                            }}
                          >
                            Category Expense
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/menu-management"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i
                            class="bi bi-menu-button-wide-fill mt-2 ms-2"
                            style={{ fontSize: "1.3rem" }}
                          ></i>
                          <p
                            className="ms-3"
                            style={{
                              fontSize: "0.95rem",
                              marginTop: "10px",
                              fontWeight: "500",
                            }}
                          >
                            Menu Management
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/properties/user-access-menu"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group active-side">
                          <i
                            class="bi bi-menu-button-fill mt-2 ms-2"
                            style={{ fontSize: "1.3rem" }}
                          ></i>
                          <p
                            className="ms-3"
                            style={{
                              fontSize: "0.95rem",
                              marginTop: "10px",
                              fontWeight: "500",
                            }}
                          >
                            User Access Menu
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div>
                      <button
                        className="btn btn-primary mt-5 ms-4"
                        style={{ fontSize: "0.85rem" }}
                        onClick={handleOpenAdd}
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
                      <AddOverlay
                        visible={addDetail}
                        onClose={handleCloseAdd}
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
