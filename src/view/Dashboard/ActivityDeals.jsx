import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import TaskDetailModal from './TaskDetailModal'; // Pastikan path ini benar

const ActivityDeals = () => {
    const token = localStorage.getItem('token');
    const [dealsList, setDealsList] = useState([]);
    const [reportData, setReportData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchDealsForFilter = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/deals/form/select`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const formattedDeals = response.data.data.map(deal => ({
                    value: deal.uid,
                    label: deal.deal_name,
                }));
                setDealsList(formattedDeals);
            } catch (error) {
                console.error("Failed to fetch deals list:", error);
            }
        };
        fetchDealsForFilter();
    }, [token]);

    const handleGenerateReport = async (selectedOption) => {
        if (!selectedOption) {
            setReportData(null);
            return;
        }
        
        const dealUid = selectedOption.value;
        setIsLoading(true);
        setReportData(null);

        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reports/activity?deal_uid=${dealUid}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReportData(response.data.data); 
        } catch (error) {
            console.error("Failed to generate report:", error);
            alert("Failed to generate report.");
        } finally {
            setIsLoading(false);
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
        { name: 'Date', selector: row => row.date, sortable: true },
        { name: 'Duration (Days)', selector: row => row.duration_days, sortable: true },
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
                <Card.Header>
                    <Card.Title>Activity Report</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="mb-1">Select Deal to Generate Report</label>
                            <Select
                                options={dealsList}
                                onChange={handleGenerateReport}
                                isClearable
                                placeholder="Choose a deal..."
                            />
                        </div>
                    </div>

                    {isLoading && <p>Loading report...</p>}

                    {reportData && (
                        <div>
                            {/* INI BAGIAN UNTUK MENAMPILKAN DEAL NAME, OWNER, STAGE */}
                            <div className='mt-3'>
                                <h5>Report for: {reportData.deal_name}</h5>
                                <p className='mb-1'><strong>Owner:</strong> {reportData.owner} | <strong>Current Stage:</strong> {reportData.stage}</p>
                            </div>
                            
                            <hr />

                            {/* INI BAGIAN TABEL UNTUK ACTIVITIES */}
                            <DataTable
                                columns={columns}
                                data={reportData.activities}
                                pagination
                                highlightOnHover
                                responsive
                            />
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Render Modal di sini */}
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

export default ActivityDeals;