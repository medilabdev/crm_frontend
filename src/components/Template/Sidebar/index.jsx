import React, { useEffect, useState } from "react";
import MenuSidebar from "../../Template/Sidebar/MenuSidebar";
import axios from "axios";

function Sidebar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [accessUser, setAccessUser] = useState([]);
  const getAccess = (token, role) => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/user-access-menus/role/${role}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setAccessUser(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  useEffect(() => {
    getAccess(token, role);
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
      </aside>
    </>
  );
}

export default Sidebar;
