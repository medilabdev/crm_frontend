import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Offcanvas } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import Select from "react-select"

const AddTask = ({visible, onClose}) => {
    const token = localStorage.getItem("token")
    const [contact, setContact] = useState([])
    const [company, setCompany] = useState([])
    const [deals, setDeals] = useState([])
    const [user, setUser] = useState([])

    const getContact = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/contacts`, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((res) => setContact(res.data.data))
        .catch((err) => {
            if (err.response.data.message === "Unauthenticated.") {
              localStorage.clear();
              window.location.href = "/login";
            }
          });
    }

    const getCompany = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((res) => setCompany(res.data.data))
        .catch((err) => {
            if (err.response.data.message === "Unauthenticated.") {
              localStorage.clear();
              window.location.href = "/login";
            }
          });
    }
    const getDeals = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/deals`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((res) => setDeals(res.data.data))
        .catch((err) => {
            if (err.response.data.message === "Unauthenticated.") {
              localStorage.clear();
              window.location.href = "/login";
            }
          });
    }
    const getUsers = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((res) => setUser(res.data.data))
        .catch((err) => {
            if (err.response.data.message === "Unauthenticated.") {
              localStorage.clear();
              window.location.href = "/login";
            }
          });
    }

    const selectContact = () => {
        const res = []
        contact?.map((data) => {
            const them ={
                label: data.name,
                value: data.uid
            }
            res.push(them)
        })
        return res
    }

    const selectComp = () => {
        const res = []
        company?.map((data) => {
            const theme ={
                label:data.name,
                value:data.uid
            }
            res.push(theme)
        })
        return res
    }
    console.log(selectComp());
    const selectDeals = () => {
        const res = []
        deals?.map((data) => {
            const theme ={
                label:data.deal_name,
                value:data.uid
            }
            res.push(theme)
        })
        return res
    }
    const selectUser = () => {
        const res = []
        user?.map((data) => {
            const theme ={
                label:data.name,
                value:data.uid
            }
            res.push(theme)
        })
        return res
    }


    useEffect(() => {
        if(visible){
            getContact(token)
            getCompany(token)
            getDeals(token)
            getUsers(token)
        }
    }, [token])
  return (
    <Offcanvas show={visible} onHide={onClose} placement='end' style={{ width: '40rem', height: '45rem' }}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Add Task</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <form onSubmit="">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 border-end">
                            <Form.Group className='mb-3'>
                                <Form.Label>
                                Task Name <span className="text-danger fs-5">*</span>
                                </Form.Label>
                                <Form.Control type='text' placeholder='' />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>
                                    Details Plan <span className="text-danger fs-5">*</span>
                                </Form.Label>
                                <ReactQuill theme='snow' />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>
                                    Details Plan <span className="text-danger fs-5">*</span>
                                </Form.Label>
                                <ReactQuill theme='snow' />
                            </Form.Group>
                        </div>
                        <div className="col-md-5" style={{ background:'#F5F7F8' }}>
                            <Form.Group className='mb-2'>
                                <Form.Label>
                                    Select Contact
                                </Form.Label>
                            <Select options={selectContact()} placeholder="Select Contact" />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>
                                    Select Company
                                </Form.Label>
                            <Select options={selectComp()} placeholder="Select Company" />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>
                                    Select Deals <span className="text-danger fs-5">*</span>
                                </Form.Label>
                            <Select options={selectDeals()} placeholder="Select Company" required />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>
                                    Reminder <span className="text-danger fs-5">*</span>
                                </Form.Label>
                            <input type='date' className='form-control' />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>
                                    Select Status <span className="text-danger fs-5">*</span>
                                </Form.Label>
                                <select className='form-select'>
                                    <option value="">Complate</option>
                                    <option value="">Started</option>
                                </select>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>
                                    Select Owner <span className="text-danger fs-5">*</span>
                                </Form.Label>
                            <Select options={selectUser()} placeholder="Select Company" required />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>
                                    Select Priority <span className="text-danger fs-5">*</span>
                                </Form.Label>
                                <select className='form-select'>
                                    <option value="">Select Choose</option>
                                    <option value="">Complate</option>
                                    <option value="">Started</option>
                                </select>
                            </Form.Group>
                        </div>
                    </div>
                    <button
            className="btn btn-primary mb-4 ms-3"
          >
            Add Task
          </button>
          <button className="btn btn-secondary mb-4 ms-2">
            Cancel
          </button>
                </div>
            </form>
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default AddTask