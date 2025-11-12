import React, { useState } from "react";
import { Button, Card, Col, Row, Accordion, Table, Badge } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import TaskDetailModal from "./TaskDetailModal";

const ActivityByDate = () => {
  const token = localStorage.getItem("token");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const userRole = localStorage.getItem("role_name");
  const userPosition = localStorage.getItem("position_name");
  const canExport =
    userRole?.toLowerCase() === "owner" || userPosition?.toLowerCase() === "direktur";

  const formatDate = (date) => {
    if (!date) return null;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleGenerateReport = async () => {
    if (!startDate) {
      Swal.fire("Peringatan", "Silakan pilih tanggal terlebih dahulu.", "warning");
      return;
    }

    setIsLoading(true);
    setReportData([]);

    const start = formatDate(startDate);
    const end = formatDate(endDate);
    let url = "";

    // ✅ jika hanya 1 tanggal → pakai ?date=
    if (start && !end) {
      url = `${process.env.REACT_APP_BACKEND_URL}/reports/activity-by-date?date=${start}`;
    } else {
      url = `${process.env.REACT_APP_BACKEND_URL}/reports/activity-by-date?start_date=${start}&end_date=${end}`;
    }

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReportData(response.data.data || []);
    } catch (error) {

      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response data:", error.response.data);
    } else {
        console.log("Error message:", error.message);
    }

    Swal.fire("Error", "Gagal memuat laporan aktivitas.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    if (!startDate) {
      Swal.fire("Peringatan", "Silakan pilih tanggal terlebih dahulu.", "warning");
      return;
    }

    const start = formatDate(startDate);
    const end = formatDate(endDate);
    let url = "";

    if (start && !end) {
      url = `${process.env.REACT_APP_BACKEND_URL}/reports/activity-by-date/export?date=${start}`;
    } else {
      url = `${process.env.REACT_APP_BACKEND_URL}/reports/activity-by-date/export?start_date=${start}&end_date=${end}`;
    }

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const fileLabel = end ? `${start}_to_${end}` : start;
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", `activity_report_${fileLabel}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to export report:", error);
      Swal.fire("Error", "Gagal mengekspor laporan ke Excel.", "error");
    }
  };

  const handleShowTaskModal = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleCloseTaskModal = () => {
    setShowTaskModal(false);
    setSelectedTask(null);
  };

  const getTotalActivities = () =>
    reportData.reduce((total, company) => total + company.total_activities, 0);

  return (
    <>
      <Card className="shadow">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Title className="mb-0">Activity Report</Card.Title>
          {canExport && (
            <Button
              variant="success"
              size="sm"
              onClick={handleExport}
              disabled={reportData.length === 0}
            >
              Export to Excel
            </Button>
          )}
        </Card.Header>

        <Card.Body>
          <Row className="align-items-end">
            <Col md={6}>
              <label className="mb-1 mr-2">Select Date or Range</label>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                isClearable={true}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date or range"
              />
            </Col>

            <Col md={3}>
              <Button onClick={handleGenerateReport} disabled={isLoading}>
                {isLoading ? "Loading..." : "Generate Report"}
              </Button>
            </Col>
          </Row>

          <hr />

          {reportData.length > 0 && (
            <div className="mb-3">
              <h5>
                Activities{" "}
                {endDate
                  ? `from ${startDate?.toLocaleDateString("id-ID")} to ${endDate?.toLocaleDateString("id-ID")}`
                  : `on ${startDate?.toLocaleDateString("id-ID")}`}
              </h5>
              <p className="text-muted">
                Total: {getTotalActivities()} activities from {reportData.length} companies
              </p>
            </div>
          )}

          {!isLoading && reportData.length === 0 && (
            <div className="text-center text-muted py-4">
              Tidak ada aktivitas pada tanggal yang dipilih.
            </div>
          )}

          {reportData.length > 0 && (
            <Accordion>
              {reportData.map((company, index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header>
                    <div className="d-flex justify-content-between align-items-center w-100 me-3">
                      <span className="fw-bold">{company.company_name}</span>
                      <Badge bg="primary" pill>
                        {company.total_activities} activities
                      </Badge>
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <Table responsive striped hover size="sm">
                      <thead className="table-dark">
                        <tr>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Owner</th>
                          <th>Stage</th>
                          <th>Update / Note</th>
                          <th>File</th>
                          <th>Task</th>
                        </tr>
                      </thead>
                      <tbody>
                        {company.activities.map((activity, actIndex) => {
                          const [datePart, timePart] = activity.date.split(" ");
                          return (
                            <tr key={actIndex}>
                              <td>{datePart}</td>
                              <td>{timePart}</td>
                              <td>{activity.owner}</td>
                              <td>{activity.stage}</td>
                              <td style={{ maxWidth: "300px", wordWrap: "break-word" }}>
                                {activity.update}
                              </td>
                              <td>
                                {activity.file ? (
                                  <a
                                    href={`${process.env.REACT_APP_BACKEND_IMAGE}/${activity.file.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                  >
                                    📎 {activity.file.name}
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </td>
                              <td>
                                {activity.task ? (
                                  <Button
                                    variant="outline-info"
                                    size="sm"
                                    onClick={() => handleShowTaskModal(activity.task)}
                                  >
                                    View Task
                                  </Button>
                                ) : (
                                  "-"
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Card.Body>
      </Card>

      {selectedTask && (
        <TaskDetailModal
          show={showTaskModal}
          onClose={handleCloseTaskModal}
          task={selectedTask}
        />
      )}
    </>
  );
};

export default ActivityByDate;
