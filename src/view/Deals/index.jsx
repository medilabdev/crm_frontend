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
import {getPackageProduct} from "../../context/UseContext";
import { debounce } from 'lodash';

const Deals = () => {
  const token = localStorage.getItem("token");
  const [isSideFilter, setIsSideFilter] = useState(false);
  const [search, setSearch] = useState([]);
  const [selectUid, setSelectUid] = useState([]);
  const [owner, setOwner] = useState([]);
  const [deals, setDataDeals] = useState([]);
  const [searchMultiple, setSearchMultiple] = useState([]);
  const [stage, setStage] = useState([]);
  const [priority, setPriority] = useState([]);
  const [searchOwner, setSearchOwner] = useState([]);
  const [searchStage, setSearchStage] = useState([]);
  const [company, setCompany] = useState([]);
  const [contact, setContact] = useState([]);
  const [searchCompany, setSearchCompany] = useState([]);
  const [searchContact, setSearchContact] = useState([]);
  const [searchPriority, setSearchPriority] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  })
  const [totalRows, setTotalRows] = useState(0)
  const [ownerDeals, setOwnerDeals] = useState([])
  const [formSearch, setFormSearch] = useState({})

  const fetchData = async () => {
    try {
      setPending(true)
        await getDeals(token, search, ownerDeals, formSearch) 
        await getOwnerUser()
        await getStage();
        await getPriority();
        await getCompany();
        await getContact()
    } catch (error) {
      console.error('error in fetch data', error);
    }finally{
      setPending(false)
    }
  }

  useEffect(() => {
    fetchData()
   }, [token, search, ownerDeals, formSearch, pagination.page, pagination.limit]);

   

  
  const getContact = async(retryCount = 0) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/contacts/form/select`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setContact(response.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getContact(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  const getCompany = async(retryCount = 0) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies/form/select`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCompany(response.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getCompany(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  const getStage = async(retryCount = 0) => {
    try {
      const response = await  axios.get(`${process.env.REACT_APP_BACKEND_URL}/staging-masters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setStage(response.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getStage(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  const getOwnerUser = async(retryCount = 0) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setOwner(response.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getOwnerUser(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  const getPriority = async(retryCount = 0) => {
    try {
      const response = await  axios.get(`${process.env.REACT_APP_BACKEND_URL}/priorities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPriority(response.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getPriority(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  const selectUidDataTable = (e) => {
    const select = e.selectedRows.map((row) => row.uid);
    setSelectUid(select);
  };

    const getDeals = async (token, term, ownerDeals, formSearch,  retryCount = 0) => {
      try {
        const params = {};
        if (term) {
          params.search = term;
        }
        if(formSearch){
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
           
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/deals`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: params,
        });
    
        setDataDeals(response.data.data);
        setTotalRows(response.data.pagination.totalData);
        setPending(false)
      } catch (error) {
        if  (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
        else if (error.response && error.response.status === 429) {
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              getDeals(retryCount + 1);
            }, 2000);
          } else {
            console.error('Max retry attempts reached. Unable to complete the request.');
          }
        }
        else if (error.response && error.response.status === 404) {
          setDataDeals([]);
          setTotalRows(0);
        }else{
          console.error('error' , error);
        }
        
      }
    };

    const handleSubmitSearchMultiple = (e) => {
      e.preventDefault();
      const formSearchMultiple ={
        owner:searchOwner.value || '',
        stage:searchStage.label || '',
        associate_company:searchCompany.value || '',
        associate_contact:searchContact.value || '',
        deal_name:searchMultiple.deal_name || '',
        priority:searchPriority.label || '',
        deal_size:searchMultiple.deal_size || '',
        created_at:searchMultiple.created_at || '',
        updated_at:searchMultiple.updated_at || ''
    }
    setFormSearch(formSearchMultiple)
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
  const IconFilter = isSideFilter ? "bi bi-x-lg" : "bi bi-funnel";


  const handleSearchDatatable = (e) => {
    if(e.key === "Enter"){
      const value = e.target.value.toLowerCase();
      setSearch(value)
    }
  };

  const selectOwner = () => {
    const result = [];
    owner?.map((data) => {
      const ownRes = {
        value: data.uid,
        label: data.name,
      };
      result.push(ownRes);
    });
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
    const res = [];
    company?.map((data) => {
      const theme = {
        value: data.uid,
        label: data.name,
      };
      res.push(theme);
    });
    return res;
  };

  const selectContact = () => {
    const res = [];
    contact?.map((data) => {
      const theme = {
        value: data.uid,
        label: data.name,
      };
      res.push(theme);
    });
    return res;
  };

  const [pending, setPending] = useState(true)


  const handleDealsMyOrPerson = async (e) => {
    const target = e.target.value;
      if (target === "all") {
        setOwnerDeals("all")
      } else {
       setOwnerDeals("my")
      }
  };
  
  const handleSearchMultiple = (e) => {
    setSearchMultiple({
      ...searchMultiple,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePage = (page) => {
    setPagination((e) => ({ ...e, page}))
  } 
  
  const handlePagePerChange = (pageSize, page) => {
    setPagination((prev) => ({...prev, pageSize, page}))
  }

  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Deals</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <Link to="/" className="text-decoration-none">
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Deals</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col mb-2">
            <div className="d-flex float-end">
              <div className="dropdown button-flex">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Add Deals
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/deals/single-deals">
                      Single Deal
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-decoration-none"
                      href="/deals/upload-deals"
                    >
                      Upload Deals
                    </a>
                  </li>
                  {/* <li>
                    <Link className="dropdown-item" to="">
                      Upload Product
                    </Link>
                  </li> */}
                </ul>
              </div>
              <div className="dropdown button-flex">
                <button
                  className="btn btn-outline-primary dropdown-toggle ms-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Donwload
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Donwload Selected
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Donwload All
                    </a>
                  </li>
                </ul>
              </div>
              <Link
                to="/deals/need-approval"
                className="btn btn-outline-primary ms-2"
                style={{ fontSize: "0.85rem" }}
              >
                Need Approval
              </Link>
              <Link
                to="/deals/bulk-change"
                className="btn btn-outline-primary ms-2 text-decoration-none"
                style={{ fontSize: "0.85rem" }}
              >
                Bulk Change
              </Link>
              <button
                onClick={handleDeleteSelect}
                className="btn btn-outline-danger ms-2"
                style={{ fontSize: "0.85rem" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <Card className="shadow">
          <div className="row">
            <div id="filter" className={`${filterClass}`}>
              <form onSubmit={handleSubmitSearchMultiple}>
                <div className="container">
                  <div className="row mt-3">
                    <div className="col">
                      <h6>
                        <i class="bi bi-funnel ml"></i>
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
                        onChange={(e) => setSearchOwner(e)}
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
                        <i class="bi bi-currency-dollar"></i>
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
                    <label htmlFor="date">Created</label>
                    <input
                      type="date"
                      name="created_at"
                      className="form-control"
                      onChange={handleSearchMultiple}
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="date">Updated</label>
                    <input
                      type="date"
                      name="updated_at"
                      className="form-control"
                      onChange={handleSearchMultiple}
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                  <button
                    type="button" onClick={handleSubmitSearchMultiple}
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
                <div className="col d-flex">
                  <button
                    className="btn btn-primary mt-3"
                    onClick={toggleSideFilter}
                    style={{ fontSize: "0.85rem" }}
                  >
                    <i className={`${IconFilter}`}></i>
                  </button>
                  <div
                    className="input-group mt-3 ms-3"
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
                        <i className="bi bi-search"></i>
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
      </Main>
    </body>
  );
};

export default Deals;
