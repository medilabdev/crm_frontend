import React,{ useEffect, useState } from 'react'
import Sidebar from '../../../../components/Template/Sidebar'
import Main from '../../../../components/Template/Main'
import Breadcrumb from './Part/Breadcrumb'
import Topbar from '../../../../components/Template/Topbar'
import { Button, Card } from 'react-bootstrap'
import Select from "react-select"
import Task from './Part/Task'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { GetDataSelectDeals } from '../../../../action/DataDeals'
import { getListOwner } from '../../../../action/FormOwner'
import { handleSubmit } from './Part/System'


const CreateTask = () => {
  const token = localStorage.getItem("token")
  const auth_uid = localStorage.getItem('uid')
  const [inputData, setInputData] = useState({
    task_owner: auth_uid || ''
  });
  const [DetailTasks, setDetailTasks] = useState([
    {task_name: "", start_date: "", deals_uid:null},
  ])
  const handleRemoveTask = (index) => {
    const newTasks = DetailTasks.filter((_, i) => i !== index);
    setDetailTasks(newTasks);
  };
  const handleAddTask = () => {
    setDetailTasks([...DetailTasks, { task_name: "", start_date: "", deals_uid: null }]);
  };

  const handleInput = (e) => {
    const {name, value} = e.target
    setInputData({
      ...inputData,
      [name] : value
    })
  }

  const handleInputTaskDetail = (index, field, value) => {
    const updatedTasks = [...DetailTasks];
    updatedTasks[index][field] = value;
    setDetailTasks(updatedTasks);
  }

  const dispatch = useDispatch()
  const { listResultDataSelectDeals } = useSelector((state) => state.DataSelectDealsV2);
  const { listResultOwner } = useSelector((state) => state.SelectOwner)
  
  const SelectDealsOption = () => {
    const Result = [];
    if(Array.isArray(listResultDataSelectDeals)){
      listResultDataSelectDeals.map((data) => {
        const dataOption = {
          value: data?.uid,
          label: data?.company?.name
        }
        Result.push(dataOption)
      })
    }
    return Result
  }


  const SelectOwnerOption = () => {
    const Result = [];
    if(Array.isArray(listResultOwner)){
      listResultOwner.map((data) => {
        
        const dataOption = {
          value: data?.uid,
          label: data?.name
        }
        Result.push(dataOption)
      })
    }
    return Result
  }

  
  
  
  
  useEffect(() => {
    dispatch(GetDataSelectDeals(token))
    dispatch(getListOwner(token))
  },[dispatch])

  
  return (
    <div id='body'>
        <Topbar />
        <Sidebar />
        <Main>
            <div className="container">
              <div className="row">
                  <Breadcrumb/>
                  
                  <div className="col-md-4">
                    <Task handleInput={handleInput} SelectOwnerOption={SelectOwnerOption} inputData={inputData} />
                  </div>
                  <div className="col-md-8">
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
                                      value={task.taskName}
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
                                  onChange={(e) => handleInputTaskDetail(index, 'deals_uid', e.value)}/>
                              </div>
                                {DetailTasks.length > 1 && (
                                  <div className="col-md-12">
                                    <Button className='btn-sm float-end'
                                      variant="danger"
                                      onClick={() => handleRemoveTask(index)}
                                    >
                                      <FontAwesomeIcon icon={faTrash} /> Remove
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                        ))}

                        <div>
                          <Button className="btn btn-primary" onClick={handleAddTask}>
                            Add Task
                          </Button>
                        </div>
                          
                      </div>

                        
                        </Card.Body>
                    </Card>
                    <div className="col-md-12 mb-2 ">
                      <button type='button' className='btn btn-primary' onClick={(e) => handleSubmit(e, inputData, DetailTasks, token, auth_uid)}>Submit</button>
                      <a href='/weekly-task' className='btn btn-secondary ms-2'>Back</a>

                     </div>
                  </div>
                  
              </div>
            </div>
        </Main>
    </div>
  )
}

export default CreateTask