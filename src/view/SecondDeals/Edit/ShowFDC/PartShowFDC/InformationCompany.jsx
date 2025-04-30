import React from 'react'
import { Card, Table } from 'react-bootstrap'

const InformationCompany = ({ show, CompanyName }) => {
  console.log(show);
  
  return (
    <>
    <Card className="mb-3 uniform-spacing col-md">
        <Card.Body> 
          <h5 className="fw-bold mb-3">Informasi Perusahaan</h5>
          <Table borderless className="mb-0">
            <tbody style={{ fontFamily:"Rubik"}}>
              <tr>
                <td style={{ width: "350px" }}>Nama Perusahaan</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {show?.company?.name || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Nama Pemilik Perusahaan</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>
                {show?.owner_company || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Didirikan Sejak Tahun</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td>{show?.founded_year_at || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "350px" }}>Jenis Usaha</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{show?.business_type || "-"} </td>
              </tr>
              <tr>
                <td style={{ width: "300px"}}>Alamat Situs</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{show?.website || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "300px"}}>Nama Penanggung Jawab & Jabatan</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{show?.name_person_in_charge || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "300px"}}>Alamat Email</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{show?.email ?? "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "300px"}}>No. Telepon Kantor</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{show?.phone_number || "-"}</td>
              </tr>
              <tr>
                <td style={{ width: "300px"}}>Alamat Perusahaan (Sesuai NPWP)</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{show?.company_address || "-"} </td>
              </tr>
              <tr>
                <td style={{ width: "300px"}}>Alamat Lain perusahaan (Apabila alamat : Perusahaan berbeda dengan tersebut Diatas)</td>
                <td style={{ width: "5px", textAlign: "center" }}>: </td>
                <td>{show?.other_company_address || "-"} </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
    </Card>
    {/* <div>
        <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">
          Informasi perusahaan
        </span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Nama Perusahaan
          </td>
          <td className="px-1">:</td>
          <td>{CompanyName || "-"}</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nama Pemilik Perusahaan
          </td>
          <td className="px-1">:</td>
          <td>{show?.owner_company || ""}</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Didirikan Sejak Tahun
          </td>
          <td className="px-1">:</td>
          <td>{show?.founded_year_at || ""}</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Jenis Usaha</td>
          <td className="px-1">:</td>
          <td>{show?.business_type || ""}</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Alamat Situs</td>
          <td className="px-1">:</td>
          <td>{show?.website || ""}</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nama Penanggung Jawab & Jabatan
          </td>
          <td className="px-1">:</td>
          <td>{show?.name_person_in_charge || ""}</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Alamat Email</td>
          <td className="px-1">:</td>
          <td>{show?.email || ""}</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            No. Telepon kantor
          </td>
          <td className="px-1">:</td>
          <td>{show?.phone_number || ""}</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Alamat Perusahaan (Sesuai NPWP)
          </td>
          <td className="px-1">:</td>
          <td>{show?.company_address || ""}</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Alamat Lain perusahaan (Apabila alamat : Perusahaan berbeda dengan
            yang tersebut Diatas)
          </td>
          <td className="px-1">:</td>
          <td>{show?.other_company_address || ""}</td>
        </tr>
      </table>
    </div> */}
    </>
  )
}

export default InformationCompany