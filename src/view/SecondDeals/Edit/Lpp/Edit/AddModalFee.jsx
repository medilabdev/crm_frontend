import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

const AddModalFee = ({ show, handleClose, onSave }) => {
  const [inputData, setInputData] = useState({
    recieve_name: '',
    qty: '',
    realization_note: ''
  });
  const [inputEst, setInputEst] = useState('');
  const [totalValue, setTotalValue] = useState(0);

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
    return Number(sanitizedValue).toLocaleString("id-ID");
  };

  useEffect(() => {
    const rawValue = parseInt(inputEst.replace(/\./g, ''), 10) || 0;
    const qty = parseFloat(inputData.qty) || 0;
    setTotalValue(rawValue * qty);
  }, [inputEst, inputData.qty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const rawValue = parseInt(inputEst.replace(/\./g, ''), 10) || 0;
  
    const newItem = {
      id: `data_${Date.now()}`,
      recieve_name: inputData.recieve_name,
      value: rawValue,
      qty: parseFloat(inputData.qty) || 0,
      total: totalValue,
      realization_note: inputData.realization_note,
    };
  
    onSave(newItem);
  
    setInputData({
      recieve_name: '',
      qty: '',
      realization_note: ''
    });
    setInputEst('');
    setTotalValue(0);
    handleClose();
  };
  

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="recieve_name"
            value={inputData.recieve_name}
            onChange={handleInput}
            placeholder="Nama Penerima"
          />
          <label>Nama Penerima</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="value"
            value={inputEst}
            onChange={handleInputDataRP}
            placeholder="Nilai Estimasi"
          />
          <label>Nilai Estimasi</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            name="qty"
            value={inputData.qty}
            onChange={handleInput}
            placeholder="Qty"
          />
          <label>Qty</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="total"
            value={totalValue.toLocaleString('id-ID')}
            readOnly
            placeholder="Total"
          />
          <label>Total Estimasi Biaya</label>
        </div>

        <div className="mb-3">
          <label className="fw-bold">Catatan Realisasi</label>
          <textarea
            className="form-control"
            name="realization_note"
            value={inputData.realization_note}
            onChange={handleInput}
            rows="4"
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModalFee;
