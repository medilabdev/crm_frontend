import React, { useEffect, useState } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import Breadcrumbsindex from "./Breadcrumbsindex";
import Card from "../../components/Card";
import Select from "react-select"
import axios from "axios";
import DatatableTask from "./DatatableTask";
import Dummy from "./DummyData"
import AddTask from "./Overlay/AddTask";
import Swal from 'sweetalert2'

const Task = () => {
  const token = localStorage.getItem("token")
  const [isSideFilter, setIsSideFilter] = useState(false)
  const [owner, setOwner] = useState([])
  const [company, setCompany] = useState([])
  const [contact, setContact] = useState([])
  const [deals, setDeals] = useState([])
  const [task, setTask] = useState([])
  const [search, setSearch] = useState([])
  const [selectUid, setSelectUid] = useState([]);
  const [addTask, setAddTask] = useState(false)
  const handleCloseOverlay = () => setAddTask(false)
  const toggleSideFilter = () => {
    setIsSideFilter(!isSideFilter);
  };
  const filterClass = isSideFilter
  ? "col-md-3 d-block border-end"
  : "col-md-0 d-none";
  const DataTableTask = isSideFilter ? "col-md-9" : "col-md-12";
  const IconFilter = isSideFilter ? "bi bi-x-lg" : "bi bi-funnel";

  const getTask = () => { 
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setTask(res.data.data)
      setSearch(res.data.data)
    }
    )
    .catch((err) => {
      if (err.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      }
    })
  }
  const getOwner = (token) => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => setOwner(res.data.data))
    .catch((err) => {
      if (err.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      }
    })
  }
  const getCompany = (token) => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies`, {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res) => setCompany(res.data.data))
    .catch((err) => {
      if (err.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
    })
  }
  const getContact = (token) => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/contacts`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res) => setContact(res.data.data))
    .catch((err) => {
      if (err.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
    })
  }
  const getDeals = (token) => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/deals`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => setDeals(res.data.data))
    .catch((err) => {
      if (err.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
    })
  }
  const SelectOwner = () => {
    const result = []
    owner?.map((data) => {
      const theme = {
        label: data.name,
        value: data.uid
      }
      result.push(theme)
    })
    return result
  }

  const SelectCompany = () => {
    const result  = []
    company?.map((data) => {
      const theme = {
        label: data.name,
        value: data.uid
      }
      result.push(theme)
    })
    return result
  }

  const SelectContact = () => {
    const res = []
    contact?.map((data) => {
      const thema = {
        label: data.name,
        value:data.uid
      }
      res.push(thema)
    })
    return res
  }

  const SelectDeals = () => {
    const res=[]
    deals?.map((data)=> {
      const theme = {
        label: data.deal_name,
        value: data.uid
      }
      res.push(theme)
    })
    return res
  }

  useEffect(() => {
    getTask(token)
    getOwner(token)
    getCompany(token)
    getContact(token)
    getDeals(token)
  }, [token])

  const selectUidDataTable = (e) => {
    const select = e.selectedRows.map((row) => row.uid);
    setSelectUid(select)
  }
  
  const handleFilter = (e) => {
    const data = task.filter((row) => {
      return row.task_name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setSearch(data)
  }
  const handleDeleteSelect =async(e) => {
    const isResult = await Swal.fire({
      title: "Hapus Task!.. apakah kamu yakin?",
      text: "Anda tidak dapat mengembalikan data ini setelah menghapusnya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    })
    if(isResult.isConfirmed){

    }
  } 
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
                    <a className="dropdown-item" onClick={() => setAddTask(true)} style={{ cursor:"pointer" }}>
                      Single Task
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/task/upload-file" style={{ cursor:"pointer" }}>
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
                style={{ fontSize: "0.85rem" }} onClick={handleDeleteSelect}
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
                        <Select options={SelectOwner()} isMulti placeholder="Select Owner" /> 
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
                      <Select placeholder="Select Company" options={SelectCompany()} isMulti closeMenuOnSelect={false} />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <Select placeholder="Select Contact" options={SelectContact()} isMulti closeMenuOnSelect={false} />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <Select placeholder="Select Deals" options={SelectDeals()} isMulti closeMenuOnSelect={false} />
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
                        name="name"
                        placeholder="Task Name"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                  <div className="mb-2">
                   <select className="form-select" style={{ fontWeight:"0.75rem" }}>
                    <option value="">Select Status</option>
                    <option value="1">Not Started</option>
                    <option value="1">Started</option>
                    <option value="1">Complated</option>
                   </select>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="date">Remainder</label>
                      <input
                        type="date"
                        className="form-control"
                        name="name"
                        placeholder="Task Name"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="date">Created</label>
                      <input
                        type="date"
                        className="form-control"
                        name="name"
                        placeholder="Task Name"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="date">Updated</label>
                      <input
                        type="date"
                        className="form-control"
                        name="name"
                        placeholder="Task Name"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <button
                      type="button"
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
                      onChange={handleFilter}
                      className="form-control"
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <DatatableTask data={search} selectUidDataTable={selectUidDataTable} />
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
