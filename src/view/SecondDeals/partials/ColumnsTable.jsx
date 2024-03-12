import React from "react";

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
  },
];

export const CustomStyles = {
  head: {
    style: {
      fontWeight: "650",
    },
  },
};
