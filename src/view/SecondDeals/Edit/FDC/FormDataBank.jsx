import { id_ID } from "@faker-js/faker";
import {
  faBuildingColumns,
  faCity,
  faCode,
  faCodeBranch,
  faCreditCard,
  faMoneyBill,
  faPlus,
  faTrash,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const FormDataBank = () => {
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
  const removeFormBank = (index) => {
    setInputData((input) => {
      const form = [...input];
      form.splice(index, 1);
      return form;
    });
  };
  return (
    <div>
      <div class="alert alert-primary mt-2" role="alert">
        <h6 style={{ fontWeight: "700" }}>
          <FontAwesomeIcon icon={faBuildingColumns} className="me-2" /> Data
          Bank
        </h6>
      </div>
      {inputData.map((data, index) => (
        <>
          <div class="alert alert-primary mt-2" role="alert">
            <h6 style={{ fontWeight: "700" }}>
              <FontAwesomeIcon icon={faBuildingColumns} className="me-2" /> Data
              Bank {index + 1}
            </h6>
          </div>
          <div key={index}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    placeholder="Input in here"
                    className="form-control"
                    name={`nameBank[${index}]`}
                  />
                  <label htmlFor="floatingInput">
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
                  <label htmlFor="floatingInput">
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
                  <label htmlFor="floatingInput">
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
                  <label htmlFor="floatingInput">
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
                  <label htmlFor="floatingInput">
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
                  <label htmlFor="floatingInput">
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
              <label htmlFor="floatingInput">
                <FontAwesomeIcon icon={faCode} /> Swift Code
              </label>
            </div>
          </div>

          <div className="col ">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeFormBank(index)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </>
      ))}
      <button type="button" className="btn btn-primary mt-2" onClick={addForm}>
        <FontAwesomeIcon icon={faPlus} className="fs-6" /> Tambah Data Bank
      </button>
    </div>
  );
};

export default FormDataBank;
