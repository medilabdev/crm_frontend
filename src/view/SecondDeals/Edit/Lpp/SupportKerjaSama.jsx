import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import AddModalSupport from "./modals/AddModalSupport";
import EditModalSupport from "./modals/EditModalSupport";

const SupportKerjaSama = () => {
  const [ShowModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [data, setData] = useState([]);
  const [editDataSupport, setEditDataSupport] = useState({})
  const [editModal, setEditModal] = useState(false);
  const handleCloseEditModal = () => setEditModal(false)
  const allData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("SupportKerjaSama")) {
      const data = JSON.parse(localStorage.getItem(key));
      allData.push(data);
    }
  }
  const handleDeleteSupport = (id) => {
    const data = allData[0].filter((support) => support.id !== id);
    setData(data);
    localStorage.setItem("SupportKerjaSama", JSON.stringify(data));
  };
 
  const handleEditSupport = (    id,
    item,
    nilai_estimasi_biaya,
    qty,
    total_estimasi_biaya,
    note ) => {
        setEditDataSupport({
            id: id,
            item: item,
            nilai_estimasi_biaya: nilai_estimasi_biaya,
            qty: qty,
            total_estimasi_biaya: total_estimasi_biaya,
            note: note,
        })
        setEditModal(true)
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
          <button
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

  return (
    <div className="row mb-2">
      <div className="col">
        <Card>
          <Card.Header>
            <div className="">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleShow}
              >
                Tambah
              </button>
            </div>
          </Card.Header>
          <DataTable
            className="p-2"
            columns={ColumnsTable}
            customStyles={customStyle}
            data={allData[0]}
          />
          <AddModalSupport show={ShowModal} handleClose={handleClose} />
          <EditModalSupport  show={editModal} handleClose={handleCloseEditModal} data={editDataSupport} dataOld={allData[0]}/>
        </Card>
      </div>
    </div>
  );
};

export default SupportKerjaSama;
