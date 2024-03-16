import React from "react";
import DataTable from "react-data-table-component";
import dummy from "./dummy";
import { Card } from "react-bootstrap";

const DataTableFeeAction = () => {
  const ColumnsTable = [
    {
      name: "Nama Penerima",
      selector: (row) => row.name,
    },
    {
      name: "Nilai Estimasi Biaya",
      selector: (row) => row.nilai,
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
    },
    {
      name: "Total Estimasi Biaya",
      selector: (row) => row.total,
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
            <div className="float-end">
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

export default DataTableFeeAction;
