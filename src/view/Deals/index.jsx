import React, { useEffect } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useState } from "react";
import Dummy from "./Dummy";
import DataTableComponet from "./Datatable";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faMagnifyingGlass,
  faSackDollar,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import BreadcrumbDeals from "./partials/breadcrumb";
import TopButton from "./partials/TopButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getListOwner } from "../../action/FormOwner";
import { getListCompany } from "../../action/FormCompany";
import { getListContact } from "../../action/FormContact";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportWithModal from "./Modals/ExportWithModal";
import { de } from "@faker-js/faker";

const Deals = () => {
  const token = localStorage.getItem("token");
  const [isSideFilter, setIsSideFilter] = useState(false);
  const [search, setSearch] = useState([]);
  const [selectUid, setSelectUid] = useState([]);
  const [deals, setDataDeals] = useState([]);
  const [searchMultiple, setSearchMultiple] = useState([]);
  const [stage, setStage] = useState([]);
  const [priority, setPriority] = useState([]);
  const [searchOwner, setSearchOwner] = useState([]);
  const [searchStage, setSearchStage] = useState([]);
  const [searchCompany, setSearchCompany] = useState([]);
  const [searchContact, setSearchContact] = useState([]);
  const [searchPriority, setSearchPriority] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [ownerDeals, setOwnerDeals] = useState([]);
  const [formSearch, setFormSearch] = useState({});

  const [startCreated, setStartCreated] = useState(null)
  const [endCreated, setEndCreated] = useState(null);

  const [startUpdated, setStartUpdated] = useState(null)
  const [endUpdated, setEndUpdated] = useState(null)

  const [showExportModal, setShowExportModal] = useState(false);

  const fetchData = async () => {
    try {
      setPending(true);
      await getStage();
      await getPriority();
    } catch (error) {
      console.error("error in fetch data", error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    try {
      setPending(true);
      getDeals(token, search, ownerDeals, formSearch, pagination);
    } catch (error) {
      console.error("error in fetch data", error);
    } finally {
      setPending(false);
    }
  }, [token, search, ownerDeals, formSearch, pagination])


  const dispatch = useDispatch();
  const { listResultOwner, listLoadingOwner, listErrorOwner } = useSelector(
    (state) => state.SelectOwner
  );
  const { listResult, listLoading, listError } = useSelector(
    (state) => state.FormCompany
  );

  const { listResultContact, listLoadingContact, listErrorContact } =
    useSelector((state) => state.SelectContact);

  useEffect(() => {
    fetchData();
    dispatch(getListOwner(token));
    dispatch(getListCompany(token));
    dispatch(getListContact(token));
  }, [
    dispatch,
    token
  ]);

  const getStage = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/staging-masters`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStage(response.data.data);
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.data.message === "Unauthenticated."
      ) {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getStage(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("Unhandled error:", error);
      }
    }
  };

  const getPriority = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/priorities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPriority(response.data.data);
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.data.message === "Unauthenticated."
      ) {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getPriority(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("Unhandled error:", error);
      }
    }
  };

  const selectUidDataTable = (e) => {
    const select = e.selectedRows.map((row) => row.uid);
    setSelectUid(select);
  };

  const getDeals = async (
    token,
    term,
    ownerDeals,
    formSearch,
    pagination,
    retryCount = 0
  ) => {
    try {
      const params = {};
      if (term) {
        params.search = term;
      }
      if (formSearch) {
        Object.assign(params, formSearch);
        if (!params.page) {
          params.page = pagination.page;
        }
        if (!params.limit) {
          params.limit = pagination.limit;
        }
      }
      if (ownerDeals) {
        params.deals = ownerDeals;
        params.page = pagination.page;
        params.limit = pagination.limit;
      }
      params.page = pagination.page;
      params.limit = pagination.limit;
      params.created_at = {
        start: startCreated,
        end: endCreated,
      };
      params.updated_at = {
        start: startUpdated,
        end: endUpdated,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/deals`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: params,
        }
      );

      setDataDeals(response.data?.data);
      setTotalRows(response.data?.pagination?.totalData);
      setPending(false);
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.data.message === "Unauthenticated."
      ) {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getDeals(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else if (error.response && error.response.status === 404) {
        setDataDeals([]);
        setTotalRows(0);
      } else {
        console.error("error", error);
      }
    }
  };

  const handleSubmitSearchMultiple = (e) => {
    e.preventDefault();
    const formSearchMultiple = {
      owner: searchOwner.value || "",
      stage: searchStage.label || "",
      associate_company: searchCompany.value || "",
      associate_contact: searchContact.value || "",
      deal_name: searchMultiple.deal_name || "",
      priority: searchPriority.label || "",
      deal_size: searchMultiple.deal_size || "",
      created_at: searchMultiple.created_at || "",
      updated_at: searchMultiple.updated_at || "",
    };
    setFormSearch(formSearchMultiple);
  };

  // console.log(searchStage.label);
  const handleDeleteSelect = async (e) => {
    e.preventDefault();
    const isResult = await Swal.fire({
      title: "Apakah Anda Yakin",
      text: "Anda tidak dapat mengembalikan data ini setelah menghapusnya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });
    if (isResult.isConfirmed) {
      try {
        const formData = new FormData();
        selectUid.map((data, indek) => {
          formData.append(`deals_uid[${indek}]`, data);
        });

        // for (const pair of formData.entries()) {
        //   console.log(pair[0] + ": " + pair[1]);
        // }
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/deals/item/delete`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            Swal.fire({
              title: res.data.message,
              text: "Successfully deleted",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            });
          });
      } catch (err) {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
        if (err.message) {
          Swal.fire({
            text: err.response.data.message,
            icon: "warning",
          });
        }
      }
    }
  };

  const toggleSideFilter = () => {
    setIsSideFilter(!isSideFilter);
  };

  const filterClass = isSideFilter
    ? "col-md-3 d-block border-end"
    : "col-md-0 d-none";

  const boardKanbanDatatable = isSideFilter ? "col-md-9" : "col-md-12";
  const IconFilter = isSideFilter ? faX : faFilter;

  const handleSearchDatatable = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value.toLowerCase();
      setSearch(value);
    }
  };

  const selectOwner = () => {
    const result = [];
    if (listResultOwner && Array.isArray(listResultOwner)) {
      listResultOwner.map((data) => {
        const finalResult = {
          label: `${data.name}`,
          value: data.uid,
        };
        result.push(finalResult);
      });
    }

    return result;
  };

  const selectStage = () => {
    const res = [];
    stage?.map((data) => {
      const resThem = {
        value: data.uid,
        label: data.name,
      };
      res.push(resThem);
    });
    return res;
  };

  const selectPriority = () => {
    const res = [];
    priority?.map((data) => {
      const theme = {
        value: data.uid,
        label: data.name,
      };
      res.push(theme);
    });
    return res;
  };

  const selectCompany = () => {
    const result = [];
    if (listResult && Array.isArray(listResult)) {
      listResult.map((data) => {
        const finalResult = {
          label: `${data.name}`,
          value: data.uid,
        };
        result.push(finalResult);
      });
    }

    return result;
  };

  const selectContact = () => {
    const result = [];
    if (Array.isArray(listResultContact)) {
      listResultContact.map((data) => {
        const finalResult = {
          label: `${data.name}`,
          value: data.uid,
        };
        result.push(finalResult);
      });
    }

    return result;
  };

  const [pending, setPending] = useState(true);

  const handleDealsMyOrPerson = async (e) => {
    const target = e.target.value;
    if (target === "all") {
      setOwnerDeals("all");
    } else {
      setOwnerDeals("my");
    }
  };

  const handleSearchMultiple = (e) => {
    setSearchMultiple({
      ...searchMultiple,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePage = (page) => {
    setPagination((e) => ({ ...e, page }));
  };

  const handlePagePerChange = (pageSize, page) => {
    setPagination((prev) => ({ ...prev, pageSize, page }));
  };


  const handleCreatedChange = (dates) => {
    const [start, end] = dates;
    const startDateOnly = start ? start.toLocaleDateString() : null
    const endDateOnly = end ? end.toLocaleDateString() : null
    setStartCreated(startDateOnly);
    setEndCreated(endDateOnly);
  };

  const handleUpdatedChange = (dates) => {
    const [start, end] = dates;
    const startDateOnly = start ? start.toLocaleDateString() : null
    const endDateOnly = end ? end.toLocaleDateString() : null
    setStartUpdated(startDateOnly);
    setEndUpdated(endDateOnly);
  };

  const handleExportClick = () => {
    setShowExportModal(true);
  };

  console.log(deals);

  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <BreadcrumbDeals />
          <TopButton handleDeleteSelect={handleDeleteSelect} onExportClick={handleExportClick} owner={ownerDeals} />

          {showExportModal && (
            <ExportWithModal
              onClose={() => setShowExportModal(false)} owners={selectOwner()}
            />
          )}

          <Card className="shadow">
            <div className="row">
              <div id="filter" className={`${filterClass}`}>
                <form onSubmit={handleSubmitSearchMultiple}>
                  <div className="container">
                    <div className="row mt-3">
                      <div className="col">
                        <h6>
                          <i className="bi bi-funnel ml"></i>
                          <span className="fw-semibold ms-2 fs-6">Filter</span>
                        </h6>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <select
                          name="select"
                          id=""
                          className="form-select"
                          style={{ fontSize: "0.85rem" }}
                          onChange={handleDealsMyOrPerson}
                        >
                          <option value="all">All Deals</option>
                          <option value="my">My Deals</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col mb-2">
                        <Select
                          options={selectOwner()}
                          onChange={(e) => {
                            setSearchOwner(e);
                          }}
                          placeholder="Select Owner"
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col">
                        <Select
                          options={selectStage()}
                          onChange={(e) => setSearchStage(e)}
                          placeholder="Select Stage"
                        />
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col">
                        <h6>
                          <i className="bi bi-link-45deg"></i>
                          <span className="fw-semibold ms-2 fs-6">
                            Associated
                          </span>
                        </h6>
                      </div>
                      <div className="mb-2">
                        <Select
                          options={selectCompany()}
                          onChange={(e) => setSearchCompany(e)}
                          placeholder="Select Company"
                        />
                      </div>
                      <div className="mb-2">
                        <Select
                          options={selectContact()}
                          onChange={(e) => setSearchContact(e)}
                          placeholder="Select Contact"
                        />
                      </div>
                      {/* <div className="mb-2">
                      <Select
                        options={selectProduct()}
                        onChange={(e) => handleSelectProduct(e)}
                        isMulti
                        placeholder="Select Product"
                      />
                    </div>
                    <div className="mb-2">
                      <Select
                        options={selectPackageProduct()}
                        onChange={(e) => handleSelectPackageProduct(e)}
                        isMulti
                        placeholder="Select Package Product"
                      />
                    </div> */}
                    </div>
                    <div className="row mt-5">
                      <div className="col">
                        <h6>
                          <i className="bi bi-currency-dollar"></i>
                          <span className="fw-semibold ms-2 fs-6">Deals</span>
                        </h6>
                      </div>
                    </div>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        name="deal_name"
                        onChange={handleSearchMultiple}
                        placeholder="Deals Name"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div className="mb-1">
                      <Select
                        options={selectPriority()}
                        name="priority"
                        onChange={(e) => setSearchPriority(e)}
                        placeholder="Select Priority"
                      />
                    </div>
                    <div className="mb-1">
                      <input
                        type="number"
                        className="form-control"
                        name="deal_size"
                        placeholder="Deal Size"
                        onChange={handleSearchMultiple}
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div className="mb-1">
                      <label htmlFor="date">Created</label>  <br />
                      <DatePicker
                        selectsRange
                        startDate={startCreated ? new Date(startCreated) : null}
                        endDate={endCreated ? new Date(endCreated) : null}
                        onChange={handleCreatedChange}
                        isClearable
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        disabledKeyboardNavigation />
                    </div>
                    <div className="mb-1">
                      <label htmlFor="date">Updated</label> <br />
                      <DatePicker
                        selectsRange startDate={startUpdated ? new Date(startUpdated) : null}
                        endDate={endUpdated ? new Date(endUpdated) : null}
                        onChange={handleUpdatedChange}
                        isClearable
                        className="form-control"
                        placeholder="Select Date"
                        dateFormat="dd/MM/yyyy"
                        disabledKeyboardNavigation />
                    </div>
                    <button
                      type="button"
                      onClick={handleSubmitSearchMultiple}
                      className="btn btn-primary mt-2"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Apply
                    </button>
                    <a
                      href="/deals"
                      className="btn btn-secondary mt-2 ms-2"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Cancel
                    </a>
                  </div>
                </form>
              </div>

              <div className={`${boardKanbanDatatable}`}>
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-primary mt-3"
                      onClick={toggleSideFilter}
                      style={{ fontSize: "0.85rem" }}
                    >
                      <FontAwesomeIcon icon={IconFilter} className="fs-5" />
                      {/* <i className={`${IconFilter}`}></i> */}
                    </button>
                    <div className="col-md-5 float-end">
                      <div
                        className="input-group mt-3 me-3"
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
                              style={{ height: "1.8rem" }}
                            />
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="Search"
                          onKeyDown={handleSearchDatatable}
                          className="form-control"
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                    </div>

                    {/* <div className="mt-3 ms-3">
                    <select
                      name=""
                      id=""
                      className="form-select"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <opti              on value="">Select Sales</opti>
                      <option value="">Sales Pipeline</option>
                    </select>
                  </div> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col mt-3">
                    <DataTableComponet
                      data={deals}
                      selectUidDataTable={selectUidDataTable}
                      pending={pending}
                      paginationPerPage={pagination.limit}
                      paginationTotalRows={totalRows}
                      handleChangePage={handleChangePage}
                      handlePagePerChange={handlePagePerChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Main>
    </body>
  );
};

export default Deals;
