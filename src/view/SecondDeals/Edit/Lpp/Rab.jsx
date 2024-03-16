import React from "react";
import DataTable from "react-data-table-component";
import dummy from "./dummy";
import { Card } from "react-bootstrap";

const DataTableRab = () => {
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
        <Card>
          <Card.Header>
            <div className="">
              <button type="button" className="btn btn-primary">
                Tambah
              </button>
            </div>
          </Card.Header>
          <DataTable columns={ColumnsTable} data={dummy} />
        </Card>
      </div>
    </div>
  );
};

export default DataTableRab;
