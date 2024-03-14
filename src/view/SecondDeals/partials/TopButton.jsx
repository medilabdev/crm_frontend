import React from "react";

const TopButton = () => {
  return (
    <div className="row">
      <div className="col mb-2">
        <div className="d-flex float-end">
          <a
            href="/create-deals"
            className="btn btn-primary"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            Add Deals
          </a>
          <a
            href="/deals-second/need-approval"
            className="btn btn-outline-primary ms-2"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            Need Approval
          </a>
          <button
            className="btn btn-danger ms-2"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopButton;
