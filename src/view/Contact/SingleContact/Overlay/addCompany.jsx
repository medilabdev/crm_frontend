import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Button,
  Col,
  FloatingLabel,
  Offcanvas,
} from "react-bootstrap";
import Swal from "sweetalert2";
const OverlayAddCompany = ({ visible, onClose }) => {
  const [ownerUser, setOwnerUser] = useState([]);
  const [sourceContact, setSourceContact] = useState([]);
  const [parentCompany, setParentCompany] = useState([]);
  const [typeCompany, setTypeCompany] = useState([]);
  const [telephone, setTelephone] = useState([""]);
  const [inputCompany, setInputCompany] = useState({
    name: "",
    website_url: "",
    telp_number: [],
    address: "",
    map_address: "",
    city: "",
    postal_code: "",
    number_of_employee: "",
    number_of_patient: "",
    parent_company_uid: "",
    owner_user_uid: "",
    company_source_uid: "",
    company_type_uid: "",
  });

  const token = localStorage.getItem("token");
  //menambah telephone
  const addTelephone = () => {
    setTelephone([...telephone, ""]);
  };
  // mengubah nomor telephone indeks tertentu
  const handleChangeTelephone = (index, value) => {
    const newTelephone = [...telephone];
    newTelephone[index] = value;
    setTelephone(newTelephone);
  };
  //menghapus telephone
  const handleDeleteTelephone = (index) => {
    const newTelephone = [...telephone];
    newTelephone.splice(index, 1);
    setTelephone(newTelephone);
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
  // console.log(inputCompany);
  // console.log(sourceContact);
  useEffect(() => {
    getOwnerUser(token);
    getSourceContact(token);
    getCompanyParent(token);
    getCompanyType(token);
  }, [token]);
  console.log(telephone);
  const handleSubmitCompany = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputCompany.name);
    formData.append("website_url", inputCompany.website_url);
    formData.append("address", inputCompany.address);
    formData.append("map_address", inputCompany.map_address);
    formData.append("city", inputCompany.city);
    formData.append("postal_code", inputCompany.postal_code);
    formData.append("number_of_employee", inputCompany.number_of_employee);
    formData.append("number_of_patient", inputCompany.number_of_patient);
    formData.append("parent_company_uid", inputCompany.parent_company_uid);
    formData.append("company_source_uid", inputCompany.company_source_uid);
    formData.append("company_type_uid", inputCompany.company_type_uid);
    formData.append("owner_user_uid", inputCompany.owner_user_uid);
    formData.append("telp_number[]", telephone);
    try {
      const addCompany = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/companies`,
        formData,
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Owner <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Select
              name="owner_user_uid"
              value={inputCompany.owner_user_uid}
              onChange={handleInputChange}
            >
              <option value="">Select Owner</option>
              {ownerUser.map((user) => (
                <option key={user.uid} value={user.uid}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Telephone</Form.Label>

            {telephone.map((telephone, index) => (
              <div key={index}>
                <FloatingLabel
                  label={`Telephone #${index + 1}`}
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    name={`telp_number[${index}]`}
                    placeholder="@gg"
                    value={telephone}
                    onChange={(e) =>
                      handleChangeTelephone(index, e.target.value)
                    }
                  />
                </FloatingLabel>
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
            <Form.Select
              name="company_type_uid"
              value={inputCompany.company_type_uid}
              onChange={handleInputChange}
            >
              <option value="">Select Choose</option>
              {typeCompany.map((type) => (
                <option key={type.uid} value={type.uid}>
                  {type.name}
                </option>
              ))}
            </Form.Select>
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
            <Form.Select
              name="company_source_uid"
              value={inputCompany.company_source_uid}
              onChange={handleInputChange}
            >
              <option value="">Select Source</option>
              {sourceContact.map((source) => (
                <option key={source.uid} value={source.uid}>
                  {source.name}
                </option>
              ))}
            </Form.Select>
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Deals</Form.Label>
            <Form.Select>
              <option value="">Select Deals</option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Parent Company</Form.Label>
            <Form.Select
              name="parent_company_uid"
              value={inputCompany.parent_company_uid}
              onChange={handleInputChange}
            >
              <option value="">Select Company</option>
              {parentCompany.map((parent) => (
                <option key={parent.uid} value={parent.uid}>
                  {parent.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <button className="btn btn-primary mb-4 ms-3" type="submit">
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
