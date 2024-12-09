import { faCheckCircle, faPenToSquare, faPeopleLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ModalDireksi from "./ModalDireksi";
import { Accordion, Card } from "react-bootstrap";

const EditDireksi = ({ valueOld, data }) => {
  const [editModal, setEditModal] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setEditModal(item);
    setShow(true);
  };
  const typeHospital = data?.company?.hospital_type?.name || '';
  
  return (
    <>
      <div class="header-box">
       <FontAwesomeIcon icon={faPeopleLine} className="me-2" /> DATA DIREKSI
              </div>
      <Accordion defaultActiveKey="0">
      {valueOld.map((item, index) => (
  !((typeHospital === "PT" || typeHospital === "Yayasan") && 
    (item?.position === "Kepala Rumah Sakit" || item?.position === "Kepala perawat HD")) ? (
      <Accordion.Item eventKey={index} key={index}>
        <Accordion.Header>
          {item?.position}
          {item?.position && item?.name && item?.phone_number && item?.email && (
            <FontAwesomeIcon icon={faCheckCircle} className="text-success ms-2" title="Data Sudah Ada" />
          )}
        </Accordion.Header>
        <Accordion.Body>
        <table className="mb-2">
            <tr className="fw-medium mb-4">
              <td style={{ width: "300px", fontSize: "0.9rem" }}>Jabatan</td>
              <td className="px-1">:</td>
              <td>{item?.position || ""}</td>
            </tr>
            <tr className="fw-medium">
              <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
              <td className="px-1">:</td>
              <td>{item?.name || ""}</td>
            </tr>
            <tr className="fw-medium">
              <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
              <td className="px-1">:</td>
              <td>{item.phone_number || ""}</td>
            </tr>
            <tr className="fw-medium">
              <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
              <td className="px-1">:</td>
              <td>{item?.email || ""}</td>
            </tr>
          </table>
          
          <button
            className="btn btn-success"
            onClick={() => handleShow(item)}
          >
            <FontAwesomeIcon icon={faPenToSquare} /> Edit
          </button>
        </Accordion.Body>
      </Accordion.Item>
        ) : null
    ))}

      </Accordion>
     
      <ModalDireksi
        data={editModal}
        show={show !== false}
        handleClose={handleClose}
      />
    </>
  );
  
};

export default EditDireksi;
