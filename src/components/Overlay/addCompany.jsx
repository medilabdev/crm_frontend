import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Button,
  Col,
  Offcanvas,
} from "react-bootstrap";
import Swal from "sweetalert2";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { GetDataTypeHospital } from "../../action/TypeHospital";
import { useSelector } from "react-redux";

const OverlayAddCompany = ({ visible, onClose }) => {
  const uid = localStorage.getItem("uid")
  const [ownerUser, setOwnerUser] = useState([]);
  const [sourceContact, setSourceContact] = useState([]);
  const [parentCompany, setParentCompany] = useState([]);
  const [typeCompany, setTypeCompany] = useState([]);
  const [inputCompany, setInputCompany] = useState({
    name: "",
    website_url: "",
    telp_number: [""],
    address: "",
    map_address: "",
    city: "",
    postal_code: "",
    number_of_employee: "",
    number_of_patient: "",
    parent_company_uid: "",
    owner_user_uid: uid,
    company_source_uid: "",
    company_type_uid: "",
  });

  const token = localStorage.getItem("token");
  const dispatch = useDispatch()
  const { DataTypeHospital } = useSelector((state) => state.GetTypeHospital
)
  //menambah telephone
  const addTelephone = () => {
    setInputCompany((prevInputCompany) => ({
      ...prevInputCompany,
      telp_number: [...prevInputCompany.telp_number, ""],
    }));
  };
  // mengubah nomor telephone indeks tertentu
  const handleChangeTelephone = (index, value) => {
    setInputCompany((prevInputCompany) => {
      const newTelpNumbers = [...prevInputCompany.telp_number];
      newTelpNumbers[index] = value;
      return {
        ...prevInputCompany,
        telp_number: newTelpNumbers,
      };
    });
  };
  //menghapus telephone
  const handleDeleteTelephone = (index) => {
    setInputCompany((prevInputCompany) => {
      const newTelpNumbers = [...prevInputCompany.telp_number];
      newTelpNumbers.splice(index, 1);
      return {
        ...prevInputCompany,
        telp_number: newTelpNumbers,
      };
    });
  };
  const getOwnerUser = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOwnerUser(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getSourceContact = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies-source`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSourceContact(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getCompanyParent = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setParentCompany(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getCompanyType = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies-type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTypeCompany(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  // console.log(typeCompany);

  const handleInputChange = (e) => {
    setInputCompany({
      ...inputCompany,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(sourceContact);
  useEffect(() => {
    getOwnerUser(token);
    getSourceContact(token);
    getCompanyParent(token);
    getCompanyType(token);
    dispatch(GetDataTypeHospital(token))
  }, [token]);

  const selectOwner = () => {
    const result = [];
    ownerUser?.map((data) => {
      const daOwn = {
        value: data.uid,
        label: data.name,
      };
      result.push(daOwn);
    });
    return result;
  };

  const selectSource = () => {
    const result = [];
    sourceContact?.map((data) => {
      const souCont = {
        value: data.uid,
        label: data.name,
      };
      result.push(souCont);
    });
    return result;
  };

  const TypeCompany = () => {
    const result = [];
    if (Array?.isArray(DataTypeHospital)) {
      DataTypeHospital?.map((data) => {
        const finalResult = {
          label: data.name,
          value: data.uid,
        };
        result.push(finalResult);
      });
    } else {
      console.error("listResult is not an array or is not yet initialized.");
    }
    return result;
  }
  

  const selectType = () => {
    const result = [];
    typeCompany?.map((data) => {
      const tyComp = {
        value: data.uid,
        label: data.name,
      };
      result.push(tyComp);
    });
    return result;
  };

  const selectCompany = () => {
    const result = [];
    parentCompany?.map((data) => {
      const parco = {
        value: data.uid,
        label: data.name,
      };
      result.push(parco);
    });
    return result;
  };

  const handleInputOwner = (e) => {
    setInputCompany({
      ...inputCompany,
      owner_user_uid: e.value,
    });
  };
  const handleInputSource = (e) => {
    setInputCompany({
      ...inputCompany,
      company_source_uid: e.value,
    });
  };
  const handleInputTypeHospital = (e) => {
    setInputCompany({
      ...inputCompany,
      hospital_type_uid: e.value,
    });
  };
  const handleTypeComp = (e) => {
    setInputCompany({
      ...inputCompany,
      company_type_uid: e.value,
    });
  };
  const handleParentComp = (e) => {
    setInputCompany({
      ...inputCompany,
      parent_company_uid: e.value,
    });
  };
  // console.log(telephone);
  const handleSubmitCompany = async (e) => {
    e.preventDefault();

    try {
      const addCompany = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/companies`,
        inputCompany,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: addCompany.data.message,
        text: "Successfully add company",
        icon: "success",
      });
      window.location.reload();
    } catch (err) {
      if (err.response) {
        Swal.fire({
          text: err.response.data.message,
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
        <Offcanvas.Title>Add Company</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form action="" onSubmit={handleSubmitCompany}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Company Name <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Company Website</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="website_url"
              onChange={handleInputChange}
            />
          </Form.Group>
          {process.env.REACT_APP_BACKEND_URL === "https://api-crm-iss.medilabjakarta.id/api" ?  
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Type Hospital <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Select
              options={TypeCompany()}
              onChange={(e) => handleInputTypeHospital(e)}
            />
          </Form.Group>
          : ''}
          <Form.Group>
            <Form.Label>
              Telephone <span className="text-danger fs-5">*</span>
            </Form.Label>

            {inputCompany.telp_number.map((telephone, index) => (
              <div key={index}>
                <Form.Control
                  type="number"
                  name={`telp_number[${index}]`}
                  placeholder="Telephone"
                  value={inputCompany.telp_number[index]}
                  onChange={(e) => handleChangeTelephone(index, e.target.value)}
                  required
                  className="mb-2"
                />
                {index > 0 && (
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteTelephone(index)}
                    style={{ fontSize: "0.65rem" }}
                    className="mb-2"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="primary"
              onClick={addTelephone}
              style={{ fontSize: "0.65rem" }}
              className="mb-2"
            >
              Add Telephone
            </Button>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address(Google Map)</Form.Label>
            <Form.Control
              type="text"
              name="map_address"
              value={inputCompany.map_address}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Address <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={inputCompany.address}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
            <Col sm="8" md="8">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={inputCompany.city}
                onChange={handleInputChange}
              />
            </Col>
            <Col sm="4" md="4">
              <Form.Control
                type="number"
                name="postal_code"
                value={inputCompany.postal_code}
                onChange={handleInputChange}
                placeholder="zip"
                style={{ marginTop: "23px" }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Type <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Select
              options={selectType()}
              onChange={(e) => handleTypeComp(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Number of Employees</Form.Label>
            <Form.Control
              type="number"
              name="number_of_employee"
              value={inputCompany.number_of_employee}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Source <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Select
              options={selectSource()}
              onChange={(e) => handleInputSource(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Number of Patiens</Form.Label>
            <Form.Control
              type="text"
              name="number_of_patient"
              onChange={handleInputChange}
              value={inputCompany.number_of_patient}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Parent Company</Form.Label>
            <Select options={selectCompany()} onChange={handleParentComp} />
          </Form.Group>
          <button
            className="btn btn-primary mb-4 ms-3"
            onClick={handleSubmitCompany}
          >
            Add Company
          </button>
          <button className="btn btn-secondary mb-4 ms-2" onClick={onClose}>
            Cancel
          </button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OverlayAddCompany;
