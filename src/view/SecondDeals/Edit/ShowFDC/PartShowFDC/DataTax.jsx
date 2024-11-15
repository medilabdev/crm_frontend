import React from 'react'
import { Card, Table } from 'react-bootstrap'

const DataTax = ({ show }) => {
  return (
    <>
    <Card className="mb-3 uniform-spacing col-md">
        <Card.Body> 
          <h5 className="fw-bold mb-3">Data Pajak</h5>
          <Table borderless className="mb-0">
            <tbody style={{ fontFamily:"Rubik"}}>
              <tr>
                <td style={{ width: "350px" }}>Nomor NPWP (Sesuai dengan Faktur Pajak)</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {show?.npwp || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Nomor Surat Pengukuhan PKP</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>{show?.tax_invoice_number || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Nomor Serial Faktur Pajak</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>{show?.pkp_number || "-"}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
    </Card>
    {/* <div>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Data Pajak</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Nomor NPWP (Sesuai dengan Faktur Pajak)
          </td>
          <td className="px-1">:</td>
          <td>{show?.npwp || ""}</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nomor Surat Pengukuhan PKP
          </td>
          <td className="px-1">:</td>
          <td>{show?.tax_invoice_number || ""}</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nomor Serial Faktur Pajak
          </td>
          <td className="px-1">:</td>
          <td>{show?.pkp_number || ""}</td>
        </tr>
      </table>
    </div> */}
    </>
  )
}

export default DataTax