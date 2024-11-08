import React, { useEffect } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { getListOwner } from "../../../action/FormOwner";
import { useSelector } from "react-redux";
// import { getListCompany } from "../../../action/FormCompany";
const FilterTable = ({
  handleDealsType,
  handleSearchMultiple,
  setInputOwner,
  handleSearchMutiple,
  setInputStage,
  stage,
}) => {
  const { listResultOwner} = useSelector(
    (state) => state.SelectOwner
  );
  const selectOwner = () => {
    const result = [];
    if (Array.isArray(listResultOwner)) {
      listResultOwner.forEach((data) => {
        const finalResult = {
          label: `${data.name}`,
          value: data.uid,
        };
        result.push(finalResult);
      });
    } else {
      console.error("listResultOwner is not an array or is not yet initialized.");
    }
  
    return result;
  };
  
  const selectStage = () => {
    const result = [];
    if (Array.isArray(stage)) {
      stage.map((data) => {
        const finalResult = {
          label: `${data.name}`,
          value: data.uid,
        };
        result.push(finalResult);
      });
    } else {
      console.error("listResult is not an array or is not yet initialized.");
    }
    return result;
  };

  return (
    <form onSubmit="">
      <div className="container mt-5" style={{ fontFamily: "Open Sans, sans-serif"  }}>
        <div className="row mt-3">
          <div className="col">
            <h6>
              <i class="bi bi-funnel fs-5"></i>
              <span
                className="fw-semibold ms-2 fs-6"
                style={{ fontSize: "0.85rem", fontFamily:"Nunito Sans, sans-serif" }}
              >
                Filter
              </span>
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <select
              name="select"
              className="form-select"
              onChange={handleDealsType}
            >
              <option value="all">All Deals</option>
              <option value="my">My Deals</option>
            </select>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col mb-2" style={{ fontFamily:"Nunito Sans, sans-serif"  }}>
            <Select
            style={{ fontFamily: "Open Sans, sans-serif"  }}
              placeholder="Select Owner"
              options={selectOwner()}
              onChange={(e) => setInputOwner(e)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <h6>
              <i class="bi bi-currency-dollar"></i>
              <span className="ms-2 fw-semibold fs-6" style={{ fontFamily:"Nunito Sans, sans-serif"  }}>Deals</span>
            </h6>
          </div>
          <div className="row mt-2">
          <div className="col mb-2">
            <Select
              placeholder="Select Stage"
              options={selectStage()}
              onChange={(e) => setInputStage(e)}
            />
          </div>
        </div>
          <div className="mb-2">
            <label className="mb-2 fw-semibold" style={{ fontFamily:"Nunito Sans, sans-serif"  }}>
              Created At
            </label>
            <input
              type="date"
              className="form-control"
              name="created_at"
              onChange={handleSearchMultiple}
            />
          </div>
          <div className="mb-2">
            <label className="mb-2 fw-semibold" htmlFor="" style={{ fontFamily:"Nunito Sans, sans-serif"  }}>
              Updated At
            </label>
            <input
              type="date"
              className="form-control"
              name="updated_at"
              onChange={handleSearchMultiple}
            />
          </div>
          <div className="mt-3">
            <button
              className="btn btn-primary"
              type="button"
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
              onClick={handleSearchMutiple}
            >
              Apply
            </button>
            <a
              className="btn btn-secondary ms-3"
              href="/deals-second"
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
            >
              Reset
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FilterTable;
