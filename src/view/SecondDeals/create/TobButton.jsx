import React from "react";

const TobButton = () => {
  return (
    <div className="row">
      <div className="col mt-2">
        <div className="d-flex float-end">
          <a
            href="/deals-second"
            className="btn btn-secondary mb-3"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default TobButton;
