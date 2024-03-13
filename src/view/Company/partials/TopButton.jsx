import React from "react";

const TopButton = ({ handleSubmitDeleteSelect }) => {
  return (
    <div className="row mb-2">
      <div className="col mb-2">
        <div className="float-end d-flex">
          <div class="dropdown button-flex">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
            >
              Add Company
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="/company/single-company">
                  Single Company
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="/company/upload-file">
                  Upload File
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown donwload">
            <button
              class="btn btn-outline-primary dropdown-toggle ms-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
            >
              Donwload
            </button>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  // onClick={donwloadAll}
                  style={{ cursor: "pointer" }}
                >
                  Donwload Selected
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  // onClick={donwloadAll}
                  style={{ cursor: "pointer" }}
                >
                  Donwload All
                </a>
              </li>
            </ul>
          </div>
          <a
            href="/company/bulkchange"
            class="btn btn-outline-primary ms-2 bulk-change"
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            Bulk Change
          </a>
          <button
            class="btn btn-danger ms-2 delete"
            onClick={handleSubmitDeleteSelect}
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
          >
            Delete
          </button>
        </div>
      </div>
      {/* <div className="col d-flex mb-2">
        <div className="float-end">
            
        </div>
       

      {/* </div> */}
    </div>
  );
};

export default TopButton;
