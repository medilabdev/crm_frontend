import axios from "axios";
import Swal from "sweetalert2";

export const HandleDeleteWeeklyTask = (uid, token, e) => {
    e.preventDefault()
    try {
        Swal.fire({
            title: "Konfirmasi",
            text: "Apakah kamu yakin ingin menghapus ini Weekly ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then(async(res) => {
            if(res.isConfirmed){
                const formData = new FormData()
                formData.append("task[0][uid]", uid || '')
                formData.append("_method", "delete")
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/v2/tasks/bulk/delete`,
                    formData,
                    {
                        headers:{
                            Authorization :`Bearer ${token}`
                        }
                    }
                )
                Swal.close()
                await Swal.fire({
                    title:response.data.message,
                    text:"Berhasil Menghapus Data",
                    icon: "success",
                }).then((res) => {
                    if(res.isConfirmed){
                        window.location.reload();
                    }
                })
             
            }
        })      
    } catch (error) {
        
        if (error.response) {
            Swal.fire({
              text: error.response.data.message,
              icon: "warning",
            });
          } else {
            Swal.fire({
              text: "Something went wrong !",
              icon: "error",
            });
          }
    }
    
}