import React, { useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Card } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const UploadDeals = () => {
  const token = localStorage.getItem("token");
  const [uploadExcel, setUploadExcel] = useState({
    upload: null,
  });

  const hanldeChange = (e) => {
    const file = e.target.files[0];
    setUploadExcel({
      ...uploadExcel,
      upload: file,
    });
  };
  // console.log(uploadExcel);
  const handleUploadExcel = async(e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append("upload", uploadExcel.upload);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/deals/upload/excel`,
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
            text: "Successfully deleted",
            icon: "success",
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.href="/deals";
            }
          });
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            icon: "warning",
          });
        });
    } catch (error) {
      console.error(error);
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
                <h1>Upload Multiple Deals</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <a href="/" className="text-decoration-none">
                        Dashboard
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/deals" className="text-decoration-none">
                        Deals
                      </a>
                    </li>
                    <li className="breadcrumb-item active">Upload File</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <Card className="shadow">
            <div className="row">
              <div className="col-md-8">
                <div className="mt-5 ms-5">
                  <h6 className="fw-semibold">Add Multiple Deals</h6>
                  <p>Save time on adding more Deals</p>
                </div>
                <div className="mt-1 ms-4">
                  <div className="d-flex align-items-center">
                    <p className="btn btn-primary rounded fs-6 me-4 mt-3">1</p>
                    <span>
                      The maximum row for uploading multiple companies is 7000
                      rows. Prepare a file of your companies using our template.
                      '.csv' <span className="text-primary">csv template</span>
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="btn btn-primary rounded fs-6 me-4 mt-3">2</p>
                    <span>
                      Fill the companies you want based on our template and
                      upload the file from step 1 you've filled to add multiple
                      deals.
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="btn btn-primary rounded fs-6 me-4 mt-3">3</p>
                    <span>
                      The number of uploads affects the upload duration.
                    </span>
                  </div>
                  <form onSubmit={handleUploadExcel}>
                    <div className="mt-3 mb-3 ms-2 col-10">
                      <label className="mb-2 fs-6">Upload File</label>
                      <input
                        type="file"
                        className="form-control"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        name="upload"
                        onChange={hanldeChange}
                      ></input>
                    </div>
                    <div className="mb-4">
                      <a href="/deals" className="btn btn-secondary ms-2">
                        Back
                      </a>
                      <button className="btn btn-primary ms-3" type="submit">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mt-5 ms-3">
                  <h6 className="fw-semibold">Add Single Deals</h6>
                  <p>Enter a deals in the following form field</p>
                </div>
                <a
                  href="/deals/single-company"
                  className="btn btn-outline-primary ms-3 mb-5"
                >
                  Continue
                </a>
              </div>
            </div>
          </Card>
        </div>
      </Main>
    </body>
  );
};

export default UploadDeals;
