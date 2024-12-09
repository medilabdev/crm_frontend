import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import Select from 'react-select'

const Task = ({ handleInput, SelectOwnerOption, inputData}) => {
  const uid = localStorage.getItem('uid')
  return (
            <Card>
                    <Card.Header>
                      <span className='fs-5 fw-medium p-2' style={{ letterSpacing:"2px"}}>TASK</span>
                    </Card.Header>
                    <Card.Body>
                    <div className="form-group mb-3">
                        <label className="text-muted">Task Name:</label>
                        <input 
                        type="text"
                        className="form-control border-0 border-bottom"
                        placeholder="input in here"
                        name='task_name'
                        onChange={handleInput}
                        />
                    </div>
                    <div className="mb-3">
                            <label htmlFor="taskOwner" className="form-label">
                            Task Owner:
                            </label>
                            <Select id="taskOwner" 
                            placeholder="Select Task Owner" 
                            className='border-0 border-bottom' 
                            options={SelectOwnerOption()}
                            value={
                              SelectOwnerOption().find((e) => e.value === inputData?.task_owner) || null // Gunakan null jika tidak ditemukan
                            }
                            onChange={(selectedOption) => handleInput({
                              target:{
                                name:'task_owner',
                                value:selectedOption.value
                              }
                            })}/>
                    </div>
                    <div className="form-group mb-3">
                        <label className="text-muted">Start Date:</label>
                        <input
                        type="datetime-local"
                        className="form-control border-0 border-bottom"
                        placeholder="What did you think?"
                        name='start_date'
                        onChange={(e) => {
                          const {name, value} = e.target;
                          const formattedValueStart = value.replace("T", " ") + ":00";
                          handleInput({target: {name, value : formattedValueStart}})
                        }}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="text-muted">Due Date:</label>
                        <input
                        type="datetime-local"
                        className="form-control border-0 border-bottom"
                        placeholder="What did you think?"
                        name='due_date'
                        onChange={(e) => {
                          const {name, value} = e.target;
                          const formattedValueStart = value.replace("T", " ") + ":00";
                          handleInput({target: {name, value : formattedValueStart}})
                        }}
                        />
                    </div>
                        </Card.Body>

                    </Card>
  )
}

export default Task