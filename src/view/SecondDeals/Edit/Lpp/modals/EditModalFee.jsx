import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const EditModalFee = ({show, handleClose, data, dataOld}) => {
    const [inputData, setInputData] = useState([])
    const handleInput = (e) => {
        setInputData({
          ...inputData,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit =(e) => {
        e.preventDefault()
        const dataUpdate = dataOld.map((item) => {
            if (item.id === inputData.id) {
              return {
                id: inputData.id,
                name: inputData.name,
                nilai: inputData.nilai,
                qty: inputData.qty,
                total: inputData.total,
                note: inputData.note,
              };
            }
            return item;
          });
          localStorage.setItem("FeeTindakan", JSON.stringify(dataUpdate));
          handleClose()
      }
      useEffect(() => {
        setInputData(data)
      }, [data])
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
          name="name"
          value={inputData.name|| ""}
          onChange={handleInput}
          placeholder="name@example.com"
        />
        <label for="floatingInput">Nama Penerima</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="number"
          class="form-control"
          name="nilai"
          value={inputData.nilai || ""}
          onChange={handleInput}
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Nilai </label>
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
          name="total"
          value={inputData.total || ""}
          onChange={handleInput}
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Total</label>
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
        >{inputData.note}</textarea>
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

export default EditModalFee