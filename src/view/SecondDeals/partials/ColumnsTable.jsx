import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCirclePlus,
  faFolderPlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
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
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Formulir Data Customer</Tooltip>}
        >
          <a
            href="/deals-second/fdc"
            target="_blank"
            rel="noopener noreferrer"
            className="me-3 icon-button text-dark"
          >
            <FontAwesomeIcon icon={faFolderPlus} />
          </a>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Lembar Persetujuan Project</Tooltip>}
        >
          <a
            href="/deals-second/lpp"
            className="me-3 icon-button text-dark"
            target="_blank"
          >
            <FontAwesomeIcon icon={faCirclePlus} />
          </a>
        </OverlayTrigger>
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
