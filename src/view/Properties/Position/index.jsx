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

const Position = () => {
  const token = localStorage.getItem("token");
  const [position, setPosition] = useState([]);
  const [search, setSearch] = useState([]);
  const [selectUid, setSelectUid] = useState([]);
  const [addPost, setAddPost] = useState(false);
  const handleCloseAdd = () => setAddPost(false);
  const handleOpenAdd = () => setAddPost(true);
  const [editPost, setEditPost] = useState(false);
  const handleCloseEdit = () => {
    setEditPost(false);
  };
  const selUid = (e) => {
    const selectRow = e.selectedRows.map((row) => row.uid);
    setSelectUid(selectRow);
  };
  const getPosition = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/positions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosition(res.data.data);
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
    const newData = position.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(newData);
  };
  useEffect(() => {
    getPosition(token);
  }, [token]);
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
  const columns = [
    {
      id: 1,
      name: "Name Position",
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
            onClick={() => setEditPost(row.uid)}
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
                      `${process.env.REACT_APP_BACKEND_URL}/positions/${row.uid}`,
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    )
                    .then((res) => {
                      Swal.fire({
                        title: res.data.message,
                        text: "Successfully delete item position",
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
                        <div className="input-group">
                          <i class="bi bi-people-fill fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">Teams</h5>
                        </div>
                      </Link>
                      <Link
                        to="/properties/position"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group active-side">
                          <i class="bi bi-diagram-3 fs-4 ms-2 "></i>
                          <h5 className="mt-2 ms-2">Position</h5>
                        </div>
                      </Link>
                      <Link
                        to="/properties/roles"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-person-badge-fill fs-4 ms-2"></i>
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
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div>
                      <button
                        className="btn btn-primary mt-5 ms-4"
                        style={{ fontSize: "0.85rem" }}
                        onClick={handleOpenAdd}
                      >
                        Add Position
                      </button>
                      <button
                        className="btn btn-danger mt-5 ms-4"
                        style={{ fontSize: "0.85rem" }}
                        // onClick={handleSubmitDeleteSelect}
                      >
                        Delete Position
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
                          placeholder="Search Position..."
                          className="form-control"
                          onChange={handleFilter}
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                    </div>
                    <div className="p-2">
                      <DataTable
                        pagination
                        data={search}
                        columns={columns}
                        selectableRows
                        customStyles={customStyle}
                        paginationComponentOptions={paginationComponentOptions}
                        onSelectedRowsChange={selUid}
                      />
                      <OverlayAdd visible={addPost} onClose={handleCloseAdd} />
                      <OverlayEdit
                        onClose={handleCloseEdit}
                        visible={editPost !== false}
                        uid={editPost}
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

export default Position;
