import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const EditModalsRab = ({ show, handleClose, data, onSave }) => {
  const [inputData, setInputData] = useState({});
  const [isAlkes, setIsAlkes] = useState("");
  const [inputRp, setInputRp] = useState("");
  const [resultValue, setResultValue] = useState(0);

  useEffect(() => {
    if (data) {
      setInputData(data);
      setIsAlkes(data?.is_alkes || "");
      setInputRp(
        data?.nilai_estimasi_biaya
          ? data.nilai_estimasi_biaya.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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

  const handleAlkes = (e) => {
    setIsAlkes(e.target.value);
  };

  const handleInputDataRP = (e) => {
    const rawValue = e.target.value;
    const formatted = formatCurrency(rawValue);
    setInputRp(formatted);
  };

  const formatCurrency = (value) => {
    const cleaned = value.replace(/[^\d]/g, "");
    return Number(cleaned).toLocaleString("id-ID");
  };

  useEffect(() => {
    const nilai = parseInt(inputRp.replace(/\./g, "")) || 0;
    const qty = parseFloat(inputData.qty) || 0;
    setResultValue(nilai * qty);
  }, [inputRp, inputData.qty]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedItem = {
      ...inputData,
      is_alkes: isAlkes,
      nilai_estimasi_biaya: parseInt(inputRp.replace(/\./g, "")) || 0,
      total_estimasi_biaya: resultValue,
    };

    onSave(updatedItem); // ⬅️ Kirim ke parent untuk update
    handleClose();
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
            name="item"
            value={inputData.item || ""}
            onChange={handleInput}
            placeholder="Item"
          />
          <label>Item</label>
        </div>
        <div className="mb-3">
          <label>Apakah Alat Kesehatan</label>
          <select
            className="form-control"
            name="is_alkes"
            value={isAlkes}
            onChange={handleAlkes}
          >
            <option value="">Pilih</option>
            <option value="yes">Ya</option>
            <option value="no">Tidak</option>
          </select>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="nilai_estimasi_biaya"
            value={inputRp}
            onChange={handleInputDataRP}
            placeholder="Nilai Estimasi"
          />
          <label>Nilai Estimasi Biaya</label>
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
          <label>Qty</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            readOnly
            value={`Rp. ${new Intl.NumberFormat().format(resultValue)}`}
            placeholder="Total Estimasi"
          />
          <label>Total Estimasi Biaya</label>
        </div>
        <div className="mb-3">
          <label>Catatan Realisasi</label>
          <textarea
            name="note"
            rows="3"
            className="form-control"
            value={inputData.note || ""}
            onChange={handleInput}
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Batal
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Simpan Perubahan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModalsRab;
