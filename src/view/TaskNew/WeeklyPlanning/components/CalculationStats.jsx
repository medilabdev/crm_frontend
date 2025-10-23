/**
 * Calculation Stats Component
 * Performance dashboard displaying real-time statistics and performance indicators
 */

import React, { useMemo } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  ProgressBar, 
  Badge, 
  Alert 
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faTargetArrow, 
  faCalendarCheck, 
  faTrophy,
  faChartPie,
  faArrowUp,
  faArrowDown,
  faMinus,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

// Utils
import { getPerformanceIndicator } from '../utils/calculationUtils';

/**
 * Statistics dashboard component
 */
const CalculationStats = ({
  dashboardStats = {},
  planningData = null
}) => {
  // Memoized calculations
  const statsData = useMemo(() => {
    if (!dashboardStats || Object.keys(dashboardStats).length === 0) {
      return {
        totalPlanning: 0,
        totalAchieved: 0,
        achievementRate: 0,
        totalOutside: 0,
        performanceLevel: 'none',
        weeklyStats: [],
        dailyStats: []
      };
    }

    // Get performance indicator with trend
    const performance = getPerformanceIndicator(dashboardStats.achievementRate || 0);
    
    return {
      ...dashboardStats,
      performanceLevel: performance.level,
      performanceColor: performance.color,
      performanceIcon: performance.icon
    };
  }, [dashboardStats]);

  /**
   * Render performance indicator card
   */
  const renderPerformanceCard = () => {
    const { performanceLevel, performanceColor, achievementRate } = statsData;
    
    let bgVariant = 'light';
    let textColor = 'dark';
    let icon = faMinus;
    
    switch (performanceLevel) {
      case 'excellent':
        bgVariant = 'success';
        textColor = 'white';
        icon = faTrophy;
        break;
      case 'good':
        bgVariant = 'primary';
        textColor = 'white';
        icon = faArrowUp;
        break;
      case 'average':
        bgVariant = 'warning';
        textColor = 'dark';
        icon = faMinus;
        break;
      case 'poor':
        bgVariant = 'danger';
        textColor = 'white';
        icon = faArrowDown;
        break;
      default:
        bgVariant = 'light';
        icon = faExclamationTriangle;
    }

    return (
      <Card className={`bg-${bgVariant} text-${textColor} h-100`}>
        <Card.Body className="text-center">
          <FontAwesomeIcon icon={icon} size="3x" className="mb-3" />
          <h4 className="mb-1">{achievementRate}%</h4>
          <h6 className="mb-0 text-capitalize">{performanceLevel} Performance</h6>
          <ProgressBar 
            variant={textColor === 'white' ? 'light' : bgVariant}
            now={achievementRate} 
            className="mt-3"
            style={{ height: '8px' }}
          />
        </Card.Body>
      </Card>
    );
  };

  /**
   * Render statistics overview cards
   */
  const renderOverviewCards = () => {
    const cards = [
      {
        title: 'Total Planning',
        value: statsData.totalPlanning || 0,
        icon: faTargetArrow,
        color: 'primary',
        description: 'Total planned activities'
      },
      {
        title: 'Achieved',
        value: statsData.totalAchieved || 0,
        icon: faCalendarCheck,
        color: 'success',
        description: 'Successfully completed'
      },
      {
        title: 'Outside Activities',
        value: statsData.totalOutside || 0,
        icon: faChartPie,
        color: 'warning',
        description: 'Additional activities'
      }
    ];

    return cards.map((card, index) => (
      <Col md={4} key={index}>
        <Card className="h-100 border-0 shadow-sm">
          <Card.Body className="text-center">
            <div className={`text-${card.color} mb-3`}>
              <FontAwesomeIcon icon={card.icon} size="2x" />
            </div>
            <h3 className="mb-1 text-dark">{card.value}</h3>
            <h6 className="text-muted mb-2">{card.title}</h6>
            <small className="text-muted">{card.description}</small>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  /**
   * Render weekly breakdown
   */
  const renderWeeklyBreakdown = () => {
    const weeklyStats = statsData.weeklyStats || [];
    
    if (weeklyStats.length === 0) {
      return (
        <Alert variant="info" className="text-center">
          <FontAwesomeIcon icon={faChartLine} className="me-2" />
          No weekly data available
        </Alert>
      );
    }

    return (
      <div className="weekly-breakdown">
        {weeklyStats.map((week, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={3}>
                  <h6 className="mb-1">{week.weekName}</h6>
                  <small className="text-muted">{week.dateRange}</small>
                </Col>
                <Col md={6}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small>Progress</small>
                    <small>{week.achievementRate}%</small>
                  </div>
                  <ProgressBar 
                    now={week.achievementRate} 
                    variant={week.achievementRate >= 80 ? 'success' : 
                            week.achievementRate >= 60 ? 'primary' : 
                            week.achievementRate >= 40 ? 'warning' : 'danger'}
                  />
                </Col>
                <Col md={3}>
                  <Row className="text-center">
                    <Col>
                      <small className="text-muted">Planned</small>
                      <div className="fw-bold">{week.totalPlanning}</div>
                    </Col>
                    <Col>
                      <small className="text-muted">Achieved</small>
                      <div className="fw-bold text-success">{week.totalAchieved}</div>
                    </Col>
                    <Col>
                      <small className="text-muted">Outside</small>
                      <div className="fw-bold text-warning">{week.totalOutside}</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  /**
   * Render daily insights
   */
  const renderDailyInsights = () => {
    const dailyStats = statsData.dailyStats || [];
    
    if (dailyStats.length === 0) {
      return (
        <Alert variant="info" className="text-center">
          <FontAwesomeIcon icon={faCalendarCheck} className="me-2" />
          No daily insights available
        </Alert>
      );
    }

    // Get top performing and underperforming days
    const sortedDays = [...dailyStats].sort((a, b) => b.achievementRate - a.achievementRate);
    const topDays = sortedDays.slice(0, 3);
    const bottomDays = sortedDays.slice(-3).reverse();

    return (
      <Row>
        <Col md={6}>
          <h6 className="text-success mb-3">
            <FontAwesomeIcon icon={faArrowUp} className="me-2" />
            Top Performing Days
          </h6>
          {topDays.map((day, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
              <div>
                <span className="fw-bold">{day.dayName}</span>
                <small className="text-muted ms-2">{day.date}</small>
              </div>
              <Badge bg="success">{day.achievementRate}%</Badge>
            </div>
          ))}
        </Col>
        <Col md={6}>
          <h6 className="text-warning mb-3">
            <FontAwesomeIcon icon={faArrowDown} className="me-2" />
            Needs Improvement
          </h6>
          {bottomDays.map((day, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
              <div>
                <span className="fw-bold">{day.dayName}</span>
                <small className="text-muted ms-2">{day.date}</small>
              </div>
              <Badge bg={day.achievementRate < 50 ? 'danger' : 'warning'}>
                {day.achievementRate}%
              </Badge>
            </div>
          ))}
        </Col>
      </Row>
    );
  };

  // Show placeholder if no data
  if (!planningData || Object.keys(statsData).length === 0) {
    return (
      <Alert variant="info" className="text-center">
        <FontAwesomeIcon icon={faChartLine} size="2x" className="mb-3 opacity-50" />
        <h5>No Statistics Available</h5>
        <p>Statistics will appear once you have planning data with activities.</p>
      </Alert>
    );
  }

  return (
    <div className="calculation-stats">
      {/* Performance Overview */}
      <Row className="mb-4">
        <Col md={3}>
          {renderPerformanceCard()}
        </Col>
        <Col md={9}>
          <Row>
            {renderOverviewCards()}
          </Row>
        </Col>
      </Row>

      {/* Weekly Breakdown */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                Weekly Breakdown
              </h5>
            </Card.Header>
            <Card.Body>
              {renderWeeklyBreakdown()}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Daily Insights */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faCalendarCheck} className="me-2" />
                Daily Insights
              </h5>
            </Card.Header>
            <Card.Body>
              {renderDailyInsights()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CalculationStats;
