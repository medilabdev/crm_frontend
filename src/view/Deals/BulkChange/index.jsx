import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Link } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import Select from "react-select";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

const BulkChangeDeals = () => {
  const token = localStorage.getItem("token");
  const [deals, setDeals] = useState([]);
  const [resultDeals, setResultDeals] = useState([]);
  const [user, setUser] = useState([]);
  const [permission, setPermission] = useState({
    new_owner_user_uid: "",
  });

  const getDeals = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deals/form/select`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDeals(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
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

  const SelectDeals = () => {
    const result = [];
    deals?.map((data) => {
      const dare = {
        value: data.uid,
        label: data.deal_name,
      };
      result.push(dare);
    });
    return result;
  };

  const selectUser = () => {
    const result = [];
    user?.map((data) => {
      const dataUser = {
        value: data.uid,
        label: data.name,
      };
      result.push(dataUser);
    });
    return result;
  };
  const handleSelectDeals = (e) => {
    setResultDeals(e.map((opt) => opt.value));
  };
  const handleNewOwner = (e) => {
    setPermission({
      ...permission,
      new_owner_user_uid: e.value,
    });
  };

  useEffect(() => {
    getDeals(token);
    getAllUser(token);
  }, [token]);

  const handleSubmitBulk = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const uid of resultDeals) {
        formData.append("deals_uid[]", uid);
      }
      formData.append("new_owner_user_uid", permission.new_owner_user_uid);
      formData.append("_method", "put");
      // console.log("FormData Content:");
      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }
      const bulk = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/deals/transfer/owner`,
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
            text: "Successfully bulk change contact",
            icon: "success",
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.href = "/deals";
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
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="pagetitle">
          <h1>Bulk Change Deals</h1>
          <nav>
            <ol className="breadcrumb mt-2">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/deals" className="text-decoration-none">
                  Deals
                </Link>
              </li>
              <li className="breadcrumb-item active">Bulk Change</li>
            </ol>
          </nav>
        </div>
        <Card className="mt-5 shadow">
          <Card.Body>
            <form action="" onSubmit={handleSubmitBulk}>
              <Form.Group className="mb-2 col-9">
                <Form.Label className="fw-bold">Select Deals</Form.Label>
                <Select
                  isMulti
                  options={SelectDeals()}
                  onChange={(e) => handleSelectDeals(e)}
                />
              </Form.Group>
              <Form.Group className="mb-2 col-5" md={5}>
                <Form.Label className="fw-bold">Give Permission to</Form.Label>
                <Select options={selectUser()} onChange={handleNewOwner} />
              </Form.Group>
              <div className="mt-1">
                <a href="/deals" className="btn btn-secondary me-1 shadow">
                  Cancel
                </a>
                <button className="btn btn-primary shadow" type="submit">
                  Save
                </button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Main>
    </body>
  );
};

export default BulkChangeDeals;
