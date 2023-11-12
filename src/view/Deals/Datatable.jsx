import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";

const DataTableComponet = ({ data, selectUidDataTable }) => {
  const token = localStorage.getItem("token");

  const columns = [
    {
      name: "Name",
      selector: (row) => row.deal_name,
      cell: (row) => (
        <div style={{ whiteSpace: "normal" }}>{row.deal_name}</div>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Stage",
      selector: (row) => row.staging?.name,
      sortable: true,
    },
    {
      name: "Jumlah/Tertanggal",
      selector: (row) => `Rp. ${new Intl.NumberFormat().format(row.deal_size)}`,
      sortable: true,
      width: "150px",
    },
    {
      name: "Associated with",
      //   selector:
      sortable: true,
      width: "150px",
    },
    {
      name: "Owner/Created",
      selector: (row) => {
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
              className="mt-2 fw-semibold"
              style={{ fontSize: "13px", whiteSpace: "normal" }}
            >
              {row.owner?.name} -
            </p>
            <p style={{ marginTop: "-8px", whiteSpace: "normal" }}>{time}</p>
          </div>
        );
      },
      sortable: true,
      width: "130px",
    },
    {
      name: "Approval Status",
      selector: (row) => {
        return "-";
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Updated at",
      selector: (row) => {
        const date = new Date(row.updated_at);
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
          <p
            className="mt-2"
            style={{ fontSize: "11px", whiteSpace: "normal" }}
          >
            {time}
          </p>
        );
      },
      sortable: true,
      width: "120px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <button className="ms-2 icon-button" title="edit">
            <i className="bi bi-pen edit"></i>
          </button>
          <button className="icon-button" title="delete">
            <i className="bi bi-trash-fill danger"></i>
          </button>
        </div>
      ),
      width: "120px",
    },
  ];
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        defaultSortFieldId={1}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        selectableRows
        onSelectedRowsChange={selectUidDataTable}
      />
    </div>
  );
};

export default DataTableComponet;
