import { faPenToSquare, faPeopleLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ModalDireksi from "./ModalDireksi";
import { Card } from "react-bootstrap";

const EditDireksi = ({ valueOld, data }) => {
  const [editModal, setEditModal] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setEditModal(item);
    setShow(true);
  };
  return (
    <>
      <div class="alert alert-primary mt-2" role="alert">
        <h6 style={{ fontWeight: "700" }}>
          <FontAwesomeIcon icon={faPeopleLine} className="me-2" /> Data Direksi
        </h6>
      </div>
      {valueOld.map((item, index) => (
        <Card className="shadow-sm">
          <Card.Body>
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
                <td style={{ width: "200px", fontSize: "0.9rem" }}>
                  No. Telepon
                </td>
                <td className="px-1">:</td>
                <td>{item.phone_number || ""}</td>
              </tr>
              <tr className="fw-medium ">
                <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
                <td className="px-1">:</td>
                <td>{item?.email || ""}</td>
              </tr>
            </table>
          </Card.Body>
          <Card.Footer>
            <button
              className="btn btn-success"
              onClick={() => handleShow(item)}
            >
              <FontAwesomeIcon icon={faPenToSquare} /> Edit
            </button>
          </Card.Footer>
        </Card>
      ))}
      <ModalDireksi
        data={editModal}
        show={show !== false}
        handleClose={handleClose}
      />
    </>
  );
};

export default EditDireksi;
