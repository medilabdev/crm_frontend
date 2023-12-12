import React, { useEffect, useState } from "react";
import MenuSidebar from "../../Template/Sidebar/MenuSidebar";
import axios from "axios";

function Sidebar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [accessUser, setAccessUser] = useState([]);


  const MAX_RETRIES = 3;
  const getAccess = async (retryCount = 0) => {
    try{
      const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/user-access-menus/role/${role}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
       setAccessUser(response.data.data)
    }catch(error){
      if (
        error.response.data.message === "Unauthenticated"
      ) {
        localStorage.clear();
        window.location.href = "/login";
      } 
      if(error.response && error.response.status === 429 && retryCount < MAX_RETRIES){
        const delay = Math.pow(2, retryCount) * 2000;
          await new Promise((resolve) => setTimeout(resolve, delay))
          await getAccess(retryCount + 1)
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
      </aside>
    </>
  );
}

export default Sidebar;
