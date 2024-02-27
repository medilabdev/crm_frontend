import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";
const EditPackageProduct = ({ visible, uid, onClose }) => {
  const token = localStorage.getItem("token");
  const [editPackage, setEditPackage] = useState({});
  const [editProduct, setEditProduct] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [selectUid, setSelectUid] = useState(false);

  const selectUidProduct = (e) => {
    const select = e.selectedRows.map((row) => row.uid);
    setSelectUid(select);
  };

  const animated = makeAnimated();
  const handleDeleteSelected = async (e) => {
    e.preventDefault();
    const isResult = await Swal.fire({
      title: "Apakah anda yakin",
      text: "anda yakin untuk menghapusnya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });
    if (isResult.isConfirmed) {
      try {
        const formData = new FormData();
        for (const uidP of selectUid) {
          formData.append("package_item_uid[]", uidP);
        }
        formData.append("package_uid", uid);
        formData.append("_method", "delete");
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/packages-product/package/item/delete`,
            formData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            Swal.fire({
              title: res.data.message,
              text: "Successfully delete product",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            });
          });
      } catch (error) {
        if (error.response.data.message === "Unauthenticated.") {
          Swal.fire({
            title: error.response.data.message,
            text: "Tolong Login Kembali",
            icon: "warning",
          });
          localStorage.clear();
          window.location.href = "/login";
        }
        if (error.message) {
          Swal.fire({
            text: error.response.data.message,
            icon: "warning",
          });
        }
      }
    }
  };
  const getDetailPackage = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/packages-product/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const packageData = res.data.data;
        const productPackage = packageData?.package_detail_with_product?.map(
          (data) => data
        );

        setEditPackage({
          name: packageData.name,
          discount: packageData.discount,
          discount_type: packageData.discount_type,
        });
        setEditProduct(productPackage ? productPackage : []);
      });
  };

  const getProduct = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDataProduct(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const selectProduct = () => {
    const result = [];
    dataProduct?.map((data) => {
      const isProduct = editProduct.some(
        (product) => product?.product?.uid === data.uid
      );
      if (!isProduct) {
        const theme = {
          value: data.uid,
          label: data.name,
        };
        result.push(theme);
      }
    });
    return result;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPackage({
      ...editPackage,
      [name]: value,
    });
  };

  const [selectedProduct, setSelectProduct] = useState([]);
  // console.log(selectedProduct);
  const handleProdutct = (e) => {
    setSelectProduct(e.map((opt) => opt.value));
  };
  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const product of selectedProduct) {
      formData.append("product_item_uid[]", product);
    }
    formData.append("package_product_uid", uid);
    try {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/packages-product/add/item`,
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
            text: "Successfully add item product",
            icon: "success",
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.reload();
            }
          });
        });
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
  const updateSubmitPackage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editPackage.name);
    formData.append("discount_type", editPackage.discount_type);
    formData.append("discount", editPackage.discount);
    formData.append("_method", "put");
    try {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/packages-product/${uid}`,
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
            text: "Successfully Create Package",
            icon: "success",
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.reload();
            }
          });
        });
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      }
    }
  };
  useEffect(() => {
    if (visible && uid) {
      getDetailPackage(token);
      getProduct(token);
    }
  }, [token, uid]);

  const columns = [
    {
      id: 1,
      name: "Name Product",
      selector: (row) => <p className="mt-1">{row?.product?.name}</p>,
      sortable: true,
    },
    {
      id: 2,
      name: "Action",
      selector: (row) => (
        <button
          onClick={() => {
            Swal.fire({
              title: "Konfirmasi",
              text: "Apa anda yakin ingin menghapus item product ini?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ya, Hapus!",
              cancelButtonText: "Batal",
            }).then((result) => {
              if (result.isConfirmed) {
                const formData = new FormData();
                formData.append("package_uid", uid);
                formData.append("package_item_uid[]", row.uid);
                formData.append("_method", "delete");
                axios
                  .post(
                    `${process.env.REACT_APP_BACKEND_URL}/packages-product/package/item/delete`,
                    formData,
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  )
                  .then((res) => {
                    Swal.fire({
                      title: res.data.message,
                      text: "Successfully delete item product",
                      icon: "success",
                    }).then((res) => {
                      if (res.isConfirmed) {
                        window.location.reload();
                      }
                    });
                  });
              } else {
                Swal.fire({
                  title: "Cancelled",
                  text: "The item was not deleted.",
                  icon: "error",
                });
              }
            });
          }}
          className="icon-button"
          title="delete"
        >
          <i className="bi bi-trash-fill danger"></i>
        </button>
      ),
    },
  ];
  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "#5272F2",
        color: "white",
      },
    },
    cells: {
      style: {
        fontSize: "4px",
        fontWeight: "600",
        marginTop: "4px",
      },
    },
  };

  const [isAddProduct, setIsAddProduct] = useState(false);
  const toggleSideAdd = () => {
    setIsAddProduct(!isAddProduct);
  };

  const addProduct = isAddProduct ? "row d-block" : "row d-none";
  return (
    <Offcanvas
      show={visible}
      onHide={onClose}
      placement="end"
      classname="offcanvas-content"
      data-bs-popover="static"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Package Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form action="" onSubmit={updateSubmitPackage}>
          <Form.Group className="mb-2">
            <Form.Label>
              Name Package <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              value={editPackage.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Type Diskon</Form.Label>
            <Form.Select
              name="discount_type"
              value={editPackage.discount_type}
              onChange={handleChange}
            >
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
                  {editPackage.discount_type === "nominal" ? "Rp." : "%"}
                </span>
              </div>
              <input
                type="number"
                className="form-control"
                name="discount"
                value={editPackage.discount}
                onChange={handleChange}
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
        <div className="p-2 mt-5">
          <div className="row ">
            <div className="col">
              <button
                className="btn btn-outline-danger float-end mb-2"
                onClick={handleDeleteSelected}
              >
                Delete
              </button>
              <button
                className="btn btn-outline-primary float-end mb-2 me-2"
                onClick={toggleSideAdd}
              >
                Add Product
              </button>
            </div>
          </div>
          <div className={addProduct}>
            <form className="d-flex" onSubmit={handleSubmitProduct}>
              <div className="col-md-9">
                <Form.Group className="mb-2">
                  <Form.Label>Select Product</Form.Label>
                  <Select
                    closeMenuOnSelect={false}
                    components={animated}
                    isMulti
                    options={selectProduct()}
                    onChange={(selected) => handleProdutct(selected)}
                    name="product_uid[]"
                  />
                </Form.Group>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-primary ms-3"
                  type="submit"
                  style={{ marginTop: "27px" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          <DataTable
            data={editProduct}
            columns={columns}
            customStyles={customStyle}
            selectableRows
            onSelectedRowsChange={selectUidProduct}
            className="rounded"
          />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditPackageProduct;
