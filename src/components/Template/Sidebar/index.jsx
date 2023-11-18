import React, { useEffect, useState } from "react";
import MenuSidebar from "../../Template/Sidebar/MenuSidebar";

function Sidebar() {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  useEffect(() => {
    return () => {
      setOpenSubMenu(null);
    };
  }, []);
  return (
    <>
      <aside id="sidebar" className="sidebar shadow-">
        <ul className="sidebar-nav" id="sidebar-nav">
          <MenuSidebar
            type="nonCollapse"
            name="Dashboard"
            icon="bi bi-grid"
            url="/"
            isActive={1}
          />

          <MenuSidebar
            typeMenu="nonCollapse"
            name="Contact"
            url="/contact"
            icon="bi bi-person-rolodex"
            isActive={1}
          />
          <MenuSidebar
            type="nonCollapse"
            name="Company"
            url="/company"
            icon="bi bi-building"
            isActive={1}
          />
          <MenuSidebar
            type="nonCollapse"
            name="Products"
            url="/products"
            icon="bi bi-archive-fill"
            isActive={1}
          />
          {/* <MenuSidebar
            type="collapse"
            name="Report Template"
            icon="bi bi-clipboard-data-fill"
            url="/report-template"
            isActive={1}
            dataBsTarget="#components-nav"
            openSubMenu={openSubMenu}
            setOpenSubMenu={setOpenSubMenu}
          /> */}
          <MenuSidebar
            typeMenu="nonCollapse"
            name="Documents"
            url="/documents"
            icon="bi bi-file-earmark-text-fill"
            isActive={1}
          />
          <MenuSidebar
            typeMenu="nonCollapse"
            name="Deals"
            url="/deals"
            icon="bi bi-tags"
            isActive={1}
          />
            <MenuSidebar
            typeMenu="nonCollapse"
            name="Task"
            url="/task"
            icon="bi bi-list-task"
            isActive={1}
          />
          <MenuSidebar
            typeMenu="nonCollapse"
            name="Users"
            url="/users"
            icon="bi bi-person-fill"
            isActive={1}
          />

          <MenuSidebar
            typeMenu="nonCollapse"
            name="Properties"
            url="/properties"
            icon="bi bi-gear-fill"
            isActive={1}
          />
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
