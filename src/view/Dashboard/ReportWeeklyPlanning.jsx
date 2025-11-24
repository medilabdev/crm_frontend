import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DoughnutChart from "./Doughnut";
import ChartBar from "./ChartBar";
import { reportService } from "../../services/reportService";
import "./style_report.css"


const ReportWeeklyPlanning = () => {
  const [branches, setBranches] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().substring(0, 7)
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);

  // 🔹 Load Branch
  useEffect(() => {
    reportService
        .getBranches()
        .then((res) => {
        const branchData = Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data?.data)
            ? res.data.data
            : []; // fallback aman

        setBranches(branchData);
        if (branchData.length > 0) {
            setSelectedBranch(branchData[0].value);
        }
        })
        .catch((err) => {
        console.error("Failed to fetch branches", err);
        setError("Gagal memuat daftar cabang.");
        });
    }, []);


  // 🔹 Load Users (per branch)
  useEffect(() => {
    if (!selectedBranch) return;
    reportService
      .getUsers(selectedBranch)
      .then((res) => setUsers(res.data.data || []))
      .catch(() => console.warn("Gagal memuat user cabang."));
  }, [selectedBranch]);

  // 🔹 Fetch Report
  const handleFetchReport = async () => {
    if (!selectedMonth || !selectedBranch) {
      setError("Silakan pilih bulan dan cabang terlebih dahulu.");
      return;
    }
    setLoading(true);
    setError(null);
    setReportData(null);

    try {
      const formattedMonth = `${selectedMonth}-01`;
      const res = await reportService.getTaskReport(
        formattedMonth,
        selectedBranch,
        selectedUser
      );
      setReportData(res.data.data);
    } catch (err) {
      console.error("Failed to fetch report", err);
      setError("Gagal mengambil data report.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 UI Helper
  const renderSummaryCard = (item, index) => (
    <Col md={3} key={index} className="mb-3">
      <Card className="shadow-sm h-100 border-0">
        <Card.Body>
          <Card.Title className="text-secondary" style={{ fontSize: "0.9rem" }}>
            {item.title}
          </Card.Title>
          <h4
            className={`fw-bold ${
              item.value === "Buruk" || item.value === "Kurang"
                ? "text-danger"
                : "text-success"
            }`}
          >
            {item.value}
          </h4>
          <small className="text-muted">{item.basis}</small>
          <div className="fw-bold fs-5 mt-1">{item.percent}%</div>
        </Card.Body>
      </Card>
    </Col>
  );

  const isEmptyReport = () => {
    if (!reportData) return false;
    if (!reportData.monthly_totals) return true;
    if (!reportData.weekly_breakdown?.length) return true;
    if (!reportData.categories_list?.length) return true;
    return false;
  };


  // console.log("branches", branches);

  return (
    <div className="report-weekly-planning">

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-light py-3">
          <h5 className="text-primary mb-0">Filter Report Task by User</h5>
        </Card.Header>

        <Card.Body className="pb-4">
          <Row className="g-4">
            {/* Pilih Bulan */}
            <Col xs={12} sm={6} md={4}>
              <div className="form-group-modern">
                <label className="form-group-label">Pilih Bulan</label>
                <DatePicker
                  selected={new Date(selectedMonth + "-01")}
                  onChange={(date) =>
                    setSelectedMonth(date.toISOString().substring(0, 7))
                  }
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  className="form-control form-control-modern"
                />
              </div>
            </Col>

            {/* Pilih Cabang */}
            <Col xs={12} sm={6} md={4}>
              <div className="form-group-modern">
                <label className="form-group-label">Pilih Cabang</label>
                <Form.Select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="form-control-modern"
                >
                  <option value="">-- Pilih Cabang --</option>
                  {branches?.length > 0 ? (
                    branches.map((branch) => (
                      <option key={branch.value} value={branch.value}>
                        {branch.label}
                      </option>
                    ))
                  ) : (
                    <option value="">-- Tidak ada cabang tersedia --</option>
                  )}
                </Form.Select>
              </div>
            </Col>

            {/* Pilih User */}
            <Col xs={12} sm={6} md={4}>
              <div className="form-group-modern">
                <label className="form-group-label">Pilih User</label>
                <Form.Select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="form-control-modern"
                >
                  <option value="">-- Semua User --</option>
                  {users.map((u) => (
                    <option key={u.uid} value={u.uid}>
                      {u.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Col>
          </Row>

          {/* BUTTON */}
          <div className="mt-4 d-flex justify-content-md-end">
            <Button
              className="px-4 w-100 w-md-auto"
              onClick={handleFetchReport}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner as="span" size="sm" /> Memuat...
                </>
              ) : (
                "Tampilkan Report"
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" />
          <p>Memuat data...</p>
        </div>
      )}

      {reportData && isEmptyReport() && (
        <Card className="shadow-sm border-0 mt-4">
          <Card.Body className="text-center py-5">
            <div className="mb-3" style={{ fontSize: "3rem" }}>📭</div> 
            <h5 className="fw-bold text-secondary">Data Tidak Tersedia</h5>
            <p className="text-muted mb-3">
              Tidak ditemukan data report untuk bulan atau filter yang dipilih.
            </p>
            <Button
              variant="outline-primary"
              onClick={handleFetchReport}
              disabled={loading}
            >
              Coba Muat Ulang
            </Button>
          </Card.Body>
        </Card>
      )}

      {reportData && !isEmptyReport() && (
        <div className="report-content mt-4">
          {/* KPI */}
          <Row>{reportData.monthly_totals.analysis_summary.map(renderSummaryCard)}</Row>
          {/* Chart */}
          <Row className="mt-3">
            <Col>
              <Card className="shadow-sm border-0">
                <Card.Header className="fw-bold text-secondary">
                  Tren Kinerja Mingguan
                </Card.Header>
                <Card.Body>
                  <ChartBar
                    data={{
                      labels: reportData.weekly_breakdown.map((w) => w.week_name),
                      datasets: [
                        {
                          label: "Belum Direport",
                          data: reportData.weekly_breakdown.map(
                            (w) => w.plan_not_reported
                          ),
                          backgroundColor: "rgba(255,193,7,0.6)",
                        },
                        {
                          label: "Sesuai Rencana",
                          data: reportData.weekly_breakdown.map(
                            (w) => w.plan_reported
                          ),
                          backgroundColor: "rgba(40,167,69,0.6)",
                        },
                        {
                          label: "Di Luar Rencana",
                          data: reportData.weekly_breakdown.map((w) => w.outside),
                          backgroundColor: "rgba(23,162,184,0.6)",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        title: { display: true, text: "Plan vs Realisasi Mingguan" },
                      },
                      scales: { x: { stacked: true }, y: { stacked: true } },
                    }}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Kategori */}
          <Row className="mt-3">
            <Col md={6}>
              <Card className="shadow-sm border-0">
                <Card.Header className="fw-bold text-secondary">
                  Kategori Kunjungan
                </Card.Header>
                <Card.Body>
                  <DoughnutChart
                    data={{
                      labels: reportData.categories_list.map((c) => c.name),
                      datasets: [
                        {
                          data: reportData.categories_list.map((c) => c.total),
                          backgroundColor: [
                            "#0d6efd",
                            "#198754",
                            "#ffc107",
                            "#dc3545",
                            "#0dcaf0",
                            "#6c757d",
                          ],
                        },
                      ],
                    }}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm border-0">
                <Card.Header className="fw-bold text-secondary">
                  KPI & Data Bulanan
                </Card.Header>
                <Card.Body>
                  <p>
                    Plan vs Realisasi:{" "}
                    {reportData.monthly_totals.achievement_pct}%
                  </p>
                  <p>
                    Realisasi vs Target: {reportData.monthly_totals.target_pct}%
                  </p>
                  <hr />
                  <p>On Planning: {reportData.monthly_totals.on_planning}</p>
                  <p>Off Planning: {reportData.monthly_totals.off_planning}</p>
                  <p>Total Visit: {reportData.monthly_totals.total_visit}</p>
                  <p>
                    Repetisi Kunjungan:{" "}
                    {reportData.monthly_totals.repetition_pct}%
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ReportWeeklyPlanning;
