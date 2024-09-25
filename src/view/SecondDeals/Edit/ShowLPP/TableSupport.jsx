import React from "react";
import DataTable from "react-data-table-component";
import dummy from "../Lpp/dummy";
import { Card } from "react-bootstrap"
const TableSupport = ({ data }) => {
  const position = localStorage.getItem('position')
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
      selector: (row) => (
        <span
        style={{
          display: "inline-block",
          maxWidth: "200px", // Sesuaikan dengan kebutuhan
          wordWrap: "break-word", // Memastikan kata-kata pecah jika terlalu panjang
          whiteSpace: "normal", // Mengizinkan pembungkusan teks
        }}
        >
          {row.item_uid || "-"}
        </span>
      ),
    },
    position !== "573MloZ8j--aaQ" ? 
    {
      name: "Nilai Estimasi Biaya",
      selector: (row) =>
        row?.estimated_cost
          ? `Rp. ${new Intl.NumberFormat().format(row.estimated_cost)}`
          : "",
    } : '',
    {
      name: "Qty",
      selector: (row) => row.qty || "",
    },
    position !== "573MloZ8j--aaQ" ? 
    {
      name: "Total Estimasi Biaya",
      selector: (row) =>
        row?.total_estimated_cost
          ? `Rp. ${new Intl.NumberFormat().format(row.total_estimated_cost)}`
          : "",
    } : '-',
    {
      name: "Catatan Realisasi",
      selector: (row) => (
        <span
        style={{
          display: "inline-block",
          maxWidth: "200px", // Sesuaikan dengan kebutuhan
          wordWrap: "break-word", // Memastikan kata-kata pecah jika terlalu panjang
          whiteSpace: "normal", // Mengizinkan pembungkusan teks
        }}
        >
          {row.realization_note || "-"}
        </span>
      ),
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
  const ColumnsTechnician = [
    {
      name: "Item",
      selector: (row) => (
        <span
        style={{
          display: "inline-block",
          maxWidth: "200px", // Sesuaikan dengan kebutuhan
          wordWrap: "break-word", // Memastikan kata-kata pecah jika terlalu panjang
          whiteSpace: "normal", // Mengizinkan pembungkusan teks
        }}
        >
          {row.item_uid || "-"}
        </span>
      ),
    },
    {
      name: "Qty",
      selector: (row) => row.qty || "",
    },
    {
      name: "Catatan Realisasi",
      selector: (row) => (
        <span
        style={{
          display: "inline-block",
          maxWidth: "200px", // Sesuaikan dengan kebutuhan
          wordWrap: "break-word", // Memastikan kata-kata pecah jika terlalu panjang
          whiteSpace: "normal", // Mengizinkan pembungkusan teks
        }}
        >
          {row.realization_note || "-"}
        </span>
      ),
    },
  ];
  return (
    <div className="row mb-2">
      <div className="col">
        <Card>
          <Card.Header>
          <span style={{fontSize:"0.85rem", fontWeight:"500"}}>
                Support selama masa kerjasama (bila ada)
                </span>
          </Card.Header>
          <Card.Body>
            {position === "1-bZKHtNZCFWGg" ?
            <DataTable 
            columns={ColumnsTechnician} 
            data={data?.support || ""}
            customStyles={customStyle}
            dense />  : 
            <DataTable 
            columns={ColumnsTable}
            data={data?.support || ""}
            customStyles={customStyle}
            dense
        />
        }
          </Card.Body>
        </Card>
        
      </div>
    </div>
  );
};

export default TableSupport;
