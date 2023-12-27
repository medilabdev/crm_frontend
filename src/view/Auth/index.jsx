import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./style.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  // console.log(process.env.REACT_APP_BACKEND_URL);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  // console.log(login);
  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  console.log(login);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        login,{
          headers:{
            'Content-Type' : 'application/json'
          }
        }
      );
      if (response.data.message !== "Login successful!") {
        Swal.fire({
          title: response.data.message,
          text: "You clicked the button",
          icon: "success",
        });
        const name = response.data.data.name;
        const image = response.data.data.image;
        const uid = response.data.data.uid;
        const role = response.data.data.role_uid;
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("name", name);
        localStorage.setItem("uid", uid);
        localStorage.setItem("image", image);
        localStorage.setItem("role", role)
        navigate("/");
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message,
          icon: "error",
        });
      }
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
    <body className="auth-body">
      <main className="auth-main">
        <Container>
          <section className="section min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <Container>
              <Row className="justify-content-center">
                <Col
                  lg={4}
                  md={6}
                  className="d-flex flex-column align-items-center justify-content-center"
                >
                  <Card className="mb-3 card-login">
                    <Card.Body>
                      <div className="pb-2">
                        <Card.Title>
                          <h3
                            className="text-center pb-0 fw-bold mb-4 "
                            style={{ fontFamily: "revert-layer" }}
                          >
                            CRM
                          </h3>
                          <p className="text-center fw-light small fs-6">
                            Enter your email & password to login
                          </p>
                        </Card.Title>
                        <form
                          className="row g-3 needs-validation"
                          method="post"
                          onSubmit={handleLogin}
                        >
                          <div className=" col-12">
                            <label className="form-label">Email</label>
                            <div className="input-group has-validation shadow-sm">
                              <span
                                className="input-group-text"
                                id="inputGroupPrepend"
                              >
                                @
                              </span>
                              <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="yourUsername"
                                value={login.email}
                                onChange={handleChange}
                                required
                              />
                              <div className="invalid-feedback">
                                Please enter your email.
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <label
                              htmlFor="yourPassword"
                              className="form-label"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              className="form-control mb-2 shadow-sm"
                              id="yourPassword"
                              value={login.password}
                              onChange={handleChange}
                              required
                            />
                            <div className="invalid-feedback">
                              Please enter your password!
                            </div>
                          </div>
                          <div className="col-12">
                            <button
                              className="btn btn-primary w-100 mb-4 shadow"
                              type="submit"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </Container>
      </main>
    </body>
  );
};

export default Auth;
