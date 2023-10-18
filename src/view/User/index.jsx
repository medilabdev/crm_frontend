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
import axios from "axios";
import IconImage from "../../assets/img/person.png";

const User = () => {
  const [getDataUser, setGetDataUser] = useState([]);
  const [filterData, setFilterData] = useState([]);
  // modal add
  const [usersCreate, setUsersCreate] = useState(false);
  const handleCloseModal = () => setUsersCreate(false);
  // modal edit
  const [userEdit, setUserEdit] = useState(false);
  const handleCloseEditModal = () => setUserEdit(false);
  // modal delete
  const [userDelete, setUserDelete] = useState(false);
  const handleCloseDeleteModal = () => setUserDelete(false);
  const token = localStorage.getItem("token");

  const getData = (url, token, state) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        state(response.data.data);
        setFilterData(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getData("users", token, setGetDataUser);
  }, [token]);
  // console.log(getData);

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
              // src={
              //   row.image ? require(`../../assets/img/${row.image}`) : IconImage
              // }
              src={row.image ? row.image : IconImage}
              alt={row.image}
              className="rounded-circle"
              style={{
                width: "40px",
                height: "40px",
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
      name: "Position",
      selector: (row) => row.position.name,
      sortable: true,
      center: true,
    },
    {
      id: 3,
      name: "Last Login",
      selector: (row) => {
        const date = new Date(row.created_at);
        const FormattedDate = date.toISOString().split("T")[0];
        const FormattedTime = date.toTimeString().split(" ")[0];
        const FormattedDateTime = `${FormattedDate} ${FormattedTime}`;
        return FormattedDateTime;
      },
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

  function handleFilter(event) {
    const newData = getDataUser.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFilterData(newData);
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
              data={filterData}
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
