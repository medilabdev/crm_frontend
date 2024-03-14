import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <div className="row">
      <div className="col">
        <div className="pagetitle">
          <h1>
            <FontAwesomeIcon icon={faPhoneVolume} className="fs-4 me-2" />{" "}
            Contact
          </h1>
          <nav>
            <ol className="breadcrumb mt-2">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item active fw-bold">Contact</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
