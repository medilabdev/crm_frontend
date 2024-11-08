import React from 'react'

const InformationCompany = ({ show, CompanyName }) => {
  return (
    <div>
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
    </div>
  )
}

export default InformationCompany