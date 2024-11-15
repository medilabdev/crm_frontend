import React from "react";
import { Table } from "react-bootstrap";

const Timeline = ({ statusKerjaSama, handleInputTimeline }) => {
  const cellStyle = {
    padding: "10px",
    textAlign: "center",
    border: "1px solid #dee2e6",
  };

  const headerStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
  };

  const subHeaderStyle = {
    backgroundColor: "#d1ecf1",
    color: "#0c5460",
  };

  const rowEvenStyle = {
    backgroundColor: "#f2f2f2",
  };

  const rowHoverStyle = {
    backgroundColor: "#e9ecef",
  };

  const checkboxStyle = {
    width: "14px",
    height: "13px",
    cursor: "pointer",
  };

  const processNames = [
    "Renovasi",
    "Kirim Mesin",
    "Install Mesin",
    "Izin HD & BPJS",
    "Training",
    "1st Running Patient",
  ];

  return (
    <div className="table-responsive">
      <Table className="table caption-top table-bordered">
        <caption className="fw-bold fs-5">Timeline</caption>
        <thead className="text-center table-info">
          <tr>
            <th
              colSpan="13"
              style={{
                background: "linear-gradient(135deg, #386f93, #327cad)",
                textTransform: "uppercase",
                color: "white",
                letterSpacing: "1.2px",
              }}
            >
              Minggu
            </th>
          </tr>
        </thead>
        <thead className="table-primary">
          <tr className="text-center">
            <th scope="col" className="fw-bold" style={headerStyle}>
              Process
            </th>
            {[...Array(12)].map((_, i) => (
              <th key={i + 1} scope="col" style={headerStyle}>
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr style={rowEvenStyle}>
            <td style={{ ...cellStyle, fontWeight: "500", letterSpacing: "1px" }}>
              {statusKerjaSama === "hs_L0YxrtdK1"
                ? "Replace"
                : statusKerjaSama === "ls_Y7hsg13Gg"
                ? "New HD"
                : statusKerjaSama === "jR_1YgF86Ll"
                ? "Expand"
                : ""}
            </td>
            {[...Array(12)].map((_, weekIndex) => (
              <td key={weekIndex + 1} style={cellStyle}>
                <input
                  type="checkbox"
                  name={`timeline[0][${weekIndex + 1}]`}
                  onChange={(e) => handleInputTimeline(e, 0, weekIndex + 1)}
                  className="form-check-input border-secondary"
                  style={checkboxStyle}
                />
              </td>
            ))}
          </tr>
          {processNames.map((processName, processIndex) => (
            <tr key={processName} style={processIndex % 2 === 0 ? rowEvenStyle : null}>
              <td style={{ ...cellStyle, fontWeight: "500", letterSpacing: "0.2px" }}>
                {processName}
              </td>
              {[...Array(12)].map((_, weekIndex) => (
                <td key={weekIndex + 1} style={cellStyle}>
                  <input
                    type="checkbox"
                    name={`timeline[${processIndex + 1}][${weekIndex + 1}]`}
                    onChange={(e) => handleInputTimeline(e, processIndex + 1, weekIndex + 1)}
                    className="form-check-input border-secondary"
                    style={checkboxStyle}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Timeline;
