import React from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import { Card } from "react-bootstrap";

const Documents = () => {
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Documents</h1>
              <nav>
                <ol className="breadcrumb mt-2">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-decoration-none">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Document
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row">
            <Card className="shadow">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">Joko </div>
                  <div className="col-md-8">Prasetio</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Main>
    </body>
  );
};

export default Documents;
