import React from 'react'

const TypeWork = ({ data }) => {
  return (
    <> 
        <div class="fw-bold mb-3">
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
        </table>
    </>
  )
}

export default TypeWork