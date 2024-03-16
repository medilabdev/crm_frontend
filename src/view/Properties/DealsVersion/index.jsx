import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import BreadcrumbDealsVersion from "./breadcrumb";
import SidebarProperties from "../partials";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { columnsDataTable } from "./columnsDataTable";

const DealsVersion = () => {
  const DataVersion = [
    {
      name: "Deals Medilab",
    },
    {
      name: "Deals IMI Mandiri",
    },
  ];
  const customStyle = {
    headRow: {
      style: {
        background: "rgba(66, 125, 157, 0.9)",
        color: "white",
        fontWeight: "600",
        marginTop: "12px",
        borderRadius: "5px",
      },
    },
    cells: {
      style: {
        fontWeight: "500",
      },
    },
  };
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <BreadcrumbDealsVersion />
        <div className="row">
          <Card className="shadow">
            <div className="container">
              <div className="row">
                <SidebarProperties />
                <div className="col">
                  <button className="btn btn-primary mt-5 ms-4 fw-semibold rounded-3">
                    Add Deals Version
                  </button>
                  <div className="col p-2">
                    <DataTable
                      className="mt-2"
                      data={DataVersion}
                      columns={columnsDataTable}
                      customStyles={customStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Main>
    </body>
  );
};

export default DealsVersion;
