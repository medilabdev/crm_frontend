import {
  faBuildingColumns,
  faCity,
  faCode,
  faCodeBranch,
  faCreditCard,
  faMoneyBill,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const ModalBank = ({ data, show, handleClose }) => {
  const token = localStorage.getItem("token");
  const [editBank, setEditBank] = useState({});

  useEffect(() => {
    setEditBank(data);
  }, [data]);
  const uidBank = editBank.uid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditBank({
      ...editBank,
      [name]: value,
    });
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
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
        const formData = new FormData();
        formData.append("bank_name", editBank.bank_name || "");
        formData.append("branch_bank", editBank?.branch_bank || "");
        formData.append("account_name", editBank?.account_name || "");
        formData.append("city", editBank?.city || "");
        formData.append(
          "bank_account_number",
          editBank?.bank_account_number || ""
        );
        formData.append("currency", editBank?.currency || "");
        formData.append("swift_code", editBank?.swift_code || "");
        formData.append("_method", "put");
        for (const pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/v2/fdc-document/bank/${uidBank}`,
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
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Bank</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Input in here"
                className="form-control"
                name="bank_name"
                value={editBank.bank_name || ""}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">
                <FontAwesomeIcon icon={faBuildingColumns} /> Nama Bank
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Input in here"
                className="form-control"
                name="branch_bank"
                value={editBank.branch_bank || ""}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">
                <FontAwesomeIcon icon={faCodeBranch} /> Cabang
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Input in here"
                className="form-control"
                name="account_name"
                value={editBank.account_name || ""}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">
                <FontAwesomeIcon icon={faUserTie} /> Nama Account (A/N)
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Input in here"
                className="form-control"
                name="city"
                value={editBank?.city || ""}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">
                <FontAwesomeIcon icon={faCity} /> Kota
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Input in here"
                className="form-control"
                name="bank_account_number"
                value={editBank?.bank_account_number || ""}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">
                <FontAwesomeIcon icon={faCreditCard} /> No. Rekening
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Input in here"
                className="form-control"
                name="currency"
                value={editBank?.currency || ""}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">
                <FontAwesomeIcon icon={faMoneyBill} /> Mata Uang
              </label>
            </div>
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            placeholder="Input in here"
            className="form-control"
            name="swift_code"
            value={editBank?.swift_code || ""}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">
            <FontAwesomeIcon icon={faCode} /> Swift Code
          </label>
        </div>
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

export default ModalBank;
