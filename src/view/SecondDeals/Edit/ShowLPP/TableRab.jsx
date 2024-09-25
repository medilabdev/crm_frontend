import React from "react";
import DataTable from "react-data-table-component";
import dummy from "../Lpp/dummy";
import { Card } from "react-bootstrap"
import { position } from "../../partials/ColumnsTable";
const TableRab = ({ data }) => {
  const position = localStorage.getItem('position')
  const alkes = []
  const noAlkse = []
  if(data?.rab?.length > 0){
    data?.rab.forEach((item) => {
      if(item?.is_alkes === "yes"){
        alkes.push({ ...item})
      }else if(item?.is_alkes === "no"){
        noAlkse.push({ ...item})
      }
    })
  }
   
    

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
        row.estimated_cost
          ? `Rp. ${new Intl.NumberFormat().format(row.estimated_cost)}`
          : "-",
    } : '',
    {
      name: "Qty",
      selector: (row) => (row.qty ? row.qty : ""),
    },
    position !== "573MloZ8j--aaQ" ? 
    {
      name: "Total Estimasi Biaya",
      selector: (row) =>
        row.total_estimated_cost
          ? `Rp. ${new Intl.NumberFormat().format(row.total_estimated_cost)}`
          : "-" 
    } : '',
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
                RAB Bangunan & Lainnya terkait pembiayaan di awal
                </span>
          </Card.Header>
          <Card.Body>

          {alkes && alkes.length > 0 ?   
          <>
           <div style={{fontSize:"1rem" }}>
           Alat Kesehatan
          </div>
          <DataTable
            className="mb-2"
            columns={ColumnsTable}
            data={alkes}
            customStyles={customStyle}
            dense
          />
          </>
          : ''}
          {noAlkse && noAlkse.length > 0 ?  
          <>
          <div style={{fontSize:"1rem"}}>
            Bukan Alat Kesehatan
            </div>
          <DataTable
          className="mb-2"
            columns={ColumnsTable}
            data={noAlkse}
            customStyles={customStyle}
            dense
          />
          </>
          : ''}
          </Card.Body>
        </Card>
      </div>
      
    </div>
  );
};

export default TableRab;
