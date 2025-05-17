import React, { useEffect, useState } from "react";
import { Button, Modal, Offcanvas } from "react-bootstrap";

const ModalsRab = ({ show, handleClose, onSave }) => {
  const [InputData, SetInputData] = useState({});
  const [inputEst, setInputEst] = useState([]);
  const [resultValue, setResultValue] = useState(0);
  
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

  const inputWithoutSeparator = inputEst.length > 0 ? inputEst.replace(/\./g, "") : "";
  const tempOne = parseFloat(inputWithoutSeparator);
  const tempTwo = parseFloat(InputData.qty);

  useEffect(() => {
    const result_estimasi_charge = tempOne * tempTwo;
    setResultValue(result_estimasi_charge);
  }, [tempOne, tempTwo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRab = {
      id: `data_${Date.now()}`,
      item: InputData.item,
      is_alkes: InputData.is_alkes,
      nilai_estimasi_biaya: tempOne,
      qty: InputData.qty,
      total_estimasi_biaya: resultValue,
      note: InputData.note,
    }
      onSave(newRab);
      SetInputData({});
      setInputEst(0);
      handleClose();
  };


  return (
    <Modal show={show} onHide={handleClose} placement="end">
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
        <div className="mb-3">
          <label htmlFor="">Apakah Alat Kesehatan</label>
          <select
            name="is_alkes"
            id=""
            className="form-control"
            onChange={handleInput}
          >
            <option value="">Select Choose</option>
            <option value="yes">Iya</option>
            <option value="no">Tidak</option>
          </select>
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
            value={resultValue || 0}
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
      <Modal.Footer className="mb-4">
        <Button variant="secondary" className="me-2" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" className="me-3" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalsRab;
