import React from 'react'

const EnvironmentalBasic = ({ data }) => {
  const position = localStorage.getItem('posititon')
  return (
   <>
    <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">
          Keadaan Lingkungan
        </span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Banjir</td>
          <td className="px-1">:</td>
          <td>
            {data && data.cataclysm
              ? data.cataclysm === "yes"
                ? "Iya"
                : "Tidak"
              : "-"}
          </td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Dekat laut (kurang dari 5 km)
          </td>
          <td className="px-1">:</td>
          <td>
            {" "}
            {data && data.near_the_sea
              ? data.near_the_sea === "yes"
                ? "Iya"
                : "Tidak"
              : "-"}
          </td>
        </tr>

        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Ketersediaan SDM
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.availability_of_human_resource
              ? data.availability_of_human_resource === "available"
                ? "Tersedia"
                : "Belum Tersedia"
              : "-"}
          </td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Akses Transportasi/ Logistik
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.access_to_transportation
              ? data.access_to_transportation ==="easy" ? "Mudah" : "Sulit"
              : "-"}
          </td>
        </tr>
      </table>
   </>
  )
}

export default EnvironmentalBasic