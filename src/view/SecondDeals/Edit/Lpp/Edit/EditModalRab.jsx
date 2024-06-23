import React, { useEffect, useState } from 'react'
import { Button, Modal, Offcanvas } from "react-bootstrap";
import { json } from 'react-router-dom';

const EditModalRab = ({ show, handleClose, data, dataAll}) => {
    const [InputData, SetInputData] = useState({});
    const [isAlkes, setIsAlkes] = useState({})
    const [inputEst, setInputEst] = useState("");
    const [resultValue, setResultValue] = useState("");
    
    useEffect(() => {
      SetInputData(data);
      setIsAlkes(data?.is_alkes)
      setInputEst(data?.estimated_cost ? data?.estimated_cost.toString() : "")
    }, [data])
      const handleInput = (e) => {
        SetInputData({
          ...InputData,
          [e.target.name]: e.target.value,
        });
      };

      const handleAlkes = (e) => {
        setIsAlkes(e.target.value)
      }

    const handleInputDataRP = (event) => {
        const rawValue = event.target.value;
        const formattedValue = formatCurrency(rawValue);
        setInputEst(formattedValue);
      };

    const formatCurrency = (value) => {
      const sanitizedValue = value.replace(/[^\d]/g, "")
      return new Intl.NumberFormat('id-ID').format(parseInt(sanitizedValue));
      };

    let DataEst = parseInt(inputEst.replace(/\./g, ""), 10)
    let inputQty = parseFloat(InputData.qty)

    useEffect(() => {
      const result_price = DataEst * inputQty
      setResultValue(result_price)
    }, [DataEst, inputQty])

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataUpdate = dataAll.map((item) => {
      if(item.id == data.id){
        return{
          ...item, 
          id:InputData.id,
          item_uid: InputData.item_uid,
          is_alkes:isAlkes,
          estimated_cost: DataEst,
          qty:InputData.qty,
          total_estimated_cost:resultValue, 
          realization_note:InputData.realization_note
        }
      }
      return item
    })
    localStorage.setItem('rabEdit', JSON.stringify(dataUpdate))
    handleClose()
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
          name="item_uid"
          value={InputData.item_uid}
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
          onChange={handleAlkes}
          value={isAlkes}
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
          value={InputData.qty || ""}
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
        >{InputData.realization_note}</textarea>
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