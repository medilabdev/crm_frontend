import React from "react";

const TopButton = () => {
  return (
    <div className="row">
      <div className="col mt-2">
        <div className="d-flex">
          <a
            href="/deals-second"
            className="btn btn-secondary"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopButton;
