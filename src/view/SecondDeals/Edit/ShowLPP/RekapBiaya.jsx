import React from "react";
import DataTable from "react-data-table-component";
import dummy from "../Lpp/dummy";

const RekapBiaya = () => {
  const ColumnsTable = [
    {
      name: "Item",
      selector: (row) => row.item,
    },
    {
      name: "Nilai Estimasi Biaya",
      selector: (row) => row.nilai_estimasi,
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
    },
    {
      name: "Total Estimasi Biaya",
      selector: (row) => row.total_estimasi,
    },
    {
      name: "Catatan Realisasi",
      selector: (row) => row.catatan,
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
        data={dummy}
        columns={ColumnsTable}
        customStyles={customStyle}
        dense
      />
    </div>
  );
};

export default RekapBiaya;
