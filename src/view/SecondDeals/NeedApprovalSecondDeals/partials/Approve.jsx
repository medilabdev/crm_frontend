import Swal from "sweetalert2";

export const handleApprove = async () => {
  const isResult = await Swal.fire({
    title: "Apakah Kamu yakin untuk Approve?",
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "Approve",
    cancelButtonText: "Close",
  });
};

export const handleReject = async () => {
  const isResult = await Swal.fire({
    title: "Apakah Kamu yakin untuk Reject?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "red",
    confirmButtonText: "Reject",
    cancelButtonText: "Close",
  });
};
