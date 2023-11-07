import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import Swal from "sweetalert2";

const OverlayEditProduct = ({ visible, onClose, uid }) => {
  const token = localStorage.getItem("token");
  const [editProduct, setEditProduct] = useState({});
  const getDetailProdut = (uid) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const oldData = res.data.data;
        setEditProduct({
          name: oldData.name,
          price: oldData.price,
        });
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: value,
    });
  };
  useEffect(() => {
    if (visible && uid) {
      getDetailProdut(uid);
    }
  }, [visible, uid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editProduct.name);
    formData.append("price", editProduct.price);
    formData.append("_method", "put");
    try {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/products/${uid}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            text: "Updated Successfully",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        });
    } catch (err) {
      if (err.response) {
        Swal.fire({
          text: err.response.data.message,
          icon: "warning",
        });
      } else {
        Swal.fire({ text: err.response.data.message, icon: "error" });
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
      <Offcanvas.Header closeButton>Edit Product</Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>
              Name Product <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editProduct.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              Price <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={editProduct.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="mt-5">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button className="btn btn-secondary ms-3">Cancel</button>
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OverlayEditProduct;
