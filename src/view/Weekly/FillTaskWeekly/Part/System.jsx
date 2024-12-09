import axios from "axios";
import Swal from "sweetalert2";
import index from "../../WeeklyTask";

export const handleSubmit = async (index, e, inputData, uploadForms, uid, token, setErrors, setTaskDetails, setUploadForms) => {
    e.preventDefault();    
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Apakah kamu yakin untuk menyimpan?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });

      if (!isConfirmed) return;

      const resultInputData = inputData[index];
      const resultFile = uploadForms[index];
      const newErrors = {};

      if (!resultInputData || !resultInputData.title?.trim()) {
        newErrors.title = "Title wajib diisi";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [index]: newErrors,
        }));
        return;
      }

      Swal.fire({
        title: "Loading...",
        html: "Tolong Tunggu Beberapa Detik.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const formData = new FormData();
      formData.append("title", resultInputData.title || "");
      formData.append("description", resultInputData.description || "");

      resultFile?.forEach((data, idx) => {
        if (data.file) {
          formData.append(`attachment[${idx}][filename]`, data.file || "");
          formData.append(`attachment[${idx}][type_file]`, data.fileType || "");
        }
      });
      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/v2/tasks/detail/note/create/${uid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      
      
      if(response.status === 201){
        setTaskDetails((prevDetails) => {
          const updatedDetails = [...prevDetails]; // Salin array lama
          updatedDetails[index] = {
            ...updatedDetails[index], // Salin data yang ada
            notes: { // Salin data notes yang ada
              uid: response.data?.data?.uid, // Perbarui UID
              title: response.data?.data?.title, // Perbarui title
              description: response.data?.data?.description, // Perbarui description
              attachments: response.data?.data?.attachments || [], // Perbarui attachments jika ada
            },
          };
          return updatedDetails; // Return array yang sudah diperbarui
        });

        setUploadForms((prevForms) => {
          const updatedForms = Array.isArray(prevForms) ? [...prevForms] : []; // Pastikan prevForms adalah array
          updatedForms[index] = [{ file: null, fileType: "" }]; // Tetap satu form kosong
          return updatedForms;
        });
        Swal.fire({
          title: response.data.message,
          text: "Successfully Update Data Task",
          icon: "success",
        })
        Swal.close();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "Terdapat Kesalahan Input Data",
        icon: "warning",
      });
    }
  }; 

export const handleUpdate = async(e, edit, token, setTaskDetails, index)=>{
    e.preventDefault();
    
    try {

      const { isConfirmed } = await Swal.fire({
        title: "Apakah kamu yakin untuk menyimpan?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });

      if(!isConfirmed) return
      
      Swal.fire({
        title: "Loading...",
        html: "Tolong Tunggu Beberapa Detik.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const formData = new FormData();
      formData.append("title", edit?.notes?.title || "");
      formData.append("description", edit?.notes?.description || "");
      formData.append("_method", "put");
      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/v2/tasks/detail/note/update/${edit?.notes?.uid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(response.status === 201){
        setTaskDetails((prevDetails) => {
          const updatedDetails = [...prevDetails];
          updatedDetails[index] = {
            ...updatedDetails[index],
            notes:{
              ...updatedDetails[index].notes,
              ...response.data.data
            }
          }          
          return updatedDetails;
        })


        Swal.close();
        Swal.fire({
          title: response.data.message,
          text: "Successfully Update Data Task",
          icon: "success",
        })
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "Terdapat Kesalahan Input Data",
        icon: "warning",
      });
    }
}

export const handleUpdateFile = async(e) => {
  e.preventDefault()

  try {
    const { isConfirmed } = await Swal.fire({
      title: "Apakah kamu yakin untuk menyimpan?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });

    if(!isConfirmed) return;
  } catch (error) {
    console.log(error);
    Swal.fire({
      text: "Terdapat Kesalahan Input Data",
      icon: "warning",
    });
  }
}

export const removeImageNotePermanent = async(e, uid, setTaskDetails, token, taskIndex) => {
  e.preventDefault()
  try {
    const { isConfirmed } = await Swal.fire({
      title: "Apakah kamu yakin untuk Menghapus data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });

    if(!isConfirmed) return

    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/v2/tasks/detail/note/attachment/delete/${uid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(response.status === 201){
      setTaskDetails((prevDetails) => {
        const updatedDetails = [...prevDetails]
        const updatedAttachment = updatedDetails[taskIndex]?.notes?.attachments?.filter((data) => data?.uid !== uid)
        updatedDetails[taskIndex] = {
          ...updatedDetails[taskIndex],
          notes:{
            ...updatedDetails[taskIndex].notes,
            attachments:updatedAttachment
          }
        }
        return updatedDetails;
      })
    }
    
    Swal.close();
    Swal.fire({
      title: response.data.message,
      text: "Successfully Update Data Task",
      icon: "success",
    })

  } catch (error) {
    console.log(error);
    Swal.fire({
      text: "Terdapat Kesalahan Input Data",
      icon: "warning",
    });
  }
}

export const handleCreateAttachmentNew = async(e, taskIndex, uploadForms, setTaskDetails, uid, token, setUploadForms) =>{  
  
  e.preventDefault()
  try {
    const { isConfirmed } = await Swal.fire({
      title: "Apakah kamu yakin untuk menyimpan?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });

    if(!isConfirmed) return
    const formData = new FormData();
    uploadForms[taskIndex]?.forEach((data, idx) => {
      if(data.file){
        formData.append(`attachment[${idx}][filename]`, data.file || "")
        formData.append(`attachment[${idx}][type_file]`, data.fileType || '')
      }
    })
    for (const pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/v2/tasks/detail/note/attachment/create/${uid}`, 
      formData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    
    setTaskDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      const updatedAttachment = [...(updatedDetails[taskIndex]?.notes?.attachments || []),
      ...response.data?.data,
    ];
    updatedDetails[taskIndex] = {
      ...updatedDetails[taskIndex],
      notes: {
        ...updatedDetails[taskIndex].notes,
        attachments: updatedAttachment,
      },
    };

    setUploadForms((prevForms) => {
      const updatedForms = Array.isArray(prevForms) ? [...prevForms] : []; // Pastikan prevForms adalah array
      updatedForms[taskIndex] = [{ file: null, fileType: "" }]; // Tetap satu form kosong
      return updatedForms;
    });

    return updatedDetails;
    })
    Swal.close();
    Swal.fire({
      title: response.data.message,
      text: "Successfully Update Data Task",
      icon: "success",
    })
  } catch (error) {
    console.log(error);
    Swal.fire({
      text: "Terdapat Kesalahan Input Data",
      icon: "warning",
    });
  }
}