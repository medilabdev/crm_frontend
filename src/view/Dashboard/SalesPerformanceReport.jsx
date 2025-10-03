import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';

const SalesPerformanceReport = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role_name');
    const userPosition = localStorage.getItem('position_name');

    const [reportData, setReportData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const canExport = userRole?.toLowerCase() === 'owner' || userPosition?.toLowerCase() === 'direktur';

    useEffect(() => {
        const fetchReport = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reports/performance/sales-summary`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setReportData(response.data.data);
            } catch (error) {
                console.error("Failed to fetch sales performance report:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReport();
    }, [token]);

    const handleExport = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reports/performance/sales-summary/export`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'sales_performance_summary.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

        } catch (error) {
            console.error("Failed to export report:", error);
            return;
        }
    }

    if (isLoading) {
        return <p>Loading sales performance report...</p>;
    }

    if (!reportData || reportData.data.length === 0) {
        return <p>No data available for this report.</p>;
    }

    return (
        <Card className="shadow">
            <Card.Header>
                <Card.Title>Sales Performance Summary</Card.Title>
                {canExport && (
                    <Button variant="success" size="sm" onClick={handleExport}>
                        Export to Excel
                    </Button>
                )}

            </Card.Header>
            <Card.Body>
                {/* Kita gunakan komponen Table dari react-bootstrap untuk styling */}
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            {/* Kolom pertama statis untuk nama Sales */}
                            <th>Sales</th>
                            {/* Loop melalui array 'headers' untuk membuat header kolom secara dinamis */}
                            {reportData.headers.map(header => (
                                <th key={header}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Loop melalui array 'data' untuk membuat setiap baris */}
                        {reportData.data.map(salesRow => (
                            <tr key={salesRow.sales_name}>
                                {/* Sel pertama adalah nama Sales */}
                                <td>{salesRow.sales_name}</td>
                                {/* Loop lagi melalui 'headers' untuk memastikan urutan sel benar */}
                                {reportData.headers.map(header => (
                                    <td key={`${salesRow.sales_name}-${header}`}>
                                        {salesRow[header]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default SalesPerformanceReport;