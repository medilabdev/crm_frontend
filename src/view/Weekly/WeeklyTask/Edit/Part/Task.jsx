import React from 'react'
import { Card } from 'react-bootstrap';
import Select from 'react-select'
import { handleUpdate } from './System';
const Task = ({ inputData, SelectOwnerOption, handleInput, token, uid, setInputData}) => {
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
                value={inputData.task_name || ''}
                onChange={handleInput}
                />
            </div>
            <div className="mb-3">
                    <label htmlFor="taskOwner" className="form-label">
                    Task Owner:
                    </label>
                    <Select
                    placeholder="Select Task Owner" 
                    className='border-0 border-bottom'
                    options={SelectOwnerOption()} 
                    onChange={(selectedOption) => handleInput({
                      target:{
                        name:'task_owner',
                        value:selectedOption.value
                      }
                    })}
                    value={SelectOwnerOption().find((e)=> e.value === inputData.task_owner
                    )}
                    />
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Start Date:</label>
                <input
                type="datetime-local"
                className="form-control border-0 border-bottom"
                placeholder="What did you think?"
                name='start_date'
                value={inputData.start_date || ''}
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
                value={inputData.due_date}
                onChange={(e) => {
                const {name, value} = e.target;
                const formattedValueStart = value.replace("T", " ") + ":00";
                handleInput({target: {name, value : formattedValueStart}})
                }}
                />
            </div>
        </Card.Body>
        <Card.Footer>
          <div className="ms-auto">
            <button type='button' 
            className='btn btn-primary m-2' 
            onClick={(e) => handleUpdate(e, inputData, token, uid, setInputData)}>Submit</button>
          </div>
        </Card.Footer>
    </Card> 
  )
}

export default Task