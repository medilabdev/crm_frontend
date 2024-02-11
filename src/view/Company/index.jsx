import React, { Fragment, useEffect, useState } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Card from "../../components/Card";
import Footer from "../../components/Template/Footer";
import DataTable from "react-data-table-component";
import Dummy from "./Dummy/index";
import IconCompany from "../../assets/img/condo.png";
import { useNavigate } from "react-router-dom";
import "../Company/style.css";
import DeleteCompany from "./Modals/deleteCompany";
import phone from "../../../src/assets/img/phone.png";
import iconGedung from "../../../src/assets/img/office-building.png";
import axios, { all } from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import IconMoney from "../../assets/img/coin.png";
import { debounce } from "lodash";

const Company = () => {
  const uid = localStorage.getItem("uid");
  const [allCompany, setAllCompany] = useState([]);
  const token = localStorage.getItem("token");
  const [isSideBar, setIsSideBar] = useState(false);
  const toggleSideBarCard = () => {
    setIsSideBar(!isSideBar);
  };

  const filterClass = isSideBar
    ? "col-md-3 d-block border-end"
    : "col-sm-0 d-none";
  const datatableClass = isSideBar ? "col-md-9" : "col-sm-12";
  const showTooltip = isSideBar ? (
    <Tooltip id="tooltip">Close Filter</Tooltip>
  ) : (
    <Tooltip id="tooltip">Show Filter</Tooltip>
  );

  const iconFilter = isSideBar ? "bi bi-x-lg" : "bi bi-funnel";
  const navigate = useNavigate();
  const [search, setSearch] = useState(allCompany);
  const [selectedUIDs, setSelectedUIDs] = useState([]);
  const [deleteCompany, setDeleteCompany] = useState(false);
  const handleDeleteCompany = () => setDeleteCompany(false);
  const [owner, setOwner] = useState([]);
  const [resultOwner, setResultOwner] = useState([]);
  const [source, setSource] = useState([]);
  const [resultSource, setResultSource] = useState([]);
  const [companyType, setCompanyType] = useState([]);
  const [contact, setContact] = useState([]);
  const [deals, setDeals] = useState([]);
  const [searchMultiple, setSearchMultiple] = useState({
    name: "",
    website_url: "",
    address: "",
    company_type_uid: "",
    created_at: "",
    number_of_patient: "",
    parent_company_uid: "",
  });
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const [ownerCompany, setOwnerCompany] = useState([]);
  const [formSearch, setFormSearch] = useState({})
  const [totalRows, setTotalRows] = useState(0);
  const handleSelectSearchCompany = (e) => {
    setSearchMultiple({
      ...searchMultiple,
      [e.target.name]: e.target.value,
    });
  };

  const getContact = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/contacts/form/select`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContact(res.data.data);
      })
      .catch(async(err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
        else if(err.response.status === 429) {
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              getContact(retryCount + 1);
            }, 2000);
          } else {
            console.error('Max retry attempts reached. Unable to complete the request.');
          }
        } else {
          console.error('Unhandled error:', err);
        }
      });
  };

  const getDeals = (retryCount  = 0) => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/deals/form/select`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setDeals(res.data.data)
    })
    .catch(async(err)=> {
      if (err.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(err.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getDeals(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', err);
      }
    })
  }

  const getAllCompany = async (token, term, ownerCompany, formSearch, retryCount = 0) => {
  try {
    const params = {};
    if(term){
      params.search = term
    }else{
      console.log('test');
    }
   if(ownerCompany){
      params.company_all_or_my = ownerCompany;
      params.page = pagination.page;
      params.limit = pagination.limit;
    }else{

      console.log('test');
    }
    if(formSearch){
      Object.assign(params, formSearch);
    }else{
      console.log('test');
    }
      params.page = pagination.page;
      params.limit = pagination.limit;
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies`, {
      headers:{
        Authorization: `Bearer ${token}`
      },
      params : params,
    })
    setAllCompany(response.data.data)
    setTotalRows(response.data.pagination.totalData)
    setPending(false);
  } catch (error) {
    if (error.response.status === 401 && error.response.data.message === "Unauthenticated") {
      localStorage.clear();
      window.location.href = "/login";
    }
    else if(error.response && error.response.status === 429) {
      const maxRetries = 3;
      if (retryCount < maxRetries) {
        setTimeout(() => {
          getAllCompany(retryCount + 1);
        }, 2000);
      } else {
        console.error('Max retry attempts reached. Unable to complete the request.');
      }
    }
    else if(error.response && error.response.status === 404){
      await setAllCompany([])
      await setTotalRows(0)
    }else {
      console.error('Unhandled error:', error);
    }
  }
  };

  const getAlltypeCompany = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies-type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCompanyType(res.data.data);
      })
      .catch(async(err) => {
        if (err.response.status === 401 && err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
        else if(err.response && err.response.status === 429){
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              getAlltypeCompany(retryCount + 1);
            }, 2000);
          } else {
            console.error('Max retry attempts reached. Unable to complete the request.');
          }
        } else {
          console.error('Unhandled error:', err);
        }
      });
  };

  const getSource = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies-source`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSource(res.data.data))
      .catch(async (err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
        else if(err.response && err.response.status === 429){
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              getSource(retryCount + 1);
            }, 2000);
          } else {
            console.error('Max retry attempts reached. Unable to complete the request.');
          }
        } else {
          console.error('Unhandled error:', err);
        }
      });
  };
  
  const getOwnerUser = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOwner(res.data.data))
      .catch(async(err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
        else if(err.response && err.response.status === 429){
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              getOwnerUser(retryCount + 1);
            }, 2000);
          } else {
            console.error('Max retry attempts reached. Unable to complete the request.');
          }
        } else {
          console.error('Unhandled error:', err);
        }
      });
  };
 

  const [assContact, setAssContact] = useState([]);

  const [assDeals, setAssDeals] = useState([]);

  const selectAssDeals = () => {
    const result = [];
    deals?.map((data) => {
      const dealsResult = {
        value: data.uid,
        label:data.deal_name,
      }
      result.push(dealsResult)
    })
    return result
  };

  const dataUser = () => {
    const result = [];
    owner?.map((data) => {
      const dataResult = {
        value: data.uid,
        label: data.name,
      };
      result.push(dataResult);
    });
    return result;
  };

  const typeCompany = () => {
    const result = [];
    companyType?.map((data) => {
      const dataResult = {
        value: data.uid,
        label: data.name,
      };
      result.push(dataResult);
    });
    return result;
  };

  const dataSource = () => {
    const result = [];
    source?.map((data) => {
      const resultData = {
        value: data.uid,
        label: data.name,
      };
      result.push(resultData);
    });
    return result;
  };


  const selectUid = (state) => {
    const selectedRows = state.selectedRows.map((row) => row.uid);
    setSelectedUIDs(selectedRows);
  };
  const donwloadAll = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const uid of selectedUIDs) {
        formData.append("company_uid[]", uid);
      }

      const donwload = axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/companies/export/excel`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: donwload.data.message,
        text: "Successfully delete company",
        icon: "success",
      });
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      }
    }
  };

  const handleCompanyMyOrPerson = (e) => {
    const target = e.target.value;
    if(target === "all"){
      setOwnerCompany("all")
    }else{
      setOwnerCompany("my")
    }
    }

    const selectContact = () => {
       const result = [];
       contact?.map((data) => {
        const conAss = {
          value: data.uid,
          label: data.name
        }
        result.push(conAss)
       })
       return result
    }
    const [resultTypeCompany, setResultTypeCompany] = useState([])
    const [resultCompanySource, setResultCompanySource] = useState([])
  const handleSubmitSearch = (e) => {
    e.preventDefault()
    const formSearchMultiple = {
      owner: resultOwner.value || '',
      associate_contact: assContact.value || '',
      associate_deals: assDeals.value || '',
      company_name : searchMultiple.name || '',
      website_url : searchMultiple.website_url || '',
      address : searchMultiple.address || '',
      created_at: searchMultiple.created_at || '',
      company_type : resultTypeCompany.value || '',
      company_source : resultCompanySource.label || '',
      }
    setFormSearch(formSearchMultiple)
  };
  const handleSubmitDeleteSelect = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak dapat mengembalikan data ini setelah menghapusnya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });
    if (result.isConfirmed) {
      try {
        const formData = new FormData();
        for (const uid of selectedUIDs) {
          formData.append("company_uid[]", uid);
        }
        // console.log("FormData Content:");
        // for (const pair of formData.entries()) {
        //   console.log(pair[0] + ": " + pair[1]);
        // }
        const deleteSelect = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/companies/delete/item`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire({
          title: deleteSelect.data.message,
          text: "Successfully delete company",
          icon: "success",
        });
        window.location.reload();
      } catch (error) {
        if (error.response) {
          Swal.fire({
            text: error.response.data.message,
            icon: "warning",
          });
        }
      }
    }
  };

 
  const [pending, setPending] = useState(true);

  const fetchData = async () => {
    try {
      setPending(true);
      await getAllCompany(token, search, ownerCompany, formSearch);
      await getOwnerUser();
      await getSource();
      await getAlltypeCompany();
      await getContact();
      await getDeals();
    } catch (error) {
      console.error("error in fetch data", error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, search, ownerCompany, formSearch, pagination.page, pagination.limit]);
  const handleChangePage = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handlePagePerChange = (pageSize, page) => {
    setPagination((prev) => ({ ...prev, pageSize, page }));
  };


  function handleSearch(e) {
    if(e.key === "Enter"){
      const value = e.target.value.toLowerCase();
      setSearch(value)
    }
  }
  const columns = [
    {
      id: 1,
      name: "Company Name",
      selector: (row) => (
        <a href={`/company/${row.uid}/edit`} target="_blank" className="image-name text-decoration-none">
          <div className="d-flex align-items-center">
            <img src={IconCompany} style={{ width: "20px" }} />
            <div className="mt-1">
              <span className="fw-semibold" style={{ whiteSpace: "normal", color: "black" }}>
                {row.name}
              </span>
            </div>
          </div>
        </a>
      ),
      left: true,
      width: "160px",
      sortable: true,
    },
    {
      id: 2,
      name: "Associated with",
      selector: (row) => (
        <div className="d-flex">
          {row?.associate?.slice(0, 3).map((item, index) => (
            <div key={index} className="d-flex">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    {item?.contact?.name ?? null}
                    <br />
                    {item?.contact?.phone?.[0]?.number}
                  </Tooltip>
                }
              >
                <div>
                  {item?.contact ? (
                    <img
                      className="ms-1"
                      src={phone}
                      style={{ width: "18px" }}
                      data-tip={item?.contact?.name}
                    />
                  ) : null}
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    {item?.deals?.deal_name ?? null}
                    <br />
                    {item?.deals?.deal_size
                      ? `Rp. ${new Intl.NumberFormat().format(
                          item?.deals?.deal_size
                        )}`
                      : null}
                  </Tooltip>
                }
              >
                <div>
                {item?.deals ? (
                  <img
                    className="ms-1"
                    src={IconMoney}
                    style={{ width: "18px" }}
                    data-tip={item?.deals?.dealName}
                  />
                ) : null}
                </div>
              </OverlayTrigger>
            </div>
          ))}
        </div>
      ),
      sortable: true,
      width: "130px",
    },
    {
      id: 3,
      name: "Type",
      selector: (row) => (
        <div className="badge bg-primary">{row?.company_type?.name}</div>
      ),
      sortable: true,
    },
    {
      id: 4,
      name: "Owner/Created",
      selector: (row) => {
        const date = new Date(row.created_at);
        const formatOptions = {
          year: "numeric",
          month: "long",
          day: "2-digit",
        };
        const formate = new Intl.DateTimeFormat("en-US", formatOptions);
        const time = formate.format(date);
        return (
          <div className="mt-2">
            <span className="fw-semibold" style={{ whiteSpace: "normal" }}>
              {row?.owner?.name}
            </span>
            <p className="mt-1" style={{ fontSize: "9.8px" }}>
              {time}
            </p>
          </div>
        );
      },
      sortable: true,
      width: "120px",
    },
    {
      id: 5,
      name: "Updated",
      selector: (row) => {
        const date = new Date(row.updated_at);
        const formatOptions = {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        const formatResult = new Intl.DateTimeFormat("en-US", formatOptions);
        const time = formatResult.format(date);
        return (
          <p
            className="mt-2"
            style={{ fontSize: "11px", whiteSpace: "normal" }}
          >
            {time}
          </p>
        );
      },
      sortable: true,
      width: "120px",
    },
    {
      id: 6,
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          {/* <button
            title="show"
            className="icon-button"
            onClick={() => navigate(`/company/${row.uid}`)}
          >
            <i className="bi bi-building-fill"></i>
          </button> */}
          <a
            className="ms-2 icon-button text-dark"
            title="edit"
            href={`/company/${row.uid}/edit`} target="_blank" 
          >
            <i className="bi bi-pen"></i>
          </a>
          <button
            className="ms-2 icon-button"
            title="delete"
            onClick={() => setDeleteCompany(row.uid)}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      ),
      width: "150px",
    },
  ];

  return (
    <>
      <body id="body">
        <Topbar />
        <Sidebar />
        <Main>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="pagetitle">
                  <h1>Company</h1>
                  <nav>
                    <ol className="breadcrumb mt-2">
                      <li className="breadcrumb-item">
                        <a href="/" className="text-decoration-none">
                          Dashboard
                        </a>
                      </li>
                      <li className="breadcrumb-item active fw-bold">
                        Company
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="row button-contact mb-2">
              <div className="col d-flex mb-2">
                <div class="dropdown button-flex">
                  <button
                    class="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
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
                  >
                    Donwload
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item"
                        onClick={donwloadAll}
                        style={{ cursor: "pointer" }}
                      >
                        Donwload Selected
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        onClick={donwloadAll}
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
                >
                  Bulk Change
                </a>
                <button
                  class="btn btn-danger ms-2 delete"
                  onClick={handleSubmitDeleteSelect}
                >
                  Delete
                </button>
              </div>
            </div>
            <Card className="shadow">
              <div className="row">
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
                            options={dataUser()}
                            onChange={(e) =>  setResultOwner(e)}
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
                            options={selectContact()}
                            onChange={(e) =>
                              setAssContact(e)
                            }
                            closeMenuOnSelect={false}
                          />
                        </div>
                        <div className="col mt-3">
                          <Select
                            options={selectAssDeals()}
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
                              options={typeCompany()}
                              name="company_type_uid"
                              onChange={(e) => setResultTypeCompany(e)}
                            />
                          </div>
                          <div className="mb-1">
                            <Select
                              placeholder="Source Company"
                              closeMenuOnSelect={false}
                              options={dataSource()}
                              onChange={(e) =>
                                setResultCompanySource(e)
                              }
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
                <div className={`${datatableClass}`} id="datatable-content">
                  <OverlayTrigger placement="top" overlay={showTooltip}>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={toggleSideBarCard}
                      style={{ fontSize: "0.85rem" }}
                    >
                      <i className={iconFilter}></i>
                    </button>
                  </OverlayTrigger>
                  <div className="col-md-4 ms-5 mt-5 float-end">
                    <div className="input-group search-users">
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
                        className="form-control"
                        onKeyDown={handleSearch}
                        placeholder="search company"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                  </div>
                  <DataTable
                    columns={columns}
                    data={allCompany}
                    defaultSortFieldId={1}
                    pagination
                    paginationServer
                    selectableRows
                    onSelectedRowsChange={selectUid}
                    paginationPerPage={pagination.limit}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handlePagePerChange}
                    progressPending={pending}
                    paginationTotalRows={totalRows}
                    paginationComponentOptions={{
                      noRowsPerPage: true,
                    }}
                  />
                </div>
              </div>
              <DeleteCompany
                onClose={handleDeleteCompany}
                visible={deleteCompany !== false}
                uid={deleteCompany}
              />
            </Card>
          </div>
          <Footer />
        </Main>
      </body>
    </>
  );
};

export default Company;
