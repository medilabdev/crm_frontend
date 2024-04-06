import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Card}  from 'react-bootstrap'
import  DataTable  from 'react-data-table-component'
import Swal from "sweetalert2"
import EditModalRab from './EditModalRab';
const EditRab = ({data}) => {
  const [ShowModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
    const [stateRab, setStateRab] = useState([])
    if(!localStorage.getItem("rabEdit")){
        const dataRab = JSON.stringify(data)
        localStorage.setItem("rabEdit", dataRab)
    }
    const NoAlkes = [];
  const Alkes = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("rabEdit")) {
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

  const allData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("rabEdit")) {
      const data = JSON.parse(localStorage.getItem(key));
      allData.push(data);
    }
  }
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
            setStateRab(fee);
            localStorage.setItem("rabEdit", JSON.stringify(fee));
            Swal.fire("Berhasil!", "Item berhasil dihapus.", "success");
        }
     })

   
  };
    const ColumnsTable = [
        {
          name: "Item",
          selector: (row) => row.item_uid,
        },
        {
          name: "Nilai Estimasi Biaya",
          selector: (row) =>
            `Rp. ${new Intl.NumberFormat().format(row.estimated_cost)}`,
        },
        {
          name: "Qty",
          selector: (row) => row.qty,
        },
        {
          name: "Total Estimasi Biaya",
          selector: (row) =>
            `Rp. ${new Intl.NumberFormat().format(row.total_estimated_cost)}`,
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
                style={{ border: "none", backgroundColor: "white" }}
                onClick={() =>
                  handleEditRab(
                    row.id,
                    row.item,
                    row.nilai_estimasi_biaya,
                    row.qty,
                    row.total_estimasi_biaya,
                    row.note
                  )
                }
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button> */}
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={() => handleDeleteItem(row.uid)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
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
  return (
    <div className='raw mb-2'>
        <div className="col">
            <Card>
                <Card.Header>
                <span style={{fontSize:"0.85rem", fontWeight:"500"}}>
                RAB Bangunan & Lainnya terkait pembiayaan di awal (bila ada)
                </span>
                <button type="button" className="btn btn-primary float-end" style={{fontSize:"0.85rem"}}  onClick={handleShow}>
                    Tambah
                </button>
                </Card.Header>
                <Card.Body>
                    <DataTable className="p-2 mb-2" dense customStyles={customStyle} columns={ColumnsTable} data={Alkes}/>

                    <DataTable className="p-2 mb-2" dense customStyles={customStyle} columns={ColumnsTable} data={NoAlkes}/>
                </Card.Body>
            </Card>
            <EditModalRab show={ShowModal} handleClose={handleClose} />
        </div>
    </div>
  )
}

export default EditRab