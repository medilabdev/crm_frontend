import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2"
import EditModalFee from './EditModalFee'
const EditFee = ({ data }) => {
  const [showAdd, setShowAdd] = useState(false);
  const handleClose = () => setShowAdd(false);
  const handleOpen = () => setShowAdd(true);
    const [stateFee, setStateFee] = useState([])
    if(!localStorage.getItem("feeEdit")){
        const dataFee = JSON.stringify(data)
        localStorage.setItem("feeEdit", dataFee)
    }

    const allData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("feeEdit")) {
        const data = JSON.parse(localStorage.getItem(key));
        allData.push(data);
      }
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
      const handleDeleteItem = (uid) => {
        Swal.fire({
        title: "Apakah kamu yakin untuk Menghapus?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
         }).then((res) => {
            if(res.isConfirmed){
                const fee = allData[0].filter((rab) =>rab.uid !== uid);
                setStateFee(fee);
                localStorage.setItem("feeEdit", JSON.stringify(fee));
                Swal.fire("Berhasil!", "Item berhasil dihapus.", "success");
            }
         })

       
      };
      const ColumnsTable = [
        {
          name: "Nama Penerima",
          selector: (row) => row.recieve_name,
        },
        {
          name: "Nilai Estimasi Biaya",
          selector: (row) => `Rp.${new Intl.NumberFormat().format(row.value)}`
        },
        {
          name: "Qty",
          selector: (row) => row.qty,
        },
        {
          name: "Total Estimasi Biaya",
          selector: (row) => `Rp. ${new Intl.NumberFormat().format(row.total)}`,
        },
        {
          name: "Catatan Realisasi",
          selector: (row) => row.realization_note,
        },
        {
          name: "Action",
          selector: (row) => (
            <>
              {/* <button
                type="button"
                style={{ border: "none", backgroundColor: "white" }}
                onClick={() =>
                  handleEditFee(
                    row.id,
                    row.name,
                    row.nilai,
                    row.qty,
                    row.total,
                    row.note
                  )
                }
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button> */}
              <button
                type="button"
                onClick={() => handleDeleteItem(row.uid)}
                style={{ border: "none", backgroundColor: "white" }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          ),
        },
      ];
  return (
    <div className='raw mb-2'>
        <div className="col">
            <Card>
                <Card.Header>
                <span style={{fontSize:"0.85rem", fontWeight:"500"}}>
                Fee Tindakan (bila ada)
                </span>
                <button type="button" className="btn btn-primary float-end" style={{fontSize:"0.85rem"}} onClick={handleOpen}>
                    Tambah
                </button>
                </Card.Header>
                <Card.Body>
                    <DataTable className="p-2 mb-2" data={allData[0]} dense customStyles={customStyle} columns={ColumnsTable} />
                    
                </Card.Body>
            </Card>
            <EditModalFee show={showAdd} handleClose={handleClose}/>
        </div>
    </div>
  )
}

export default EditFee