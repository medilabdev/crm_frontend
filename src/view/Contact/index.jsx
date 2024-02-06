import React, { useEffect, useState } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Footer from "../../components/Template/Footer";
import Main from "../../components/Template/Main";
import DataTable from "react-data-table-component";
import dumyData from "./Dummy/index";
import Card from "../../components/Card";
import IconImage from "../../assets/img/profile.png";
import "../Contact/style.css";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import DeleteContact from "./Modals/deleteContact";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import IconCompany from "../../assets/img/condo.png";
import IconMoney from "../../assets/img/coin.png";
import { debounce } from 'lodash';

const Contact = () => {
  const token = localStorage.getItem("token");
  const [isSidebarToggleCard, setSidebarToggled] = useState(false);
  const [selectUid, setSelectedUid] = useState([]);

  const toggleSidebarCard = () => {
    setSidebarToggled(!isSidebarToggleCard);
  };

  const filterClass = isSidebarToggleCard
    ? "col-md-3 d-block border-end"
    : "col-sm-0 d-none";

  const datatableClass = isSidebarToggleCard ? "col-md-9" : "col-sm-12";

  const IconFilter = isSidebarToggleCard ? "bi bi-x-lg" : "bi bi-funnel";

  const showTooltip = isSidebarToggleCard ? (
    <Tooltip id="tooltip">Close Filter</Tooltip>
  ) : (
    <Tooltip id="tooltip">Show Filter</Tooltip>
  );

  const [deleteContact, setDeleteContact] = useState(false);
  const handleDeleteContact = () => setDeleteContact(false);
  const [contact, setContact] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const [source, setSource] = useState([]);
  const [associateCompany, setAssociateCompany] = useState([]);
  const [associateDeals, setAssociateDeals] = useState([])
  const [searchMultiple, setSearchMultiple] = useState({
    name: "",
    email: "",
    position: "",
    address: "",
    created_at: "",
    city: "",
  });

  const navigate = useNavigate();
  const TokenAuth = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [ownerContact, setOwnerContact] = useState([])
  const [formSearch, setFormSearch] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  
  const getSource = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies-source`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSource(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }else if(err.response.status === 429){
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              getSource(retryCount + 1);
            }, 2000);
          } else {
            console.error('Max retry attempts reached. Unable to complete the request.');
          }
        }else {
          console.error('Unhandled error:', err);
        }
      });
  };
  
  const getCompany = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies/form/select`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAssociateCompany(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }else if(err.response.status === 429){
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              getCompany(retryCount + 1);
            }, 2000);
          } else {
            console.error('Max retry attempts reached. Unable to complete the request.');
          }
        }else {
          console.error('Unhandled error:', err);
        }
      });
  };


  const getAllUser = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        } else if(err.response.status === 429){
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              getAllUser(retryCount + 1);
            }, 2000);
          } else {
            console.error('Max retry attempts reached. Unable to complete the request.');
          }
        }else {
          console.error('Unhandled error:', err);
        }
      });
  };

  const getContactAll = async (token, term, ownerContact, formSearch, retryCount = 0) => {
    try {
      const params = {};
      if(term){
        params.search = term
      }
      if(ownerContact){
        params.contact_all_or_my = ownerContact;
        params.page = pagination.page;
        params.limit = pagination.limit;
      }
      if(formSearch){
        Object.assign(params, formSearch)
        if (!params.page) {
          params.page = pagination.page;
        }
        if (!params.limit) {
          params.limit = pagination.limit;
        }
      }
      params.page = pagination.page;
      params.limit = pagination.limit;
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params : params
      });
      setContact(response.data.data);
      setTotalRows(response.data.pagination.totalData);
      setPending(false)
    } catch (error) {
      if (error.response.status === 401 && error.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getContactAll(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      }
      else if(error.response && error.response.status === 404){
        setContact([])
        setTotalRows(0)
      }
      else{
        console.error('Unhandled error:', error);
      }
    }
  };
  const getDeals = (retryCount = 0) => {
    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/deals/form/select`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setAssociateDeals(res.data.data))
    .catch((err) => {
      if (err.response.status === 401 && err.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      }else if(err.response && err.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getDeals(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      }else {
        console.error('Unhandled error:', err);
      }
    });
  }
 

  const handleSearchMultiple = (e) => {
    setSearchMultiple({
      ...searchMultiple,
      [e.target.name]: e.target.value,
    });
  };

  const selectUser = () => {
    const result = [];
    user?.map((data) => {
      const dataUser = {
        value: data.uid,
        label: data.name,
      };
      result.push(dataUser);
    });
    return result;
  };

  const [resultDeals, setResultDeals] = useState([]);
  const selectDeals = () => {
    const result = [];
    associateDeals?.map((data) => {
      const dataDeals = {
        value: data.uid,
        label: data.deal_name
      }
      result.push(dataDeals)
    })
    return result;
  };

  const [resultCompany, setResultCompany] = useState([])
  const selectAssociateCompany = () => {
   const result = [];
   associateCompany?.map((data) => {
    const dataResult = {
      value: data.uid,
      label:data.name
    }
    result.push(dataResult)
   })
   return result
  };


  const [selectedSource, setSelectSource] = useState([]);


  const selectSource = () => {
    const result = [];
    source?.map((data) => {
      const dataSource = {
        value: data.uid,
        label: data.name,
      };
      result.push(dataSource);
    });
    return result;
  };

  const [pending, setPending] = useState(true);


  const fetchData = async () => {
    try {
      setPending(true);
      await getContactAll(TokenAuth, search, ownerContact, formSearch);
      await getAllUser();
      await getSource();
      await getCompany();
      await getDeals();
    } catch (error) {
      console.error('Error in fetchData:', error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
  fetchData();
}, [TokenAuth, search, ownerContact,  formSearch, pagination.page, pagination.limit]);

  const handleChangePage = (page) => {
    setPagination((e) => ({ ...e, page }));
  };
  
  const handlePagePerChange = (pageSize, page) => {
    setPagination((prev) => ({ ...prev, pageSize, page }));
  };

  const handleFilter = (e) => {
    if(e.key === "Enter"){
      const value = e.target.value.toLowerCase();
      setSearch(value)
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <a href={`/contact/${row.uid}/edit`} target="_blank" className="image-name text-decoration-none ">
          <div className="d-flex align-items-center">
            <img src={IconImage} className="rounded-circle" />
            <div className="mt-3">
              <span className="fw-semibold" style={{ whiteSpace: "normal", color:'black' }}>
                {row.name}
              </span>
              <p
                className="mt-1"
                style={{
                  fontSize: "11px",
                  color:"#163020"
                }}
              >
                {row.position}
              </p>
            </div>
          </div>
        </a>
      ),
      left: true,
      width: "160px",
    },
    {
      name: "Contact Info",
      selector: (row) => (
        <p style={{ fontSize: "0.85rem" }}>{row?.phone?.[0]?.number}</p>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Associated With",
      selector: (row) => (
        <div className="d-flex">
          {row?.associate?.slice(0, 3).map((item, index) => (
            <div key={index} className="d-flex">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  {item?.company?.name ? item?.company?.name : null}
             
                </Tooltip>
              }
            >
              <div>
                {item?.company ? (
                  <img
                    className="ms-1"
                    src={IconCompany}
                    style={{ width: "18px" }}
                    data-tip={item?.company?.name}
                  />
                ) : null}
              
              </div>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>
              {item?.deals?.deal_name ?? null}
                  <br />
                  {item?.deals?.deal_size
                    ? `Rp. ${new Intl.NumberFormat().format(
                        item?.deals?.deal_size
                      )}`
                    : null}
            </Tooltip>}>
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
      width: "150px",
    },
    {
      name: "Created/Updated",
      selector: (row) => {
        const createdAt = new Date(row.created_at);
        const updatedAt = new Date(row.updated_at);
        const formatOptions = {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        const formatter = new Intl.DateTimeFormat("en-US", formatOptions);
        const createdDateTime = formatter.format(createdAt);
        const updatedDateTime = formatter.format(updatedAt);

        return (
          <div className="mt-1">
            <p
              className="mt-1"
              style={{ fontSize: "0.85rem", whiteSpace: "normal" }}
            >
              {createdDateTime}
            </p>
            <p
              style={{
                marginTop: "-12px",
                fontSize: "0.85rem",
                whiteSpace: "normal",
              }}
            >
              {updatedDateTime}
            </p>
          </div>
        );
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Owner",
      selector: (row) => (
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id={`tooltip-${row?.owner?.name}`}>
              {row?.owner?.name}
            </Tooltip>
          }
        >
          <div className="image-name">
            <img
              src={IconImage}
              className="rounded-circle"
              data-tip={row.name}
            />
          </div>
        </OverlayTrigger>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <a
           href={`/contact/${row.uid}/edit`} target="_blank"
           className="ms-2 icon-button text-dark"
            title="edit"
          >
            <i className="bi bi-pen edit"></i>
          </a>
          <button
            className="ms-2 icon-button"
            title="delete"
            onClick={() => setDeleteContact(row.uid)}
          >
            <i className="bi bi-trash-fill danger"></i>
          </button>
        </div>
      ),
      width: "150px",
    },
  ];
  

  const handleContactMyOrPerson = (e) => {
    const target = e.target.value;
    if(target === "all"){
      setOwnerContact('all')
    }else{
      setOwnerContact("my")
    }
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const formSearchMultiple = {
      owner: selectedUser.value || '',
      associate_company: resultCompany.value || '',
      associate_deals: resultDeals.value || '',
      contact_name: searchMultiple.name || '',
      email:searchMultiple.email || '',
      position: searchMultiple.position || '',
      source: selectedSource.label || '',
      address:searchMultiple.address || '',
      city: searchMultiple.city || '',
      created_at:searchMultiple.created_at || '',
    }
    setFormSearch(formSearchMultiple)
  };

  const selectUidDataTable = (state) => {
    const select = state.selectedRows.map((row) => row.uid);
    setSelectedUid(select);
  };

  const handleDeleteSelected = async (e) => {
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
        for (const uid of selectUid) {
          formData.append("contact_uid[]", uid);
        }
        const deleteForSelect = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/contacts/delete/item`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire({
          title: deleteForSelect.data.message,
          text: "Successfully delete contact",
          icon: "success",
        });
        window.location.reload();
      } catch (error) {
        if (error.response.data.message === "Unauthenticated") {
          Swal.fire({
            title: error.response.data.message,
            text: "Tolong Login Kembali",
            icon: "warning",
          });
          localStorage.clear();
          window.location.href = "/login";
        }
        if (error.message) {
          Swal.fire({
            text: error.response.data.message,
            icon: "warning",
          });
        }
      }
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
              <div className="pagetitle">
                <h1>Contact</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <Link to="/" className="text-decoration-none">
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item active fw-bold">Contact</li>
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
                  Add Contact
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to="/single-contact">
                      Single Contact
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/contact/upload-file">
                      Upload File
                    </Link>
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
                to="/contact/bulk-change"
                class="btn btn-outline-primary ms-2 bulk-change"
              >
                Bulk Change
              </Link>
              <button
                class="btn btn-danger ms-2 delete"
                onClick={handleDeleteSelected}
              >
                Delete
              </button>
            </div>
          </div>

          <Card className="shadow">
            <div className="row">
              <div className={` ${filterClass}`} id="filter">
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
                      <select
                        className="form-select"
                        style={{ fontSize: "0.85rem" }}
                        name="select"
                        onChange={handleContactMyOrPerson}
                      >
                        <option value="all">All Contact</option>
                        <option value="my">My Contact</option>
                      </select>
                    </div>
                  </div>
                  <form onSubmit={handleSubmitSearch}>
                    <div className="row mt-2">
                      <div className="col">
                        <Select
                          placeholder="Select Owner"
                          closeMenuOnSelect={false}
                          options={selectUser()}
                          onChange={(e) => setSelectedUser(e)}
                        />
                      </div>
                    </div>
                    {/* <div className="row mt-2">
                    <div className="col">
                      <select
                        name=""
                        id=""
                        className="form-select"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <option disabled e>
                          Team
                        </option>
                        <option value="">Team 1</option>
                        <option value="">Team 2</option>
                      </select>
                    </div>
                  </div> */}
                    <div className="row mt-5">
                      <div className="col">
                        <h6>
                          <i class="bi bi-link-45deg"></i>
                          <span className="fw-semibold ms-2">Associated</span>
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Select
                          placeholder="Select Company"
                          options={selectAssociateCompany()}
                          closeMenuOnSelect={false}
                          onChange={(e) => setResultCompany(e)}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col">
                        <Select
                          options={selectDeals()}
                          onChange={(e) => setResultDeals(e)}
                          placeholder="Select Deals"
                          closeMenuOnSelect={false}
                        />
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col">
                        <h6>
                          <i class="bi bi-person-circle"></i>
                          <span className="fw-semibold ms-2">Contacts</span>
                        </h6>
                      </div>
                    </div>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleSearchMultiple}
                        placeholder="name"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div className="mb-1">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={handleSearchMultiple}
                        placeholder="email"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        name="position"
                        onChange={handleSearchMultiple}
                        placeholder="Job Title"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div className="mb-1">
                      <Select
                        placeholder="Source"
                        options={selectSource()}
                        closeMenuOnSelect={false}
                        onChange={(e) =>setSelectSource(e)}
                      />
                    </div>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        onChange={handleSearchMultiple}
                        placeholder="Address"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        onChange={handleSearchMultiple}
                        placeholder="City"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <div className="mb-1">
                      <label htmlFor="date">Created</label>
                      <input
                        type="date"
                        name="created_at"
                        onChange={handleSearchMultiple}
                        className="form-control"
                        style={{ fontSize: "0.85rem" }}
                      />
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
                      href="/contact"
                      type="submit"
                      className="btn btn-secondary mt-2 ms-2 text-decoration-none"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Cancel
                    </a>
                  </form>
                </div>
              </div>
              <div className={` ${datatableClass}`} id="datatable-content">
                <OverlayTrigger placement="top" overlay={showTooltip}>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={toggleSidebarCard}
                    style={{
                      fontSize: "0.85rem",
                    }}
                  >
                    <i className={`${IconFilter}`}></i>
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
                      placeholder="search name..."
                      onKeyDown={handleFilter}
                      className="form-control search"
                      style={{
                        fontSize: "0.85rem",
                      }}
                    />
                  </div>
                </div>
                <DataTable
                  columns={columns}
                  data={contact}
                  defaultSortFieldId={1}
                  pagination
                  paginationServer
                  selectableRows
                  onSelectedRowsChange={selectUidDataTable}
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
            <DeleteContact
              onClose={handleDeleteContact}
              visible={deleteContact !== false}
              uid={deleteContact}
            />
          </Card>
          <Footer />
        </div>
      </Main>
    </body>
  );
};

export default Contact;
