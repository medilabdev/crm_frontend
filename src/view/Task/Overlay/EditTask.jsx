import React, { useEffect, useState } from "react";
import { Form, Modal, Offcanvas } from "react-bootstrap";
import ReactQuill from "react-quill";
import Select from "react-select";
import axios from "axios";

const EditTask = ({ visible, onClose, uid }) => {
  const token = localStorage.getItem("token");
  const [contact, setContact] = useState([]);
  const [company, setCompany] = useState([]);
  const [deals, setDeals] = useState([]);
  const [user, setUser] = useState([]);
  const [oldTask, setOldTask] = useState([]);
  const [status, setStatus] = useState([]);
  const [priority, setPriority] = useState([]);
  const [imageOld, setImageOld] = useState([]);
  const [addImg, setAddImg] = useState([{ id: 1 }]);

  const addFormAttachment = () => {
    console.log("Before:", addImg);
    setAddImg([...addImg, { id: addImg.length + 1 }]);
    console.log("After:", addImg);
  };

  const removeFormAttachment = (index) => {
    const removeForm = [...addImg];
    removeForm.splice(index, 1);
    setAddImg(removeForm);
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
  return (
    <Modal show={visible} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit="">
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
                  <ReactQuill theme="snow" value={oldTask.plan} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Next Steps/Result{" "}
                    <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <ReactQuill theme="snow" value={oldTask.result} />
                </Form.Group>
                <div>
                  {imageOld
                    ? imageOld.map((data) => (
                        <img src={data.file_url} alt={data.file_url} />
                      ))
                    : null}
                  {addImg.map((data, index) => (
                    <div key={index}>
                      <Form.Group>
                        <Form.Label className="fw-medium mt-2">
                          Attachment
                        </Form.Label>
                        <Form.Control type="file" accept="image/*" />
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
                      <button
                        className="btn btn-icon text-primary fw-semibold"
                        onClick={addFormAttachment}
                        style={{ fontSize: "0.75rem" }}
                      >
                        <i class="bi bi-plus"></i> Add Attachment
                      </button>
                    </div>
                  ))}
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
                    value={oldTask.date_email_reminder}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>
                    Select Status <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <select className="form-select" value={oldTask.status_uid}>
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
                    placeholder="Select Company"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>
                    Select Priority <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <select className="form-select" value={oldTask.priority_uid}>
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
            <button className="btn btn-secondary mb-4 mt-3 ms-2" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTask;
