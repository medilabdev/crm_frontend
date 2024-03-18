import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
export const ColumnsTable = [
  {
    name: "Name",
    selector: (row) => (
      <a
        href="/deals-second/123123/edit"
        target="_blank"
        className="text-decoration-none"
        style={{ whiteSpace: "normal", color: "black", fontWeight: "540" }}
      >
        {row.name}
      </a>
    ),
    sortable: true,
  },
  {
    name: "Stage",
    selector: (row) => (
      <div>
        <p
          className={`btn ${
            row.stage === "Closed Won"
              ? "btn-success"
              : row.stage === "Closed Lost"
                ? "btn-danger"
                : "btn-primary"
          }`}
          style={{ fontSize: "0.65rem" }}
        >
          {row.stage}
        </p>
      </div>
    ),
  },
  {
    name: "Jumlah",
    selector: (row) => <p className="fw-semibold">Rp. {row.jumlah}</p>,
  },
  {
    name: "Owner",
    selector: (row) => row.owner,
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="action-icon">
        <a
          href="/deals-second/123123/edit"
          className="me-2 icon-button text-dark"
          target="_blank"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </a>
        <button className="icon-button">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    ),
  },
];

export const CustomStyles = {
  head: {
    style: {
      fontWeight: "650",
    },
  },
};
