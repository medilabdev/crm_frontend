import axios from "axios";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FormPks = ({ data }) => {
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
          <div className="col mb-2">
            {position !== "_dLjLFdH-Nw8vg" ? (
              <table className="mb-4">
                <tr className="fw-medium">
                  <td style={{ width: "150px", fontSize: "0.9rem" }}>
                    File Perjanjian Kerja Sama
                  </td>
                  <td className="px-1">:</td>
                  <td>
                    <a
                      className="btn btn-primary"
                      href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/${data.pks_document}`}
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
            ) : (
              <>
                {data.pks_document ? (
                  <table className="mb-4">
                    <tr className="fw-medium">
                      <td style={{ width: "150px", fontSize: "0.9rem" }}>
                        File Perjanjian Kerja Sama
                      </td>
                      <td className="px-1">:</td>
                      <td>
                        <a
                          className="btn btn-primary"
                          href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/${data.pks_document}`}
                          target="_blank"
                          style={{
                            whiteSpace: "normal",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                          }}
                        >
                          {data?.pks_document || "-"}
                        </a>
                      </td>
                    </tr>
                  </table>
                ) : (
                  ""
                )}
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
                  <hr />
                  <button
                    className="btn btn-primary me-2"
                    onClick={handleSubmit}
                  >
                    Simpan
                  </button>
                  <button className="btn btn-secondary">Kembali</button>
                </div>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FormPks;
