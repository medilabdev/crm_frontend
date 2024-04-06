import React from "react";
import DataTable from "react-data-table-component";
import { Card } from 'react-bootstrap'

const RekapBiaya = ({data}) => {
  let valueFee = 0;
  if(data?.fee?.length > 0) {
    data?.fee.map((item) => (valueFee += item?.total)) 
  } 
  
  let valueSupport = 0
  if(data?.support?.length > 0){
    data?.support?.map((item) => (valueSupport += item?.total_estimated_cost))
  }

  let valueRab = 0

  if(data?.rab?.length > 0){
    data?.rab?.map((item) =>{
      if(item?.is_alkes === "no"){
        valueRab += item?.total_estimated_cost
      }
    }
  )
  }

  const datas = [
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
    <div className="row mb-2">
      <div className="col">
        <Card>
          <Card.Header>
          <span style={{fontSize:"0.85rem", fontWeight:"500"}}>
                Rekapitulasi Biaya
                </span>
          </Card.Header>
          <Card.Body>
          <DataTable
         data={datas}
        columns={ColumnsTable}
        customStyles={customStyle}
        dense
      />
          </Card.Body>
        </Card>
      </div>
      
    </div>
  );
};

export default RekapBiaya;
