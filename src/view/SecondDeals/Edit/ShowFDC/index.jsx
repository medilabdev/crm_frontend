import React, { useState } from "react";
import { Card } from "react-bootstrap";
import EditFormDataBank from "../FDC/EditFormDataBank";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const ShowFDC = ({ show, CompanyName }) => {
 
  return (
    <Card.Body>
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
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Data Pajak</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Nomor NPWP (Sesuai dengan Faktur Pajak)
          </td>
          <td className="px-1">:</td>
          <td>{show?.npwp || ""}</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nomor Surat Pengukuhan PKP
          </td>
          <td className="px-1">:</td>
          <td>{show?.tax_invoice_number || ""}</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nomor Serial Faktur Pajak
          </td>
          <td className="px-1">:</td>
          <td>{show?.pkp_number || ""}</td>
        </tr>
      </table>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">
          Data Direksi dan PIC
        </span>
      </div>
      {show?.direksi.map((item) => (
        <>
          <table className="mb-2">
            <tr className="fw-medium mb-4">
              <td style={{ width: "300px", fontSize: "0.9rem" }}>Jabatan</td>
              <td className="px-1">:</td>
              <td>{item?.position || ""}</td>
            </tr>
            <tr className="fw-medium">
              <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
              <td className="px-1">:</td>
              <td>{item?.name || ""}</td>
            </tr>
            <tr className="fw-medium">
              <td style={{ width: "200px", fontSize: "0.9rem" }}>
                No. Telepon
              </td>
              <td className="px-1">:</td>
              <td>{item.phone_number || ""}</td>
            </tr>
            <tr className="fw-medium ">
              <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
              <td className="px-1">:</td>
              <td>{item?.email || ""}</td>
            </tr>
          </table>
          <hr />
        </>
      ))}
      <div>
        <div class="fw-bold mb-3">
          <span className="fs-6 text-decoration-underline">Data Bank</span>
        </div>
      </div>
        {show?.bank.map((item) => (
          <>
            <table className="mb-2">
              <tr className="fw-medium mb-4">
                <td style={{ width: "300px", fontSize: "0.9rem" }}>
                  Nama Bank
                </td>
                <td className="px-1">:</td>
                <td>{item?.bank_name || ""}</td>
              </tr>
              <tr className="fw-medium">
                <td style={{ width: "300px", fontSize: "0.9rem" }}>Cabang</td>
                <td className="px-1">:</td>
                <td>{item?.branch_bank || ""}</td>
              </tr>
              <tr className="fw-medium">
                <td style={{ width: "200px", fontSize: "0.9rem" }}>
                  Nama Account (A/N)
                </td>
                <td className="px-1">:</td>
                <td>{item?.account_name || ""}</td>
              </tr>
              <tr className="fw-medium ">
                <td style={{ width: "200px", fontSize: "0.9rem" }}>Kota</td>
                <td className="px-1">:</td>
                <td>{item?.city || ""}</td>
              </tr>
              <tr className="fw-medium ">
                <td style={{ width: "200px", fontSize: "0.9rem" }}>
                  No. Rekening
                </td>
                <td className="px-1">:</td>
                <td>{item?.bank_account_number || "-"}</td>
              </tr>
              <tr className="fw-medium ">
                <td style={{ width: "200px", fontSize: "0.9rem" }}>
                  Mata Uang
                </td>
                <td className="px-1">:</td>
                <td>{item?.currency || "-"}</td>
              </tr>
              <tr className="fw-medium ">
                <td style={{ width: "200px", fontSize: "0.9rem" }}>
                  Swift Code
                </td>
                <td className="px-1">:</td>
                <td>{item?.swift_code || ""}</td>
              </tr>
            </table>
            <hr />
          </>
        ))
      }
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
    </Card.Body>
  );
};

export default ShowFDC;
