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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(inputData).length > 0) {
      const dataExist = JSON.parse(localStorage.getItem("FeeTindakan")) || [];
      const id = `data_${Date.now()}`;
      const payload = {
        id: id,
        name: inputData.name,
        nilai: inputData.nilai,
        qty: inputData.qty,
        total: inputData.total,
        note: inputData.note,
      };
      dataExist.push(payload);
      localStorage.setItem("FeeTindakan", JSON.stringify(dataExist));
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
            type="number"
            class="form-control"
            name="nilai"
            onChange={handleInput}
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
            onChange={handleInput}
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
