import React from 'react'

const EditTimeline = ({ data, handleChangeTimeline, CategoryData}) => {
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
  const checkboxStyle = {
    width: "14px",
    height: "14px",
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
    <div className='table-responsive'>
      <table className="table table-sm caption-top table-bordered">
        <caption className="fw-bold fs-5">Timeline</caption>
        <thead className="text-center table-info">
          <tr>
            <th colSpan="13"
            style={{
              background: "linear-gradient(135deg, #386f93, #327cad)",
              textTransform: "uppercase",
              color: "white",
              letterSpacing: "1.2px",
            }}>Minggu</th>
          </tr>
        </thead>
        <thead className="table-primary">
          <tr className='text-center'>
            <th scope="col" className="fw-bold" style={headerStyle}>
              Process
            </th>
            {[...Array(12)].map((_, i) => (
              <th key={i } scope="col" style={headerStyle}>
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {data?.map((item, index) => (
            <tr>
              <td className="" style={{ ...cellStyle, fontWeight: "500", letterSpacing: "0.2px"}}>
                {index === 0 ? 
                    (CategoryData === "hs_L0YxrtdK1" ? "Replace" : CategoryData === "ls_Y7hsg13Gg" ? "New HD" : "Expand")
                    : item?.name
                }
              </td>
              <td style={cellStyle}><input type="checkbox"  style={checkboxStyle} checked={item?.[0] == 1} onChange={() => handleChangeTimeline(index, 0)} className="form-check-input border-secondary" /></td>
              <td style={cellStyle}><input type="checkbox" style={checkboxStyle} checked={item?.[1] == 1} onChange={() => handleChangeTimeline(index, 1)} className="form-check-input border-secondary" /></td>
              <td style={cellStyle}><input type="checkbox" style={checkboxStyle} checked={item?.[2] == 1} onChange={() => handleChangeTimeline(index, 2)} className="form-check-input border-secondary" /></td>
              <td style={cellStyle}><input type="checkbox" style={checkboxStyle} checked={item?.[3] == 1} onChange={() => handleChangeTimeline(index, 3)} className="form-check-input border-secondary" /></td>
              <td style={cellStyle}><input type="checkbox" style={checkboxStyle} checked={item?.[4] == 1} onChange={() => handleChangeTimeline(index, 4)} className="form-check-input border-secondary" /></td>
              <td style={cellStyle}><input type="checkbox" style={checkboxStyle} checked={item?.[5] == 1} onChange={() => handleChangeTimeline(index, 5)} className="form-check-input border-secondary" /></td>
              <td style={cellStyle}><input type="checkbox" style={checkboxStyle} checked={item?.[6] == 1} onChange={() => handleChangeTimeline(index, 6)} className="form-check-input border-secondary" /></td>
              <td style={cellStyle}><input type="checkbox" style={checkboxStyle} checked={item?.[7] == 1} onChange={() => handleChangeTimeline(index, 7)} className="form-check-input border-secondary" /></td>
              <td style={cellStyle}><input type="checkbox" style={checkboxStyle} checked={item?.[8] == 1} onChange={() => handleChangeTimeline(index, 8)} className="form-check-input border-secondary" /></td>
              <td style={cellStyle}><input type="checkbox" style={checkboxStyle} checked={item?.[9] == 1} onChange={() => handleChangeTimeline(index, 9)} className="form-check-input border-secondary" /></td>
              <td style={cellStyle}><input type="checkbox" style={checkboxStyle} checked={item?.[10] == 1} onChange={() => handleChangeTimeline(index, 10)} className="form-check-input border-secondary" /></td>
              <td style={cellStyle}><input type="checkbox" style={checkboxStyle} checked={item?.[11] == 1} onChange={() => handleChangeTimeline(index, 11)} className="form-check-input border-secondary" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EditTimeline