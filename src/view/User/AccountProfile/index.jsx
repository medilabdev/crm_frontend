import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Card, Col, Row } from "react-bootstrap";
import IconImage from "../../../assets/img/man.png";
import axios from "axios";
import "../show/style.css";
import Profil from "../show/profil";
import EditProfil from "../show/editProfil";
import ChangePassword from "../show/changePassword";

const AccountUser = () => {
  const name = localStorage.getItem("name");
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);
  const [users, setUsers] = useState([])
  const [primaryTeam, setPrimaryTeam] = useState([]);
  const [position, setPosition] = useState([]);


  const getAllPrimaryTeam = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setPrimaryTeam(response.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getAllPosition = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/positions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setPosition(response.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getAllUsers = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUsers(response.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };


  const getRoles = () => {
    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => setRole(response.data.data))
    .catch((error) => {
      if (error.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      }
    });
  }

  const getDataUser = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  useEffect(() => {
    getDataUser();
    getRoles()
    getAllUsers()
    getAllPosition(token)
    getAllPrimaryTeam(token)
  }, [token, uid]);
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="pagetitle">
          <h1>Personal Account {name}</h1>
          <nav>
            <ol className="breadcrumb mt-2">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">
                  Dashboard
                </a>
              </li>
              <li className="breadcrumb-item active">Personal Account</li>
            </ol>
          </nav>
        </div>
        <section className="section profile">
          <Row>
            <Col xl={4}>
              <Card className="shadow">
                <Card.Body className="profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    src={user.image ? user.image : IconImage}
                    alt={user.image}
                    className="rounded-circle img-icon"
                    style={{
                      width: "26rem",
                      height: "8.9rem",
                    }}
                  />
                  <h2>{user?.name}</h2>
                  <h6 className="mt-2 mb-2">{user?.position?.name}</h6>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={8}>
              <Card className="shadow">
                <Card.Body className="pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                      >
                        Overview
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Edit Profile
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#change-password"
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <Profil detail={user} />
                    <EditProfil roles={role} users={users} position={position} primaryTeam={primaryTeam} uidLocal={uid} />
                    <ChangePassword uidLocal={uid} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Main>
    </body>
  );
};

export default AccountUser;
