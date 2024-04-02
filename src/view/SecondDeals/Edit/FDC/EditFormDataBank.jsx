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

const EditFormDataBank = ({ data }) => {
  const [editBank, setEditBank] = useState(data);

  const handleChangeValue = (index, field, value) => {
    const newValue = [...editBank];
    newValue[index] = { ...newValue[index], [field]: value };
    setEditBank(newValue);
  };

  const handleAddBank = () => {
    setEditBank([
      ...editBank,
      {
        bank_name: "",
        branch_bank: "",
        account_name: "",
        city: "",
        bank_account_number: "",
        currency: "",
        swift_code: "",
      },
    ]);
  };

  const handleDeleteBank = (index) => {
    const newValue = [...editBank];
    newValue.splice(index, 1);
    setEditBank(newValue);
  };
  return (
    <>
      {editBank?.map((item, index) => (
        <div key={index}>
          {console.log(item)}
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  placeholder="Input in here"
                  className="form-control"
                  value={item.bank_name || ""}
                  name={`bank_name[${index}]`}
                  onChange={(e) =>
                    handleChangeValue(index, "bank_name", e.target.value)
                  }
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
                  name={`branch_bank[${index}]`}
                  value={item.branch_bank || ""}
                  onChange={(e) =>
                    handleChangeValue(index, "branch_bank", e.target.value)
                  }
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
                  name={`account_name[${index}]`}
                  value={item.account_name || ""}
                  onChange={(e) =>
                    handleChangeValue(index, "account_name", e.target.value)
                  }
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
                  name={`city[${index}]`}
                  value={item.city || ""}
                  onChange={(e) =>
                    handleChangeValue(index, "city", e.target.value)
                  }
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
                  name={`bank_account_number[${index}]`}
                  value={item.bank_account_number || ""}
                  onChange={(e) =>
                    handleChangeValue(
                      index,
                      "bank_account_number",
                      e.target.value
                    )
                  }
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
                  name={`currency[${index}]`}
                  value={item?.currency || ""}
                  onChange={(e) =>
                    handleChangeValue(index, "currency", e.target.value)
                  }
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
              name={`swift_code[${index}]`}
              value={item.swift_code || ""}
              onChange={(e) =>
                handleChangeValue(index, "swift_code", e.target.value)
              }
            />
            <label htmlFor="floatingInput">
              <FontAwesomeIcon icon={faCode} /> Swift Code
            </label>
          </div>
          {editBank?.length > 1 ? (
            <div className="col mb-4">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDeleteBank(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-primary mt-2 mb-3"
        onClick={handleAddBank}
      >
        <FontAwesomeIcon icon={faPlus} className="fs-6" /> Tambah Data Bank
      </button>
      <div className="mb-3">
        <button type="submit" className="btn btn-success">
          Simpan
        </button>
      </div>
    </>
  );
};

export default EditFormDataBank;
