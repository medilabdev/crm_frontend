import React, { useState } from 'react';
import { Card, Row, Col, Table, Badge, ProgressBar, Alert, Tabs, Tab } from 'react-bootstrap';

const WeeklyPlanningReportMockup = () => {
    // Mock data untuk simulasi report dengan planning vs execution
    const [reportData] = useState({
        marketing_name: "Ayu",
        branch: "Cempaka Putih", 
        month: "April 2025",
        generated_at: new Date(),
        
        // Summary Metrics (seperti di Excel)
        metrics: {
            planning: 45,
            planning_percentage: 82.22,
            on_planning: 21,
            on_planning_percentage: 46.67,
            off_planning: 16, 
            off_planning_percentage: 35.56,
            total_cust_visit: 0,
            total_cust_visit_percentage: 0.00,
            total_visit: 37,
            repetition_percentage: 0.00,
            total_cust_planned: 39,
            total_cust_planned_percentage: 86.67,
            assurance_visited: 9,
            company_visited: 2,
            others_visited: 26
        },
        
        // Weekly breakdown
        weekly_details: [
            {
                week_number: 1,
                period: "1-4 Apr",
                planned_activities: 12,
                executed_activities: 10,
                on_time: 7,
                late: 2,
                cancelled: 1,
                customer_visits: 8
            },
            {
                week_number: 2, 
                period: "7-11 Apr",
                planned_activities: 10,
                executed_activities: 9,
                on_time: 6,
                late: 2,
                cancelled: 1,
                customer_visits: 6
            },
            {
                week_number: 3,
                period: "14-18 Apr", 
                planned_activities: 8,
                executed_activities: 6,
                on_time: 4,
                late: 1,
                cancelled: 1,
                customer_visits: 4
            },
            {
                week_number: 4,
                period: "21-25 Apr",
                planned_activities: 15,
                executed_activities: 12,
                on_time: 8,
                late: 3,
                cancelled: 1,
                customer_visits: 9
            }
        ],
        
        // Customer categorization
        customer_breakdown: {
            assurance: [
                { name: "PT Asuransi ABC", visits: 3, type: "customer_visit" },
                { name: "PT Prudential", visits: 2, type: "customer_visit" },
                { name: "PT Allianz", visits: 4, type: "phone_call" }
            ],
            company: [
                { name: "PT Pertamina", visits: 1, type: "presentation" },
                { name: "PT PLN", visits: 1, type: "customer_visit" }
            ],
            others: [
                { name: "Toko Maju Jaya", visits: 5, type: "customer_visit" },
                { name: "CV Sukses Mandiri", visits: 3, type: "follow_up" },
                { name: "PT Kecil Menengah", visits: 4, type: "customer_visit" }
            ]
        }
    });

    const getPerformanceColor = (percentage) => {
        if (percentage >= 80) return 'success';
        if (percentage >= 60) return 'warning'; 
        return 'danger';
    };

    const getAlertLevel = (percentage) => {
        if (percentage >= 80) return 'success';
        if (percentage >= 60) return 'warning';
        return 'danger';
    };

    return (
        <Card className="shadow">
            <Card.Header>
                <Card.Title className="mb-0">Monthly Performance Report</Card.Title>
                <small className="text-muted">
                    {reportData.marketing_name} - {reportData.branch} - {reportData.month}
                </small>
            </Card.Header>
            <Card.Body>
                {/* Key Performance Metrics */}
                <Row className="mb-4">
                    <Col md={12}>
                        <h5>Key Performance Indicators</h5>
                    </Col>
                    <Col md={3}>
                        <Card className={`border-${getPerformanceColor(reportData.metrics.planning_percentage)}`}>
                            <Card.Body className="text-center">
                                <h4 className={`text-${getPerformanceColor(reportData.metrics.planning_percentage)}`}>
                                    {reportData.metrics.planning}
                                </h4>
                                <p className="mb-1">PLANNING</p>
                                <small className={`text-${getPerformanceColor(reportData.metrics.planning_percentage)}`}>
                                    {reportData.metrics.planning_percentage}%
                                </small>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className={`border-${getPerformanceColor(reportData.metrics.on_planning_percentage)}`}>
                            <Card.Body className="text-center">
                                <h4 className={`text-${getPerformanceColor(reportData.metrics.on_planning_percentage)}`}>
                                    {reportData.metrics.on_planning}
                                </h4>
                                <p className="mb-1">ON PLANNING</p>
                                <small className={`text-${getPerformanceColor(reportData.metrics.on_planning_percentage)}`}>
                                    {reportData.metrics.on_planning_percentage}%
                                </small>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className={`border-${getPerformanceColor(100 - reportData.metrics.off_planning_percentage)}`}>
                            <Card.Body className="text-center">
                                <h4 className={`text-${getPerformanceColor(100 - reportData.metrics.off_planning_percentage)}`}>
                                    {reportData.metrics.off_planning}
                                </h4>
                                <p className="mb-1">OFF PLANNING</p>
                                <small className={`text-${getPerformanceColor(100 - reportData.metrics.off_planning_percentage)}`}>
                                    {reportData.metrics.off_planning_percentage}%
                                </small>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="border-info">
                            <Card.Body className="text-center">
                                <h4 className="text-info">{reportData.metrics.total_visit}</h4>
                                <p className="mb-1">TOTAL VISIT</p>
                                <small className="text-muted">
                                    {reportData.metrics.total_cust_visit_percentage}%
                                </small>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Additional Metrics */}
                <Row className="mb-4">
                    <Col md={3}>
                        <div className="border rounded p-3">
                            <h6 className="text-muted">TOTAL CUST PLANNED</h6>
                            <h4>{reportData.metrics.total_cust_planned}</h4>
                            <small className="text-success">{reportData.metrics.total_cust_planned_percentage}%</small>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="border rounded p-3">
                            <h6 className="text-muted">ASSURANCE VISITED</h6>
                            <h4>{reportData.metrics.assurance_visited}</h4>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="border rounded p-3">
                            <h6 className="text-muted">COMPANY VISITED</h6>
                            <h4>{reportData.metrics.company_visited}</h4>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="border rounded p-3">
                            <h6 className="text-muted">OTHERS VISITED</h6>
                            <h4>{reportData.metrics.others_visited}</h4>
                        </div>
                    </Col>
                </Row>

                {/* Performance Alerts */}
                <Row className="mb-4">
                    <Col md={12}>
                        {reportData.metrics.planning_percentage < 80 && (
                            <Alert variant={getAlertLevel(reportData.metrics.planning_percentage)}>
                                <strong>⚠️ Performance Alert:</strong> Planning percentage is below target (80%). 
                                Current: {reportData.metrics.planning_percentage}%
                            </Alert>
                        )}
                        {reportData.metrics.on_planning_percentage < 60 && (
                            <Alert variant="warning">
                                <strong>📊 Time Management:</strong> On-time execution rate needs improvement. 
                                Current: {reportData.metrics.on_planning_percentage}%
                            </Alert>
                        )}
                    </Col>
                </Row>

                {/* Detailed Tabs */}
                <Tabs defaultActiveKey="weekly" className="mb-3">
                    <Tab eventKey="weekly" title="Weekly Breakdown">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Week</th>
                                    <th>Period</th>
                                    <th>Planned</th>
                                    <th>Executed</th>
                                    <th>On Time</th>
                                    <th>Late</th>
                                    <th>Cancelled</th>
                                    <th>Customer Visits</th>
                                    <th>Success Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.weekly_details.map(week => {
                                    const successRate = ((week.executed_activities / week.planned_activities) * 100).toFixed(1);
                                    return (
                                        <tr key={week.week_number}>
                                            <td>Week {week.week_number}</td>
                                            <td>{week.period}</td>
                                            <td>{week.planned_activities}</td>
                                            <td>{week.executed_activities}</td>
                                            <td>
                                                <Badge bg="success">{week.on_time}</Badge>
                                            </td>
                                            <td>
                                                <Badge bg="warning">{week.late}</Badge>
                                            </td>
                                            <td>
                                                <Badge bg="danger">{week.cancelled}</Badge>
                                            </td>
                                            <td>{week.customer_visits}</td>
                                            <td>
                                                <ProgressBar 
                                                    now={successRate} 
                                                    variant={getPerformanceColor(successRate)}
                                                    style={{ height: '20px' }}
                                                />
                                                <small>{successRate}%</small>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Tab>

                    <Tab eventKey="customers" title="Customer Analysis">
                        <Row>
                            <Col md={4}>
                                <h6>Assurance Customers</h6>
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>Customer</th>
                                            <th>Visits</th>
                                            <th>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.customer_breakdown.assurance.map((customer, index) => (
                                            <tr key={index}>
                                                <td>{customer.name}</td>
                                                <td>{customer.visits}</td>
                                                <td>
                                                    <Badge bg="primary" size="sm">
                                                        {customer.type.replace('_', ' ')}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col md={4}>
                                <h6>Company Customers</h6>
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>Customer</th>
                                            <th>Visits</th>
                                            <th>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.customer_breakdown.company.map((customer, index) => (
                                            <tr key={index}>
                                                <td>{customer.name}</td>
                                                <td>{customer.visits}</td>
                                                <td>
                                                    <Badge bg="success" size="sm">
                                                        {customer.type.replace('_', ' ')}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col md={4}>
                                <h6>Others</h6>
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>Customer</th>
                                            <th>Visits</th>
                                            <th>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.customer_breakdown.others.map((customer, index) => (
                                            <tr key={index}>
                                                <td>{customer.name}</td>
                                                <td>{customer.visits}</td>
                                                <td>
                                                    <Badge bg="info" size="sm">
                                                        {customer.type.replace('_', ' ')}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Tab>

                    <Tab eventKey="formulas" title="Calculation Details">
                        <Card className="bg-light">
                            <Card.Body>
                                <h6>Formula Reference</h6>
                                <ul className="list-unstyled">
                                    <li><strong>PLANNING %:</strong> (Executed Activities / Planned Activities) × 100</li>
                                    <li><strong>ON PLANNING %:</strong> (On Time Executions / Total Executions) × 100</li>
                                    <li><strong>OFF PLANNING %:</strong> (Late + Cancelled / Total Executions) × 100</li>
                                    <li><strong>TOTAL CUST VISIT %:</strong> (Actual Visits / Target Visits) × 100</li>
                                    <li><strong>REPETITION %:</strong> (Repeat Customers / Total Customers) × 100</li>
                                    <li><strong>TOTAL CUST PLANNED %:</strong> (Customers with Plans / Total Customers) × 100</li>
                                </ul>
                                
                                <h6 className="mt-3">Customer Categories</h6>
                                <ul className="list-unstyled">
                                    <li><strong>Assurance:</strong> Insurance companies and related businesses</li>
                                    <li><strong>Company:</strong> Large corporations and government entities</li>
                                    <li><strong>Others:</strong> SMEs, retail, and miscellaneous businesses</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Tab>
                </Tabs>

                <div className="text-muted text-center mt-4">
                    <small>Report generated on {reportData.generated_at.toLocaleString('id-ID')}</small>
                </div>
            </Card.Body>
        </Card>
    );
};

export default WeeklyPlanningReportMockup;