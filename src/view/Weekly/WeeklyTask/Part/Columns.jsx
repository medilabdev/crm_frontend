import { faCalendar, faEdit, faEnvelope, faFilePen, faPhone, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageIcon from "../../../../assets/img/man.png"
import { HandleDeleteWeeklyTask } from "./System";
import { ro } from "@faker-js/faker";
export const getStatusStyle = (status)  => {
  switch (status) {
    case "0":
      return {
        color :"#6c757d",
        backgroundColor:"#e9ecef"
      };
    case "1":
      return {
        color :"#0d6efd",
        backgroundColor:"#e7f1ff"
      }
    case "2":
      return {
        color :"#198754",
        backgroundColor: "#e9f7ef"
      }
    case "3": 
      return {
        color: "#dc3545",
        backgroundColor:"#f8d7da"
      }
    case "4":
      return{
        color:"#fd7e14",
        backgroundColor:"#fff4e5"
      };
      default:
        return{};
  }
}

export const containerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "1rem",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
  background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  fontFamily: "Arial, sans-serif",
};

export const dateStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.9rem",
  color: "#444",
};

export const iconStyle = {
  color: "#007bff",
  fontSize: "1rem",
};
export const token  = localStorage.getItem("token")

export const ColumnsWeeklyTask = (handleOpenOffcanvas) => [
    {
      name: "Task Name",
      selector: (row) => row.task_name,
      cell: (row) => (
        <div>
          <div style={{ fontWeight: "450", whiteSpace: "normal"}}>{row.task_name}</div>
         
        </div>
       
      ),
    },
    {
      name: "Status",
      selector: (row) => row.is_status,
      cell: (row) => {
        const totalTasks = row?.total_task_detail || 0;
        const completedTasks = row?.total_progress_detail || 0;
    
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign:'center' }}>
            {/* Status */}
            <span
              style={{
                padding: "5px 10px",
                borderRadius: "15px",
                fontWeight: "600",
                ...getStatusStyle(row.is_status),
              }}
            >
              {row.is_status === "0"
                ? "Not Started"
                : row?.is_status === "1"
                ? "In Progress"
                : row?.is_status === "2"
                ? "Completed"
                : row?.is_status === "3"
                ? "Missed"
                : "Transfers"}
            </span>
    
            {/* Progress Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", whiteSpace:'nowrap' }}>
              <div
                style={{
                  display: "flex",
                  width: "100px",
                  height: "8px",
                  borderRadius: "5px",
                  backgroundColor: "#e0e0e0",
                  overflow: "hidden",
                }}
              >
                {[...Array(totalTasks)].map((_, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      backgroundColor:
                        index < completedTasks ? "#28a745" : "#e0e0e0",
                      margin: "1px",
                    }}
                  ></div>
                ))}
              </div>
              <div style={{ fontSize: "0.8rem", fontWeight: "semibold" }}>
                {completedTasks}/{totalTasks}
              </div>
            </div>
          </div>
        );
      },
    },
    
      
    {
      name: "Owner Task",
      selector: (row) => {
        console.log(row);
        
      },
      cell: (row) => (
        <div className="d-flex align-items-center mt-2">
        <img
          src={ImageIcon}
          alt={row?.owner?.name || ''}
          style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
        />
        <div>
          <div style={{ fontWeight: "400" }}>{row?.owner?.name || ''}</div>
        </div>
      </div>
      ),
      grow:1.2
    },
    {
      name: "Date",
      selector: (row) => row.company.name,
      cell: (row) => {
        const tempStart = new Date(row.start_date);
        const tempDue = new Date(row.start_date);
        const formatDate = {
          year: "numeric",
          month: "short",
          day: "2-digit",
        };
        const formatResult = new Intl.DateTimeFormat("en-US", formatDate);
        const dateStart = formatResult.format(tempStart);
        const dateDue = formatResult.format(tempDue);
    
        const cellStyle = {
          whiteSpace: "normal",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          padding: "0.5rem",
          width: "100%",
        };
    
        const dateStyle = {
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.9rem",
          color: "#444",
        };
    
        const iconStyle = {
          color: "#007bff",
          fontSize: "1rem",
        };
    
        return (
          <div style={cellStyle}>
            <div style={dateStyle}>
              <FontAwesomeIcon icon={faCalendar} style={iconStyle} />
              <strong>Start Date</strong>
              <span>: {dateStart || "-"}</span>
            </div>
            <div style={dateStyle}>
              <FontAwesomeIcon icon={faCalendar} style={iconStyle} />
              <strong>Due Date</strong>
              <span>: {dateDue || "-"}</span>
            </div>
          </div>
        );
      },
      grow: 2, // Menambahkan properti `grow` untuk memperbesar kolom
    },
    
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <a className="btn btn-icon"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            href={`/weekly-task/${row?.uid}/note`}
          >
            <FontAwesomeIcon icon={faFilePen} style={{ color: "#0d6efd", fontSize: "18px" }} />
          </a>
          <a className="btn btn-icon"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            href={`/weekly-task/${row?.uid}/edit`}
          >
            <FontAwesomeIcon icon={faEdit} style={{ color: "#0D6EFD", fontSize: "18px" }} />
          </a>
          <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={(e) => HandleDeleteWeeklyTask(row?.uid, token, e)}
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "#DD3F45", fontSize: "18px" }} />
          </button>
        </div>
      ),
      center:true,
    },
  ];
  