// src/view/ApprovalCenter.jsx

import React, { useState, useEffect } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import Topbar from '../../components/Template/Topbar';
import Sidebar from '../../components/Template/Sidebar';
import Main from '../../components/Template/Main';

const ApprovalCenter = () => {
    const token = localStorage.getItem('token');
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/approvals/contact-deletions`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(response.data.data);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
            Swal.fire("Error", "Failed to fetch approval requests. You might not have permission.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [token]);

    const handleApprove = async (requestUid) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/approvals/contact-deletions/${requestUid}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire("Approved!", "Contact has been deleted.", "success");
            fetchRequests(); // Muat ulang daftar permintaan
        } catch (error) {
            Swal.fire("Error!", "Failed to approve request.", "error");
        }
    };

    const handleReject = async (requestUid) => {
        const { value: reason } = await Swal.fire({
            title: 'Reject Request',
            input: 'textarea',
            inputPlaceholder: 'Enter reason for rejection... (Optional)',
            showCancelButton: true,
            confirmButtonText: 'Submit Rejection'
        });

        if (reason !== undefined) {
             try {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/approvals/contact-deletions/${requestUid}/reject`, 
                { reason: reason }, 
                { headers: { Authorization: `Bearer ${token}` } });
                Swal.fire("Rejected!", "The deletion request has been rejected.", "info");
                fetchRequests(); // Muat ulang daftar permintaan
            } catch (error) {
                Swal.fire("Error!", "Failed to reject request.", "error");
            }
        }
    };

    return (
        <body id="body">
            <Topbar />
            <Sidebar />
            <Main>
                <div className="pagetitle"><h1>Approval Center - Contact Deletions</h1></div>
                <Card className="shadow">
                    <Card.Body>
                        {isLoading ? <p>Loading requests...</p> : (
                            <Table striped bordered hover responsive className="mt-3">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Contact Name</th>
                                        <th>Requested By</th>
                                        <th>Request Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.length > 0 ? requests.map((req, index) => (
                                        <tr key={req.uid}>
                                            <td>{index + 1}</td>
                                            <td>{req.contact?.name || 'N/A'}</td>
                                            <td>{req.requester?.name || 'N/A'}</td>
                                            <td>{new Date(req.created_at).toLocaleString('id-ID')}</td>
                                            <td>
                                                <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(req.uid)}>Approve</Button>
                                                <Button variant="danger" size="sm" onClick={() => handleReject(req.uid)}>Reject</Button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">No pending requests.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
            </Main>
        </body>
    );
};

export default ApprovalCenter;