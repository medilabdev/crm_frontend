import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Col, Row, Container, Card } from "react-bootstrap";
import IconImage from "../../../assets/img/team-1.jpg";
import "../show/style.css";

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
                  <img src={IconImage} alt="" className="rounded-circle img-icon" />
                  <h2>Joko</h2>
                  <h6 className="mt-2 mb-2">Sales</h6>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={8}>
              <Card className="profile-detail">
                <Card.Body>
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tabs"
                        data-bs-target="#profile-overview"
                      >
                        Profile
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tabs"
                        data-bs-target="#profile-edit"
                      >
                        Edit Profile
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tabs"
                        data-bs-target="#change-password"
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade-show active profile-overview ms-3"
                      id="profile-overview"
                    >
                      <h5 className="card-title">Profile Detail</h5>
                      <Row>
                        <Col lg={3} md={4} className="label">
                          Full Name
                        </Col>
                        <Col lg={9} md={8}>
                          Jowel Aditya mine
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={4} className="label">
                          Email
                        </Col>
                        <Col lg={9} md={8}>
                          JowelAdityamine@gmail.com
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={4} className="label">
                          No.Telp
                        </Col>
                        <Col lg={9} md={8}>
                          0896736127238
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={4} className="label">
                          PID
                        </Col>
                        <Col lg={9} md={8}>
                          8291237896736127238
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={4} className="label">
                          Company Name
                        </Col>
                        <Col lg={9} md={8}>
                          PT.Prima Indo Medilab
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={4} className="label">
                          Role
                        </Col>
                        <Col lg={9} md={8}>
                          Staff
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={4} className="label">
                          Primary Team
                        </Col>
                        <Col lg={9} md={8}>
                          Team 1
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={4} className="label">
                          Secondary Team
                        </Col>
                        <Col lg={9} md={8}>
                          Team 4
                        </Col>
                      </Row>
                    </div>
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

export default ShowUser;
