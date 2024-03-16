import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
export const ColumnsTable = [
  {
    name: "Name",
    selector: (row) => (
      <a
        href=""
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
  },
  {
    name: "Jumlah",
  },
  {
    name: "Owner",
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="action-icon">
        <a href="" className="me-3 icon-button text-dark" target="_blank">
          <FontAwesomeIcon icon={faCheck} />
        </a>
        <button className="icon-button" title="delete">
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
