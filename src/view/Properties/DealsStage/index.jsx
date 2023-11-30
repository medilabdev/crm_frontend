import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import OverlayAdd from "./OverlayAdd";
import OverlayEdit from "./OverlayEdit";

const DealsCategory = () => {
  const token = localStorage.getItem("token");
  const [deaCat, setDeaCat] = useState([]);
  const [search, setSearch] = useState([]);
  const [addDeaCat, setAddDeaCat] = useState(false);
  const handleOpenAdd = () => setAddDeaCat(true);
  const handleCloseAdd = () => setAddDeaCat(false);
  const [editDeaCat, setEditDeaCat] = useState(false);
  const handleCloseEdit = () => {
    setEditDeaCat(false);
  };
  const getDeaCat = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/staging-masters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDeaCat(res.data.data);
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
    getDeaCat(token);
  }, [token]);

  const handleFilter = (e) => {
    const newData = deaCat.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(newData);
  };
  const handleDeleteCategory = (uid) => {
    const formData = new FormData();
    formData.append("staging_uid[]", uid);
    formData.append("_method", "delete");
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
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/staging-masters/item/delete`,
            formData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            Swal.fire({
              title: res.data.message,
              text: "Successfully delete item source",
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
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "The item was not deleted.",
          icon: "error",
        });
      }
    });
  };

  const columnsDatatable = [
    {
      name: "Name Source",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Expired Day",
      selector: (row) => row.start_exp_day,
      sortable: true,
    },
    {
      name: "Number",
      selector: (row) => row.numbering,
      sortable: true,
    },
    {
      name: "Percent Weight (%)",
      selector: (row) => row.percent_weight,
      sortable: true,
      width: "150px",
    },
    {
      name: "Need Approval",
      selector: (row) => row.need_approval === "yes" ? "Yes" : "No",
      sortable: true
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            title="Edit"
            className="icon-button"
            onClick={() => setEditDeaCat(row.uid)}
          >
            <i className="bi bi-pen"></i>
          </button>
          <button
            title="Delete"
            className="icon-button"
            onClick={() => handleDeleteCategory(row.uid)}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      ),
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
                        <div className="input-group">
                          <i class="bi bi-person-badge-fill fs-4 ms-2 "></i>
                          <h5 className="mt-2 ms-2">Roles</h5>
                        </div>
                      </Link>
                      <Link
                        to="/properties/source"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group ">
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
                        <div className="input-group active-side">
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
                        <div className="input-group">
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
                        onClick={handleOpenAdd}
                      >
                        Add DealStage
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
                          placeholder="Search Source..."
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
                        columns={columnsDatatable}
                        pagination
                        selectableRows
                      />
                      <OverlayAdd
                        visible={addDeaCat}
                        onClose={handleCloseAdd}
                      />
                      <OverlayEdit
                        visible={editDeaCat !== false}
                        onClose={handleCloseEdit}
                        uid={editDeaCat}
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

export default DealsCategory;
