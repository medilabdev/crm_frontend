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
import SidebarProperties from "../partials";

const Source = () => {
  const token = localStorage.getItem("token");
  const [source, setSource] = useState([]);
  const [search, setSearch] = useState([]);
  const [selectUid, setSelectUid] = useState([]);
  const [addSource, setAddSource] = useState(false);
  const handleOpenAdd = () => setAddSource(true);
  const handleCloseAdd = () => setAddSource(false);
  const [editSource, setEditSource] = useState(false);
  const handleCloseEdit = () => {
    setEditSource(false);
  };
  const selUid = (e) => {
    const selRow = e.selectedRows.map((row) => row.uid);
    setSelectUid(selRow);
  };
  //   console.log(selectUid);
  const handleSubmitDeleteSelect = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak dapat mengembalikan data ini setelah menghapusnya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });
  };
  const getSource = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies-source`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSource(res.data.data);
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
    const newData = source.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(newData);
  };
  useEffect(() => {
    getSource(token);
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
            onClick={() => setEditSource(row.uid)}
          >
            <i className="bi bi-pen"></i>
          </button>
          <button
            title="Delete"
            className="icon-button"
            onClick={() => {
              Swal.fire({
                title: "Konfirmasi",
                text: "Apakah kamy yakin ingin menghapus ini?",
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
                      `${process.env.REACT_APP_BACKEND_URL}/companies-source/${row.uid}`,
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
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };
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
                 <SidebarProperties />
                  <div className="col-md-9">
                    <div>
                      <button
                        className="btn btn-primary mt-5 ms-4"
                        style={{ fontSize: "0.85rem" }}
                        onClick={handleOpenAdd}
                      >
                        Add Source
                      </button>
                      <button
                        className="btn btn-danger mt-5 ms-4"
                        style={{ fontSize: "0.85rem" }}
                        onClick={handleSubmitDeleteSelect}
                      >
                        Delete Source
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
                        paginationComponentOptions={paginationComponentOptions}
                        pagination
                        selectableRows
                        onSelectedRowsChange={selUid}
                        customStyles={customStyle}
                      />
                      <OverlayAdd
                        visible={addSource}
                        onClose={handleCloseAdd}
                      />
                      <OverlayEdit
                        visible={editSource !== false}
                        onClose={handleCloseEdit}
                        uid={editSource}
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

export default Source;
