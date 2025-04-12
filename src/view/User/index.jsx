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
import IconImage from "../../assets/img/man.png";
import Swal from "sweetalert2";

const User = () => {
  // modal add
  const [usersCreate, setUsersCreate] = useState(false);
  const handleCloseModal = () => setUsersCreate(false);
  // modal edit
  const [userEdit, setUserEdit] = useState(false);
  const [search, setSearch] = useState([])

  const token = localStorage.getItem("token");

  const handleCloseEditModal = () => {
    setUserEdit(false);
  };

  // modal delete
  const [userDelete, setUserDelete] = useState(false);
  const handleCloseDeleteModal = () => setUserDelete(false);

  // get role
  const [roles, setRoles] = useState([]);
  // get teams
  const [primary, setPrimary] = useState([]);
  // get all user
  const [users, setUser] = useState([]);

  // get all position
  const [position, setPosition] = useState([]);
  const [data, setData] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [pending, setPending] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  });
  const handleChangePage = (page) => {
    setPagination((e) => ({ ...e, page }));
  };

  const handlePagePerChange = (pageSize, page) => {
    setPagination((prev) => ({ ...prev, pageSize, page }));
  };
  const getData = async (token, search, pagination, retryCount = 0) => {
    try {
      const params = {}
      if (search) {
        params.search = search
      }
      params.page = pagination.page;
      params.limit = pagination.limit;
      const response = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: params
        })

      setData(response.data?.data)
      setTotalRows(response.data?.pagination?.totalData);
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getData(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };



  const getAllRoles = async (token, retryCount = 0) => {
    try {
      const response = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/roles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      setRoles(response.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getAllRoles(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  const getPrimaryTeam = async (token, retryCount = 0) => {
    try {
      const resposne = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/teams`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      setPrimary(resposne.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getPrimaryTeam(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  const getAllUser = async (token, retryCount = 0) => {
    try {
      const response = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      setUser(response.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getAllUser(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  const getAllPosition = async (token, retryCount = 0) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/positions?limit=1000`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPosition(response.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getAllPosition(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };



  const fetchData = async () => {
    try {
      setPending(true)
      await getData(token, search, pagination);
      await getAllRoles(token);
      await getPrimaryTeam(token);
      await getAllUser(token);
      await getAllPosition(token);
    } catch (error) {
      console.error("error", error);
    } finally {
      setPending(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [token, search, pagination]);

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
        <a href={`users/${row.uid}`} className="text-decoration-none">
          <div className="image-name">
            <div className="d-flex align-items-center">
              <img
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
                <a href={`users/${row.uid}`} className="fw-semibold text-decoration-none" style={{ whiteSpace: "normal", color: "black", fontWeight: "080" }}>{row.name}</a>
                <p
                  className="mt-1"
                  style={{
                    fontSize: "11px",
                    color: "black"
                  }} A
                >
                  {row.email}
                </p>
              </div>
            </div>
          </div>
        </a>

      ),
      left: true,
      width: "270px",
    },
    {
      id: 2,
      name: "Position",
      selector: (row) => row?.position?.name,
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
            onClick={() => setUserEdit(row.uid)}
            className="ms-2 icon-button"
            title="Edit"
          >
            <i className="bi bi-pen edit"></i>
          </button>
          <button
            onClick={() => setUserDelete(row.uid)}
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
    if (event.key === "Enter") {
      const value = event.target.value.toLowerCase()
      setSearch(value)
    }
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
                    Dashboard
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
                  onKeyDown={handleFilter}
                  style={{ fontSize: "0.85rem" }}
                />
              </div>
            </div>
            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationServer
              defaultSortFieldId={1}
              paginationPerPage={pagination.limit}
              paginationTotalRows={totalRows}
              className="mt-2"
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handlePagePerChange}
              paginationComponentOptions={{
                noRowsPerPage: true,
              }}
            />
            <AddUser
              onClose={handleCloseModal}
              visible={usersCreate}
              roles={roles}
              primary={primary}
              refUsers={users}
              position={position}
            />

            <EditUser
              onClose={handleCloseEditModal}
              visible={userEdit !== false}
              uid={userEdit}
              roles={roles}
              primary={primary}
              refUsers={users}
              position={position}
            />
            <DeleteUser
              onClose={handleCloseDeleteModal}
              visible={userDelete !== false}
              uid={userDelete}
            />
          </Card>
          <Footer />
        </Main>
      </body>
    </>
  );
};

export default User;
