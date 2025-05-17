import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const EditModalRab = ({ show, handleClose, data, onSave }) => {
  const [inputData, setInputData] = useState({
    item_uid: '',
    is_alkes: '',
    estimated_cost: '',
    qty: '',
    realization_note: '',
  });

  const [inputEst, setInputEst] = useState('');
  const [resultValue, setResultValue] = useState(0);

  useEffect(() => {
    if (data) {
      setInputData({
        item_uid: data.item_uid || '',
        is_alkes: data.is_alkes || '',
        qty: data.qty || '',
        realization_note: data.realization_note || '',
      });
      setInputEst(data.estimated_cost ? data.estimated_cost.toString() : '');
    }
  }, [data]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputEst = (e) => {
    const formatted = formatCurrency(e.target.value);
    setInputEst(formatted);
  };

  const formatCurrency = (value) => {
    const clean = value.replace(/[^\d]/g, '');
    return Number(clean || 0).toLocaleString('id-ID');
  };

  const getNumericValue = (val) => parseFloat(val?.toString().replace(/\./g, '')) || 0;

  useEffect(() => {
    const total = getNumericValue(inputEst) * parseFloat(inputData.qty || 0);
    setResultValue(total);
  }, [inputEst, inputData.qty]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...data,
      item_uid: inputData.item_uid,
      is_alkes: inputData.is_alkes,
      estimated_cost: getNumericValue(inputEst),
      qty: parseFloat(inputData.qty),
      total_estimated_cost: resultValue,
      realization_note: inputData.realization_note,
    };

    onSave(updatedData);
    handleClose()
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Data RAB</Modal.Title>
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

        <div className="mb-3">
          <label>Apakah Alat Kesehatan</label>
          <select
            name="is_alkes"
            className="form-control"
            value={inputData.is_alkes}
            onChange={handleInput}
          >
            <option value="">Pilih</option>
            <option value="yes">Iya</option>
            <option value="no">Tidak</option>
          </select>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            value={inputEst}
            onChange={handleInputEst}
            placeholder="Estimasi Biaya"
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
            readOnly
            value={`Rp. ${new Intl.NumberFormat().format(resultValue || 0)}`}
            placeholder="Total"
          />
          <label>Total Estimasi Biaya</label>
        </div>

        <div className="mb-3">
          <label>Catatan Realisasi</label>
          <textarea
            name="realization_note"
            className="form-control"
            rows="3"
            value={inputData.realization_note}
            onChange={handleInput}
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

export default EditModalRab;
