import React, { useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import BreadcrumbEdit from "./breadcrumb";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TopButton from "./TopButton";
import FQP from "./FQP";
import LPP from "./LPP";
import FDC from "./FDC";

const EditDataSecondDeals = () => {
  const token = localStorage.getItem("token");

  const [ShowFQP, setShowFQP] = useState(false);
  const [ShowLPP, setShowLPP] = useState(false);
  const [ShowFDC, setShowFDC] = useState(false);
  const handleShowFQP = () => {
    setShowFQP(!ShowFQP);
  };

  const handleShowLPP = () => {
    setShowLPP(!ShowLPP);
  };

  const handleShowFDC = () => {
    setShowFDC(!ShowFDC);
  };
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <BreadcrumbEdit />
          <TopButton
            handleShowFQP={handleShowFQP}
            ShowFQP={ShowFQP}
            handleShowLPP={handleShowLPP}
            ShowLPP={ShowLPP}
            handleShowFDC={handleShowFDC}
            ShowFDC={ShowFDC}
          />
          <div className="row mt-3">
            {ShowFQP ? <FQP /> : ""}
            {ShowLPP ? <LPP /> : ""}
            {ShowFDC ? <FDC /> : ""}
            <div className="col">
              <div className="float-end">
                <button type="submit" className="btn btn-primary me-2">
                  Save Changes
                </button>
                <a href="/deals-second" className="btn btn-secondary">
                  Back
                </a>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </body>
  );
};

export default EditDataSecondDeals;
