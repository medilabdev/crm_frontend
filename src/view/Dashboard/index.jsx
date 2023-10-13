import React from "react";
import Sidebar from "../../components/Template/Sidebar";
import Topbar from "../../components/Template/Topbar";
import Main from "../../components/Template/Main";

function Dashboard() {
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb mt-2">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
      </Main>
    </body>
  );
}

export default Dashboard;
