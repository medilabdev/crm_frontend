import React from "react";
import DataTable from "react-data-table-component";
import dummy from "./dummy";

const DataTableRekapBiaya = () => {
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
  return (
    <div className="row mb-2">
      <div className="col">
        <h6 className="fw-bold ms-2 mt-3">Rekapitulasi Biaya</h6>
        <DataTable columns={ColumnsTable} data={dummy} />
      </div>
    </div>
  );
};

export default DataTableRekapBiaya;
