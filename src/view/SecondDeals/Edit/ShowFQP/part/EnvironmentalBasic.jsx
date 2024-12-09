import React from 'react'
import { Card, Table } from 'react-bootstrap'

const EnvironmentalBasic = ({ data }) => {
  const position = localStorage.getItem('posititon')
  return (
   <>
   <Card className="mb-3 uniform-spacing">
        <Card.Body>
          <h5 className="fw-bold mb-3">Keadaan Lingkungan</h5>
          <Table borderless className="mb-0">
            <tbody>
              <tr>
                <td style={{ width: "400px", fontSize: "0.9rem" }}>Banjir</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {data && data.cataclysm
              ? data.cataclysm === "yes"
                ? "Iya"
                : "Tidak"
              : "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "400px", fontSize: "0.9rem" }}>Dekat Laut (kurang dari 5 km)</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td style={{ textTransform:"uppercase" }}> {data && data.near_the_sea
              ? data.near_the_sea === "yes"
                ? "Iya"
                : "Tidak"
              : "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "400px", fontSize: "0.9rem" }}>Ketersediaan SDM</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td style={{ textTransform:"uppercase" }}> {data && data.availability_of_human_resource
              ? data.availability_of_human_resource === "available"
                ? "Tersedia"
                : "Belum Tersedia"
              : "-"}</td>
              </tr>
               <tr>
                <td style={{ width: "400px", fontSize: "0.9rem" }}>Akses Transportasi/ Logistik</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>
                {data && data.access_to_transportation
              ? data.access_to_transportation ==="easy" ? "Mudah" : "Sulit"
              : "-"}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
    </Card>
    {/* <div class="fw-bold mb-3">
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
      </table> */}
   </>
  )
}

export default EnvironmentalBasic