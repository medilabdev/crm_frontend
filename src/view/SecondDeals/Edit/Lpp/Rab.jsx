import React, { useState } from "react";
import DataTable from "react-data-table-component";
import dummy from "./dummy";
import { Card } from "react-bootstrap";
import ModalsRab from "./ModalsRab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditModalsRab from "./EditModalsRab";
import AddModalSupport from "./modals/AddModalSupport";
import EditModalSupport from "./modals/EditModalSupport";
import AddModalsFee from "./modals/AddModalsFee";

const DataTableRab = ({rab, handleRab, supportKerjaSama, handleSupportKerjaSama, feeAction, handleFeeAction}) => {
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
  const [ShowModalRab, setShowModalRab] = useState(false);
  const [data, setData] = useState([]);
  const handleShowRab = () => setShowModalRab(true);
  const handleCloseRab = () => setShowModalRab(false);
  const [editDataModal, setEditDataModal] = useState(false);
  const [editDataRab, setEditDataRab] = useState({});
  const handleCloseEdit = () => setEditDataModal(false);
  const handleEditRab = (
    id,
    item,
    nilai_estimasi_biaya,
    qty,
    total_estimasi_biaya,
    note
  ) => {
    setEditDataRab({
      id: id,
      item: item,
      nilai_estimasi_biaya: nilai_estimasi_biaya,
      qty: qty,
      total_estimasi_biaya: total_estimasi_biaya,
      note: note,
    });
    setEditDataModal(true);
  };

  let allDataRab = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("RAB")) {
      const data = JSON.parse(localStorage.getItem(key));
      allDataRab.push(data);
    }
  }
 let totalPriceRab = 0
 if(NoAlkes){
  NoAlkes.map((data) => totalPriceRab += data?.total_estimasi_biaya)
 } 
  const handleDeleteItem = (id) => {
    const data = allDataRab[0].filter((rab) => rab.id !== id);
    setData(data);
    localStorage.setItem("RAB", JSON.stringify(data));
  };

  const ColumnsTable = [
    {
      name: "Item",
      selector: (row) => row.item,
    },
    {
      name: "Nilai Estimasi Biaya",
      selector: (row) =>
        `Rp. ${new Intl.NumberFormat().format(row.nilai_estimasi_biaya)}`,
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
    },
    {
      name: "Total Estimasi Biaya",
      selector: (row) =>
        `Rp. ${new Intl.NumberFormat().format(row.total_estimasi_biaya)}`,
    },
    {
      name: "Catatan Realisasi",
      selector: (row) => row.note,
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
            onClick={() => handleDeleteItem(row.id, true)}
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


// support 

const [ShowModalSupport, setShowModalSupport] = useState(false);
  const handleShowSupport = () => setShowModalSupport(true);
  const handleCloseSupport = () => setShowModalSupport(false);
  const allDataSupport = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("SupportKerjaSama")) {
      const data = JSON.parse(localStorage.getItem(key));
      allDataSupport.push(data);
    }
  }
  const handleDeleteSupport = (id) => {
    const data = allDataSupport[0].filter((support) => support.id !== id);
    setData(data);
    localStorage.setItem("SupportKerjaSama", JSON.stringify(data));
  };
 

  const ColumnsTableSupport = [
    {
      name: "Item",
      selector: (row) => row.item,
    },
    {
      name: "Nilai Estimasi Biaya",
      selector: (row) =>
        `Rp. ${new Intl.NumberFormat().format(row.nilai_estimasi_biaya)}`,
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
    },
    {
      name: "Total Estimasi Biaya",
      selector: (row) =>
        `Rp. ${new Intl.NumberFormat().format(row.total_estimasi_biaya)}`,
    },
    {
      name: "Catatan Realisasi",
      selector: (row) => row.note,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          {/* <button
            style={{ border: "none", backgroundColor: "white" }}
            onClick={() =>
              handleEditSupport(
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
            onClick={() => handleDeleteSupport(row.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      ),
    },
  ];


  let totalPriceSupport = 0
  if(allDataSupport[0]){
  allDataSupport[0]?.map((data) => totalPriceSupport += data?.total_estimasi_biaya)
  } 



// fee
const [showAddFee, setShowAddFee] = useState(false);
const handleCloseFee = () => setShowAddFee(false);
const handleOpenFee = () => setShowAddFee(true);
const allDataFee = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("FeeTindakan")) {
      const data = JSON.parse(localStorage.getItem(key));
      allDataFee.push(data);
    }
  }

  let totalPriceFee = 0
  if(allDataFee[0]){
  allDataFee[0]?.map((data) => totalPriceFee += data?.total)
  } 
const handleDeleteFE = (id) => {
  const data = allDataFee[0].filter((rab) => rab.id !== id);
  setData(data);
  localStorage.setItem("FeeTindakan", JSON.stringify(data));
};
const ColumnsTableFee = [
  {
    name: "Nama Penerima",
    selector: (row) => row.name,
  },
  {
    name: "Nilai Estimasi Biaya",
    selector: (row) => `Rp. ` + row.nilai,
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
    selector: (row) => row.note,
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
          onClick={() => handleDeleteFE(row.id)}
          style={{ border: "none", backgroundColor: "white" }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </>
    ),
  },
];


  const ColumnsTableRekap = [
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

  
  const dataRekap = [
    {
      name: "RAB Bangunan & Lainnya Terkain",
      nilai_estimasi: totalPriceRab,
    },
    {
      name: "Support Selama Kerja Sama",
      nilai_estimasi: totalPriceSupport,
    },
    {
      name: "Fee Tindakan",
      nilai_estimasi: totalPriceFee,
    },
  ];

  return (
    <>
     <div className="mb-3">
        <label htmlFor="" className="mb-1 fw-bold">
          RAB Bangunan & Lainnya terkait pembiayaan awal (Optional)
        </label>
        <select name="" id="" className="form-select" onChange={handleRab}>
          <option value="">Select Chose</option>
          <option value="yes">Ya</option>
          <option value="no">Tidak</option>
        </select>
      </div>
    {/* rab */}
    {rab === "yes" ? 
    <div className="row mb-2">
    <div className="col">
      <Card>
        <Card.Header>
          <div className="">
            <button
              type="button"
              onClick={handleShowRab}
              className="btn btn-primary"
            >
              Tambah
            </button>
          </div>
        </Card.Header>
        <Card.Body>
        <DataTable
          className="p-2 mb-2"
          columns={ColumnsTable}
          data={Alkes}
          customStyles={customStyle}
          dense
        />
        <DataTable
          className="mb-2 p-2"
          columns={ColumnsTable}
          data={NoAlkes}
          customStyles={customStyle}
          dense
        />
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
        <ModalsRab show={ShowModalRab} handleClose={handleCloseRab} />
        {/* <EditModalsRab
          show={editDataModal}
          handleClose={handleCloseEdit}
          data={editDataRab}
          dataOld={allData[0]}
        /> */}
      </Card>
    </div>
  </div>
    :""}
    

    {/* support */}
    <div className="mb-3">
        <label htmlFor="" className="mb-1 fw-bold">
          Support Selama Kerja Sama (Optional)
        </label>
        <select
          name="support"
          className="form-select"
          onChange={handleSupportKerjaSama}
        >
          <option value="">Select Chose</option>
          <option value="yes">Ya</option>
          <option value="no">Tidak</option>
        </select>
      </div>
      {supportKerjaSama === "yes" ?
      <div className="row mb-2">
      <div className="col">
        <Card>
          <Card.Header>
            <div className="">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleShowSupport}
              >
                Tambah
              </button>
            </div>
          </Card.Header>
          <Card.Body>
          <DataTable
            className="p-2"
            columns={ColumnsTableSupport}
            customStyles={customStyle}
            data={allDataSupport[0]}
          />
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
          <AddModalSupport show={ShowModalSupport} handleClose={handleCloseSupport} />
          {/* <EditModalSupport  show={editModal} handleClose={handleCloseEditModal} data={editDataSupport} dataOld={allData[0]}/> */}
        </Card>
      </div>
    </div> : ""}
    
      

      {/* fee */}
      <div className="mb-3">
        <label htmlFor="" className="mb-1 fw-bold">
          Fee Tindakan (Optional)
        </label>
        <select
          name="fee"
          id=""
          className="form-select"
          onChange={handleFeeAction}
        >
          <option value="">Select Chose</option>
          <option value="yes">Ya</option>
          <option value="no">Tidak</option>
        </select>
      </div>
      {feeAction === "yes" ?
       <div className="row mb-2">
       <div className="col">
         <Card>
           <Card.Header>
             <div>
               <button
                 type="button"
                 onClick={handleOpenFee}
                 className="btn btn-primary"
               >
                 Tambah
               </button>
             </div>
           </Card.Header>
           <Card.Body>
           <DataTable
             className="p-2"
             columns={ColumnsTableFee}
             data={allDataFee[0]}
             customStyles={customStyle}
           />
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
           <AddModalsFee show={showAddFee} handleClose={handleCloseFee} />
           {/* <EditModalFee
             show={editDataModal}
             handleClose={handleCloseEdit}
             data={editData}
             dataOld={allData[0]}
           /> */}
         </Card>
       </div>
     </div>  
      : ""}
     
      <div className="row mb-5">
      <div className="col">
        <h6 className="fw-bold ms-2 mt-3">Rekapitulasi Biaya</h6>
        <DataTable
          columns={ColumnsTableRekap}
          data={dataRekap}
          dense
          customStyles={customStyle}
        />
      </div>
    </div>
    </>
  );
};

export default DataTableRab;

