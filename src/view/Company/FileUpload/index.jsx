import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";

const FileUploadCompany = () => {
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Upload Multiple Companies</h1>
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
                    <li className="breadcrumb-item active">Upload File</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </body>
  );
};

export default FileUploadCompany;
