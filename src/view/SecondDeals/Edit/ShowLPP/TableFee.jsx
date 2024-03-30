import React from "react";
import DataTable from "react-data-table-component";
import dummy from "../Lpp/dummy";

const TableFee = () => {
  const allData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("FeeTindakan")) {
      const data = JSON.parse(localStorage.getItem(key));
      allData.push(data);
    }
  }
  const ColumnsTable = [
    {
      name: "Nama Penerima",
      selector: (row) => row.name,
    },
    {
      name: "Nilai Estimasi Biaya",
      selector: (row) => `Rp. ` + row.nilai,
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
    },
    {
      name: "Total Estimasi Biaya",
      selector: (row) => `Rp. ${new Intl.NumberFormat().format(row.total)}`,
    },
    {
      name: "Catatan Realisasi",
      selector: (row) => row.note,
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
    <div>
      <DataTable
        data={allData[0]}
        columns={ColumnsTable}
        customStyles={customStyle}
        dense
      />
    </div>
  );
};

export default TableFee;
