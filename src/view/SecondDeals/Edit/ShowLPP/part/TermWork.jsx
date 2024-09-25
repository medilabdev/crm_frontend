import React from 'react'

const TermWork = ({ data }) => {
  return (
 <>
  <div class="fw-bold mb-3">
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
      </table>
 </>
  )
}

export default TermWork