import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Card, Form } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

const BulkChangeTask = () => {
  const token = localStorage.getItem("token");
  const [task, setTask] = useState([]);
  const [owner, setOwner] = useState([]);
  const [inputTask, setInputTask] = useState([])
  const [inputOwner, setInputOwner] = useState([])

  const getOwner = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=> setOwner(res.data.data))
    .catch((err) => {
      if (err.response.data.message === "Unauthenticated.") {
        localStorage.clear();
        window.location.href = "/login";
      }
    });
  }

  const getTask = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tasks/form/select`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTask(res.data.data))
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  const selectOwner = () => {
    const result = []
    owner?.map((data) => {
      const res = {
        value:data.uid,
        label:data.name
      }
      result.push(res)
    })
    return result
  }
  const selectTask = () => {
    const res= [];
    task?.map((data) => {
      const theme = {
        value: data.uid,
        label: data.task_name
      }
      res.push(theme)
    })
    return res;
  }
  const handleInputTask =(e) => {
    setInputTask(e.map((opt) => opt.value))
  }
  const handleInputOwner = (e) => {
    setInputOwner({
      ...inputOwner,
      owner_user_uid:e.value
    })
  }
  useEffect(() => {
    getTask(token);
    getOwner(token)
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("new_owner_user_uid", inputOwner.owner_user_uid)
    inputTask.forEach((data, index) => {
      formData.append(`task[${index}][uid]`, data)
    })
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks/transfer/owner`, formData,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res) => {
      Swal.fire({
        title: res.data.message,
        text: "Successfully updated contact",
        icon: "success",
      }).then((res) => {
        if(res.isConfirmed){
          window.location.reload()
        }
      })
    })
  }
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="pagetitle">
          <h1>Bulk Change Deals</h1>
          <nav>
            <ol className="breadcrumb mt-2">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">
                  Dashboard
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="/task" className="text-decoration-none">
                  Task
                </a>
              </li>
              <li className="breadcrumb-item active">Bulk Change</li>
            </ol>
          </nav>
        </div>
        <Card className="mt-5 shadow">
          <Card.Body>
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 col-9">
                <Form.Label className="fw-bold">Select Task</Form.Label>
                <Select isMulti options={selectTask()} onChange={(value) => handleInputTask(value)} />
              </Form.Group>
              <Form.Group className="mb-3 col-5" md={5}>
                <Form.Label className="fw-bold">to Owner</Form.Label>
                <Select options={selectOwner()} onChange={handleInputOwner} />
              </Form.Group>
              <div className="mt-4">
                <a href="/task" className="btn btn-secondary me-4 shadow">
                  Cancel
                </a>
                <button className="btn btn-primary shadow" type="submit">
                  Save
                </button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Main>
    </body>
  );
};

export default BulkChangeTask;
