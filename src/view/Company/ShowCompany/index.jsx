import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import Footer from "../../../components/Template/Footer";
import UploadContactModal from "../Modals/UploadContactModal"; 
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";

const ShowCompany = () => {
  const { uid } = useParams();
  const token = localStorage.getItem("token");
  const [detailCompany, setCompanyDetail] = useState([]);
  const [dealsHistory, setDealsHistory] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(''); 


  const handleDownloadTemplate = async () => {
      try {
          const response = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/companies/${uid}/contacts/download-template`,
              {
                  headers: { Authorization: `Bearer ${token}` },
                  responseType: 'blob', // Ini penting untuk menerima file
              }
          );

          // Buat URL sementara dari data blob yang diterima
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'contact_upload_template.xlsx'); // Nama file saat di-download
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link); // Hapus link setelah selesai
          window.URL.revokeObjectURL(url); // Bersihkan memori

      } catch (error) {
          console.error("Failed to download template:", error);
          alert("Failed to download template. Please check the console.");
      }
  };



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

  const getDealsHistory = (year = null) => {
    let url = `${process.env.REACT_APP_BACKEND_URL}/companies/${uid}/deals`;
    if (year) url += `?year=${year}`;

    axios.get(url, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => setDealsHistory(res.data.data))
      .catch(err => {
        console.error("Failed to fetch deals history:", err);
        if (err.response?.data?.message === "Unauthenticated.") {
          localStorage.clear(); window.location.href = "/login";
        }
      });
  };


  useEffect(() => {
    getDetailCompany();
    getDealsHistory();
  }, [uid, token]);

  const columns = [
    {
      name: 'Owner',
      selector: row => row.owner?.name || '-', // Tampilkan nama owner jika ada
      sortable: true,
    },
    {
      name: 'Stage',
      selector: row => row.staging?.name || '-', // Tampilkan nama stage jika ada
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row => `Rp ${Number(row.deal_size).toLocaleString('id-ID')}`,
      sortable: true,
    },
    {
      name: 'Created Date',
      selector: row => new Date(row.created_at).toLocaleDateString('id-ID'),
      sortable: true,
    },
  ];


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
              <Card.Title className="mt-3 ms-3 d-flex justify-content-between align-items-center">
                <h5 className="fw-semibold mb-0">Data Company Detail</h5>
                <div>
                  <Button variant="outline-secondary" size="sm" className="me-2" onClick={handleDownloadTemplate}>
                      Download Template
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setShowUploadModal(true)}>
                      Upload Kontak
                  </Button>
                </div>
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
                <Row className="ms-2">
                  <Col lg={3} md={4} className="label">
                    Segmentation
                  </Col>
                  <Col lg={9} md={8}>
                    {detailCompany.segmentation}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>

          <div className="row mt-4">
            <Card className="shadow">
              <Card.Title className="mt-3 ms-3">
                <h5 className="fw-semibold">Deals History</h5>
              </Card.Title>
              <Card.Body>

                <Row className="mb-3">
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Year Filter (optional)</Form.Label>
                      <div className="d-flex gap-2">
                        <Form.Control
                          type="number"
                          inputMode="numeric"
                          placeholder="e.g. 2017"
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const yr = e.currentTarget.value.trim();
                              getDealsHistory(yr || null);
                            }
                          }}
                        />
                        <Button
                          variant="primary"
                          onClick={() => getDealsHistory(selectedYear.trim() || null)}
                        >
                          Apply
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={() => {
                            setSelectedYear('');
                            getDealsHistory(null); // show all years
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                      <small className="text-muted">
                        Leave empty to display all years.
                      </small>
                    </Form.Group>
                  </Col>
                </Row>



                <DataTable
                  columns={columns}
                  data={dealsHistory}
                  pagination
                  responsive
                  highlightOnHover
                />
              </Card.Body>
            </Card>
          </div>
        </div>
        <Footer />
        <UploadContactModal
              show={showUploadModal}
              onClose={() => setShowUploadModal(false)}
              companyUid={uid}
          />

      </Main>
    </body>
  );
};

export default ShowCompany;