import React from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import Breadcrumbsindex from "./Breadcrumbsindex";

const Task = () => {
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <Breadcrumbsindex />
            </div>
          </div>
          <div className="row"></div>
        </div>
      </Main>
    </body>
  );
};

export default Task;
