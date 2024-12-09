import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { GetDataSelectDataWeek } from '../../../../action/SelectWeekTask'
import Select from 'react-select'

const ChangeStatus = ({ visible, onClose, uid, token, onUpdate, newStatus }) => {
    const [status, setStatus] = useState("")

    const handleChange = (e) => {
        setStatus((prev) => ({
            ...prev,
            [e.target.name] :e.target.value
        }))
    }
   
    const dispatch = useDispatch();
    const { dataOptionSelectWeek } = useSelector((state) => state.DataSelectWeek)

    

    useEffect(() => {
      if(status.status === "4"){
      dispatch(GetDataSelectDataWeek(token))
      }
    }, [dispatch, status])

    const SelectTask = () => {
      const Result = [];
      if(Array.isArray(dataOptionSelectWeek)){
        dataOptionSelectWeek.map((data) => {
          const dataOption = {
            value: data?.uid,
            label: data?.task_name
          }
          Result.push(dataOption)
        })
      }
      return Result
    }
    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        const formData2 = new FormData();
    
        // Data untuk API pertama
        formData.append("status", status.status);
        formData.append("_method", "put");
    
        // Data untuk API kedua
        formData2.append(
          "destination_task_uid",
          status?.destination_task_uid || ""
        );
        formData2.append("start_date", status?.start_date || "");
    
        if (status.status === "4") {
          // Jika status adalah "4", kirim ke dua API secara paralel
          const [response1, response2] = await Promise.all([
            axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/v2/tasks/detail/change/${uid}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/v2/tasks/detail/transfer/${uid}`,
              formData2,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
          ]);
    
          // Periksa apakah kedua API berhasil
          if (response1.status === 201 && response2.status === 201) {
            onUpdate(response1?.data?.data?.is_status); // Perbarui status
            await Swal.fire({
              title: "Success!",
              text: "Both requests completed successfully.",
              icon: "success",
            });
            Swal.close();
          }
        } else {
          // Jika status bukan "4", hanya kirim ke API pertama
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/v2/tasks/detail/change/${uid}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          
          console.log(response);
          if (response.status === 201) {
            
            onUpdate(response?.data?.data?.is_status); // Perbarui status
            newStatus(response?.data?.data?.task?.is_status)
            await Swal.fire({
              title: response.data.message,
              text: "Successfully Update Status Task",
              icon: "success",
            });
            Swal.close();
          }
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          text:
            error.response?.data?.message || "Terdapat Kesalahan Input Data",
          icon: "warning",
        });
      }
    };
    
  return (
    <Modal show={visible} onHide={onClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Change Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit} className='mb-3 p-2'>
                <label htmlFor="">Select Status</label>
                <select name='status' className='form-control' onChange={(e) => handleChange(e)} required>
                    <option value="">Select Choose</option>
                    <option value="0">Not Started</option>
                    <option value="1">In Progress</option>
                    <option value="2">Completed</option>
                    <option value="3">Missed</option>
                    <option value="4">Transfer</option>
                </select>

               {status.status === "4" ? <> 
               <div className='col-md-12 mt-2'>
               <label htmlFor="">Select Task</label>
               <Select options={SelectTask()} 
               placeholder="Select Task"
                onChange={(selectedOption) => handleChange({
                  target:{
                    name:'destination_task_uid',
                    value:selectedOption.value
                  }
                })}/>
               </div>
             
               <div className="form-group mt-3 mb-2">
                        <label className="text-muted">Start Date:</label>
                        <input
                        type="datetime-local"
                        className="form-control"
                        placeholder="What did you think?"
                        name='start_date'
                        onChange={(e) => {
                          const {name, value} = e.target;
                          const formattedValueStart = value.replace("T", " ") + ":00";
                          handleChange({target: {name, value : formattedValueStart}})
                        }}
                        />
                    </div>
                </> :
               ''}
                <button
                    className="btn btn-secondary mb-4 mt-3 ms-2 d-flex float-end "
                    onClick={onClose}
                >
                    Cancel
                 </button>
                 <button className="btn btn-primary mb-4 mt-3 d-flex float-end" onClick={(e) => handleSubmit(e)}>
                    Save Changes
                </button>
            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default ChangeStatus