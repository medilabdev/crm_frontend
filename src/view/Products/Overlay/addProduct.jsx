import axios from "axios";
import React, { useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import Swal from "sweetalert2";

const OverlayAddProducts = ({ visible, onClose }) => {
  const token = localStorage.getItem("token");
  const [inputProduct, setInputProduct] = useState({
    name: "",
    price: "",
  });
  const handleInput = (e) => {
    setInputProduct({
      ...inputProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const add = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/products`,
        inputProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: add.data.message,
        text: "Successfully add product",
        icon: "success",
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
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
  };

  return (
    <Offcanvas
      show={visible}
      onHide={onClose}
      placement="end"
      className="offcanvas-content"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Single Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>
              Name Product <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control type="text" name="name" onChange={handleInput} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              Price <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control type="number" name="price" onChange={handleInput} required/>
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

export default OverlayAddProducts;
