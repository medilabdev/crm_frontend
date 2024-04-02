import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AddModalsFee = ({ show, handleClose }) => {
  const [inputData, setInputData] = useState([]);
  const handleInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const [inputEst, setInputEst] = useState([]);
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
    if (Object.keys(inputData).length > 0) {
      const dataExist = JSON.parse(localStorage.getItem("FeeTindakan")) || [];
      const id = `data_${Date.now()}`;
      const payload = {
        id: id,
        name: inputData.name,
        nilai: inputEst,
        qty: inputData.qty,
        total: result_estimasi_charge,
        note: inputData.note,
      };
      dataExist.push(payload);
      localStorage.setItem("FeeTindakan", JSON.stringify(dataExist));
      setInputData({
        item: "",
        name: "",
        nilai: "",
        qty: "",
        note: "",
      });
      setInputEst(0);
      handleClose();
    }
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
            name="name"
            onChange={handleInput}
            placeholder="name@example.com"
          />
          <label for="floatingInput">Nama Penerima</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            name="nilai"
            value={inputEst}
            onChange={handleInputDataRP}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Nilai </label>
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
            name="total"
            value={result_estimasi_charge}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Total</label>
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

export default AddModalsFee;
