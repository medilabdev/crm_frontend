import React from 'react'

const DokumentFDC = ({ show }) => {
  return (
    <div>
          <div class="fw-bold mb-3">
          <span className="fs-6 text-decoration-underline">Dokumen</span>
        </div>
        <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
                KTP Penanggung Jawab
              </td>
              <td className="px-1">:</td>
              <td>
                {show?.ktp_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.ktp_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.ktp_file || "-"}
                </a>
                ) : "-"}
                
              </td>
            </tr>
          </table>
        <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
              Kartu NPWP
              </td>
              <td className="px-1">:</td>
              <td>
                {show?.npwp_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.npwp_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.npwp_file || "-"}
                </a>
                ) : "-"}
                
              </td>
            </tr>
          </table>
        <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
              Surat Pengukuhan Pengusaha Kena Pajak (SPPKP)
              </td>
              <td className="px-1">:</td>
              <td>
                {show?.sppkp_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.sppkp_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.sppkp_file || "-"}
                </a>
                ) : "-"}
                
              </td>
            </tr>
          </table>
        <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
              Tanda Daftar Perusahaan
              </td>
              <td className="px-1">:</td>
              <td>
                {show?.company_registration_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.company_registration_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.company_registration_file || "-"}
                </a>
                ) : "-"}
                
              </td>
            </tr>
          </table>
        <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
              Surat Izin Usaha Perdagangan
              </td>
              <td className="px-1">:</td>
              <td>
                {show?.business_license_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.business_license_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.business_license_file || "-"}
                </a>
                ) : "-"}
                
              </td>
            </tr>
          </table>
        <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
              Surat keterangan Domisili Usaha (SIUP)
              </td>
              <td className="px-1">:</td>
              <td>
                {show?.siup_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.siup_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.siup_file || "-"}
                </a>
                ) : "-"}
                
              </td>
            </tr>
          </table>
        <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
              Surat keterangan Domisili Usaha (SIUP)
              </td>
              <td className="px-1">:</td>
              <td>
                {show?.kso_file ? (
                  <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${show?.kso_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {show?.kso_file || "-"}
                </a>
                ) : "-"}
                
              </td>
            </tr>
          </table>

    </div>
  )
}

export default DokumentFDC