import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import { Card, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

const EditTaskFix = () => {
  const token = localStorage.getItem("token");
  const { uid } = useParams();
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
  const [pending, setPending] = useState(true);
  const [isButtonDisable, setButtonDisable] = useState(false);
  const removeFormAttachment = (index) => {
    const removeForm = [...addImg];
    const removeFileAttachment = [...inputAttachment];
    removeForm.splice(index, 1);
    removeFileAttachment.splice(index, 1);
    setAddImg(removeForm);
    setInputAttachment(removeFileAttachment);
  };

  const getPriority = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/priorities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPriority(response.data.data);
    } catch (error) {
      if (error.response && error.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getPriority(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("error", error);
      }
    }
  };
  const [oldContact, setOldContact] = useState({});
  const [oldCompany, setOldCompany] = useState({});
  const [oldDeals, setOldDeals] = useState({});
  const [oldOwner, setOldOwner] = useState({});
  const getOldTask = async (token, uid, retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const valueOld = response.data.data;
      setOldContact(valueOld.contact_uid);
      setOldCompany(valueOld.company_uid);
      setOldDeals(valueOld.deals_uid);
      setOldOwner(valueOld.owner_user_uid);
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
        status_uid: valueOld.status_uid,
      });
      const image = valueOld.attachment?.map((data) => data);
      setImageOld(image);
      setPending(false);
    } catch (error) {
      if (error.response && error.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getOldTask(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("error", error);
      }
    }
  };
  const getContact = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/contacts/form/select`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContact(response.data.data);
    } catch (error) {
      if (error.response && error.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getContact(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("error", error);
      }
    }
  };

  const getStatus = async (retryCount = 0) => {
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
      if (error.response && error.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getStatus(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("error", error);
      }
    }
  };

  const getCompany = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/companies/form/select`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompany(response.data.data);
    } catch (error) {
      if (error.response && error.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getCompany(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("error", error);
      }
    }
  };
  const getDeals = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/deals/form/select`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeals(response.data.data);
    } catch (error) {
      if (error.response && error.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getDeals(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("error", error);
      }
    }
  };
  const getUsers = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data);
    } catch (error) {
      if (error.response && error.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response && error.response.status === 429) {
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getUsers(retryCount + 1);
          }, 2000);
        } else {
          console.error(
            "Max retry attempts reached. Unable to complete the request."
          );
        }
      } else {
        console.error("error", error);
      }
    }
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
  const fetchData = async () => {
    try {
      setPending(true);
      await getOldTask(token, uid);
      await getContact();
      await getCompany();
      await getDeals();
      await getUsers();
      await getStatus();
      await getPriority();
    } catch (error) {
      console.error("error", error);
    } finally {
      setPending(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token, uid]);
  const handleInput = (e) => {
    setOldTask({
      ...oldTask,
      [e.target.name]: e.target.value,
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
    formData.append("task_name", oldTask.name || "");
    formData.append("plan", oldTask.plan || "");
    formData.append("result", oldTask.result || "");
    formData.append("contact_uid", oldContact.contact_uid || "");
    formData.append("company_uid", oldCompany.company_uid || "");
    formData.append("deals_uid", oldDeals.deals_uid || "");
    formData.append("date_email_reminder", oldTask.date_email_reminder || "");
    formData.append("owner_user_uid", oldOwner.owner_user_uid || "");
    formData.append("priority_uid", oldTask.priority_uid || "");
    formData.append("status_uid", oldTask.status_uid || "");
    formData.append("gps_location", oldTask.gps_location || "");
    inputAttachment.forEach((data, index) => {
      formData.append(`attachment[${index}][image]`, data || "");
    });
    formData.append("_method", "put");
    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    setButtonDisable(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/tasks/${uid}`, formData, {
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

  const handleDeleteImage = (uidImage) => {
    const formData = new FormData();
    formData.append("_method", "delete");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/item/attachment/${uidImage}`,
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
          text: "updated successfully",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
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
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Edit Task</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <Link to="/" className="text-decoration-none">
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/task" className="text-decoration-none">
                        Task
                      </a>
                    </li>
                    <li className="breadcrumb-item active">Edit Task</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <form className="row" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <div className="float-end mt-2 mb-2">
                <button
                  className="btn btn-primary me-2"
                  type="submit"
                  disabled={isButtonDisable}
                >
                  Save Changes
                </button>
              </div>
            </div>
            <div className="col-md-12">
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i className="bi bi-list-task fs-4"></i>
                    <span className="ms-2 fs-5 fw-bold mt-3">Task</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="row">
                    <div className="col-md-7">
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "600" }}>
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
                        <Form.Label style={{ fontWeight: "600" }}>
                          Details Plan{" "}
                          <span className="text-danger fs-5">*</span>
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
                        <Form.Label style={{ fontWeight: "600" }}>
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
                                <button
                                  type="button"
                                  onClick={() => handleDeleteImage(data.uid)}
                                  className="ms-2 mt-1 text-decoration-none badge bg-danger"
                                  style={{
                                    cursor: "pointer",
                                    border: "none",
                                    width: "50px",
                                  }}
                                >
                                  Delete
                                </button>
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
                                <a
                                  className="badge bg-danger mt-2 mb-2"
                                  onClick={() => removeFormAttachment(index)}
                                  style={{
                                    fontSize: "0.75rem",
                                    border: "none",
                                    fontWeight: "400",
                                  }}
                                >
                                  Remove
                                </a>
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
                        <Form.Label style={{ fontWeight: "600" }}>
                          Select Contact
                        </Form.Label>
                        <Select
                          options={selectContact()}
                          value={selectContact().find(
                            (e) => e.value === oldContact
                          )}
                          onChange={(e) =>
                            setOldContact({
                              ...oldContact,
                              contact_uid: e.value,
                            })
                          }
                          placeholder="Select Contact"
                        />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label style={{ fontWeight: "600" }}>
                          Select Company
                        </Form.Label>
                        <Select
                          options={selectComp()}
                          value={selectComp().find(
                            (e) => e.value === oldCompany
                          )}
                          onChange={(e) =>
                            setOldCompany({
                              ...oldCompany,
                              company_uid: e.value,
                            })
                          }
                          placeholder="Select Company"
                        />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label style={{ fontWeight: "600" }}>
                          Select Deals{" "}
                          <span className="text-danger fs-5">*</span>
                        </Form.Label>
                        <Select
                          options={selectDeals()}
                          value={selectDeals().find(
                            (e) => e.value === oldDeals
                          )}
                          onChange={(e) =>
                            setOldDeals({
                              ...oldDeals,
                              deals_uid: e.value,
                            })
                          }
                          placeholder="Select Company"
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label style={{ fontWeight: "600" }}>
                          Reminder <span className="text-danger fs-5">*</span>
                        </Form.Label>
                        <input
                          type="date"
                          className="form-control"
                          name="date_email_reminder"
                          value={oldTask.date_email_reminder}
                          onChange={handleInput}
                        />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label style={{ fontWeight: "600" }}>
                          Select Status{" "}
                          <span className="text-danger fs-5">*</span>
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
                        <Form.Label style={{ fontWeight: "600" }}>
                          Select Owner{" "}
                          <span className="text-danger fs-5">*</span>
                        </Form.Label>
                        <Select
                          options={selectUser()}
                          value={selectUser().find((e) => e.value === oldOwner)}
                          onChange={(e) =>
                            setOldOwner({
                              ...oldOwner,
                              owner_user_uid: e.value,
                            })
                          }
                          placeholder="Select Company"
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label style={{ fontWeight: "600" }}>
                          Select Priority{" "}
                          <span className="text-danger fs-5">*</span>
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
                </Card.Body>
              </Card>
            </div>
          </form>
        </div>
      </Main>
    </body>
  );
};

export default EditTaskFix;
