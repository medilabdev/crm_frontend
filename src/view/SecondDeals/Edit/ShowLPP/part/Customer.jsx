import React from 'react'

const Customer = ({ data }) => {
  return (
    <>
    <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Customer</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama Customer</td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.customer?.name || "-"}</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Badan Usaha</td>
          <td className="px-1">:</td>
          <td>{data?.fqp_document?.hospital?.company_type?.name || "-"}</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Tipe Faskes</td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.faskes_type?.name || "-"}</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Regional BPJS</td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.bpjs_regional?.regional || "-"}</td>
        </tr>
      </table>
      </>
  )
}

export default Customer