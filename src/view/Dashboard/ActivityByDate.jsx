import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Card, Col, Row } from 'react-bootstrap';
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
            link.setAttribute('download', `daily_activity_report_${formattedDate}.xlsx`); // Nama file dinamis
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
    
    const columns = [
        { name: 'Deal Name', selector: row => row.deal_name, sortable: true, wrap: true },
        { name: 'Owner', selector: row => row.owner, sortable: true },
        { name: 'Stage', selector: row => row.stage, sortable: true },
        { name: 'Type', selector: row => row.type, sortable: true },
        { name: 'Time', selector: row => row.date.split(' ')[1], sortable: true },
        { name: 'Update / Note', selector: row => row.update, wrap: true, grow: 2 },
        {
            name: 'File',
            cell: row => row.file ? (
                <a href={`${process.env.REACT_APP_BACKEND_IMAGE}/${row.file.path}`} target="_blank" rel="noopener noreferrer">
                    {row.file.name}
                </a>
            ) : '-'
        },
        {
            name: 'Task',
            cell: row => row.task ? (
                <Button variant="info" size="sm" onClick={() => handleShowTaskModal(row.task)}>
                    View Task
                </Button>
            ) : '-'
        },
    ];

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

                <DataTable
                    title={reportData.length > 0 ? `Activities on ${selectedDate.toLocaleDateString('id-ID')}` : ""}
                    columns={columns}
                    data={reportData}
                    pagination
                    highlightOnHover
                    responsive
                    noDataComponent={!isLoading && "No activities found for the selected date."}
                />
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