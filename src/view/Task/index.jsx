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
  const handleCloseOverlay = () => setAddTask(false);
  const toggleSideFilter = () => {
    setIsSideFilter(!isSideFilter);
  };
  const filterClass = isSideFilter
    ? "col-md-3 d-block border-end"
    : "col-md-0 d-none";
  const DataTableTask = isSideFilter ? "col-md-9" : "col-md-12";
  const IconFilter = isSideFilter ? "bi bi-x-lg" : "bi bi-funnel";

  const getTask = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tasks?limit=100000`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTask(res.data.data);
        setSearch(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getStatus = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/statuses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setStatus(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getOwner = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOwner(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getCompany = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCompany(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getContact = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setContact(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getDeals = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDeals(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
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
  useEffect(() => {
    getTask(token);
    getOwner(token);
    getCompany(token);
    getContact(token);
    getDeals(token);
    getStatus(token);

    const timeOut = setTimeout(() => {
      setPending(false)
    }, 4000)
    return () => clearTimeout(timeOut)
  }, [token]);

  const selectUidDataTable = (e) => {
    const select = e.selectedRows.map((row) => row.uid);
    setSelectUid(select);
  };
  const handleFilter = (e) => {
    const data = task.filter((row) => {
      return row.task_name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(data);
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
  const [searchOwner, setSearchOwner] = useState([]);
  const handleSelectOwner = (e) => {
    setSearchOwner(e.map((data) => data.value));
  };

  const [searchCompany, setSearchCompany] = useState([]);
  const handleSelectCompany = (e) => {
    const valComp = e.map((data) => data.value);
    setSearchCompany(valComp);
  };

  const [searchContact, setSearchContact] = useState([]);
  const handleSelectContact = (e) => {
    const valCont = e.map((data) => data.value);
    const result = valCont.reduce((acc, value) => acc.concat(value), []);
    setSearchContact(result);
  };

  const [searchDeals, setSearchDeals] = useState([]);
  const handleSelectDeals = (e) => {
    const valCont = e.map((data) => data.value);
    const result = valCont.reduce((acc, value) => acc.concat(value), []);
    setSearchDeals(result);
  };

  const [searchStatus, setSearchStatus] = useState([]);
  const handleSelectStatus = (e) => {
    setSearchStatus(e.map((data) => data.value));
  };
  const handleSubmitSearchMultiple = () => {
    const filter = task.filter((row) => {
      return (
        (searchOwner.length === 0 ||
          searchOwner.includes(row.owner_user_uid)) &&
        (searchCompany.length === 0 ||
          searchCompany.includes(row.company_uid)) &&
        (searchContact.length === 0 ||
          searchContact.includes(row.contact_uid)) &&
        (searchDeals.length === 0 || searchDeals.includes(row.deals_uid)) &&
        (searchStatus.length === 0 || searchStatus.includes(row.status_uid)) &&
        (!searchInput.created_at || row.created_at?.includes(searchInput?.created_at)) &&
        (!searchInput.updated_at || row.updated_at?.includes(searchInput?.updated_at))&&
        (!searchInput.reminder || row.date_email_reminder?.includes(searchInput?.reminder))&&
        (!searchInput.task_name || row.task_name?.toLowerCase().includes(searchInput?.task_name?.toLowerCase()))
      );
    });
    setSearch(filter);
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
                          onChange={(e) => handleSelectOwner(e)}
                          isMulti
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
                        isMulti
                        closeMenuOnSelect={false}
                        onChange={(e) => handleSelectCompany(e)}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <Select
                        placeholder="Select Contact"
                        options={SelectContact()}
                        onChange={(e) => handleSelectContact(e)}
                        isMulti
                        closeMenuOnSelect={false}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <Select
                        placeholder="Select Deals"
                        options={SelectDeals()}
                        onChange={(e) => handleSelectDeals(e)}
                        isMulti
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
                      onChange={(e) => handleSelectStatus(e)}
                      isMulti
                      closeMenuOnSelect={false}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date">Remainder</label>
                    <input
                      type="date"
                      className="form-control"
                      name="reminder"
                      onChange={handleSearchInput}
                      placeholder="Task Name"
                      style={{ fontSize: "0.85rem" }}
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
                      name="created_at"
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
                        onChange={handleFilter}
                        className="form-control"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <DatatableTask
                      data={search}
                      selectUidDataTable={selectUidDataTable}
                      pending={pending}
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
