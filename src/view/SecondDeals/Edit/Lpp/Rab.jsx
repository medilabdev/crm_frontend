import React, { useState } from "react";
import DataTable from "react-data-table-component";
import dummy from "./dummy";
import { Card } from "react-bootstrap";
import ModalsRab from "./ModalsRab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditModalsRab from "./EditModalsRab";

const DataTableRab = ({ NoAlkes, Alkes }) => {
  const [ShowModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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

  const allData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("RAB")) {
      const data = JSON.parse(localStorage.getItem(key));
      allData.push(data);
    }
  }

  const handleDeleteItem = (id) => {
    const data = allData[0].filter((rab) => rab.id !== id);
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

  return (
    <div className="row mb-2">
      <div className="col">
        <Card>
          <Card.Header>
            <div className="">
              <button
                type="button"
                onClick={handleShow}
                className="btn btn-primary"
              >
                Tambah
              </button>
            </div>
          </Card.Header>
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
          <ModalsRab show={ShowModal} handleClose={handleClose} />
          {/* <EditModalsRab
            show={editDataModal}
            handleClose={handleCloseEdit}
            data={editDataRab}
            dataOld={allData[0]}
          /> */}
        </Card>
      </div>
    </div>
  );
};

export default DataTableRab;
