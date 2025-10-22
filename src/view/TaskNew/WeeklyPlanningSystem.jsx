import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import WeeklyPlanningForm from './WeeklyPlanningForm';
import WeeklyPlanningPreview from './WeeklyPlanningPreview';
import WeeklyPlanningReportMockup from './WeeklyPlanningReportMockup';

const WeeklyPlanningSystem = () => {
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
                    <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                        <Nav variant="tabs" className="mb-4">
                            <Nav.Item>
                                <Nav.Link eventKey="planning">
                                    📝 Weekly Planning
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="preview">
                                    👁️ Preview & Summary
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="report">
                                    📊 Performance Report
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

export default WeeklyPlanningSystem;