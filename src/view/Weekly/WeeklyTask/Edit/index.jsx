import React, { useEffect, useState } from 'react'
import Topbar from '../../../../components/Template/Topbar'
import Sidebar from '../../../../components/Template/Sidebar'
import Main from '../../../../components/Template/Main'
import Breadcrumb from './Part/Breadcrumb'
import Task from './Part/Task'
import TaskDetail from './Part/TaskDetail'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GetDetailWeeklyPlanTask } from '../../../../action/GetDataTask'
import { useSelector } from 'react-redux'
import { getListOwner } from '../../../../action/FormOwner'
import { GetDataSelectDeals } from '../../../../action/DataDeals'
import { handleUpdate } from './Part/System'
const EditTask = () => {
    const { uid } = useParams();
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const { detailWeekly } = useSelector((state) => state.DetailWeeklyTask)
    const { listResultOwner } = useSelector((state) => state.SelectOwner)
    const { listResultDataSelectDeals } = useSelector((state) => state.DataSelectDealsV2);

    useEffect(() => {
        if (token && uid) {
            dispatch(GetDetailWeeklyPlanTask(token, uid));
            dispatch(getListOwner(token));
            dispatch(GetDataSelectDeals(token))
          }
    }, [dispatch, token, uid])
    const [inputData, setInputData] = useState({
        task_name:'' ,
        start_date:'' ,
        due_date: '' ,
        task_owner:null ,
    });
    const [DetailTasks, setDetailTasks] = useState([
        { uid:"", task_name: "", start_date: "", deals_uid:null},
      ])
    const [savedTasks, setSavedTasks] = useState([]);
    
      useEffect(() => {
        if (detailWeekly) {
          setInputData((prevState) => {
            if (
              prevState.uid === detailWeekly.uid &&
              prevState.task_name === detailWeekly.task_name &&
              prevState.start_date === detailWeekly.start_date &&
              prevState.due_date === detailWeekly.due_date &&
              prevState.task_owner === detailWeekly.task_owner 
            ) {
              return prevState; // Jangan perbarui jika data sama
            }
            return {
              uid: detailWeekly.uid || '',
              task_name: detailWeekly.task_name || '',
              start_date: detailWeekly.start_date || '',
              due_date: detailWeekly.due_date || '',
              task_owner: detailWeekly.task_owner || '',
            };
          });
        }
        if(detailWeekly?.task_detail){
            const mappedTasks = detailWeekly?.task_detail?.map((task) => ({
                uid : task?.uid || '',
                task_name : task?.task_name || '',
                start_date: task?.start_date || '',
                deals_uid : task?.deals_uid || null,
            }))
            setDetailTasks(mappedTasks)
        }
      }, [detailWeekly]);
      

      
    const handleRemoveTask = (index) => {
        const newTasks = DetailTasks.filter((_, i) => i !== index)
        setDetailTasks(newTasks)
    }

    const handleAddTask = () => {
        setDetailTasks([...DetailTasks, { uid:"", task_name: "", start_date: "", deals_uid: null, }]);
    }
    const SelectOwnerOption = () => {
        if (Array.isArray(listResultOwner)) {
            return listResultOwner.map((data) => ({
              value: data?.uid,
              label: data?.name,
            }));
          }
          return [];
      }
      const SelectDealsOption = () => {
        if(Array.isArray(listResultDataSelectDeals)){
          return listResultDataSelectDeals.map((data) => ({
            value:data?.uid,
            label:data?.company?.name
          })
          )
        }
        return []
      }
    
      
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

    
    
    return (
        <div id='body'>
            <Topbar />
            <Sidebar />
            <Main>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Breadcrumb />
                        </div>
                        <div className="col-md-4">
                            <Task inputData={inputData} SelectOwnerOption={SelectOwnerOption} handleInput={handleInput} token={token} uid={uid} setInputData={setInputData}/>
                           
                        </div>
                        <div className="col-md-8">
                            <TaskDetail 
                            DetailTasks={DetailTasks} 
                            handleAddTask={handleAddTask} 
                            handleRemoveTask={handleRemoveTask} 
                            SelectDealsOption={SelectDealsOption} 
                            handleInputTaskDetail={handleInputTaskDetail} 
                            setDetailTasks={setDetailTasks} 
                            dataOld={detailWeekly} 
                            setSavedTasks={setSavedTasks}/>
                        <div className="row">
                        <div className="col-md-12 mb-2 ">
                        {/* <button type='button' className='btn btn-primary' 
                          onClick={(e) => handleUpdate(e, inputData, DetailTasks, token, uid)}
                        >Submit</button> */}
                        {/* <a href='/weekly-task' className='btn btn-secondary ms-2'>Back</a> */}

                        </div> 
                        </div>
                  </div>
                    </div>

                </div>
            </Main>
        </div>
    )
    }

export default EditTask