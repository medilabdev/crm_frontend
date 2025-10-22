import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, Table, Alert, Badge, Modal } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";

const WeeklyPlanningSimulation = () => {
    const [formData, setFormData] = useState({
        marketing_name: '',
        branch: '',
        month: new Date(),
        weeks: []
    });

    const [activeWeek, setActiveWeek] = useState(0);
    const [activeDay, setActiveDay] = useState(0);
    const [showWeekSetup, setShowWeekSetup] = useState(true);
    const [showBasicInfo, setShowBasicInfo] = useState(true);
    
    // Modal states untuk daily input
    const [showDayModal, setShowDayModal] = useState(false);
    const [modalDayData, setModalDayData] = useState(null);
    const [modalWeekIndex, setModalWeekIndex] = useState(0);
    const [modalDayIndex, setModalDayIndex] = useState(0);

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

    // Mock master data untuk Weekly Plan (relasi ke user)
    const [weeklyPlanMaster, setWeeklyPlanMaster] = useState([
        { value: 'visit_pt_abc', label: 'Visit PT ABC Indonesia' },
        { value: 'follow_up_quotation', label: 'Follow up quotation asuransi' },
        { value: 'team_meeting', label: 'Team meeting mingguan' },
        { value: 'presentation_product', label: 'Presentasi produk ke client' },
        { value: 'survey_lokasi', label: 'Survey lokasi project' }
    ]);

    // Mock suggestions untuk Weekly Report (bukan master data, dari history)
    const [weeklyReportSuggestions, setWeeklyReportSuggestions] = useState([
        { value: 'meeting_completed', label: 'Meeting completed successfully' },
        { value: 'quotation_sent', label: 'Quotation sent to client' },
        { value: 'deal_closed', label: 'Deal closed - signed contract' },
        { value: 'follow_up_scheduled', label: 'Follow up scheduled next week' },
        { value: 'presentation_done', label: 'Presentation completed' }
    ]);

    // Generate weeks dalam bulan (smart auto-generate)
    const generateWeeksInMonth = (selectedMonth) => {
        const weeks = [];
        const startOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
        const endOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
        
        let weekStart = new Date(startOfMonth);
        // Find first Monday of the month
        while (weekStart.getDay() !== 1) {
            weekStart.setDate(weekStart.getDate() + 1);
        }
        
        let weekNumber = 1;

        while (weekStart <= endOfMonth && weekNumber <= 6) {
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 4); // Monday to Friday (5 days)
            
            // Stop if week goes beyond current month
            if (weekEnd > endOfMonth) {
                weekEnd.setTime(endOfMonth.getTime());
                // Only add if at least 3 days in current month
                if (weekEnd.getDate() - weekStart.getDate() >= 2) {
                    weeks.push({
                        weekNumber,
                        startDate: new Date(weekStart),
                        endDate: new Date(weekEnd),
                        days: generateWorkDays(weekStart, weekEnd)
                    });
                }
                break;
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

    // Generate hari kerja dengan struktur tabel Excel
    const generateWorkDays = (start, end) => {
        const days = [];
        const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dayOfWeek = d.getDay();
            if (dayOfWeek >= 1 && dayOfWeek <= 6) { // Senin-Sabtu
                days.push({
                    date: new Date(d),
                    dayName: dayNames[dayOfWeek],
                    
                    // Struktur sesuai Excel: start with 5 rows untuk weekly planning
                    weekly_planning: Array(5).fill(null).map((_, index) => ({
                        no: index + 1,
                        weekly_plan: '',
                        plan_notes: '',
                        weekly_report: '',
                        report_notes: ''
                    })),
                    
                    // Struktur untuk outside planning: start with 3 rows
                    outside_planning: Array(3).fill(null).map((_, index) => ({
                        no: index + 1,
                        activity: '',
                        notes: ''
                    })),
                    
                    // Calculations (akan dihitung realtime)
                    calculations: {
                        total_weekly_plan: 0,
                        total_weekly_report: 0, 
                        daily_planning_pct: 0,
                        total_outside: 0,
                        daily_outside_pct: 0,
                        total_report: 0
                    }
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

    const updateWeekDates = (weekIndex, startDate, endDate) => {
        const updatedWeeks = [...formData.weeks];
        
        // Validate month boundary
        const selectedMonth = formData.month;
        const startOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
        const endOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
        
        if (startDate < startOfMonth || endDate > endOfMonth) {
            alert('Week dates must be within the selected month!');
            return;
        }
        
        updatedWeeks[weekIndex] = {
            ...updatedWeeks[weekIndex],
            startDate: startDate,
            endDate: endDate,
            days: generateWorkDays(startDate, endDate)
        };
        
        setFormData({
            ...formData,
            weeks: updatedWeeks
        });
    };

    // Add new week
    const addNewWeek = () => {
        const updatedWeeks = [...formData.weeks];
        const newWeekNumber = updatedWeeks.length + 1;
        
        // Default start date: after last week
        let startDate = new Date(formData.month);
        if (updatedWeeks.length > 0) {
            const lastWeek = updatedWeeks[updatedWeeks.length - 1];
            startDate = new Date(lastWeek.endDate);
            startDate.setDate(startDate.getDate() + 3); // Skip weekend
        } else {
            // First week starts on first Monday of month
            while (startDate.getDay() !== 1) {
                startDate.setDate(startDate.getDate() + 1);
            }
        }
        
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 4); // 5 days default
        
        // Check month boundary
        const endOfMonth = new Date(formData.month.getFullYear(), formData.month.getMonth() + 1, 0);
        if (endDate > endOfMonth) {
            endDate.setTime(endOfMonth.getTime());
        }
        
        updatedWeeks.push({
            weekNumber: newWeekNumber,
            startDate: startDate,
            endDate: endDate,
            days: generateWorkDays(startDate, endDate)
        });
        
        setFormData({
            ...formData,
            weeks: updatedWeeks
        });
    };

    // Remove week
    const removeWeek = (weekIndex) => {
        if (formData.weeks.length <= 1) {
            alert('At least one week is required!');
            return;
        }
        
        const updatedWeeks = [...formData.weeks];
        updatedWeeks.splice(weekIndex, 1);
        
        // Renumber remaining weeks
        updatedWeeks.forEach((week, index) => {
            week.weekNumber = index + 1;
        });
        
        setFormData({
            ...formData,
            weeks: updatedWeeks
        });
        
        // Reset active week if current one was removed
        if (activeWeek >= updatedWeeks.length) {
            setActiveWeek(Math.max(0, updatedWeeks.length - 1));
        }
    };

    // Simulasi COUNTA function Excel
    const countNonEmpty = (array, field) => {
        return array.filter(item => item[field] && item[field].trim() !== '').length;
    };

    // Update calculations sesuai rumus Excel
    const updateCalculations = (weekIndex, dayIndex) => {
        const updatedWeeks = [...formData.weeks];
        const day = updatedWeeks[weekIndex].days[dayIndex];
        
        // Implement rumus Excel
        const total_weekly_plan = countNonEmpty(day.weekly_planning, 'weekly_plan');
        const total_weekly_report = countNonEmpty(day.weekly_planning, 'weekly_report');
        const total_outside = countNonEmpty(day.outside_planning, 'activity');
        
        day.calculations = {
            total_weekly_plan,
            total_weekly_report,
            daily_planning_pct: total_weekly_plan > 0 ? (total_weekly_report / total_weekly_plan * 100) : 0,
            total_outside,
            daily_outside_pct: total_weekly_plan > 0 ? (total_outside / total_weekly_plan * 100) : 0,
            total_report: total_weekly_report + total_outside
        };

        setFormData({ ...formData, weeks: updatedWeeks });
    };

    // Calculate day values without updating state (for modal)
    const calculateDayValues = (dayData) => {
        const total_weekly_plan = countNonEmpty(dayData.weekly_planning, 'weekly_plan');
        const total_weekly_report = countNonEmpty(dayData.weekly_planning, 'weekly_report');
        const total_outside = countNonEmpty(dayData.outside_planning, 'activity');
        
        const calculations = {
            total_weekly_plan,
            total_weekly_report,
            daily_planning_pct: total_weekly_plan > 0 ? (total_weekly_report / total_weekly_plan * 100) : 0,
            total_outside,
            daily_outside_pct: total_weekly_plan > 0 ? (total_outside / total_weekly_plan * 100) : 0,
            total_report: total_weekly_report + total_outside
        };

        return {
            ...dayData,
            calculations
        };
    };

    // Handle create new weekly plan (add to master data)
    const handleCreateWeeklyPlan = (inputValue) => {
        const newOption = {
            value: inputValue.toLowerCase().replace(/\s+/g, '_'),
            label: inputValue
        };
        setWeeklyPlanMaster(prev => [...prev, newOption]);
        return newOption;
    };

    // Handle create new weekly report (add to suggestions)
    const handleCreateWeeklyReport = (inputValue) => {
        const newOption = {
            value: inputValue.toLowerCase().replace(/\s+/g, '_'),
            label: inputValue
        };
        setWeeklyReportSuggestions(prev => [...prev, newOption]);
        return newOption;
    };

    const handleInputChange = (weekIndex, dayIndex, tableType, rowIndex, field, value) => {
        const updatedWeeks = [...formData.weeks];
        if (tableType === 'weekly_planning') {
            updatedWeeks[weekIndex].days[dayIndex].weekly_planning[rowIndex][field] = value;
        } else {
            updatedWeeks[weekIndex].days[dayIndex].outside_planning[rowIndex][field] = value;
        }
        
        setFormData({ ...formData, weeks: updatedWeeks });
        updateCalculations(weekIndex, dayIndex);
    };

    // Handle select change untuk CreatableSelect
    const handleSelectChange = (weekIndex, dayIndex, tableType, rowIndex, field, selectedOption) => {
        const value = selectedOption ? selectedOption.label : '';
        handleInputChange(weekIndex, dayIndex, tableType, rowIndex, field, value);
    };

    // Add new row to table
    const addTableRow = (weekIndex, dayIndex, tableType) => {
        const updatedWeeks = [...formData.weeks];
        if (tableType === 'weekly_planning') {
            const currentLength = updatedWeeks[weekIndex].days[dayIndex].weekly_planning.length;
            updatedWeeks[weekIndex].days[dayIndex].weekly_planning.push({
                no: currentLength + 1,
                weekly_plan: '',
                plan_notes: '',
                weekly_report: '',
                report_notes: ''
            });
        } else {
            const currentLength = updatedWeeks[weekIndex].days[dayIndex].outside_planning.length;
            updatedWeeks[weekIndex].days[dayIndex].outside_planning.push({
                no: currentLength + 1,
                activity: '',
                notes: ''
            });
        }
        
        setFormData({ ...formData, weeks: updatedWeeks });
    };

    // Remove row from table
    const removeTableRow = (weekIndex, dayIndex, tableType, rowIndex) => {
        const updatedWeeks = [...formData.weeks];
        if (tableType === 'weekly_planning') {
            updatedWeeks[weekIndex].days[dayIndex].weekly_planning.splice(rowIndex, 1);
            // Renumber remaining rows
            updatedWeeks[weekIndex].days[dayIndex].weekly_planning.forEach((row, index) => {
                row.no = index + 1;
            });
        } else {
            updatedWeeks[weekIndex].days[dayIndex].outside_planning.splice(rowIndex, 1);
            // Renumber remaining rows
            updatedWeeks[weekIndex].days[dayIndex].outside_planning.forEach((row, index) => {
                row.no = index + 1;
            });
        }
        
        setFormData({ ...formData, weeks: updatedWeeks });
        updateCalculations(weekIndex, dayIndex);
    };

    // Calculate weekly metrics sesuai rumus Excel
    const calculateWeeklyMetrics = (weekIndex) => {
        if (!formData.weeks[weekIndex]) return { total_visit_pct: 0, planning_visit_pct: 0, outside_visit_pct: 0 };
        
        const days = formData.weeks[weekIndex].days;
        
        // Sum semua hari dalam seminggu
        const total_plans = days.reduce((sum, day) => sum + day.calculations.total_weekly_plan, 0);
        const total_reports = days.reduce((sum, day) => sum + day.calculations.total_weekly_report, 0);
        const total_outsides = days.reduce((sum, day) => sum + day.calculations.total_outside, 0);
        const total_all_reports = days.reduce((sum, day) => sum + day.calculations.total_report, 0);
        
        return {
            total_visit_pct: total_plans > 0 ? (total_all_reports / total_plans * 100) : 0,
            planning_visit_pct: total_plans > 0 ? (total_reports / total_plans * 100) : 0,
            outside_visit_pct: total_plans > 0 ? (total_outsides / total_plans * 100) : 0
        };
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatDateShort = (date) => {
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short'
        });
    };

    // Modal functions
    const openDayModal = (weekIndex, dayIndex) => {
        setModalWeekIndex(weekIndex);
        setModalDayIndex(dayIndex);
        setModalDayData({...formData.weeks[weekIndex].days[dayIndex]});
        setShowDayModal(true);
    };

    const closeDayModal = () => {
        setShowDayModal(false);
        setModalDayData(null);
    };

    const saveDayModal = () => {
        // Update the actual data
        const updatedFormData = {...formData};
        updatedFormData.weeks[modalWeekIndex].days[modalDayIndex] = modalDayData;
        
        // Recalculate for the updated day
        updatedFormData.weeks[modalWeekIndex].days[modalDayIndex] = calculateDayValues(modalDayData);
        
        setFormData(updatedFormData);
        setShowDayModal(false);
        setModalDayData(null);
    };

    // Save functionality (single save approach)
    const handleSavePlanning = () => {
        // Validate minimum requirements
        if (!formData.marketing_name || !formData.branch || formData.weeks.length === 0) {
            alert('Please fill in basic information and add at least one week!');
            return;
        }

        console.log('Saving weekly planning...', formData);
        
        alert('Weekly planning saved successfully!');
    };

    return (
        <>
            <Topbar />
            <Sidebar />

            <div className="container-fluid">
                <div className="row">
                    <Main>
                        <div className="container-fluid">
                            <Alert variant="info" className="mb-4">
                                <strong>📊 Weekly Planning Simulation</strong><br />
                                Simulasi sistem sesuai struktur Excel dengan rumus COUNTA dan perhitungan persentase.
                            </Alert>

                            {/* Header Form */}
                            <Card className="shadow mb-4">
                                <Card.Header 
                                    className="d-flex justify-content-between align-items-center"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setShowBasicInfo(!showBasicInfo)}
                                >
                                    <Card.Title className="mb-0">
                                        📋 Basic Information
                                    </Card.Title>
                                    <Button variant="link" size="sm" className="text-decoration-none">
                                        {showBasicInfo ? '−' : '+'}
                                    </Button>
                                </Card.Header>
                                {showBasicInfo && (
                                    <Card.Body>
                                    {/* Basic Info */}
                                    <Row className="mb-4">
                                        <Col md={4}>
                                            <Form.Label><strong>Nama Marketing *</strong></Form.Label>
                                            <Select
                                                options={marketingOptions}
                                                value={marketingOptions.find(opt => opt.value === formData.marketing_name)}
                                                onChange={(option) => setFormData({...formData, marketing_name: option?.value || ''})}
                                                placeholder="Pilih Marketing..."
                                                isClearable
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label><strong>Cabang *</strong></Form.Label>
                                            <Select
                                                options={branchOptions}
                                                value={branchOptions.find(opt => opt.value === formData.branch)}
                                                onChange={(option) => setFormData({...formData, branch: option?.value || ''})}
                                                placeholder="Pilih Cabang..."
                                                isClearable
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label><strong>Bulan *</strong></Form.Label>
                                            <DatePicker
                                                selected={formData.month}
                                                onChange={handleMonthChange}
                                                dateFormat="MMMM yyyy"
                                                showMonthYearPicker
                                                className="form-control w-100"
                                                style={{width: '100%'}}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Weekly Input */}
                                    {formData.weeks.length > 0 && (
                                        <>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h6 className="mb-0"><strong>Setup Minggu:</strong></h6>
                                                <Button 
                                                    variant="success" 
                                                    size="sm"
                                                    onClick={addNewWeek}
                                                    disabled={formData.weeks.length >= 6}
                                                >
                                                    + Add Week
                                                </Button>
                                            </div>
                                            
                                            <Row>
                                                {formData.weeks.map((week, index) => (
                                                    <Col md={6} key={index} className="mb-3">
                                                        <Card className="h-100 shadow-sm border">
                                                            <Card.Header className="bg-light d-flex justify-content-between align-items-center py-2">
                                                                <div className="d-flex align-items-center">
                                                                    <Badge bg="primary" className="me-2">📅</Badge>
                                                                    <strong>Minggu {week.weekNumber}</strong>
                                                                </div>
                                                                <Button 
                                                                    variant="outline-danger" 
                                                                    size="sm"
                                                                    onClick={() => removeWeek(index)}
                                                                    disabled={formData.weeks.length <= 1}
                                                                    title="Remove week"
                                                                >
                                                                    ×
                                                                </Button>
                                                            </Card.Header>
                                                            <Card.Body className="py-3">
                                                                <Row className="align-items-center">
                                                                    <Col md={5}>
                                                                        <label className="form-label small text-muted mb-1">Dari:</label>
                                                                        <DatePicker
                                                                            selected={week.startDate}
                                                                            onChange={(date) => updateWeekDates(index, date, week.endDate)}
                                                                            dateFormat="dd-MMM-yy"
                                                                            className="form-control form-control-sm"
                                                                            placeholderText="Start date"
                                                                        />
                                                                    </Col>
                                                                    <Col md={2} className="text-center">
                                                                        <small className="text-muted"><strong>sd</strong></small>
                                                                    </Col>
                                                                    <Col md={5}>
                                                                        <label className="form-label small text-muted mb-1">Sampai:</label>
                                                                        <DatePicker
                                                                            selected={week.endDate}
                                                                            onChange={(date) => updateWeekDates(index, week.startDate, date)}
                                                                            dateFormat="dd-MMM-yy"
                                                                            className="form-control form-control-sm"
                                                                            placeholderText="End date"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <div className="mt-2 text-center">
                                                                    <small className="text-muted">
                                                                        {week.days.length} hari kerja
                                                                    </small>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>
                                            
                                            {formData.weeks.length >= 6 && (
                                                <Alert variant="info" className="small">
                                                    <i className="bi bi-info-circle me-1"></i>
                                                    Maximum 6 weeks per month. Remove a week to add new one.
                                                </Alert>
                                            )}
                                        </>
                                    )}
                                </Card.Body>
                                )}
                            </Card>

                            {/* Weekly Planning Tables */}
                            {formData.weeks.length > 0 && (
                                <Card className="shadow">
                                    <Card.Header>
                                        <Card.Title className="mb-0">WEEKLY PLAN DAN WEEKLY REPORT</Card.Title>
                                        <small className="text-muted">Periode: {formData.month.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</small>
                                    </Card.Header>
                                    <Card.Body>
                                        {/* Week Tabs */}
                                        <div className="mb-3">
                                            {formData.weeks.map((week, weekIndex) => (
                                                <Button
                                                    key={weekIndex}
                                                    variant={activeWeek === weekIndex ? 'primary' : 'outline-primary'}
                                                    className="me-2 mb-2"
                                                    onClick={() => setActiveWeek(weekIndex)}
                                                >
                                                    Minggu {week.weekNumber} ({formatDateShort(week.startDate)} - {formatDateShort(week.endDate)})
                                                </Button>
                                            ))}
                                        </div>

                                        {/* Weekly Metrics */}
                                        {formData.weeks[activeWeek] && (
                                            <>
                                                <Alert variant="info" className="text-center">
                                                    <strong>📊 Report Minggu {formData.weeks[activeWeek].weekNumber}</strong><br />
                                                    <small>Periode: {formatDateShort(formData.weeks[activeWeek].startDate)} - {formatDateShort(formData.weeks[activeWeek].endDate)}</small>
                                                </Alert>
                                                <Row className="mb-4">
                                                    <Col md={4}>
                                                        <Card className="bg-primary text-white">
                                                            <Card.Body className="text-center">
                                                                <h4>{calculateWeeklyMetrics(activeWeek).total_visit_pct.toFixed(2)}%</h4>
                                                                <small>Persentase Kunjungan Total</small>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Card className="bg-success text-white">
                                                            <Card.Body className="text-center">
                                                                <h4>{calculateWeeklyMetrics(activeWeek).planning_visit_pct.toFixed(2)}%</h4>
                                                                <small>Pct Kunjungan Sesuai Planning</small>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Card className="bg-warning text-white">
                                                            <Card.Body className="text-center">
                                                                <h4>{calculateWeeklyMetrics(activeWeek).outside_visit_pct.toFixed(2)}%</h4>
                                                                <small>Pct Kunjungan Diluar Planning</small>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </>
                                        )}

                                        {/* Day Tabs */}
                                        {formData.weeks[activeWeek] && (
                                            <div className="mb-3">
                                                <h6 className="mb-3">Click day untuk edit planning:</h6>
                                                {formData.weeks[activeWeek].days.map((day, dayIndex) => {
                                                    const hasPlanning = day.weekly_planning.some(p => p.weekly_plan.trim() !== '') ||
                                                                       day.outside_planning.some(p => p.activity.trim() !== '');
                                                    
                                                    return (
                                                        <Button
                                                            key={dayIndex}
                                                            variant={hasPlanning ? 'success' : 'outline-secondary'}
                                                            className="me-2 mb-2 position-relative"
                                                            onClick={() => openDayModal(activeWeek, dayIndex)}
                                                        >
                                                            {day.dayName}, {formatDate(day.date)}
                                                            {hasPlanning && (
                                                                <Badge bg="light text-success" className="ms-2">✓</Badge>
                                                            )}
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Weekly Summary View */}
                                        {formData.weeks[activeWeek] && (
                                            <Card className="mb-4">
                                                <Card.Header className="bg-primary text-white">
                                                    <strong>📊 Minggu {formData.weeks[activeWeek].weekNumber} Summary</strong>
                                                    <span className="float-end">
                                                        {formatDate(formData.weeks[activeWeek].startDate)} - {formatDate(formData.weeks[activeWeek].endDate)}
                                                    </span>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        {formData.weeks[activeWeek].days.map((day, dayIndex) => {
                                                            const hasPlanning = day.weekly_planning.some(p => p.weekly_plan.trim() !== '') ||
                                                                               day.outside_planning.some(p => p.activity.trim() !== '');
                                                            
                                                            return (
                                                                <Col md={2} key={dayIndex} className="mb-3">
                                                                    <Card className={`h-100 ${hasPlanning ? 'border-success' : 'border-secondary'}`}>
                                                                        <Card.Body className="p-2 text-center">
                                                                            <h6 className="mb-1">{day.dayName}</h6>
                                                                            <small className="text-muted">{formatDate(day.date)}</small>
                                                                            <div className="mt-2">
                                                                                <Badge bg={hasPlanning ? 'success' : 'secondary'} className="mb-1">
                                                                                    Plan: {day.calculations.total_weekly_plan}
                                                                                </Badge><br/>
                                                                                <Badge bg="info" className="mb-1">
                                                                                    Report: {day.calculations.total_weekly_report}
                                                                                </Badge><br/>
                                                                                <Badge bg="warning" text="dark">
                                                                                    Outside: {day.calculations.total_outside}
                                                                                </Badge>
                                                                            </div>
                                                                            <div className="mt-2">
                                                                                <small className="text-success">
                                                                                    {day.calculations.daily_planning_pct.toFixed(1)}%
                                                                                </small>
                                                                            </div>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Col>
                                                            );
                                                        })}
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        )}
                                    </Card.Body>
                                </Card>
                            )}

                            {/* Save Actions */}
                            {formData.weeks.length > 0 && (
                                <Card className="shadow">
                                    <Card.Body className="text-center">
                                        <Button 
                                            variant="primary" 
                                            size="lg"
                                            onClick={handleSavePlanning}
                                            className="px-5"
                                        >
                                            💾 Save Weekly Planning
                                        </Button>
                                        <div className="mt-2">
                                            <small className="text-muted">
                                                Planning will be saved and can be edited anytime
                                            </small>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )}
                        </div>
                    </Main>
                </div>
            </div>

            {/* Daily Input Modal */}
            <Modal 
                show={showDayModal} 
                onHide={closeDayModal} 
                size="xl"
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        📅 Daily Planning Input - {modalDayData && modalDayData.dayName}, {modalDayData && formatDate(modalDayData.date)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {modalDayData && (
                        <>
                            {/* Weekly Planning & Report Table */}
                            <Card className="mb-4">
                                <Card.Header className="bg-info text-white">
                                    <strong>Weekly Planning & Report</strong>
                                    <div className="float-end">
                                        <Badge bg="light text-dark me-2">
                                            Plan: {modalDayData.calculations.total_weekly_plan}
                                        </Badge>
                                        <Badge bg="light text-dark me-2">
                                            Report: {modalDayData.calculations.total_weekly_report}
                                        </Badge>
                                        <Badge bg="success">
                                            {modalDayData.calculations.daily_planning_pct.toFixed(2)}%
                                        </Badge>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th style={{width: '5%'}}>No</th>
                                                <th style={{width: '25%'}}>Weekly Plan</th>
                                                <th style={{width: '15%'}}>Class (Notes)</th>
                                                <th style={{width: '25%'}}>Weekly Report</th>
                                                <th style={{width: '15%'}}>Class (Notes)</th>
                                                <th style={{width: '10%'}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {modalDayData.weekly_planning.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td>{row.no}</td>
                                                    <td>
                                                        <CreatableSelect
                                                            isClearable
                                                            options={weeklyPlanMaster}
                                                            value={weeklyPlanMaster.find(opt => opt.label === row.weekly_plan) || 
                                                                   (row.weekly_plan ? { label: row.weekly_plan, value: row.weekly_plan } : null)}
                                                            onChange={(option) => {
                                                                const newData = {...modalDayData};
                                                                newData.weekly_planning[rowIndex].weekly_plan = option ? option.label : '';
                                                                newData.calculations = calculateDayValues(newData).calculations;
                                                                setModalDayData(newData);
                                                            }}
                                                            onCreateOption={(inputValue) => {
                                                                const newOption = { value: inputValue.toLowerCase().replace(/\s+/g, '_'), label: inputValue };
                                                                setWeeklyPlanMaster([...weeklyPlanMaster, newOption]);
                                                                const newData = {...modalDayData};
                                                                newData.weekly_planning[rowIndex].weekly_plan = inputValue;
                                                                newData.calculations = calculateDayValues(newData).calculations;
                                                                setModalDayData(newData);
                                                            }}
                                                            placeholder="Pilih atau ketik weekly plan..."
                                                            formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                                                            noOptionsMessage={() => "Ketik untuk membuat weekly plan baru"}
                                                            styles={{
                                                                control: (provided) => ({
                                                                    ...provided,
                                                                    minHeight: '32px',
                                                                    fontSize: '14px'
                                                                })
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            size="sm"
                                                            type="text"
                                                            value={row.plan_notes}
                                                            onChange={(e) => {
                                                                const newData = {...modalDayData};
                                                                newData.weekly_planning[rowIndex].plan_notes = e.target.value;
                                                                setModalDayData(newData);
                                                            }}
                                                            placeholder="FU asuransi jiwa..."
                                                        />
                                                    </td>
                                                    <td>
                                                        <CreatableSelect
                                                            isClearable
                                                            options={weeklyReportSuggestions}
                                                            value={weeklyReportSuggestions.find(opt => opt.label === row.weekly_report) || 
                                                                   (row.weekly_report ? { label: row.weekly_report, value: row.weekly_report } : null)}
                                                            onChange={(option) => {
                                                                const newData = {...modalDayData};
                                                                newData.weekly_planning[rowIndex].weekly_report = option ? option.label : '';
                                                                newData.calculations = calculateDayValues(newData).calculations;
                                                                setModalDayData(newData);
                                                            }}
                                                            onCreateOption={(inputValue) => {
                                                                const newOption = { value: inputValue.toLowerCase().replace(/\s+/g, '_'), label: inputValue };
                                                                setWeeklyReportSuggestions([...weeklyReportSuggestions, newOption]);
                                                                const newData = {...modalDayData};
                                                                newData.weekly_planning[rowIndex].weekly_report = inputValue;
                                                                newData.calculations = calculateDayValues(newData).calculations;
                                                                setModalDayData(newData);
                                                            }}
                                                            placeholder="Pilih atau ketik weekly report..."
                                                            formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                                                            noOptionsMessage={() => "Ketik untuk menambah report baru"}
                                                            styles={{
                                                                control: (provided) => ({
                                                                    ...provided,
                                                                    minHeight: '32px',
                                                                    fontSize: '14px'
                                                                })
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            size="sm"
                                                            type="text"
                                                            value={row.report_notes}
                                                            onChange={(e) => {
                                                                const newData = {...modalDayData};
                                                                newData.weekly_planning[rowIndex].report_notes = e.target.value;
                                                                setModalDayData(newData);
                                                            }}
                                                            placeholder="Kirimkan penawaran..."
                                                        />
                                                    </td>
                                                    <td>
                                                        <Button 
                                                            variant="outline-danger" 
                                                            size="sm"
                                                            onClick={() => {
                                                                const newData = {...modalDayData};
                                                                if (newData.weekly_planning.length > 1) {
                                                                    newData.weekly_planning.splice(rowIndex, 1);
                                                                    // Renumber
                                                                    newData.weekly_planning.forEach((row, index) => {
                                                                        row.no = index + 1;
                                                                    });
                                                                    newData.calculations = calculateDayValues(newData).calculations;
                                                                    setModalDayData(newData);
                                                                }
                                                            }}
                                                            disabled={modalDayData.weekly_planning.length <= 1}
                                                        >
                                                            ×
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <div className="text-center mt-2">
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm"
                                            onClick={() => {
                                                const newData = {...modalDayData};
                                                newData.weekly_planning.push({
                                                    no: newData.weekly_planning.length + 1,
                                                    weekly_plan: '',
                                                    plan_notes: '',
                                                    weekly_report: '',
                                                    report_notes: ''
                                                });
                                                setModalDayData(newData);
                                            }}
                                        >
                                            + Add Row
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>

                            {/* Outside Planning Table */}
                            <Card className="mb-4">
                                <Card.Header className="bg-warning text-dark">
                                    <strong>Diluar Planning</strong>
                                    <div className="float-end">
                                        <Badge bg="light text-dark me-2">
                                            Total: {modalDayData.calculations.total_outside}
                                        </Badge>
                                        <Badge bg="info">
                                            {modalDayData.calculations.daily_outside_pct.toFixed(2)}%
                                        </Badge>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th style={{width: '10%'}}>No</th>
                                                <th style={{width: '45%'}}>Diluar Planning</th>
                                                <th style={{width: '35%'}}>Class (Notes)</th>
                                                <th style={{width: '10%'}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {modalDayData.outside_planning.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td>{row.no}</td>
                                                    <td>
                                                        <Form.Control
                                                            size="sm"
                                                            type="text"
                                                            value={row.activity}
                                                            onChange={(e) => {
                                                                const newData = {...modalDayData};
                                                                newData.outside_planning[rowIndex].activity = e.target.value;
                                                                newData.calculations = calculateDayValues(newData).calculations;
                                                                setModalDayData(newData);
                                                            }}
                                                            placeholder="Bertemu dengan A"
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            size="sm"
                                                            type="text"
                                                            value={row.notes}
                                                            onChange={(e) => {
                                                                const newData = {...modalDayData};
                                                                newData.outside_planning[rowIndex].notes = e.target.value;
                                                                setModalDayData(newData);
                                                            }}
                                                            placeholder="Dapat PIC baru"
                                                        />
                                                    </td>
                                                    <td>
                                                        <Button 
                                                            variant="outline-danger" 
                                                            size="sm"
                                                            onClick={() => {
                                                                const newData = {...modalDayData};
                                                                if (newData.outside_planning.length > 1) {
                                                                    newData.outside_planning.splice(rowIndex, 1);
                                                                    // Renumber
                                                                    newData.outside_planning.forEach((row, index) => {
                                                                        row.no = index + 1;
                                                                    });
                                                                    newData.calculations = calculateDayValues(newData).calculations;
                                                                    setModalDayData(newData);
                                                                }
                                                            }}
                                                            disabled={modalDayData.outside_planning.length <= 1}
                                                        >
                                                            ×
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <div className="text-center mt-2">
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm"
                                            onClick={() => {
                                                const newData = {...modalDayData};
                                                newData.outside_planning.push({
                                                    no: newData.outside_planning.length + 1,
                                                    activity: '',
                                                    notes: ''
                                                });
                                                setModalDayData(newData);
                                            }}
                                        >
                                            + Add Row
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <div className="w-100 d-flex justify-content-between align-items-center">
                        <div>
                            {modalDayData && (
                                <>
                                    <Badge bg="info" className="me-2">Plan: {modalDayData.calculations.total_weekly_plan}</Badge>
                                    <Badge bg="success" className="me-2">Report: {modalDayData.calculations.total_weekly_report}</Badge>
                                    <Badge bg="warning" text="dark" className="me-2">Outside: {modalDayData.calculations.total_outside}</Badge>
                                    <Badge bg="primary">Daily: {modalDayData.calculations.daily_planning_pct.toFixed(1)}%</Badge>
                                </>
                            )}
                        </div>
                        <div>
                            <Button variant="secondary" onClick={closeDayModal} className="me-2">
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={saveDayModal}>
                                💾 Save Changes
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default WeeklyPlanningSimulation;