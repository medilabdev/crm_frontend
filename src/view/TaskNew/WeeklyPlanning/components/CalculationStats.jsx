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
  faBullseye, 
  faCalendarCheck, 
  faTrophy,
  faChartPie,
  faArrowUp,
  faArrowDown,
  faMinus,
  faExclamationTriangle,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import { getPerformanceIndicator, formatPercentage } from '../utils/calculationUtils';

/**
 * Statistics dashboard component
 */
const CalculationStats = ({
  dashboardStats = {}
}) => {
    const statsData = useMemo(() => {
        // Default structure if dashboardStats is empty or invalid
        const defaultStats = {
            totals: { planned_activities: 0, completed_reports: 0, outside_activities: 0, total_reported: 0 },
            performance: { completion_rate: 0, outside_rate: 0, performance_level: 'none' },
            formatted: { completion_pct: '0%', outside_pct: '0%' },
            // Add derived performance details
            performanceDetails: { level: 'none', color: 'secondary', label: 'N/A', icon: faExclamationTriangle }
        };

        if (!dashboardStats || !dashboardStats.performance || !dashboardStats.totals) {
            return defaultStats;
        }

        // ✅ Get performance indicator using the CORRECT key from dashboardStats
        const performance = getPerformanceIndicator(dashboardStats.performance.completion_rate || 0);

        // Map icons based on performance level (example)
        let icon = faMinus;
        switch (performance.level) {
             case 'high': icon = faTrophy; break;
             case 'medium': icon = faArrowUp; break;
             // case 'low': icon = faMinus; break; // Keep faMinus for low/fair?
             case 'poor': icon = faArrowDown; break;
             default: icon = faExclamationTriangle;
        }

        return {
            // Spread the received stats
            totals: dashboardStats.totals,
            performance: dashboardStats.performance,
            formatted: dashboardStats.formatted,
            // Add derived performance details for easier rendering
            performanceDetails: {
                level: performance.level,
                color: performance.color, // Use color from indicator
                label: performance.label,
                icon: icon
            }
        };
    }, [dashboardStats]);

  /**
   * Render performance indicator card
   */
  const renderPerformanceCard = () => {
    const completionRate = statsData.performance.completion_rate || 0;
    const { level, color, label, icon } = statsData.performanceDetails;
    const textColor = ['success', 'primary', 'danger'].includes(color) ? 'white' : 'dark';
    
    return (
            // ✅ Use derived color for background
        <Card className={`bg-${color} text-${textColor} h-100 shadow-sm border-0`}>
            <Card.Body className="text-center">
                {/* ✅ Use derived icon */}
                <FontAwesomeIcon icon={icon} size="3x" className="mb-3 opacity-75" />
                {/* ✅ Use correct completion rate and format */}
                <h4 className="mb-1">{formatPercentage(completionRate)}</h4>
                {/* ✅ Use derived label */}
                <h6 className="mb-0 text-capitalize">{label}</h6>
                {/* ✅ Progress bar representing completion rate */}
                <ProgressBar
                    // Use 'light' variant for dark backgrounds, map color otherwise
                    variant={textColor === 'white' ? 'light' : color}
                    now={completionRate}
                    className="mt-3"
                    style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.3)' }} // Add subtle background
                />
            </Card.Body>
        </Card>
    );
  };

  /**
   * Render statistics overview cards
   */
    const renderOverviewCards = () => {
        const cardsData = [
            {
                title: 'Planned Activities',
                value: statsData.totals.planned_activities || 0, // Use planned_activities
                icon: faBullseye,
                color: 'primary',
                description: 'Total activities planned'
            },
            {
                title: 'Completed Reports', // Changed title for clarity
                value: statsData.totals.completed_reports || 0, // Use completed_reports
                icon: faCalendarCheck,
                color: 'success',
                description: 'Reports matching plan'
            },
            {
                title: 'Outside Activities',
                value: statsData.totals.outside_activities || 0, // Use outside_activities
                icon: faExternalLinkAlt, // Changed icon
                color: 'warning',
                description: 'Activities done outside plan'
            }
        ];

        return cardsData.map((card, index) => (
            <Col md={4} key={index} className="mb-3 mb-md-0"> {/* Add spacing */}
                <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center d-flex flex-column justify-content-center"> {/* Center content */}
                        <div className={`text-${card.color} mb-2`}> {/* Reduced margin */}
                            <FontAwesomeIcon icon={card.icon} size="2x" />
                        </div>
                        <h3 className="mb-0 text-dark fw-bold">{card.value}</h3> {/* Adjusted styling */}
                        <p className="text-muted mb-0 small">{card.title}</p> {/* Adjusted styling */}
                        {/* <small className="text-muted">{card.description}</small> // Description might be redundant */}
                    </Card.Body>
                </Card>
            </Col>
        ));
    };

  // Show placeholder if no data
    if (!statsData || !dashboardStats?.totals?.planned_activities || dashboardStats.totals.planned_activities === 0) {
        return (
            <Alert variant="light" className="text-center border py-4 mb-4">
                <FontAwesomeIcon icon={faChartLine} size="2x" className="mb-3 text-muted" />
                <h5>No Statistics Yet</h5>
                <p className="text-muted mb-0">Statistics will appear once planning activities are added.</p>
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

        </div>
    );
};

export default CalculationStats;
