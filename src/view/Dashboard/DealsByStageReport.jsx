// src/view/Dashboard/DealsByStageReport.jsx

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { Card, Button } from 'react-bootstrap';
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
            link.setAttribute('download', `deals_in_stage_${selectedStageName}.xlsx`); // Nama file dinamis
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Failed to export report:", error);
            alert("Failed to export report.");
        }
    };


    // Definisi kolom untuk tabel
    const columns = [
        { name: 'Sales & Deal Name', selector: row => row.sales_deal_name, sortable: true, grow: 2, wrap: true },
        { name: 'Products', selector: row => row.products, sortable: true, grow: 2, wrap: true },
        { 
            name: 'Project Value', 
            selector: row => `Rp ${Number(row.project_value).toLocaleString('id-ID')}`,
            sortable: true,
            right: true, // Rata kanan untuk angka
        },
    ];

    return (
        <Card className="shadow">
            <Card.Header>
                <Card.Title>Deals by Stage Report</Card.Title>
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

                {(reportData.length > 0 || !isLoading && selectedStageName) && (
                    <DataTable
                        title={`Deals in Stage: ${selectedStageName}`}
                        columns={columns}
                        data={reportData}
                        pagination
                        highlightOnHover
                        responsive
                        noDataComponent="No deals found in this stage."
                    />
                )}
            </Card.Body>
        </Card>
    );
};

export default DealsByStageReport;