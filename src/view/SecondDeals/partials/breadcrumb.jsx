import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <div className="row">
      <div className="col">
        <div className="pagetitle">
          <h1>
            <FontAwesomeIcon icon={faSackDollar} className="fs-3" /> Deals
          </h1>
          <nav>
            <ol className="breadcrumb mt-2">
              <li className="breadcrumb-item">
                <Link to="/" className="breadcrumb-item text-decoration-none">
                  Dashboard
                </Link>
              </li>
              <li
                className="breadcrumb-item active"
                style={{ fontWeight: "600" }}
              >
                Deals
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
