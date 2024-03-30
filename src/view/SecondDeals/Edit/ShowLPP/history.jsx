import React from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";

const HistoryDeals = ({ data }) => {
  const dataHistory = [
    {
      name: "Waktu",
      selector: (row) => {
        const date = new Date(row?.created_at);
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
          <div className="mt-2">
            <p style={{ whiteSpace: "normal", fontSize: "10px" }}>{time}</p>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Note",
      selector: (row) => (
        <div
          className="mt-2"
          style={{ whiteSpace: "normal", fontSize: "0.85rem" }}
        >
          <p dangerouslySetInnerHTML={{ __html: row?.note }} />
        </div>
      ),
      wrap: true,
    },
  ];
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#427D9D",
        color: "white",
        marginTop: "12px",
        borderRadius: "5px",
      },
    },
    cells: {
      style: {
        fontSize: "4px",
        fontWeight: "500",
        marginTop: "4px",
      },
    },
  };
  return (
    <Card>
      <DataTable
        data={data}
        columns={dataHistory}
        customStyles={customStyles}
        dense
      />
    </Card>
  );
};

export default HistoryDeals;
