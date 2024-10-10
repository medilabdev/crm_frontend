import React from 'react'

const OtherInformation = ({ data, position}) => {
  return (
    <>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">
          Informasi Lainnya
        </span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Jumlah unit HD kurang dari 20 km dari faskes
          </td>
          <td className="px-1">:</td>
          <td>{data && data.hd_unit_count_distance_from_faskes ? data.hd_unit_count_distance_from_faskes + " Unit" : "-"}</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Jumlah mesin unit HD sekitar
          </td>
          <td className="px-1">:</td>
          <td>{data && data.hd_machine_unit_count ? data.hd_machine_unit_count + " Unit" : "-"} </td>
        </tr>
      </table>
    </>
)
}

export default OtherInformation