import React, { useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import BreadcrumbAccounting from "./breadcrumb";
import { useParams } from "react-router-dom";
import { Card, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import DataTable from "react-data-table-component";

const Accounting = () => {
  const token = localStorage.getItem("token");
  const { uid } = useParams();
  const [expanseCategory, setExpanseCategory] = useState([]);
  const [payment, setPayment] = useState([{ id: 1 }]);
  const [expanse, setExpanse] = useState([{ id: 1 }]);
  const [dataPayment, setDataPayment] = useState([]);
  const [dataExpanse, setDataExpanse] = useState([]);
  const addPaymentForm = () => {
    setPayment([...payment, { id: payment.length + 1 }]);
  };
  const addExpanseForm = () => {
    setExpanse([...expanse, { id: expanse.length + 1 }]);
  };

  // state payment
  const [inputPaymentDate, setInputPaymentDate] = useState([]);
  const [inputPaymentAmount, setInputPaymentAmount] = useState([]);
  const [inputPaymentMethod, setInputPaymentMethod] = useState([]);
  const [inputPaymentReff, setInputPaymentReff] = useState([]);

  // state expanse
  const [inputExpanseDate, setInputExpanseDate] = useState([]);
  const [inputExpanseAmount, setInputExpanseAmount] = useState([]);
  const [inputExpanseCat, setInputExpanseCat] = useState([]);
  const [inputExpanseReff, setInputExpanseReff] = useState([]);

  const handleInputExpanseReff = (e, index) => {
    const { name, value } = e.target;
    const newReff = [...inputExpanseReff];
    newReff[index] = { ...newReff[index], [name]: value };
    setInputExpanseReff(newReff);
  };

  const handleInputExpanseCat = (e, index) => {
    const catValue = e.target.value;
    const newData = [...inputExpanseCat];
    newData[index] = catValue;
    setInputExpanseCat(newData);
  };

  const handleInputExpanseDate = (e, index) => {
    const res = e.target.value;
    setInputExpanseDate((date) => {
      const dates = [...date];
      dates[index] = res;
      return dates;
    });
  };

  const handleInputExpanseAmount = (e, index) => {
    const { name, value } = e.target;
    const expAmo = [...inputExpanseAmount];
    expAmo[index] = { ...expAmo[index], [name]: value };
    setInputExpanseAmount(expAmo);
  };
  const handleInputPaymentDate = (e, index) => {
    const dateValue = e.target.value;
    setInputPaymentDate((prevDates) => {
      const newDates = [...prevDates];
      newDates[index] = dateValue;
      return newDates;
    });
  };

  const handleInputPaymentAmount = (e, index) => {
    const { name, value } = e.target;
    const newData = [...inputPaymentAmount];
    newData[index] = { ...newData[index], [name]: value };
    setInputPaymentAmount(newData);
  };

  const handleInputPaymentMethod = (e, index) => {
    const methodValue = e.target.value;
    const newData = [...inputPaymentMethod];
    newData[index] = methodValue;
    setInputPaymentMethod(newData);
  };

  const handleInputPaymentReff = (e, index) => {
    const { name, value } = e.target;
    const newReff = [...inputPaymentReff];
    newReff[index] = { ...newReff[index], [name]: value };
    setInputPaymentReff(newReff);
  };

  // remove payment
  const removePaymentForm = (index) => {
    const updPay = [...payment];
    const upInputPay = [...inputPaymentAmount];
    const upInputMet = [...inputPaymentMethod];
    const upInputRef = [...inputPaymentReff];
    const upInputDate = [...inputPaymentDate];

    updPay.splice(index, 1);
    upInputPay.splice(index, 1);
    upInputMet.splice(index, 1);
    upInputRef.splice(index, 1);
    upInputDate.splice(index, 1);

    setInputPaymentDate(upInputDate);
    setInputPaymentMethod(upInputMet);
    setInputPaymentAmount(upInputPay);
    setInputPaymentReff(upInputRef);
    setPayment(updPay);
  };

  // remove expanse
  const removeExpanseForm = (index) => {
    const upEx = [...expanse];
    const upExDate = [...inputExpanseDate];
    const upExAmo = [...inputExpanseAmount];
    const upExCat = [...inputExpanseCat];
    const upExRef = [...inputExpanseReff];

    upExRef.splice(index, 1);
    upExCat.splice(index, 1);
    upExAmo.splice(index, 1);
    upEx.splice(index, 1);
    upExDate.splice(index, 1);

    setInputExpanseReff(upExRef);
    setInputExpanseCat(upExCat);
    setInputExpanseAmount(upExDate);
    setInputExpanseDate(upExDate);
    setExpanse(upEx);
  };

  const getExpCat = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/expense-categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setExpanseCategory(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getDataPayment = (token, uid) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/payments/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDataPayment(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getDataExpanse = (token, uid) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/expenses/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDataExpanse(res.data.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  useEffect(() => {
    getExpCat(token);
    getDataPayment(token, uid);
    getDataExpanse(token, uid);
   
  }, [token, uid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    inputPaymentDate.forEach((date, index) => {
      formData.append(`payment[${index}][date]`, date || "");
    });
    inputPaymentAmount.forEach((amount, index) => {
      formData.append(
        `payment[${index}][payment_amount]`,
        amount.payment || ""
      );
    });
    inputPaymentMethod.forEach((method, index) => {
      formData.append(`payment[${index}][payment_method]`, method || "");
    });
    inputPaymentReff.forEach((payReff, index) => {
      formData.append(
        `payment[${index}][references_number]`,
        payReff.reff_number || ""
      );
    });
    inputExpanseDate.forEach((dateEx, index) => {
      formData.append(`expense[${index}][date]`, dateEx || "");
    });
    inputExpanseAmount.forEach((amEx, index) => {
      formData.append(`expense[${index}][expense_amount]`, amEx.expAmo || "");
    });
    inputExpanseCat.forEach((exCat, index) => {
      formData.append(`expense[${index}][expense_category]`, exCat || "");
    });
    inputExpanseReff.forEach((exRef, index) => {
      formData.append(`expense[${index}][description]`, exRef.reff_exp || "");
    });
    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/deals/payment/${uid}`,
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
          text: "Successfully create accounting",
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: err.response.data.message,
          icon: "warning",
        });
      });
  };

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#427D9D",
        color: "white",
        marginTop: "12px",
        borderRadius: "5px",
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

  const handleDeletePayment = (PaymentUid) => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah kamu yakin ingin menghapus ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(
            `${process.env.REACT_APP_BACKEND_URL}/payments/delete/${PaymentUid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            Swal.fire({
              title: res.data.message,
              text: "Successfully delete item source",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            });
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data.message === "Delete failed!") {
              Swal.fire({
                title: "Delete Failed",
                text: "Tidak dapat menghapus, data master ini terkait dengan data lainnya",
                icon: "warning",
              });
            }
          });
      }
    });
  };
  const handleDeleteExpense = (ExpanseUid) => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah kamu yakin ingin menghapus ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(
            `${process.env.REACT_APP_BACKEND_URL}/expenses/delete/${ExpanseUid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            Swal.fire({
              title: res.data.message,
              text: "Successfully delete item source",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            });
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data.message === "Delete failed!") {
              Swal.fire({
                title: "Delete Failed",
                text: "Tidak dapat menghapus, data master ini terkait dengan data lainnya",
                icon: "warning",
              });
            }
          });
      }
    });
  };
  const colPayment = [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Payment Amount",
      selector: (row) =>
        `Rp. ${new Intl.NumberFormat().format(row.payment_amount)}`,
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: (row) =>
        `${row.payment_method
          .charAt(0)
          .toUpperCase()}${row.payment_method.slice(1)}`,
    },
    {
      name: "Refference Number",
      selector: (row) => row.references_number ?? "-",
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            title="delete"
            className="icon-button"
            onClick={() => handleDeletePayment(row.uid)}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      ),
    },
  ];
  const colExpanse = [
    {
      name: "Date",
      selector: (row) => row.date || "-",
      sortable: true,
    },
    {
      name: "Expenses Amount",
      selector: (row) =>
        `Rp. ${new Intl.NumberFormat().format(row.expense_amount)}`,
      sortable: true,
    },
    {
      name: "Expenses Category",
      selector: (row) => row?.category?.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => (row.description ? row.description : "-"),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            title="delete"
            className="icon-button"
            onClick={() => handleDeleteExpense(row.uid)}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      ),
    },
  ];
 
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <BreadcrumbAccounting />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <div className="float-end mt-2 mb-2">
                  <button type="submit" className="btn btn-primary me-2">
                    Save Changes
                  </button>
                  <a
                    href="/deals"
                    className="btn btn-secondary text-decoration-none"
                  >
                    Cancel
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                  <Card className="shadow">
                    <Card.Header>
                      <h5 className="fw-bold mt-2">Payments</h5>
                    </Card.Header>
                    <Card.Body>
                      {payment.map((pay, index) => (
                        <>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 600 }}>
                              Date
                              <span style={{ color: "red" }} className="fs-6">
                                *
                              </span>
                            </Form.Label>
                            <Form.Control
                              type="date"
                              onChange={(e) => handleInputPaymentDate(e, index)}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 600 }}>
                              Payment Amount
                              <span style={{ color: "red" }} className="fs-6">
                                *
                              </span>
                            </Form.Label>
                            <InputGroup>
                              <InputGroup.Text>Rp.</InputGroup.Text>
                              <Form.Control
                                type="number"
                                name="payment"
                                onChange={(e) =>
                                  handleInputPaymentAmount(e, index)
                                }
                              />
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 600 }}>
                              Payement Method
                              <span style={{ color: "red" }} className="fs-6">
                                *
                              </span>
                            </Form.Label>
                            <select
                              className="form-select"
                              onChange={(e) =>
                                handleInputPaymentMethod(e, index)
                              }
                            >
                              <option disabled selected>
                                Select Choose
                              </option>
                              <option value="cash">Cash</option>
                              <option value="cheque">Cheque</option>
                              <option value="credit_card">Credit Card</option>
                              <option value="debit_card">Debit Card</option>
                              <option value="transfer">Transfer</option>
                            </select>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 600 }}>
                              Reference Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="reff_number"
                              onChange={(e) => handleInputPaymentReff(e, index)}
                            />
                          </Form.Group>
                          {payment.length > 1 && (
                            <button
                              className="btn btn-danger mb-4"
                              onClick={() => removePaymentForm(index)}
                            >
                              Remove Payment{" "}
                              <span style={{ fontStyle: "italic" }}>
                                {index + 1}
                              </span>
                            </button>
                          )}
                        </>
                      ))}
                      <button
                        className="btn btn-primary ms-2 mb-4"
                        onClick={addPaymentForm}
                      >
                        Add Payment
                      </button>
                    </Card.Body>
                  </Card>
              </div>
              <div className="col-md-6">
                <Card className="shadow">
                  <Card.Header>
                    <h5 className="fw-bold mt-2">Expenses</h5>
                  </Card.Header>
                  <Card.Body>
                    {expanse.map((ex, index) => (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 600 }}>
                            Date
                            <span style={{ color: "red" }} className="fs-6">
                              *
                            </span>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            onChange={(e) => handleInputExpanseDate(e, index)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 600 }}>
                            Expense Amount
                            <span style={{ color: "red" }} className="fs-6">
                              *
                            </span>
                          </Form.Label>
                          <InputGroup>
                            <InputGroup.Text>Rp.</InputGroup.Text>
                            <Form.Control
                              type="number"
                              name="expAmo"
                              onChange={(e) =>
                                handleInputExpanseAmount(e, index)
                              }
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 600 }}>
                            Category
                            <span style={{ color: "red" }} className="fs-6">
                              *
                            </span>
                          </Form.Label>
                          <select
                            className="form-select"
                            onChange={(e) => handleInputExpanseCat(e, index)}
                          >
                            <option disabled selected>
                              Select Choose
                            </option>
                            {expanseCategory.map((data) => (
                              <option value={data.uid}>{data.name}</option>
                            ))}
                          </select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 600 }}>
                            Description
                            <span style={{ color: "red" }} className="fs-6">
                              *
                            </span>
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            name="reff_exp"
                            onChange={(e) => handleInputExpanseReff(e, index)}
                          />
                        </Form.Group>
                        {expanse.length > 1 && (
                          <button
                            className="btn btn-danger mb-4"
                            onClick={() => removeExpanseForm(index)}
                          >
                            Remove Expanse{" "}
                            <span style={{ fontStyle: "italic" }}>
                              {index + 1}
                            </span>
                          </button>
                        )}
                      </>
                    ))}
                    <button
                      className="btn btn-primary mb-4 ms-2"
                      onClick={addExpanseForm}
                    >
                      Add Expanse
                    </button>
                  </Card.Body>
                </Card>
              </div>
              {dataPayment.length > 0 ? (
                <div className="col-md-12">
                  <Card className="shadow">
                    <Card.Header className="p-3">
                      <h6 className="fw-bold mt-2">Payment</h6>
                    </Card.Header>
                    <Card.Body>
                      <DataTable
                        data={dataPayment}
                        columns={colPayment}
                        customStyles={customStyles}
                      />
                    </Card.Body>
                  </Card>
                </div>
              ) : null}
              {dataExpanse.length > 0 ? (
                <div className="col-md-12">
                  <Card className="shadow">
                    <Card.Header>
                      <h6 className="fw-bold mt-2">Expenses</h6>
                    </Card.Header>
                    <Card.Body>
                      <DataTable
                        data={dataExpanse}
                        columns={colExpanse}
                        customStyles={customStyles}
                      />
                    </Card.Body>
                  </Card>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </Main>
    </body>
  );
};

export default Accounting;
