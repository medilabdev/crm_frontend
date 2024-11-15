import React from 'react'
import { Card, Table } from 'react-bootstrap'

const TypeWork = ({ data }) => {
  return (
    <> 
    <Card className="mb-3 uniform-spacing">
        <Card.Body>
          <h5 className="fw-bold mb-3">Jenis Kerjasama</h5>
          <Table borderless className="mb-0">
            <tbody style={{ fontFamily:"Rubik"}}>
              <tr>
                <td style={{ width: "400px", fontSize: "0.9rem" }}>Jenis Kerja Sama</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>
                {data?.lpp_document?.type_collaboration === "RevenueSharing"
                ? "Revenue Sharing"
                : data?.lpp_document?.type_collaboration === "JualPutus"
                    ? "Jual Putus"
                    : "KSO"}
                </td>
              </tr>
            {data?.lpp_document?.type_collaboration === "RevenueSharing" ? (
                <>
                    <tr>
                        <td style={{ width: "400px", fontSize: "0.9rem" }}>Customer</td>
                        <td style={{ width: "5px", textAlign: "center" }}>:</td>
                        <td>{data?.lpp_document?.revenue_sharing_customer + "%" || "-"} </td>
                    </tr>
                    <tr>
                    <td style={{ width: "400px", fontSize: "0.9rem" }}>ISS</td>
                    <td style={{ width: "5px", textAlign: "center" }}>:</td>
                    <td>{data?.lpp_document?.revenue_sharing_iss + "%" || "-"}</td>
                    </tr>
                </>
                ) : data?.lpp_document?.type_collaboration === "JualPutus" ? (
                <tr>
                    <td style={{ width: "400px", fontSize: "0.9rem" }}>Jual Putus </td>
                    <td style={{ width: "5px", textAlign: "center" }}>:</td>
                    <td style={{ textTransform:"uppercase"}}>{data?.lpp_document?.sell_disconect || "-"} </td>
                </tr>
                ) : (
                ""
                )}
              <tr>
                <td style={{ width: "400px", fontSize: "0.9rem" }}>Status</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {data?.lpp_document?.timeline[0].category?.name || ""}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
        {/* <div class="fw-bold mb-3">
            <span className="fs-6 text-decoration-underline">Jenis Kerjasama</span>
        </div>
        <table className="mb-4">
            <tr className="fw-medium">
            <td style={{ width: "300px", fontSize: "0.9rem" }}>
                Jenis Kerja Sama
            </td>
            <td className="px-1">:</td>
            <td>
                {data?.lpp_document?.type_collaboration === "RevenueSharing"
                ? "Revenue Sharing"
                : data?.lpp_document?.type_collaboration === "JualPutus"
                    ? "Jual Putus"
                    : "KSO"}
            </td>
            </tr>
            {data?.lpp_document?.type_collaboration === "RevenueSharing" ? (
            <>
                <tr className="fw-medium">
                <td style={{ width: "300px", fontSize: "0.9rem" }}>Customer</td>
                <td className="px-1">:</td>
                <td>{data?.lpp_document?.revenue_sharing_customer + "%" || "-"} </td>
                </tr>
                <tr className="fw-medium">
                <td style={{ width: "300px", fontSize: "0.9rem" }}>ISS</td>
                <td className="px-1">:</td>
                <td>{data?.lpp_document?.revenue_sharing_iss + "%" || "-"}</td>
                </tr>
            </>
            ) : data?.lpp_document?.type_collaboration === "JualPutus" ? (
            <tr className="fw-medium">
                <td style={{ width: "300px", fontSize: "0.9rem" }}>Jual Putus </td>
                <td className="px-1">:</td>
                <td>{data?.lpp_document?.sell_disconect || "-"} </td>
            </tr>
            ) : (
            ""
            )}

            <tr className="fw-medium">
            <td style={{ width: "300px", fontSize: "0.9rem" }}>Status</td>
            <td className="px-1">:</td>
            <td>{data?.lpp_document?.timeline[0].category?.name || ""}</td>
            </tr>
        </table> */}
    </>
  )
}

export default TypeWork