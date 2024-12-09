import { faCircleCheck, faEye, faPenToSquare, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Action from "./part/Action";

const FormPks = ({ data, dataPks }) => {
  
  const token = localStorage.getItem("token");
  const position = localStorage.getItem("position");
  const uid = useParams();
  const [inputPks, setInputPks] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInputPks(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let timerInterval;
      const { isConfirmed } = await Swal.fire({
        title: "Apakah kamu yakin untuk menyimpan?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });
      if (isConfirmed) {
        Swal.fire({
          title: "Loading...",
          html: "Tolong Tunggu <b></b> Beberapa Detik.",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            if (timer) {
              timerInterval = setInterval(() => {
                if (timer.textContent) {
                  timer.textContent = `${Swal.getTimerLeft()}`;
                }
              }, 100);
            }
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
        const formData = new FormData();
        formData.append("pks_document", inputPks || "");
        formData.append("_method", "put");
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/v2/deals/${uid.uid}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.close();
        await Swal.fire({
          title: response.data.message,
          text: "Upload Perjanjian Kerja Sama Successfully",
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      } else {
        Swal.fire({
          text: "Something went wrong !",
          icon: "error",
        });
      }
    }
  };
  
  return (
    <div>
      <Card>
        <Card.Header>
          <span className="fs-5 fw-semibold">Perjanjian Kerja Sama</span>
        </Card.Header>
        <Card.Body>
         
        
        {(data?.staging?.name === "Implementation" &&( position === "pRGYXVKdzCPoQ1" || position === "pRGYXVKdzCPoQ8")) ? 
        <>
          <table className="mb-4">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
                File PKS
              </td>
              <td className="px-1">:</td>
              <td>
                <a
                  className="btn btn-primary"
                  href={`${process.env.REACT_APP_BACKEND_URL}/storage/file/deals/${data.pks_document}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {data?.pks_document || "-"}{" "}
                </a>
              </td>
            </tr>
          </table>
        </>
        : ( 
        <div className="row mt-3">
          <div className="col-md-12 mb-2">
            <table className="table table-bordered table-striped table-hover">
              <thead className="thead-light">
                <tr>
                  <th>File PKS</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(dataPks) && dataPks.length > 0 && !(data?.staging?.name === "Implementation" && position === "pRGYXVKdzCPoQ1") ? (
                  dataPks.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <a
                          className="btn btn-primary btn-sm"
                          href={`${process.env.REACT_APP_BACKEND_IMAGE}/storage/file/deals/${row.file}`}
                          target="_blank"
                        >
                          {row?.file || "-"}
                        </a>
                      </td>
                      <td>
                        {row.is_status === "review_sales" ? (
                          <button className="btn btn-primary btn-sm">Review Sales</button>
                        ) : row.is_status === "review_manager" ? (
                          <button className="btn btn-info btn-sm text-white">Review Sales Manager</button>
                        ) : row.is_status === "reject" ? (
                          <button className="btn btn-danger btn-sm">Reject</button>
                        ) : (
                          <button className="btn btn-success btn-sm">Approved</button>
                        )}
                      </td>
                      <td>
                        {new Date(row.created_at).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>
                        <Action position={position} row={row} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Tidak Ada Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>)
      }


      <div className="col-md-12 mt-4">
          {position === "T6pWdcQ8gxwgGA" ?  
                          <>
                                <hr />
                          <label
                            htmlFor="floatingInput"
                            className="mb-2"
                            style={{ fontWeight: "600" }}
                          >
                            Upload File Perjanjian Kerja Sama
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="file"
                            onChange={handleFileChange}
                          />
                          <div className="mt-4">
                            <button
                              className="btn btn-primary me-2"
                              onClick={handleSubmit}
                            >
                              Simpan
                            </button>
                            <button className="btn btn-secondary">Kembali</button>
                          </div>
                          </>
                          : ``}
      </div>
         
        </Card.Body>
      </Card>
    </div>
  );
};

export default FormPks;
