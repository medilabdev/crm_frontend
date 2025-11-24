import React, { useEffect, useState } from "react";
import Image from "../../../../src/assets/img/LOGO_MEDIALYS_ICON.png";
import IconImage from "../../../../src/assets/img/man.png";
import "./style.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";

function Topbar() {
    const token = localStorage.getItem("token");
    const [isSidebarToggled, setSidebarToggled] = useState(false);
    const navigate = useNavigate();
    const [name] = useState(localStorage.getItem("name"));
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        if (!token) return;

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/notifications`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { limit: 5 }
                }
            );

            setNotifications(response.data.data);
            setUnreadCount(response.data.unread_count);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const intervalId = setInterval(fetchNotifications, 30000);
        return () => clearInterval(intervalId);
    }, [token]);

    const handleDismiss = async (notificationId) => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/notifications/${notificationId}/mark-as-read`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setNotifications(prev => prev.filter(n => n.id !== notificationId));
            setUnreadCount(prev => (prev > 0 ? prev - 1 : 0));
        } catch (error) {
            console.error("Failed to dismiss notification", error);
        }
    };

    const handleSnooze = async (reminderUid, notificationId) => {
        const { value: snoozeDate } = await Swal.fire({
            title: "Snooze Reminder",
            input: "date",
            inputLabel: "Remind me again on",
            inputValue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) return "Please choose a date!";
                if (new Date(value) <= new Date()) {
                    return "Date must be in the future!";
                }
            }
        });

        if (snoozeDate) {
            try {
                await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/reminders/${reminderUid}/snooze`,
                    { snoozed_until: snoozeDate },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                Swal.fire("Snoozed!", "Reminder updated.", "success");

                setNotifications(prev => prev.filter(n => n.id !== notificationId));
                setUnreadCount(prev => (prev > 0 ? prev - 1 : 0));
            } catch (error) {
                console.error(error);
                Swal.fire("Error", "Failed to snooze reminder.", "error");
            }
        }
    };

    useEffect(() => {
        const toggleSidebarBtn = document.querySelector(".toggle-sidebar-btn");
        const body = document.getElementById("body");

        const toggleSidebar = () => {
            body.classList.toggle("toggle-sidebar");
            setSidebarToggled(prev => !prev);
        };

        if (toggleSidebarBtn) {
            toggleSidebarBtn.addEventListener("click", toggleSidebar);
        }

        return () => {
            if (toggleSidebarBtn) {
                toggleSidebarBtn.removeEventListener("click", toggleSidebar);
            }
        };
    }, []);

    const Logout = () => {
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
                null,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                localStorage.clear();
                sessionStorage.clear();

                Swal.fire({
                    title: "Logout Berhasil",
                    text: response.data.message,
                    icon: "success"
                });

                navigate("/login");
            })
            .catch((error) => console.error(error));
    };

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between ms-3">
                <i className="bi bi-list toggle-sidebar-btn" style={{ fontSize: "1.8rem" }} />
                <a href="/" className="logo d-flex align-items-center text-decoration-none">
                    <img src={Image} style={{ width: "25px" }} alt="Logo" />
                    <span className="title ms-2">HARISSA CRM</span>
                </a>
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    
                    {/* NOTIFICATION DROPDOWN */}
                    <Dropdown as="li" className="nav-item">
                        <Dropdown.Toggle as="a" className="nav-link nav-icon" href="#">
                            <i className="bi bi-bell" />
                            {unreadCount > 0 && (
                                <span className="badge bg-primary badge-number">{unreadCount}</span>
                            )}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu-end dropdown-menu-arrow notifications">
                            <li className="dropdown-header">
                                You have {unreadCount} new notifications
                                <Link to="/notifications" className="badge rounded-pill bg-primary p-2 ms-2">View all</Link>
                            </li>

                            {notifications.length > 0 ? notifications.map(notif => (
                                <React.Fragment key={notif.id}>
                                    <Dropdown.Divider />
                                    <li className={`notification-item ${!notif.read_at ? 'unread' : ''}`}>
                                        <i className="bi bi-info-circle text-primary" />
                                        <div className="w-100">
                                            <Link to={notif.data.url} className="text-decoration-none text-dark">
                                                <h4>{notif.data.deal_name}</h4>
                                                <p>{notif.data.message}</p>
                                            </Link>
                                            <div className="notification-actions mt-2">
                                                <Button variant="outline-secondary" size="sm" onClick={() => handleDismiss(notif.id)}>Dismiss</Button>
                                                {notif.data.reminder_uid && (
                                                    <Button variant="outline-info" size="sm" className="ms-2"
                                                        onClick={() => handleSnooze(notif.data.reminder_uid, notif.id)}>
                                                        Snooze
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                </React.Fragment>
                            )) : (
                                <>
                                    <Dropdown.Divider />
                                    <li className="notification-item text-center p-3">
                                        <p className="text-muted mb-0">No new notifications</p>
                                    </li>
                                </>
                            )}

                            <Dropdown.Divider />
                            <li className="dropdown-footer text-center">
                                <Link to="/notifications">Show all notifications</Link>
                            </li>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    {/* PROFILE */}
                    <li className="nav-item dropdown pe-3">
                        <a className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                            <img src={IconImage} className="rounded-circle" style={{ width: "38px", height: "38px" }} alt="" />
                            <span className="d-none d-md-block dropdown-toggle ps-2">{name}</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>{name}</h6>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="/account-profile">
                                    <i className="bi bi-person" />
                                    <span>My Profile</span>
                                </a>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button className="dropdown-item d-flex align-items-center" onClick={Logout}>
                                    <i className="bi bi-box-arrow-right" />
                                    <span>Sign Out</span>
                                </button>
                            </li>
                        </ul>
                    </li>

                </ul>
            </nav>
        </header>
    );
}

export default Topbar;
