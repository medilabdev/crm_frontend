import React, { useState } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import Breadcrumb from "./partials/breadcrumb";
import TopButton from "./partials/TopButton";
import Card from "../../components/Card";
import FilterTable from "./partials/filterTable";
import DatatableDealSecond from "./partials/Datatable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faMagnifyingGlass,
  faX,
} from "@fortawesome/free-solid-svg-icons";

const SecondDeals = () => {
  const [SideFilter, SetSideFilter] = useState(false);
  const ToggleSideFilter = () => {
    SetSideFilter(!SideFilter);
  };
  const FilterClass = SideFilter
    ? "col-md-3 d-block border-end"
    : "col-md-0 d-none";
  const DatatableClass = SideFilter ? "col-md-9" : "col-md-12";
  const IconSideFilter = SideFilter ? faX : faFilter;
  return (
    <div id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <Breadcrumb />
          <TopButton />
          <Card className="shadow">
            <div className="row">
              <div id="filter" className={`${FilterClass}`}>
                <FilterTable />
              </div>
              <div className={`${DatatableClass}`}>
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-primary mt-3"
                      onClick={ToggleSideFilter}
                      style={{ fontSize: "0.85rem", fontWeight: "600" }}
                    >
                      <FontAwesomeIcon icon={IconSideFilter} className="fs-6" />
                      {/* <i className={`${IconSideFilter}`}></i> */}
                    </button>
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
                  <div className="mt-3">
                    <DatatableDealSecond />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Main>
    </div>
  );
};

export default SecondDeals;
