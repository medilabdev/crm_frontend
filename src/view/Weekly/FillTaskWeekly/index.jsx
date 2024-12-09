import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
  faCircle,
  faExchangeAlt,
  faSpinner,
  faCheckCircle,
  faCalendar,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import Breadcrumb from "./Part/breadcrumb";
import { GetDetailWeeklyPlanTask } from "../../../action/GetDataTask";
import IconImage from "../../../assets/img/man.png";
import { getStatusStyle } from "../WeeklyTask/Part/Columns";
import DetailWeekly from "./Part/DetailWeekly";

const FillTaskWeekly = () => {
  const { uid } = useParams();
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const { detailWeekly } = useSelector((state) => state.DetailWeeklyTask);

  const [status, setStatus] = useState(detailWeekly?.is_status);
  

  useEffect(() => {
    dispatch(GetDetailWeeklyPlanTask(token, uid));
  }, [dispatch, token, uid]);

  return (
    <div id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <Breadcrumb />
          <Card className="shadow-sm p-4">
            {/* Header Section */}
            <div className="row mb-3">
              <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h4 className="mb-1 fw-bold">
                      {detailWeekly?.task_name || ""}
                    </h4>
                    <small className="text-muted">
                      Created at:{" "}
                      {detailWeekly?.created_at
                        ? new Date(detailWeekly.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )
                        : "-"}
                      WIB
                    </small>
                  </div>
                  <div>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "15px",
                        fontWeight: "600",
                        ...getStatusStyle(status),
                      }}
                    >
                      {status === "0" && (
                        <>
                          <FontAwesomeIcon icon={faCircle} /> Not Started
                        </>
                      )}
                      {status === "1" && (
                        <>
                          <FontAwesomeIcon icon={faSpinner} /> In Progress
                        </>
                      )}
                      {status === "2" && (
                        <>
                          <FontAwesomeIcon icon={faCheck} /> Completed
                        </>
                      )}
                      {status === "3" && (
                        <>
                          <FontAwesomeIcon icon={faBan} /> Missed
                        </>
                      )}
                      {status === "4" && (
                        <>
                          <FontAwesomeIcon icon={faExchangeAlt} /> Transfers
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Owner Information Section */}
            <div className="row mb-4">
              <div className="col-md-12 d-flex align-items-center">
                <Image
                  src={IconImage}
                  roundedCircle
                  className="me-3"
                  style={{ width: "50px", height: "50px" }}
                />
                <div>
                  <h6 className="mb-0">{detailWeekly?.owner?.name || "-"}</h6>
                  <small className="text-muted">
                    {detailWeekly?.owner?.email || "-"}
                  </small>
                </div>
              </div>
            </div>

            {/* Task Details Section */}
          
            <DetailWeekly detailWeekly={detailWeekly} setStatus={setStatus} />
          </Card>
        </div>
      </Main>
    </div>
  );
};

export default FillTaskWeekly;
