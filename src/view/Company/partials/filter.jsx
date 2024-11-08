import React from 'react'
import Select from "react-select";

const FilterCompany = ([ filterClass, handleSubmitSearch, handleCompanyMyOrPerson, dataUser, setResultOwner, selectContact, setAssContact, selectAssDeals, setAssDeals, handleSelectSearchCompany, typeCompany, setResultTypeCompany, dataSource, setResultCompanySource ]) => {
  return (
    <div className={`${filterClass}`} id="filter">
    <div className="container">
      <div className="row mt-4">
        <div className="col">
          <h6>
            <i className="bi bi-funnel ml"></i>
            <span className="fw-semibold ms-2 fs-6 ">Filter</span>
          </h6>
        </div>
        <form onSubmit={handleSubmitSearch}>
          <div className="col mt-3">
            <select
              name="select"
              className="form-select"
              style={{ fontSize: "0.85rem" }}
              onChange={handleCompanyMyOrPerson}
            >
              <option value="all">All Company</option>
              <option value="my">My Company</option>
            </select>
          </div>
          <div className="col mt-2">
            <Select
              placeholder="Select Owner"
              options={dataUser}
              onChange={(e) => setResultOwner(e)}
            />
          </div>
          {/* <div className="col mt-2">
            <select
              name=""
              id=""
              className="form-select"
              style={{ fontSize: "0.85rem" }}
            >
              <option disabled selected>
                Team
              </option>
              <option value="">1</option>
              <option value="">2</option>
            </select>
          </div> */}
          <div className="col mt-5">
            <h6>
              <i className="bi bi-link-45deg"></i>
              <span className="fw-semibold ms-2 fs-6">
                Associated
              </span>
            </h6>
          </div>
          <div className="col mt-3">
            <Select
              placeholder="Select Contact"
              options={selectContact}
              onChange={(e) => setAssContact(e)}
              closeMenuOnSelect={false}
            />
          </div>
          <div className="col mt-3">
            <Select
              options={selectAssDeals}
              closeMenuOnSelect={false}
              onChange={(e) => setAssDeals(e)}
              placeholder="Select Deals..."
              className="mb-2"
            />
          </div>
          <div className="col mt-5">
            <h6>
              <i className="bi bi-building"></i>
              <span className="fw-semibold ms-2 fs-6">
                Company
              </span>
            </h6>
          </div>
          <div className="col mt-3">
            <div className="mb-1">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Company Name"
                onChange={handleSelectSearchCompany}
                style={{ fontSize: "0.85rem" }}
              />
            </div>
            <div className="mb-1">
              <input
                type="text"
                name="website_url"
                onChange={handleSelectSearchCompany}
                className="form-control"
                placeholder="Company Website"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
            <div className="mb-1">
              <input
                type="text"
                name="address"
                onChange={handleSelectSearchCompany}
                className="form-control"
                placeholder="Address"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
            {/* <div className="mb-1">
              <input
                type="text"
                name="city"
                onChange={handleSelectSearchCompany}
                className="form-control"
                placeholder="City"
                style={{ fontSize: "0.85rem" }}
              />
            </div> */}
            <div className="mb-1">
              <Select
                placeholder="Type Company"
                options={typeCompany}
                name="company_type_uid"
                onChange={(e) => setResultTypeCompany(e)}
              />
            </div>
            <div className="mb-1">
              <Select
                placeholder="Source Company"
                closeMenuOnSelect={false}
                options={dataSource}
                onChange={(e) => setResultCompanySource(e)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="date">Created</label>
              <input
                type="date"
                name="created_at"
                onChange={handleSelectSearchCompany}
                className="form-control"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmitSearch}
            className="btn btn-primary mt-2"
            style={{ fontSize: "0.85rem" }}
          >
            Apply
          </button>
          <a
            href="/company"
            className="btn btn-secondary mt-2 ms-2 text-decoration-none"
            style={{ fontSize: "0.85rem" }}
          >
            Cancel
          </a>
        </form>
      </div>
    </div>
  </div>
  )
}

export default FilterCompany