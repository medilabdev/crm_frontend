// src/view/Dashboard/ActivityByDate.jsx

import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Style untuk date picker
import TaskDetailModal from './TaskDetailModal'; // Sesuaikan path jika perlu

const ActivityByDate = () => {
    const token = localStorage.getItem('token');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reportData, setReportData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    // Fungsi yang dipanggil saat tombol "Generate Report" di-klik
    const handleGenerateReport = async () => {
        if (!selectedDate) {
            alert("Please select a date.");
            return;
        }

        setIsLoading(true);
        setReportData([]);

        // Format tanggal menjadi YYYY-MM-DD untuk dikirim ke backend
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

    const handleShowTaskModal = (task) => { /* ... (fungsi sama seperti sebelumnya) ... */ };
    const handleCloseTaskModal = () => { /* ... (fungsi sama seperti sebelumnya) ... */ };
    
    // Kolom untuk tabel report, sekarang menyertakan Deal Name, Owner, dan Stage
    const columns = [
        { name: 'Deal Name', selector: row => row.deal_name, sortable: true, wrap: true },
        { name: 'Owner', selector: row => row.owner, sortable: true },
        { name: 'Stage', selector: row => row.stage, sortable: true },
        { name: 'Time', selector: row => row.date.split(' ')[1], sortable: true }, // Ambil jam-nya saja
        { name: 'Update / Note', selector: row => row.update, wrap: true, grow: 2 },
        // ... Kolom File dan Task sama seperti sebelumnya
    ];

    return (
        <Card className="shadow">
            <Card.Header>
                <Card.Title>Activity Report by Date</Card.Title>
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
                    <DataTable
                        title={`Activities on ${selectedDate.toLocaleDateString('id-ID')}`}
                        columns={columns}
                        data={reportData}
                        pagination
                        highlightOnHover
                        responsive
                    />
                )}
            </Card.Body>
        </Card>
    );
};

export default ActivityByDate;