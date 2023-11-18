import React, { useState } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Documents/style.css";
import DataTable from "react-data-table-component";
import Dummy from "../Documents/Dummy";
const Documents = () => {
  const [search, setSearch] = useState(Dummy);
  const columns = [
    {
      name: "Name Document",
      selector: (row) => row.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Owner",
      selector: (row) => row.owner,
      sortable: true,
    },
    {
      name: "Created",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Updated",
      selector: (row) => row.updated_at,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <button className="ms-2 icon-button" title="preview">
            <i class="bi bi-eye fs-6 "></i>
          </button>
          <button className="ms-2 icon-button" title="Donwload PDF">
            <i class="bi bi-file-earmark-pdf-fill"></i>
          </button>
          <button className="ms-2 icon-button" title="delete">
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      ),
      width: "160px",
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
                <h1>Documents</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <Link to="/" className="text-decoration-none">
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Document</li>
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
                    <div className="d-flex flex-column border rounded shadow mt-4">
                      <Link
                        to="/documents"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group active-side">
                          <i class="bi bi-file-earmark-post fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">Documents</h5>
                        </div>
                      </Link>
                      <Link
                        to="/templates"
                        className="text-decoration-none text-black fw-semibold border-bottom documents"
                      >
                        <div className="input-group">
                          <i class="bi bi-file-earmark-richtext fs-4 ms-2"></i>
                          <h5 className="mt-2 ms-2">Templates</h5>
                        </div>
                      </Link>
                      <Link
                        to="/short-Code"
                        className="text-decoration-none text-black fw-semibold border-bottom documents"
                      >
                        <div className="input-group">
                          <i class="bi bi-file-code fs-4 ms-2"></i>
                          <h5
                            className="p-1 mt-1 ms-2"
                            style={{ fontWeight: 600 }}
                          >
                            Short Code
                          </h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="row mt-4">
                      <div className="col mt-3 float-end">
                        <button className="btn btn-primary mb-2">
                          Create Document
                        </button>
                        <button className="btn btn-outline-danger ms-2 mb-2">
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
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
                              placeholder="Search Documents..."
                              onChange={handleSearch}
                              className="form-control search"
                              style={{
                                fontSize: "0.85rem",
                              }}
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

export default Documents;
