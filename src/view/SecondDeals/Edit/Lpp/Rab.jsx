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
import EditModalFee from "./Edit/EditModalFee";

const DataTableRab = ({
  rab, handleRab, supportKerjaSama, handleSupportKerjaSama, feeAction, handleFeeAction, rabData, setRabData, supportData, setSupportData, feeData, setFeeData
}) => {
  const [ShowModalRab, setShowModalRab] = useState(false);
  const [editSupportData, setEditSupportData] = useState({});

  const handleAddRab = (newRab) => {
    const updated = [...rabData, newRab];
    setRabData(updated);
  }

  const handleAddSupport = (newSupport)=> {
    const updated = [...supportData, newSupport];
    setSupportData(updated);
  }

  const handleAddFee = (newFee) => {
    const updated = [...feeData, newFee];
    setFeeData(updated);
  }


  const Alkes = rabData.filter((item) => item.is_alkes === "yes");
  const NonAlkes = rabData.filter((item) => item.is_alkes === "no");

  const handleShowRab = () => setShowModalRab(true);
  const handleCloseRab = () => setShowModalRab(false);
  const [editDataModal, setEditDataModal] = useState(false);
  const [editDataRab, setEditDataRab] = useState({});

  let totalPriceRab = 0
  if(NonAlkes){
    NonAlkes.map((data) => totalPriceRab += data?.total_estimasi_biaya)
  } 

  const handleDeleteItem = (id) => {
    const updated =rabData.filter((item) => item.id !== id);
    setRabData(updated);
  };

  const handlerOpenEditRab = (rabItem) =>{
    setEditDataRab(rabItem);
    setEditDataModal(true);
  }

  const handlerSaveEditRab = (updateRab) => {
    const updatedList = rabData.map((item) => item.id === updateRab.id ? updateRab : item )
    setRabData(updatedList)
    setEditDataModal(false);
    setEditDataRab(null);
  }

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
      cell: (row) => (
        <div
          style={{
            maxWidth: "200px",
            whiteSpace: "normal", // biar bisa multiline
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {row.note}
        </div>
      ),
      grow: 1, // biar fleksibel tapi tidak over-extend
      wrap: true, // jika pakai react-data-table-component
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            style={{ border: "none", backgroundColor: "white" }}
            onClick={() =>  handlerOpenEditRab(row)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
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
  const [editSupportModal, setEditSuportModal] = useState(false)


  const handlerOpenEditSupport = (supportItem) =>{
    setEditSupportData(supportItem);
    setEditSuportModal(true);
  }

  const handlerSaveEditSupport = (updateRab) => {
    const updatedList = supportData.map((item) => item.id === updateRab.id ? updateRab : item )
    setSupportData(updatedList)
    setEditSuportModal(false);
    setEditSupportData(null);
  }
  

  const handleDeleteSupport = (id) => {
    const updated =supportData.filter((item) => item.id !== id);
    setSupportData(updated);
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
      cell: (row) => (
        <div
          style={{
            maxWidth: "200px",
            whiteSpace: "normal", // biar bisa multiline
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {row.note}
        </div>
      ),
      grow: 1, // biar fleksibel tapi tidak over-extend
      wrap: true, // jika pakai react-data-table-component
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            style={{ border: "none", backgroundColor: "white" }}
            onClick={() => handlerOpenEditSupport(row)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
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
  if(supportData){
    supportData?.map((data) => totalPriceSupport += data?.total_estimasi_biaya)
  } 



// fee
const [showAddFee, setShowAddFee] = useState(false);
const handleCloseFee = () => setShowAddFee(false);
const handleOpenFee = () => setShowAddFee(true);

const [editFeeModal, setEditFeeModal] = useState(false)
const [editDataFee, setEditDataFee] = useState({})

const handlerOpenEditFee = (feeitem) => {
  setEditDataFee(feeitem);
  setEditFeeModal(true);
}

const handlerSaveEditFee = (updateItem) => {
  const updatedList = feeData.map((item) => item.id === updateItem.id ? updateItem : item )
  setFeeData(updatedList);
  setEditFeeModal(false);
  setEditDataFee(null);
}


  let totalPriceFee = 0
  if(feeData){
  feeData.map((data) => totalPriceFee += data?.total)
  } 
  
const handleDeleteFE = (id) => {
  const updated =feeData.filter((item) => item.id !== id);
  setFeeData(updated);
};

const ColumnsTableFee = [
  {
    name: "Nama Penerima",
    selector: (row) => row.name,
  },
  {
    name: "Nilai Estimasi Biaya",
    selector: (row) => `Rp. ${new Intl.NumberFormat().format(row.nilai)}`,
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
    cell: (row) => (
      <div
        style={{
          maxWidth: "200px",
          whiteSpace: "normal", // biar bisa multiline
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        {row.note}
      </div>
    ),
    grow: 1, // biar fleksibel tapi tidak over-extend
    wrap: true, // jika pakai react-data-table-component
  },
  {
    name: "Action",
    selector: (row) => (
      <>
        <button
          type="button"
          style={{ border: "none", backgroundColor: "white" }}
          onClick={() => handlerOpenEditFee(row)}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
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
        <div style={{fontSize:"1rem" }}>
         Alat Kesehatan
        </div>
        <DataTable
          className="mb-3"
          columns={ColumnsTable}
          data={Alkes}
          customStyles={customStyle}
          dense
        />
        <hr />
        <div style={{fontSize:"1rem"}}>
         Bukan Alat Kesehatan
        </div>
        <DataTable
          className="mb-2"
          columns={ColumnsTable}
          data={NonAlkes}
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
        <ModalsRab show={ShowModalRab} handleClose={handleCloseRab} onSave={handleAddRab} />
        <EditModalsRab
          show={editDataModal}
          handleClose={() => setEditDataModal(false)}
          data={editDataRab}
          onSave={handlerSaveEditRab}
        />
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
            data={supportData}
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
          <AddModalSupport show={ShowModalSupport} handleClose={handleCloseSupport} onSave={handleAddSupport}/>
          <EditModalSupport 
          show={editSupportModal} 
          handleClose={() => setEditSupportData(false)} 
          data={editSupportData} 
          onSave={handlerSaveEditSupport}/>
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
             data={feeData}
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
           <AddModalsFee show={showAddFee} handleClose={handleCloseFee} onSave={handleAddFee}/>
           <EditModalFee
             show={editFeeModal}
             handleClose={() => setEditFeeModal(false)}
             data={editDataFee}
             onSave={handlerSaveEditFee}
           />
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

