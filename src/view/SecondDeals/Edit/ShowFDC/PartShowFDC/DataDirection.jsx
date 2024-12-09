import React from 'react'
import { Card, Table } from 'react-bootstrap'

const DataDirection = ({ show, typeHospital }) => {
  return (
    <>
    <Card className="mb-3 uniform-spacing col-md">
        <Card.Body> 
          <h5 className="fw-bold mb-3">Data Direksi dan PIC</h5>
          {show?.direksi.map((item, index) => (
  !((typeHospital === "PT" || typeHospital === "Yayasan") && 
    (item?.position === "Kepala Rumah Sakit" || item?.position === "Kepala perawat HD")) ? (
      <React.Fragment key={index}>
        <table className="mb-2">
          <tr>
            <td style={{ width: "300px", fontSize: "0.9rem" }}>Jabatan</td>
            <td style={{ width: "5px", textAlign: "center" }}>: </td>
            <td> {item?.position || "-"}</td>
          </tr>
          <tr>
            <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
            <td style={{ width: "5px", textAlign: "center" }}>: </td>
            <td> {item?.name || "-"}</td>
          </tr>
          <tr >
            <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
            <td style={{ width: "5px", textAlign: "center" }}>: </td>
            <td> {item.phone_number || "-"}</td>
          </tr>
          <tr >
            <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
            <td style={{ width: "5px", textAlign: "center" }}>: </td>
            <td> {item?.email || "-"}</td>
          </tr>
        </table>
        <hr />
      </React.Fragment>
    ) : null
))}
        </Card.Body>
    </Card>
    </>
  )
}

export default DataDirection