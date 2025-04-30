import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const EditModalFee = ({ show, handleClose, data, onSave }) => {
  const [inputData, setInputData] = useState({});
  const [inputEst, setInputEst] = useState('');
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (data) {
      setInputData(data);
      setInputEst(
        data?.value
          ? data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          : ""
      );
    }
  }, [data]);

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
    return new Intl.NumberFormat("id-ID").format(parseInt(sanitizedValue || "0", 10));
  };

  const parsedValue = parseInt(inputEst.replace(/\./g, ""), 10) || 0;
  const qtyValue = parseFloat(inputData.qty) || 0;

  useEffect(() => {
    const result = parsedValue * qtyValue;
    setTotalValue(result);
  }, [parsedValue, qtyValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...inputData,
      value: parsedValue,
      qty: qtyValue,
      total: totalValue,
    };
    onSave(updatedData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Fee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="recieve_name"
            value={inputData.recieve_name || ""}
            onChange={handleInput}
            placeholder="Nama Penerima"
          />
          <label htmlFor="recieve_name">Nama Penerima</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="value"
            value={inputEst}
            onChange={handleInputDataRP}
            placeholder="Nilai"
          />
          <label htmlFor="value">Nilai</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            name="qty"
            value={inputData.qty || ""}
            onChange={handleInput}
            placeholder="Qty"
          />
          <label htmlFor="qty">Qty</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="total"
            value={totalValue}
            readOnly
            placeholder="Total"
          />
          <label htmlFor="total">Total Estimasi Biaya</label>
        </div>
        <div className="mb-3">
          <label htmlFor="note" className="form-label fw-bold">Catatan Realisasi</label>
          <textarea
            className="form-control"
            name="realization_note"
            rows="3"
            value={inputData.realization_note || ""}
            onChange={handleInput}
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

export default EditModalFee;
