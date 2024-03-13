import React, { useEffect, useState } from "react";
import MenuSidebar from "../../Template/Sidebar/MenuSidebar";
import axios from "axios";

function Sidebar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [accessUser, setAccessUser] = useState([]);

  const getAccess = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user-access-menus/role/${role}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAccessUser(response.data.data);
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.data.message === "Unauthenticated."
      ) {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getAccess(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("error", error);
      }
    }
  };
  useEffect(() => {
    getAccess();
  }, [token, role]);

  return (
    <>
      <aside id="sidebar" className="sidebar shadow-">
        <ul className="sidebar-nav" id="sidebar-nav">
          {accessUser.map((data) => (
            <MenuSidebar
              type={data?.menu?.type}
              name={data?.menu?.name}
              icon={data?.menu?.icon}
              url={data?.menu?.route}
              isActive={data?.menu?.is_active}
            />
          ))}
        </ul>
        <ul className="sidebar-nav" id="sidebar-nav">
          <MenuSidebar
            type="nonCollapse"
            name="Deals /Second"
            icon="bi bi-coin"
            url="/deals-second"
            isActive="1"
          />
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
