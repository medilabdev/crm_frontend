import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const EditModalSupport = ({ show, handleClose, data, onSave  }) => {
  const [inputData, setInputData] = useState({});
  const [inputEst, setInputEst] = useState('');
  const [resultValue, setResultValue] = useState(0);

  useEffect(() => {
    if (data) {
      setInputData(data);
      setInputEst(data?.estimated_cost?.toString() || '');
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
    const sanitizedValue = value.replace(/[^\d]/g, '');
    return new Intl.NumberFormat('id-ID').format(Number(sanitizedValue));
  };

  useEffect(() => {
    const estValue = Number(inputEst.replace(/\./g, '')) || 0;
    const qty = Number(inputData.qty) || 0;
    setResultValue(estValue * qty);
  }, [inputEst, inputData.qty]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const estValue = Number(inputEst.replace(/\./g, '')) || 0;
    const updatedItem = {
      ...inputData,
      estimated_cost: estValue,
      total_estimated_cost: estValue * Number(inputData.qty || 0),
    };

    // Kirim ke parent untuk update state
    onSave(updatedItem);

    handleClose();
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Data Support</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="item_uid"
            value={inputData.item_uid || ''}
            onChange={handleInput}
            placeholder="Item"
          />
          <label>Item</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="estimated_cost"
            value={inputEst}
            onChange={handleInputDataRP}
            placeholder="Nilai Estimasi Biaya"
          />
          <label>Nilai Estimasi Biaya</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            name="qty"
            value={inputData.qty || ''}
            onChange={handleInput}
            placeholder="Qty"
          />
          <label>Qty</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="total_estimated_cost"
            value={resultValue}
            readOnly
            placeholder="Total Estimasi Biaya"
          />
          <label>Total Estimasi Biaya</label>
        </div>
        <div className="mb-3">
          <label style={{ fontWeight: '600' }}>Catatan Realisasi</label>
          <textarea
            rows="4"
            className="form-control"
            name="realization_note"
            onChange={handleInput}
            value={inputData.realization_note || ''}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Tutup
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Simpan Perubahan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModalSupport;
