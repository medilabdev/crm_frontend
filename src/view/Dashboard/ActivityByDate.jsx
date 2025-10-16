import React, { useState } from 'react';
import { Button, Card, Col, Row, Accordion, Table, Badge } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskDetailModal from './TaskDetailModal';

const ActivityByDate = () => {
    const token = localStorage.getItem('token');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reportData, setReportData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const userRole = localStorage.getItem('role_name');
    const userPosition = localStorage.getItem('position_name');
    const canExport = userRole?.toLowerCase() === 'owner' || userPosition?.toLowerCase() === 'direktur';

    const handleGenerateReport = async () => {
        if (!selectedDate) {
            alert("Please select a date.");
            return;
        }
        setIsLoading(true);
        setReportData([]);
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reports/activity-by-date?date=${formattedDate}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReportData(response.data.data);
        } catch (error) {
            console.error("Failed to generate report by date:", error);
            alert("Failed to generate report.");
        } finally {
            setIsLoading(false);
         }
    };

    const handleExport = async () => {
        if (!selectedDate) return;

        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reports/activity-by-date/export?date=${formattedDate}`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `daily_activity_report_${formattedDate}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Failed to export report:", error);
            alert("Failed to export report.");
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

    const getTotalActivities = () => {
        return reportData.reduce((total, company) => total + company.total_activities, 0);
    };

    return (
        <>
        <Card className="shadow">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">Activity Report by Date</Card.Title>
                {canExport && (
                    <Button variant="success" size="sm" onClick={handleExport} disabled={reportData.length === 0}>
                        Export to Excel
                    </Button>
                )}
            </Card.Header>
            <Card.Body>
                <Row className="align-items-end">
                    <Col md={4}>
                        <label className="mb-1">Select Date</label>
                        <DatePicker 
                            selected={selectedDate} 
                            onChange={(date) => setSelectedDate(date)}
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                        />
                    </Col>
                    <Col md={4}>
                        <Button onClick={handleGenerateReport} disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Generate Report'}
                        </Button>
                    </Col>
                </Row>

                <hr />

                {reportData.length > 0 && (
                    <div className="mb-3">
                        <h5>Activities on {selectedDate.toLocaleDateString('id-ID')}</h5>
                        <p className="text-muted">
                            Total: {getTotalActivities()} activities from {reportData.length} companies
                        </p>
                    </div>
                )}

                {!isLoading && reportData.length === 0 && (
                    <div className="text-center text-muted py-4">
                        No activities found for the selected date.
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
                                                <th>Time</th>
                                                <th>Owner</th>
                                                <th>Stage</th>
                                                <th>Update / Note</th>
                                                <th>File</th>
                                                <th>Task</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {company.activities.map((activity, actIndex) => (
                                                <tr key={actIndex}>
                                                    
                                                    <td>{activity.date.split(' ')[1]}</td>
                                                    <td>{activity.owner}</td>
                                                    <td>{activity.stage}</td>
                                                    <td style={{maxWidth: '300px', wordWrap: 'break-word'}}>
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
                                                        ) : '-'}
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
                                                        ) : '-'}
                                                    </td>
                                                </tr>
                                            ))}
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