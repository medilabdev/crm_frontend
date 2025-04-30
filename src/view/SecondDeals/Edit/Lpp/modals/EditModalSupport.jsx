import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

const EditModalSupport = ({show, handleClose, data, onSave}) => {
    const [inputData, setInputData] = useState([])
    const [inputRp, setInputRp] = useState("")
    const [resultValue, setResultValue] = useState("")
    
    const handleInput = (e) => {
        setInputData({
          ...inputData,
          [e.target.name]: e.target.value,
        });
      };

      const handleInputDataRP =(event) => {
        const rawValue = event.target.value
        const formatedValue = formatCurrency(rawValue)
        setInputRp(formatedValue)
      }
      
      const formatCurrency = (value) => {
        const sanitizedValue = value.replace(/[^\d]/g, "")
        return new Intl.NumberFormat('id-ID').format(parseInt(sanitizedValue));
      }

      let inputRpResult = parseInt(inputRp.replace(/\./g, ""), 10);
      let inputQty = parseFloat(inputData.qty)

      useEffect(()=>{
        const result_price = inputQty * inputRpResult
        setResultValue(result_price)
      },[inputRpResult, inputQty])

      const handleSubmit = (e) => {
        e.preventDefault();
        const updatedItem = {
          ...inputData, 
          nilai_estimasi_biaya:inputRpResult,
          total_estimasi_biaya: resultValue
        }
        onSave(updatedItem);
          handleClose()
      }
      useEffect(() => {
        setInputData(data);
        setInputRp(data?.nilai_estimasi_biaya ? data.nilai_estimasi_biaya.toString() : "")
      }, [data]);
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
          value={inputData.item || ""}
          onChange={handleInput}
          placeholder="name@example.com"
        />
        <label for="floatingInput">Item</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          name="nilai_estimasi_biaya"
          value={inputRp || 0}
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
          value={inputData.qty || ""}
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
          value={resultValue || ""}
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
          value={inputData.note || ""}
        />
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
  )
}

export default EditModalSupport