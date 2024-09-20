import React from 'react'

const BasicInformation = ({ data }) => {
  return (
   <>
    <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">
          Data Dasar Informasi
        </span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Nama Rumah Sakit / Klinik
          </td>
          <td className="px-1">:</td>
          <td>{data?.hospital?.name || "-"}</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nama Kepala Ruangan HD
          </td>
          <td className="px-1">:</td>
          <td>{data?.head_name_hd_room || "-"}</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nama Dokter Umum/Pelaksana HD
          </td>
          <td className="px-1">:</td>
          <td>{data?.name_of_general_practitioner || "-"}</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nama Dokter Konsulen/SpPD KGH
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.name_of_consular_doctor
              ? data.name_of_consular_doctor
              : "-"}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Contact Person Perawat/Dokter
          </td>
          <td className="px-1">:</td>
          <td>{data?.contact_person_nurse_or_doctor || "-"}</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Contact Person Pengadaan/Manajemen
          </td>
          <td className="px-1">:</td>
          <td>{data?.procurement_or_management_contact_person || "-"}</td>
        </tr>
      </table>
   </>
  )
}

export default BasicInformation