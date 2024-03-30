import React, { useEffect, useRef, useState } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import Breadcrumb from "./partials/breadcrumb";
import TopButton from "./partials/TopButton";
import Card from "../../components/Card";
import FilterTable from "./partials/filterTable";
import DatatableDealSecond from "./partials/Datatable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faMagnifyingGlass,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { GetDataDeals } from "../../action/DataDeals";
import { useSelector } from "react-redux";
import { GetStaging } from "../../action/StagingDealSecond";
import { getListOwner } from "../../action/FormOwner";

const SecondDeals = () => {
  const token = localStorage.getItem("token");
  const [SideFilter, SetSideFilter] = useState(false);
  const ToggleSideFilter = () => {
    SetSideFilter(!SideFilter);
  };
  const FilterClass = SideFilter
    ? "col-md-3 d-block border-end"
    : "col-md-0 d-none";
  const DatatableClass = SideFilter ? "col-md-9" : "col-md-12";
  const IconSideFilter = SideFilter ? faX : faFilter;

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [search, setSearch] = useState([]);
  const [ownerDeals, setOwnerDeals] = useState([]);
  const [formSearch, setFormSearch] = useState({});
  const [inputStage, setInputStage] = useState([]);
  const [inputOwner, setInputOwner] = useState([]);
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const {
    listResultDataDeals,
    listLoadingDataDeals,
    listErrorDataDeals,
    totalDataDeals,
  } = useSelector((state) => state.DataDeals);
  console.log(listResultDataDeals);

  useEffect(() => {
    dispatch(GetDataDeals(token, search, ownerDeals, formSearch, pagination));
    dispatch(GetStaging(token));
    dispatch(getListOwner(token));

    const timeoutId = setTimeout(() => {
      setPending(false);
    }, 1040);
    return () => clearTimeout(timeoutId);
  }, [dispatch, search, ownerDeals, formSearch, pagination]);

  const handleSearchDataTable = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value.toLowerCase();
      setSearch(value);
    }
  };
  const handleChangePage = (page) => {
    setPagination((e) => ({ ...e, page }));
  };

  const handlePagePerChange = (pageSize, page) => {
    setPagination((prev) => ({ ...prev, pageSize, page }));
  };
  const { ResultStageDeals } = useSelector((state) => state.DataStage);

  const handleDealsType = async (e) => {
    const target = e.target.value;
    if (target === "my") {
      setOwnerDeals("my");
    } else {
      setOwnerDeals("all");
    }
  };
  const handleSearchMultiple = (e) => {
    setFormSearch({
      ...formSearch,
      [e.target.name]: e.target.value,
    });
  };
  const handleSearchMutiple = (e) => {
    e.preventDefault();
    const data = {
      owner: inputOwner.value || "",
      stage: inputStage.value || "",
      created_at: formSearch.created_at || "",
      updated_at: formSearch.updated_at || "",
    };
    setFormSearch(data);
  };
  return (
    <div id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <Breadcrumb />
          <TopButton />
          <Card className="shadow">
            <div className="row">
              <div id="filter" className={`${FilterClass}`}>
                <FilterTable
                  handleDealsType={handleDealsType}
                  handleSearchMultiple={handleSearchMultiple}
                  setInputOwner={setInputOwner}
                  handleSearchMutiple={handleSearchMutiple}
                  setInputStage={setInputStage}
                  stage={ResultStageDeals}
                />
              </div>
              <div className={`${DatatableClass}`}>
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-primary mt-3"
                      onClick={ToggleSideFilter}
                      style={{ fontSize: "0.85rem", fontWeight: "600" }}
                    >
                      <FontAwesomeIcon icon={IconSideFilter} className="fs-6" />
                    </button>
                    <div className="float-end">
                      <div
                        className="input-group shadow-sm mt-3 me-3"
                        style={{ width: "20rem" }}
                      >
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            style={{
                              borderEndEndRadius: 0,
                              borderStartEndRadius: 0,
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              className="fs-4"
                            />
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="Search Input"
                          onKeyDown={handleSearchDataTable}
                          className="form-control"
                          id=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="mt-3">
                    <DatatableDealSecond
                      data={listResultDataDeals}
                      paginationPerPage={pagination.limit}
                      handleChangePage={handleChangePage}
                      handlePagePerChange={handlePagePerChange}
                      totalRows={totalDataDeals}
                      pending={pending}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Main>
    </div>
  );
};

export default SecondDeals;
