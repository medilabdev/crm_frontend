import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const InputRoi = ({ data }) => {
  const token = localStorage.getItem("token");
  const position = localStorage.getItem("position");
  const [inputRoi, setInputRoi] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInputRoi(file);
  };
  const uid = useParams();
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
        formData.append("roi_document", inputRoi || "");
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
          text: "Upload ROI Successfully",
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
    <Card>
      <Card.Header>
        <span className="fs-5 fw-semibold">Return on Investment</span>
      </Card.Header>
      <Card.Body>
        <div className="col mb-2">
          {data.roi_document ? (
            <table className="mb-4">
              <tr className="fw-medium">
                <td style={{ width: "150px", fontSize: "0.9rem" }}>
                  File Return on Investment
                </td>
                <td className="px-1">:</td>
                <td>
                  <a
                    className="btn btn-primary"
                    href={`${process.env.REACT_APP_BACKEND_IMAGE}/storage/file/deals/${data.roi_document}`}
                    target="_blank"
                    style={{
                      whiteSpace: "normal",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {data?.roi_document || "-"}{" "}
                  </a>
                </td>
              </tr>
            </table>
          ) : (
            ""
          )}
          {position === "pRGYXVKdzCPoQ8" ? 
          <>
          <label
            htmlFor="floatingInput"
            className="mb-2"
            style={{ fontWeight: "600" }}
          >
            Upload ROI
          </label>
          <input
            type="file"
            className="form-control"
            name="file"
            onChange={handleFileChange}
          />
       
        <div className="mt-4">
          <button className="btn btn-primary me-2" onClick={handleSubmit}>
            Simpan
          </button>
          <button className="btn btn-secondary">Kembali</button>
        </div>
        
        </>
        : "" }
        </div>
      </Card.Body>
    </Card>
  );
};

export default InputRoi;
