import React from 'react';
import {
  Card,
  Row,
  Col,
  Badge,
  Alert,
  Spinner,
  ListGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faBullseye,
  faCalendarCheck,
  faUsers,
  faSyncAlt,
  faExclamationTriangle,
  faChartPie,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Helper untuk menentukan warna badge status analisis.
 */
const getStatusBadgeVariant = analysisText => {
  switch (analysisText) {
    case 'Buruk':
      return 'danger';
    case 'Ditingkatkan':
    case 'Kurang':
      return 'warning';
    case 'Memadai':
      return 'success';
    default:
      return 'secondary';
  }
};

/**
 * Komponen Statistik Rekap Bulanan (CalculationStats)
 * “Dumb component” — hanya menerima data & menampilkan UI.
 */
const CalculationStats = ({
  recapData = null,
  isLoading = false,
  error = null,
}) => {
  /** ---------------- Loading State ---------------- */
  if (isLoading) {
    return (
      <Alert variant="light" className="text-center border py-4 mb-4">
        <Spinner size="sm" className="me-2" />
        Loading Monthly Recap...
      </Alert>
    );
  }

  /** ---------------- Error State ---------------- */
  if (error) {
    return (
      <Alert variant="danger" className="text-center border py-4 mb-4">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          size="2x"
          className="mb-3"
        />
        <h5>Error Loading Recap</h5>
        <p className="text-muted mb-0">{error}</p>
      </Alert>
    );
  }

  /** ---------------- No Data State ---------------- */
  if (!recapData || recapData.total_visit === 0) {
    return (
      <Alert variant="light" className="text-center border py-4 mb-4">
        <FontAwesomeIcon
          icon={faChartLine}
          size="2x"
          className="mb-3 text-muted"
        />
        <h5>No Recap Data</h5>
        <p className="text-muted mb-0">
          No activities were reported for this month.
        </p>
      </Alert>
    );
  }

  /** ---------------- Data Valid ---------------- */
  const {
    status,
    total_visit,
    total_cust_visit,
    repetition_pct,
    categories,
  } = recapData;

  /** ---------- Performance Card ---------- */
  const renderPerformanceCard = () => {
    const analysis = status.analysis;
    const variant = getStatusBadgeVariant(analysis.plan_achievement);

    return (
      <Card className={`bg-${variant} text-white h-100 shadow-sm border-0`}>
        <Card.Body className="text-center">
          <h6 className="mb-1 text-uppercase small">Plan Achievement</h6>
          <h4 className="mb-1">{analysis.plan_achievement}</h4>
          <h6 className="mb-0 text-capitalize">
            ({status.achievement_pct}%)
          </h6>
        </Card.Body>
      </Card>
    );
  };

  /** ---------- Overview Cards ---------- */
  const renderOverviewCards = () => {
    const cardsData = [
      {
        title: 'Total Visits',
        value: total_visit,
        icon: faCalendarCheck,
        color: 'success',
      },
      {
        title: 'Unique Clients',
        value: total_cust_visit,
        icon: faUsers,
        color: 'primary',
      },
      {
        title: 'Visit Repetition',
        value: `${repetition_pct}x`,
        icon: faSyncAlt,
        color: 'info',
      },
    ];

    return cardsData.map((card, index) => (
      <Col md={4} key={index} className="mb-3 mb-md-0">
        <Card className="h-100 border-0 shadow-sm">
          <Card.Body className="text-center d-flex flex-column justify-content-center">
            <div className={`text-${card.color} mb-2`}>
              <FontAwesomeIcon icon={card.icon} size="2x" />
            </div>
            <h3 className="mb-0 text-dark fw-bold">{card.value}</h3>
            <p className="text-muted mb-0 small">{card.title}</p>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  /** ---------- Category List ---------- */
  const renderCategoryList = () => (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Header>
        <FontAwesomeIcon icon={faChartPie} className="me-2 text-muted" />
        <strong>Visit by Category</strong>
      </Card.Header>
      <ListGroup
        variant="flush"
        style={{ maxHeight: '200px', overflowY: 'auto' }}
      >
        {categories
          .filter(cat => cat.total > 0)
          .sort((a, b) => b.total - a.total)
          .map(cat => (
            <ListGroup.Item
              key={cat.name}
              className="d-flex justify-content-between align-items-center"
            >
              {cat.name}
              <Badge bg="primary" pill>
                {cat.total}
              </Badge>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Card>
  );

  /** ---------- Render Layout ---------- */
  return (
    <div className="calculation-stats">
      <Row className="mb-4">
        <Col md={3} className="mb-3 mb-md-0">
          {renderPerformanceCard()}
        </Col>
        <Col md={9}>
          <Row>{renderOverviewCards()}</Row>
        </Col>
      </Row>

      <Row>
        <Col md={9} className="mb-3 mb-md-0">
          {renderCategoryList()}
        </Col>
        <Col md={3}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <h6 className="mb-1 text-uppercase small">Visit Target</h6>
              <h4
                className={`mb-1 text-${getStatusBadgeVariant(
                  status.analysis.visit_target
                )}`}
              >
                {status.analysis.visit_target}
              </h4>
              <h6 className="mb-0 text-muted">
                ({status.target_pct}%)
              </h6>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CalculationStats;
