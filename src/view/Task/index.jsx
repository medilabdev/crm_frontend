import React, { useEffect, useState } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import Breadcrumbsindex from "./Breadcrumbsindex";
import Card from "../../components/Card";
import Select from "react-select";
import axios from "axios";
import DatatableTask from "./DatatableTask";
import Dummy from "./DummyData";
import AddTask from "./Overlay/AddTask";
import Swal from "sweetalert2";
import { debounce } from 'lodash';

const Task = () => {
  const token = localStorage.getItem("token");
  const [isSideFilter, setIsSideFilter] = useState(false);
  const [owner, setOwner] = useState([]);
  const [company, setCompany] = useState([]);
  const [contact, setContact] = useState([]);
  const [deals, setDeals] = useState([]);
  const [task, setTask] = useState([]);
  const [search, setSearch] = useState([]);
  const [selectUid, setSelectUid] = useState([]);
  const [status, setStatus] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [searchOwner, setSearchOwner] = useState([]);
  const [searchCompany, setSearchCompany] = useState([]);
  const [searchContact, setSearchContact] = useState([]);
  const [searchDeals, setSearchDeals] = useState([]);
  const [searchStatus, setSearchStatus] = useState([]);
  const [searchForm, setSearchForm] = useState([])
  const handleCloseOverlay = () => setAddTask(false);
  const toggleSideFilter = () => {
    setIsSideFilter(!isSideFilter);
  };
  const filterClass = isSideFilter
    ? "col-md-3 d-block border-end"
    : "col-md-0 d-none";
  const DataTableTask = isSideFilter ? "col-md-9" : "col-md-12";
  const IconFilter = isSideFilter ? "bi bi-x-lg" : "bi bi-funnel";
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [totalRows, setTotalRows] = useState(0);

  const getTask = async(term, searchForm, retryCount = 0) => {
    try { 
      const params ={};
      if(term){
        params.search = term
      }
      if(searchForm){
        Object.assign(params, searchForm);
        if (!params.page) {
          params.page = pagination.page;
        }
        if (!params.limit) {
          params.limit = pagination.limit;
        }
      }
      params.page = pagination.page;
      params.limit = pagination.limit;
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
        headers:{
          Authorization :`Bearer ${token}`
        },
        params: params 
      })
      setTask(response.data.data)
      setTotalRows(response.data.pagination.totalData)
      setPending(false)
    } catch (error) {
      if (error.response && error.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getTask(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      }
      else if(error.response && error.response.status === 404){
        setTask([])
        setTotalRows(0)
      }
      else{
        console.error("error"  , error);
      }
    }
  };


  const getStatus = async(token, retryCount = 0) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/statuses`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      setStatus(response.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getStatus(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  const getOwner = async(token, retryCount = 0) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
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
            getOwner(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  const getCompany = async(token, retryCount = 0) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies/form/select`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
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

  const getContact = async(token, retryCount = 0) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/contacts/form/select`, {
        headers:{
          Authorization: `Bearer ${token}`,
        }
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
  
  const getDeals = async(token, retryCount = 0) => {
    try {
      const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deals/form/select`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) 
      setDeals(response.data.data)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getDeals(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  const SelectOwner = () => {
    const result = [];
    owner?.map((data) => {
      const theme = {
        label: data.name,
        value: data.uid,
      };
      result.push(theme);
    });
    return result;
  };

  const SelectCompany = () => {
    const result = [];
    company?.map((data) => {
      const theme = {
        label: data.name,
        value: data.uid,
      };
      result.push(theme);
    });
    return result;
  };

  const SelectContact = () => {
    const res = [];
    contact?.map((data) => {
      const thema = {
        label: data.name,
        value: data.uid,
      };
      res.push(thema);
    });
    return res;
  };

  const SelectDeals = () => {
    const res = [];
    deals?.map((data) => {
      const theme = {
        label: data.deal_name,
        value: data.uid,
      };
      res.push(theme);
    });
    return res;
  };

  const SelectStatus = () => {
    const res = [];
    status?.map((data) => {
      const theme = {
        label: data.name,
        value: data.uid,
      };
      res.push(theme);
    });
    return res;
  };
  const [pending, setPending] = useState(true)
  
  const fetchData = async () => {
    try {
      setPending(true)
      await getOwner(token)
      await getCompany(token)
      await getContact(token)
      await getDeals(token)
      await getStatus(token)
    } catch (error) {
      console.error('error in fetch data', error);
    }finally{
      setPending(false)
    }
  }


  useEffect(() => {
    fetchData();
  }, [token]);
  
  useEffect(() => {
    try {
      setPending(true)
      getTask(search, searchForm)
    } catch (error) {
      console.error('error in fetch data', error);
    }finally{
      setPending(false)
    }
  }, [token, search, searchForm, pagination.page, pagination.limit])
  const selectUidDataTable = (e) => {
    const select = e.selectedRows.map((row) => row.uid);
    setSelectUid(select);
  };

  const handleDeleteSelect = async (e) => {
    const isResult = await Swal.fire({
      title: "Hapus Task!.. apakah kamu yakin?",
      text: "Anda tidak dapat mengembalikan data ini setelah menghapusnya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });
    if (isResult.isConfirmed) {
      const formData = new FormData();
      selectUid.forEach((uid, index) => {
        formData.append(`task[${index}][uid]`, uid);
      });
      formData.append("_method", "delete");
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/tasks/item/delete`,
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
            text: "Delete Successfully",
            icon: "success",
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.reload();
            }
          });
        });
    }
  };
  const [searchInput, setSearchInput] = useState([]);
  const handleSearchInput = (e) => {
    setSearchInput({
      ...searchInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitSearchMultiple = (e) => {
    e.preventDefault();
    const formSearchMultiple = {
      deal: searchDeals.label,
      contact: searchContact.label,
      status: searchStatus.label,
      remainder: searchInput.remainder,
      created_at: searchInput.created_at,
      updated_at: searchInput.updated_at
    }
    setSearchForm(formSearchMultiple)
  };

  const handleChangePage = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };
  
  const handlePagePerChange = (pageSize, page) => {
    setPagination((prev) => ({ ...prev, limit: pageSize, page }));
  };
  
  const handleFilter = (e) => {
    if(e.key === "Enter"){
      const value = e.target.value.toLowerCase();
      setSearch(value)
    }
  };

  return (
    <body id="body">
      <Topbar />
      <Sidebar /> 
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <Breadcrumbsindex />
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
                    Add Task
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => setAddTask(true)}
                        style={{ cursor: "pointer" }}
                      >
                        Single Task
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/task/upload-file"
                        style={{ cursor: "pointer" }}
                      >
                        Upload Task
                      </a>
                    </li>
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
                <a
                  href="/task/bulk-change"
                  className="btn btn-outline-primary ms-2 text-decoration-none"
                  style={{ fontSize: "0.85rem" }}
                >
                  Bulk Change
                </a>
                <button
                  className="btn btn-outline-danger ms-2"
                  style={{ fontSize: "0.85rem" }}
                  onClick={handleDeleteSelect}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <Card className="shadow">
            <div className="row">
              <div id="filter" className={`${filterClass}`}>
                <div className="container">
                  <div className="row mt-3">
                    <div className="col">
                      <h6>
                        <i class="bi bi-funnel ml"></i>
                        <span className="fw-semibold ms-2">Filter</span>
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mt-2">
                        <Select
                          options={SelectOwner()}
                          onChange={(e) => setSearchOwner(e)}
                          placeholder="Select Owner"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <h6>
                        <i class="bi bi-link-45deg"></i>
                        <span className="fw-semibold ms-2">Associated</span>
                      </h6>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <Select
                        placeholder="Select Company"
                        options={SelectCompany()}
                        closeMenuOnSelect={false}
                        onChange={(e) => setSearchCompany(e)}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <Select
                        placeholder="Select Contact"
                        options={SelectContact()}
                        onChange={(e) => setSearchContact(e)}
                        closeMenuOnSelect={false}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <Select
                        placeholder="Select Deals"
                        options={SelectDeals()}
                        onChange={(e) => setSearchDeals(e)}
                        closeMenuOnSelect={false}
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <h6>
                        <i class="bi bi-calendar-check"></i>
                        <span className="fw-semibold ms-2">Task</span>
                      </h6>
                    </div>
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="task_name"
                      onChange={handleSearchInput}
                      placeholder="Task Name"
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                  <div className="mb-2">
                    <Select
                      placeholder="Select Status"
                      options={SelectStatus()}
                      onChange={(e) => setSearchStatus(e)}
                      closeMenuOnSelect={false}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date">Created</label>
                    <input
                      type="date"
                      className="form-control"
                      name="created_at"
                      onChange={handleSearchInput}
                      placeholder="Task Name"
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date">Updated</label>
                    <input
                      type="date"
                      className="form-control"
                      name="updated_at"
                      onChange={handleSearchInput}
                      placeholder="Task Name"
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                  <button
                    onClick={handleSubmitSearchMultiple}
                    className="btn btn-primary mt-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Apply
                  </button>
                  <a
                    href="/task"
                    type="submit"
                    className="btn btn-secondary mt-2 ms-2 text-decoration-none"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Cancel
                  </a>
                </div>
              </div>
              <div className={DataTableTask}>
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
                        onKeyDown={handleFilter}
                        className="form-control"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <DatatableTask
                      data={task}
                      selectUidDataTable={selectUidDataTable}
                      pending={pending}
                      handleChangePage={handleChangePage}
                      handlePagePerChange ={handlePagePerChange}
                      PaginationLimit={pagination.limit}
                      totalRows={totalRows}
                    />
                    <AddTask visible={addTask} onClose={handleCloseOverlay} />
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

export default Task;
