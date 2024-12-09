import React from 'react'
import { Card, Table } from 'react-bootstrap'

const DataBank = ({ show }) => {
  return (
    <>
        <Card className="mb-3 uniform-spacing col-md">
        <Card.Body> 
          <h5 className="fw-bold mb-3">Data Bank</h5>
          {!show?.bank ? '-' : show?.bank.map((item) => (
            <Table borderless className="mb-0">
            <tbody style={{ fontFamily:"Rubik"}}>
              <tr>
                <td style={{ width: "350px" }}>Nama Bank</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {item?.bank_name || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Cabang</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>{item?.branch_bank || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Nama Account (A/N)</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>{item?.account_name || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Kota</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>{item?.city || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>NO. Rekening</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>{item?.bank_account_number || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Mata Uang</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>{item?.currency || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Swift Code</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>{item?.swift_code || "-"}</td>
              </tr>
            </tbody>
          </Table>
          ))}
        </Card.Body>
    </Card>
    </>
  )
}

export default DataBank