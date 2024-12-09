import axios from "axios";
import Swal from "sweetalert2";

export const handleSubmit = async(e, inputData, DetailTasks, token, auth_uid) => {
    e.preventDefault()
    try {
      let timerInterval;
      const { isConfirmed } = await Swal.fire({
        title: "Apakah kamu yakin untuk menyimpan?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });
      if (isConfirmed) {
        Swal.fire({
          title: "Loading...",
          html: "Tolong Tunggu Beberapa Detik.",
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
        formData.append("task_owner", inputData.task_owner || auth_uid)
        DetailTasks.map((data, index) => {
            formData.append(`details[${index}][task_name]`, data?.task_name || '')
            formData.append(`details[${index}][deals_uid]`, data?.deals_uid || '')
            formData.append(`details[${index}][start_date]`, data?.start_date || '')
      })
        
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/v2/tasks`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.close();
        await Swal.fire({
          title: response.data.message,
          text: "Successfully Created Data Task",
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.href = "/weekly-task";
          }
        });
      }
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