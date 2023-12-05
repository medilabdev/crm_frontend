import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const EditStatus = ({ visible, uid, onClose }) => {
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState([]);
  const [input, setInput] = useState({});

  const getStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/statuses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus(response.data.data);
    } catch (error) {
      if (
        error.response.data.message === "Unauthenticated"
      ) {
        localStorage.clear();
        window.location.href = "/login";
      } else {
        console.error("Error fetching status:", error);
      }
    }
  };

  useEffect(() => {
    getStatus();
  }, [token]);

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status_uid", input.status_uid);
    formData.append("_method", "put");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/move/status/${uid}`,
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
          text: "Successfullly created deals",
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: err.response.data.message,
          icon: "warning",
        });
      });
  };
  return (
    <Modal show={visible} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <select
            name="status_uid"
            className="form-control"
            onChange={handleInput}
          >
            <option value="">Select Choose</option>
            {status.map((data) => (
              <option value={data.uid}>{data.name}</option>
            ))}
          </select>
          <button className="btn btn-primary mb-4 mt-3 ms-3" type="submit">
            Save Changes
          </button>
          <button
            className="btn btn-secondary mb-4 mt-3 ms-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStatus;
