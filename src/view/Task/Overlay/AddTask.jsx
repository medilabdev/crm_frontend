import React from 'react'
import { Form, Offcanvas } from 'react-bootstrap'
import ReactQuill from 'react-quill'

const AddTask = ({visible, onClose}) => {
  return (
    <Offcanvas show={visible} onHide={onClose} placement='end' style={{ width: '40rem', height: '45rem' }}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Add Task</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <form onSubmit="">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
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
                        <div className="col-md-5"></div>
                    </div>
                </div>
            </form>
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default AddTask