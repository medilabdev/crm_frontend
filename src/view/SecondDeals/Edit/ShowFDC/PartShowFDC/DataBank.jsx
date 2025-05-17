import React from 'react'
import { Card, Table } from 'react-bootstrap'

const DataBank = ({ show }) => {
  console.log(show.bank);
  
  return (
    <>
        <Card className="mb-3 uniform-spacing col-md">
        <Card.Body>
          <h5 className="fw-bold mb-3">Data Bank</h5>

          {!show?.bank || show.bank.length === 0 ? (
            "-"
          ) : (
            show.bank.map((item, index) => (
              <div key={index}>
                <h6 className="fw-bold mt-4">Bank {index + 1}</h6> {/* <-- Ini buat judul tiap bank */}
                <Table borderless className="mb-0">
                  <tbody style={{ fontFamily: "Rubik" }}>
                    <tr>
                      <td style={{ width: "350px" }}>Nama Bank</td>
                      <td style={{ width: "5px", textAlign: "center" }}>:</td>
                      <td>{item?.bank_name || "-"}</td>
                    </tr>
                    <tr>
                      <td>Cabang</td>
                      <td style={{ textAlign: "center" }}>:</td>
                      <td>{item?.branch_bank || "-"}</td>
                    </tr>
                    <tr>
                      <td>Nama Account (A/N)</td>
                      <td style={{ textAlign: "center" }}>:</td>
                      <td>{item?.account_name || "-"}</td>
                    </tr>
                    <tr>
                      <td>Kota</td>
                      <td style={{ textAlign: "center" }}>:</td>
                      <td>{item?.city || "-"}</td>
                    </tr>
                    <tr>
                      <td>No. Rekening</td>
                      <td style={{ textAlign: "center" }}>:</td>
                      <td>{item?.bank_account_number || "-"}</td>
                    </tr>
                    <tr>
                      <td>Mata Uang</td>
                      <td style={{ textAlign: "center" }}>:</td>
                      <td>{item?.currency || "-"}</td>
                    </tr>
                    <tr>
                      <td>Swift Code</td>
                      <td style={{ textAlign: "center" }}>:</td>
                      <td>{item?.swift_code || "-"}</td>
                    </tr>
                  </tbody>
                </Table>
                {index !== show.bank.length - 1 && (
                  <hr className="my-4" />  
                )}
              </div>
            ))
          )}
        </Card.Body>
      </Card>
    </>
  )
}

export default DataBank