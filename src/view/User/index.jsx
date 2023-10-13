import React, { useState } from "react";
import Sidebar from "../../components/Template/Sidebar";
import Topbar from "../../components/Template/Topbar";
import Main from "../../components/Template/Main";
import Card from "../../components/Card";
import DataTable from "react-data-table-component";
import "../User/style.css";
import IconImage from "../../assets/img/team-1.jpg";
import AddUser from "./modals/addUser";
import EditUser from "./modals/editUser";
import DeleteUser from "./modals/deleteUser";

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
  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <div className="image-name mt-3">
          <img src={IconImage} className="rounded-circle" />
          <div className="float-end">
            <span className="fw-semibold">{row.name}</span>
            <p className="mt-1">{row.email}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Last Login",
      selector: (row) => row.last_login,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <button
            onClick={() => setUserEdit(row.id)}
            className="icon-button"
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
    },
  ];
  const data = [
    {
      id: 1,
      name: "joko",
      email: "joko@gmail.com",
      last_login: "25-08-2023",
      role: "sales",
    },
    {
      id: 1,
      name: "hilman",
      email: "hilman@gmail.com",
      last_login: "26-08-2023",
      role: "sales",
    },
    {
      id: 1,
      name: "rio",
      email: "rio@gmail.com",
      last_login: "26-08-2023",
      role: "sales",
    },
  ];
  const [records, setRecords] = useState(data);
  function handleFilter(event) {
    const newData = data.filter((row) => {
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
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item active fw-bold ">Users</li>
              </ol>
            </nav>
          </div>
          <Card>
            <button
              className="btn btn-primary mt-3"
              onClick={() => setUsersCreate(true)}
            >
              Add Users
            </button>
            <div className="mt-5 col-md-3 float-end">
              <div className="input-group">
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
                />
              </div>
            </div>
            <DataTable
              className="p-2"
              columns={columns}
              data={records}
              pagination
              customStyles={{
                rows: {
                  fontSize: "12rem !important",
                },
              }}
            ></DataTable>
            <AddUser onClose={handleCloseModal} visible={usersCreate} />
            <EditUser onClose={handleCloseEditModal} visible={userEdit} />
            <DeleteUser onClose={handleCloseDeleteModal} visible={userDelete} />
          </Card>
        </Main>
      </body>
    </>
  );
};

export default User;
