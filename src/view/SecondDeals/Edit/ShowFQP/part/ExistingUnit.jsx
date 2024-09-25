import React from 'react'

const ExistingUnit = ({ data, position}) => {
  return (
    <>
        {position !== "1-bZKHtNZCFWGg" && position !== "573MloZ8j--aaQ" && position !== "SzhgAQn6tP48xw" ?  
    <>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Existing Unit</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Existing vendor
          </td>
          <td className="px-1">:</td>
          <td>{data && data.existing_vendor ? data.existing_vendor : "-"}</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Jumlah unit mesin
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.number_of_machine_unit ? data.number_of_machine_unit : "-"}
          </td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Total rata-rata tindakan per 6 bulan terakhir
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.average_total_actions_last_six_months
              ? data.average_total_actions_last_six_months
              : "-"}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Jumlah pasien existing
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.number_of_existing_patients
              ? data.number_of_existing_patients
              : "-"} 
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Masa kontrak berakhir
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.expired_contract_period
              ? data.expired_contract_period
              : "-"}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Replace/ Expand
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.status_contract_unit
              ? data.status_contract_unit
              : "-"}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Harga BHP existing
          </td>
          <td className="px-1">:</td>
          <td>
            <td>
              {data && data.existing_bhp_price
                ? data.existing_bhp_price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                : "-"}
            </td>
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Masa berlaku Izin HD
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.expired_hd_permit_period
              ? data.expired_hd_permit_period
              : "-"}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Bekerjasama BPJS
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.collaborating_with_bpjs
              ? data.collaborating_with_bpjs === "yes"
                ? "Iya"
                : "Tidak"
              : "-"}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Jumlah sarana unit
          </td>
          <td className="px-1">:</td>
          <td>
            {" "}
            {data && data.number_of_unit_facilities
              ? data.number_of_unit_facilities
              : "-"}
          </td>
        </tr>
      </table>
      </>
       : ""}
    </>
  )
}

export default ExistingUnit