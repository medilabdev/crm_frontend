import React from "react";
import { Card } from "react-bootstrap";
import TableRab from "./TableRab";
import TableSupport from "./TableSupport";
import TableFee from "./TableFee";
import RekapBiaya from "./RekapBiaya";
import Timeline from "./Timeline";

const ShowLPP = () => {
  return (
    <Card.Body>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Customer</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Nama Customer</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Badan Usaha</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Tipe Faskes</td>
          <td className="px-1">:</td>
          <td>A</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>Regional BPJS</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
      </table>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Jenis Kerjasama</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Jenis Kerja Sama
          </td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Status</td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
      </table>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Term Kerjasama</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Jangka Waktu Kerjasama
          </td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Harga</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Pemakaian BHP</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            PPN 11% ditanggung
          </td>
          <td className="px-1">:</td>
          <td>- Unit</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Ongkir</td>
          <td className="px-1">:</td>
          <td>x </td>
        </tr>
      </table>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Peralatan</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>RO</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Operate MKHD-1</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Operate MKHD-2</td>
          <td className="px-1">:</td>
          <td>-</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Back Up MKHD-1</td>
          <td className="px-1">:</td>
          <td>- Unit</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Back Up MKHD-2</td>
          <td className="px-1">:</td>
          <td>x </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Total Mesin</td>
          <td className="px-1">:</td>
          <td>x </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Kirim Tahap 1 (qty)
          </td>
          <td className="px-1">:</td>
          <td>x </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Tanggal Pengiriman Tahap 1
          </td>
          <td className="px-1">:</td>
          <td>x </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Kirim Tahap 2 (qty)
          </td>
          <td className="px-1">:</td>
          <td>x </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Estimasi Tanggal Pengiriman Tahap 2
          </td>
          <td className="px-1">:</td>
          <td>x </td>
        </tr>
      </table>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Target</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Tindakan per mesin/ bulan
          </td>
          <td className="px-1">:</td>
          <td>48</td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Tindakan selama kerjasama
          </td>
          <td className="px-1">:</td>
          <td>Example</td>
        </tr>
      </table>
      <div class="fw-bold ">
        <span className="fs-6 text-decoration-underline">
          RAB dan Lainnya terkait Pembiayan Diawal
        </span>
      </div>
      <div className="p-2 mb-3">
        <TableRab />
      </div>
      <hr />
      <div class="fw-bold">
        <span className="fs-6 text-decoration-underline">
          Support selama masa kerjasama
        </span>
      </div>
      <div className="p-2 mb-3">
        <TableSupport />
      </div>
      <hr />
      <div class="fw-bold">
        <span className="fs-6 text-decoration-underline">Fee Tindakan</span>
      </div>
      <div className="p-2 mb-3">
        <TableFee />
      </div>
      <hr />
      <div class="fw-bold">
        <span className="fs-6 text-decoration-underline">Rekap Biaya</span>
      </div>
      <RekapBiaya />
      <hr />
      <div class="fw-bold">
        <span className="fs-6 text-decoration-underline">Catatan</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td>-</td>
        </tr>
      </table>
      <Timeline />
    </Card.Body>
  );
};

export default ShowLPP;
