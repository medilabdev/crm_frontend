import React from 'react'
import { PDFDownloadLink, Document, Page, StyleSheet, Text, View, BlobProvider } from '@react-pdf/renderer'
const PdfFqp = ({ data }) => {
    const styles = StyleSheet.create({
        section: {
          margin: 15,
          padding: 30,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 4,
        },
        header:{
          fontSize:12,
          marginTop:10,
          marginBottom: 4,
          textDecoration:"underline"
        },
        label: {
          width: '35%',
          fontSize: 9,
        },
        value: { 
          marginRight: 4,
          fontSize: 9,
        },
        colon: {
          marginRight: 5, 
          fontSize: 9,
          textAlign:'top'
        },
      });
  return (
    <Document>
    <Page size={"A4"} style={styles.section}>
      <View>
      <Text style={{ fontWeight: 700, fontSize:16, marginBottom: 10, textAlign: 'center'}}>Form Qualifying Project</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.header}>Data Dasar Informasi</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Nama Rumah Sakit / Klinik</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.hospital?.name || '-'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Nama Kepala Ruangan HD</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.head_name_hd_room || "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Nama Dokter Umum/Pelaksana HD</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.name_of_general_practitioner || "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Nama Dokter Konsulen/SpPD KGH</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.name_of_consular_doctor
              ? data.name_of_consular_doctor
              : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Contact Person Perawat/Dokter</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.contact_person_nurse_or_doctor || "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Contact Person Pengadaan/Manajemen</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.procurement_or_management_contact_person || "-"}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.header}>NPS Customer</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Promoters</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}> {data && data.promoters && data.promoters.length > 0
                  ? data.promoters[0]?.name
                  : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}></Text>
        <Text style={styles.colon}> </Text>
        <Text style={styles.value}>  {data && data.promoters && data.promoters.length > 0
                  ? data.promoters[1]?.name
                  : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}></Text>
        <Text style={styles.colon}> </Text>
        <Text style={styles.value}> {data && data.promoters && data.promoters.length > 0
                  ? data.promoters[2]?.name
                  : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Neutrals</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.neutrals && data.neutrals.length > 0
                  ? data.neutrals[0]?.name
                  : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}></Text>
        <Text style={styles.colon}> </Text>
        <Text style={styles.value}>{data && data.neutrals && data.neutrals.length > 0
                  ? data.neutrals[1]?.name
                  : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}></Text>
        <Text style={styles.colon}> </Text>
        <Text style={styles.value}>{data && data.neutrals && data.neutrals.length > 0
                  ? data.neutrals[2]?.name
                  : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Detractors</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.detcractors && data.detcractors.length > 0
                  ? data.detcractors[0]?.name
                  : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}></Text>
        <Text style={styles.colon}> </Text>
        <Text style={styles.value}>{data && data.detcractors && data.detcractors.length > 0
                  ? data.detcractors[1]?.name
                  : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}></Text>
        <Text style={styles.colon}> </Text>
        <Text style={styles.value}>{data && data.detcractors && data.detcractors.length > 0
                  ? data.detcractors[2]?.name
                  : "-"}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.header}>Existing Unit</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Existing vendor</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.existing_vendor ? data.existing_vendor : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Jumlah unit mesin</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.number_of_machine_unit ? data.number_of_machine_unit : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total rata-rata tindakan per 6 bulan terakhir</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.average_total_actions_last_six_months
              ? data.average_total_actions_last_six_months
              : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Jumlah pasien existing</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.number_of_existing_patients
              ? data.number_of_existing_patients
              : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Masa kontrak berakhir</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.expired_contract_period
              ? data.expired_contract_period
              : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Replace/ Expand</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.status_contract_unit
              ? data.status_contract_unit
              : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Harga BHP existing</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.existing_bhp_price
                ? data.existing_bhp_price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Masa berlaku Izin HD</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.expired_hd_permit_period
              ? data.expired_hd_permit_period
              : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Bekerjasama BPJS</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.collaborating_with_bpjs
              ? data.collaborating_with_bpjs === "yes"
                ? "Iya"
                : "Tidak"
              : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Jumlah sarana unit</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.number_of_unit_facilities
              ? data.number_of_unit_facilities
              : "-"}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.header}>New Unit</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Jumlah mesin</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.total_of_machine_unit
              ? data.total_of_machine_unit
              : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Sistem kerjasama</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data?.cooperation_system === "etc" ? "lainnya" : data?.cooperation_system ?? "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>SDM</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.human_resources
              ? data.human_resources === "available"
                ? "Tersedia"
                : "Belum Tersedia"
              : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Faskes HD 5 km sekitar New Unit</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.hd_health_facilities_arround ? data.hd_health_facilities_arround.replace(/<\/?[^>]+(>|$)/g, "")  : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Kapasitas Faskes HD Sekitar New Unit</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.hd_health_facilities_capacity_approximately
      ? data.hd_health_facilities_capacity_approximately.replace(/<\/?[^>]+(>|$)/g, "")
      : "-"}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.header}>Keadaan Lingkungan</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Banjir</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.cataclysm
              ? data.cataclysm === "yes"
                ? "Iya"
                : "Tidak"
              : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Dekat laut (kurang dari 5 km)</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.near_the_sea
              ? data.near_the_sea === "yes"
                ? "Iya"
                : "Tidak"
              : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ketersediaan SDM</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.availability_of_human_resource
              ? data.availability_of_human_resource === "available"
                ? "Tersedia"
                : "Belum Tersedia"
              : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Akses Transportasi/ Logistik</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.access_to_transportation
              ? data.access_to_transportation ==="easy" ? "Mudah" : "Sulit"
              : "-"}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.header}>Informasi Lainnya</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Jumlah unit HD kurang dari 20 km dari faskes</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.hd_unit_count_distance_from_faskes ? data.hd_unit_count_distance_from_faskes : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Jumlah mesin unit HD sekitar</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.hd_machine_unit_count ? data.hd_machine_unit_count : "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Catatan lainnya</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data && data.another_notes ? data.another_notes.replace(/<\/?[^>]+(>|$)/g, "") : "-"}</Text>
      </View>
    </Page>
  </Document>
  )
}

export default PdfFqp