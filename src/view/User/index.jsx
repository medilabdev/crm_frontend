import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Template/Sidebar";
import Topbar from "../../components/Template/Topbar";
import Main from "../../components/Template/Main";
import Card from "../../components/Card";
import DataTable from "react-data-table-component";
import "../User/style.css";
import AddUser from "./modals/addUser";
import EditUser from "./modals/editUser";
import DeleteUser from "./modals/deleteUser";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Template/Footer";
import dumyData from "./dummy/index";

const User = () => {
  // modal add
  const [usersCreate, setUsersCreate] = useState(false);
  const handleCloseModal = () => setUsersCreate(false);
  // modal edit
  const [userEdit, setUserEdit] = useState(false);
  const handleCloseEditModal = () => setUserEdit(false);
  // modal delete
  const [userDelete, setUserDelete] = useState(false);
  const handleCloseDeleteModal = () => setUserDelete(false);

  // show redirect
  const navigate = useNavigate();

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };
  const columns = [
    {
      id: 1,
      name: "Name",
      selector: (row) => (
        <div className="image-name">
          <div className="d-flex align-items-center">
            <img
              src={require(`../../assets/img/${row.image}`)}
              alt={row.image}
              className="rounded-circle"
              style={{
                width: "35px",
                marginRight: "10px",
              }}
            />
            <div className="mt-3">
              <span className="fw-semibold">{row.name}</span>
              <p
                className="mt-1"
                style={{
                  fontSize: "11px",
                }}
              >
                {row.email}
              </p>
            </div>
          </div>
        </div>
      ),
      left: true,
      width: "270px",
    },
    {
      id: 2,
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      center: true,
    },
    {
      id: 3,
      name: "Last Login",
      selector: (row) => row.last_login,
      sortable: true,
    },
    {
      id: 4,
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <button
            onClick={() => navigate(`/users/${row.uid}`)}
            className="icon-button"
            title="Show"
          >
            <i class="bi bi-person-circle show"></i>
          </button>
          <button
            onClick={() => setUserEdit(row.id)}
            className="ms-2 icon-button"
            title="Edit"
          >
            <i className="bi bi-pen edit"></i>
          </button>
          <button
            onClick={() => setUserDelete(row.id)}
            className="ms-2 icon-button"
            title="Delete"
          >
            <i className="bi bi-trash-fill danger"></i>
          </button>
        </div>
      ),
      width: "230px",
    },
  ];

  const [records, setRecords] = useState(dumyData);
  function handleFilter(event) {
    const newData = dumyData.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  return (
    <>
      <body id="body">
        <Topbar />
        <Sidebar />
        <Main>
          <div className="pagetitle">
            <h1>Users</h1>
            <nav>
              <ol className="breadcrumb mt-2">
                <li className="breadcrumb-item">
                  <a href="/" className="text-decoration-none">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item active fw-bold ">Users</li>
              </ol>
            </nav>
          </div>
          <Card>
            <button
              className="btn btn-primary mt-3 add-users"
              onClick={() => setUsersCreate(true)}
            >
              Add Users
            </button>
            <div className="mt-5 col-md-3 float-end">
              <div className="input-group search-users">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ borderEndEndRadius: 0, borderStartEndRadius: 0 }}
                  >
                    <i className="bi bi-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Search User...."
                  className="form-control search"
                  onChange={handleFilter}
                  style={{ fontSize: "0.85rem" }}
                />
              </div>
            </div>
            <DataTable
              columns={columns}
              data={records}
              defaultSortFieldId={1}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              className="mt-2"
            />
            <AddUser onClose={handleCloseModal} visible={usersCreate} />
            <EditUser onClose={handleCloseEditModal} visible={userEdit} />
            <DeleteUser onClose={handleCloseDeleteModal} visible={userDelete} />
          </Card>
          <Footer />
        </Main>
      </body>
    </>
  );
};

export default User;
