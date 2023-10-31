import React from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../Documents/style.css";
const Templates = () => {
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Templates</h1>
              <nav>
                <ol className="breadcrumb mt-2">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none">
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Templates</li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row">
            <Card className="shadow">
              <div className="container">
                <div className="row">
                  <div className="col-md-3 p-2">
                    <div className="d-flex flex-column mt-2 border rounded shadow-lg">
                      <Link
                        to="/documents"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-file-earmark-post fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">Documents</h5>
                        </div>
                      </Link>
                      <Link
                        to="/templates"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group active-side">
                          <i class="bi bi-file-earmark-richtext fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">Templates</h5>
                        </div>
                      </Link>
                      <Link
                        to="/Short-Code"
                        className="text-decoration-none text-black fw-semibold border-bottom documents"
                      >
                        <div className="input-group">
                          <i class="bi bi-file-code fs-4 ms-2"></i>
                          <h5 className="p-1 mt-1">Short Code</h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-9"></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Main>
    </body>
  );
};

export default Templates;
