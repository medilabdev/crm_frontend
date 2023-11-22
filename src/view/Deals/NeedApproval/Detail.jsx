import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import IconPerson from "../../../assets/img/telephone-call.png";
import IconCompany from "../../../assets/img/condo.png";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const DetailNeedApproval = () => {
  const token = localStorage.getItem("token");
  const { uid } = useParams();
  const [pipeline, setPipeline] = useState([]);
  const [detail, setDetail] = useState({});
  const [companyOld, setCompanyOld] = useState([]);
  const [product, setProduct] = useState([]);
  const [oldContact, setOldContact] = useState([]);
  const getDetail = (token, uid) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deals/show/${uid}/approval`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const dataDetail = res.data.data;
        setCompanyOld(dataDetail?.deal?.company);
        setDetail(dataDetail);
        setProduct(dataDetail?.deal?.detail_product);
        const loopDataContact = dataDetail?.deal?.contact_person?.map(
          (data) => data?.contact
        );
        setOldContact(loopDataContact);
      })
      .catch((error) => {
        if (error.response?.data?.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getPipeline = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/staging-masters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPipeline(res.data.data))
      .catch((error) => {
        if (error.response?.data?.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  useEffect(() => {
    getDetail(token, uid);
    getPipeline(token);
  }, [token, uid]);

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#427D9D",
        color: "white",
        marginTop: "12px",
        borderRadius: "5px",
      },
    },
    cells: {
      style: {
        fontSize: "4px",
        fontWeight: "500",
        marginTop: "4px",
      },
    },
  };

  const columns = [
    {
      name: "Name Product",
      selector: (row) =>
        row.product?.name ? row.product?.name : row.product_name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Quantity",
      selector: (row) => row.qty,
      sortable: true,
    },
    {
      name: "Total Price",
      selector: (row) =>
        `Rp. ${new Intl.NumberFormat().format(row.total_price)}`,
      sortable: true,
      width: "140px",
    },
    {
      name: "Discount(%)",
      selector: (row) => {
        if (row.discount_type === "nominal") {
          return `Rp. ${new Intl.NumberFormat().format(row.discount)}`;
        } else if (row.discount_type === "percent") {
          return `${row.discount} %`;
        } else {
          return "-";
        }
      },
    },
  ];

  const handleApproval = () => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah kamu yakin ingin approve deals ini",
      icon: "question",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Approve",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        const formData = new FormData();
        formData.append("temp_deal_uid[0]", uid);
        formData.append("_method", "put");
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/deals/item/approval`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            Swal.fire({
              title: res.data.message,
              text: "Approval Successfully",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.href = "/deals";
              }
            });
          });
      }
    });
  };
  const handleReject = (uid) => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah kamu yakin ingin reject deals ini",
      icon: "question",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        const formData = new FormData();
        formData.append("temp_deal_uid[0]", uid);
        formData.append("_method", "put");
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/deals/item/rejected`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            Swal.fire({
              title: res.data.message,
              text: "Reject Successfully",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            });
          });
      }
    });
  };
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Detail Need Approval</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <a to="/" className="text-decoration-none">
                        Dashboard
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/deals" className="text-decoration-none">
                        Deals
                      </a>
                    </li>
                    <li className="breadcrumb-item active">
                      Detail Need Approval
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="float-end mt-2 mb-2">
                <button
                  className="btn btn-primary me-2"
                  onClick={handleApproval}
                >
                  Approval
                </button>
                <button className="btn btn-danger" onClick={handleReject}>
                  Reject
                </button>
              </div>
            </div>
            <div className="col-md-12">
              {/* pipeline */}
              <Card>
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-caret-right-square-fill fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Pipeline</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  {pipeline.map((data) => (
                    <div className="form-check form-check-inline ms-3">
                      <input
                        type="radio"
                        className="form-check-input me-2"
                        value={detail.staging_uid}
                        checked={data.uid === detail.staging_uid}
                        style={{
                          width: "15px",
                          height: "15px",
                          borderColor: "#012970",
                          boxShadow: "0 2 5px rgba(0, 0, 0, 0.3)",
                        }}
                      />
                      <label
                        className="form-check-label mt-1"
                        style={{ fontWeight: 400, fontSize: "0.75rem" }}
                      >
                        {data.name}
                      </label>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              {/* deals */}
              <Card className="shadow mb-4">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-currency-dollar fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Deals</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <FloatingLabel
                    label={<span>Deal Name</span>}
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      value={detail?.deal?.deal_name}
                      name="deal_name"
                      placeholder="text"
                      readonly
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label={<span>Deal Size</span>}
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      name="deal_size"
                      value={detail?.deal?.deal_size}
                      placeholder="text"
                      readonly
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label={<span>Deal Status</span>}
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      value={
                        detail?.deal?.deal_status === "null"
                          ? ""
                          : detail?.deal?.deal_status
                      }
                      name="deal_name"
                      placeholder="text"
                      readonly
                    />
                  </FloatingLabel>
                  <FloatingLabel label={<span>Owner</span>} className="mb-3">
                    <Form.Control
                      type="text"
                      value={detail?.created_by?.name}
                      name="deal_name"
                      placeholder="text"
                      readonly
                    />
                  </FloatingLabel>
                  <FloatingLabel label={<span>Priority</span>} className="mb-3">
                    <Form.Control
                      type="text"
                      value={detail?.deal?.priority?.name}
                      readonly
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label={<span>Deal Category</span>}
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      value={detail?.deal?.deal_category_uid || ""}
                      readonly
                    />
                  </FloatingLabel>
                </Card.Body>
              </Card>
              {/* Companies */}
              <Card className="shadow mb-4">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-building  fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Companies</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Card className="shadow p-2">
                    <div className="row d-flex">
                      <div className="col-md-10">
                        <div className="d-flex">
                          <img
                            src={IconCompany}
                            className="ms-1 me-3 mt-3"
                            alt={IconCompany}
                            style={{ width: "30px", height: "30px" }}
                          />
                          <Col md={12} sm={12}>
                            <p
                              className="ms-1"
                              style={{
                                fontSize: "10px",
                                whiteSpace: "normal",
                              }}
                            >
                              Name Company : <br />
                              <strong className="mt-1">
                                {companyOld?.name || "-"}
                              </strong>
                            </p>
                            <p
                              className="ms-1"
                              style={{
                                fontSize: "10px",
                                marginTop: "-8px",
                              }}
                            >
                              Type : <br />
                              <strong className="mt-1">
                                {companyOld?.company_type?.name || "-"}
                              </strong>
                            </p>
                            <p
                              className="ms-1"
                              style={{
                                fontSize: "10px",
                                marginTop: "-8px",
                                whiteSpace: "normal",
                              }}
                            >
                              No.Telp : <br />
                              <strong className="mt-1">
                                {companyOld?.phone?.[0]?.number || "-"}
                              </strong>
                            </p>
                          </Col>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Card.Body>
              </Card>
              {/* Contact */}
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-person-circle fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Contact</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div>
                    {oldContact?.map((data) => (
                      <Card className="shadow p-2">
                        <div className="row d-flex">
                          <>
                            <Col md={12} sm={12}>
                              <div className="d-flex">
                                <img
                                  src={IconPerson}
                                  alt={IconPerson}
                                  className="ms-1 me-3 mt-3"
                                  style={{ width: "30px", height: "30px" }}
                                />
                                <Col md={12} sm={12}>
                                  <p
                                    className="ms-1"
                                    style={{
                                      fontSize: "10px",
                                      whiteSpace: "normal",
                                    }}
                                  >
                                    Name :<strong className="ms-2">{data.name}</strong>
                                  </p>
                                  <p
                                    className="ms-1"
                                    style={{
                                      fontSize: "10px",
                                      marginTop: "-8px",
                                    }}
                                  >
                                    Email :<strong className="ms-2">{data.email}</strong>
                                  </p>
                                  <p
                                    className="ms-1"
                                    style={{
                                      fontSize: "10px",
                                      marginTop: "-8px",
                                      whiteSpace: "normal",
                                    }}
                                  >
                                    No.Telp :<strong className="ms-1">{data?.phone[0]?.number || "-"}</strong>
                                  </p>
                                </Col>
                              </div>
                            </Col>
                          </>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-8">
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i class="bi bi-box-seam-fill fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-5">Product</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div>
                    <DataTable
                      customStyles={customStyles}
                      data={product}
                      columns={columns}
                    />
                  </div>
                  <div className="row">
                    <div className="mt-3 me-2">
                      <span
                        className="float-end"
                        style={{ fontWeight: 400, fontSize: "0.80rem" }}
                      >
                        Total Price Product:
                        <span className="ms-3 me-2" style={{ fontWeight: 600 }}>
                          Rp.{" "}
                          {new Intl.NumberFormat().format(
                            detail?.deal?.total_price
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </Main>
    </body>
  );
};

export default DetailNeedApproval;
