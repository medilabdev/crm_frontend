import React from 'react'
import { Card, Table } from 'react-bootstrap'

const DokumentFDC = ({ show }) => {
  return (
    <>
    <Card className="mb-3 uniform-spacing col-md">
        <Card.Body> 
          <h5 className="fw-bold mb-3">Dokumen</h5>
          <Table borderless className="mb-0">
            <tbody style={{ fontFamily:"Rubik"}}>
              <tr>
                <td style={{ width: "350px" }}>KTP Penanggung Jawab</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>
                {show?.ktp_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.ktp_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.ktp_file || "-"}
                </a>
                ) : "-"}
                </td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Kartu NPWP</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>
                {show?.npwp_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.npwp_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.npwp_file || "-"}
                </a>
                ) : "-"}
                </td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Surat Pengukuhan Pengusaha Kena Pajak (SPPKP)</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>
                {show?.sppkp_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.sppkp_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.sppkp_file || "-"}
                </a>
                ) : "-"}
                </td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Tanda Daftar Perusahaan</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>
                {show?.sppkp_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.company_registration_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.company_registration_file || "-"}
                </a>
                ) : "-"}
                </td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Surat Izin Usaha Perdagangan</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>
                {show?.sppkp_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.business_license_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.business_license_file || "-"}
                </a>
                ) : "-"}
                </td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Surat Keterangan Domisili Usaha (SIUP)</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>
                {show?.sppkp_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.siup_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.siup_file || "-"}
                </a>
                ) : "-"}
                </td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Tanda Tangan Kontrak Kerja Sama (KSO)</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>
                {show?.kso_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.kso_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.kso_file || "-"}
                </a>
                ) : "-"}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
    </Card>
   </>
  )
}

export default DokumentFDC