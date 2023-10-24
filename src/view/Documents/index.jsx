import React from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";

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
                    <a href="/" className="text-decoration-none"></a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </Main>
    </body>
  );
};

export default Documents;
