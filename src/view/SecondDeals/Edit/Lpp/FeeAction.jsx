import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import dummy from "./dummy";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddModalsFee from "./modals/AddModalsFee";
import EditModalFee from "./modals/EditModalFee";

const DataTableFeeAction = () => {
  const [showAdd, setShowAdd] = useState(false);
  const handleClose = () => setShowAdd(false);
  const handleOpen = () => setShowAdd(true);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editDataModal, setEditDataModal] = useState(false);
  const handleCloseEdit = () => setEditDataModal(false);
  const handleEditFee = (id, name, nilai, qty, total, note) => {
    setEditData({
      id: id,
      name: name,
      nilai: nilai,
      qty: qty,
      total: total,
      note: note,
    });
    setEditDataModal(true);
  };
  const allData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("FeeTindakan")) {
      const data = JSON.parse(localStorage.getItem(key));
      allData.push(data);
    }
  }

  const handleDeleteFE = (id) => {
    const data = allData[0].filter((rab) => rab.id !== id);
    setData(data);
    localStorage.setItem("FeeTindakan", JSON.stringify(data));
  };
  const ColumnsTable = [
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
          <button
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
  useEffect(() => {
    const clearDataFeeTindakanLocalstorage = () => {
      localStorage.removeItem("FeeTindakan");
    };
    window.addEventListener("unload", clearDataFeeTindakanLocalstorage);
    return () => {
      window.removeEventListener("unload", clearDataFeeTindakanLocalstorage);
    };
  }, []);

  return (
    <div className="row mb-2">
      <div className="col">
        <Card>
          <Card.Header>
            <div>
              <button
                type="button"
                onClick={handleOpen}
                className="btn btn-primary"
              >
                Tambah
              </button>
            </div>
          </Card.Header>
          <DataTable
            className="p-2"
            columns={ColumnsTable}
            data={allData[0]}
            customStyles={customStyle}
          />
          <AddModalsFee show={showAdd} handleClose={handleClose} />
          <EditModalFee
            show={editDataModal}
            handleClose={handleCloseEdit}
            data={editData}
            dataOld={allData[0]}
          />
        </Card>
      </div>
    </div>
  );
};

export default DataTableFeeAction;
