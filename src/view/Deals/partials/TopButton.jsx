import {
  faArrowsTurnToDots,
  faFileExcel,
  faHandshake,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const TopButton = ({ handleDeleteSelect, onExportClick }) => {
  return (
    <div className="row mb-2">
      <div className="col ms-3 mb-2 ms-4">
        <div className="d-flex float-end">
          <div className="dropdown float-end">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ fontWeight: "600", fontSize: "0.85rem" }}
            >
              Add Deals
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="/deals/single-deals">
                  Single Deal
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item text-decoration-none"
                  href="/deals/upload-deals"
                >
                  Upload Deals
                </a>
              </li>
            </ul>
          </div>

          <Link
            to="/deals/need-approval"
            className="btn btn-primary ms-2"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            <FontAwesomeIcon icon={faHandshake} className="me-2" />
            Need Approval
          </Link>

          <Link
            to="/deals/bulk-change"
            className="btn btn-outline-primary ms-2 text-decoration-none"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            <FontAwesomeIcon icon={faArrowsTurnToDots} className="me-2" />
            Bulk Change
          </Link>

          <button
            onClick={handleDeleteSelect}
            className="btn btn-danger ms-2 me-2"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            <FontAwesomeIcon icon={faTrash} className="me-2" />Delete
          </button>

          <button
            onClick={onExportClick} // <-- props dari parent
            className="btn btn-success"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            <FontAwesomeIcon icon={faFileExcel} className="me-2" /> Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopButton;
