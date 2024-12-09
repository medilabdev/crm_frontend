import axios from "axios";
import Swal from "sweetalert2"
import index from "../..";
import { token } from "../../Part/Columns";

export const handleUpdate = async (e, inputData, token, uid, setInputData) => {
    e.preventDefault()
    try {
        let timerInterval;
        const { isConfirmed } = await Swal.fire({
            title: "Apakah kamu sudah yakin untuk menyimpan ? ",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak"
        })
        if(isConfirmed){
            Swal.fire({
                title: "Loading...",
                html: "Tolong Tunggu <b></b> Beberapa Detik.",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const timer = Swal.getPopup().querySelector("b");
                  if (timer) {
                    timerInterval = setInterval(() => {
                      if (timer.textContent) {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                      }
                    }, 100);
                  }
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              });
              const formData = new FormData();
              formData.append("task_name", inputData.task_name || '')
              formData.append("start_date", inputData.start_date || '')
              formData.append("due_date", inputData.due_date || '')
              formData.append("task_owner", inputData.task_owner || '')
              formData.append("_method", "put")
            // for (const pair of formData.entries()) {
            //     console.log(pair[0] + ": " + pair[1]);
            //   }
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/v2/tasks/${uid}`, formData,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const updatedData = response.data.data;
            setInputData((prevTasks) => ({
               ...prevTasks,
               ...updatedData
            }))
            
            Swal.close()
            await Swal.fire({
                title: response.data.message,
                text: "Successfully Update Data Task",
                icon:"success"
            })
        }
    } catch (error) {
        if(error.message){
            Swal.fire({
                text:error.response.data.message,
                icon:"warning"
            })
        }else{
            Swal.fire({
                text:"Something went wrong !",
                icon:"error"
            })
        }
    }
}


export const HandleUpdateDetail = async (e, token, DetailTasks, setDetailTasks) => {
    e.preventDefault()
    try {
        let timerInterval;
        const { isConfirmed } = await Swal.fire({
            title: "Apakah kamu sudah yakin untuk menyimpan ? ",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak"
        })
        if(isConfirmed){
            Swal.fire({
                title: "Loading...",
                html: "Tolong Tunggu <b></b> Beberapa Detik.",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const timer = Swal.getPopup().querySelector("b");
                  if (timer) {
                    timerInterval = setInterval(() => {
                      if (timer.textContent) {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                      }
                    }, 100);
                  }
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              });
              const formData = new FormData();
              formData.append("task_name", DetailTasks.task_name || '')
              formData.append("start_date", DetailTasks.start_date || '')
              formData.append("deals_uid", DetailTasks.deals_uid || '')
              formData.append("_method", "put")
            // for (const pair of formData.entries()) {
            //     console.log(pair[0] + ": " + pair[1]);
            //   }
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/v2/tasks/detail/update/${DetailTasks.uid}`, formData,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            Swal.close()
            const updatedData = response.data.data;
            
            setDetailTasks((prevTasks) => {
                const updatedTasks = [...prevTasks];
                
                updatedTasks[index] = {
                    ...updatedTasks[index],
                    ...updatedData
                }
                return updatedTasks
            })         
            await Swal.fire({
                title: response.data.message,
                text: "Successfully Update Data Task",
                icon:"success"
            })
        }
    } catch (error) {
        if(error.message){
            Swal.fire({
                text:error.response.data.message,
                icon:"warning"
            })
        }else{
            Swal.fire({
                text:"Something went wrong !",
                icon:"error"
            })
        }
    }
}

export const HandleDeleteTaskDetail = async (e, token, uid, setDetailTasks) => {
    e.preventDefault()
    try {
        let timerInterval;
        const { isConfirmed } = await Swal.fire({
            title: "Apakah kamu sudah yakin untuk Menghapus Ini ? ",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak"
        })
        if(isConfirmed){
            Swal.fire({
                title: "Loading...",
                html: "Tolong Tunggu <b></b> Beberapa Detik.",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const timer = Swal.getPopup().querySelector("b");
                  if (timer) {
                    timerInterval = setInterval(() => {
                      if (timer.textContent) {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                      }
                    }, 100);
                  }
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              });
            const response = await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/v2/tasks/detail/delete/${uid}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            Swal.close()
            
            setDetailTasks((prevTasks) => prevTasks.filter((task) => task.uid !== uid )
        )         
            await Swal.fire({
                title: response.data.message,
                text: "Successfully Update Data Task",
                icon:"success"
            })
        }
    } catch (error) {
            Swal.fire({
                text:error.response.data.message || "Something Went Wrong",
                icon:"warning"
            })
    }
}


export const HandleCreateTaskDetail = async (e, token, DetailTasks, setDetailTasks, uid, index) => {
    e.preventDefault()
    
    try {
        let timerInterval;
        const { isConfirmed } = await Swal.fire({
            title: "Apakah kamu sudah yakin untuk menyimpan ? ",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak"
        })
        if(isConfirmed){
            Swal.fire({
                title: "Loading...",
                html: "Tolong Tunggu <b></b> Beberapa Detik.",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const timer = Swal.getPopup().querySelector("b");
                  if (timer) {
                    timerInterval = setInterval(() => {
                      if (timer.textContent) {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                      }
                    }, 100);
                  }
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              });
              const formData = new FormData();
              formData.append("details[0][task_name]", DetailTasks.task_name || '')
              formData.append("details[0][start_date]", DetailTasks.start_date || '')
              formData.append("details[0][deals_uid]", DetailTasks.deals_uid || '')
            // for (const pair of formData.entries()) {
            //     console.log(pair[0] + ": " + pair[1]);
            //   }
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/v2/tasks/detail/create/${uid}`, formData,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            Swal.close()
            const updatedData = response.data.data;
            
            setDetailTasks((prevTasks) => {
                const updatedTasks = [...prevTasks];
                updatedTasks[index] = {
                    ...updatedTasks[index], 
                    uid: updatedData.uid,   
                    start_date: updatedData.start_date,
                    task_name:updatedData.task_name,
                    deals_uid:updatedData.deals_uid
                };
                return updatedTasks;
            });     
            await Swal.fire({
                title: response.data.message,
                text: "Successfully Update Data Task",
                icon:"success"
            })
        }
    } catch (error) {
        if(error.message){
            Swal.fire({
                text:error.response.data.message,
                icon:"warning"
            })
        }else{
            Swal.fire({
                text:"Something went wrong !",
                icon:"error"
            })
        }
    }
}