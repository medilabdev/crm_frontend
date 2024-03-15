import React from "react";

const TopButton = ({ handleShowFQP, ShowFQP, handleShowLPP, ShowLPP }) => {
  return (
    <div className="row">
      <div className="col mt-2">
        <div className="d-flex float-end">
          <button
            className={`btn ${ShowFQP ? "btn-secondary" : "btn-primary"} me-2`}
            onClick={handleShowFQP}
          >
            {ShowFQP ? "Closed" : "Open"} FQP
          </button>
          <button
            className={`btn ${ShowLPP ? "btn-secondary" : "btn-primary"}  me-2`}
            onClick={handleShowLPP}
          >
            {ShowLPP ? "Closed" : "Open"} LPP
          </button>
          <button className="btn btn-primary">Open FDC</button>
        </div>
      </div>
    </div>
  );
};

export default TopButton;
