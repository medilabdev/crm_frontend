import React from 'react'

const DataTax = ({ show }) => {
  return (
    <div>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Data Pajak</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Nomor NPWP (Sesuai dengan Faktur Pajak)
          </td>
          <td className="px-1">:</td>
          <td>{show?.npwp || ""}</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nomor Surat Pengukuhan PKP
          </td>
          <td className="px-1">:</td>
          <td>{show?.tax_invoice_number || ""}</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nomor Serial Faktur Pajak
          </td>
          <td className="px-1">:</td>
          <td>{show?.pkp_number || ""}</td>
        </tr>
      </table>
    </div>
  )
}

export default DataTax