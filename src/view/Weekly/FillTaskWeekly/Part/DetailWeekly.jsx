import {
  faBan,
  faCalendar,
  faCheck,
  faCircle,
  faCoins,
  faEdit,
  faExchangeAlt,
  faEye,
  faFileAlt,
  faPlus,
  faSpinner,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { getStatusStyle, token } from '../../WeeklyTask/Part/Columns';
import ReactQuill from 'react-quill';
import ChangeStatus from './ChangeStatus';
import Swal from 'sweetalert2';
import axios from 'axios';
import ShowNoteDetail from './showNoteDetail';
import InputNoteDetail from './editNoteDetail';
import { handleSubmit } from './System';
import EditNoteDetail from './editNoteDetail';

const DetailWeekly = ({ detailWeekly, setStatus }) => {
  const backgroundStyle = {
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "1rem",
  };

  const [uploadForms, setUploadForms] = useState([]);
  const [inputData, setInputData] = useState({});
  const [errors, setErrors] = useState({});
  const [editOrShow, setEditOrShow] = useState(false);
  const handleEditOrShow = () => setEditOrShow(!editOrShow)
  
  const [taskDetails, setTaskDetails] = useState(detailWeekly?.task_detail || [])
  // Menambahkan form upload baru
  const addUploadForm = (taskIndex) => {
    setUploadForms((prevForm) => ({
      ...prevForm,
      [taskIndex]: [
        ...(prevForm[taskIndex] || []),
        { id: Date.now(), file: null },
      ],
    }));
  };

  // Menghapus form upload
  const removeUploadForm = (taskIndex, formId) => {
    setUploadForms((prevForm) => ({
      ...prevForm,
      [taskIndex]: prevForm[taskIndex]?.filter((form) => form.id !== formId) || [],
    }));
  };

  // Mengubah file pada form tertentu
  const handleFileChange = (taskIndex, formId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "image/png", "image/jpeg", "application/pdf",
      "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        `File type ${file.type} tidak diperbolehkan. Harus berupa gambar (JPG/PNG), PDF, Word, Excel, atau Notes.`
      );
      return;
    }

    const fileType = file.type.startsWith("image/") ? "image" : "file";

    setUploadForms((prevForms) => ({
      ...prevForms,
      [taskIndex]: prevForms[taskIndex]?.map((form) =>
        form.id === formId ? { ...form, file, fileType } : form
      ),
    }));
  };

  const handleInputData = (e, index) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [index]: { ...(prevData[index] || {}), [name]: value },
    }));
    setErrors((prevError) => ({
      ...prevError,
      [index]: {},
    }));
  };

  const getStatusText = (status) => {
    const statusMap = {
      "0": (
        <>
          <FontAwesomeIcon icon={faCircle} /> Not Started
        </>
      ),
      "1": (
        <>
          <FontAwesomeIcon icon={faSpinner} /> In Progress
        </>
      ),
      "2": (
        <>
          <FontAwesomeIcon icon={faCheck} /> Completed
        </>
      ),
      "3": (
        <>
          <FontAwesomeIcon icon={faBan} /> Missed
        </>
      ),
      "4": (
        <>
          <FontAwesomeIcon icon={faExchangeAlt} /> Transfers
        </>
      ),
    };
    return statusMap[status] || "-";
  };
  
  
  const [modalStatus, setModalStatus] = useState(null);
  const handleOpenStatus  = (taskIndex) => setModalStatus(taskIndex);
  const handleCloseStatus = () => {
    setModalStatus(null); // Tutup modal
  };
  console.log(taskDetails);
  
  const handleStatusUpdate = (taskIndex, newStatus) => {
    setTaskDetails((prevDetail) => {
      const updatedDetails = [...prevDetail];
      updatedDetails[taskIndex] = {
        ...updatedDetails[taskIndex],
        is_status : newStatus
      }      
      return updatedDetails
    })

    handleCloseStatus()
  }

  useEffect(() =>{
    if(detailWeekly?.task_detail){
      setTaskDetails(detailWeekly?.task_detail)
    }
  }, [detailWeekly])

  
  
  return (
    <div>
      {taskDetails?.map((data, taskIndex) => {
        const notes = data?.notes || null;
        const dealsCompany = data?.deals?.company?.name || "-";
        const statusStyle = getStatusStyle(data?.is_status);
        const statusText = getStatusText(data?.is_status);
        const startDate = data?.start_date
          ? new Date(data.start_date).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })
          : "-";
          
          
        return (
          <div key={taskIndex} className="col-md-12 mb-5">
            <div style={backgroundStyle} className="row p-4 rounded shadow-sm">
              {/* Header */}
              <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">{data?.task_name || "Untitled Task"}</h5>
                {data?.is_status === "4" ? '' : (
                    <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleOpenStatus(taskIndex)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Change Status
                  </button>
                )}
              
                
                {modalStatus === taskIndex && ( // Render modal hanya jika indeks cocok
                  <ChangeStatus
                    visible={true}
                    onClose={handleCloseStatus}
                    uid={data?.uid}
                    token={token}
                    onUpdate={(newStatus) => handleStatusUpdate(taskIndex, newStatus)}
                    newStatus={setStatus}
                  />
                )}
              </div>

              {/* Task Details */}
              <div className="row mt-3">
                <Col>
                  <span className="fw-bold">Deals:</span>{" "}
                  <FontAwesomeIcon
                    icon={faCoins}
                    className="ms-2 me-2 fs-5 text-warning"
                  />
                  <a href={`/deals-second/${data?.deals_uid}/edit`} className='text-decoration-none text-dark'>
                  <span className="fs-6">{dealsCompany}</span>
                  </a>
                </Col>
                <Col>
                  <span className="fw-bold">Status:</span>{" "}
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "15px",
                      fontWeight: "600",
                      ...statusStyle,
                    }}
                  >
                    {statusText}
                  </span>
                </Col>
                <Col>
                  <span className="fw-bold">Start Date:</span>{" "}
                  <FontAwesomeIcon icon={faCalendar} className="text-primary" />{" "}
                  {startDate} WIB
                </Col>
              </div>

              {/* Notes Section */}
              {notes ? (
                <div className="row mt-4">
                  <div className="col-md-12 mb-3">
                    
                    <Card className="mb-3 shadow-sm">
                    <div className="d-flex p-1">
                      <button
                        className="btn btn-primary ms-auto"
                        onClick={handleEditOrShow}
                      >
                        <FontAwesomeIcon icon={editOrShow ? faEye : faEdit } />
                      </button>
                    </div>
                    {editOrShow && data?.is_status !== "4" ? (
                      <>
                          <EditNoteDetail
                          errors={errors}
                          taskIndex={taskIndex}
                          data={data}
                          taskDetails={taskDetails}
                          setTaskDetails={setTaskDetails}
                          uploadForms={uploadForms}
                          handleFileChange={handleFileChange}
                          removeUploadForm={removeUploadForm}
                          addUploadForm={addUploadForm}
                          setUploadForms={setUploadForms}
                        />
                      </>
                    ) : ( <>
                      <ShowNoteDetail notes={notes} />
                    </>) }
                    </Card>
                  </div>
                </div>
              ) : (
                <>
                  {/* Input Section */}
                  <div className="row mt-4">
                    <div className="col-md-12 mb-3">
                      <div className="form-floating p-1">
                        <input
                          type="text"
                          placeholder="Input in here"
                          className={`form-control ${
                            errors[taskIndex]?.title ? "is-invalid" : ""
                          }`}
                          name="title"
                          value={inputData[taskIndex]?.title || ""}
                          required
                          onChange={(e) => handleInputData(e, taskIndex)}
                          disabled={data?.is_status === "4"}
                        />
                        <label htmlFor="floatingInput">Title</label>
                        {errors[taskIndex]?.title && (
                          <div className="invalid-feedback">
                            {errors[taskIndex].title}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="description"
                        className="fw-medium ms-2"
                      >
                        Description
                      </label>
                      <ReactQuill
                        className="p-2"
                        theme="snow"
                        onChange={(value) =>
                          handleInputData(
                            { target: { name: "description", value } },
                            taskIndex
                          )
                        }
                        readOnly={data?.is_status === "4"}
                      />
                    </div>
                  </div>

                  {/* Attachment Section */}
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <label className="fw-medium ms-2">Attachment</label>
                    </div>
                    <div className="d-flex flex-wrap gap-3 align-items-start">
                      {(uploadForms[taskIndex] || []).map((form) => (
                        <div
                          key={form.id}
                          style={{
                            border: "2px dashed #d3d3d3",
                            borderRadius: "10px",
                            padding: "10px",
                            textAlign: "center",
                            backgroundColor: "#f9f9f9",
                            cursor: "pointer",
                            width: "150px",
                          }}
                        >
                          <input
                            type="file"
                            style={{ display: "none" }}
                            id={`fileUpload-${form.id}`}
                            onChange={(e) =>
                              handleFileChange(taskIndex, form.id, e)
                            }
                          />
                          <label
                            htmlFor={`fileUpload-${form.id}`}
                            style={{ cursor: "pointer" }}
                          >
                            {!form.file ? (
                              <>
                                <FontAwesomeIcon
                                  icon={faUpload}
                                  className="text-primary"
                                  size="2x"
                                />
                                <p>Upload File</p>
                                <small
                                  style={{ color: "#007bff", cursor: "pointer" }}
                                >
                                  Click to replace file
                                </small>
                              </>
                            ) : (
                              <>
                                <FontAwesomeIcon
                                  icon={faFileAlt}
                                  className="text-success"
                                  size="2x"
                                />
                                <p>File</p>
                                <small
                                  style={{ color: "#007bff", cursor: "pointer" }}
                                >
                                  Click to replace file
                                </small>
                              </>
                            )}
                          </label>
                          <button
                            className="btn btn-danger btn-sm mt-2"
                            onClick={() =>
                              removeUploadForm(taskIndex, form.id)
                            }
                          >
                            <FontAwesomeIcon icon={faTrash} /> Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="col-md-12 mt-3">
                      {data.is_status === "4" ? "" : (
                           <button
                           className="btn btn-outline-primary btn-sm ms-2"
                           onClick={() => addUploadForm(taskIndex)}
                         >
                           <FontAwesomeIcon icon={faPlus} /> Add Another Attachment
                         </button>
                      )}
                   
                    </div>
                    <div className="col-md-12 mt-4">
                      {data?.is_status !== "4" ?
                      (
                        <button
                        className="btn btn-primary ms-2 d-flex float-end"
                        onClick={(e) =>
                          handleSubmit(
                            taskIndex,
                            e,
                            inputData,
                            uploadForms,
                            data?.uid,
                            token,
                            setErrors,
                            setTaskDetails,
                            setUploadForms
                          )
                        }
                      >
                        Submit
                      </button>
                      ) : ''}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailWeekly;
