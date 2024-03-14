import { faArrowsTurnToDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const TopButton = ({ handleDeleteSelected }) => {
  return (
    <div className="row button-contact mb-3">
      <div className="colmb-2">
        <div className="d-flex float-end">
          <div class="dropdown button-flex">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
            >
              Add Contact
            </button>
            <ul class="dropdown-menu">
              <li>
                <Link class="dropdown-item" to="/single-contact">
                  Single Contact
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/contact/upload-file">
                  Upload File
                </Link>
              </li>
            </ul>
          </div>
          {/* <div class="dropdown donwload">
          <button
            class="btn btn-outline-primary dropdown-toggle ms-2"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
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
            to="/contact/bulk-change"
            class="btn btn-outline-primary ms-2 bulk-change"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            <FontAwesomeIcon icon={faArrowsTurnToDots} className="me-2" />
            Bulk Change
          </Link>
          <button
            class="btn btn-danger ms-2 delete"
            onClick={handleDeleteSelected}
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
