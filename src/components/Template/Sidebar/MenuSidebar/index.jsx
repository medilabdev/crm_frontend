import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MenuSidebar = ({ type, name, icon, url, isActive }) => {
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
          <li className={`nav-item mt-1  ${isActive ? "active" : "d-none"} `}>
            <a
              href={url}
              className={`nav-link ${urlActive ? "" : "collapsed"}`}
            >
              <i className={icon} style={{ fontSize: "0.95rem" }} />
              <span style={{ fontSize: "0.95rem" }}>{name}</span>
            </a>
          </li>
        </>
      ) : (
        <li className="nav-item">
          <a className={`nav-link ${urlActive ? "" : "collapsed"}`}>
            <i
              className="bi bi-menu-button-wide"
              style={{ fontSize: "0.95rem" }}
            />
            <span style={{ fontSize: "0.85rem" }}>{name}</span>
            <i
              className="bi bi-chevron-down ms-auto"
              style={{ fontSize: "0.85rem" }}
            />
          </a>
          <ul id="products" data-bs-parent="#sidebar-nav">
            <li>
              <a href="/package-product" className="text-decoration-none">
                <i className="bi bi-circle" />
                <span>Product Package</span>
              </a>
            </li>
            <li>
              <a href="/products" className="text-decoration-none">
                <i className="bi bi-circle" />
                <span>Single Product</span>
              </a>
            </li>
          </ul>
        </li>
      )}
    </>
  );
};

export default MenuSidebar;
