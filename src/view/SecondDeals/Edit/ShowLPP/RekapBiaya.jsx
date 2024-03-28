import React from "react";
import DataTable from "react-data-table-component";
import dummy from "../Lpp/dummy";

const RekapBiaya = () => {
  const valueFee = localStorage.getItem("valueFee")
  const valueSupport = localStorage.getItem("valueSupport")
  const valueRab = localStorage.getItem("valueRab")
  const data = [
    {
      name: "RAB Bangunan & Lainnya Terkain",
      nilai_estimasi: valueRab,
    },
    {
      name: "Support Selama Kerja Sama",
      nilai_estimasi: valueSupport,
    },
    {
      name: "Fee Tindakan",
      nilai_estimasi: valueFee,
    },
  ];
  const ColumnsTable = [
    {
      name: "Item",
      selector: (row) => row.name,
    },
    {
      name: "Nilai Estimasi Biaya",
      selector: (row) =>
        `Rp. ${new Intl.NumberFormat().format(row.nilai_estimasi)}`,
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
        data={data}
        columns={ColumnsTable}
        customStyles={customStyle}
        dense
      />
    </div>
  );
};

export default RekapBiaya;
