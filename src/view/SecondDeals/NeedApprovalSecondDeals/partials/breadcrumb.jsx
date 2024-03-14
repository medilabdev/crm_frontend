import { faPersonCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const BreadcrumbNeedApproval = () => {
  return (
    <div className="row">
      <div className="col">
        <div className="pagetitle">
          <h1>
            <FontAwesomeIcon icon={faPersonCircleCheck} className="fs-3" /> Need
            Approval Deals
          </h1>
          <nav>
            <ol className="breadcrumb mt-2">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">
                  Dashboard
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="/deals-second" className="text-decoration-none">
                  Deals
                </a>
              </li>
              <li className="breadcrumb-item active fw-bold">Need Deals</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbNeedApproval;
