import React from 'react';
import { Card, Row, Col, Table, Badge, Alert } from 'react-bootstrap';

const WeeklyPlanningPreview = ({ planningData }) => {
    // Default data jika planningData tidak ada
    const defaultData = {
        marketing_name: '',
        branch: '',
        month: new Date(),
        weeks: []
    };

    const data = planningData || defaultData;

    // Calculate summary metrics
    const calculateSummary = () => {
        let totalActivities = 0;
        let totalCustomerVisits = 0;
        let weeklyBreakdown = [];
        let activityTypeBreakdown = {};
        let customerList = new Set();

        data.weeks.forEach(week => {
            let weekActivities = 0;
            week.days.forEach(day => {
                weekActivities += day.activities.length;
                totalActivities += day.activities.length;
                
                day.activities.forEach(activity => {
                    // Count customer visits
                    if (activity.activity_type === 'customer_visit') {
                        totalCustomerVisits++;
                    }
                    
                    // Activity type breakdown
                    if (activityTypeBreakdown[activity.activity_type]) {
                        activityTypeBreakdown[activity.activity_type]++;
                    } else {
                        activityTypeBreakdown[activity.activity_type] = 1;
                    }
                    
                    // Unique customers
                    customerList.add(activity.customer_name);
                });
            });
            
            weeklyBreakdown.push({
                weekNumber: week.weekNumber,
                startDate: week.startDate,
                endDate: week.endDate,
                totalActivities: weekActivities
            });
        });

        return {
            totalActivities,
            totalCustomerVisits,
            uniqueCustomers: customerList.size,
            weeklyBreakdown,
            activityTypeBreakdown
        };
    };

    const summary = calculateSummary();
    
    const activityTypeLabels = {
        'customer_visit': 'Customer Visit',
        'phone_call': 'Phone Call',
        'presentation': 'Presentation',
        'follow_up': 'Follow Up',
        'meeting': 'Meeting',
        'others': 'Others'
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short'
        });
    };

    const getActivityTypeColor = (type) => {
        const colors = {
            'customer_visit': 'primary',
            'phone_call': 'success', 
            'presentation': 'warning',
            'follow_up': 'info',
            'meeting': 'secondary',
            'others': 'light'
        };
        return colors[type] || 'light';
    };

    return (
        <Card className="shadow">
            <Card.Header>
                <Card.Title className="mb-0">Planning Preview & Summary</Card.Title>
            </Card.Header>
            <Card.Body>
                {/* Header Information */}
                <Row className="mb-4">
                    <Col md={3}>
                        <div className="border rounded p-3 text-center">
                            <h6 className="text-muted mb-1">Marketing</h6>
                            <strong>{data.marketing_name || 'Not Selected'}</strong>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="border rounded p-3 text-center">
                            <h6 className="text-muted mb-1">Branch</h6>
                            <strong>{data.branch || 'Not Selected'}</strong>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="border rounded p-3 text-center">
                            <h6 className="text-muted mb-1">Month</h6>
                            <strong>
                                {data.month ? 
                                    data.month.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) 
                                    : 'Not Selected'
                                }
                            </strong>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="border rounded p-3 text-center">
                            <h6 className="text-muted mb-1">Status</h6>
                            <Badge bg="warning">Draft</Badge>
                        </div>
                    </Col>
                </Row>

                {/* Summary Metrics */}
                <Row className="mb-4">
                    <Col md={12}>
                        <h5>Summary Metrics</h5>
                    </Col>
                    <Col md={3}>
                        <Card className="bg-primary text-white">
                            <Card.Body className="text-center">
                                <h3>{summary.totalActivities}</h3>
                                <small>Total Activities</small>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="bg-success text-white">
                            <Card.Body className="text-center">
                                <h3>{summary.totalCustomerVisits}</h3>
                                <small>Customer Visits</small>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="bg-info text-white">
                            <Card.Body className="text-center">
                                <h3>{summary.uniqueCustomers}</h3>
                                <small>Unique Customers</small>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="bg-warning text-white">
                            <Card.Body className="text-center">
                                <h3>{data.weeks.length}</h3>
                                <small>Planned Weeks</small>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Activity Type Breakdown */}
                <Row className="mb-4">
                    <Col md={6}>
                        <h6>Activity Type Breakdown</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {Object.entries(summary.activityTypeBreakdown).map(([type, count]) => (
                                <Badge 
                                    key={type} 
                                    bg={getActivityTypeColor(type)}
                                    className="p-2"
                                >
                                    {activityTypeLabels[type]}: {count}
                                </Badge>
                            ))}
                        </div>
                    </Col>
                    <Col md={6}>
                        <h6>Weekly Distribution</h6>
                        <Table size="sm" striped>
                            <thead>
                                <tr>
                                    <th>Week</th>
                                    <th>Period</th>
                                    <th>Activities</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summary.weeklyBreakdown.map(week => (
                                    <tr key={week.weekNumber}>
                                        <td>Week {week.weekNumber}</td>
                                        <td>
                                            {formatDate(week.startDate)} - {formatDate(week.endDate)}
                                        </td>
                                        <td>
                                            <Badge bg={week.totalActivities > 0 ? 'success' : 'secondary'}>
                                                {week.totalActivities}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* Detailed Weekly View */}
                <Row>
                    <Col md={12}>
                        <h6>Detailed Planning</h6>
                        {data.weeks.length === 0 ? (
                            <Alert variant="info">
                                No weekly planning data available. Please create a planning first.
                            </Alert>
                        ) : (
                            data.weeks.map(week => (
                            <Card key={week.weekNumber} className="mb-3">
                                <Card.Header className="bg-light">
                                    <strong>Week {week.weekNumber}</strong> 
                                    <span className="ms-2 text-muted">
                                        ({formatDate(week.startDate)} - {formatDate(week.endDate)})
                                    </span>
                                    <Badge bg="secondary" className="ms-auto">
                                        {week.days.reduce((total, day) => total + day.activities.length, 0)} activities
                                    </Badge>
                                </Card.Header>
                                <Card.Body>
                                    <Table size="sm" responsive>
                                        <thead>
                                            <tr>
                                                <th>Day</th>
                                                <th>Date</th>
                                                <th>Activities</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {week.days.map(day => (
                                                <tr key={day.date}>
                                                    <td>{day.dayName}</td>
                                                    <td>{formatDate(day.date)}</td>
                                                    <td>
                                                        {day.activities.length === 0 ? (
                                                            <span className="text-muted">No activities planned</span>
                                                        ) : (
                                                            <div>
                                                                {day.activities.map((activity, index) => (
                                                                    <div key={index} className="mb-1">
                                                                        <Badge bg={getActivityTypeColor(activity.activity_type)} className="me-1">
                                                                            {activityTypeLabels[activity.activity_type]}
                                                                        </Badge>
                                                                        <strong>{activity.customer_name}</strong>
                                                                        {activity.planned_time && (
                                                                            <small className="text-muted ms-1">
                                                                                @ {activity.planned_time}
                                                                            </small>
                                                                        )}
                                                                        {activity.notes && (
                                                                            <div className="small text-muted">
                                                                                {activity.notes}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        ))
                        )}
                    </Col>
                </Row>

                {/* Validation Alerts */}
                {summary.totalActivities === 0 && (
                    <Alert variant="warning">
                        <strong>Warning:</strong> No activities planned. Please add some activities before saving.
                    </Alert>
                )}
                
                {summary.totalCustomerVisits < 5 && summary.totalActivities > 0 && (
                    <Alert variant="info">
                        <strong>Suggestion:</strong> Consider adding more customer visits for better sales performance.
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
};

export default WeeklyPlanningPreview;