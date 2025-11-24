import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Form, Button, Spinner, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FollowUpReport = () => {
  const [followUps, setFollowUps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({
    startDate: null,
    endDate: null,
    userUid: "all",
  });

  const token = localStorage.getItem("token");

  const fetchFollowUps = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deals/follow/report`, {
        params: {
          start_date: filter.startDate,
          end_date: filter.endDate,
          user_uid: filter.userUid,
        },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFollowUps(res.data.data))
      .finally(() => setIsLoading(false));
  };

  const fetchUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data.data || []));
  };

  useEffect(() => {
    fetchUsers();
    fetchFollowUps();
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="fw-bold mb-3 text-primary">📋 Follow-Up Report</h4>

      {/* Filter section */}
      <Card className="mb-3 shadow-sm border-0">
        <Card.Body>
          <Row className="align-items-end">
            <Col md={3}>
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                selected={filter.startDate ? new Date(filter.startDate) : null}
                onChange={(date) =>
                  setFilter({ ...filter, startDate: date?.toISOString().split("T")[0] })
                }
                className="form-control"
                placeholderText="Select start date"
              />
            </Col>
            <Col md={3}>
              <Form.Label>End Date</Form.Label>
              <DatePicker
                selected={filter.endDate ? new Date(filter.endDate) : null}
                onChange={(date) =>
                  setFilter({ ...filter, endDate: date?.toISOString().split("T")[0] })
                }
                className="form-control"
                placeholderText="Select end date"
              />
            </Col>
            <Col md={3}>
              <Form.Label>Sales / User</Form.Label>
              <Form.Select
                value={filter.userUid}
                onChange={(e) => setFilter({ ...filter, userUid: e.target.value })}
              >
                <option value="all">All Users</option>
                {users.map((user) => (
                  <option key={user.uid} value={user.uid}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Button className="w-100 mt-2" onClick={fetchFollowUps}>
                Apply Filter
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Data table */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          {isLoading ? (
            <div className="text-center my-5">
              <Spinner animation="border" size="sm" /> Loading data...
            </div>
          ) : followUps.length === 0 ? (
            <p className="text-muted text-center my-5">
              No follow-up records found.
            </p>
          ) : (
            <Table striped bordered hover responsive className="small">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Deal Name</th>
                  <th>Follow-Up Date</th>
                  <th>Activity Notes</th>
                  <th>Created By</th>
                </tr>
              </thead>
              <tbody>
                {followUps.map((f, idx) => (
                  <tr key={f.uid}>
                    <td>{idx + 1}</td>
                    <td>{f.deal?.deal_name || "-"}</td>
                    <td>{f.follow_up_date}</td>
                    <td>{f.activity_notes}</td>
                    <td>{f.created_by_user?.name || f.created_by}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default FollowUpReport;
