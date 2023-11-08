import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import OverlayAdd from "./OverlayAdd";
import OverlayEdit from "./OverlayEdit";

const Roles = () => {
  const token = localStorage.getItem("token");
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState([]);
  const [addRoles, setAddRoles] = useState(false);
  const handleCloseAdd = () => setAddRoles(false);
  const handleOpenAdd = () => setAddRoles(true);
  const [editRoles, setEditRoles] = useState(false);
  const handleCloseEdit = () => {
    setEditRoles(false);
  };
  const getRoles = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRoles(res.data.data);
        setSearch(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  useEffect(() => {
    getRoles(token);
  }, [token]);
  const handleFilter = (e) => {
    const newData = roles.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(newData);
  };
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };
  const columns = [
    {
      id: 1,
      name: "Name Roles",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      id: 2,
      name: "Action",
      selector: (row) => (
        <div>
          <button
            title="Edit"
            className="icon-button"
            onClick={() => setEditRoles(row.uid)}
          >
            <i className="bi bi-pen"></i>
          </button>
          <button
            title="Delete"
            className="icon-button"
            onClick={() => {
              Swal.fire({
                title: "Konfirmasi",
                text: "Apakah kamy yakin ingin menghapus positions ini?",
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
                      `${process.env.REACT_APP_BACKEND_URL}/roles/${row.uid}`,
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    )
                    .then((res) => {
                      Swal.fire({
                        title: res.data.message,
                        text: "Successfully delete roles",
                        icon: "success",
                      }).then((res) => {
                        if (res.isConfirmed) {
                          window.location.reload();
                        }
                      });
                    });
                } else {
                  Swal.fire({
                    title: "Cancelled",
                    text: "The item was not deleted.",
                    icon: "error",
                  });
                }
              });
            }}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      ),
    },
  ];
  const customStyle = {
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
                  <div className="col-md-3 p-2 border-end">
                    <div className="d-flex flex-column border rounded shadow mt-4">
                      <Link
                        to="/properties"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group ">
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
                        <div className="input-group active-side">
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
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div>
                      <button
                        className="btn btn-primary mt-5 ms-4"
                        style={{ fontSize: "0.85rem" }}
                        onClick={handleOpenAdd}
                      >
                        Add Roles
                      </button>
                      <button
                        className="btn btn-danger mt-5 ms-4"
                        style={{ fontSize: "0.85rem" }}
                        // onClick={handleSubmitDeleteSelect}
                      >
                        Delete Roles
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
                          placeholder="Search Roles..."
                          className="form-control"
                          onChange={handleFilter}
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                    </div>
                    <div className="p-2">
                      <DataTable
                        pagination
                        columns={columns}
                        data={search}
                        customStyles={customStyle}
                        paginationComponentOptions={paginationComponentOptions}
                      />
                      <OverlayAdd visible={addRoles} onClose={handleCloseAdd} />
                      <OverlayEdit
                        visible={editRoles !== false}
                        onClose={handleCloseEdit}
                        uid={editRoles}
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

export default Roles;
