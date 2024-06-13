import React, { useEffect, useState } from 'react'
import { Button, Modal, Offcanvas } from "react-bootstrap";

const EditModalRab = ({ show, handleClose}) => {
    const [InputData, SetInputData] = useState({});
    const [inputEst, setInputEst] = useState([]);
  const [resultValue, setResultValue] = useState();
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
  useEffect(() => {
    const result_estimasi_charge = tempOne * tempTwo;
    setResultValue(result_estimasi_charge);
  }, [tempOne, tempTwo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(InputData).length > 0) {
      const dataExist = JSON.parse(localStorage.getItem("rabEdit")) || [];
      const uid = `data_${Date.now()}`;
      const Payload = {
        uid: uid,
        item_uid: InputData.item,
        is_alkes: InputData.is_alkes,
        estimated_cost: tempOne,
        qty: InputData.qty,
        total_estimated_cost: resultValue,
        realization_note: InputData.realization_note,
      };
      dataExist.push(Payload);
      localStorage.setItem("rabEdit", JSON.stringify(dataExist));
      SetInputData({
        item_uid: "",
        total_estimated_cost: 0,
        realization_note: "",
        qty: "",
      });
      setInputEst(0);
      handleClose();
    }
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
          onChange={handleInput}
          className="form-control"
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
          id="floatingInput"
          value={inputEst || 0}
          onChange={handleInputDataRP}
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
          name="realization_note"
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
  )
}

export default EditModalRab