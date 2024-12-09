import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import Select from "react-select"
import { HandleCreateTaskDetail, HandleDeleteTaskDetail, HandleUpdateDetail } from './System'
const TaskDetail = ({ DetailTasks, handleAddTask, handleRemoveTask, SelectDealsOption, handleInputTaskDetail, setDetailTasks, dataOld, setSavedTasks}) => {
  const token = localStorage.getItem("token")
  const isOldData = (task) => {
    return !!task.uid
  }
  console.log(DetailTasks);
  
  return (
    <Card>
    <Card.Header>
    <span  className='fs-5 fw-medium p-3' style={{ letterSpacing:"2px"}}>TASK DETAIL</span>
    </Card.Header>
    <Card.Body>
    <div className="container py-4">
    {DetailTasks.map((task, index) => (
    <div key={index} className="row align-items-start mb-4"> 
        {/* Kotak Detail */}
        <div className="col-md-2 d-flex flex-column align-items-center position-relative">
         <button className="btn btn-dark btn-sm w-100">Detail {index + 1}</button> 
        {index < DetailTasks.length - 1 && (
              <div className="detail-line animate-line"></div>
          )} 
        </div>

        {/* Form Inputs */}
        <div className="col-md-10">
          <div className="row mb-2">
            <div className="col-md-12 mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  placeholder="Input in here"
                  className="form-control"
                  name="task_name"
                  value={task?.task_name || ''}
                  onChange={(e) => handleInputTaskDetail(index, 'task_name', e.target.value)}

                />
                <label htmlFor="floatingInput">Task Name Detail</label>
              </div>
            </div>
            <div className="col-md-12 mb-2">
              <div className="form-floating">
                <input
                  type="datetime-local"
                  placeholder="Input in here"
                  className="form-control"
                  name="start_date"
                  value={task?.start_date || ''}
                  onChange={(e) => handleInputTaskDetail(index, 'start_date', e.target.value.replace("T", " ") + ":00")}
                />
                <label htmlFor="floatingInput">Start Date</label>
              </div>
            </div>
        </div>
          <div className="col-md-12 mb-3">
          <Select
            placeholder="Select Deals"
            options={SelectDealsOption()}
            value={SelectDealsOption().find((e) => e.value === task?.deals_uid)}
            onChange={(selectedOption) => {
                  setDetailTasks((prevTasks) => {
                if (!prevTasks || !Array.isArray(prevTasks)) {
                    return prevTasks;
                }
                if (!prevTasks[index]) {
                    return prevTasks;
                }
                const updatedTasks = [...prevTasks];
                updatedTasks[index] = {
                    ...updatedTasks[index],
                    deals_uid: selectedOption.value,
                };
                return updatedTasks;
                }); 
            }}
            />

          </div>
          <div className="col-md-12 float-end">
            <div className="float-end">
            <Button className='btn-sm me-2' variant='primary' onClick={(e) =>{
              if(isOldData(DetailTasks[index])){
                HandleUpdateDetail(e, token, DetailTasks[index], setDetailTasks)
              }else{
                HandleCreateTaskDetail(e, token, DetailTasks[index], setDetailTasks, dataOld.uid, index)
              }
              }
            }
             >Simpan</Button>
            {DetailTasks.length > 1 && (
                <Button className='btn-sm'
                  variant="danger"
                  onClick={(e) => {
                    if(isOldData(DetailTasks[index])){
                      HandleDeleteTaskDetail(e, token, DetailTasks[index].uid, setDetailTasks)
                    }else{
                      handleRemoveTask(index)
                    }
                    }}
                >
                  <FontAwesomeIcon icon={faTrash} /> Remove
                </Button>
            )} 
            </div>
           
            </div>
          </div>
        </div>
     ))}

    <div>
      <Button className="btn btn-primary" onClick={handleAddTask} >
        Add Task
      </Button>
    </div>
      
   </div> 

    
    </Card.Body>
</Card>
  )
}

export default TaskDetail