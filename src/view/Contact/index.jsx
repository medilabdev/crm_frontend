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
import { Row, Col, OverlayTrigger, Tooltip, Button, Badge } from "react-bootstrap";
import DeleteContact from "./Modals/deleteContact";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import IconCompany from "../../assets/img/condo.png";
import IconMoney from "../../assets/img/coin.png";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faChevronDown,
  faChevronRight,
  faFilter,
  faMagnifyingGlass,
  faPenToSquare,
  faPhone,
  faSackDollar,
  faTrash,
  faX,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "./Partials/Breadcrumb";
import TopButton from "./Partials/TopButton";
import { useMediaQuery } from "react-responsive";


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

  const IconFilter = isSidebarToggleCard ? faX : faFilter;

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
  const [associateDeals, setAssociateDeals] = useState([]);
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
  const [ownerContact, setOwnerContact] = useState([]);
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
        } else if (err.response.status === 429) {
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              getSource(retryCount + 1);
            }, 2000);
          } else {
            console.error(
              "Max retry attempts reached. Unable to complete the request."
            );
          }
        } else {
          console.error("Unhandled error:", err);
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
        } else if (err.response.status === 429) {
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              getCompany(retryCount + 1);
            }, 2000);
          } else {
            console.error(
              "Max retry attempts reached. Unable to complete the request."
            );
          }
        } else {
          console.error("Unhandled error:", err);
        }
      });
  };

  const getAllUser = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users?limit=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        } else if (err.response.status === 429) {
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              getAllUser(retryCount + 1);
            }, 2000);
          } else {
            console.error(
              "Max retry attempts reached. Unable to complete the request."
            );
          }
        } else {
          console.error("Unhandled error:", err);
        }
      });
  };

  const getContactAll = async (
    token,
    term,
    ownerContact,
    formSearch,
    retryCount = 0
  ) => {
    try {
      const params = {};
      if (term) {
        params.search = term;
      }
      if (ownerContact) {
        params.contact_all_or_my = ownerContact;
        params.page = pagination.page;
        params.limit = pagination.limit;
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
      params.page = pagination.page;
      params.limit = pagination.limit;
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/contacts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: params,
        }
      );
      setContact(response.data.data);
      setTotalRows(response.data.pagination.totalData);
      setPending(false);
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.data.message === "Unauthenticated"
      ) {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getContactAll(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else if (error.response && error.response.status === 404) {
        setContact([]);
        setTotalRows(0);
      } else {
        console.error("Unhandled error:", error);
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
        if (
          err.response.status === 401 &&
          err.response.data.message === "Unauthenticated"
        ) {
          localStorage.clear();
          window.location.href = "/login";
        } else if (err.response && err.response.status === 429) {
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
        } else {
          console.error("Unhandled error:", err);
        }
      });
  };

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
        label: data.deal_name,
      };
      result.push(dataDeals);
    });
    return result;
  };

  const [resultCompany, setResultCompany] = useState([]);
  const selectAssociateCompany = () => {
    const result = [];
    associateCompany?.map((data) => {
      const dataResult = {
        value: data.uid,
        label: data.name,
      };
      result.push(dataResult);
    });
    return result;
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
      await getAllUser();
      await getSource();
      await getCompany();
      await getDeals();
    } catch (error) {
      console.error("Error in fetchData:", error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [TokenAuth]);

  useEffect(() => {
    try {
      setPending(true)
      getContactAll(TokenAuth, search, ownerContact, formSearch);
    } catch (error) {
      console.error("Error in fetchData:", error);
    }finally{
      setPending(false); 
    }
  },[ TokenAuth,
    search,
    ownerContact,
    formSearch,
    pagination.page,
    pagination.limit,
  ]);


  const handleChangePage = (page) => {
    setPagination((e) => ({ ...e, page }));
  };

  const handlePagePerChange = (pageSize, page) => {
    setPagination((prev) => ({ ...prev, pageSize, page }));
  };

  const handleFilter = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value.toLowerCase();
      setSearch(value);
    }
  };

  
  const conditionalRowStyles = [
    {
      when : row => !!row.pending_deletion_request,
      style : {
        opacity : 0.6,
        backgroundColor: '#f8f9fa',
      }
    }
  ];

  const isMobile = useMediaQuery({ maxWidth : 767 })
  
  const ExpandedComponent = ({ data }) => {
    const associatedCompanies = data?.associate?.slice(0, 3)
    .map((item) => item?.company?.name)
    .filter((name) => name)
    .join(" & ");

    const associatedDeals = data?.associate?.slice(0, 3)
    .map((item) => item?.deals?.deal_name)
    .filter((name) => name)
    .join(" & ");

    const createdAt = new Date(data.created_at);
    const updatedAt = new Date(data.updated_at);
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
    const isPending = !!data.pending_deletion_request;

    return (
      <>
      <div>
        {isPending && (
            <div className="mt-3" style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
                <span style={{ fontWeight: 400 }}>Status : </span>
                <Badge bg="warning" text="dark">Pending Approval</Badge>
            </div>
        )}

        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Contact :</span>  
          {data?.phone?.[0]?.number ?? '-'}
        </div>


        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Assosiasi Perusahaan : </span>  
         {associatedCompanies}
        </div>

        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Assosiasi Deals : </span>  
         {associatedDeals}
        </div>

        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Owner : </span>  
          {data?.owner?.name ?? '-'}
        </div>
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Dibuat : </span>  
          {createdDateTime}
        </div>
        {data?.created_at !== data?.updated_at ?  
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Diperbarui : </span>  
          {updatedDateTime}
        </div>
        : ""}
        <div className="mt-3 d-flex" style={{ marginLeft: "1rem", marginBottom: "1rem" }}> 
            <span style={{ fontWeight : 400 }}>Action : </span>
            <div className="ms-2">
                {/* Tombol Edit dan Hapus di-disable jika pending */}
                <Button variant="primary" size="sm" href={`/contact/${data.uid}/edit`} target="_blank" disabled={isPending}>
                    Edit
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => isPending ? null : setDeleteContact(data.uid)}
                    disabled={isPending}
                >
                    Hapus
                </Button>
            </div>
        </div>
      </div>
      </>
    );
  };


  
  const columns = [
    {
    name: "Name",
    selector: (row) => {
      const createdDate = new Date(row?.created_at);
      const updatedDate = new Date(row?.updated_at);
      const now = new Date();
      const twoDaysAgo = new Date(now.setDate(now.getDate() - 2));

      const isNew = createdDate > twoDaysAgo;
      const isUpdate = updatedDate > twoDaysAgo && updatedDate > createdDate;

      return (
        <a
          href={`/contact/${row.uid}/edit`}
          target="_blank"
          className="text-decoration-none text-dark"
        >
          <div>
            <span style={{ fontWeight: "500", fontSize: "0.9rem" }}>
              {row.name}
            </span>

            {/* 🔸 Pending Deletion */}
            {row.pending_deletion_request && (
              <Badge
                bg="warning"
                text="dark"
                className="ms-2"
                style={{ fontSize: "0.6rem" }}
              >
                Pending
              </Badge>
            )}

            {/* 🔴 Rejected Deletion */}
            {
              (() => {
                const rejection = row.latest_deletion_request;
                if (!rejection || rejection.status !== 'rejected') return null;
                if (!rejection.approved_or_rejected_at) return null;

                const rejectedAt = new Date(rejection.approved_or_rejected_at);
                const now = new Date();
                const hoursSinceReject = (now - rejectedAt) / (1000 * 60 * 60);

                if (hoursSinceReject > 1) return null;

                
                return (
                  <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-reject-${row.uid}`}>
                      <div>
                        <strong>Rejected by:</strong>{" "}
                        {rejection?.approver?.name || "-"}
                        <br />
                        <strong>Date:</strong>{" "}
                        {new Date(rejection.approved_or_rejected_at).toLocaleDateString("id-ID")}
                        <br />
                        <strong>Reason:</strong>{" "}
                        {rejection?.reason_for_rejection}
                      </div>
                    </Tooltip>
                  }
                >
                  <Badge
                    bg="danger"
                    className="ms-2 d-inline-flex align-items-center"
                    style={{ fontSize: "0.6rem", cursor: "help" }}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} className="me-1" />
                    Rejected
                  </Badge>
                </OverlayTrigger>
                )
              })
            }


            {/* 🟦 New / 🟩 Updated */}
            {isNew && (
              <span
                className="badge rounded-pill bg-primary ms-2"
                style={{ fontSize: "0.6rem" }}
              >
                New
              </span>
            )}
            {!isNew && isUpdate && (
              <span
                className="badge rounded-pill bg-success ms-2"
                style={{ fontSize: "0.6rem" }}
              >
                Updated
              </span>
            )}

            {/* 🔹 Position text */}
            <div style={{ fontSize: "0.75rem", color: "#666" }}>
              {row.position || "-"}
            </div>
          </div>
        </a>
      );
    },
    left: true,
    wrap: true,
    width: "200px",
    },

    {
      name: "Contact Info",
      selector: (row) => (
        <div style={{ fontSize: "0.85rem" }}>
          <FontAwesomeIcon icon={faPhone} className="me-2 text-muted" />
          {row?.phone?.[0]?.number ?? "-"}
        </div>
      ),
      width: "160px",
      left: true,
    },
    {
      name: "Associated With",
      selector: (row) => (
        <div className="d-flex align-items-center gap-3">
          {row?.associate?.slice(0, 3).map((item, index) => (
            <div key={index} className="d-flex gap-2">
              {item?.company && (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{item.company.name}</Tooltip>}
                >
                  <a href={`/company/${item.company.uid}/edit`} target="_blank" className="text-dark">
                    <FontAwesomeIcon icon={faBuilding} style={{ fontSize: "1.2rem" }} />
                  </a>
                </OverlayTrigger>
              )}
              {item?.deals && (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      {item.deals.deal_name}
                      <br />
                      {item.deals.deal_size
                        ? `Rp ${new Intl.NumberFormat().format(item.deals.deal_size)}`
                        : ""}
                    </Tooltip>
                  }
                >
                  <a href={`/deals/${item.deals.uid}/edit`} target="_blank" className="text-dark">
                    <FontAwesomeIcon icon={faSackDollar} style={{ fontSize: "1.2rem" }} />
                  </a>
                </OverlayTrigger>
              )}
            </div>
          ))}
        </div>
      ),
      width: "160px",
      left: true,
    },
    {
      name: "Owner (Created/Updated)",
      selector: (row) => {
        const createdAt = new Date(row.created_at);
        const updatedAt = new Date(row.updated_at);
        const format = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
  
        return (
          <div>
            <p className="fw-bold mb-1">{row?.owner?.name}</p>
            <p style={{ fontSize: "0.75rem", margin: 0 }}>{createdAt.toLocaleString("id-ID", format)}</p>
            <p style={{ fontSize: "0.75rem", margin: 0 }}>
              {createdAt.getTime() === updatedAt.getTime()
                ? "-"
                : updatedAt.toLocaleString("id-ID", format)}
            </p>
          </div>
        );
      },
      width: "250px",
      left: true,
    },
    {
      name: "Action",
       cell: (row) => { 
        const isPending = !!row.pending_deletion_request;
        return (
            <div className="d-flex gap-2">
                <OverlayTrigger placement="top" overlay={<Tooltip>Edit Contact</Tooltip>}>
                    <Button variant="outline-primary" size="sm" href={`/contact/${row.uid}/edit`} target="_blank" disabled={isPending}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={<Tooltip>{isPending ? "Deletion request is pending" : "Request Delete"}</Tooltip>}>
                    <span className="d-inline-block">
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => isPending ? null : setDeleteContact(row.uid)}
                            disabled={isPending}
                            style={isPending ? { pointerEvents: 'none' } : {}}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </span>
                </OverlayTrigger>
            </div>
        );
      },
      width: "140px",
    },
  ];

  

  const handleContactMyOrPerson = (e) => {
    const target = e.target.value;
    if (target === "all") {
      setOwnerContact("all");
    } else {
      setOwnerContact("my");
    }
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const formSearchMultiple = {
      owner: selectedUser.value || "",
      associate_company: resultCompany.value || "",
      associate_deals: resultDeals.value || "",
      contact_name: searchMultiple.name || "",
      email: searchMultiple.email || "",
      position: searchMultiple.position || "",
      source: selectedSource.label || "",
      address: searchMultiple.address || "",
      city: searchMultiple.city || "",
      created_at: searchMultiple.created_at || "",
    };
    setFormSearch(formSearchMultiple);
  };

  const selectUidDataTable = (state) => {
    const select = state.selectedRows.map((row) => row.uid);
    setSelectedUid(select);
  };

  const handleDeleteSelected = async (e) => {
    e.preventDefault();
    const isResult = await Swal.fire({
      title: `Request Deletion for ${selectUid.length} Selected Items?`,
      text: "This action will send a deletion request to an admin for approval.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Send Requests!",
      cancelButtonText: "Cancel",
    });

    if (isResult.isConfirmed) {
      try {
        const formData = new FormData();
        for (const uid of selectUid) {
          formData.append("contact_uid[]", uid);
        }

        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/contacts/request-delete/bulk`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        Swal.fire({
          title: "Requests Sent!",
          text: response.data.message,
          icon: "success",
        });
        window.location.reload();

      } catch (error) {
        if (error.response?.data?.message === "Unauthenticated.") {
          Swal.fire({
            title: error.response.data.message,
            text: "Tolong Login Kembali",
            icon: "warning",
          });
          localStorage.clear();
          window.location.href = "/login";
        } else if (error.response?.data?.message) {
          Swal.fire({
            text: error.response.data.message,
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "An Error Occurred",
            text: "Something went wrong, please try again.",
            icon: "error",
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
          <Breadcrumb />
          <TopButton handleDeleteSelected={handleDeleteSelected} />

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
                        onChange={(e) => setSelectSource(e)}
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
                    <FontAwesomeIcon icon={IconFilter} className="fs-4" />
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
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          className="fs-4"
                        />
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
                  conditionalRowStyles={conditionalRowStyles}
                  data={contact}
                  defaultSortFieldId={1}
                  pagination
                  paginationServer
                  selectableRows
                  responsive
                  onSelectedRowsChange={selectUidDataTable}
                  paginationPerPage={pagination.limit}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handlePagePerChange}
                  progressPending={pending}
                  paginationTotalRows={totalRows}
                  paginationComponentOptions={{
                    noRowsPerPage: true,
                  }}
                  selectableRowDisabled={row => !!row.pending_deletion_request}

                  highlightOnHover
                  expandableRows={isMobile}
                  expandableRowsComponent={isMobile ? ExpandedComponent : null}
                  expandableIcon={
                    isMobile ? {
                    collapsed: <FontAwesomeIcon icon={faChevronRight} />,
                    expanded: <FontAwesomeIcon icon={faChevronDown} isExpanded />
                    } : null
                  }
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
