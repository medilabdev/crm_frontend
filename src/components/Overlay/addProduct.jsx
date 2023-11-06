import { type } from "@testing-library/user-event/dist/type";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import Select from "react-select";

const AddProductOverlay = ({ visible, onClose, onSaveData }) => {
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState([]);
  const [packageProduct, setPackageProduct] = useState([]);
  const [typeProductOrPackage, setTypeProductOrPackage] = useState({
    type: "",
    discount_type: "",
  });
  const [saveDataProvide, setSaveDataProvide] = useState({
    qty: "",
    discount: "",
    total_price: "",
  });

  const [selectPackage, setSelectPackage] = useState(null);
  const [selectedPackagePrice, setSelectedPackagePrice] = useState(null);
  const [quantityPackage, setQuantityPackage] = useState(0);
  const [discountPercentPackage, setDiscountPercentPackage] = useState(0);
  const [totalPricePackage, setTotalPricePackage] = useState(0);
  const [discountNominalPackage, setDiscountNominalPackage] = useState(0);
  const handlePackageSelect = (e) => {
    setSelectPackage(e.target);
    const selcPackage = packageProduct.find((row) => row.uid === e.value);
    if (selcPackage) {
      setSelectedPackagePrice(selcPackage.total_price);
      setQuantityPackage(1);
      setSaveDataProvide({
        ...saveDataProvide,
        product: selcPackage.uid,
      });
    } else {
      setSelectPriceProduct(0);
    }
  };

  const [selectedProduct, setSelectProduct] = useState(null);
  const [selectedPriceProduct, setSelectPriceProduct] = useState(0);
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [discountPercentProduct, setDiscountPercentProduct] = useState(0);
  const [discountNominalProduct, setDiscountNominalProduct] = useState(0);
  const [totalPriceProduct, setTotalPriceProduct] = useState(0);
  const handleProductSelect = (e) => {
    setSelectProduct(e.target);
    const selcProduct = product.find((row) => row.uid === e.value);
    if (selcProduct) {
      setSelectPriceProduct(selcProduct.price);
      setQuantityProduct(1);
      setSaveDataProvide({
        ...saveDataProvide,
        product: selcProduct.uid,
      });
    } else {
      setSelectPriceProduct(0);
    }
  };
  const handleType = (e) => {
    setTypeProductOrPackage({
      ...typeProductOrPackage,
      [e.target.name]: e.target.value,
    });
    setSaveDataProvide({
      ...saveDataProvide,
      [e.target.name]: e.target.value,
    });
  };

  const getPackageProduct = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/packages-product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPackageProduct(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
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

  const selectPackageProduct = () => {
    const result = [];
    packageProduct?.map((data) => {
      const packageData = {
        value: data.uid,
        label: data.name,
      };
      result.push(packageData);
    });
    return result;
  };

  const selectProduct = () => {
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
    getPackageProduct(token);
    if (typeProductOrPackage.type === "package") {
      const calcuPackage = selectedPackagePrice * quantityPackage;
      if (typeProductOrPackage.discount_type === "percent") {
        const discount = (calcuPackage * discountPercentPackage) / 100;
        const totalPrice = calcuPackage - discount;
        setTotalPricePackage(totalPrice);
      } else {
        const discount = discountNominalPackage;
        const totalPrice = calcuPackage - discount;
        setTotalPricePackage(totalPrice);
      }
    } else {
      const calcuProduct = selectedPriceProduct * quantityProduct;
      if (typeProductOrPackage.discount_type === "percent") {
        const discountPro = (calcuProduct * discountPercentProduct) / 100;
        const totalPrice = calcuProduct - discountPro;
        setTotalPriceProduct(totalPrice);
      } else {
        const discountPro = discountNominalProduct;
        const totalPrice = calcuProduct - discountPro;
        setTotalPriceProduct(totalPrice);
      }
    }
  }, [
    token,
    typeProductOrPackage,
    selectedPackagePrice,
    quantityPackage,
    discountPercentPackage,
    discountNominalPackage,
    selectedPriceProduct,
    quantityProduct,
    discountPercentProduct,
    discountNominalProduct,
  ]);

  // menyimpan data
  const handleSaveProvide = () => {
    if (saveDataProvide) {
      const dataExist = JSON.parse(localStorage.getItem("DataProduct")) || [];
      const id = `data_${Date.now()}`;
      const newData = {
        id: id,
        product_uid: saveDataProvide.product,
        // product_name: saveDataProvide.product,
        qty: quantityPackage ? quantityPackage : quantityProduct,
        discount_type: typeProductOrPackage.discount_type,
        discount:
          discountNominalPackage ||
          discountNominalProduct ||
          discountPercentPackage ||
          discountPercentProduct,
        total_price: totalPricePackage ? totalPricePackage : totalPriceProduct,
      };
      dataExist.push(newData);
      localStorage.setItem("DataProduct", JSON.stringify(dataExist));
      onClose();
    } 
  };

  return (
    <Offcanvas show={visible} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSaveProvide}>
          <Form.Group className="mb-3">
            <Form.Label>Type Product</Form.Label>
            <Form.Select
              id="typeInputProduct"
              name="type"
              onChange={handleType}
            >
              <option value="">Select Type</option>
              <option value="custom">Custom Product</option>
              <option value="package">Package Product</option>
            </Form.Select>
          </Form.Group>
          {typeProductOrPackage.type === "package" ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Select Package Product</Form.Label>
                <Select
                  isDisabled={
                    typeProductOrPackage.type !== "package" ? true : false
                  }
                  options={selectPackageProduct()}
                  onChange={handlePackageSelect}
                  name=""
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Rp.</span>
                  </div>
                  <input
                    type="number"
                    value={selectedPackagePrice}
                    name="discount"
                    className="form-control"
                    onChange={(e) => setSelectedPackagePrice(e.target.value)}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type Discount</Form.Label>
                <Form.Select name="discount_type" onChange={handleType}>
                  <option value="">Select Type</option>
                  <option value="percent">Percent</option>
                  <option value="nominal">Nominal</option>
                </Form.Select>
              </Form.Group>
              <div className="d-flex">
                <div className="col-md-2 me-3">
                  <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="qty"
                      value={quantityPackage}
                      onChange={(e) => setQuantityPackage(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4 me-3">
                  <Form.Group>
                    <Form.Label>Discount</Form.Label>
                    <div className="input-group">
                      {typeProductOrPackage.discount_type === "percent" ? (
                        <>
                          <div className="input-group-prepend">
                            <span className="input-group-text">%</span>
                          </div>
                          <input
                            type="number"
                            name="discount"
                            className="form-control"
                            disabled={
                              typeProductOrPackage.discount_type !== "percent"
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              setDiscountPercentPackage(e.target.value)
                            }
                          />
                        </>
                      ) : (
                        <>
                          <div className="input-group-prepend">
                            <span className="input-group-text">Rp.</span>
                          </div>
                          <input
                            type="number"
                            className="form-control"
                            name="discount"
                            disabled={
                              typeProductOrPackage.discount_type !== "nominal"
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              setDiscountNominalPackage(e.target.value)
                            }
                          />
                        </>
                      )}
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-5 me-1">
                  <Form.Group>
                    <Form.Label>Total Price</Form.Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Rp</span>
                      </div>
                      <input
                        type="number"
                        className="form-control"
                        name="total_price"
                        value={totalPricePackage}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Select Product</Form.Label>
                <Select
                  options={selectProduct()}
                  onChange={handleProductSelect}
                  name="product"
                  isDisabled={
                    typeProductOrPackage.type !== "custom" ? true : false
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Rp.</span>
                  </div>
                  <input
                    type="number"
                    value={selectedPriceProduct}
                    className="form-control"
                    name="price"
                    onChange={(e) => setSelectPriceProduct(e.target.value)}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type Discount</Form.Label>
                <Form.Select name="discount_type" onChange={handleType}>
                  <option value="">Select Type</option>
                  <option value="percent">Percent</option>
                  <option value="nominal">Nominal</option>
                </Form.Select>
              </Form.Group>
              <div className="d-flex">
                <div className="col-md-2 me-3">
                  <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="qty"
                      value={quantityProduct}
                      onChange={(e) => setQuantityProduct(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4 me-3">
                  <Form.Group>
                    <Form.Label>Discount</Form.Label>
                    <div className="input-group">
                      {typeProductOrPackage.discount_type === "percent" ? (
                        <>
                          <div className="input-group-prepend">
                            <span className="input-group-text">%</span>
                          </div>
                          <input
                            type="number"
                            className="form-control"
                            name="discount"
                            disabled={
                              typeProductOrPackage.discount_type !== "percent"
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              setDiscountPercentProduct(e.target.value)
                            }
                          />
                        </>
                      ) : (
                        <>
                          <div className="input-group-prepend">
                            <span className="input-group-text">Rp.</span>
                          </div>
                          <input
                            type="number"
                            disabled={
                              typeProductOrPackage.discount_type !== "nominal"
                                ? true
                                : false
                            }
                            className="form-control"
                            onChange={(e) =>
                              setDiscountNominalProduct(e.target.value)
                            }
                          />
                        </>
                      )}
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-5 me-1">
                  <Form.Group>
                    <Form.Label>Total Price</Form.Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Rp</span>
                      </div>
                      <input
                        type="number"
                        name="total_price"
                        className="form-control"
                        value={totalPriceProduct}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
            </>
          )}

          <div className="mt-3">
            <button className="btn btn-primary" onClick={handleSaveProvide}>
              Save
            </button>
            <a
              className="btn btn-secondary ms-3 text-decoration-none"
              onClick={onClose}
            >
              Cancel
            </a>
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddProductOverlay;
