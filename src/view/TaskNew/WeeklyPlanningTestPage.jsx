import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Alert } from 'react-bootstrap';
import WeeklyPlanningForm from './WeeklyPlanningForm';
import WeeklyPlanningPreview from './WeeklyPlanningPreview';
import WeeklyPlanningReportMockup from './WeeklyPlanningReportMockup';

const WeeklyPlanningTestPage = () => {
    const [planningData, setPlanningData] = useState({
        marketing_name: '',
        branch: '',
        month: new Date(),
        weeks: []
    });

    const [activeTab, setActiveTab] = useState('planning');

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Alert variant="info" className="mb-4">
                        <strong>🧪 Testing Mode:</strong> This is a mockup for client demonstration. 
                        Save functionality and real data integration will be implemented after client approval.
                    </Alert>

                    <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                        <Nav variant="tabs" className="mb-4">
                            <Nav.Item>
                                <Nav.Link eventKey="planning">
                                    📝 Weekly Planning Form
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="preview">
                                    👁️ Preview & Summary
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="report">
                                    📊 Performance Report (Mock)
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            <Tab.Pane eventKey="planning">
                                <WeeklyPlanningForm 
                                    planningData={planningData}
                                    setPlanningData={setPlanningData}
                                />
                            </Tab.Pane>
                            
                            <Tab.Pane eventKey="preview">
                                <WeeklyPlanningPreview 
                                    planningData={planningData}
                                />
                            </Tab.Pane>
                            
                            <Tab.Pane eventKey="report">
                                <WeeklyPlanningReportMockup />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
    );
};

export default WeeklyPlanningTestPage;