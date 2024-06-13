import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { GetStaging } from "../../../action/StagingDealSecond";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const StatusDeals = ({ show, handleClose, data, uid }) => {
  const [inputData, setInputData] = useState([]);
  const token = localStorage.getItem("token");
  const handleInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const { ResultStageDeals } = useSelector((state) => state.DataStage);

  const handleSubmit = async(e) => {
    e.preventDefault();
    let timerInterval;
    try {
      const confirmationResult = await Swal.fire({
        title: "Apakah Kamu yakin untuk Close Lost?",
        icon: "question",
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
        formData.append("staging_uid", inputData.status_deals || "");
        formData.append("lost_reason", inputData?.lost_reason || "")
        formData.append("lost_competitor", inputData?.lost_competitor || "")
        formData.append("lost_machine_qty", inputData?.lost_machine_qty || "")
        formData.append("_method", "put");
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/v2/deals/${uid}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        Swal.close();
        await Swal.fire({
          title: response.data.message,
          icon: "success",
        });
        window.location.reload();
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetStaging(token));
  }, [dispatch]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Pilih Stage</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="" className="mb-2" style={{ fontWeight: "600" }}>
            Select Status
          </label>
          <select
            name="status_deals"
            id=""
            className="form-select"
            onClick={handleInput}
            required
          >
            <option value="">Select Choose</option>
            {Array.isArray(ResultStageDeals)
              ? ResultStageDeals.filter(
                  (item) => item.name === "Closed Lost"
                ).map((item, index) => (
                  <option key={index} value={item.uid}>
                    {item.name}
                  </option>
                ))
              : "-"}
          </select>
        </div>
        {inputData.status_deals === "M-s3254fdg" ? (
          <>
            <div className="mb-3">
              <h6 className="fw-bold ms-2 mt-3">Alasan</h6>
              <ReactQuill className="p-2" theme="snow" onChange={(value) => handleInput({ target: {name: "lost_reason", value}})} />
            </div>
            <div className="mb-3">
              <h6 className="fw-bold ms-2 mt-3">Kompetitor</h6>
              <ReactQuill className="p-2" theme="snow" onChange={(value) => handleInput({ target: {name:"lost_competitor", value}})} />
            </div>
            <div className="mb-3">
              <h6 className="fw-bold ms-2 mt-3">Kompetitor Quantity / Quality Mesin</h6>
              <ReactQuill className="p-2" theme="snow" onChange={(value) => handleInput({ target: {name:"lost_machine_qty", value}})} />
            </div>
          </>
        ) : (
          ""
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StatusDeals;
