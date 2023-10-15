import React from "react";
import { Col, Row, Card } from "react-bootstrap";
const Profil = () => {
  return (
    <div
      className="tab-pane fade show active profile-overview"
      id="profile-overview"
    >
      <Card.Title className="ms-3 mt-3">
        <h5 className="fw-semibold">Profile Details </h5>
      </Card.Title>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          Name
        </Col>
        <Col lg={9} md={8}>
          Joko Prasetio
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          Email
        </Col>
        <Col lg={9} md={8}>
          jokoprasetio12@gmail.com
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          No.Telp
        </Col>
        <Col lg={9} md={8}>
          028394721839
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          Company Name
        </Col>
        <Col lg={9} md={8}>
          PT.Prima Indo Medilab
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          Role
        </Col>
        <Col lg={9} md={8}>
          Supervisor Sales
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          Primary Team
        </Col>
        <Col lg={9} md={8}>
          Team 1
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          Secondary Team
        </Col>
        <Col lg={9} md={8}>
          Team 2
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          Position
        </Col>
        <Col lg={9} md={8}>
          Admin
        </Col>
      </Row>
    </div>
  );
};

export default Profil;
