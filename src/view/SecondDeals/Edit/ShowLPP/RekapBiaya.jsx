import React from "react";
import DataTable from "react-data-table-component";
import { Card } from 'react-bootstrap'

const RekapBiaya = ({data}) => {
  const position = localStorage.getItem('position')
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
    position !== "573MloZ8j--aaQ" ? 
    {
      name: "Fee Tindakan",
      nilai_estimasi: valueFee,
    } : {name : '-', nilai_estimasi : '-'},
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
    headCells: {
      style: {
        fontSize: "2rem", // Sesuaikan ukuran font header
        fontWeight: "bold", // Atur agar teks lebih tebal
        textTransform: "uppercase", 
        color: "white", 
        backgroundColor: "#496989",
        padding: "9px 12px",
        // borderTop: "2px solid #CBDCEB",
        // borderRadius: "8px", 
      },
    },
    cells: {
      style: {
        fontSize: "8px",
        marginTop: "4px",
        fontWeight: "500",
        textTransform: "uppercase", 
      },
    },
  };
  return (
    <>
     <Card className="mb-3 uniform-spacing col-md">
        <Card.Body> 
          <h5 className="fw-bold mb-3">Peralatan</h5>
          <DataTable
          data={datas}
          columns={ColumnsTable}
          customStyles={customStyle}
          dense/>
        </Card.Body>
    </Card>
    {/* <div className="row mb-2">
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
          dense/>
          </Card.Body>
        </Card>
      </div>
      
    </div> */}
    </>
  );
};

export default RekapBiaya;
