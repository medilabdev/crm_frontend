import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const AddModalSupport = ({ show, handleClose, onSave }) => {
  const [inputData, setInputData] = useState({
    item_uid: '',
    qty: '',
    realization_note: ''
  });
  const [inputEst, setInputEst] = useState('');
  const [resultValue, setResultValue] = useState(0);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: value }));
  };

  const handleInputDataRP = (event) => {
    const rawValue = event.target.value;
    const formattedValue = formatCurrency(rawValue);
    setInputEst(formattedValue);
  };

  const formatCurrency = (value) => {
    const sanitizedValue = value.replace(/[^\d]/g, '');
    return Number(sanitizedValue || 0).toLocaleString('id-ID');
  };

  const getNumeric = (val) => parseFloat(val?.toString().replace(/\./g, '')) || 0;

  useEffect(() => {
    const total = getNumeric(inputEst) * parseFloat(inputData.qty || 0);
    setResultValue(total);
  }, [inputEst, inputData.qty]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: `support_${Date.now()}`,
      item_uid: inputData.item_uid,
      estimated_cost: getNumeric(inputEst),
      qty: parseFloat(inputData.qty),
      total_estimated_cost: resultValue,
      realization_note: inputData.realization_note,
    };

    onSave(newItem);
    setInputData({ item_uid: '', qty: '', realization_note: '' });
    setInputEst('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Data Support</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="item_uid"
            value={inputData.item_uid}
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
            value={`Rp. ${new Intl.NumberFormat().format(resultValue || 0)}`}
            readOnly
            placeholder="Total Estimasi Biaya"
          />
          <label>Total Estimasi Biaya</label>
        </div>

        <div className="mb-3">
          <label className="fw-semibold">Catatan Realisasi</label>
          <textarea
            name="realization_note"
            value={inputData.realization_note}
            onChange={handleInput}
            className="form-control"
            rows="3"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Batal
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModalSupport;
