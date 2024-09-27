import React from 'react'

const Equipment = ({ data }) => {
  return (
   <>
           <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Peralatan</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>RO (Kapasitas GPD)</td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.ro || "-"}</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Operate MKHD-1</td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.operate_mkhd_first_qty || "0"} Unit</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Operate MKHD-2</td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.operate_mkhd_second_qty || "0"} Unit</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Back Up MKHD-1</td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.backup_mkhd_first_qty || "0"} Unit</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Back Up MKHD-2</td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.backup_mkhd_second_qty || "0"} Unit</td>
        </tr>
        <tr className="fw-medium">
     
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Total Mesin</td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.total_mesin_qty || ""} Unit</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Kirim Tahap 1 (qty)
          </td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.stage_first_delivery_qty ?? "-"} Unit</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Tanggal Pengiriman Tahap 1
          </td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.date_first_delivery || "-"} </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Pengiriman Operate MKHD 1
          </td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.delivery_mkhd_first_qty || "0"} Unit</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Pengiriman Operate MKHD 2
          </td>
          <td className="px-1">:</td>
          <td>{data?.lpp_document?.delivery_mkhd_second_qty || "0"} Unit</td>
        </tr>
      </table>
   </>
  )
}

export default Equipment