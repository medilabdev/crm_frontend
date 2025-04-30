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
import React, { useEffect, useState } from "react";

const FormDataBank = ({ handleBankInputChange }) => {
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
      {inputData.map((data, index) => (
        <>
         <div class="header-box">
                  DATA BANK {index + 1}
              </div>
          <div key={index}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    placeholder="Input in here"
                    className="form-control"
                    name="nameBank"
                    onChange={(e) => handleBankInputChange(e, index, "nameBank")}
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
                    name="cabang"
                    onChange={(e) => handleBankInputChange(e, index, "cabang")}
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
                    name="nameAccount"
                    onChange={(e) => handleBankInputChange(e, index, "nameAccount")}
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
                    name="cityBank"
                    onChange={(e) => handleBankInputChange(e, index, "cityBank")} 
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
                    name="noRek"
                    onChange={(e) => handleBankInputChange(e, index, "noRek")}
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
                    name="mataUang"
                    onChange={(e) => handleBankInputChange(e, index, "mataUang")}
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
                name="swiftCode"
                onChange={(e) => handleBankInputChange(e, index, "swiftCode")}
              />
              <label htmlFor="floatingInput">
                <FontAwesomeIcon icon={faCode} /> Swift Code
              </label>
            </div>
          </div>
          {inputData.length > 1 ?
               <div className="col ">
               <button
                 type="button"
                 className="btn btn-danger"
                 onClick={() => removeFormBank(index)}
               >
                 <FontAwesomeIcon icon={faTrash} />
               </button>
             </div>    
           : ""}
       
        </>
      ))}
      <button type="button" className="btn btn-primary mt-2" onClick={addForm}>
        <FontAwesomeIcon icon={faPlus} className="fs-6" /> Tambah Data Bank
      </button>
    </div>
  );
};

export default FormDataBank;
