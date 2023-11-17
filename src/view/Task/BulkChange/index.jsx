import React from 'react'
import Topbar from '../../../components/Template/Topbar'
import Sidebar from '../../../components/Template/Sidebar'
import Main from '../../../components/Template/Main'
import { Card, Form } from 'react-bootstrap'
import Select from "react-select"

const BulkChangeTask  = () => {
  return (
  <body id='body'>
    <Topbar />
    <Sidebar />
    <Main>
        <div className="pagetitle">
        <h1>Bulk Change Deals</h1>
        <nav>
            <ol className="breadcrumb mt-2">
                <li className="breadcrumb-item">
                    <a href="/" className='text-decoration-none'>Dashboard</a>
                </li>
                <li className='breadcrumb-item'><a href="/task" className='text-decoration-none'>Task</a></li>
                <li className="breadcrumb-item active">Bulk Change</li>
            </ol>
        </nav>
        </div>
        <Card className='mt-5 shadow'>
            <Card.Body>
                <form onSubmit="">
                   <Form.Group className='mb-3 col-9'>
                    <Form.Label className='fw-bold'>Select Task</Form.Label>
                    <Select ismulti />
                    </Form.Group> 
                    <Form.Group className="mb-3 col-5" md={5}>
                <Form.Label className="fw-bold">to Owner</Form.Label>
                <Select />
              </Form.Group>
              <div className="mt-4">
                <a href="/deals" className="btn btn-secondary me-4 shadow">
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
  )
}

export default BulkChangeTask 