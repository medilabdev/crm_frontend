import {
  faBuildingColumns,
  faCity,
  faCode,
  faCodeBranch,
  faCreditCard,
  faMoneyBill,
  faPenToSquare,
  faPlus,
  faTrash,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Swal from "sweetalert2";
import ModalBank from "./ModalBank";

const EditBank = ({ valueOld }) => {
  const [editModal, setEditModal] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setEditModal(item);
    setShow(true);
  };
  return (
    <div>
      {valueOld.map((item, index) => (
        <>
          <div class="alert alert-primary mt-2" role="alert">
            <h6 style={{ fontWeight: "700" }}>
              <FontAwesomeIcon icon={faBuildingColumns} className="me-2" /> Data
              Bank {index + 1}
            </h6>
          </div>
          <table className="mb-2">
            <tr className="fw-medium mb-4">
              <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama Bank</td>
              <td className="px-1">:</td>
              <td>{item?.bank_name || ""}</td>
            </tr>
            <tr className="fw-medium">
              <td style={{ width: "300px", fontSize: "0.9rem" }}>Cabang</td>
              <td className="px-1">:</td>
              <td>{item?.branch_bank || ""}</td>
            </tr>
            <tr className="fw-medium">
              <td style={{ width: "200px", fontSize: "0.9rem" }}>
                Nama Account (A/N)
              </td>
              <td className="px-1">:</td>
              <td>{item?.account_name || ""}</td>
            </tr>
            <tr className="fw-medium ">
              <td style={{ width: "200px", fontSize: "0.9rem" }}>Kota</td>
              <td className="px-1">:</td>
              <td>{item?.city || ""}</td>
            </tr>
            <tr className="fw-medium ">
              <td style={{ width: "200px", fontSize: "0.9rem" }}>
                No. Rekening
              </td>
              <td className="px-1">:</td>
              <td>{item?.bank_account_number || "-"}</td>
            </tr>
            <tr className="fw-medium ">
              <td style={{ width: "200px", fontSize: "0.9rem" }}>Mata Uang</td>
              <td className="px-1">:</td>
              <td>{item?.currency || "-"}</td>
            </tr>
            <tr className="fw-medium ">
              <td style={{ width: "200px", fontSize: "0.9rem" }}>Swift Code</td>
              <td className="px-1">:</td>
              <td>{item?.swift_code || ""}</td>
            </tr>
          </table>
          <div className="mb-4">
            <button
              className="btn btn-success"
              onClick={() => handleShow(item)}
            >
              <FontAwesomeIcon icon={faPenToSquare} /> Edit
            </button>
          </div>
        </>
      ))}
      <ModalBank
        data={editModal}
        show={show !== false}
        handleClose={handleClose}
      />
    </div>
  );
};

export default EditBank;
