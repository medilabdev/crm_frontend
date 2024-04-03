import React from "react";
import DataTable from "react-data-table-component";
import dummy from "../Lpp/dummy";

const TableRab = ({ data }) => {
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
      name: "Is Alkes",
      selector: (row) => (row.is_alkes === "yes" ? "Iya" : "Tidak"),
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
    <div>
      <DataTable
        columns={ColumnsTable}
        data={data?.support}
        customStyles={customStyle}
        dense
      />
    </div>
  );
};

export default TableRab;
