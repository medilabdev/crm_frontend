import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faEye,
  faGears,
  faInfoCircle,
  faPenToSquare,
  faSquareXmark,
  faTools,
  faTrash,
  faX,
  faXRay,
} from "@fortawesome/free-solid-svg-icons";
import { handleDeleteDataTable } from "./System/Action";
import Icon from "../../../assets/img/man.png"
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
    selector: (row) => row.staging?.name ?? "-",
    cell: (row) => {
      const stageName = row.staging?.name ?? "-";
      
      const getIcon = () => {
        switch (stageName) {
          case "Closed Won":
            return <FontAwesomeIcon icon={faCheck} /> // Ikon checklist untuk Closed Won
          case "Implementation":
            return <FontAwesomeIcon icon={faTools} />; // Ikon tools untuk Implementation
          case "Closed Lost":
            return <FontAwesomeIcon icon={faSquareXmark} />; // Ikon silang untuk Closed Lost
          default:
            return <FontAwesomeIcon icon={faGears} />; // Ikon info untuk default
        }
      };
      // Gaya tombol berdasarkan nama stage
      const getButtonStyle = () => {
        switch (stageName) {
          case "Closed Won":
          case "Implementation":
            return {
              backgroundColor: "#e9f7ef", // Hijau
              color: "#198754",
            };
          case "Closed Lost":
            return {
              backgroundColor: "#f8d7da", // Merah
              color: "#dc3545",
            };
          default:
            return {
              backgroundColor: "#e7f1ff", // Biru
              color: "#0d6efd",
            };
        }
      };
  
      // Gaya kontainer teks
      const containerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Nunito Sans, sans-serif",
      };
  
      // Gaya tombol
      const buttonStyle = {
        ...getButtonStyle(),
        padding: "5px 10px",
        borderRadius: "15px",
        fontWeight: "600",
        textTransform:"uppercase"
      };
  
      return (
        <div style={containerStyle}>
          <span style={buttonStyle}>
          {getIcon()} {stageName}</span>
        </div>
      );
    },
    left: true, // Letakkan teks di kiri
  },
  
  {
    name: "Owner",
    selector: (row) => {
      const date = new Date(row.created_at);
      const formatDate = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      const formatResult = new Intl.DateTimeFormat("en-US", formatDate);
      const time = formatResult.format(date);
      return (
        <div className="d-flex align-items-center mt-2" style={{ fontFamily:"Nunito Sans sans-serif", }}> 
        <img
          src={Icon}
          alt={Icon}
          style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
        />
      <div>
          <div
            className="mb-2"
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              whiteSpace: "normal",
              fontFamily: "Nunito Sans, sans-serif",
            }}
          >
            {row.owner?.name ?? "-"}
          </div>
          <div
            style={{
              fontSize: "12px",
              marginTop: "-8px",
              whiteSpace: "normal",
              fontFamily: "Nunito Sans, sans-serif",
            }}
          >
            {time}
          </div>
          </div>
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
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={faEdit} style={{ color: "#0D6EFD", fontSize: "18px" }} />
            </a>
            <button
              className="text-white btn btn-danger btn-sm"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick ={(e) => handleDeleteDataTable(row?.uid, token, e)}
             
            >
              <FontAwesomeIcon icon={faTrash}  style={{ color: "#DD3F45", fontSize: "18px" }} />
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
    center: true
  },
];

export const CustomStyles = {
   headCells: {
    style: {
      fontSize: "18px", // Sesuaikan ukuran font header
      fontWeight: "semibold", // Atur agar teks lebih tebal
      textTransform: "uppercase", // Atur huruf menjadi kapital
      backgroundColor: "#f8f9fa", // Sesuaikan warna latar belakang header jika diperlukan
      padding: "9px 12px",  
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      minHeight: "72px",
      borderBottom: "1px solid #dee2e6",
    },
    highlightOnHoverStyle: {
      backgroundColor: "#f1f5f9",
    },
  },
};
