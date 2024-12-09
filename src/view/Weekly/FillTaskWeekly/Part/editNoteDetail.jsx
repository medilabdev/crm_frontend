import { faFileAlt, faPlus, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import { handleCreateAttachmentNew, handleUpdate, removeImageNotePermanent } from './System';
import { token } from '../../WeeklyTask/Part/Columns';

const EditNoteDetail = ({errors, taskIndex, data, setTaskDetails, uploadForms, handleFileChange, removeUploadForm, addUploadForm, setUploadForms}) => {
  const [edit, setEdit] = useState(data)
  const handleEditChange = (e) => {
    const {name,value} = e.target;
    setEdit((prev) => ({
      ...prev,
      notes:{
        ...prev.notes,
        [name]:value
      }
    }))
  }

  const handleQuillChange = (value) => {
    setEdit((prevState) => ({
      ...prevState,
      notes: {
        ...prevState.notes,
        description: value, // Perbarui description
      },
    }));
  };
  
  
  return (
    <>
    <div className='card-body'>
            <div className="row mt-4">
                <div className="col-md-12 mb-3">
                    <div className="form-floating p-1">
                      <input type="text" placeholder="Input in here"
                               className={`form-control ${
                                  errors[taskIndex]?.title ? "is-invalid" : ""
                                }`}
                                name="title"
                                value={edit?.notes?.title || ''}
                                required
                                onChange={(e) => handleEditChange(e)}
                              
                              />
                      <label htmlFor="floatingInput">Title</label>
                          {errors[taskIndex]?.title && (
                          <div className="invalid-feedback">
                              {errors[taskIndex].title}
                          </div>)}
                    </div>
                </div>
                      <div className="col-md-12">
                            <label htmlFor="description" className="fw-medium ms-2">
                              Description
                            </label>
                            <ReactQuill
                              className="p-2"
                              theme="snow"
                              value={edit?.notes?.description || ""} // Mengambil nilai dari state
                              onChange={(value) => handleQuillChange(value)} // Tangani perubahan editor
                          />
                          </div>        
                        </div>
                        <div className="col-md-12 mt-4">
                            <button
                              className="btn btn-primary ms-2 d-flex float-end"
                              onClick={(e) =>
                                handleUpdate(e, edit, token, setTaskDetails, taskIndex)
                              }
                            >
                              Submit
                            </button>
                          </div>
                        {/* Attachment Section */}
                        <div className="row mt-4">
                          <div className="col-md-12">
                            <label className="fw-medium ms-2">Attachment</label>
                          </div>
                          <div className="d-flex flex-wrap gap-3 align-items-start">
                            {data?.notes && data?.notes?.attachments.map((dataImage, index) =>(
                                  <div
                                  key={index}
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
                                <FontAwesomeIcon
                                  icon={faFileAlt}
                                  className="text-success"
                                  size="2x"
                                />
                                <p>File</p>
                                <button
                                  className="btn btn-danger btn-sm mt-2"
                                  onClick={(e) => removeImageNotePermanent(e, dataImage.uid, setTaskDetails, token, taskIndex)}
                                >
                                  <FontAwesomeIcon icon={faTrash} /> Remove
                                </button>
                              </div>

                            ))}
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
                                  onChange={(e) => handleFileChange(taskIndex, form.id, e)}
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
                                      <small style={{ color: "#007bff", cursor: "pointer" }}>
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
                                      <small style={{ color: "#007bff", cursor: "pointer" }}>
                                        Click to replace file
                                      </small>
                                    </>
                                  )}
                                </label>
                                <button
                                  className="btn btn-danger btn-sm mt-2"
                                  onClick={() => removeUploadForm(taskIndex, form.id)}
                                >
                                  <FontAwesomeIcon icon={faTrash} /> Remove
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="col-md-12 mt-3">
                            <button
                              className="btn btn-outline-primary btn-sm ms-2"
                              onClick={() => addUploadForm(taskIndex)}
                            >
                              <FontAwesomeIcon icon={faPlus} /> Add Another Attachment
                            </button>
                          </div>
                          <div className="col-md-12 mt-4">
                        <button className="btn btn-primary ms-2" onClick={(e) => handleCreateAttachmentNew(e, taskIndex, uploadForms, setTaskDetails, edit?.notes?.uid, token, setUploadForms)}>
                          Simpan File
                        </button>
                    </div>
                         
                        </div>
    </div>
   </>
  )
}

export default EditNoteDetail;