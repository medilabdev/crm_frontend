import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
export const token = localStorage.getItem("token");
export const position = localStorage.getItem("position");
export const uid = localStorage.getItem("uid");
export const ColumnsTable = [
  {
    name: "Name",
    selector: (row) => { 
      const createdDate = new Date(row?.created_at);
      const currentDate = new Date();
      const twoDaysAgo = new Date(currentDate);
      twoDaysAgo?.setDate(currentDate.getDate() - 2);
      const isNew = createdDate > twoDaysAgo; 
      return (
        <div> {/* Apply Open Sans */}
          <a
            href={`/deals-second/${row.uid}/edit`}
            target="_blank"
            className="text-decoration-none"
            style={{ whiteSpace: "normal", color: "black", fontWeight: 600 ,fontFamily:"Nunito Sans, sans-serif", fontSize:"0.9rem" }}
          >
            {row?.fqp_document?.hospital?.name ?? "-"}
          </a>
          {isNew && <span className="badge bg-primary ms-2">New</span>}
        </div>
      );
    },
    width: '200px',
    left: true
  },
  {
    name: "Stage",
    selector: (row) => (
      <div style={{ fontFamily:"Nunito Sans, sans-serif" }}> {/* Apply Open Sans */}
        <p
          className={`btn mt-3 ${
            row.staging?.name === "Closed Won" || row.staging?.name === "Implementation"
              ? "btn-success"
              : row.staging?.name === "Closed Lost"
                ? "btn-danger"
                : "btn-primary"
          }`}
          style={{ fontSize: "0.75rem" }}
        >
          {row.staging?.name ?? "-"}
        </p>
      </div>
    ),
    hide: 'sm',
    left: true
  },
  {
    name: "Owner",
    selector: (row) => {
      const date = new Date(row.created_at);
      const formatDate = {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      const formatResult = new Intl.DateTimeFormat("en-US", formatDate);
      const time = formatResult.format(date);
      return (
        <div style={{ fontFamily:"Nunito Sans sans-serif", }}> {/* Apply Open Sans */}
          <p
            className="mt-2 fw-bold"
            style={{
              fontSize: "0.90rem",
              fontWeight: "bold",
              whiteSpace: "normal",
              fontFamily: "Nunito Sans, sans-serif",
            }}
          >
            {row.owner?.name ?? "-"}
          </p>
          <p
            style={{
              fontSize: "0.78rem",
              marginTop: "-8px",
              whiteSpace: "normal",
              fontFamily: "Nunito Sans, sans-serif",
            }}
          >
            {time}
          </p>
        </div>
      );
    },
    hide: 'sm',
    left: true
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="action-icon" style={{ fontFamily: "Nunito Sans, sans-serif" }}> {/* Apply Open Sans */}
        {row.owner_user_uid === uid ? (
          <>
            <a
              href={`/deals-second/${row.uid}/edit`}
              className="me-2 text-white btn btn-primary btn-sm"
              target="_blank"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </a>
            <button
              className="text-white btn btn-danger btn-sm"
              onClick={() => {
                Swal.fire({
                  title: "Konfirmasi",
                  text: "Apakah kamu yakin ingin menghapus ini deals ini?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ya, Hapus!",
                  cancelButtonText: "Batal",
                }).then((res) => {
                  if (res.isConfirmed) {
                    axios
                      .delete(
                        `${process.env.REACT_APP_BACKEND_URL}/v2/deals/${row.uid}`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                      .then((res) => {
                        Swal.fire({
                          title: res.data.message,
                          text: "Successfully delete deals",
                          icon: "success",
                        }).then((res) => {
                          if (res.isConfirmed) {
                            window.location.reload();
                          }
                        });
                      })
                      .catch((err) => {
                        if (err.response.data.message === "Delete failed!") {
                          Swal.fire({
                            title: "Delete Failed",
                            text: "Tidak dapat menghapus, data master ini terkait dengan data lainnya",
                            icon: "warning",
                          });
                        }
                      });
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        ) : (
          <a
            href={`/deals-second/${row.uid}/edit`}
            className="me-2 text-white btn btn-primary btn-sm"
            target="_blank"
          >
            <FontAwesomeIcon icon={faEye} />
          </a>
        )}
      </div>
    ),
    left: true
  },
];

export const CustomStyles = {
   headCells: {
    style: {
      fontSize: "2rem", // Sesuaikan ukuran font header
      fontWeight: "bold", // Atur agar teks lebih tebal
      textTransform: "uppercase", // Atur huruf menjadi kapital
      color: "black", // Sesuaikan warna jika perlu
      backgroundColor: "#F7F9F2", // Sesuaikan warna latar belakang header jika diperlukan
      padding: "9px 12px", // Sesuaikan padding untuk header
      borderTop: "2px solid #CBDCEB",
    },
  },
  cells: {
    style: {
      padding: "1px 5px",
      fontFamily:"Nunito Sans, sans-serif",
    },
  },
};
