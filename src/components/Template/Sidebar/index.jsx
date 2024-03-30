import React, { useEffect } from "react";
import MenuSidebar from "../../Template/Sidebar/MenuSidebar";
import { useDispatch } from "react-redux";
import { GetDataSidebar } from "../../../action/DataSideBar";
import { useSelector } from "react-redux";

function Sidebar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const { sidebarData } = useSelector((state) => state.DataSideBar);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetDataSidebar(role, token));
  }, [dispatch]);
  return (
    <>
      <aside id="sidebar" className="sidebar shadow">
        <ul className="sidebar-nav" id="sidebar-nav">
          {sidebarData &&
            sidebarData.map((data, index) => (
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
        <ul className="sidebar-nav" id="sidebar-nav">
          <MenuSidebar
            type="nonCollapse"
            name="Deals"
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
