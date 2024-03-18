import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalsRab = ({ show, handleClose }) => {
  const [InputData, SetInputData] = useState({});

  const handleInput = (e) => {
    SetInputData({
      ...InputData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(InputData).length > 0) {
      const dataExist = JSON.parse(localStorage.getItem("RAB")) || [];
      const id = `data_${Date.now()}`;
      const Payload = {
        id: id,
        item: InputData.item,
        nilai_estimasi_biaya: InputData.nilai_estimasi_biaya,
        qty: InputData.qty,
        total_estimasi_biaya: InputData.total_estimasi_biaya,
        note: InputData.note,
      };
      dataExist.push(Payload);
      localStorage.setItem("RAB", JSON.stringify(dataExist));
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
            type="number"
            class="form-control"
            name="nilai_estimasi_biaya"
            onChange={handleInput}
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
            onChange={handleInput}
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
