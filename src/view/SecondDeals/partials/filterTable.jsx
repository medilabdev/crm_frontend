import React from "react";
import Select from "react-select";

const FilterTable = () => {
  return (
    <form onSubmit="">
      <div className="container">
        <div className="row mt-3">
          <div className="col">
            <h6>
              <i class="bi bi-funnel fs-5"></i>
              <span
                className="fw-semibold ms-2 fs-6"
                style={{ fontSize: "0.85rem", fontWeight: "600" }}
              >
                Filter
              </span>
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <select name="select" className="form-select">
              <option value="all">All Deals</option>
              <option value="my">My Deals</option>
            </select>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col mb-2">
            <Select placeholder="Select Owner" />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col mb-2">
            <h6>
              <i className="bi bi-link-45deg fs-5"></i>
              <span className="fw-semibold ms-2 fs-6">Associated</span>
            </h6>
          </div>
          <div className="mb-2">
            <Select placeholder="Select Hospital / Klinik" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <h6>
              <i class="bi bi-currency-dollar"></i>
              <span className="fw-semibold ms-2 fs-6">Deals</span>
            </h6>
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Deals Name"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <Select placeholder="Select Priority" />
          </div>
          <div className="mb-2">
            <label className="mb-2" htmlFor="" style={{ fontWeight: "600" }}>
              Created At
            </label>
            <input type="date" className="form-control" />
          </div>
          <div className="mb-2">
            <label className="mb-2" htmlFor="" style={{ fontWeight: "600" }}>
              Updated At
            </label>
            <input type="date" className="form-control" />
          </div>
          <div className="mt-3">
            <button
              className="btn btn-primary"
              type="button"
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
            >
              Apply
            </button>
            <button
              className="btn btn-secondary ms-3"
              type="button"
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FilterTable;
