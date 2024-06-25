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
    selector: (row) =>{ 
      const createdDate = new Date(row?.created_at)
      const currentDate = new Date();
      const twoDaysAgo = new Date(currentDate)
      twoDaysAgo?.setDate(currentDate.getDate() - 2)
      const isNew = createdDate > twoDaysAgo; 
      return (
      <div>
      <a
        href={`/deals-second/${row.uid}/edit`}
        target="_blank"
        className="text-decoration-none fw-semibold"
        style={{ whiteSpace: "normal", color: "black" }}
      >
        {row?.fqp_document?.hospital?.name ?? "-"}
      </a>
        {isNew && <span className="badge bg-primary ms-2">New</span> }
      </div>
    )},
    width:'200px',
    left:true
  },
  {
    name: "Stage",
    selector: (row) => (
      <div>
        <p
          className={`btn mt-3 ${
            row.staging?.name === "Closed Won" || row.staging?.name === "Implementation"
              ? "btn-success"
              : row.staging?.name === "Closed Lost"
                ? "btn-danger"
                : "btn-primary"
          }`}
          style={{ fontSize: "0.65rem", fontWeight: "600" }}
        >
          {row.staging?.name ?? "-"}
        </p>
      </div>
    ),
    hide:'sm',
    left:true
  },
  {
    name: "Owner",
    selector: (row) => {
      // console.log(row);
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
        <div>
          <p
            className="mt-2 fw-bold"
            style={{
              fontSize: "0.90rem",
              fontWeight: "bold",
              whiteSpace: "normal",
            }}
          >
            {row.owner?.name ?? "-"}
          </p>
          <p
            style={{
              fontSize: "0.70rem",
              marginTop: "-8px",
              whiteSpace: "normal",
            }}
          >
            {time}
          </p>
        </div>
      );
    },
      hide:'sm',
      left:true
    
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="action-icon">
        {row.owner_user_uid === uid ? (
          <>
            <a
              href={`/deals-second/${row.uid}/edit`}
              className="me-2 icon-button text-dark"
              target="_blank"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </a>
            <button
              className="icon-button"
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
            className="me-2 icon-button text-dark"
            target="_blank"
          >
            <FontAwesomeIcon icon={faEye} />
          </a>
        )}
      </div>
    ),
    left:true
  },
];

export const CustomStyles = {
  head: {
    style: {
      fontWeight: "650",
    },
  },
};
