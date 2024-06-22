import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const EditModalsRab = ({ show, handleClose, data, dataOld }) => {
  const [inputData, setInputData] = useState({});
  const [isAlkes, setIsAlkes] = useState({});
  const [inputRp, setInputRp] = useState("");
  const [resultValue, setResultValue] = useState("");
  const handleInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAlkes = (e) => {
    setIsAlkes(e.target.value)
  }
  useEffect(() => {
    setInputData(data);
    setIsAlkes(data?.is_alkes)
    setInputRp(data?.nilai_estimasi_biaya ? data.nilai_estimasi_biaya.toString() : "")
  }, [data]);

  let inputRpResult = parseInt(inputRp.replace(/\./g, ""), 12);
  let inputQty = parseFloat(inputData.qty)
  
  useEffect(()=>{
    const result_price = inputQty * inputRpResult
    setResultValue(result_price)
  },[inputRpResult, inputQty])

  const handleInputDataRP =(event) => {
    const rawValue = event.target.value
    const formatedValue = formatCurrency(rawValue)
    setInputRp(formatedValue)
  }
  
  const formatCurrency = (value) => {
    const sanitizedValue = value.replace(/[^\d]/g, "")
    return new Intl.NumberFormat('id-ID').format(parseInt(sanitizedValue));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataUpdate = dataOld.map((item) => {
      if(item.id == inputData.id){
        return{
          ...item,
          id:inputData.id,
          item:inputData.item,
          is_alkes: isAlkes,
          nilai_estimasi_biaya:inputRpResult,
          qty: inputData.qty,
          total_estimasi_biaya: resultValue,
          note:inputData.note
        }
      }
      return item
    })
    localStorage.setItem("RAB", JSON.stringify(dataUpdate));
    handleClose()
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Data RAB</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            name="item"
            onChange={handleInput}
            value={inputData.item || ""}
            placeholder="name@example.com"
          />
          <label for="floatingInput">Item</label>
        </div>
        <div className="mb-3">
          <label htmlFor="">Apakah Alat Kesehatan</label>
          <select name="is_alkes" id="" className="form-control" value={isAlkes} onChange={handleAlkes}>
            <option value="">Select Choose</option>
            <option value="yes">Ya</option>
            <option value="no">Tidak</option>
          </select>
        </div>
        <div class="form-floating mb-3">
        
          <input
            type="text"
            class="form-control"
            name="nilai_estimasi_biaya"
            onChange={handleInputDataRP}
            value={inputRp || 0}
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
            value={inputData.qty || ""}
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
          >
            {inputData.note}
          </textarea>
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

export default EditModalsRab;
