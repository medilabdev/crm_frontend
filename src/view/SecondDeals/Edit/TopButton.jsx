import React, { useEffect, useState } from "react";
import "./../Edit/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faEye,
  faEyeSlash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import StatusDeals from "./StatusDeals";
import Swal from "sweetalert2";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import { token } from "../partials/ColumnsTable";
import HandleApprove from "./ShowFQP/part/HandleApprove";
const TopButton = ({
  handleShowFQP,
  ShowFQP,
  handleShowLPP,
  ShowLPP,
  handleShowFDC,
  ShowFDC,
  data,
  uid,
  handleShowRoi,
  showFormRoi,
  handleShowPks,
  showFormPks,
  HandleButtonActivity,
  showActivity,
  handleButtonWeeklyReport,
  showWeeklyReport
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

  
  const statusLevel = data?.staging?.name

  const uidFqp = data?.fqp_document?.need_approval?.uid ?? null ;
  const uidLpp = data?.lpp_document?.need_approval?.uid ?? null ;
  const uidRoi = data?.need_approval?.uid ?? null
  
  
  
  const uidForm = statusLevel === "leads" ? uidFqp : statusLevel === "Approaching" ? uidLpp : statusLevel === "Decide" ? uidRoi : '' ;

  
  const handleApprove = async (e) => {
    e.preventDefault();
    let timerInterval;
    try {
      const confirmationResult = await Swal.fire({
        title: "Apakah Kamu yakin untuk Approve?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Approve",
        cancelButtonText: "Close",
      });
      if (confirmationResult.isConfirmed) {
        Swal.fire({
          title: "Loading...",
          html: "Tolong Tunggu <b></b> Beberapa Detik.",
          timer: 2500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
        const formData = new FormData();
        formData.append("temporary_deals_uid[0]", uidForm);
        formData.append("_method", "put");

        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/v2/deals/accepted/manager`,
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
          text: "Approval Successfully",
          icon: "success",
        });
        window.location.reload();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    }
  };
  
  const handleReject = async (e) => {
    let timerInterval;
    try {
      const { value: text, isConfirmed } = await Swal.fire({
        input: "textarea",
        inputLabel: "Alasan Reject",
        inputPlaceholder: "Type your message here...",
        inputAttributes: {
          "aria-label": "Type your message here",
        },
        showCancelButton: true,
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
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
        const formData = new FormData();
        formData.append("notes", text);
        formData.append("temporary_deals_uid[0]", uidForm);
        formData.append("_method", "put");
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/v2/deals/rejected/manager`,
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
          icon: "success",
        });
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    }
  };
  const uidPerson = localStorage.getItem("uid");
  const ownerUserUidDeals = data.owner_user_uid;
  const statusDeals = data?.staging?.name;
  const handleReffresh = () => {
    window.location.reload();
  };

  return (
    <div className="row button-second-deals">
      <div className="col mt-2">
        <button
          className={`btn ${
            statusDeals === "Closed Won" || statusDeals === "Implementation"
              ? "btn-success"
              : statusDeals === "Closed Lost"
                ? "btn-danger"
                : "btn-primary"
          }`}
          onClick={
            uidPerson === ownerUserUidDeals
              ? handleShowModalStatus
              : handleReffresh
          }
        >
          <span className="fs-6 me-2">Status:</span>
          <span className="fw-semibold fs-6">{data?.staging?.name}</span>
        </button>
        <StatusDeals
          show={buttonStatus}
          handleClose={handleCloseModalStatus}
          data={data.staging?.name}
          uid={uid}
        />

        <div className="button-container d-flex float-end" >
        <button
              className={`btn ${
                showWeeklyReport ? "btn-secondary" : "btn-primary"
              } text-white me-2`}
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
              onClick={handleButtonWeeklyReport}
            >
              <FontAwesomeIcon
                icon={showWeeklyReport ? faEyeSlash : faEye }
                className="me-2"
              />
              Task
            </button>
          {((position === "pRGYXVKdzCPoQ8" && statusLevel === "leads") || (position === "pRGYXVKdzCPoQ8" && statusLevel === "Approaching") || (position === "adsfasdf1321" && statusLevel === "Decide") || (position ==="pRGYXVKdzCPoQ1" && statusLevel === "Decide")) && uidForm ? (
              <>
              <HandleApprove handleApprove={handleApprove} handleReject={handleReject}/>
              </>
          ): "" }

          {((position === "pRGYXVKdzCPoQ8" ||
            position === "_dLjLFdH-Nw8vg8U" ||
            position === "pRGYXVKdzCPoQ1" || 
            position === "T6pWdcQ8gxwgGA") &&
            stage !== "leads" &&
            stage !== "Approaching" &&
            stage !== "Decide") ||
          (uidPerson === ownerUserUidDeals &&
            stage !== "leads" &&
            stage !== "Approaching" &&
            stage !== "Decide") ? (
            <button
              className={`btn ${
                showFormPks ? "btn-secondary" : "btn-success"
              } text-white me-2`}
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
              onClick={handleShowPks}
            >
              <FontAwesomeIcon
                icon={showFormPks ? faEyeSlash : faEye}
                className="me-2"
              />
              {position === "T6pWdcQ8gxwgGA" ? "Upload PKS" : "PKS"}
            </button>
          ) : (
            ""
          )}
          {(position === "pRGYXVKdzCPoQ8" ||
            position === "_dLjLFdH-Nw8vg8U" ||
            position === "pRGYXVKdzCPoQ1" || 
            position === "adsfasdf1321"
          ) &&
          stage !== "leads" &&
          stage !== "Approaching" ? (
            <button
              className={`btn ${
                showFormRoi ? "btn-secondary" : "btn-success"
              } me-2`}
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
              onClick={handleShowRoi}
            >
              <FontAwesomeIcon
                icon={showFormRoi ? faEyeSlash : faEye}
                className="me-2"
              />
              {(position !== "pRGYXVKdzCPoQ8") || (stage ==="Closed Won" || stage === "Implementation") 
                ? "ROI"
                : "Upload ROI"}
            </button>
          ) : (
            ""
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


          {stage !== "leads" ? 
            (position === "pRGYXVKdzCPoQ8" && data?.lpp_document !== null) || position === "_dLjLFdH-Nw8vg" || position === "pRGYXVKdzCPoQ1" || position === "_dLjLFdH-Nw8vg8U" || position === "adsfasdf1321" || position === "1-bZKHtNZCFWGg" || position === "573MloZ8j--aaQ" || position === "SzhgAQn6tP48xw" || position === "_dLjLFdH-Nw8vg8U_005" ? (
            <a
              id={isVisible ? (position === "1-bZKHtNZCFWGg" || position === "573MloZ8j--aaQ" || position === "SzhgAQn6tP48xw")  ? `floatingButtonLPPTech` :  `floatingButtonLPP` : ""}
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
          ) : "" : (
            ""
          )}

          {position !== "1-bZKHtNZCFWGg" && position !== "573MloZ8j--aaQ" && position !== "SzhgAQn6tP48xw" ? 
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
 : ''}
 

          {position !== "SzhgAQn6tP48xw" && position !== "1-bZKHtNZCFWGg" && position !== "573MloZ8j--aaQ" && position !== "_dLjLFdH-Nw8vg8U_004" && position !== "adsfasdf1321" ? (
             <button className={`btn ${showActivity !== true ? "btn-primary" : "btn-secondary"} me-2`} style={{ fontSize: "0.85rem", fontWeight: "600" }} onClick={HandleButtonActivity}><FontAwesomeIcon icon={faClipboardCheck} className="me-2 " />Activity</button>
          ) : ''} 
         
        </div>
      </div>
    </div>
  );
};

export default TopButton;
