import React from "react";
import DataTable from "react-data-table-component";
import dummy from "../Lpp/dummy";
import { Card } from "react-bootstrap"

const TableFee = ({ data }) => {

  const ColumnsTable = [
    {
      name: "Nama Penerima",
      selector: (row) => (
        <span
        style={{
          display: "inline-block",
          maxWidth: "200px", // Sesuaikan dengan kebutuhan
          wordWrap: "break-word", // Memastikan kata-kata pecah jika terlalu panjang
          whiteSpace: "normal", // Mengizinkan pembungkusan teks
        }}
        >
          {row.recieve_name || "-"}
        </span>
      ),
    },
    {
      name: "Nilai Estimasi Biaya",
      selector: (row) => `Rp. ` + row.value || "-",
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
    },
    {
      name: "Total Estimasi Biaya",
      selector: (row) => row?.total ? `Rp. ${new Intl.NumberFormat().format(row.total)}` : "",
    },
    {
      name: "Catatan Realisasi",
      selector: (row) =>(
        <span
        style={{
          display: "inline-block",
          maxWidth: "250px", // Sesuaikan dengan kebutuhan
          wordWrap: "break-word", // Memastikan kata-kata pecah jika terlalu panjang
          whiteSpace: "normal", // Mengizinkan pembungkusan teks
        }}
        >
       {row.realization_note || "-"},
      </span>)
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
          Fee Tindakan (bila ada)
                </span>
          </Card.Header>
          <Card.Body>
          <DataTable
        data={data?.fee || ""}
        columns={ColumnsTable}
        customStyles={customStyle}
        dense
      />
          </Card.Body>
          </ Card>
      </div>
     
    </div>
  );
};

export default TableFee;
