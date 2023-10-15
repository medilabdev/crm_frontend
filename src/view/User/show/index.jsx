import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Col, Row, Container, Card, Form } from "react-bootstrap";
import IconImage from "../../../assets/img/team-1.jpg";
import "../show/style.css";
import Footer from "../../../components/Template/Footer";
import Profil from "./profil";
import EditProfil from "./editProfil";
import ChangePassword from "./changePassword";

const ShowUser = () => {
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
              <Card>
                <Card.Body className="profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    src={IconImage}
                    alt=""
                    className="rounded-circle img-icon"
                  />
                  <h2>Joko</h2>
                  <h6 className="mt-2 mb-2">Sales</h6>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={8}>
              <Card>
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
                    <Profil />
                    <EditProfil />
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
