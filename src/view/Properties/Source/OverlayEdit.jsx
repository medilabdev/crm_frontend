import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import Swal from "sweetalert2";
const OverlayEdit = ({ onClose, visible, uid }) => {
  // console.log(uid);
  const [inputSo, setInputSo] = useState({});
  const token = localStorage.getItem("token");
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputSo({
      ...inputSo,
      [name]: value,
    });
  };
  const getSourceUid = (token, uid) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies-source/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const oldData = res.data.data;
        setInputSo({
          name: oldData.name,
        });
      });
  };
  useEffect(() => {
    if (visible && uid) {
      getSourceUid(token, uid);
    }
  }, [token, uid]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/companies-source/${uid}`,
        inputSo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          title: res.data.message,
          text: "Successfully edit item",
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          text: err.response.data.message,
          icon: "warning",
        });
      });
  };
  return (
    <Offcanvas
      show={visible}
      onHide={onClose}
      placement="end"
      className="offcanvas-content"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Resource</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSubmit}>
          <Form className="mb-2">
            <Form.Label>
              Name Source <span className="text-danger fs-5">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={inputSo.name}
              onChange={handleInput}
              required
            />
          </Form>
          <div className="mt-5">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button className="btn btn-secondary ms-3" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OverlayEdit;
