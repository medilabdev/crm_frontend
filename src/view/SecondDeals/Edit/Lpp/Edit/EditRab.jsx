import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Card}  from 'react-bootstrap'
import  DataTable  from 'react-data-table-component'
import Swal from "sweetalert2"
import EditModalRab from './EditModalRab';
import EditModalSupport from './EditModalSupport';
import EditModalFee from './EditModalFee';
import UpdateModalFee from '../modals/UpdateModalFee';
import AddModalRab from './AddModalRab';
import AddModalSupport from './AddModalSupport';
import AddModalFee from './AddModalFee';


const EditRab = ({data, dataSupport, dataFee}) => {
  const [ShowModalRab, setShowModalRab] = useState(false);
  const handleShowRab = () => setShowModalRab(true);
  const handleCloseRab = () => setShowModalRab(false);
    const [stateRab, setStateRab] = useState([])
    if(!localStorage.getItem("rabEdit")){
        const dataRab = JSON.stringify(data)
        localStorage.setItem("rabEdit", dataRab)
    }

    const [ShowModalSupport, setShowModalSupport] = useState(false);
    const handleShowSupport = () => setShowModalSupport(true);
    const handleCloseSupport = () => setShowModalSupport(false);
    const [stateSupport, setStateSupport] = useState([]);
      if(!localStorage.getItem("supportEdit")){
        const dataSup = JSON.stringify(dataSupport)
        localStorage.setItem("supportEdit", dataSup)
    }

    const [showAddFee, setShowAddFee] = useState(false);
  const handleCloseFee = () => setShowAddFee(false);
  const handleOpenFee = () => setShowAddFee(true);
    const [stateFee, setStateFee] = useState([])
    if(!localStorage.getItem("feeEdit")){
        const dfee = JSON.stringify(dataFee)
        localStorage.setItem("feeEdit", dfee)
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
  const allDataRab = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("rabEdit")) {
      const dataRab = JSON.parse(localStorage.getItem(key));
      allDataRab.push(dataRab);
    }
  }

  let totalPriceRab = 0
  if(NoAlkes){
   NoAlkes.map((data) => totalPriceRab += data?.total_estimated_cost)
  } 

  const [editDataRab, setEditDataRab] = useState({})
  const [editModalRab, setEditModalRab] = useState(false)
  const handleCloseEditRab = () => {
    setEditModalRab(false)
  }
  const handleOpenEditRab = (id, item_uid, estimated_cost, is_alkes, qty, total_estimated_cost, realization_note) => {
    setEditDataRab({
      id:id, 
      item_uid:item_uid,
      estimated_cost:estimated_cost,
      is_alkes:is_alkes,
      qty:qty,
      total_estimated_cost:total_estimated_cost,
      realization_note:realization_note
    })
    setEditModalRab(true)
  }

  const handleDeleteItemRab = (uid) => {
    Swal.fire({
    title: "Apakah kamu yakin untuk Menghapus?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
     }).then((res) => {
        if(res.isConfirmed){
            const fee = allDataRab[0].filter((rab) =>rab.uid !== uid);
            setStateRab(fee);
            localStorage.setItem("rabEdit", JSON.stringify(fee));
            Swal.fire("Berhasil!", "Item berhasil dihapus.", "success");
        }
     })

   
  };
    const ColumnsTableRab = [
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
          selector: (row) => (
            <span style={{ width:1}}>{row.qty}</span>
          ) 
         
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
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={() =>
                  handleOpenEditRab(
                    row.id,
                    row.item_uid,
                    row.estimated_cost,
                    row.is_alkes,
                    row.qty,
                    row.total_estimated_cost,
                    row.realization_note
                  )
                }
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={() => handleDeleteItemRab(row.uid)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          ),
        },
      ];


      const allDataSupport = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("supportEdit")) {
          const data = JSON.parse(localStorage.getItem(key));
          allDataSupport.push(data);
        }
      }
      const handleDeleteItemSupport = (uid) => {
        Swal.fire({
            title: "Apakah kamu yakin untuk Menghapus?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                const sup = allDataSupport[0].filter((rab) => rab.uid !== uid);
                setStateSupport(sup);
                localStorage.setItem("supportEdit", JSON.stringify(sup));
                Swal.fire("Berhasil!", "Item berhasil dihapus.", "success");
            }
        });
    };


    const [editDataSupport, setEditDataSupport] = useState({})
    const [editModalSupport, setEditModalSupport] = useState(false)

    const handleCloseEditSupport = () => setEditModalSupport(false)
    const handleOpenEditSupport = (id, item_uid, estimated_cost, qty, total_estimated_cost, realization_note) => {
      setEditDataSupport({
        id:id,
        item_uid:item_uid,
        estimated_cost:estimated_cost,
        qty:qty,
        total_estimated_cost:total_estimated_cost,
        realization_note:realization_note
      })
      setEditModalSupport(true)
    }

    
    let totalPriceSupport = 0
    if(allDataSupport[0]){
    allDataSupport[0]?.map((data) => totalPriceSupport += data?.total_estimated_cost)
    } 
     const ColumnsTableSupport = [
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
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={() =>
                  handleOpenEditSupport(
                    row.id,
                    row.item_uid,
                    row.estimated_cost,
                    row.qty,
                    row.total_estimated_cost,
                    row.realization_note
                  )
                }
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={() => handleDeleteItemSupport(row.uid)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          ),
        },
      ];


      const [editDataFee, setEditDataFee] = useState({})
      const [editModalFee, setEditModalFee] = useState(false)
      const handleCloseEditFee = () => setEditModalFee(false)
      const handleOpenEditFee = (id, recieve_name, value, qty, total, realization_note) => {
        setEditDataFee({
          id:id,
          recieve_name:recieve_name,
          value:value,
          qty:qty,
          total:total,
          realization_note:realization_note
        })
        setEditModalFee(true)
      }
      const allDataFee = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("feeEdit")) {
          const data = JSON.parse(localStorage.getItem(key));
          allDataFee.push(data);
        }
      }
      const handleDeleteItemFee = (uid) => {
        Swal.fire({
        title: "Apakah kamu yakin untuk Menghapus?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
         }).then((res) => {
            if(res.isConfirmed){
                const fee = allDataFee[0].filter((rab) =>rab.uid !== uid);
                setStateFee(fee);
                localStorage.setItem("feeEdit", JSON.stringify(fee));
                Swal.fire("Berhasil!", "Item berhasil dihapus.", "success");
            }
         })
      };

      let totalPriceFee = 0
      if(allDataFee[0]){
      allDataFee[0]?.map((data) => totalPriceFee += data?.total)
      } 

      const ColumnsTableFee = [
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
              <button
                type="button"
                style={{ border: "none", backgroundColor: "white" }}
                onClick={() =>
                  handleOpenEditFee(
                    row.id,
                    row.recieve_name,
                    row.value,
                    row.qty,
                    row.total,
                    row.realization_note
                  )
                }
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteItemFee(row.uid)}
                style={{ border: "none", backgroundColor: "white" }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          ),
        },
      ];

      const dataRekap = [
        {
            item_uid: "RAB Bangunan & Lainnya terkait pembiayaan di awal (bila ada)",
            nilai_estimasi: totalPriceRab,
        },
        {
            item_uid: "Fee Tindakan",
            nilai_estimasi: totalPriceSupport
        },
        {
            item_uid: "Support selama masa kerjasama",
            nilai_estimasi: totalPriceFee,
        }
    ]
      const ColumnsTableRekap = [
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
    <>
    {/* rab */}
    <div className='row mb-2'>
        <div className="col">
            <Card>
                <Card.Header>
                <span style={{fontSize:"0.85rem", fontWeight:"500"}}>
                RAB Bangunan & Lainnya terkait pembiayaan di awal (bila ada)
                </span>
                <button type="button" className="btn btn-primary float-end" style={{fontSize:"0.85rem"}}  onClick={handleShowRab}>
                    Tambah
                </button>
                </Card.Header>
                <Card.Body>
                  <div style={{fontSize:"1rem" }}>
                  Alat Kesehatan
                  </div>
                  <DataTable className="mb-2" dense customStyles={customStyle} columns={ColumnsTableRab} data={Alkes}/>
                    <hr />
                  <div style={{fontSize:"1rem"}}>
                  Bukan Alat Kesehatan
                  </div>
                    <DataTable className="mb-2" dense customStyles={customStyle} columns={ColumnsTableRab} data={NoAlkes}/>
                    <div className="row">
                  <div className="mt-3 me-3">
                    <span
                      className="float-end"
                      style={{ fontWeight: 400, fontSize: "0.80rem" }}
                    >
                      Total Price:
                      <span className="ms-3 me-2" style={{ fontWeight: 600 }}>
                        Rp. {new Intl.NumberFormat().format(totalPriceRab)}
                      </span>
                    </span>
                  </div>
                </div>
                </Card.Body>
            </Card>
            <AddModalRab show={ShowModalRab} handleClose={handleCloseRab} />
            <EditModalRab show={editModalRab} handleClose={handleCloseEditRab} data={editDataRab} dataAll={allDataRab[0]}/>
        </div>
    </div>
    {/* support */}
    <div className='row mb-2'>
    <div className="col">
        <Card>
            <Card.Header>
                <span style={{fontSize:"0.85rem", fontWeight:"500"}}>
                Support selama masa kerjasama (bila ada)
                </span>
                <button type="button" className="btn btn-primary float-end" style={{fontSize:"0.85rem"}} onClick={handleShowSupport}>
                    Tambah
                </button>
            </Card.Header>
            <Card.Body>
                <DataTable className="p-2 mb-2" data={allDataSupport[0]} dense customStyles={customStyle} columns={ColumnsTableSupport} />
                <div className="row">
                  <div className="mt-3 me-3">
                    <span
                      className="float-end"
                      style={{ fontWeight: 400, fontSize: "0.80rem" }}
                    >
                      Total Price:
                      <span className="ms-3 me-2" style={{ fontWeight: 600 }}>
                        Rp. {new Intl.NumberFormat().format(totalPriceSupport)}
                      </span>
                    </span>
                  </div>
                </div>
            </Card.Body>
        </Card>
        <AddModalSupport show={ShowModalSupport} handleClose={handleCloseSupport} />
        <EditModalSupport show={editModalSupport} handleClose={handleCloseEditSupport} data={editDataSupport} dataAll={allDataSupport[0]}/>
    </div>
</div>

{/* fee */}
<div className='row mb-2'>
        <div className="col">
            <Card>
                <Card.Header>
                <span style={{fontSize:"0.85rem", fontWeight:"500"}}>
                Fee Tindakan (bila ada)
                </span>
                <button type="button" className="btn btn-primary float-end" style={{fontSize:"0.85rem"}} onClick={handleOpenFee}>
                    Tambah
                </button>
                </Card.Header>
                <Card.Body>
                    <DataTable className="p-2 mb-2" data={allDataFee[0]} dense customStyles={customStyle} columns={ColumnsTableFee} />
                    <div className="row">
                  <div className="mt-3 me-3">
                    <span
                      className="float-end"
                      style={{ fontWeight: 400, fontSize: "0.80rem" }}
                    >
                      Total Price:
                      <span className="ms-3 me-2" style={{ fontWeight: 600 }}>
                        Rp. {new Intl.NumberFormat().format(totalPriceFee)}
                      </span>
                    </span>
                  </div>
                </div>
                </Card.Body>
            </Card>
            <AddModalFee show={showAddFee} handleClose={handleCloseFee} />
            <UpdateModalFee show={editModalFee} handleClose={handleCloseEditFee} data={editDataFee} dataAll={allDataFee[0]}/>
        </div>
    </div>

    {/* rekap */}
    <div className='raw mb-2'>
        <div className="col">
            <Card>
                <Card.Header>
                <span style={{fontSize:"0.85rem", fontWeight:"500"}}>
                Rekapitulasi Biaya
                </span>

                </Card.Header>
                <Card.Body>
                    <DataTable className="p-1 mb-2" dense customStyles={customStyle} columns={ColumnsTableRekap} data={dataRekap}  />
                </Card.Body>
            </Card>
        </div>
    </div>
    </>
  )
}

export default EditRab