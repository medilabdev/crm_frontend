import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AddModalSupport = ({ show, handleClose, onSave }) => {
  const [inputData, setInputData] = useState([]);
  const [inputEst, setInputEst] = useState([]);
  const [resultValue, setResultValue] = useState(0);
  const handleInput = (e) => {
    setInputData({
      ...inputData,
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
  const tempTwo = parseFloat(inputData.qty);
  const result_estimasi_charge = tempOne * tempTwo;
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRab = {
      id: `data_${Date.now()}`,
      item: inputData.item,
      nilai_estimasi_biaya: tempOne,
      qty: tempTwo,
      total_estimasi_biaya: result_estimasi_charge,
      note: inputData.note,
    }
    onSave(newRab);
    setInputData({})
    setInputEst(0);
    handleClose();
  };

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
            name="nilai_estimasi_biaya"
            value={inputEst}
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
            type="number"
            class="form-control"
            name="total_estimasi_biaya"
            value={result_estimasi_charge}
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

export default AddModalSupport;
