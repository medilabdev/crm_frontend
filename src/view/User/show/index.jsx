import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Col, Row, Container, Card, Form } from "react-bootstrap";
import IconImage from "../../../assets/img/man.png";
import "../show/style.css";
import Footer from "../../../components/Template/Footer";
import Profil from "./profil";
import EditProfil from "./editProfil";
import ChangePassword from "./changePassword";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ShowUser = () => {
  const { uid } = useParams();
  const [userDetail, setUserDetail] = useState({});
  const tokenAuth = localStorage.getItem("token");
  const [roles, setRoles] = useState([]);
  const [position, setPosition] = useState([{}]);
  const [primaryTeam, setPrimaryTeam] = useState([]);
  const [users, setUsers] = useState([]);

  const getDataUserDetail = async(uid, state, token, retryCount = 0) => {
    try {
      const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      state(response.data.data) 
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getDataUserDetail(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  // get all data roles
  const getAllDataRole = async(token, retryCount = 0) => {
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
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getAllDataRole(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  // get all data position
  const getAllPosition = async(token, retryCount= 0) => {
    try {
      const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/positions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPosition(response.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 429){
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

  // get all data primary team
  const getAllPrimaryTeam = async(token, retryCount=0) => {
    try {
      const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPrimaryTeam(response.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getAllPrimaryTeam(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  // get all user
  const getAllUsers = async(token, retryCount = 0) => {
    try {
      const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) 
      setUsers(response.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getAllUsers(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  useEffect(() => {
    getAllPosition(tokenAuth);
    getAllDataRole(tokenAuth);
    getAllPrimaryTeam(tokenAuth);
    getAllUsers(tokenAuth);
    getDataUserDetail(uid, setUserDetail, tokenAuth);
  }, [uid, tokenAuth]);


  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="pagetitle">
          <h1>Personal Account</h1>
          <nav>
            <ol className="breadcrumb mt-2">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="/users" className="text-decoration-none">
                  Users
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
                    src={userDetail.image ? userDetail.image : IconImage}
                    alt={userDetail.image}
                    className="rounded-circle img-icon"
                    style={{
                      width: "26rem",
                      height: "8.9rem",
                    }}
                  />
                  <h2>{userDetail?.name}</h2>
                  <h6 className="mt-2 mb-2">{userDetail?.position?.name}</h6>
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
                    <Profil detail={userDetail} />
                    <EditProfil
                      roles={roles}
                      position={position}
                      primaryTeam={primaryTeam}
                      users={users}
                    />
                    <ChangePassword />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
        <Footer />
      </Main>
    </body>
  );
};

export default ShowUser;
