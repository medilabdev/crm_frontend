import React, { useState } from "react";
import MenuSidebar from "../../Template/Sidebar/MenuSidebar";

function Sidebar() {
  return (
    <>
      <aside id="sidebar" className="sidebar shadow-">
        <ul className="sidebar-nav" id="sidebar-nav">
          <MenuSidebar
            type="nonCollapse"
            name="Dashboard"
            key="dashboard"
            icon="bi bi-grid"
            noCollapse={true}
            url="/"
            isActive={1}
          />
          {/* <MenuSidebar
            type="collapse"
            name="Report Template"
            key="report-template"
            icon="bi bi-clipboard-data-fill"
            noCollapse={true}
            url="/report-template"
            isActive={1}
          /> */}
          <MenuSidebar
            typeMenu="nonCollapse"
            name="Contact"
            key="contact"
            url="/contact"
            icon="bi bi-person-rolodex"
            noCollapse={true}
            isActive={1}
          />
          <MenuSidebar
            typeMenu="nonCollapse"
            name="Users"
            key="users"
            url="/users"
            icon="bi bi-person-fill"
            noCollapse={true}
            isActive={1}
          />
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
