import React, { useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import BreadcrumbAccounting from "./breadcrumb";
import { useParams } from "react-router-dom";
import { Card, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const Accounting = () => {
  const token = localStorage.getItem("token");
  const { uid } = useParams();
  const [payment, setPayment] = useState([{id: 1}])
  const [expanse, setExpanse] = useState([{id: 1}])
  const addPaymentForm = () => {
    setPayment([...payment, {id: payment.length + 1}])
  }
  const addExpanseForm = () => {
    setExpanse([...expanse, {id: expanse.length + 1}])
  }
// input data
  const [inputPaymentDate, setInputPaymentDate] = useState("")
  const [inputPaymentAmount, setInputPaymentAmount] = useState([])
  const [inputPaymentMethod, setInputPaymentMethod] = useState([])
  const [inputPaymentReff, setInputPaymentReff] = useState([])

//   const handleInputPaymentDate = (e, index) => {
//  \
//   };

const handleInputPaymentAmount = (e, index) => {
  const amountValue = e.target.value;
  setInputPaymentAmount(amountValue);
};

const handleInputPaymentMethod = (e, index) => {
  const methodValue = e.target.value;
  const updatedInputMethod = [...inputPaymentMethod];
  updatedInputMethod[index] = methodValue;
  setInputPaymentMethod(updatedInputMethod);
};

const handleInputPaymentReff = (e, index) => {
  const reffValue = e.target.value;
  const updatedInputReff = [...inputPaymentReff];
  updatedInputReff[index] = reffValue;
  setInputPaymentReff(updatedInputReff);
};

  const removePaymentForm = (index) => {
    const updPay = [...payment];
    updPay.splice(index,1)
    setPayment(updPay)
  }

  const removeExpanseForm = (index) => {
    const upEx = [...expanse];
    upEx.splice(index, 1)
    setExpanse(upEx)
  }

  console.log(inputPaymentAmount);
  console.log(inputPaymentDate);
  console.log(inputPaymentMethod);
  console.log(inputPaymentReff);
  const handleSubmit = () => {
    const formData = new FormData();
    inputPaymentDate.forEach((pay, index) => {
      formData.append(`payment[${index}][date]`, pay)
    });
    inputPaymentAmount.forEach((payAmo, index) => {
      formData.append(`payment[${index}][payment_amount]`, payAmo)
    })
    inputPaymentMethod.forEach((payMeth, index) => {
      formData.append(`payment[${index}][payment_method]`, payMeth)
    })
    inputPaymentReff.forEach((payReff, index) => {
      formData.append(`payment[${index}][references_number]`, payReff)
    })
      for (const pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
   axios.post(`${process.env.REACT_APP_BACKEND_URL}/deals/payment/${uid}`,formData,{
    headers:{
      Authorization: `Bearer ${token}`
    }
   })
      
  }
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
                       <Form.Control type="date" name={`payment[${index}][date]`} onChange={(e) => setInputPaymentDate(e.target.value)} required />
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
                         {/* <Form.Control type="number" name={`payment[${index}][payment_amount]`} onChange={(e) => handleInputPaymentDate(e, index)} required /> */}
                       </InputGroup>
                     </Form.Group>
                     <Form.Group className="mb-3">
                       <Form.Label style={{ fontWeight: 600 }}>
                         Payement Method
                         <span style={{ color: "red" }} className="fs-6">
                           *
                         </span>
                       </Form.Label>
                       <select className="form-select" name={`payment[${index}][payment_method]`} onChange={handleInputPaymentMethod} required>
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
                       <Form.Control type="text" name={`payment[${index}][references_number]`} onChange={handleInputPaymentReff} />
                     </Form.Group>
                     {payment.length > 1 && (
                     <button className="btn btn-danger mb-4" onClick={() => removePaymentForm(index)}>
                      Remove Payment <span style={{ fontStyle:"italic" }}>{index+1}</span>
                    </button> )}
                      </>
                      ))}
                  <button className="btn btn-primary ms-2 mb-4" onClick={addPaymentForm}>Add Payment</button>
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
                    <Form.Control type="date" />
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
                      <Form.Control type="number" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Category
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                    <select className="form-select">
                      <option disabled selected>
                        Select Choose
                      </option>
                      <option value="gas">Gas</option>
                      <option value="entertaiment">Entertaiment</option>
                      <option value="restaurant/dining">
                        Restaurant/Dining
                      </option>
                      <option value="airfare">Airfare</option>
                      <option value="hotel/lodging/accommmodation">
                        Hotel/Lodging/Accommmodation
                      </option>
                      <option value="taxi/parking">Taxi & Parking</option>
                    </select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Reference Number
                    </Form.Label>
                    <Form.Control as="textarea" />
                  </Form.Group>
                  {expanse.length > 1 && (
                  <button className="btn btn-danger mb-4" onClick={() => removeExpanseForm(index)}>
                      Remove Expanse <span style={{ fontStyle:"italic" }}>{index+1}</span>
                    </button> 
                    )}
                  </>
                    ))}
                  <button className="btn btn-primary mb-4 ms-2" onClick={addExpanseForm}>Add Expanse</button>
                </Card.Body>
              </Card>
            </div>
          </div>
          </form>
        </div>
      </Main>
    </body>
  );
};

export default Accounting;
