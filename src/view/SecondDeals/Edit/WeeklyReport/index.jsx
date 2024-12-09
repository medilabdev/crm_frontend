import React from 'react'
import { Card, Col, Image, Modal } from 'react-bootstrap'
import ImageIcon from "../../../../assets/img/man.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCalendar, faCheck, faCircle, faCoins, faEdit, faExchangeAlt, faFileImage, faFilePdf, faSpinner } from '@fortawesome/free-solid-svg-icons';
const WeeklyReport = ({ data }) => {
  const dealsCompany = data?.company?.name || '';
  const weeklyTask = data?.weekly_task;

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

  const getStatusStyle = (status) => {
    const styles = {
      "0": { color: "#6c757d", backgroundColor: "#e9ecef" },
      "1": { color: "#0d6efd", backgroundColor: "#e7f1ff" },
      "2": { color: "#198754", backgroundColor: "#e9f7ef" },
      "3": { color: "#dc3545", backgroundColor: "#f8d7da" },
      "4": { color: "#fd7e14", backgroundColor: "#fff4e5" },
    };
    return styles[status] || {};
  };

  return (
    <div id="WeeklyActivities" className="col-12">
      {weeklyTask?.map((tempData, index) =>
        tempData?.task_details?.map((resData, indexSecond) => {
          const statusText = getStatusText(resData?.is_status);
          const statusStyle = getStatusStyle(resData?.is_status);
          const backgroundStyle = {
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            padding: "1rem",
          };
        
          
          const date =
            resData?.notes?.created_at || resData?.notes?.updated_at
              ? new Date(
                  resData?.notes?.created_at === resData?.notes?.updated_at
                    ? resData?.notes?.created_at
                    : resData?.notes?.updated_at
                ).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
              : "";
              
          const startDate = resData?.start_date
            ? new Date(resData.start_date).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })
            : "-";
              
          return (
          
            <div className="col-md-12 mb-5 p-2" key={`${index}-${indexSecond}`}>
              <div className="row p-4 rounded shadow-sm" style={backgroundStyle}>
                <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
                  <span className="mb-0 fs-4">Task : <span className='fw-medium fs-4'>{resData?.task_name || "-"}</span></span>
                </div>
                <Col>
                  <span className="fw-bold">Deals:</span>{" "}
                  <FontAwesomeIcon
                    icon={faCoins}
                    className="ms-2 me-2 fs-5 text-warning"
                  />
                  <span className="fs-6">{dealsCompany}</span>
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
                <Col md={12} lg={12} className="mt-2 shadow-sm">
                  <div className="mb-2">
                    <div className="d-flex p-2 mt-2">
                      <a
                        href={`/weekly-task/${tempData?.second_task?.uid}/note`}
                        className="btn btn-primary ms-auto"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </a>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                      <Image
                        src={ImageIcon}
                        alt="Task Icon"
                        roundedCircle
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          marginRight: "15px",
                        }}
                      />
                    <div>
                        <div className="text-muted">
                          {resData?.created_at === resData?.updated_at
                            ? "Created"
                            : "Updated"}{" "}
                          : {date}
                        </div>
                        <Card.Title>{resData?.notes?.title}</Card.Title>
                        <Card.Text style={{ textAlign: "justify" }}>
                          <span
                            dangerouslySetInnerHTML={{
                              __html:
                                resData?.notes?.description || "-",
                            }}
                          />
                          <div className="row mt-4">
                            {(resData?.notes && resData?.notes?.attachments) && resData?.notes?.attachments.map((file, indexFile) => (
                                 <div className="col-md-5 m-1" key={indexFile}>
                                 <div className="d-flex align-items-center border rounded p-3">
                                   <FontAwesomeIcon
                                     icon={file.type === "file" ? faFilePdf : faFileImage}
                                     className={`fs-2 me-3 ${file.type === "file" ? "text-danger" : "text-primary"}`}
                                   />
                                   <div className="filename-text-container">
                                     <a href={`${process.env.REACT_APP_BACKEND_IMAGE}/storage/file/tasks/notes/${file?.filename}`} className="text-decoration-none text-dark">
                                       <p className="mb-0 fw-bold filename-text">{file.filename}</p>
                                     </a>
                                   </div>
                                 </div>
                               </div>
                            ))}
                          </div>
                        </Card.Text>
                      </div>
                    </div>
                  </div>
                </Col>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};


export default WeeklyReport