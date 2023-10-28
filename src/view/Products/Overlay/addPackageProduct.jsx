import axios from "axios";
import React, { useEffect, useState } from "react";
import { Offcanvas, Overlay, Form } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const AddPackageProduct = ({ visible, onClose }) => {
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState([]);
  const animated = makeAnimated();
  const getProduct = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProduct(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const productSelect = () => {
    const result = [];
    product?.map((data) => {
      const dataProduct = {
        value: data.uid,
        label: data.name,
      };
      result.push(dataProduct);
    });
    return result;
  };
  useEffect(() => {
    getProduct(token);
  }, [token]);
  return (
    <Offcanvas
      show={visible}
      onHide={onClose}
      placement="end"
      className="offcanvas-content"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Package Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form action="">
          <Form.Group className="mb-2">
            <Form.Label>
              Name Package <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control type="text" name="name" required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              Select Product <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Select
              closeMenuOnSelect={false}
              components={animated}
              isMulti
              options={productSelect()}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Type Diskon</Form.Label>
            <Form.Select>
              <option value="">Select Type</option>
              <option value="nominal">Nominal</option>
              <option value="percent">Percent</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Diskon</Form.Label>
            <Form.Control type="text" name="name" />
          </Form.Group>
          <div className="mt-3">
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

export default AddPackageProduct;
