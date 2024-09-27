import React from 'react'

const Target = ({ data }) => {
  return (
    <>
      <div class="fw-bold mb-3">
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
      </table>
    </>
  )
}

export default Target