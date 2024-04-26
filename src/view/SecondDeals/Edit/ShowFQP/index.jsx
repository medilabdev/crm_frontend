import React from "react";
import { Card } from "react-bootstrap";

const ShowFQP = ({ data }) => {
  return (
    <Card.Body>
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
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">NPS Customer</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Promoters</td>
          <td className="px-1">:</td>
          <td colspan="3">
            <ul>
              <li>
                {data && data.promoters && data.promoters.length > 0
                  ? data.promoters[0]?.name
                  : "-"}
              </li>
              <li>
                {data && data.promoters && data.promoters.length > 1
                  ? data.promoters[1]?.name
                  : "-"}
              </li>
              <li>
                {data && data.promoters && data.promoters.length > 2
                  ? data.promoters[2]?.name
                  : "-"}
              </li>
            </ul>
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Neutrals</td>
          <td className="px-1">:</td>
          <td>
            <ul>
              <li>
                {data && data.neutrals && data.neutrals.length > 0
                  ? data.neutrals[0]?.name
                  : "-"}
              </li>
              <li>
                {data && data.neutrals && data.neutrals.length > 1
                  ? data.neutrals[1]?.name
                  : "-"}
              </li>
              <li>
                {data && data.neutrals && data.neutrals.length > 2
                  ? data.neutrals[2]?.name
                  : "-"}
              </li>
            </ul>
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Detractors</td>
          <td className="px-1">:</td>
          <td>
            <ul>
              <li>
                {data && data.detcractors && data.detcractors.length > 0
                  ? data.detcractors[0]?.name
                  : "-"}
              </li>
              <li>
                {data && data.detcractors && data.detcractors.length > 1
                  ? data.detcractors[1]?.name
                  : "-"}
              </li>
              <li>
                {data && data.detcractors && data.detcractors.length > 2
                  ? data.detcractors[2]?.name
                  : "-"}
              </li>
            </ul>
          </td>
        </tr>
      </table>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Existing Unit</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Existing vendor
          </td>
          <td className="px-1">:</td>
          <td>{data && data.existing_vendor ? data.existing_vendor : "-"}</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Jumlah unit mesin
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.number_of_machine_unit ? data.number_of_machine_unit : "-"}
          </td>
        </tr>
        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Total rata-rata tindakan per 6 bulan terakhir
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.average_total_actions_last_six_months
              ? data.average_total_actions_last_six_months
              : "-"}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Jumlah pasien existing
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.number_of_existing_patients
              ? data.number_of_existing_patients
              : "-"} 
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Masa kontrak berakhir
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.expired_contract_period
              ? data.expired_contract_period
              : "-"}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Replace/ Expand
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.status_contract_unit
              ? data.status_contract_unit
              : "-"}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Harga BHP existing
          </td>
          <td className="px-1">:</td>
          <td>
            <td>
              {data && data.existing_bhp_price
                ? data.existing_bhp_price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                : "-"}
            </td>
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Masa berlaku Izin HD
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.expired_hd_permit_period
              ? data.expired_hd_permit_period
              : "-"}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Bekerjasama BPJS
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.collaborating_with_bpjs
              ? data.collaborating_with_bpjs === "yes"
                ? "Iya"
                : "Tidak"
              : "-"}
          </td>
        </tr>
        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Jumlah sarana unit
          </td>
          <td className="px-1">:</td>
          <td>
            {" "}
            {data && data.number_of_unit_facilities
              ? data.number_of_unit_facilities
              : "-"}
          </td>
        </tr>
      </table>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">New Unit</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>Jumlah mesin</td>
          <td className="px-1">:</td>
          <td>
            {" "}
            {data && data.total_of_machine_unit
              ? data.total_of_machine_unit
              : "-"}
          </td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Sistem kerjasama
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.cooperation_system ? data.cooperation_system : "-"}
          </td>
        </tr>

        <tr className="fw-medium ">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>SDM</td>
          <td className="px-1">:</td>
          <td>
            {data && data.human_resources
              ? data.human_resources === "available"
                ? "Tersedia"
                : "Belum Tersedia"
              : "-"}
          </td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Faskes HD 5 km sekitar New Unit
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.hd_unit_count_distance_from_faskes ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: data.hd_unit_count_distance_from_faskes,
                }}
              />
            ) : (
              "-"
            )}
          </td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Kapasitas Faskes HD Sekitar New Unit
          </td>
          <td className="px-1">:</td>
          <td>
            {data && data.hd_health_facilities_arround ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: data.hd_health_facilities_arround,
                }}
              />
            ) : (
              "-"
            )}
          </td>
        </tr>
      </table>
      <div class="fw-bold mb-3">
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
              ? data.access_to_transportation ==="difficult" ? "Mudah" : "Sulit"
              : "-"}
          </td>
        </tr>
      </table>
      <div class="fw-bold mb-3">
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
          <td>{data && data.hd_unit_count_distance_from_faskes ? data.hd_unit_count_distance_from_faskes : "-"}</td>
        </tr>

        <tr className="fw-medium">
          <td style={{ width: "200px", fontSize: "0.9rem" }}>
            Jumlah mesin unit HD sekitar
          </td>
          <td className="px-1">:</td>
          <td>{data && data.hd_machine_unit_count ? data.hd_machine_unit_count : "-"}</td>
        </tr>
      </table>
      <div class="fw-bold mb-3">
        <span className="fs-6 text-decoration-underline">Catatan lainnya</span>
      </div>
      <table className="mb-4">
        <tr className="fw-medium">
          <td>{data && data.another_notes ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: data.another_notes,
                }}
              />
            ) : (
              "-"
            )}</td>
        </tr>
      </table>
    </Card.Body>
  );
};

export default ShowFQP;
