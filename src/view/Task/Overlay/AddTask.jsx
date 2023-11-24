import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Modal, Offcanvas } from "react-bootstrap";
import ReactQuill from "react-quill";
import Select from "react-select";

const AddTask = ({ visible, onClose }) => {
  const token = localStorage.getItem("token");
  const [contact, setContact] = useState([]);
  const [company, setCompany] = useState([]);
  const [deals, setDeals] = useState([]);
  const [user, setUser] = useState([]);
  const [addAttachment, setAddAttachment] = useState([{ id: 1 }]);
  const [status, setStatus] = useState([])
  const [priority, setPriority] = useState([])
  const [input, setInput] = useState({});
  const addFormAttachment = () => {
    setAddAttachment([...addAttachment, { id: addAttachment.length + 1 }]);
  };

  const RemoveAttachment = (index) => {
    const upDate = [...addAttachment];
    upDate.splice(index, 1);
    setAddAttachment(upDate);
  };
  const getPriority = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/priorities`, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res) => setPriority(res.data.data))
    .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  }

  const getStatus = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/statuses`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((res) => setStatus(res.data.data))
    .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  }

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
    if (visible) {
      getContact(token);
      getCompany(token);
      getDeals(token);
      getUsers(token);
      getStatus(token);
      getPriority(token);
    }
  }, [token]);

  const handleInput = (e) => {
    const {name, value} = e.target;
    setInput({
        ...input,
        [name]:value
    })
  }
  const handleInpuContact = (e) => {
    setInput({
        ...input,
        contact_uid :e.value
    })
  }
  console.log(input);
  return (
    <Modal show={visible} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit="">
          <div className="container">
            <div className="row">
              <div className="col-md-7 border-end">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">
                    Task Name <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <Form.Control type="text" name="task_name" onChange={handleInput} placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">
                    Details Plan <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <ReactQuill theme="snow" onChange={(value) => handleInput({ target : {name:"detail_plan", value}})} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">
                    Next Steps / Results
                    <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <ReactQuill theme="snow" onChange={(value) => handleInput({ target: {name:"next_steps", value }})} required />
                </Form.Group>
                {addAttachment.map((attachment, index) => (
                  <div key={index}>
                    <Form.Group>
                      <Form.Label className="fw-medium mt-2">
                        Attachment
                      </Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                    {addAttachment.length > 1 && (
                      <div className="float-end">
                        <button
                          className="badge bg-danger mt-2"
                          onClick={() => RemoveAttachment(index)}
                          style={{ fontSize: "0.75rem", border: "none", fontWeight:"400" }}
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
                  <Select options={selectComp()} placeholder="Select Company" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-medium">
                    Select Deals <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <Select
                    options={selectDeals()}
                    placeholder="Select Company"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-medium">
                    Reminder <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <input type="date" className="form-control" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-medium">
                    Select Status <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <select className="form-select">
                    <option disabled>Select Choose</option>
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
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="fw-medium">
                    Select Priority <span className="text-danger fs-5">*</span>
                  </Form.Label>
                  <select className="form-select">
                    <option disabled>Select Choose</option>
                   {priority.map((data) => (
                    <option value={data.uid}>{data.name}</option>
                   ))}
                  </select>
                </Form.Group>
              </div>
            </div>
            <button className="btn btn-primary mb-4 ms-3 mt-3">Add Task</button>
            <button className="btn btn-secondary mb-4 ms-2 mt-3">Cancel</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTask;
