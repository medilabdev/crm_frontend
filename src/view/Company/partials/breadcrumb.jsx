import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const BreadcrumbCompany = () => {
  return (
    <div className="row">
      <div className="col">
        <div className="pagetitle">
          <h1>
            <FontAwesomeIcon icon={faBuilding} className="fs-3 me-2" /> Company
          </h1>
          <nav>
            <ol className="breadcrumb mt-2">
              <li className="breadcrumb-item">
                <a href="/" className="breadcrumb-item text-decoration-none">
                  Dashboard
                </a>
              </li>
              <li className="breadcrumb-item active">Company</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbCompany;
