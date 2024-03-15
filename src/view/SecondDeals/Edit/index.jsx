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

const EditDataSecondDeals = () => {
  const token = localStorage.getItem("token");

  const [ShowFQP, setShowFQP] = useState(false);
  const [ShowLPP, setShowLPP] = useState(false);
  const handleShowFQP = () => {
    setShowFQP(!ShowFQP);
  };

  const handleShowLPP = () => {
    setShowLPP(!ShowLPP);
  };
  console.log(ShowFQP);
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
          />
          <div className="row mt-3">
            <div className="col-12 mb-2">
              <Card>
                <Card.Header>
                  <a
                    href="/deals-second"
                    className="btn btn-primary mt-2 mb-2"
                    style={{ fontWeight: "600" }}
                  >
                    <FontAwesomeIcon
                      icon={faCircleArrowLeft}
                      className="fs-6 me-2"
                    />
                    Back
                  </a>
                </Card.Header>
                <Card.Body>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder=""
                      required
                    />
                    <label htmlFor="">Deals Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      className="form-control"
                      required
                    />
                    <label htmlFor="">Deals Size</label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="mb-1">
                      Select Owner
                    </label>
                    <select name="" id="" className="form-select">
                      <option value="">Select Choose</option>
                      <option value="">Joko</option>
                      <option value="">Hosea</option>
                    </select>
                  </div>
                </Card.Body>
              </Card>
            </div>
            {ShowFQP ? <FQP /> : ""}
            {ShowLPP ? <LPP /> : ""}
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

            {/* <div className="col-md-6">
            <Card className="shadow-sm">
            <Card.Header>

            </Card.Header>
            <Card.Footer></Card.Footer>
          </Card>
            </div>
            <div className="col-md-6">
            <Card className="shadow-sm">
            <Card.Header>

            </Card.Header>
            <Card.Footer></Card.Footer>
          </Card>
            </div> */}
          </div>
        </div>
      </Main>
    </body>
  );
};

export default EditDataSecondDeals;
