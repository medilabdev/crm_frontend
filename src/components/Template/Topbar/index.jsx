import React, { useEffect, useState } from "react";
import Image from "../../../../src/assets/img/LOGO_MEDIALYS_ICON.png";
import ImageIss from "../../../../src/assets/img/iss.png";
import Medika from "../../../../src/assets/img/medika.png";
import IconImage from "../../../../src/assets/img/man.png";
import "./style.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Button  } from 'react-bootstrap'; 
function Topbar() {
    const token = localStorage.getItem("token");
    const [isSidebarToggled, setSidebarToggled] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState(localStorage.getItem("name"));
    const [image, setImage] = useState(localStorage.getItem("image"));
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    
    const fetchNotifications = async () => {
        if (!token) return;

        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/notifications`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { limit: 5 }
            });

            console.log("Fetched notifications:", response.data);
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
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/notifications/${notificationId}/mark-as-read`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Update UI secara optimis
                setNotifications(prev => prev.filter(n => n.id !== notificationId));
                setUnreadCount(prev => (prev > 0 ? prev - 1 : 0));

        } catch (error) {
            console.error("Failed to dismiss notification", error);

        }
    }

    const handleSnooze = async (reminderUid, notificationId) => {
            const { value: snoozeDate } = await Swal.fire({
                title: 'Snooze Reminder',
                input: 'date',
                inputLabel: 'Remind me again on',
                // Default 7 hari dari sekarang
                inputValue: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], 
                showCancelButton: true,
                // Validasi sederhana agar tidak bisa memilih tanggal di masa lalu
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to choose a date!'
                    }
                    if (new Date(value) <= new Date()) {
                        return 'Please select a future date.'
                    }
                }
            });

            if (snoozeDate) {
                try {
                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reminders/${reminderUid}/snooze`, {
                        snoozed_until: snoozeDate
                    }, { headers: { Authorization: `Bearer ${token}` } });
                    
                    Swal.fire('Snoozed!', 'Reminder has been rescheduled.', 'success');
                    
                    // --- INI PERBAIKANNYA ---
                    // Update UI secara optimis agar notifikasi langsung hilang
                    setNotifications(prev => prev.filter(n => n.id !== notificationId));
                    setUnreadCount(prev => (prev > 0 ? prev - 1 : 0));
                    // -------------------------

                } catch (error) {
                    console.error("Failed to snooze reminder", error);
                    Swal.fire('Error!', 'Failed to snooze reminder.', 'error');
                }
            }
    };



    useEffect(() => {
        // Sidebar toggle
        const toggleSidebarBtn = document.querySelector(".toggle-sidebar-btn");
        const body = document.getElementById("body");

        const toggleSidebar = () => {
        if (!isSidebarToggled) {
            body.classList.add("toggle-sidebar");
            setSidebarToggled(true);
        } else {
            body.classList.remove("toggle-sidebar");
            setSidebarToggled(false);
        }
        };

        if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener("click", toggleSidebar);
        }

        // Membuang event listener saat komponen dibongkar
        return () => {
        if (toggleSidebarBtn) {
            toggleSidebarBtn.removeEventListener("click", toggleSidebar);
        }
        };
    }, [isSidebarToggled]);

    const Logout = () => {
        axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/users/logout`, null, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            localStorage.clear();
            sessionStorage.clear();

            Swal.fire({
            title: "Logout Berhasil",
            text: response.data.message,
            icon: "success",
            });
            navigate("/login");
        })
        .catch((error) => console.error(error));
    };
    const resultImage = process.env.REACT_APP_BACKEND_URL === "https://api-crm.medilabjakarta.id/api" ? Image : process.env.REACT_APP_BACKEND_URL === "https://api-crm-medika.medilabjakarta.id/api" ? Medika : ImageIss;
    // console.log(isSidebarToggled);
//   console.log(notifications);
  return (
    <>
    <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between ms-3">
            <i
                className="bi bi-list toggle-sidebar-btn"
                style={{ fontSize: "1.8rem" }}
            />
            <a href="/" className="logo d-flex align-items-center text-decoration-none">
                <img src={resultImage} style={{ width: "25px", marginLeft: "0.3rem" }} alt="Logo" />
                <span className="title" style={{ /* ... style ... */ }}>
                    HARISSA CRM
                </span>
            </a>
        </div>

        <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">
                
                {/* --- INI BLOK NOTIFIKASI YANG SUDAH FINAL --- */}
                <Dropdown as="li" className="nav-item">
                    <Dropdown.Toggle as="a" className="nav-link nav-icon" href="#">
                        <i className="bi bi-bell"></i>
                        {unreadCount > 0 && (
                            <span className="badge bg-primary badge-number">{unreadCount}</span>
                        )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu-end dropdown-menu-arrow notifications" style={{minWidth: '350px'}}>
                        <li className="dropdown-header">
                            You have {unreadCount} new notifications
                            <Link to="/notifications" className="badge rounded-pill bg-primary p-2 ms-2">View all</Link>
                        </li>
                        
                        {notifications.length > 0 ? (
                            notifications.map(notif => (
                                <React.Fragment key={notif.id}>
                                    <Dropdown.Divider />
                                    {/* Kita ubah Dropdown.Item menjadi div biasa agar Link bisa bekerja penuh */}
                                    <li className={`notification-item ${!notif.read_at ? 'unread' : ''}`}>
                                        <i className="bi bi-info-circle text-primary" />
                                        <div className="w-100">
                                            <Link to={notif.data.url} style={{textDecoration: 'none', color: 'inherit'}}>
                                                <h4>{notif.data.deal_name}</h4>
                                                <p>{notif.data.message}</p>
                                                <p className="text-muted small">{new Date(notif.created_at).toLocaleDateString('id-ID')}</p>
                                            </Link>
                                            <div className="notification-actions mt-2">
                                                <Button variant="outline-secondary" size="sm" onClick={() => handleDismiss(notif.id)}>Dismiss</Button>
                                                {notif.data.reminder_uid && ( // Tampilkan Snooze hanya jika ada reminder_uid
                                                <Button 
                                                variant="outline-info" 
                                                size="sm" 
                                                className="ms-2" 
                                                // Berikan juga notif.id di sini
                                                onClick={() => handleSnooze(notif.data.reminder_uid, notif.id)}> 
                                                Snooze
                                                </Button>

                                                )}
                                            </div>
                                        </div>
                                    </li>
                                </React.Fragment>
                            ))
                        ) : (
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
                {/* --- AKHIR BLOK NOTIFIKASI --- */}

                {/* --- BLOK PROFIL PENGGUNA --- */}
                <li className="nav-item dropdown pe-3">
                    <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                        <img src={IconImage} alt="Profile" className="rounded-circle" style={{ width: "38px", height: "38px" }} />
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
                {/* --- AKHIR BLOK PROFIL --- */}

            </ul>
        </nav>
    </header>
    
    

    
    </>
  );
}

export default Topbar;
