import React from "react";
import { Card } from "react-bootstrap";

const ShowFDC = () => {
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
          <td>Example</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nama Pemilik Perusahaan
          </td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Didirikan Sejak Tahun
          </td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Jenis Usaha</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Alamat Situs</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nama Penanggung Jawab & Jabatan
          </td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Alamat Email</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            No. Telepon kantor
          </td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Alamat Perusahaan (Sesuai NPWP)
          </td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Alamat Lain perusahaan (Apabila alamat : Perusahaan berbeda dengan
            yang tersebut Diatas)
          </td>
          <td className="px-1">:</td>
          <td>-</td>
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
          <td>Example</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nomor Surat Pengukuhan PKP
          </td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nomor Serial Faktur Pajak
          </td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
      </table>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">
          Data Direksi dan PIC
        </span>
      </div>
      <table className="mb-4">
        <span className="fw-semibold text-decoration-underline">
          Direktur RS
        </span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <span className="fw-semibold text-decoration-underline">
          Wakil direktur
        </span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <span className="fw-semibold text-decoration-underline">
          Penanggung jawab operasional
        </span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <span className="fw-semibold text-decoration-underline">
          Kepala Rumah Sakit
        </span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <span className="fw-semibold text-decoration-underline">
          Kepala Ruang
        </span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <span className="fw-semibold text-decoration-underline">
          Dokter SpPD
        </span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <span className="fw-semibold text-decoration-underline">
          Dokter Kgh
        </span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <span className="fw-semibold text-decoration-underline">
          Dokter umum HD
        </span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <span className="fw-semibold text-decoration-underline">
          Finance AP
        </span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <span className="fw-semibold text-decoration-underline">
          Accounting & tax
        </span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <span className="fw-semibold text-decoration-underline">
          Purchasing
        </span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <span className="fw-semibold text-decoration-underline">Logistik</span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <span className="fw-semibold text-decoration-underline">Teknisi</span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <span className="fw-semibold text-decoration-underline">Klinikal</span>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Telepon</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Email</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
      </table>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Data Bank</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama Bank</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Cabang</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Nama Account (A/N)
          </td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Kota</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>No. Rekening</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
          Mata Uang 
          </td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Mata Uang </td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
      </table>
    </Card.Body>
  );
};

export default ShowFDC;
