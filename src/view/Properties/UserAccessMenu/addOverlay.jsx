import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AddOverlay = ({ visible, onClose }) => {
  const uid = useParams();
  const token = localStorage.getItem("token")
  const [input, setInput] = useState([])
  const [menu, setMenu] = useState([])

  const getMenu = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user-menus?limit=15`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res) => {
        setMenu(res.data.data)
    })
    .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  }

  const handleInput = (e) => {
    setInput({
        ...input,
        [e.target.name]:e.target.value
    })
  }

  useEffect(() => {
    getMenu()
  }, [token])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("name", input.name)
    formData.append("menu_id", input.menu_id)
    formData.append("numbering", input.numbering)
    formData.append("role_uid", uid.uid)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user-access-menus`,formData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res) => {
        Swal.fire({
            title: res.data.message,
            text: "Successfully create item",
            icon: "success",
        }).then((res) => {
            if (res.isConfirmed) {
              window.location.reload();
            }
          });
    })
    .catch((err) => {
        Swal.fire({
          text: err.response.data.message,
          icon: "warning",
        });
      });
  };
  return (
    <Offcanvas show={visible} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Access Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Name <span className="text-danger fs-5">*</span></Form.Label>
            <Form.Control type="text"name="name" onChange={handleInput} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Number <span className="text-danger fs-5">*</span></Form.Label>
            <Form.Control type="number" name="numbering" onChange={handleInput} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Access Menu</Form.Label>
            <select name="menu_id" className="form-control" onChange={handleInput}>
                <option value="">Select Choose</option>
            {menu.map((data) => (
                <option value={data.id}>{data.name}</option>
            ))}
            </select>
          </Form.Group>
          <div className="mt-5">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button className="btn btn-secondary ms-3" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddOverlay;
