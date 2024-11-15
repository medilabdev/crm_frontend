import { faFileAlt, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card, Col, Row, Table } from 'react-bootstrap'

const BasicInformation = ({ data }) => {
  return (
   <>
    <Card className="mb-3 uniform-spacing col-md">
        <Card.Body> 
          <h5 className="fw-bold mb-3"> Data Dasar Informasi</h5>
          <Table borderless className="mb-0">
            <tbody style={{ fontFamily:"Rubik"}}>
              <tr>
                <td style={{ width: "400px" }}>Nama Rumah Sakit / Klinik</td>
                <td style={{ width: "10px", textAlign: "center" }}>:</td>
                <td> {data?.hospital?.name || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "400px" }}>Nama Kepala Ruangan HD</td>
                <td style={{ width: "10px", textAlign: "center" }}>:</td>
                <td> {data?.head_name_hd_room || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "400px" }}>Nama Dokter Umum/Pelaksana HD</td>
                <td style={{ width: "10px", textAlign: "center" }}>:</td>
                <td> {data?.name_of_general_practitioner || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "400px" }}>Nama Dokter Konsulen/SpPD KGH</td>
                <td style={{ width: "10px", textAlign: "center" }}>:</td>
                <td> {data && data.name_of_consular_doctor
              ? data.name_of_consular_doctor
              : "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "400px" }}>Contact Person Perawat/Dokter</td>
                <td style={{ width: "10px", textAlign: "center" }}>:</td>
                <td> {data?.contact_person_nurse_or_doctor || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "400px" }}>Contact Person Pengadaan/Manajemen</td>
                <td style={{ width: "10px", textAlign: "center" }}>:</td>
                <td> {data?.procurement_or_management_contact_person || "-"}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* NPS Customer */}
      

      {/* New Unit */}
      {/* <Card className="mb-3 uniform-spacing">
        <Card.Body>
          <h5 className="fw-bold mb-3">New Unit</h5>
          <Table borderless className="mb-0">
            <tbody>
              <tr>
                <td>Jumlah mesin</td>
                <td>: 4</td>
              </tr>
              <tr>
                <td>Sistem kerjasama</td>
                <td>: buy</td>
              </tr>
              <tr>
                <td>SDM</td>
                <td>: Tersedia</td>
              </tr>
              <tr>
                <td>Faskes HD 5 km sekitar New Unit</td>
                <td>: gfdgfd</td>
              </tr>
              <tr>
                <td>Kapasitas Faskes HD Sekitar New Unit</td>
                <td>: sdad</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card> */}

   </>
  )
}

export default BasicInformation