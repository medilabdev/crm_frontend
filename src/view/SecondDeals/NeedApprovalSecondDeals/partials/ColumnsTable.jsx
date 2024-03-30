import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { handleApprove, handleReject } from "./Approve";

export const position = localStorage.getItem("position");
export const ColumnsTable = [
  {
    name: "Name",
    selector: (row) => (
      <a
        href={`/deals-second/${row.deals_uid}/edit`}
        target="_blank"
        className="text-decoration-none"
        style={{ whiteSpace: "normal", color: "black", fontWeight: "540" }}
      >
        {console.log(row)}
        {row.deal?.fqp_document?.hospital?.name ?? "-"}
      </a>
    ),
    sortable: true,
  },
  {
    name: "Request To Stage",
    selector: (row) => (
      <div>
        <p
          className={`btn mt-3 ${
            row.staging?.name === "Closed Won" ||
            row.staging?.name === "Implementation"
              ? "btn-success"
              : row.staging?.name === "Closed Lost"
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
    name: "Status",
    selector: (row) => {
      return (
        <>
          {position === "pRGYXVKdzCPoQ8" ? (
            row.manager_approval == 0 ? (
              <p style={{ fontWeight: "600" }}>Waiting</p>
            ) : (
              <p style={{ fontWeight: "600" }}>Approved</p>
            )
          ) : row.manager_approval == 2 ? (
            <p style={{ fontWeight: "600" }}>Reject</p>
          ) : position === "_dLjLFdH-Nw8vg8U" ? (
            row.finance_approval == 0 ? (
              <p style={{ fontWeight: "600" }}>Waiting</p>
            ) : (
              <p style={{ fontWeight: "600" }}>Approved</p>
            )
          ) : row.finance_approval == 2 ? (
            <p style={{ fontWeight: "600" }}>Reject</p>
          ) : position === "pRGYXVKdzCPoQ1" ? (
            row.director_approval == 0 ? (
              <p style={{ fontWeight: "600" }}>Waiting</p>
            ) : (
              <p style={{ fontWeight: "600" }}>Approved</p>
            )
          ) : row.director_approval == 2 ? (
            <p style={{ fontWeight: "600" }}>Reject</p>
          ) : (
            ""
          )}
        </>
      );
    },
  },
  {
    name: "Owner",
    selector: (row) => {
      // console.log(row);
      const date = new Date(row.created_at);
      const formatDate = {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      const formatResult = new Intl.DateTimeFormat("en-US", formatDate);
      const time = formatResult.format(date);
      return (
        <div>
          <p
            className="mt-2 fw-bold"
            style={{
              fontSize: "0.90rem",
              fontWeight: "bold",
              whiteSpace: "normal",
            }}
          >
            {row.deal?.owner?.name ?? "-"}
          </p>
          <p
            style={{
              fontSize: "0.70rem",
              marginTop: "-8px",
              whiteSpace: "normal",
            }}
          >
            {time}
          </p>
        </div>
      );
    },
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) =>
      position === "pRGYXVKdzCPoQ8" ? (
        row.manager_approval == 0 ? (
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
        ) : (
          ""
        )
      ) : position === "_dLjLFdH-Nw8vg8U" ? (
        row.finance_approval == 0 ? (
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
        ) : (
          ""
        )
      ) : position === "pRGYXVKdzCPoQ1" ? (
        row.director_approval == 0 ? (
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
        ) : (
          ""
        )
      ) : (
        ""
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
