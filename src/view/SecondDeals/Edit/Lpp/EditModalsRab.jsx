import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const EditModalsRab = ({ show, handleClose, data, dataOld }) => {
  const [inputData, setInputData] = useState({});
  const handleInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setInputData(data);
  }, [data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataUpdate = dataOld.map((item) => {
      if (item.id === inputData.id) {
        return {
          id: inputData.id,
          item: inputData.item,
          nilai_estimasi_biaya: inputData.nilai_estimasi_biaya,
          qty: inputData.qty,
          total_estimasi_biaya: inputData.total_estimasi_biaya,
          note: inputData.note,
        };
      }
      return item;
    });
    localStorage.setItem("RAB", JSON.stringify(dataUpdate));
    handleClose()
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Data RAB</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            name="item"
            onChange={handleInput}
            value={inputData.item || ""}
            placeholder="name@example.com"
          />
          <label for="floatingInput">Item</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            name="nilai_estimasi_biaya"
            onChange={handleInput}
            value={inputData.nilai_estimasi_biaya || ""}
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
            value={inputData.qty || ""}
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
            onChange={handleInput}
            value={inputData.total_estimasi_biaya || ""}
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
          >
            {inputData.note}
          </textarea>
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

export default EditModalsRab;
