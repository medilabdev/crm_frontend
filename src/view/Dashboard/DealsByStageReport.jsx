// src/view/Dashboard/DealsByStageReport.jsx

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const DealsByStageReport = () => {
    const token = localStorage.getItem('token');
    const [stagesList, setStagesList] = useState([]); // Untuk opsi di filter
    const [reportData, setReportData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStageName, setSelectedStageName] = useState('');

    // Mengambil daftar stage untuk mengisi filter dropdown
    useEffect(() => {
        const fetchStages = async () => {
            try {
                // Asumsi endpoint untuk mengambil daftar stage adalah /api/staging-masters
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/staging-masters`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Ubah format data agar sesuai dengan react-select
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

    // Fungsi yang dipanggil saat pengguna memilih stage dari dropdown
    const handleGenerateReport = async (selectedOption) => {
        if (!selectedOption) {
            setReportData([]);
            setSelectedStageName('');
            return;
        }

        const stagingUid = selectedOption.value;
        setSelectedStageName(selectedOption.label);
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