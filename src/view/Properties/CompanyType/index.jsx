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
import SidebarProperties from "../partials";
const CompanyType = () => {
  const token = localStorage.getItem("token");
  const [comType, setCompType] = useState([]);
  const [search, setSearch] = useState([]);
  const [addCompType, setAddCompType] = useState(false);
  const handleOpenAdd = () => setAddCompType(true);
  const handleCloseAdd = () => setAddCompType(false);
  const [editComType, setEditCompType] = useState(false);
  const handleCloseEdit = () => {
    setEditCompType(false);
  };
  const getCompType = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies-type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCompType(res.data.data);
        setSearch(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const handleFilter = (e) => {
    const newData = comType.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(newData);
  };
  useEffect(() => {
    getCompType(token);
  }, [token]);

  const columnsDatatable = [
    {
      id: 1,
      name: "Name Source",
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
            onClick={() => setEditCompType(row.uid)}
          >
            <i className="bi bi-pen"></i>
          </button>
          <button
            title="Delete"
            className="icon-button"
            onClick={() => {
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
                      `${process.env.REACT_APP_BACKEND_URL}/companies-type/${row.uid}`,
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
                  <SidebarProperties />

                  <div className="col-md-9">
                    <div>
                      <button
                        className="btn btn-primary mt-5 ms-4"
                        style={{ fontSize: "0.85rem" }}
                        onClick={handleOpenAdd}
                      >
                        Add Company Type
                      </button>
                      <button
                        className="btn btn-danger mt-5 ms-4"
                        style={{ fontSize: "0.85rem" }}
                        // onClick={handleSubmitDeleteSelect}
                      >
                        Delete Company Type
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
                          placeholder="Search Type..."
                          className="form-control"
                          onChange={handleFilter}
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                    </div>
                    <div className="p-2">
                      <DataTable
                        pagination
                        columns={columnsDatatable}
                        data={search}
                        customStyles={customStyle}
                        paginationComponentOptions={paginationComponentOptions}
                      />
                      <OverlayAdd
                        visible={addCompType}
                        onClose={handleCloseAdd}
                      />
                      <OverlayEdit
                        visible={editComType !== false}
                        onClose={handleCloseEdit}
                        uid={editComType}
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

export default CompanyType;
