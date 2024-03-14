import {
  faBuildingFlag,
  faBuildingUser,
  faLayerGroup,
  faList,
  faPeopleGroup,
  faPersonRays,
  faReceipt,
  faStairs,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarProperties = () => {
  const location = useLocation();
  return (
    <div className="col-md-3 p-2 border-end">
      <div className="d-flex flex-column border rounded shadow-sm mt-4">
        <Link
          to="/properties"
          className="text-decoration-none text-black fw-semibold border-bottom documents "
        >
          <div
            className={`input-group ${
              location.pathname === "/properties" ? "active-side" : ""
            }`}
          >
            <FontAwesomeIcon icon={faPeopleGroup} className="mt-2 ms-4 fs-3" />
            <p
              className="ms-2"
              style={{ fontSize: "0.95rem", marginTop: "10px" }}
            >
              Teams
            </p>
          </div>
        </Link>
        <Link
          to="/properties/position"
          className="text-decoration-none text-black fw-semibold border-bottom documents "
        >
          <div
            className={`input-group ${
              location.pathname === "/properties/position" ? "active-side" : ""
            }`}
          >
            <FontAwesomeIcon icon={faBuildingUser} className="mt-2 ms-4 fs-3" />
            <p
              className="ms-2"
              style={{
                fontSize: "0.95rem",
                marginTop: "10px",
                fontWeight: "500",
              }}
            >
              Position
            </p>
          </div>
        </Link>
        <Link
          to="/properties/roles"
          className="text-decoration-none text-black fw-semibold border-bottom documents "
        >
          <div
            className={`input-group ${
              location.pathname === "/properties/roles" ? "active-side" : ""
            }`}
          >
            <FontAwesomeIcon icon={faPersonRays} className="mt-2 ms-4 fs-3" />
            <p
              className="ms-3"
              style={{
                fontSize: "0.95rem",
                marginTop: "10px",
                fontWeight: "500",
              }}
            >
              Roles
            </p>
          </div>
        </Link>
        <Link
          to="/properties/source"
          className="text-decoration-none text-black fw-semibold border-bottom documents "
        >
          <div
            className={`input-group ${
              location.pathname === "/properties/source" ? "active-side" : ""
            }`}
          >
            <FontAwesomeIcon icon={faReceipt} className="mt-2 ms-4 fs-3" />
            <p
              className="ms-4"
              style={{
                fontSize: "0.95rem",
                marginTop: "10px",
                fontWeight: "500",
              }}
            >
              Source
            </p>
          </div>
        </Link>
        <Link
          to="/properties/company-type"
          className="text-decoration-none text-black fw-semibold border-bottom documents "
        >
          <div
            className={`input-group ${
              location.pathname === "/properties/company-type"
                ? "active-side"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faBuildingFlag} className="mt-2 ms-4 fs-3" />
            <p
              className="ms-2"
              style={{
                fontSize: "0.95rem",
                marginTop: "10px",
                fontWeight: "500",
              }}
            >
              Company Type
            </p>
          </div>
        </Link>
        <Link
          to="/properties/deal-stage"
          className="text-decoration-none text-black fw-semibold border-bottom documents "
        >
          <div
            className={`input-group ${
              location.pathname === "/properties/deal-stage"
                ? "active-side"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faStairs} className="mt-2 ms-4 fs-3" />
            <p
              className="ms-2"
              style={{
                fontSize: "0.95rem",
                marginTop: "10px",
                fontWeight: "500",
              }}
            >
              Deal Stage
            </p>
          </div>
        </Link>
        <Link
          to="/properties/category-expanse"
          className="text-decoration-none text-black fw-semibold border-bottom documents "
        >
          <div
            className={`input-group ${
              location.pathname === "/properties/category-expanse"
                ? "active-side"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faLayerGroup} className="mt-2 ms-4 fs-3" />
            <p
              className="ms-3"
              style={{
                fontSize: "0.95rem",
                marginTop: "10px",
                fontWeight: "500",
              }}
            >
              Category Expense
            </p>
          </div>
        </Link>
        <Link
          to="/properties/menu-management"
          className="text-decoration-none text-black fw-semibold border-bottom documents "
        >
          <div
            className={`input-group ${
              location.pathname === "/properties/menu-managemen"
                ? "active-side"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faList} className="mt-2 ms-4 fs-3" />
            <p
              className="ms-3"
              style={{
                fontSize: "0.95rem",
                marginTop: "10px",
                fontWeight: "500",
              }}
            >
              Menu Management
            </p>
          </div>
        </Link>
        <Link
          to="/properties/user-access-menu"
          className="text-decoration-none text-black fw-semibold border-bottom documents "
        >
          <div
            className={`input-group ${
              location.pathname === "/properties/user-access-menu"
                ? "active-side"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faUniversalAccess} className="mt-2 ms-4 fs-3"/>
            <p
              className="ms-3"
              style={{
                fontSize: "0.95rem",
                marginTop: "10px",
                fontWeight: "500",
              }}
            >
              User Access Menu
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarProperties;
