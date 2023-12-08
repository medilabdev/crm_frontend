import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import Footer from "../../../components/Template/Footer";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";

const BulkChangeCompany = () => {
  const token = localStorage.getItem("token");
  const [bulkCompany, setBulkCompany] = useState([]);
  const [user, setUser] = useState([]);
  const [permission, setPermission] = useState({
    new_owner_user_uid: "",
  });
  const animatedComponents = makeAnimated();

  const getCompanyTransfer = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies?limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBulkCompany(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getAllUser = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const bulkSelect = () => {
    const result = [];
    bulkCompany?.map((data) => {
      const theme = {
        value: data.uid,
        label: data.name,
      };
      result.push(theme);
    });
    return result;
  };
  const ownerPermission = () => {
    const result = [];
    user?.map((data) => {
      const select = {
        value: data.uid,
        label: data.name,
      };
      result.push(select);
    });
    return result;
  };

  const handlePermission = (e) => {
    setPermission({
      ...permission,
      new_owner_user_uid: e.value,
    });
  };
  // console.log(permission);
  useEffect(() => {
    getCompanyTransfer();
    getAllUser();
  }, [token]);

  const [resultBulkCompany, setResultBulkCompany] = useState([]);
  // console.log(resultBulkCompany);
  const handleSelectChange = (selected) => {
    setResultBulkCompany(selected.map((option) => option.value));
  };
  // console.log(resultBulkCompany);
  const handleSubmitBulk = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const uid of resultBulkCompany) {
        formData.append("company_uid[]", uid);
      }
      formData.append("new_owner_user_uid", permission.new_owner_user_uid);
      formData.append("_method", "PUT");
      // ini buat log
      // console.log("FormData Content:");
      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }
      const bulk = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/companies/transfer/owner`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        title: bulk.data.message,
        text: "Successfully bulk change",
        icon: "success",  
      });
    } catch (error) {
      // console.log(error);
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      }
    }
  };
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="pagetitle">
          <h1>Bulk Change Company</h1>
          <nav>
            <ol className="breadcrumb mt-2">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">
                  Dashboard
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="/company" className="text-decoration-none">
                  Company
                </a>
              </li>
              <li className="breadcrumb-item active">Bulk Change</li>
            </ol>
          </nav>
        </div>
        <Card className="shadow">
          <Card.Body className="mt-2">
            <form action="" onSubmit={handleSubmitBulk}>
              <Form.Group className="mb-3 col-9">
                <Form.Label className="fw-bold">Select Companies</Form.Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={bulkSelect()}
                  onChange={(selected) => handleSelectChange(selected)}
                  name="company_uid[]"
                />
              </Form.Group>
              {/* <Form.Group className="mb-3 col-5" md={5}>
                <Form.Label className="fw-bold">Owner</Form.Label>
                <Select
                  options={bulkUserSelect()}
                  value={owner}
                  onChange={handleOwnerChange}
                  name="user"
                />
              </Form.Group> */}
              <Form.Group className="mb-3 col-5" md={5}>
                <Form.Label className="fw-bold">Give Permission to</Form.Label>
                <Select
                  options={ownerPermission()}
                  name="new_owner_user_uid"
                  onChange={handlePermission}
                />
              </Form.Group>
              <div className="mt-4">
                <a href="/company" className="btn btn-secondary me-4">
                  Cancel
                </a>
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </Card.Body>
        </Card>
        <Footer />
      </Main>
    </body>
  );
};

export default BulkChangeCompany;
