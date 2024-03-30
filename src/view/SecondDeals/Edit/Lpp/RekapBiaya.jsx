import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const DataTableRekapBiaya = () => {

  const data = [
    {
      name: "RAB Bangunan & Lainnya Terkain",
      // nilai_estimasi: ValueRab,
    },
    {
      name: "Support Selama Kerja Sama",
      // nilai_estimasi: priceFee,
    },
    {
      name: "Fee Tindakan",
      // nilai_estimasi: ValueFee,
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
    <div className="row mb-5">
      <div className="col">
        <h6 className="fw-bold ms-2 mt-3">Rekapitulasi Biaya</h6>
        <DataTable
          columns={ColumnsTable}
          data={data}
          dense
          customStyles={customStyle}
        />
      </div>
    </div>
  );
};

export default DataTableRekapBiaya;
