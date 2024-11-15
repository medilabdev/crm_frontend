import React from 'react'
import { Card, Table } from 'react-bootstrap'

const Customer = ({ data }) => {
  return (
    <>
      <Card className="mb-3 uniform-spacing">
        <Card.Body>
          <h5 className="fw-bold mb-3">Customer</h5>
          <Table borderless className="mb-0">
            <tbody style={{ fontFamily:"Rubik"}}>
              <tr>
                <td style={{ width: "400px", fontSize: "0.9rem" }}>Nama Customer</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {data?.lpp_document?.customer?.name || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "400px", fontSize: "0.9rem" }}>Badan Usaha</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {data?.fqp_document?.hospital?.company_type?.name || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "400px", fontSize: "0.9rem" }}>Tipe Faskes</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {data?.lpp_document?.faskes_type?.name || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "400px", fontSize: "0.9rem" }}>Regional BPJS</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {data?.lpp_document?.bpjs_regional?.regional || "-"}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      </>
  )
}

export default Customer