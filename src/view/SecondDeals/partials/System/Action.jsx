import axios from "axios";
import Swal from "sweetalert2";

export const handleDeleteDataTable = (uid, token, e) => {
    e.preventDefault()
    Swal.fire({
        title: "Konfirmasi",
        text: "Apakah kamu yakin ingin menghapus ini deals ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      }).then((res) => {
        if (res.isConfirmed) {
          axios
            .delete(
              `${process.env.REACT_APP_BACKEND_URL}/v2/deals/${uid}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              Swal.fire({
                title: res.data.message,
                text: "Successfully delete deals",
                icon: "success",
              }).then((res) => {
                if (res.isConfirmed) {
                  window.location.reload();
                }
              });
            })
            .catch((err) => {
              if (err.response.data.message === "Delete failed!") {
                Swal.fire({
                  title: "Delete Failed",
                  text: "Tidak dapat menghapus, data master ini terkait dengan data lainnya",
                  icon: "warning",
                });
              }
            });
        }
      });
}