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
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("staging_uid", inputData.status_deals || "");
    formData.append("_method", "put");
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/v2/deals/${uid}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: res.data.message,
          text: "Successfully Created Data",
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        if (err.response) {
          Swal.fire({
            text: err.response.data.message,
            icon: "warning",
          });
        } else {
          Swal.fire({
            text: "Something went wrong !",
            icon: "error",
          });
        }
      });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetStaging(token));
  }, [dispatch]);
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
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
              <ReactQuill className="p-2" theme="snow" />
            </div>
            <div className="mb-3">
              <h6 className="fw-bold ms-2 mt-3">Kompetitor</h6>
              <ReactQuill className="p-2" theme="snow" />
            </div>
            <div className="mb-3">
              <h6 className="fw-bold ms-2 mt-3">Qty Mesin</h6>
              <ReactQuill className="p-2" theme="snow" />
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
