import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const NeedsApproval = () => {
  const token = localStorage.getItem("token");
  const [needApproval, setNeedApproval] = useState([]);
  const [search, setSearch] = useState([]);
  //   console.log(needApproval);
  const getNeedApproval = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deals/show/approval`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNeedApproval(res.data.data);
        setSearch(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };
  const handleFilter = (e) => {
    const newData = needApproval.filter((row) => {
      return row.deal_name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(newData);
  };
  useEffect(() => {
    getNeedApproval(token);
  }, [token]);
  const columns = [
    {
      name: "Name Deals",
      selector: (row) => row.deal?.deal_name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Created By",
      sortable: true,
    },
    {
      name: "Stage",
      selector: (row) => row.staging?.name,
    },
    {
      name: "Amount/Close",
      selector: (row) =>
        `Rp. ${new Intl.NumberFormat().format(row.deal?.deal_size)}`,
      sortable: true,
    },
    {
      name: "Priority",
      //   selector: (row) => row.deal?.priorities?.name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <button className="ms-2 icon-button" title="edit">
            <i className="bi bi-check2"></i>
          </button>
          <button className="icon-button" title="delete">
            <i className="bi bi-trash-fill danger"></i>
          </button>
        </div>
      ),
      width: "140px",
    },
  ];

  const customStyle = {
    headRow: {
      style: {
        background: "rgba(66, 125, 157, 0.9)",
        color: "white",
        fontWeight: "600",
        marginTop: "12px",
        borderRadius: "5px",
      },
    },
    selector: {
      style: {
        fontWeight: "700",
      },
    },
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
                <h1>Need Approval</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <Link to="/" className="text-decoration-none">
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/deals" className="text-decoration-none">
                        Deals
                      </Link>
                    </li>
                    <li className="breadcrumb-item active fw-bold">
                      Need Approval
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <Card>
            <div className="row mt-3">
              <div className="col-md-5 ms-3 mt-5">
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
                    onChange={handleFilter}
                    className="form-control search"
                    style={{
                      fontSize: "0.85rem",
                    }}
                  />
                </div>
              </div>
              <div className="p-4">
                <DataTable
                  columns={columns}
                  data={search}
                  pagination
                  defaultSortFieldId={1}
                  customStyles={customStyle}
                  paginationComponentOptions={paginationComponentOptions}
                />
              </div>
            </div>
          </Card>
        </div>
      </Main>
    </body>
  );
};

export default NeedsApproval;
