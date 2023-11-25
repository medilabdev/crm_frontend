import React, { useEffect, useState } from "react";
import { Form, Modal, Offcanvas } from "react-bootstrap";
import ReactQuill from "react-quill";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

const EditTask = ({ visible, onClose, uid }) => {
  const token = localStorage.getItem("token");
  const [contact, setContact] = useState([]);
  const [company, setCompany] = useState([]);
  const [deals, setDeals] = useState([]);
  const [user, setUser] = useState([]);
  const [oldTask, setOldTask] = useState({});
  const [status, setStatus] = useState([]);
  const [priority, setPriority] = useState([]);
  const [imageOld, setImageOld] = useState([]);
  const [addImg, setAddImg] = useState([{ id: 1 }]);
  const [inputAttachment, setInputAttachment] = useState([]);
  const addFormAttachment = () => {
    setAddImg([...addImg, { id: addImg.length + 1 }]);
  };

  const removeFormAttachment = (index) => {
    const removeForm = [...addImg];
    const removeFileAttachment = [...inputAttachment];
    removeForm.splice(index, 1);
    removeFileAttachment.splice(index, 1);
    setAddImg(removeForm);
    setInputAttachment(removeFileAttachment);
  };

  const getPriority = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/priorities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPriority(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getOldTask = (token, uid) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tasks/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const valueOld = res.data.data;
        console.log(valueOld);
        setOldTask({
          name: valueOld.task_name,
          plan: valueOld.plan,
          result: valueOld.result,
          company_uid: valueOld.company_uid,
          deals_uid: valueOld.deals_uid,
          contact_uid: valueOld.contact_uid,
          date_email_reminder: valueOld.date_email_reminder,
          status_uid: valueOld.status_uid,
          priority_uid: valueOld.priority_uid,
          owner_user_uid: valueOld.owner_user_uid,
        });
        const image = valueOld.attachment?.map((data) => data);
        setImageOld(image);
        
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getContact = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setContact(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getStatus = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/statuses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setStatus(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getCompany = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCompany(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const getDeals = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDeals(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
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
    if (visible && uid) {
      getOldTask(token, uid);
      getContact(token);
      getCompany(token);
      getDeals(token);
      getUsers(token);
      getStatus(token);
      getPriority(token);
    }
  }, [token, uid]);

  const handleInput = (e) => {
    setOldTask({
      ...oldTask,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputCompany = (e) => {
    setOldTask({
      ...oldTask,
      company_uid: e.value,
    });
  };
  const handleInputContact = (e) => {
    setOldTask({
      ...oldTask,
      contact: e.value,
    });
  };
  const handleInputDeals = (e) => {
    setOldTask({
      ...oldTask,
      deals_uid: e.value,
    });
  };
  const handleInputOwner = (e) => {
    setOldTask({
      ...oldTask,
      owner_user_uid: e.value,
    });
  };
  const handleInputPriority = (e) => {
    setOldTask({
      ...oldTask,
      priority_uid: e.target.value,
    });
  };
  const handleInputStatus = (e) => {
    setOldTask({
      ...oldTask,
      status_uid: e.target.value,
    });
  };
  const handleFileAttachment = (e, index) => {
    const selectFile = e.target.files[0];
    setInputAttachment((val) => {
      const dataFile = [...val];
      dataFile[index] = selectFile;
      return dataFile;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("task_name", oldTask.name);
    formData.append("plan", oldTask.plan);
    formData.append("result", oldTask.result);
    formData.append("contact_uid", oldTask.contact_uid);
    formData.append("company_uid", oldTask.company_uid);
    formData.append("deals_uid", oldTask.deals_uid);
    formData.append("date_email_reminder", oldTask.reminder);
    inputAttachment.forEach((data, index) => {
      formData.append(`attachment[${index}][image]`, data || "")
    })
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks/${uid}`, formData,{
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
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
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-md-7 border-end">
                <Form.Group className="mb-3">
                  <Form.Label>
                    Task Name <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="name"
                    value={oldTask.name}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Details Plan <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={oldTask.plan}
                    onChange={(value) =>
                      handleInput({ target: { name: "plan", value } })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Next Steps/Result{" "}
                    <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={oldTask.result}
                    onChange={(value) =>
                      handleInput({ target: { name: "result", value } })
                    }
                  />
                </Form.Group>
                <div>
                  {imageOld
                    ? imageOld.map((data) => (
                        <div className="p-2 row">
                          <a
                            href={`https://api-crm.medilabjakarta.id/storage/img/task/${data.file_url}`}
                            target="_blank"
                          >
                            <img
                              src={`https://api-crm.medilabjakarta.id/storage/img/task/${data.file_url}`}
                              alt={`https://api-crm.medilabjakarta.id/storage/img/task/${data.file_url}`}
                              style={{ width: "100px" }}
                            />
                          </a>
                        </div>
                      ))
                    : null}
                  {addImg.map((data, index) => (
                    <div key={index}>
                      <Form.Group>
                        <Form.Label className="fw-medium mt-2">
                          Attachment
                        </Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(value) =>
                            handleFileAttachment(value, index)
                          }
                        />
                      </Form.Group>
                      {addImg.length > 1 && (
                        <div className="float-end">
                          <button
                            className="badge bg-danger mt-2 mb-2"
                            onClick={() => removeFormAttachment(index)}
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
                    className="btn btn-icon text-primary fw-semibold"
                    onClick={addFormAttachment}
                    style={{ fontSize: "0.75rem" }}
                  >
                    <i class="bi bi-plus"></i> Add Attachment
                  </button>
                </div>
              </div>
              <div className="col-md-5" style={{ background: "#F5F7F8" }}>
                <Form.Group className="mb-2">
                  <Form.Label>Select Contact</Form.Label>
                  <Select
                    options={selectContact()}
                    value={selectContact().find(
                      (e) => e.value === oldTask.contact_uid
                    )}
                    onChange={(val) => handleInputContact(val)}
                    placeholder="Select Contact"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Select Company</Form.Label>
                  <Select
                    options={selectComp()}
                    value={selectComp().find(
                      (e) => e.value === oldTask.company_uid
                    )}
                    onChange={(val) => handleInputCompany(val)}
                    placeholder="Select Company"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>
                    Select Deals <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <Select
                    options={selectDeals()}
                    value={selectDeals().find(
                      (e) => e.value === oldTask.deals_uid
                    )}
                    onChange={(val) => handleInputDeals(val)}
                    placeholder="Select Company"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>
                    Reminder <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <input
                    type="date"
                    className="form-control"
                    name="reminder"
                    value={oldTask.date_email_reminder}
                    // onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>
                    Select Status <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <select
                    className="form-select"
                    value={oldTask.status_uid}
                    onChange={handleInputStatus}
                  >
                    <option value="">Select Choose</option>
                    {status.map((data) => (
                      <option value={data.uid}>{data.name}</option>
                    ))}
                  </select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>
                    Select Owner <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <Select
                    options={selectUser()}
                    value={selectUser().find(
                      (e) => e.value === oldTask.owner_user_uid
                    )}
                    onChange={(val) => handleInputOwner(val)}
                    placeholder="Select Company"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>
                    Select Priority <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <select
                    className="form-select"
                    value={oldTask.priority_uid}
                    onChange={handleInputPriority}
                  >
                    <option value="">Select Choose</option>
                    {priority.map((data) => (
                      <option value={data.uid}>{data.name}</option>
                    ))}
                  </select>
                </Form.Group>
              </div>
            </div>
            <button className="btn btn-primary mb-4 mt-3 ms-3" type="submit">
              Save Changes
            </button>
            <button
              className="btn btn-secondary mb-4 mt-3 ms-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTask;
