import React from 'react'
import { Card, Table } from 'react-bootstrap'

const TermWork = ({ data }) => {
  return (
 <>
   <Card   className="mb-3 uniform-spacing col-md">
        <Card.Body> 
          <h5 className="fw-bold mb-3"> Term Kerjasama</h5>
          <Table borderless className="mb-0">
            <tbody style={{ fontFamily:"Rubik"}}>
              <tr>
                <td style={{ width: "350px" }}>Jangka Waktu Kerjasama</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {data?.lpp_document && data?.lpp_document?.collaboration_period ? data?.lpp_document?.collaboration_period + "Tahun " : "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Harga</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>
                {data?.lpp_document && data?.lpp_document?.price ? "Rp" + new Intl.NumberFormat().format(data?.lpp_document?.price) : "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Pemakaian BHP</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>{data?.lpp_document?.bhp_usage || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>PPN 11% ditanggung</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>Customer</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Ongkir</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{data?.lpp_document && data?.lpp_document.shipping_cost ?  data?.lpp_document?.shipping_cost.charAt(0).toUpperCase() + data?.lpp_document?.shipping_cost.slice(1) : ""}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
    </Card>
  {/* <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Term Kerjasama</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Jangka Waktu Kerjasama
          </td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.collaboration_period || ""} Tahun</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Harga</td>
          <td className="px-1">:</td>
          <td>
            Rp .{" "}
            {new Intl.NumberFormat().format(data?.lpp_document?.price) || ""}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Pemakaian BHP</td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.bhp_usage || ""}</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            PPN 11% ditanggung
          </td>
          <td className="px-1">:</td>
          <td>Customer</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Ongkir</td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document && data?.lpp_document.shipping_cost ?  data?.lpp_document?.shipping_cost.charAt(0).toUpperCase() + data?.lpp_document?.shipping_cost.slice(1) : ""}</td>
        </tr>
      </table> */}
 </>
  )
}

export default TermWork