import { ur } from "@faker-js/faker";
import { faGauge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MenuSidebar = ({ type, name, icon, url, isActive }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const loadingBarRef = useRef(null);
  const [urlActive, setUrlActive] = useState(false);


  
  useEffect(() => {
    if (location.pathname === url) {
      setUrlActive(true);
    } else {
      setUrlActive(false);
    }
  }, [location.pathname, url]);

  // Handle link click to show loading overlay
  const handleLinkClick = () => {
  };
  
  
  return (
    <div style={{ position: "relative" }}>

      {type !== "collapse" ? (
        <>
          <li className={`nav-item mt-1  ${isActive || window.location.pathname.startsWith(url) ? "active" : "d-none"} `}>
            <a
              href={url}
              className={`nav-link ${urlActive ? "" : "collapsed"}`}
            >
              <i className={icon} style={{ fontSize: "1rem", color: "gray", color: urlActive ? "white" : "hsl(218, 22%, 32%)"  }} />
              <span style={{ fontSize: "1rem", fontWeight: "450",  color: urlActive ? "white" : "hsl(218, 22%, 32%)"  }}>{name}</span>
            </a>
          </li>
        </>
      ) : (
        '='
        // <li className="nav-item">
        //   <a className={`nav-link ${urlActive ? "" : "collapsed"}`}>
        //     <i
        //       className="bi bi-menu-button-wide"
        //       style={{ fontSize: "0.95rem" }}
        //     />
        //     <span style={{ fontSize: "0.85rem" }}>{name}</span>
        //     <i
        //       className="bi bi-chevron-down ms-auto"
        //       style={{ fontSize: "0.85rem" }}
        //     />
        //   </a>
        //   <ul id="products" data-bs-parent="#sidebar-nav">
        //     <li>
        //       <a href="/package-product" className="text-decoration-none">
        //         <i className="bi bi-circle" />
        //         <span>Product Package</span>
        //       </a>
        //     </li>
        //     <li>
        //       <a href="/products" className="text-decoration-none">
        //         <i className="bi bi-circle" />
        //         <span>Single Product</span>
        //       </a>
        //     </li>
        //   </ul>
        // </li>
      )}
    </div>
  );
};

export default MenuSidebar;
