// src/view/Dashboard/DealsByStageReport.jsx

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Card, Button, Accordion, Table } from 'react-bootstrap';
import axios from 'axios';

const DealsByStageReport = () => {
    const token = localStorage.getItem('token');
    const [stagesList, setStagesList] = useState([]); // Untuk opsi di filter
    const [reportData, setReportData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStageName, setSelectedStageName] = useState('');
    const [selectedStageUid, setSelectedStageUid] = useState('');

    const userRole = localStorage.getItem('role_name');
    const userPosition = localStorage.getItem('position_name');
    const canExport = userRole?.toLowerCase() === 'owner' || userPosition?.toLowerCase() === 'direktur';

    useEffect(() => {
        const fetchStages = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/staging-masters`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const formattedStages = response.data.data.map(stage => ({
                    value: stage.uid,
                    label: stage.name,
                }));
                setStagesList(formattedStages);
            } catch (error) {
                console.error("Failed to fetch stages list:", error);
            }
        };
        fetchStages();
    }, [token]);

    const handleGenerateReport = async (selectedOption) => {
        if (!selectedOption) {
            setReportData([]);
            setSelectedStageName('');
            setSelectedStageUid('');
            return;
        }

        const stagingUid = selectedOption.value;
        setSelectedStageName(selectedOption.label);
        setSelectedStageUid(stagingUid);
        setIsLoading(true);
        setReportData([]);

        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reports/performance/deals-by-stage?staging_uid=${stagingUid}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReportData(response.data.data); 
        } catch (error) {
            console.error("Failed to generate deals by stage report:", error);
            alert("Failed to generate report.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExport = async () => {
        if (!selectedStageUid) return;

        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reports/performance/deals-by-stage/export?staging_uid=${selectedStageUid}`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob',
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `deals_in_stage_${selectedStageName}.xlsx`); 
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Failed to export report:", error);
            alert("Failed to export report.");
        }
    };

    const formatCurrency = (value) => {
        return `Rp ${Number(value).toLocaleString('id-ID')}`;
    };

    const renderProductDetails = (products) => {
        if (!products || products.length === 0) {
            return <span className="text-muted">No products</span>;
        }

        return products.map((product, index) => (
            <div key={index} className="mb-1">
                <strong>{product.product_name}</strong>
                <br />
                <small className="text-muted">
                    Qty: {product.quantity} | Unit: {formatCurrency(product.unit_price)} | 
                    Total: {formatCurrency(product.total_price)}
                </small>
            </div>
        ));
    };

    return (
        <Card className="shadow">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">Deals by Stage Report</Card.Title>
                {canExport && (
                    <Button variant="success" size="sm" onClick={handleExport} disabled={!selectedStageUid || isLoading}>
                        Export to Excel
                    </Button>
                )}
            </Card.Header>
            <Card.Body>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="mb-1">Select Stage</label>
                        <Select
                            options={stagesList}
                            onChange={handleGenerateReport}
                            isClearable
                            placeholder="Choose a stage..."
                        />
                    </div>
                </div>

                {isLoading && <p>Loading report...</p>}

                {reportData.length > 0 && (
                    <div className="mt-3">
                        <h5 className="mb-3">Deals in Stage: {selectedStageName}</h5>
                        <Accordion>
                            {reportData.map((company, companyIndex) => (
                                <Accordion.Item eventKey={companyIndex.toString()} key={companyIndex}>
                                    <Accordion.Header>
                                        <div className="d-flex justify-content-between w-100 me-3">
                                            <strong>{company.company_name}</strong>
                                            <span className="badge bg-primary ms-2">
                                                {company.deals.length} deal{company.deals.length > 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>Sales Name</th>
                                                    <th>Deal Name</th>
                                                    <th>Products</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {company.deals.map((deal, dealIndex) => (
                                                    <tr key={dealIndex}>
                                                        <td>{deal.sales_name}</td>
                                                        <td>{deal.deal_name}</td>
                                                        <td>
                                                            {renderProductDetails(deal.products)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </div>
                )}

                {!isLoading && reportData.length === 0 && selectedStageName && (
                    <div className="text-center text-muted mt-4">
                        <p>No deals found in this stage.</p>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default DealsByStageReport;