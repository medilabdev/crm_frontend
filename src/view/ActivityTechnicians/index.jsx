import React, { useCallback, useEffect, useState } from "react";
import Moment from 'react-moment';
import 'moment-timezone';
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import { Breadcrumb, Card, Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import Datatables from "../../components/Datatable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faBuildingCircleExclamation, faCalendarDays, faCheckCircle, faExclamationCircle, faFilePdf, faFilter, faPlusCircle, faSyncAlt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Search } from 'react-bootstrap-icons'; // Bootstrap Icons
import './activity.css';
import Select from "react-select";
import axios from "axios";

const renderTooltip = (props) => (
    <Tooltip {...props}>Download PDF</Tooltip>
);

const options = [
    { value: 'PT. Prima Indo Medilab', label: 'PT. Prima Indo Medilab' },
    { value: 'PT. Interskala Sehat Sejahtera', label: 'PT. Interskala Sehat Sejahtera' },
];

// icon
const columns = [
    {
        name: <><FontAwesomeIcon icon={faExclamationCircle} className="me-2" /> Action</>,
        width: "100px",
        selector: row => {
            if (row.is_complete === 1) {
                return (
                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                        <button className="btn">
                            <FontAwesomeIcon icon={faFilePdf} color="red" />
                        </button>
                    </OverlayTrigger>
                );
            }
        },
    },
    {
        name: <><FontAwesomeIcon icon={faBriefcase} className="me-2" /> Job</>, // Tambahkan ikon koper di header kolom
        selector: row => {
            console.log(row);

            return (<a href={`/activity-technician/${row.ulid}/detail`} className="text-decoration-none">{row.visit_purpose.name}</a>)
        },
        sortable: true,
    },
    {
        name: <><FontAwesomeIcon icon={faBuildingCircleExclamation} className="me-2" /> Customer</>,
        selector: row => {
            return (
                <div style={{ border: "1px solid #ABABAC", borderRadius: "3px", padding: "4px 6px" }}>
                    {row.company.name}
                </div>
            )
        },
        sortable: true,
    },
    {
        name: <><FontAwesomeIcon icon={faSyncAlt} className="me-2" /> Status</>,
        selector: row => row.is_complete, // Gunakan nilai angka untuk sorting
        cell: row => {
            if (row.is_complete === 0) {
                return (
                    <div style={{ backgroundColor: "#FBE8CC", padding: "4px 10px", borderRadius: "3px", color: "#AC7449" }}>
                        <span><FontAwesomeIcon icon={faExclamationCircle} className="me-2" />Awaiting Status</span>
                    </div>
                );
            } else if (row.is_complete === 1) {
                return (
                    <div style={{ backgroundColor: "#00FF1E40", padding: "4px 10px", borderRadius: "3px", color: "#004708B5" }}>
                        <span><FontAwesomeIcon icon={faCheckCircle} className="me-2" />Completed</span>
                    </div>
                );
            } else {
                return (
                    <div style={{ backgroundColor: "#FF8F8F40", padding: "4px 10px", borderRadius: "3px", color: "#FF0000B2" }}>
                        <span><FontAwesomeIcon icon={faTimesCircle} className="me-2" />Not Completed</span>
                    </div>
                );
            }
        },
        sortable: true,
    },
    {
        name: <><FontAwesomeIcon icon={faCalendarDays} className="me-2" /> Date</>,
        selector: row => <Moment format="DD MMM YYYY HH:mm" locale="id">{row.date}</Moment>,
        sortable: true,
    },
];

const data = [
    {
        id: 1,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Maintenance',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 0,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 2,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Troubleshooting',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 1,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 3,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Troubleshooting',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 1,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 4,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Others',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 2,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 5,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Installasi & Training',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 2,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 6,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Maintenance',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 0,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 7,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Troubleshooting',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 1,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 8,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Troubleshooting',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 1,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 9,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Others',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 2,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 10,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Installasi & Training',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 2,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 11,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Maintenance',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 0,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 12,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Troubleshooting',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 1,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 13,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Troubleshooting',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 1,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 14,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Others',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 2,
        date: '2025-02-06T08:59-0500',
    },
    {
        id: 15,
        title: 'Waktunya Maintenance RO',
        jobdesc: 'Installasi & Training',
        customer: 'PT. Prima Indo Medilab',
        is_complete: 2,
        date: '2025-02-06T08:59-0500',
    },

]

const ActivityTechnician = () => {
    const [showFilter, setShowFilter] = useState(true);
    const [technicianData, setTechnicianData] = useState([]);

    const urlTechnicianData = `${process.env.REACT_APP_BACKEND_URL}/technician-tickets?rel=visit-purpose,company`;
    const token = localStorage.getItem('token');

    const toggleFilter = () => {
        setShowFilter(prevState => !prevState);
    };

    useEffect(() => {
        const fetchDataListTechnician = async () => {
            const response = await fetchDataApi(urlTechnicianData, token);
            if (response) setTechnicianData(response.data.data);
        }

        fetchDataListTechnician()
    }, []);

    // fetch data api
    const fetchDataApi = useCallback(async (url, token) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.clear();
                window.location.href = "/login";
            }

            console.error(error);
        }
    }, []);

    return (
        <div id="body">
            <Topbar />
            <Sidebar />
            <Main>
                <div className="container">
                    <div className="row mt-2">
                        <div className="d-flex gap-2 mb-2">
                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.25 9H12.75M4.72827 18.7C5.54827 17.82 6.79828 17.89 7.51828 18.85L8.52827 20.2C9.33827 21.27 10.6483 21.27 11.4583 20.2L12.4683 18.85C13.1883 17.89 14.4383 17.82 15.2583 18.7C17.0383 20.6 18.4883 19.97 18.4883 17.31V6.04C18.4883 2.01 17.5483 1 13.7683 1H6.20828C2.42828 1 1.48828 2.01 1.48828 6.04V17.3C1.49828 19.97 2.95827 20.59 4.72827 18.7Z" stroke="#5E7CA9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <h5 className="mb-1 fw-bolder">Activity Transaction</h5>
                        </div>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>

                            <Breadcrumb.Item active>Activity Transaction</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <Card className="shadow-sm p-4">
                        <div className="row mb-4">
                            <div className="col-12">
                                <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                                    <div className="d-flex flex-column flex-md-row gap-3">
                                        <div className="">
                                            <button className="btn  btn-outline-primary" style={{ borderRadius: "3px" }} onClick={toggleFilter}>
                                                <FontAwesomeIcon icon={faFilter} className="me-2" />{showFilter ? 'Filter' : 'Hide Filter'}

                                            </button>

                                        </div>

                                        <div className="">
                                            <InputGroup style={{ width: "100%", maxWidth: "300px", borderRadius: "3px" }}>
                                                <InputGroup.Text><Search /></InputGroup.Text>
                                                <Form.Control
                                                    type="text"
                                                    id="search"
                                                    placeholder="Search..."
                                                />
                                            </InputGroup>
                                        </div>
                                    </div>

                                    {/* Kanan: Create Ticket */}
                                    <div>
                                        <button className="btn btn-success" onClick={() => window.location.href = '/activity-technician/create'} style={{ borderRadius: "3px" }}>
                                            <FontAwesomeIcon icon={faPlusCircle} className="me-2" />Create Ticket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className={`filter-wrapper mb-5 ${showFilter ? 'd-none' : 'col-md-3 col-sm-12'}`}>
                                <h5 className="fw-bolder">Filter Data</h5>
                                <hr />
                                <div className="mb-4">
                                    <Form.Group controlId="ownerSelect">
                                        <Form.Label>Select Owner</Form.Label>
                                        <Select
                                            placeholder="Select Owner"
                                            options={options}
                                        // onChange={(e) => setResultOwner(e)}
                                        />
                                    </Form.Group>

                                </div>
                                <button className="btn btn-primary" style={{ width: "100%", borderRadius: "3px" }}>Apply Filter</button>

                            </div>

                            <div className={showFilter ? "col-12" : "col-md-9"}>
                                <Datatables columns={columns} data={technicianData} />
                            </div>
                        </div>
                    </Card>
                </div>
            </Main>
        </div>
    );
};

export default ActivityTechnician;
