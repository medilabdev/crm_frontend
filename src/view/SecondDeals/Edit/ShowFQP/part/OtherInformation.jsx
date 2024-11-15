import React from 'react'
import { Card, Table } from 'react-bootstrap'

const OtherInformation = ({ data, position}) => {
  return (
    <>
    <Card className="mb-3 uniform-spacing">
        <Card.Body>
          <h5 className="fw-bold mb-3">Informasi Lainnya</h5>
          <Table borderless className="mb-0">
            <tbody>
              <tr>
                <td style={{ width: "400px", fontSize: "0.9rem" }}>Jumlah Unit HD kurang dari 20 km dari faskes</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {data && data.hd_unit_count_distance_from_faskes ? data.hd_unit_count_distance_from_faskes + " Unit" : "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "400px", fontSize: "0.9rem" }}>Jumlah Mesin Unit HD Sekitar</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {data && data.hd_machine_unit_count ? data.hd_machine_unit_count + " Unit" : "-"}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
    </Card>
      {/* <div class="fw-bold mb-3">
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
      </table> */}
    </>
)
}

export default OtherInformation