import React, { useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Card } from "react-bootstrap";
import Footer from "../../../components/Template/Footer";
import axios from "axios";
import Swal from "sweetalert2";

const FileUploadCompany = () => {
  const tokenAuth = localStorage.getItem("token");

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
  const handleUploadExcle = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("upload", uploadExcel.upload);
      const upload = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/companies/upload/excel`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${tokenAuth}`,
            },
          }
        )
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            text: "Successfullly created deals",
            icon: "success",
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.reload();
            }
          });
        });
    } catch (err) {
      if (err.response) {
        Swal.fire({
          text: err.response.data.message,
          icon: "warning",
        });
      } else {
        Swal.fire({
          text: "Something Went Wrong",
          icon: "error",
        });
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
                <h1>Upload Multiple Companies</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <a href="/" className="text-decoration-none">
                        Dashboard
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/company" className="text-decoration-none">
                        Company
                      </a>
                    </li>
                    <li className="breadcrumb-item active">Upload File</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <Card className="shadow">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="mt-5 ms-5">
                  <h6 className="fw-semibold">Add Multiple Companies</h6>
                  <p>Save time on adding more companies</p>
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
                      companies.
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="btn btn-primary rounded fs-6 me-4 mt-3">3</p>
                    <span>
                      The number of uploads affects the upload duration.
                    </span>
                  </div>
                  <form onSubmit={handleUploadExcle}>
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
                      <a href="/company" className="btn btn-secondary ms-2">
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
                  <h6 className="fw-semibold">Add Single Company</h6>
                  <p>Enter a company in the following form field</p>
                </div>
                <a
                  href="/company/single-company"
                  className="btn btn-outline-primary ms-3 mb-5"
                >
                  Continue
                </a>
              </div>
            </div>
          </div>
        </Card>

        <Footer />
      </Main>
    </body>
  );
};

export default FileUploadCompany;
