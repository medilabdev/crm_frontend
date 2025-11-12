// src/view/ApprovalCenter.jsx
import React, { useState, useEffect } from 'react';
import { Button, Card, Table, Nav } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import Topbar from '../../components/Template/Topbar';
import Sidebar from '../../components/Template/Sidebar';
import Main from '../../components/Template/Main';

const ApprovalCenter = () => {
  const token = localStorage.getItem('token');
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' or 'company'

  // === FETCH DATA ===
  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      let endpoint = '';

      if (activeTab === 'contact') {
        endpoint = '/approvals/contact-deletions/pending';
      } else {
        endpoint = '/companies/deletion-requests/pending';
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}${endpoint}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(response.data.data || response.data || []);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      Swal.fire('Error', 'Failed to fetch approval requests.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [token, activeTab]);

  // === APPROVE ===
  const handleApprove = async (requestUid) => {
    try {
      const endpoint =
        activeTab === 'contact'
          ? `/approvals/contact-deletions/${requestUid}/approve`
          : `/companies/deletion-requests/${requestUid}/approve`;

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${endpoint}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire('Approved!', `${activeTab} deletion approved.`, 'success');
      fetchRequests();
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Failed to approve request.', 'error');
    }
  };

  // === REJECT ===
  const handleReject = async (requestUid) => {
    const { value: reason } = await Swal.fire({
      title: 'Reject Request',
      input: 'textarea',
      inputPlaceholder: 'Enter reason for rejection...',
      showCancelButton: true,
      confirmButtonText: 'Submit Rejection',
    });

    if (reason !== undefined) {
      try {
        const endpoint =
          activeTab === 'contact'
            ? `/approvals/contact-deletions/${requestUid}/reject`
            : `/companies/deletion-requests/${requestUid}/reject`;

        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}${endpoint}`,
          { reason },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        Swal.fire('Rejected!', 'Deletion request rejected.', 'info');
        fetchRequests();
      } catch (error) {
        Swal.fire('Error!', 'Failed to reject request.', 'error');
      }
    }
  };

  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="pagetitle">
          <h1>Approval Center</h1>
        </div>

        {/* NAV TAB */}
        <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav.Item>
            <Nav.Link eventKey="contact">Contact Deletions</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="company">Company Deletions</Nav.Link>
          </Nav.Item>
        </Nav>

        <Card className="shadow mt-3">
          <Card.Body>
            {isLoading ? (
              <p>Loading requests...</p>
            ) : (
              <Table striped bordered hover responsive className="mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{activeTab === 'contact' ? 'Contact Name' : 'Company Name'}</th>
                    <th>Requested By</th>
                    <th>Request Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length > 0 ? (
                    requests.map((req, index) => (
                      <tr key={req.uid}>
                        <td>{index + 1}</td>
                        <td>
                          {activeTab === 'contact'
                            ? req.contact?.name || 'N/A'
                            : req.company?.name || 'N/A'}
                        </td>
                        <td>{req.requester?.name || 'N/A'}</td>
                        <td>{new Date(req.created_at).toLocaleString('id-ID')}</td>
                        <td>
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => handleApprove(req.uid)}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleReject(req.uid)}
                          >
                            Reject
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No pending requests.
                      </td>
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
