import React, { useEffect, useState } from "react";
import "./../Edit/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import StatusDeals from "./StatusDeals";
import Swal from "sweetalert2";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import { token } from "../partials/ColumnsTable";
const TopButton = ({
  handleShowFQP,
  ShowFQP,
  handleShowLPP,
  ShowLPP,
  handleShowFDC,
  ShowFDC,
  data,
  uid,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const handleShowModalStatus = () => setButtonStatus(true);
  const handleCloseModalStatus = () => setButtonStatus(false);
  const position = localStorage.getItem("position");
  const stage = data.staging?.name;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleApprove = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Approved!",
      text: "Apakah kamu yakin untuk approve ini?",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Approve",
      denyButtonText: `Cancel`,
    }).then((res) => {
      if (res.isConfirmed) {
        const formData = new FormData();
        formData.append("temporary_deals_uid[0]", uid);
        formData.append("_method", "put");
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/v2/deals/accepted/manager`,
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
              text: "Successfully delete deals",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Failed Accepted",
              iconL: "warning",
            });
          });
      }
    });
  };

  const handleReject = async (e) => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "<b>Alasan Reject</b>",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });
    if (text) {
      Swal.fire(text);
    }
  };

  return (
    <div className="row">
      <div className="col mt-2">
        <button className="btn btn-primary" onClick={handleShowModalStatus}>
          <span className="fs-6 me-2">Status:</span>
          <span className="fw-semibold fs-6">{data?.staging?.name}</span>
        </button>
        <StatusDeals
          show={buttonStatus}
          handleClose={handleCloseModalStatus}
          data={data.staging?.name}
          uid={uid}
        />

        <div className="d-flex float-end">
          {position === "pRGYXVKdzCPoQ8" ||
          position === "pRGYXVKdzCPoQ1" ||
          position === "_dLjLFdH-Nw8vg8U" ? (
            <>
              <button
                className="btn btn-success me-2"
                style={{ fontSize: "0.85rem", fontWeight: "600" }}
                onClick={handleApprove}
              >
                Approve
              </button>
              <button
                className="btn btn-danger me-2"
                style={{ fontSize: "0.85rem", fontWeight: "600" }}
                onClick={handleReject}
              >
                Reject
              </button>
            </>
          ) : (
            "- "
          )}
          <a
            id={isVisible ? `floatingButtonFQP` : ""}
            className={`btn ${ShowFQP ? "btn-secondary" : "btn-primary"} me-2`}
            onClick={handleShowFQP}
            style={{ fontSize: "0.85rem", fontWeight: "600" }}
            href="#FQP"
          >
            <FontAwesomeIcon
              icon={ShowFQP ? faEyeSlash : faEye}
              className="me-2"
            />
            {ShowFQP ? "Closed" : "Open"} FQP
          </a>
          {stage !== "leads" ? (
            <a
              id={isVisible ? `floatingButtonLPP` : ""}
              className={`btn ${
                ShowLPP ? "btn-secondary" : "btn-primary"
              }  me-2`}
              onClick={handleShowLPP}
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
              href="#LPP"
            >
              <FontAwesomeIcon
                icon={ShowLPP ? faEyeSlash : faEye}
                className="me-2"
              />
              {ShowLPP ? "Closed" : "Open"} LPP
            </a>
          ) : (
            ""
          )}
          {stage !== "leads" && stage !== "Approaching" ? (
            <a
              id={isVisible ? `floatingButtonFDC` : ""}
              className={`btn ${
                ShowFDC ? "btn-secondary" : "btn-primary"
              }  me-2`}
              onClick={handleShowFDC}
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
              href="#FDC"
            >
              <FontAwesomeIcon
                icon={ShowFDC ? faEyeSlash : faEye}
                className="me-2"
              />
              {ShowFDC ? "Closed" : "Open"} FDC
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default TopButton;
