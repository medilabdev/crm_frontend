import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const DataTableRekapBiaya = ({ priceRab}) => {


  let totalPriceRab = 0
  
  useEffect(() => {
    let NoAlkes = [];
    let Alkes = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("RAB")) {
        const data = JSON.parse(localStorage.getItem(key));
        data.forEach((item) => {
          if (item.is_alkes === "no") {
            NoAlkes.push({ ...item });
          } else if (item.is_alkes === "yes") {
            Alkes.push({ ...item });
          }
        });
      }
    }
    if(NoAlkes){
     NoAlkes.map((data) => totalPriceRab += data?.total_estimasi_biaya)
    } 
  },[])


  const data = [
    {
      name: "RAB Bangunan & Lainnya Terkain",
      nilai_estimasi: totalPriceRab,
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
