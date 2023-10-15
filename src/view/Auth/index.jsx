import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./style.css";

const Auth = () => {
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
                          <h3 className="text-center pb-0 fw-bold mb-4 " style={{fontFamily:'revert-layer'}}>CRM</h3>
                          <p className="text-center fw-light small fs-6">
                            Enter your email & password to login
                          </p>
                        </Card.Title>
                        <form
                          className="row g-3 needs-validation"
                          method="post"
                        >
                          <div className="col-12">
                            <label className="form-label">Email</label>
                            <div className="input-group has-validation shadow-sm">
                              <span
                                className="input-group-text"
                                id="inputGroupPrepend"
                              >
                                @
                              </span>
                              <input
                                type="text"
                                name="email"
                                className="form-control"
                                id="yourUsername"
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
