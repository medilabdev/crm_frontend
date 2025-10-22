import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, Accordion, Modal, Table } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";

const WeeklyPlanningForm = () => {
    const [formData, setFormData] = useState({
        marketing_name: '',
        branch: '',
        month: new Date(),
        weeks: []
    });

    const [showActivityModal, setShowActivityModal] = useState(false);
    const [currentWeek, setCurrentWeek] = useState(null);
    const [currentDay, setCurrentDay] = useState(null);
    const [newActivity, setNewActivity] = useState({
        activity_type: '',
        customer_name: '',
        notes: '',
        planned_time: ''
    });

    // Mock data untuk dropdown
    const marketingOptions = [
        { value: 'ayu', label: 'Ayu' },
        { value: 'budi', label: 'Budi' },
        { value: 'citra', label: 'Citra' }
    ];

    const branchOptions = [
        { value: 'cempaka_putih', label: 'Cempaka Putih' },
        { value: 'jakarta_pusat', label: 'Jakarta Pusat' },
        { value: 'bekasi', label: 'Bekasi' }
    ];

    const activityTypes = [
        { value: 'customer_visit', label: 'Customer Visit' },
        { value: 'phone_call', label: 'Phone Call' },
        { value: 'presentation', label: 'Presentation' },
        { value: 'follow_up', label: 'Follow Up' },
        { value: 'meeting', label: 'Meeting' },
        { value: 'others', label: 'Others' }
    ];

    // Generate weeks dalam bulan yang dipilih
    const generateWeeksInMonth = (selectedMonth) => {
        const weeks = [];
        const startOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
        const endOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
        
        let weekStart = new Date(startOfMonth);
        let weekNumber = 1;

        while (weekStart <= endOfMonth && weekNumber <= 6) {
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 4); // Senin-Jumat (5 hari kerja)
            
            if (weekEnd > endOfMonth) {
                weekEnd.setTime(endOfMonth.getTime());
            }

            weeks.push({
                weekNumber,
                startDate: new Date(weekStart),
                endDate: new Date(weekEnd),
                days: generateWorkDays(weekStart, weekEnd)
            });

            weekStart.setDate(weekStart.getDate() + 7);
            weekNumber++;
        }

        return weeks;
    };

    // Generate hari kerja (Senin-Jumat)
    const generateWorkDays = (start, end) => {
        const days = [];
        const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dayOfWeek = d.getDay();
            if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Senin-Jumat
                days.push({
                    date: new Date(d),
                    dayName: dayNames[dayOfWeek],
                    activities: []
                });
            }
        }
        return days;
    };

    const handleMonthChange = (date) => {
        const weeks = generateWeeksInMonth(date);
        setFormData({
            ...formData,
            month: date,
            weeks: weeks
        });
    };

    const handleAddActivity = (weekIndex, dayIndex) => {
        setCurrentWeek(weekIndex);
        setCurrentDay(dayIndex);
        setShowActivityModal(true);
    };

    const handleSaveActivity = () => {
        if (!newActivity.activity_type || !newActivity.customer_name) {
            alert('Mohon isi semua field yang wajib');
            return;
        }

        const updatedWeeks = [...formData.weeks];
        updatedWeeks[currentWeek].days[currentDay].activities.push({
            ...newActivity,
            id: Date.now() // Temporary ID
        });

        setFormData({
            ...formData,
            weeks: updatedWeeks
        });

        // Reset form
        setNewActivity({
            activity_type: '',
            customer_name: '',
            notes: '',
            planned_time: ''
        });
        setShowActivityModal(false);
    };

    const handleDeleteActivity = (weekIndex, dayIndex, activityIndex) => {
        const updatedWeeks = [...formData.weeks];
        updatedWeeks[weekIndex].days[dayIndex].activities.splice(activityIndex, 1);
        setFormData({
            ...formData,
            weeks: updatedWeeks
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: '2-digit'
        });
    };

    const getTotalActivities = () => {
        return formData.weeks.reduce((total, week) => {
            return total + week.days.reduce((dayTotal, day) => {
                return dayTotal + day.activities.length;
            }, 0);
        }, 0);
    };

    return (
        <>
            <Card className="shadow">
                <Card.Header>
                    <Card.Title className="mb-0">Weekly Planning Form</Card.Title>
                </Card.Header>
                <Card.Body>
                    {/* Header Form */}
                    <Row className="mb-4">
                        <Col md={4}>
                            <Form.Label>Nama Marketing *</Form.Label>
                            <Select
                                options={marketingOptions}
                                value={marketingOptions.find(opt => opt.value === formData.marketing_name)}
                                onChange={(option) => setFormData({...formData, marketing_name: option?.value || ''})}
                                placeholder="Pilih Marketing..."
                                isClearable
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Label>Cabang *</Form.Label>
                            <Select
                                options={branchOptions}
                                value={branchOptions.find(opt => opt.value === formData.branch)}
                                onChange={(option) => setFormData({...formData, branch: option?.value || ''})}
                                placeholder="Pilih Cabang..."
                                isClearable
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Label>Bulan *</Form.Label>
                            <DatePicker
                                selected={formData.month}
                                onChange={handleMonthChange}
                                dateFormat="MMMM yyyy"
                                showMonthYearPicker
                                className="form-control"
                            />
                        </Col>
                    </Row>

                    {/* Weekly Breakdown */}
                    {formData.weeks.length > 0 && (
                        <>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5>Weekly Planning</h5>
                                <span className="badge bg-info">Total Activities: {getTotalActivities()}</span>
                            </div>

                            <Accordion defaultActiveKey="0">
                                {formData.weeks.map((week, weekIndex) => (
                                    <Accordion.Item eventKey={weekIndex.toString()} key={weekIndex}>
                                        <Accordion.Header>
                                            <strong>Minggu {week.weekNumber}</strong>
                                            <span className="ms-2 text-muted">
                                                ({formatDate(week.startDate)} - {formatDate(week.endDate)})
                                            </span>
                                            <span className="ms-auto me-2 badge bg-secondary">
                                                {week.days.reduce((total, day) => total + day.activities.length, 0)} activities
                                            </span>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Hari</th>
                                                        <th>Tanggal</th>
                                                        <th>Activities</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {week.days.map((day, dayIndex) => (
                                                        <tr key={dayIndex}>
                                                            <td>{day.dayName}</td>
                                                            <td>{formatDate(day.date)}</td>
                                                            <td>
                                                                {day.activities.length === 0 ? (
                                                                    <span className="text-muted">Belum ada activity</span>
                                                                ) : (
                                                                    <div>
                                                                        {day.activities.map((activity, actIndex) => (
                                                                            <div key={actIndex} className="d-flex justify-content-between align-items-center mb-1 p-2 bg-light rounded">
                                                                                <div>
                                                                                    <strong>{activityTypes.find(t => t.value === activity.activity_type)?.label}</strong>
                                                                                    <br />
                                                                                    <small>Customer: {activity.customer_name}</small>
                                                                                    {activity.planned_time && <small className="d-block">Time: {activity.planned_time}</small>}
                                                                                    {activity.notes && <small className="text-muted d-block">Notes: {activity.notes}</small>}
                                                                                </div>
                                                                                <Button 
                                                                                    variant="outline-danger" 
                                                                                    size="sm"
                                                                                    onClick={() => handleDeleteActivity(weekIndex, dayIndex, actIndex)}
                                                                                >
                                                                                    ×
                                                                                </Button>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <Button 
                                                                    variant="outline-primary" 
                                                                    size="sm"
                                                                    onClick={() => handleAddActivity(weekIndex, dayIndex)}
                                                                >
                                                                    + Add Activity
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>

                            <div className="mt-4 text-center">
                                <Button variant="success" size="lg" disabled={getTotalActivities() === 0}>
                                    Save Weekly Planning
                                </Button>
                                <Button variant="outline-secondary" className="ms-2">
                                    Preview Report
                                </Button>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>

            {/* Activity Modal */}
            <Modal show={showActivityModal} onHide={() => setShowActivityModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Label>Activity Type *</Form.Label>
                            <Select
                                options={activityTypes}
                                value={activityTypes.find(opt => opt.value === newActivity.activity_type)}
                                onChange={(option) => setNewActivity({...newActivity, activity_type: option?.value || ''})}
                                placeholder="Select activity type..."
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label>Planned Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={newActivity.planned_time}
                                onChange={(e) => setNewActivity({...newActivity, planned_time: e.target.value})}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Form.Label>Customer Name *</Form.Label>
                            <Form.Control
                                type="text"
                                value={newActivity.customer_name}
                                onChange={(e) => setNewActivity({...newActivity, customer_name: e.target.value})}
                                placeholder="Enter customer name..."
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newActivity.notes}
                                onChange={(e) => setNewActivity({...newActivity, notes: e.target.value})}
                                placeholder="Additional notes..."
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowActivityModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveActivity}>
                        Save Activity
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default WeeklyPlanningForm;