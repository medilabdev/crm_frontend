import React, { useState } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../Documents/style.css";
import DataTable from "react-data-table-component";
import Dummy from "../Documents/Dummy";
const Templates = () => {
  const [search, setSearch] = useState(Dummy);
  const columns = [
    {
      name: "Name Template",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <button
            className="ms-2 btn btn-primary"
            style={{ fontSize: "0.85rem" }}
          >
            Preview
          </button>
          <button
            className="ms-2 btn btn-danger"
            style={{ fontSize: "0.85rem" }}
          >
            Delete
          </button>
        </div>
      ),
      sortable: true,
    },
  ];
  const handleSearch = (e) => {
    const data = Dummy.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(data);
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
                <h1>Templates</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <Link to="/" className="text-decoration-none">
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Templates</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <Card className="shadow">
              <div className="container">
                <div className="row">
                  <div className="col-md-3 p-2 border-end">
                    <div className="d-flex flex-column mt-4 border rounded shadow">
                      <Link
                        to="/documents"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group">
                          <i class="bi bi-file-earmark-post fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">Documents</h5>
                        </div>
                      </Link>
                      <Link
                        to="/templates"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group active-side">
                          <i class="bi bi-file-earmark-richtext fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">Templates</h5>
                        </div>
                      </Link>
                      <Link
                        to="/Short-Code"
                        className="text-decoration-none text-black fw-semibold border-bottom documents"
                      >
                        <div className="input-group">
                          <i class="bi bi-file-code fs-4 ms-2"></i>
                          <h5 className="p-1 mt-1 ms-2">Short Code</h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="row mt-4">
                      <div className="col mt-3">
                        <button className="btn btn-outline-primary mb-2">
                          Upload Template
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col ">
                        <div className="float-end">
                          <div className="input-group mt-2 search-users">
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
                              onChange={handleSearch}
                              placeholder="Search Template..."
                              className="form-control search"
                              style={{ fontSize: "0.85rem" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <DataTable
                      columns={columns}
                      data={search}
                      pagination
                      selectableRows
                      defaultSortFieldId={1}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Main>
    </body>
  );
};

export default Templates;
