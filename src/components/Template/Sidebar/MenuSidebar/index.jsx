import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MenuSidebar = ({ type, name, key, icon, noCollapse, url, isActive }) => {
  const location = useLocation();
  const [urlActive, setUrlActive] = useState(false);

  useEffect(() => {
    if (location.pathname === url) {
      setUrlActive(true);
    } else {
      setUrlActive(false);
    }
  }, [location.pathname, url]);

  return (
    <>
      {type !== "collapse" ? (
        <>
          <li className={`nav-item ${isActive ? "" : "d-none"} `}>
            <a
              className={`nav-link ${urlActive ? "" : "collapsed"}`}
              href={url}
            >
              <i className={icon} style={{ fontSize: "0.85rem" }} />
              <span style={{ fontSize: "0.85rem" }}>{name}</span>
            </a>
          </li>
        </>
      ) : (
        <li className="nav-item">
          <a
            className={`nav-link ${urlActive ? "" : "collapsed"}`}
            data-bs-target="#components-nav"
            data-bs-toggle={type}
            href={url}
          >
            <i
              className="bi bi-menu-button-wide"
              style={{ fontSize: "0.85rem" }}
            />
            <span style={{ fontSize: "0.85rem" }}>{name}</span>
            <i
              className="bi bi-chevron-down ms-auto"
              style={{ fontSize: "0.85rem" }}
            />
          </a>
          <ul
            id="components-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="components-alerts.html">
                <i className="bi bi-circle" />
                <span>Alerts</span>
              </a>
            </li>
          </ul>
        </li>
      )}
    </>
  );
};

export default MenuSidebar;
