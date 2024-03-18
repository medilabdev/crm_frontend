import React, { useEffect, useState } from "react";
import "./../Edit/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const TopButton = ({
  handleShowFQP,
  ShowFQP,
  handleShowLPP,
  ShowLPP,
  handleShowFDC,
  ShowFDC,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="row">
      <div className="col mt-2">
        <button className="btn btn-primary">
          Status Deals : <strong>Leads</strong>
        </button>
        <div className="d-flex float-end">
          <button
            className="btn btn-success me-2"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            Approve
          </button>
          <button
            className="btn btn-danger me-2"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            Reject
          </button>
          <a
            id={isVisible ? `floatingButtonFQP` : ""}
            className={`btn ${ShowFQP ? "btn-secondary" : "btn-primary"} me-2`}
            onClick={handleShowFQP}
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
            href="#FQP"
          >
            <FontAwesomeIcon
              icon={ShowFQP ? faEyeSlash : faEye}
              className="me-2"
            />
            {ShowFQP ? "Closed" : "Open"} FQP
          </a>
          <a
            id={isVisible ? `floatingButtonLPP` : ""}
            className={`btn ${ShowLPP ? "btn-secondary" : "btn-primary"}  me-2`}
            onClick={handleShowLPP}
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
            href="#LPP"
          >
            <FontAwesomeIcon
              icon={ShowLPP ? faEyeSlash : faEye}
              className="me-2"
            />
            {ShowLPP ? "Closed" : "Open"} LPP
          </a>
          <a
            id={isVisible ? `floatingButtonFDC` : ""}
            className={`btn ${ShowFDC ? "btn-secondary" : "btn-primary"}  me-2`}
            onClick={handleShowFDC}
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
            href="#FDC"
          >
             <FontAwesomeIcon
              icon={ShowFDC ? faEyeSlash : faEye}
              className="me-2"
            />
             {ShowFDC ? "Closed" : "Open"} FDC
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopButton;
