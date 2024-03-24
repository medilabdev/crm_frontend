import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { handleApprove, handleReject } from "./Approve";
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
        {row.deal?.fqp_document?.hospital?.name ?? "-"}
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
          {row?.staging.name ?? "-"}
        </p>
      </div>
    ),
  },
  {
    name: "Owner",
    selector: (row) => (
      <p className="mt-2" style={{ fontWeight: "600" }}>
        {row.deal?.owner?.name ?? "-"}
      </p>
    ),
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="action-icon">
        <button
          type="button"
          onClick={() => handleApprove(row.uid)}
          className="me-3 badge bg-success"
          style={{ border: "none" }}
        >
          <FontAwesomeIcon icon={faCheck} className="text-white fw-bold" />
        </button>
        <button
          type="button"
          onClick={() => handleReject(row.uid)}
          className="badge bg-danger"
          style={{ border: "none" }}
          title="delete"
        >
          <FontAwesomeIcon icon={faXmark} />
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
