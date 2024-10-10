import React from 'react'

const NewUnit = ({data, position}) => {
  return (
   <>
     <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">New Unit</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Jumlah mesin</td>
          <td className="px-1">:</td>
          <td>
            {" "}
            {data && data.total_of_machine_unit
              ? data.total_of_machine_unit
              : "-"}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Sistem kerjasama
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data?.cooperation_system === "etc" ? "lainnya" : data?.cooperation_system ?? "-"}
          </td>
        </tr>
        {position !== "_dLjLFdH-Nw8vg8U_002" && position !=="_dLjLFdH-Nw8vg8U_001"  ? 
        <>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>SDM</td>
          <td className="px-1">:</td>
          <td>
            {data && data.human_resources
              ? data.human_resources === "available"
                ? "Tersedia"
                : "Belum Tersedia"
              : "-"}
          </td>
        </tr>
        {position !== "_dLjLFdH-Nw8vg8U_003" ? 
        <> 
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Faskes HD 5 km sekitar New Unit
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.hd_health_facilities_arround ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: data.hd_health_facilities_arround,
                }}
              />
            ) : (
              "-"
            )}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Kapasitas Faskes HD Sekitar New Unit
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.hd_health_facilities_capacity_approximately ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: data.hd_health_facilities_capacity_approximately,
                }}
              />
            ) : (
              "-"
            )}
          </td>
        </tr>
        </>
        : "" }
        </>
        : "" }
      </table>
   </>
  )
}

export default NewUnit