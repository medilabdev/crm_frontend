import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Offcanvas, Overlay, Form } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";
const AddPackageProduct = ({ visible, onClose }) => {
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState([]);
  const [inputPackage, setInputPackage] = useState({
    name: "",
    discount_type: "",
    discount: "",
  });
  const animated = makeAnimated();

  const [discountType, setDiscountType] = useState("");

  const getProduct = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/form/select`, {
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

  const [selectProduct, setSelectProduct] = useState([]);
  const handleSelectProduct = (e) => {
    setSelectProduct(e.map((option) => option.value));
  };
  const handleSelect = (e) => {
    setInputPackage({
      ...inputPackage,
      [e.target.name]: e.target.value,
    });
    const { value } = e.target;
    setDiscountType(value);
  };
  // console.log(selectProduct);
  const handleSubmitPackage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const uid of selectProduct) {
      formData.append("product_uid[]", uid);
    }
    formData.append("name", inputPackage.name);
    formData.append("discount_type", inputPackage.discount_type);
    formData.append("discount", inputPackage.discount);

    try {
      axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/packages-product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
        Swal.fire({
          title: res.data.message,
          text: "Successfully Create Package",
          icon: "success"
        }).then((res) => {
          if(res.isConfirmed){
            window.location.reload()
          }
        })
      })
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      } else {
        Swal.fire({
          text: "Something went wrong!",
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
        <Offcanvas.Title>Add Package Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSubmitPackage}>
          <Form.Group className="mb-2">
            <Form.Label>
              Name Package <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleSelect}
              required
            />
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
              onChange={(selected) => handleSelectProduct(selected)}
              name="product_uid[]"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Type Diskon</Form.Label>
            <Form.Select name="discount_type" onChange={handleSelect}>
              <option value="">Select Type</option>
              <option value="nominal">Nominal</option>
              <option value="percent">Percent</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Diskon</Form.Label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {discountType === "nominal" ? "Rp." : "%"}
                </span>
              </div>
              <input
                type="number"
                className="form-control"
                name="discount"
                onChange={handleSelect}
              />
            </div>
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
