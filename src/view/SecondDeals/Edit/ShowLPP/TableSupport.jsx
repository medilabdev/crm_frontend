import React from "react";
import DataTable from "react-data-table-component";
import dummy from "../Lpp/dummy";

const TableSupport = () => {
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
      selector: (row) => row.item,
    },
    {
      name: "Nilai Estimasi Biaya",
      selector: (row) =>
        `Rp. ${new Intl.NumberFormat().format(row.nilai_estimasi_biaya)}`,
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
    },
    {
      name: "Total Estimasi Biaya",
      selector: (row) =>
        `Rp. ${new Intl.NumberFormat().format(row.total_estimasi_biaya)}`,
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
      <div>
        <DataTable
          columns={ColumnsTable}
          data={allData[0]}
          customStyles={customStyle}
          dense
        />
      </div>
    </div>
  );
};

export default TableSupport;
