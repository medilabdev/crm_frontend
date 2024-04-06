import React from "react";
import DataTable from "react-data-table-component";
import dummy from "../Lpp/dummy";
import { Card } from "react-bootstrap"
const TableRab = ({ data }) => {

  const alkes = []
  const noAlkse = []
  if(data?.rab?.length > 0){
    data?.rab.forEach((item) => {
      if(item?.is_alkes === "yes"){
        alkes.push({ ...item})
      }else if(item?.is_alkes === "no"){
        noAlkse.push({ ...item})
      }
    })
  }
   
    

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

  const ColumnsTable = [
    {
      name: "Item",
      selector: (row) => row.item_uid || "",
    },
    {
      name: "Nilai Estimasi Biaya",
      selector: (row) =>
        row.estimated_cost
          ? `Rp. ${new Intl.NumberFormat().format(row.estimated_cost)}`
          : "",
    },
    {
      name: "Qty",
      selector: (row) => (row.qty ? row.qty : ""),
    },
    {
      name: "Total Estimasi Biaya",
      selector: (row) =>
        row.total_estimated_cost
          ? `Rp. ${new Intl.NumberFormat().format(row.total_estimated_cost)}`
          : "-",
    },
    {
      name: "Catatan Realisasi",
      selector: (row) => (row.note ? row.note : ""),
    },
  ];
  return (
    <div className="row mb-2">
      <div className="col">
        <Card>
          <Card.Header>
          <span style={{fontSize:"0.85rem", fontWeight:"500"}}>
                RAB Bangunan & Lainnya terkait pembiayaan di awal
                </span>
          </Card.Header>
          <Card.Body>
          <DataTable
      className="mb-2"
        columns={ColumnsTable}
        data={alkes}
        customStyles={customStyle}
        dense
      />
      <DataTable
      className="mb-2"
        columns={ColumnsTable}
        data={noAlkse}
        customStyles={customStyle}
        dense
      />
          </Card.Body>
        </Card>
      </div>
      
    </div>
  );
};

export default TableRab;
