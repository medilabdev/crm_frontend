import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { planningRecapService, branchService } from '../TaskNew/WeeklyPlanning/services/weeklyPlanningService'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DoughnutChart from './Doughnut';
import ChartBar from './ChartBar';

const ReportWeeklyPlanning = () => {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().substring(0, 7));
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reportData, setReportData] = useState(null); // Data sekarang akan berisi { monthly_totals, ... }

    useEffect(() => {
        branchService.getAll()
        .then(response => {
            const branchData = response.data || [];
            setBranches(branchData);
            if (branchData.length > 0) {
                console.log("Default branch set to:", branchData);
                // Set default branch ke UID
                setSelectedBranch(branchData[0].value); 
            }
        })
        .catch(err => {
            console.error("Failed to fetch branches", err);
            setError("Gagal memuat daftar cabang.");
        });
    }, []);

    const handleFetchReport = () => {
        if (!selectedMonth || !selectedBranch) {
            setError("Silakan pilih bulan dan cabang terlebih dahulu.");
            return;
        }
        
        setLoading(true);
        setError(null);
        setReportData(null);
        const formattedMonth = `${selectedMonth}-01`; 

        planningRecapService.getRecap(formattedMonth, selectedBranch)
            .then(response => {
                setReportData(response.data); // Data (sudah di-nest)
            })
            .catch(err => {
                console.error("Failed to fetch planning recap", err);
                setError("Gagal mengambil data report. Silakan coba lagi.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Helper untuk render 4 kartu analisa (KPI)
    const renderSummaryCard = (item, index) => (
        <Col md={3} key={index} className="mb-3">
            <Card className="h-100">
                <Card.Body>
                    <Card.Title className="text-secondary" style={{ fontSize: '0.9rem' }}>
                        {item.title}
                    </Card.Title>
                    <h4 className={`fw-bold ${item.value === 'Buruk' || item.value === 'Kurang' ? 'text-danger' : 'text-success'}`}>
                        {item.value}
                    </h4>
                    <small className="text-muted">{item.basis}</small>
                    <div className="fw-bold fs-5 mt-1">{item.percent}%</div>
                </Card.Body>
            </Card>
        </Col>
    );

    // Helper untuk menyiapkan data Grafik Batang Mingguan
    const getWeeklyChartData = () => {
        if (!reportData || !reportData.weekly_breakdown) return null;

        const labels = reportData.weekly_breakdown.map(w => w.week_name);
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Rencana (Belum direport)',
                    data: reportData.weekly_breakdown.map(w => w.plan_not_reported),
                    backgroundColor: 'rgba(255, 193, 7, 0.6)', // Kuning
                },
                {
                    label: 'Realisasi (Sesuai Rencana)',
                    data: reportData.weekly_breakdown.map(w => w.plan_reported),
                    backgroundColor: 'rgba(40, 167, 69, 0.6)', // Hijau
                },
                {
                    label: 'Di Luar Rencana (Outside)',
                    data: reportData.weekly_breakdown.map(w => w.outside),
                    backgroundColor: 'rgba(23, 162, 184, 0.6)', // Biru
                }
            ]
        };
    };

    // Helper untuk menyiapkan data Donat Kategori
    const getCategoryChartData = () => {
        if (!reportData || !reportData.categories_list) return null;

        const labels = reportData.categories_list.map(c => c.name);
        return {
            labels: labels,
            datasets: [{
                data: reportData.categories_list.map(c => c.total),
                backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#0dcaf0', '#6c757d'],
            }]
        };
    };

    const weeklyChartOptions = {
        plugins: {
            title: {
                display: true,
                // Ganti judul lama "Total Staging Deals"
                text: 'Tren Kinerja Mingguan (Plan vs Realisasi)',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true, // Pastikan barnya "stacked" (ditumpuk)
            },
            y: {
                stacked: true,
            },
        },
    };

    return (
        <div className="report-weekly-planning">
            <Card className="shadow-sm">
                <Card.Header>
                    <h5>Filter Report Task</h5>
                </Card.Header>
                <Card.Body>
                    {/* --- Area Filter --- */}
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Pilih Bulan</Form.Label>
                                <DatePicker
                                    selected={new Date(selectedMonth + '-01')}
                                    onChange={(date) => setSelectedMonth(date.toISOString().substring(0, 7))}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    className="form-control"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Pilih Cabang</Form.Label>
                                <Form.Select
                                    value={selectedBranch}
                                    onChange={e => setSelectedBranch(e.target.value)}
                                >
                                    <option value="">-- Pilih Cabang --</option>
                                    {branches.map(branch => (
                                        // === PERBAIKAN Q1 ===
                                        <option key={branch.uid} value={branch.value}>
                                            {branch.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4} className="d-flex align-items-end">
                            <Button onClick={handleFetchReport} disabled={loading}>
                                {loading ? <Spinner as="span" size="sm" /> : 'Tampilkan Report'}
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* --- Area Tampilan Data --- */}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            
            {loading && (
                <div className="text-center mt-3"><Spinner animation="border" /><p>Memuat data...</p></div>
            )}

            {/* === PERBAIKAN Q2: BACA STRUKTUR DATA BARU === */}
            {reportData && (
                <div className="report-content mt-4">
                    
                    {/* Bagian 1: KPI Utama (4 Kartu) */}
                    <Row>
                        {/* Ambil dari 'monthly_totals' */}
                        {reportData.monthly_totals.analysis_summary.map(renderSummaryCard)}
                    </Row>

                    {/* Bagian 2: Grafik Tren Mingguan (BARU) */}
                    <Row className="mt-3">
                        <Col>
                            <Card>
                                <Card.Header>Tren Kinerja Mingguan</Card.Header>
                                <Card.Body>
                                    {/* BENAR: Objek data DILEMPAR sebagai prop 'data' */}
                                    <ChartBar 
                                        data={getWeeklyChartData()} 
                                        options={weeklyChartOptions} 
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Bagian 3: Breakdown Kategori & Data Mentah */}
                    <Row className="mt-3">
                        <Col md={6}>
                            <Card>
                                <Card.Header>Kategori Kunjungan</Card.Header>
                                <Card.Body>
                                    {/* BENAR: Objek data DILEMPAR sebagai prop 'data' */}
                                    <DoughnutChart 
                                        data={getCategoryChartData()} 
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <Card.Header>KPI & Data Mentah Bulanan</Card.Header>
                                <Card.Body>
                                    {/* Ambil dari 'monthly_totals' */}
                                    <p>Plan vs Realisasi: {reportData.monthly_totals.achievement_pct}%</p>
                                    <p>Realisasi vs Target: {reportData.monthly_totals.target_pct}%</p>
                                    <hr/>
                                    <p>On Planning: {reportData.monthly_totals.on_planning}</p>
                                    <p>Off Planning: {reportData.monthly_totals.off_planning}</p>
                                    <p>Total Visit: {reportData.monthly_totals.total_visit}</p>
                                    <p>Repetisi Kunjungan: {reportData.monthly_totals.repetition_pct}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default ReportWeeklyPlanning;