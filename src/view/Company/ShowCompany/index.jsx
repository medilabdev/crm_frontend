import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import Footer from "../../../components/Template/Footer";
import { Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
const ShowCompany = () => {
  const { uid } = useParams();
  const token = localStorage.getItem("token");
  const [detailCompany, setCompanyDetail] = useState([]);
  const getDetailCompany = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCompanyDetail(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  useEffect(() => {
    getDetailCompany(token);
  }, [token]);
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="conatainer">
          <div className="row">
            <div className="pagetitle">
              <h1>Detail Company</h1>
              <nav>
                <ol className="breadcrumb mt-2">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-decoration-none">
                      Dashboard
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/company" className="text-decoration-none">
                      Company
                    </a>
                  </li>
                  <li className="breadcrumb-item active">Detail Company</li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row">
            <Card className="shadow">
              <Card.Title className="mt-3 ms-3">
                <h5 className="fw-semibold">Data Company Detail</h5>
              </Card.Title>
              <Card.Body>
                <Row className="ms-2">
                  <Col lg={3} md={4} className="label">
                    Company Name
                  </Col>
                  <Col lg={9} md={8}>
                    {detailCompany.name}
                  </Col>
                </Row>
                <Row className="ms-2">
                  <Col lg={3} md={4} className="label">
                    Website Company
                  </Col>
                  <Col lg={9} md={8}>
                    {detailCompany.website_url}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </div>
        <Footer />
      </Main>
    </body>
  );
};

export default ShowCompany;
