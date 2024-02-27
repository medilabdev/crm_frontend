import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Modal, Offcanvas } from "react-bootstrap";
import ReactQuill from "react-quill";
import Select from "react-select";
import Swal from "sweetalert2";

const AddTask = ({ visible, onClose }) => {
  const token = localStorage.getItem("token");
  const [contact, setContact] = useState([]);
  const [company, setCompany] = useState([]);
  const [deals, setDeals] = useState([]);
  const [user, setUser] = useState([]);
  const [addAttachment, setAddAttachment] = useState([{ id: 1 }]);
  const [status, setStatus] = useState([]);
  const [priority, setPriority] = useState([]);
  const [input, setInput] = useState({});
  const [imageAttachment, setImageAttachment] = useState([]);
  const [isButtonDisable, setButtonDisable] = useState(false);
  const addFormAttachment = () => {
    setAddAttachment([...addAttachment, { id: addAttachment.length + 1 }]);
  };

  const RemoveAttachment = (index) => {
    const upDate = [...addAttachment];
    const attachment = [...imageAttachment];

    attachment.splice(index, 1);
    upDate.splice(index, 1);
    setAddAttachment(upDate);
    setImageAttachment(attachment);
  };
  const getPriority = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/priorities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPriority(res.data.data))
      .catch(async (err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
        if (err.response && err.response.status === 429 && retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 2000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          await getPriority(retryCount + 1);
        }
      });
  };

  const getStatus = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/statuses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setStatus(res.data.data))
      .catch(async (err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
        if (err.response && err.response.status === 429 && retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 2000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          await getStatus(retryCount + 1);
        }
      });
  };
  const getContact = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/contacts/form/select`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setContact(res.data.data))
      .catch(async (err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
        if (err.response && err.response.status === 429 && retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 2000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          await getContact(retryCount + 1);
        }
      });
  };

  const getCompany = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies/form/select`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCompany(res.data.data))
      .catch(async (err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
        if (err.response && err.response.status === 429 && retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 2000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          await getCompany(retryCount + 1);
        }
      });
  };
  const getDeals = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deals/form/select`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDeals(res.data.data))
      .catch(async (err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
        if (err.response && err.response.status === 429 && retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 2000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          await getDeals(retryCount + 1);
        }
      });
  };
  const getUsers = (retryCount = 0) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data.data))
      .catch(async (err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
        if (err.response && err.response.status === 429 && retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 2000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          await getUsers(retryCount + 1);
        }
      });
  };

  const selectContact = () => {
    const res = [];
    contact?.map((data) => {
      const them = {
        label: data.name,
        value: data.uid,
      };
      res.push(them);
    });
    return res;
  };

  const selectComp = () => {
    const res = [];
    company?.map((data) => {
      const theme = {
        label: data.name,
        value: data.uid,
      };
      res.push(theme);
    });
    return res;
  };

  const selectDeals = () => {
    const res = [];
    deals?.map((data) => {
      const theme = {
        label: data.deal_name,
        value: data.uid,
      };
      res.push(theme);
    });
    return res;
  };

  const selectUser = () => {
    const res = [];
    user?.map((data) => {
      const theme = {
        label: data.name,
        value: data.uid,
      };
      res.push(theme);
    });
    return res;
  };

  useEffect(() => {
    getContact(token);
    getCompany(token);
    getDeals(token);
    getUsers(token);
    getStatus(token);
    getPriority(token);
  }, [token]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleInpuContact = (e) => {
    setInput({
      ...input,
      contact_uid: e.value,
    });
  };
  const handleInpuCompany = (e) => {
    setInput({
      ...input,
      company_uid: e.value,
    });
  };
  const handleInpuDeals = (e) => {
    setInput({
      ...input,
      deal_uid: e.value,
    });
  };
  const handleOwner = (e) => {
    setInput({
      ...input,
      owner_uid: e.value,
    });
  };

  const handlePriority = (e) => {
    setInput({
      ...input,
      priority_uid: e.target.value,
    });
  };

  const handleStatus = (e) => {
    setInput({
      ...input,
      status_uid: e.target.value,
    });
  };

  const handleFileAttachment = (e, index) => {
    const selectedFile = e.target.files[0];
    setImageAttachment((value) => {
      const newFile = [...value];
      newFile[index] = selectedFile;
      return newFile;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("task_name", input.task_name);
    formData.append("plan", input.detail_plan);
    formData.append("result", input.next_steps);
    formData.append("contact_uid", input.contact_uid);
    formData.append("company_uid", input.company_uid);
    formData.append("deals_uid", input.deal_uid);
    formData.append("date_email_reminder", input.reminder);
    formData.append("owner_user_uid", input.owner_uid);
    formData.append("status_uid", input.status_uid);
    formData.append("priority_uid", input.priority_uid);
    imageAttachment.forEach((data, index) => {
      formData.append(`attachment[${index}][image]`, data || "");
    });
    setButtonDisable(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
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
    <Modal show={visible} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-md-7 border-end">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">
                    Task Name <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="task_name"
                    onChange={handleInput}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">
                    Details Plan <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <ReactQuill
                    theme="snow"
                    onChange={(value) =>
                      handleInput({ target: { name: "detail_plan", value } })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">
                    Next Steps / Results
                    <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <ReactQuill
                    theme="snow"
                    onChange={(value) =>
                      handleInput({ target: { name: "next_steps", value } })
                    }
                    required
                  />
                </Form.Group>
                {addAttachment.map((attachment, index) => (
                  <div key={index}>
                    <Form.Group>
                      <Form.Label className="fw-medium mt-2">
                        Attachment
                      </Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => handleFileAttachment(e, index)}
                        accept="image/*"
                      />
                    </Form.Group>
                    {addAttachment.length > 1 && (
                      <div className="float-end">
                        <button
                          className="badge bg-danger mt-2"
                          onClick={() => RemoveAttachment(index)}
                          style={{
                            fontSize: "0.75rem",
                            border: "none",
                            fontWeight: "400",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-icon text-primary fw-semibold"
                  onClick={addFormAttachment}
                  style={{ fontSize: "0.75rem", cursor: "pointer" }}
                >
                  <i class="bi bi-plus"></i> Add Attachment
                </button>
              </div>
              <div className="col-md-5" style={{ background: "#F5F7F8" }}>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-medium">Select Contact</Form.Label>
                  <Select
                    options={selectContact()}
                    placeholder="Select Contact"
                    onChange={(value) => handleInpuContact(value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-medium">Select Company</Form.Label>
                  <Select
                    options={selectComp()}
                    placeholder="Select Company"
                    onChange={(value) => handleInpuCompany(value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-medium">
                    Select Deals <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <Select
                    options={selectDeals()}
                    placeholder="Select Company"
                    required
                    onChange={(value) => handleInpuDeals(value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-medium">
                    Reminder <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <input
                    type="date"
                    className="form-control"
                    name="reminder"
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-medium">
                    Select Status <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <select className="form-select" onChange={handleStatus}>
                    <option value="">Select Choose</option>
                    {status.map((data) => (
                      <option value={data.uid}>{data.name}</option>
                    ))}
                  </select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-medium">
                    Select Owner <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <Select
                    options={selectUser()}
                    placeholder="Select Company"
                    required
                    onChange={(value) => handleOwner(value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-medium">
                    Select Priority <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <select
                    className="form-select"
                    name="priority_uid"
                    onChange={handlePriority}
                  >
                    <option value="">Select Choose</option>
                    {priority.map((data) => (
                      <option value={data.uid}>{data.name}</option>
                    ))}
                  </select>
                </Form.Group>
              </div>
            </div>
            <button className="btn btn-primary mb-4 ms-3 mt-3" type="submit" disabled={isButtonDisable}>
              Add Task
            </button>
            <button className="btn btn-secondary mb-4 ms-2 mt-3">Cancel</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTask;
