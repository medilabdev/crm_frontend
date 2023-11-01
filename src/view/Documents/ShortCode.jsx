import React from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useState } from "react";
import Dummy from "./Dummy";
const ShortCode = () => {
  const [search, setSearch] = useState(Dummy);
  const columns = [
    {
      name: "Short Code Variable",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Detail Code",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button className="btn btn-primary rounded-circle me-2" title="edit">
            <i class="bi bi-grid-1x2"></i>
          </button>
          <button className="btn btn-danger rounded-circle" title="delete">
            <i className="bi bi-trash-fill "></i>
          </button>
        </div>
      ),
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
              <h1>Short Code</h1>
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
          <div className="row">
            <Card className="shadow">
              <div className="container">
                <div className="row">
                  <div className="col-md-3 p-2 border-end">
                    <div className="d-flex flex-column mt-4 border rounded shadow">
                      <Link
                        to="/documents"
                        className="text-decoration-none text-black fw-semibold border-bottom documents"
                      >
                        <div className="input-group">
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
                        to="/Short-Code"
                        className="text-decoration-none text-black fw-semibold border-bottom documents "
                      >
                        <div className="input-group active-side">
                          <i class="bi bi-file-code fs-4 ms-2"></i>
                          <h5 className="p-1 mt-1 ms-2">Short Code</h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="row mt-4">
                      <div className="col mt-3">
                        <button className="btn btn-outline-primary">
                          Add Short Code
                        </button>
                        <button className="btn btn-outline-danger ms-2 ">
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
                              placeholder="Search..."
                              onChange={handleSearch}
                              className="form-control search"
                              style={{ fontSize: "0.85rem" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <DataTable
                      data={search}
                      columns={columns}
                      pagination
                      defaultSortFieldId={1}
                      selectableRows
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

export default ShortCode;
