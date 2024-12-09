import React from 'react'
import { Card, Table } from 'react-bootstrap'

const ExistingUnit = ({ data, position}) => {
  return (
    <>
        {position !== "1-bZKHtNZCFWGg" && position !== "573MloZ8j--aaQ" && position !== "SzhgAQn6tP48xw" ?  
    <>
       <Card className="mb-3 uniform-spacing col-md">
        <Card.Body> 
          <h5 className="fw-bold mb-3"> Existing Unit</h5>
          <Table borderless className="mb-0">
            <tbody style={{ fontFamily:"Rubik"}}>
              <tr>
                <td style={{ width: "400px" }}>Existing vendor</td>
                <td>: {data && data.existing_vendor ? data.existing_vendor : "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Jumlah unit mesin</td>
                <td>: {data && data.number_of_machine_unit ? data.number_of_machine_unit : "-"}</td>
              </tr>
              <tr>
                <td>Total rata-rata tindakan per 6 bulan terakhir</td>
                <td>: {data && data.average_total_actions_last_six_months
              ? data.average_total_actions_last_six_months
              : "-"}</td>
              </tr>
              <tr>
                <td>Jumlah Pasien Existing</td>
                <td>: {data && data.number_of_existing_patients
              ? data.number_of_existing_patients
              : "-"} </td>
              </tr>
              <tr>
                <td>Masa Kontrak Berakhir</td>
                <td>: {data && data.expired_contract_period
              ? data.expired_contract_period
              : "-"}</td>
              </tr>
              <tr>
                <td>Replace/ Expand</td>
                <td>: {data && data.status_contract_unit
              ? data.status_contract_unit
              : "-"}</td>
              </tr>
              <tr>
                <td>Harga BHP Existing</td>
                <td>: {data && data.existing_bhp_price
                ? data.existing_bhp_price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                : "-"}</td>
              </tr>
              <tr>
                <td>Masa Berlaku Izin HD</td>
                <td>: {data && data.expired_hd_permit_period
              ? data.expired_hd_permit_period
              : "-"}</td>
              </tr>
              <tr>
                <td>Bekerjasama BPJS</td>
                <td>: {data && data.collaborating_with_bpjs
              ? data.collaborating_with_bpjs === "yes"
                ? "Iya"
                : "Tidak"
              : "-"}</td>
              </tr>
              <tr>
                <td>Jumlah Sarana Unit</td>
                <td>:  {data && data.number_of_unit_facilities
              ? data.number_of_unit_facilities
              : "-"}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      </>
       : ""}
    </>
  )
}

export default ExistingUnit