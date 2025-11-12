import React from "react";
import { Card, Row, Col, Alert, Spinner, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faCheckCircle,
  faExternalLinkAlt,
  faCalendarCheck,
  faSyncAlt,
  faBuilding,
  faUniversity,
  faUserShield,
  faEllipsisH,
  faExclamationTriangle,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const CalculationStats = ({ recapData = null, isLoading = false, error = null }) => {
  if (isLoading) {
    return (
      <Alert variant="light" className="text-center border py-4 mb-4">
        <Spinner size="sm" className="me-2" />
        Loading Monthly Recap...
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center border py-4 mb-4">
        <FontAwesomeIcon icon={faExclamationTriangle} size="2x" className="mb-3" />
        <h5>Error Loading Recap</h5>
        <p className="text-muted mb-0">{error}</p>
      </Alert>
    );
  }

  if (!recapData) {
    return (
      <Alert variant="light" className="text-center border py-4 mb-4">
        <FontAwesomeIcon icon={faChartLine} size="2x" className="mb-3 text-muted" />
        <h5>No Recap Data</h5>
        <p className="text-muted mb-0">No activities were reported for this month.</p>
      </Alert>
    );
  }

  /** ✅ Ambil struktur baru dari backend */
  const {
    monthly_totals = {},
    weekly_breakdown = [],
    categories_list = [],
  } = recapData;

  /** ✅ Destruktur data dari monthly_totals biar tetap backward-compatible */
  const {
    planning = 0,
    on_planning = 0,
    off_planning = 0,
    total_visit = 0,
    repetition_pct = 0,
    total_cust_planned = 0,
    total_cust_visit = 0,
    achievement_pct = 0,
    target_pct = 0,
    analysis_summary = [],
  } = monthly_totals;

  console.log("recapData", recapData);

  /** ---------- 1️⃣ METRIK UTAMA ---------- */
  const metricCards = [
    { title: "Planning", value: planning, icon: faClipboardList, color: "primary" },
    { title: "On Planning", value: on_planning, icon: faCheckCircle, color: "success" },
    { title: "Off Planning", value: off_planning, icon: faExternalLinkAlt, color: "warning" },
    { title: "Total Visit", value: total_visit, icon: faCalendarCheck, color: "info" },
    { title: "Repetition PCT ", value: repetition_pct, icon: faSyncAlt, color: "secondary" },
    { title: "Total Cust Planned", value: total_cust_planned, icon: faClipboardList, color: "dark" },
    { title: "Total Cust Visit", value: total_cust_visit, icon: faBuilding, color: "secondary" },
    { title: "Achievement %", value: achievement_pct, icon: faChartLine, color: "success" },
  ];

  const CATEGORY_ICON_MAP = {
    "Internal/Office": { icon: faUserShield, color: "secondary" },
    "Pemerintah": { icon: faUniversity, color: "primary" },
    "Pendidikan": { icon: faClipboardList, color: "info" },
    "Perusahaan": { icon: faBuilding, color: "success" },
    "Asuransi": { icon: faCheckCircle, color: "warning" },
    "Others": { icon: faEllipsisH, color: "dark" },
  };

  /** ---------- 3️⃣ ANALISA BULANAN ---------- */
  const getBadgeVariant = (value) => {
    if (value === "Buruk" || value === "Kurang") return "danger";
    if (value === "Perlu Ditingkatkan" || value === "Ditingkatkan") return "warning";
    return "success";
  };

  return (
    <div className="calculation-stats">
      {/* --- Metrik utama --- */}
      <h5 className="fw-bold mb-3 text-primary">
        <FontAwesomeIcon icon={faChartLine} className="me-2" />
        Ringkasan Kunjungan
      </h5>
      <Row className="g-3 mb-4">
        {metricCards.map((card, idx) => (
          <Col md={4} lg={3} key={idx}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className={`text-${card.color} mb-2`}>
                  <FontAwesomeIcon icon={card.icon} size="2x" />
                </div>
                <h3 className="mb-0 fw-bold text-dark">{card.value ?? 0}</h3>
                <p className="text-muted mb-0 small">{card.title}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* --- Kategori Visit --- */}
      <h5 className="fw-bold mb-3 text-primary">
        <FontAwesomeIcon icon={faBuilding} className="me-2" />
        Kunjungan Berdasarkan Kategori
      </h5>
      <Row className="row-cols-2 row-cols-md-3 row-cols-lg-6 g-3 mb-4">
        {categories_list.map((cat, idx) => {
          const { icon, color } = CATEGORY_ICON_MAP[cat.name] || CATEGORY_ICON_MAP["Others"];
          return (
            <Col key={idx}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-3">
                  <div className={`text-${color} mb-1`}>
                    <FontAwesomeIcon icon={icon} size="lg" />
                  </div>
                  <h3 className="fw-bold text-dark mb-0">{cat.total ?? 0}</h3>
                  <p className="text-muted mb-0 small text-truncate">{cat.name}</p>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* --- Analisa Bulanan --- */}
      <h5 className="fw-bold mb-3 text-primary">
        <FontAwesomeIcon icon={faClipboardList} className="me-2" />
        Analisa Kunjungan Bulanan
      </h5>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          {analysis_summary.map((item, idx) => (
            <div
              key={idx}
              className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2"
            >
              <div className="flex-grow-1">
                <strong>{item.title}</strong>
                <p className="mb-0 text-muted small">{item.basis}</p>
              </div>
              <div className="text-end">
                <h6 className="mb-1 fw-bold text-dark">
                  {item.percent !== undefined
                    ? `${item.percent}${idx === 2 ? "x" : "%"}`
                    : "-"}
                </h6>
                <Badge
                  bg={getBadgeVariant(item.value)}
                  className="px-3 py-2 fs-6 text-uppercase"
                >
                  {item.value}
                </Badge>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CalculationStats;
