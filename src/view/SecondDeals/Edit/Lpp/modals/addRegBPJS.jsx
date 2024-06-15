import axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'

const AddRegBPJS = ({show, handleClose}) => {
    const token = localStorage.getItem('token')
    const [inputData, setInputData] = useState({})
    const handleInput = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()    
        try {
            const formData = new FormData()
            formData.append("name_location", inputData.name || "")
            formData.append("regional", inputData.regional || "")
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/v2/bpjs-regional`, formData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            Swal.fire({
                title: response.data.message,
                text: "Successfully Created Data",
                icon:"success",
            }).then((res) => {
                if (res.isConfirmed) {
                  window.location.reload();
                }
              });
        } catch (error) {
            if (error.response) {
                Swal.fire({
                  text: error.response.data.message,
                  icon: "warning",
                });
              } else {
                Swal.fire({
                  text: "Something went wrong !",
                  icon: "error",
                });
              }
        }
    }
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
            onChange={handleInput}
            placeholder="name@example.com"
          />
          <label for="floatingInput">Location</label>
        </div>
    <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            id="floatingInput"
            name="regional"
            onChange={handleInput}
            placeholder="name@example.com"
          />
          <label for="floatingInput">Regional</label>
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

export default AddRegBPJS