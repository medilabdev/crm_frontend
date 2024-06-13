import React from 'react'
import {Card } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
const EditRekap = () => {
    const allFee = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("DataProduct")) {
        const data = JSON.parse(localStorage.getItem(key));
        allFee.push(data);
      }
    }
    let valueFee = 0 
    if (allFee[0]) {
        const totalPriceArray = allFee.map((data) => {
          data.map((item) => (valueFee += item.total));
        });
      }

 
    
    let valueRab = 0
    let valueSupport = 0
    const dataSet = [
        {
            item_uid: "RAB Bangunan & Lainnya terkait pembiayaan di awal (bila ada)",
            nilai_estimasi: "0"
        },
        {
            item_uid: "Fee Tindakan",
            nilai_estimasi: valueFee
        },
        {
            item_uid: "Support selama masa kerjasama",
            nilai_estimasi: valueSupport,
        }
    ]
    const ColumnsTable = [
        {
          name: "Item",
          selector: (row) => row.item_uid,
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
    <div className='raw mb-2'>
        <div className="col">
            <Card>
                <Card.Header>
                <span style={{fontSize:"0.85rem", fontWeight:"500"}}>
                Rekapitulasi Biaya
                </span>

                </Card.Header>
                <Card.Body>
                    <DataTable className="p-1 mb-2" dense customStyles={customStyle} columns={ColumnsTable} data={dataSet} />
                </Card.Body>
            </Card>
        </div>
    </div>
  )
}

export default EditRekap