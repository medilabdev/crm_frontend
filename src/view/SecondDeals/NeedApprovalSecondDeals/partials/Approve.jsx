import axios from "axios";
import Swal from "sweetalert2";

export const token = localStorage.getItem("token");
export const handleApprove = async (uid) => {
  let timerInterval;
  try {
    const confirmationResult = await Swal.fire({
      title: "Apakah Kamu yakin untuk Approve?",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Approve",
      cancelButtonText: "Close",
    });
    if (confirmationResult.isConfirmed) {
      Swal.fire({
        title: "Loading...",
        html: "Tolong Tunggu <b></b> Beberapa Detik.",
        timer: 2500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
      const formData = new FormData();
      formData.append("temporary_deals_uid[0]", uid);
      formData.append("_method", "put");

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/v2/deals/accepted/manager`,
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
        text: "Approval Successfully",
        icon: "success",
      });
      window.location.reload();
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Something went wrong. Please try again later.",
      icon: "error",
    });
  }
};

export const handleReject = async (uid) => {
  let timerInterval;
  try {
    const { value: text, isConfirmed } = await Swal.fire({
      input: "textarea",
      inputLabel: "Alasan Reject",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });
    if (isConfirmed) {
      Swal.fire({
        title: "Loading...",
        html: "Tolong Tunggu <b></b> Beberapa Detik.",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
      const formData = new FormData();
      formData.append("notes", text);
      formData.append("temporary_deals_uid[0]", uid);
      formData.append("_method", "put");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/v2/deals/rejected/manager`,
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
        icon: "error",
      });
      window.location.href = "/deals-second";
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire({
      title: "Error!",
      text: "Something went wrong. Please try again later.",
      icon: "error",
    });
  }
};
