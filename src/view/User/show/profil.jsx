import React, { useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
const Profil = ({userDetail}) => {
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
          {userDetail.name}
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          Email
        </Col>
        <Col lg={9} md={8}>
          {userDetail.email}
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          No.Telp
        </Col>
        <Col lg={9} md={8}>
          {userDetail.telp_number}
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          Company Name
        </Col>
        <Col lg={9} md={8}>
          {userDetail.company_name ? userDetail.company_name : "-"}
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          Role
        </Col>
        <Col lg={9} md={8}>
         {userDetail?.role?.name}
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          Primary Team
        </Col>
        <Col lg={9} md={8}>
         {userDetail?.primary_team?.name}
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          Secondary Team
        </Col>
        <Col lg={9} md={8}>
          {userDetail.secondary_team ? userDetail.secondary_team : "-"}
        </Col>
      </Row>
      <Row className="ms-2">
        <Col lg={3} md={4} className="label">
          Position
        </Col>
        <Col lg={9} md={8}>
        {userDetail?.position?.name}
        </Col>
      </Row>
    </div>
  );
};

export default Profil;
