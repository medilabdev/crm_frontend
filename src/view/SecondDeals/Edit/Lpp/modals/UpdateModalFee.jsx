import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const UpdateModalFee = ({show, handleClose, data, dataAll}) => {
    const [inputData, setInputData] = useState({})
    const [inputEst, setInputEst] = useState("")
    const [resultValue, setResultValue] = useState("");
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
      const sanitizedValue = value.replace(/[^\d]/g, "")
      return new Intl.NumberFormat('id-ID').format(parseInt(sanitizedValue));
      };

    let DataEst = parseInt(inputEst.replace(/\./g, ""), 10)
    let inputQty = parseFloat(inputData.qty)
    useEffect(() => {
        const result_price = DataEst * inputQty
        setResultValue(result_price)
      }, [DataEst, inputQty])
      const handleSubmit =(e) => {
        e.preventDefault()
        const dataUpdate = dataAll.map((item) => {
            if (item.id === inputData.id) {
              return {
                id: inputData.id,
                recieve_name: inputData.recieve_name,
                value: DataEst,
                qty: inputData.qty,
                total: resultValue,
                realization_note: inputData.realization_note,
              };
            }
            return item;
          });
          localStorage.setItem("feeEdit", JSON.stringify(dataUpdate));
          handleClose()
      }

      useEffect(() => {
        setInputData(data)
        setInputEst(data?.value ? data?.value.toString() : "")
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
          name="recieve_name"
          value={inputData.recieve_name|| ""}
          onChange={handleInput}
          placeholder="name@example.com"
        />
        <label for="floatingInput">Nama Penerima</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          name="value"
          value={inputEst || ""}
          onChange={handleInputDataRP}
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
          value={resultValue || ""}
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
          name="realization_note"
          onChange={handleInput}
          className="form-control"
          value={inputData.realization_note}
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

export default UpdateModalFee