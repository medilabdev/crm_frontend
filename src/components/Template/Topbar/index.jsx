import React, { useEffect, useState } from "react";
import Image from "../../../../src/assets/img/LOGO_MEDIALYS_ICON.png";
import IconImage from "../../../../src/assets/img/man.png";
import "./style.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const [isSidebarToggled, setSidebarToggled] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem("name"));
  const [image, setImage] = useState(localStorage.getItem("image"));
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

  const token = localStorage.getItem("token");
  const Logout = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        localStorage.clear();
        Swal.fire({
          title: "Logout Berhasil",
          text: response.data.message,
          icon: "success",
        });
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };

  // console.log(isSidebarToggled);
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between ms-3">
      <i
          className="bi bi-list toggle-sidebar-btn"
          style={{ fontSize: "1.8rem" }}
        />
        <a
          href="\"
          className="logo d-flex align-items-center text-decoration-none"
        >
          <img src={Image} style={{ width: "25px", marginLeft: "0.3rem" }} />
          <span
            className="title"
            style={{
              fontSize: "18px",
              marginLeft: "5px",
              fontFamily: "Rubik",
              fontWeight: "500",
            }}
          >
            HARISSA CRM
          </span>
        </a>
      
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          {/* End Search Icon*/}
          {/* <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-bell" style={{ fontSize: "1.4rem" }} />
              <span
                className="badge bg-primary badge-number"
                style={{ fontSize: "0.8rem" }}
              >
                4
              </span>
            </a>
            {/* End Notification Icon */}
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning" />
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>30 min. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-x-circle text-danger" />
                <div>
                  <h4>Atque rerum nesciunt</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>1 hr. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-check-circle text-success" />
                <div>
                  <h4>Sit rerum fuga</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>2 hrs. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-info-circle text-primary" />
                <div>
                  <h4>Dicta reprehenderit</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>4 hrs. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-footer">
                <a href="#">Show all notifications</a>
              </li>
            </ul>
            {/* End Notification Dropdown Items */}
          {/* </li> */}
          {/* End Notification Nav */}
          {/* <li className="nav-item dropdown"> */}
            {/* <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i
                className="bi bi-chat-left-text"
                style={{ fontSize: "1.4rem" }}
              />
              <span
                className="badge bg-success badge-number"
                style={{ fontSize: "0.8rem" }}
              >
                3
              </span>
            </a> */}
            {/* End Messages Icon */}
            {/* <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
              <li className="dropdown-header">
                You have 3 new messages
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="message-item">
                <a href="#">
                  <img src={IconImage} alt className="rounded-circle" />
                  <div>
                    <h4>Maria Hudson</h4>
                    <p>
                      Velit asperiores et ducimus soluta repudiandae labore
                      officia est ut...
                    </p>
                    <p>4 hrs. ago</p>
                  </div>
                </a>
              </li>
            </ul> */}
            {/* End Messages Dropdown Items */}
          {/* </li> */}
          {/* End Messages Nav */}
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src={IconImage}
                alt="Profile"
                className="rounded-circle"
                style={{ width: "38px", height: "50px" }}
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {name}
              </span>
            </a>
            {/* End Profile Iamge Icon */}
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{name}</h6>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="/account-profile"
                >
                  <i className="bi bi-person" />
                  <span>My Profile</span>
                </a>
              </li>
              {/* <li>
                <hr className="dropdown-divider" />
              </li> */}
              {/* <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="users-profile.html"
                >
                  <i className="bi bi-gear" />
                  <span>Account Settings</span>
                </a>
              </li> */}
              {/* <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="pages-faq.html"
                >
                  <i className="bi bi-question-circle" />
                  <span>Need Help?</span>
                </a>
              </li> */}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    Logout();
                  }}
                >
                  <i className="bi bi-box-arrow-right" />
                  <span>Sign Out</span>
                </button>
              </li>
            </ul>
            {/* End Profile Dropdown Items */}
          </li>
          {/* End Profile Nav */}
        </ul>
      </nav>
      {/* End Icons Navigation */}
    </header>
  );
}

export default Topbar;
