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
import React, { useEffect, useState } from "react";
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
  const [inputData, setInputData] = useState([]);
  const addForm = () => {
    setInputData([
      ...inputData,
      {
        nameBank: "",
        cabang: "",
        nameAccount: "",
        cityBank: "",
        noRek: "",
        mataUang: "",
        swiftCode: "",
      },
    ]);
  };
  useEffect(() => {
    if (inputData.length === 0) {
      setInputData([{ nameBank: '', cabang: '', nameAccount: '', cityBank: '', noRek: '', mataUang: '', swiftCode: '' }]);
    }
  }, [inputData]);
  const removeFormBank = (index) => {
    setInputData((input) => {
      const form = [...input];
      form.splice(index, 1);
      return form;
    });
  };
  return (
    <div>
    <div>
      {valueOld.length > 0 ? (
        valueOld.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="header-box">
              <FontAwesomeIcon icon={faBuildingColumns} className="me-2" />
              DATA BANK {index + 1}
            </div>
            <table className="mb-2">
              <tbody>
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
                  <td style={{ width: "300px", fontSize: "0.9rem" }}>
                    Nama Account (A/N)
                  </td>
                  <td className="px-1">:</td>
                  <td>{item?.account_name || ""}</td>
                </tr>
                <tr className="fw-medium">
                  <td style={{ width: "300px", fontSize: "0.9rem" }}>Kota</td>
                  <td className="px-1">:</td>
                  <td>{item?.city || ""}</td>
                </tr>
                <tr className="fw-medium">
                  <td style={{ width: "300px", fontSize: "0.9rem" }}>No. Rekening</td>
                  <td className="px-1">:</td>
                  <td>{item?.bank_account_number || "-"}</td>
                </tr>
                <tr className="fw-medium">
                  <td style={{ width: "300px", fontSize: "0.9rem" }}>Mata Uang</td>
                  <td className="px-1">:</td>
                  <td>{item?.currency || "-"}</td>
                </tr>
                <tr className="fw-medium">
                  <td style={{ width: "300px", fontSize: "0.9rem" }}>Swift Code</td>
                  <td className="px-1">:</td>
                  <td>{item?.swift_code || ""}</td>
                </tr>
              </tbody>
            </table>
            <button
              className="btn btn-success"
              onClick={() => handleShow(item)}
            >
              <FontAwesomeIcon icon={faPenToSquare} /> Edit
            </button>
          </div>
        ))
      ) : (
        <div>
          {inputData.map((data, index) => (
            <div key={index} className="mb-4">
              <div className="header-box">
                <FontAwesomeIcon icon={faBuildingColumns} className="me-2" />
                DATA BANK {index + 1}
              </div>
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        placeholder="Input in here"
                        className="form-control"
                        name={`nameBank[${index}]`}
                      />
                      <label>
                        <FontAwesomeIcon icon={faBuildingColumns} /> Nama Bank
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        placeholder="Input in here"
                        className="form-control"
                        name={`cabang[${index}]`}
                      />
                      <label>
                        <FontAwesomeIcon icon={faCodeBranch} /> Cabang
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        placeholder="Input in here"
                        className="form-control"
                        name={`nameAccount[${index}]`}
                      />
                      <label>
                        <FontAwesomeIcon icon={faUserTie} /> Nama Account (A/N)
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        placeholder="Input in here"
                        className="form-control"
                        name={`cityBank[${index}]`}
                      />
                      <label>
                        <FontAwesomeIcon icon={faCity} /> Kota
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        placeholder="Input in here"
                        className="form-control"
                        name={`noRek[${index}]`}
                      />
                      <label>
                        <FontAwesomeIcon icon={faCreditCard} /> No. Rekening
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        placeholder="Input in here"
                        className="form-control"
                        name={`mataUang[${index}]`}
                      />
                      <label>
                        <FontAwesomeIcon icon={faMoneyBill} /> Mata Uang
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    placeholder="Input in here"
                    className="form-control"
                    name={`swiftCode[${index}]`}
                  />
                  <label>
                    <FontAwesomeIcon icon={faCode} /> Swift Code
                  </label>
                </div>
                {inputData.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeFormBank(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={addForm}
          >
            <FontAwesomeIcon icon={faPlus} className="fs-6" /> Tambah Data Bank
          </button>
        </div>
      )}
    </div>
      
      <ModalBank
        data={editModal}
        show={show !== false}
        handleClose={handleClose}
      />
    </div>
  );
};

export default EditBank;
