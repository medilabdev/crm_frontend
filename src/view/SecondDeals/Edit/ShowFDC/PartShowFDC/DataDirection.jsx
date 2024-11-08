import React from 'react'

const DataDirection = ({ show, typeHospital }) => {
  return (
    <div>
        <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">
          Data Direksi dan PIC
        </span>
      </div>
      {show?.direksi.map((item, index) => (
  !((typeHospital === "PT" || typeHospital === "Yayasan") && 
    (item?.position === "Kepala Rumah Sakit" || item?.position === "Kepala perawat HD")) ? (
      <React.Fragment key={index}>
        <table className="mb-2">
          <tr className="fw-medium mb-4">
            <td style={{ width: "300px", fontSize: "0.9rem" }}>Jabatan</td>
            <td className="px-1">:</td>
            <td>{item?.position || ""}</td>
          </tr>
          <tr className="fw-medium">
            <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
            <td className="px-1">:</td>
            <td>{item?.name || ""}</td>
          </tr>
          <tr className="fw-medium">
            <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
            <td className="px-1">:</td>
            <td>{item.phone_number || ""}</td>
          </tr>
          <tr className="fw-medium">
            <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
            <td className="px-1">:</td>
            <td>{item?.email || ""}</td>
          </tr>
        </table>
        <hr />
      </React.Fragment>
    ) : null
))}

    </div>
  )
}

export default DataDirection