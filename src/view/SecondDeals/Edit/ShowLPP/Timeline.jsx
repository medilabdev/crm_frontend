import React from "react";

const Timeline = ({ data }) => {
  const cellStyle = {
    padding: "10px",
    textAlign: "center",
    border: "1px solid #dee2e6",
    fontSize: "14px",
    fontFamily:"Rubik",
    backgroundColor:"white"
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


  return (
    <div>
      <table className="table table-sm caption-top table-bordered">
        <thead className="text-center table-info">
          <tr>
            <th colSpan="13"
                style={{
                  background: "linear-gradient(135deg, #386f93, #327cad)",
                  textTransform: "uppercase",
                  color: "white",
                  letterSpacing: "1.2px",
                }}
                >Minggu</th>
          </tr>
        </thead>
        <thead className="table-primary">
          <tr> 
            <th scope="col" className="fw-bold text-center" style={headerStyle}>
              Process
            </th>
            {[...Array(12)].map((_, i) => (
              <th key={i + 1} scope="col" className="text-center" style={headerStyle}>
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody> 
          {data?.timeline?.map((item) => (
            <tr style={rowEvenStyle}>
              <td style={{ ...cellStyle, fontWeight: "500", letterSpacing: "1px" }} >{item?.name}</td>
              <td style={cellStyle}><input type="checkbox" checked={item?.[0] == 1} className="form-check-input border-secondary" style={checkboxStyle} /></td>
              <td style={cellStyle}><input type="checkbox" checked={item?.[1] == 1} className="form-check-input border-secondary" style={checkboxStyle} /></td>
              <td style={cellStyle}><input type="checkbox" checked={item?.[2] == 1} className="form-check-input border-secondary" style={checkboxStyle} /></td>
              <td style={cellStyle}><input type="checkbox" checked={item?.[3] == 1} className="form-check-input border-secondary" style={checkboxStyle} /></td>
              <td style={cellStyle}><input type="checkbox" checked={item?.[4] == 1} className="form-check-input border-secondary" style={checkboxStyle} /></td>
              <td style={cellStyle}><input type="checkbox" checked={item?.[5] == 1} className="form-check-input border-secondary" style={checkboxStyle} /></td>
              <td style={cellStyle}><input type="checkbox" checked={item?.[6] == 1} className="form-check-input border-secondary" style={checkboxStyle} /></td>
              <td style={cellStyle}><input type="checkbox" checked={item?.[7] == 1} className="form-check-input border-secondary" style={checkboxStyle} /></td>
              <td style={cellStyle}><input type="checkbox" checked={item?.[8] == 1} className="form-check-input border-secondary" style={checkboxStyle} /></td>
              <td style={cellStyle}><input type="checkbox" checked={item?.[9] == 1} className="form-check-input border-secondary" style={checkboxStyle} /></td>
              <td style={cellStyle}><input type="checkbox" checked={item?.[10] == 1} className="form-check-input border-secondary" style={checkboxStyle} /></td>
              <td style={cellStyle}><input type="checkbox" checked={item?.[11] == 1} className="form-check-input border-secondary" style={checkboxStyle} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timeline;
