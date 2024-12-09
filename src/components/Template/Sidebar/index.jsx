import React, { useEffect, useState } from "react";
import MenuSidebar from "../../Template/Sidebar/MenuSidebar";
import { useDispatch } from "react-redux";
import { GetDataSidebar } from "../../../action/DataSideBar";
import { useSelector } from "react-redux";

function Sidebar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const { sidebarData } = useSelector((state) => state.DataSideBar);
  const dispatch = useDispatch();
  const [dataToRender, setDataToRender] = useState(null);
  useEffect(() => {
    const storedSideBarData = localStorage.getItem("sidebarData");
  
    if (storedSideBarData) {
      try {
        setDataToRender(JSON.parse(storedSideBarData));
      } catch (error) {
        console.error("Failed to parse sidebarData from localStorage:", error);
        localStorage.removeItem("sidebarData"); // Bersihkan data corrupt
      }
    } else if (sidebarData) {
      localStorage.setItem("sidebarData", JSON.stringify(sidebarData));
      setDataToRender(sidebarData);
    } else {
      dispatch(GetDataSidebar(role, token));
    }
  }, [dispatch, sidebarData, role, token]);
  
  return (
    <>
      <aside id="sidebar" className="sidebar shadow">
        <ul className="sidebar-nav" id="sidebar-nav">
          {dataToRender &&
            dataToRender.map((data, index) => (
              <MenuSidebar
                key={index}
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
