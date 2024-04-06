import React from "react";
import DataTable from "react-data-table-component";
import dummy from "../Lpp/dummy";
import { Card } from "react-bootstrap"
const TableSupport = ({ data }) => {
  const allData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("SupportKerjaSama")) {
      const data = JSON.parse(localStorage.getItem(key));
      allData.push(data);
    }
  }
  const ColumnsTable = [
    {
      name: "Item",
      selector: (row) => row.item_uid || "",
    },
    {
      name: "Nilai Estimasi Biaya",
      selector: (row) =>
        row?.estimated_cost
          ? `Rp. ${new Intl.NumberFormat().format(row.estimated_cost)}`
          : "",
    },
    {
      name: "Qty",
      selector: (row) => row.qty || "",
    },
    {
      name: "Total Estimasi Biaya",
      selector: (row) =>
        row?.total_estimated_cost
          ? `Rp. ${new Intl.NumberFormat().format(row.total_estimated_cost)}`
          : "",
    },
    {
      name: "Catatan Realisasi",
      selector: (row) => row.note || "-",
    },
  ];
  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "#496989",
        color: "white",
        marginTop: "15px",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "12px",
      },
    },
    cells: {
      style: {
        fontSize: "8px",
        marginTop: "4px",
        fontWeight: "500",
      },
    },
  };
  return (
    <div className="row mb-2">
      <div className="col">
        <Card>
          <Card.Header>
          <span style={{fontSize:"0.85rem", fontWeight:"500"}}>
                Support selama masa kerjasama (bila ada)
                </span>
          </Card.Header>
          <Card.Body>
          <DataTable
          columns={ColumnsTable}
          data={data?.support || ""}
          customStyles={customStyle}
          dense
        />
          </Card.Body>
        </Card>
        
      </div>
    </div>
  );
};

export default TableSupport;
