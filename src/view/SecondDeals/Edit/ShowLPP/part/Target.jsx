import React from 'react'
import { Card, Table } from 'react-bootstrap'

const Target = ({ data }) => {
  return (
    <>
    <Card className="mb-3 uniform-spacing col-md">
        <Card.Body> 
          <h5 className="fw-bold mb-3">Target</h5>
          <Table borderless className="mb-0">
            <tbody style={{ fontFamily:"Rubik"}}>
              <tr>
                <td style={{ width: "350px" }}>Tindakan per Mesin/Bulan</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {data?.lpp_document?.action_machine_per_month_qty || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Tindakan Selama Kerjasama</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {data?.lpp_document?.action_during_cooperation_qty || "-"}</td>
              </tr>
              {/* <tr>
                <td style={{ width: "350px" }}>Operate MKHD-1</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>
                {data?.lpp_document?.operate_mkhd_first_qty || "0"} Unit</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Operate MKHD-2</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>{data?.lpp_document?.operate_mkhd_second_qty || "0 "} Unit</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Back Up MKHD-1</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{data?.lpp_document?.backup_mkhd_first_qty || "0"} Unit</td>
              </tr>
              <tr>
                <td style={{ width: "300px"}}>Back Up MKHD-2</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{data?.lpp_document?.backup_mkhd_second_qty || "0"} Unit</td>
              </tr>
              <tr>
                <td style={{ width: "300px"}}>Total Mesin</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{data?.lpp_document?.total_mesin_qty || "0"} Unit</td>
              </tr>
              <tr>
                <td style={{ width: "300px"}}>Kirim Tahap 1 (qty)</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{data?.lpp_document?.stage_first_delivery_qty ?? "-"} Unit</td>
              </tr>
              <tr>
                <td style={{ width: "300px"}}>Tanggal Pengiriman Tahap 1</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{data?.lpp_document?.date_first_delivery || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "300px"}}>Pengiriman Operate MKHD 1</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{data?.lpp_document?.delivery_mkhd_first_qty || "0"} Unit</td>
              </tr>
              <tr>
                <td style={{ width: "300px"}}>Pengiriman Operate MKHD 2</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{data?.lpp_document?.delivery_mkhd_second_qty || "0"} Unit</td>
              </tr> */}
            </tbody>
          </Table>
        </Card.Body>
    </Card>
      {/* <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Target</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Tindakan per mesin/ bulan
          </td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.action_machine_per_month_qty || ""}</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Tindakan selama kerjasama
          </td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.action_during_cooperation_qty || ""}</td>
        </tr>
      </table> */}
    </>
  )
}

export default Target