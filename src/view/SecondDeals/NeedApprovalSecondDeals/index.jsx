import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import BreadcrumbNeedApproval from "./partials/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Card from "../../../components/Card";
import TopButton from "./partials/TopButton";
import DatatableNeedApproval from "./partials/Datatable";

const NeedApprovalSecondDeals = () => {
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <BreadcrumbNeedApproval />
          <Card className="shadow-sm">
            <TopButton />
            <div className="row">
              <div className="col">
                <div className="float-end">
                  <div
                    className="input-group shadow-sm mt-3 me-3"
                    style={{ width: "25rem" }}
                  >
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        style={{
                          borderEndEndRadius: 0,
                          borderStartEndRadius: 0,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          className="fs-4"
                        />
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Search Input"
                      onKeyDown=""
                      className="form-control"
                      id=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
                <div className="col mt-4">
                    <DatatableNeedApproval />
                </div>
            </div>
          </Card>
        </div>
      </Main>
    </body>
  );
};

export default NeedApprovalSecondDeals;
