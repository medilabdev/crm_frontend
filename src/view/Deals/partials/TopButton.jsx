import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const TopButton = ({ handleDeleteSelect }) => {
  return (
    <div className="row">
      <div className="col mb-2">
        <div className="d-flex float-end">
          <div className="dropdown button-flex">
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
              {/* <li>
              <Link className="dropdown-item" to="">
                Upload Product
              </Link>
            </li> */}
            </ul>
          </div>
          {/* <div className="dropdown button-flex">
          <button
            className="btn btn-outline-primary dropdown-toggle ms-2"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Donwload
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                Donwload Selected
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Donwload All
              </a>
            </li>
          </ul>
        </div> */}
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
            Bulk Change
          </Link>
          <button
            onClick={handleDeleteSelect}
            className="btn btn-danger ms-2"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopButton;
