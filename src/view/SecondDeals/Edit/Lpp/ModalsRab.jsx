import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalsRab = ({ show, handleClose }) => {
  const [InputData, SetInputData] = useState({});
  const [inputEst, setInputEst] = useState([]);
  const handleInput = (e) => {
    SetInputData({
      ...InputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputDataRP = (event) => {
    const rawValue = event.target.value;
    const formattedValue = formatCurrency(rawValue);
    setInputEst(formattedValue);
  };

  const formatCurrency = (value) => {
    const sanitizedValue = value.replace(/[^\d]/g, "");
    const formattedValue = Number(sanitizedValue).toLocaleString("id-ID");
    return formattedValue;
  };

  const inputWithoutSeparator =
    inputEst.length > 0 ? inputEst.replace(/\./g, "") : "";
  const tempOne = parseFloat(inputWithoutSeparator);
  const tempTwo = parseFloat(InputData.qty);
  const result_estimasi_charge = tempOne * tempTwo;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(InputData).length > 0) {
      const dataExist = JSON.parse(localStorage.getItem("RAB")) || [];
      const id = `data_${Date.now()}`;
      const Payload = {
        id: id,
        item: InputData.item,
        nilai_estimasi_biaya: tempOne,
        qty: InputData.qty,
        total_estimasi_biaya: result_estimasi_charge,
        note: InputData.note,
      };
      dataExist.push(Payload);
      localStorage.setItem("RAB", JSON.stringify(dataExist));
      SetInputData({
        item: "",
        total_estimasi_biaya: 0,
        note: "",
        qty: "",
      });
      const valueFeeString = localStorage.getItem("valueRab");
      let totalExistingValue = valueFeeString ? parseInt(valueFeeString) : 0;
      totalExistingValue += result_estimasi_charge;
      localStorage.setItem("valueRab", totalExistingValue.toString());
      setInputEst(0);
      handleClose();
    }
  };

  useEffect(() => {
    const clearDataRABLocalstorage = () => {
      localStorage.removeItem("RAB");
    };
    window.addEventListener("unload", clearDataRABLocalstorage);
    return () => {
      window.removeEventListener("unload", clearDataRABLocalstorage);
    };
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            name="item"
            onChange={handleInput}
            placeholder="name@example.com"
          />
          <label for="floatingInput">Item</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            value={inputEst || 0}
            onChange={handleInputDataRP}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Nilai Estimasi Biaya</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            name="qty"
            onChange={handleInput}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Qty</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            name="total_estimasi_biaya"
            value={result_estimasi_charge || 0}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Total Estimasi Biaya</label>
        </div>
        <div className="mb-3">
          <label htmlFor="" style={{ fontWeight: "600" }}>
            Catatan Realisasi
          </label>
          <textarea
            id=""
            cols="30"
            rows="5"
            name="note"
            onChange={handleInput}
            className="form-control"
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalsRab;
