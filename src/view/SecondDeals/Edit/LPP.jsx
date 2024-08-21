import React, { useState } from "react";
import { Card } from "react-bootstrap";
import DataTableRab from "./Lpp/Rab";
import DataTableFeeAction from "./Lpp/FeeAction";
import DataTableRekapBiaya from "./Lpp/RekapBiaya";
import ReactQuill from "react-quill";
import Timeline from "./Lpp/Timeline";
import SupportKerjaSama from "./Lpp/SupportKerjaSama";
import {
  faDownload,
  faEye,
  faMoneyBillTrendUp,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowLPP from "./ShowLPP";
import InputLpp from "./Lpp/InputLpp";
import EditLpp from "./ShowLPP/EditLpp";
import { BlobProvider, Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import Betul from "./../../../assets/img/betul.png"
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
    width: '30%',
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
  table: {
    display: 'table',
    width: '80%',
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: 0.3,
    borderColor: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0.3,
    borderColor: 'black',
  },
  tableCell: {
    padding: 2,
    textAlign: 'center',
    fontSize: 8,
    width: '14%',
    borderStyle: 'solid',
    borderWidth: 0.3,
    borderColor: 'black',
  },
  headerCell: {
    backgroundColor: '#83B4FF',  // Warna latar belakang tabel header
    fontWeight: 'bold',
    fontSize: 8,
    borderStyle: 'solid',
    borderWidth: 0.3,
    borderColor: 'black',

  },
  processCell: {
    backgroundColor: 'white',  // Warna latar belakang untuk process
    fontWeight: 'bold',
    fontSize: 8,
    borderStyle: 'solid',
    borderWidth: 0.3,
    borderColor: 'black',
  },
});

const TimelineData = ({ data }) => {
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.headerCell, {width:120, borderColor:'black'}]}>Process</Text>
        {[...Array(12).keys()].map((i) => (
          <Text key={i} style={[styles.tableCell, styles.headerCell, {width:50}]}>
            {i + 1}
          </Text>
        ))}
      </View>
      {data?.timeline?.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.processCell, {width:150}]}>
            {item.name || '-'}
          </Text>
          {[...Array(12).keys()].map((i) => (
        <View key={i} style={styles.tableCell}>
          <Text
            style={{
              textAlign: 'center',
              color: item[i] == 1 ? '#000' : '#fff', // Warna hitam jika 1, putih jika tidak
              fontSize: 8, // Ukuran font bisa disesuaikan
            }}
          >
            {item[i] == 1 ? <Image src={Betul} /> : ''}
          </Text>
        </View>
))}
        </View>
      ))}
    </View>
  );
};

const TableRabPdf = ({ data }) => {
  const alkes = [];
  const noAlkse = [];
  
  if (data?.rab?.length > 0) {
    data.rab.forEach((item) => {
      if (item?.is_alkes === "yes") {
        alkes.push({ ...item });
      } else if (item?.is_alkes === "no") {
        noAlkse.push({ ...item });
      }
    });
  }

  return (
    <>
     {alkes.length > 0 && (
      <>
      <Text>Alat Kesehatan</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.headerCell, { width: 150 }]}>Item</Text>
          <Text style={[styles.tableCell, styles.headerCell, { width: 150 }]}>Nilai Estimasi Biaya</Text>
          <Text style={[styles.tableCell, styles.headerCell, { width: 150 }]}>Quantity</Text>
          <Text style={[styles.tableCell, styles.headerCell, { width: 150 }]}>Total Estimasi Biaya</Text>
          <Text style={[styles.tableCell, styles.headerCell, { width: 150 }]}>Catatan Realisasi</Text>
        </View>
        {alkes?.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: 150, textAlign: 'left' }]}>{item?.item_uid || '-'}</Text>
            <Text style={[styles.tableCell, { width: 150 }]}>
              {item?.estimated_cost
                ? item.estimated_cost.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                : '-'}
            </Text>
            <Text style={[styles.tableCell, { width: 150 }]}>{item?.qty || '-'}</Text>
            <Text style={[styles.tableCell, { width: 150 }]}>
              {item?.total_estimated_cost
                ? item.total_estimated_cost.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                : '-'}
            </Text>
            <Text style={[styles.tableCell, { width: 150, fontSize: 7.5, textAlign: 'left'  }]}>{item?.realization_note || '-'}</Text>
          </View>
        ))}
      </View>
      </>
     )}
     {noAlkse.length > 0 && (<>
      <Text style={{fontSize:10, marginBottom: -14}}>Bukan Alat Kesehatan</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.headerCell, { width: 150 }]}>Item</Text>
          <Text style={[styles.tableCell, styles.headerCell, { width: 150 }]}>Nilai Estimasi Biaya</Text>
          <Text style={[styles.tableCell, styles.headerCell, { width: 150 }]}>Quantity</Text>
          <Text style={[styles.tableCell, styles.headerCell, { width: 150 }]}>Total Estimasi Biaya</Text>
          <Text style={[styles.tableCell, styles.headerCell, { width: 150 }]}>Catatan Realisasi</Text>
        </View>
        {noAlkse?.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: 150, textAlign: 'left' }]}>{item?.item_uid || '-'}</Text>
            <Text style={[styles.tableCell, { width: 150 }]}>
              {item?.estimated_cost
                ? item.estimated_cost.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                : '-'}
            </Text>
            <Text style={[styles.tableCell, { width: 150 }]}>{item?.qty || '-'}</Text>
            <Text style={[styles.tableCell, { width: 150 }]}>
              {item?.total_estimated_cost
                ? item.total_estimated_cost.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                : '-'}
            </Text>
            <Text style={[styles.tableCell, { width: 150, fontSize: 7.5, textAlign: 'left'  }]}>{item?.realization_note || '-'}</Text>
          </View>
        ))}
      </View>
      </>
    )}
    </>
  );
};
const SupportKerjaSamaPdf = ({ data }) => {
  return (
    <View style={styles.table}>
        <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.headerCell, {width:150, borderColor:'black'}]}>Item</Text>
        <Text style={[styles.tableCell, styles.headerCell, {width:150, borderColor:'black'}]}>Nilai Estimasi Biaya</Text>
        <Text style={[styles.tableCell, styles.headerCell, {width:150, borderColor:'black'}]}>Quantity</Text>
        <Text style={[styles.tableCell, styles.headerCell, {width:150, borderColor:'black'}]}>Total Estimasi Biaya</Text>
        <Text style={[styles.tableCell, styles.headerCell, {width:150, borderColor:'black'}]}>Catatan Realisasi</Text>
        </View>
        {data?.support?.map((item, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={[styles.tableCell, { width: 144, borderColor: 'black', textAlign: 'left' }]}>{item?.item_uid || '-'}</Text>
        <Text style={[styles.tableCell, { width: 144, borderColor: 'black' }]}> {item?.estimated_cost 
    ? item.estimated_cost.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) 
    : '-'}</Text>
        <Text style={[styles.tableCell, { width: 144, borderColor: 'black' }]}>{item?.qty || '-'}</Text>
        <Text style={[styles.tableCell, { width: 144, borderColor: 'black' }]}> {item?.total_estimated_cost 
    ? item.total_estimated_cost.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : '-'}</Text>
        <Text style={[styles.tableCell, { width: 144, borderColor: 'black', fontSize: 7.5, textAlign: 'left' }]}>{item?.realization_note || '-'}</Text>
      </View>
    ))}
    </View>
  )
}

const FeeTindakanPdf = ({ data }) => {
  return (
    <View style={styles.table}>
        <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.headerCell, {width:150, borderColor:'black'}]}>Nama Penerima</Text>
        <Text style={[styles.tableCell, styles.headerCell, {width:150, borderColor:'black'}]}>Nilai Estimasi Biaya</Text>
        <Text style={[styles.tableCell, styles.headerCell, {width:150, borderColor:'black'}]}>Quantity</Text>
        <Text style={[styles.tableCell, styles.headerCell, {width:150, borderColor:'black'}]}>Total Estimasi Biaya</Text>
        <Text style={[styles.tableCell, styles.headerCell, {width:150, borderColor:'black'}]}>Catatan Realisasi</Text>
        </View>
        {data?.fee?.map((item, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={[styles.tableCell, { width: 144, borderColor: 'black', textAlign: 'left' }]}>{item?.recieve_name || '-'}</Text>
        <Text style={[styles.tableCell, { width: 144, borderColor: 'black' }]}> {item?.value 
    ? item.value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) 
    : '-'}</Text>
        <Text style={[styles.tableCell, { width: 144, borderColor: 'black' }]}>{item?.qty || '-'}</Text>
        <Text style={[styles.tableCell, { width: 144, borderColor: 'black' }]}> {item?.total 
    ? item.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : '-'}</Text>
        <Text style={[styles.tableCell, { width: 144, borderColor: 'black', fontSize:7.5, textAlign: 'left'}]}>{item?.realization_note || '-'}</Text>
      </View>
    ))}
    </View>
  )
}

const RekapBiayaPdf = ({ data }) => {
  let valueFee = 0;
    if(data?.fee?.length > 0) {
      data?.fee.map((item) => (valueFee += item?.total)) 
    } 
  
  let valueSupport = 0
    if(data?.support?.length > 0){
      data?.support?.map((item) => (valueSupport += item?.total_estimated_cost))
    }

  let valueRab = 0
    if(data?.rab?.length > 0){
      data?.rab?.map((item) =>{
        if(item?.is_alkes === "no"){
          valueRab += item?.total_estimated_cost
        }
      }
    )
    }

    return (
      <View style={styles.table}>
      <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.headerCell, {width:250, borderColor:'black'}]}>Rekapitulasi</Text>
      <Text style={[styles.tableCell, styles.headerCell, {width:250, borderColor:'black'}]}>Nilai Estimasi Biaya</Text>
      </View>
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { width: 250, borderColor: 'black' }]}>RAB Bangunan & Lainnya Terkain</Text>
      <Text style={[styles.tableCell, { width: 250, borderColor: 'black' }]}> {valueRab 
  ? valueRab.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) 
  : '-'}</Text>
    </View>
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { width: 250, borderColor: 'black' }]}>Support Selama Kerja Sama</Text>
      <Text style={[styles.tableCell, { width: 250, borderColor: 'black' }]}> {valueSupport 
  ? valueSupport.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) 
  : '-'}</Text>
  </View>
  <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { width: 250, borderColor: 'black' }]}>Fee Tindakan</Text>
      <Text style={[styles.tableCell, { width: 250, borderColor: 'black' }]}> {valueFee 
  ? valueFee.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) 
  : '-'}</Text>
    </View>
  </View>
    )
}

const LppPdf = ({data}) =>{
  const formatDate = (dateString) => {
    if (!dateString) return '-';
  
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    return date.toLocaleDateString('en-US', options);
  };
 return(
  <Document>
   <Page size="A4" style={styles.section}>
    <View >
      <Text style={{ fontWeight: 700, fontSize:16, marginBottom: 10, textAlign: 'center'}}>Lembar Persetujuan Project</Text>
    </View>
    <View style={[styles.row, { marginTop: 12 }]}>
        <Text style={styles.label}>Owner Sales Project</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.owner?.name || '-'}</Text>
      </View>
    <View style={styles.row}>
        <Text style={styles.label}>Approved By</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.lpp_document?.approved_by?.name || '-'}</Text>
      </View>
    <View style={styles.row}>
        <Text style={styles.label}>Approved At</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{formatDate(data?.lpp_document?.approved_at || '-')}</Text>
      </View>
    <View style={styles.row}>
        <Text style={styles.label}>Approved By</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.staging?.name === "Closed Won" ? "Jimmy": "-"}</Text>
      </View>
    <View style={styles.row}>
        <Text style={styles.label}>Approved At </Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.staging?.name === "Closed Won" ? "August 15, 2024": "-"}</Text>
      </View>
    <View style={styles.row}>
      <Text style={styles.header}>Customer</Text>
    </View>
      <View style={styles.row}>
        <Text style={styles.label}>Nama Customer</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.lpp_document?.customer?.name || '-'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Badan Usaha</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.fqp_document?.hospital?.company_type?.name || "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tipe Faskes</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.lpp_document?.faskes_type?.name || "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Regional BPJS</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.lpp_document?.bpjs_regional?.regional || "-"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.header}>Jenis Kerjasama</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Jenis Kerja Sama</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{data?.lpp_document?.type_collaboration === "RevenueSharing"
              ? "Revenue Sharing"
              : data?.lpp_document?.type_collaboration === "JualPutus"
                ? "Jual Putus"
                : "KSO"}</Text>
      </View>
          
      {data?.lpp_document?.type_collaboration === "RevenueSharing" ? ( 
        <>
        <View style={styles.row}>
         <Text style={styles.label}>Customer</Text>
         <Text style={styles.colon}>:</Text>
         <Text style={styles.value}>{data?.lpp_document?.revenue_sharing_customer || "-"} %</Text>
       </View>
       <View>
        <Text style={styles.label}>ISS</Text>
         <Text style={styles.colon}>:</Text>
         <Text style={styles.value}>{data?.lpp_document?.revenue_sharing_iss || "-"} %</Text>
       </View>
       <View>
        <Text style={styles.label}>ISS</Text>
         <Text style={styles.colon}>:</Text>
         <Text style={styles.value}>{data?.lpp_document?.revenue_sharing_iss || "-"} %</Text>
       </View>
       </>
      ) : data?.lpp_document?.type_collaboration === "JualPutus" ? (
        <View style={styles.row}>
         <Text style={styles.label}>ISS</Text>
         <Text style={styles.colon}>:</Text>
         <Text style={styles.value}>{data?.lpp_document?.revenue_sharing_iss || "-"} %</Text>
       </View>
      ): ""}
        <View style={styles.row}>
         <Text style={styles.label}>Status</Text>
         <Text style={styles.colon}>:</Text>
         <Text style={styles.value}>{data?.lpp_document?.timeline[0].category?.name || "-"}</Text>
        </View>
        
        <View style={styles.row}>
         <Text style={styles.header}>Term Kerjasama</Text>
        </View>

        <View style={styles.row}>
         <Text style={styles.label}>Jangka Waktu Kerjasama</Text>
         <Text style={styles.colon}>:</Text>
         <Text style={styles.value}>{data?.lpp_document?.collaboration_period || "-"}</Text>
        </View>
        <View style={styles.row}>
         <Text style={styles.label}>Harga</Text>
         <Text style={styles.colon}>:</Text>
         <Text style={styles.value}>Rp .{new Intl.NumberFormat().format(data?.lpp_document?.price) || "-"}</Text>
        </View>
        <View style={styles.row}>
         <Text style={styles.label}>Pemakaian BHP</Text>
         <Text style={styles.colon}>:</Text>
         <Text style={styles.value}>{data?.lpp_document?.bhp_usage || "-"}</Text>
        </View>
        <View style={styles.row}>
         <Text style={styles.label}>PPN 11% ditanggung</Text>
         <Text style={styles.colon}>:</Text>
         <Text style={styles.value}>Customer</Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.header}>Peralatan</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>RO (Kapasitas GPD)</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{data?.lpp_document?.ro || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Operate MKHD-1</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{data?.lpp_document?.operate_mkhd_first_qty || "-"} Unit</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Operate MKHD-2</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{data?.lpp_document?.operate_mkhd_second_qty || "-"} Unit</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Back Up MKHD-1</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{data?.lpp_document?.backup_mkhd_first_qty || "-"} Unit</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Back Up MKHD-2</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{data?.lpp_document?.backup_mkhd_second_qty || "-"} Unit</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Mesin</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{data?.lpp_document?.total_mesin_qty || "-"} Unit</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Kirim Tahap 1 (qty)</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{data?.lpp_document?.stage_first_delivery_qty || "-"} Unit</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tanggal Pengiriman Tahap 1</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{data?.lpp_document?.date_first_delivery || "-"} Unit</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pengiriman Operate MKHD 1</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{data?.lpp_document?.delivery_mkhd_first_qty || "-"} Unit</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pengiriman Operate MKHD 2</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{data?.lpp_document?.delivery_mkhd_second_qty || "-"} Unit</Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.header}>Target</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tindakan per mesin/ bulan</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{data?.lpp_document?.action_machine_per_month_qty || "-"} Unit</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tindakan selama kerjasama</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{data?.lpp_document?.action_during_cooperation_qty || "-"} Unit</Text>
        </View>

        
    </Page >
    <Page size="A4" style={styles.section}>
    {data?.lpp_document?.rab !== null ? (
          <>
            <View style={styles.row}>
            <Text style={styles.header} >RAB Bangunan & Lainnya terkait pembiayaan di awal
            </Text>
            </View>
            <View style={{marginTop:-3}}>
            <TableRabPdf data={data?.lpp_document} />
            </View>
        </>
        ) : ''}
        {data?.lpp_document?.support !== null ? (
          <>
            <View style={styles.row}>
            <Text style={[styles.header, {marginBottom:-7}]}>Support selama masa kerjasama
            </Text>
            </View>
            <View style={{marginTop:-8}}>
            <SupportKerjaSamaPdf data={data?.lpp_document} />
            </View>
        </>
        ) : ''}
        {data?.lpp_document?.fee !== null ? (
          <>
            <View style={styles.row}>
            <Text style={[styles.header, {marginBottom:-7}]}>Fee Tindakan
            </Text>
            </View>
            <View style={{marginTop:-8}}>
            <FeeTindakanPdf data={data?.lpp_document} />
            </View>
        </>
        ) : ''}

          <View style={styles.row}>
          <Text style={[styles.header, {marginBottom:-7}]}>Rekapitulasi Biaya</Text>
          </View>
          <View style={{marginTop:-8}}>
            <RekapBiayaPdf data={data?.lpp_document} />
            </View>
       
    </Page>

    <Page size="A4" style={styles.section}>
    <View style={styles.row}>
        <Text style={styles.header}>Timeline</Text>
        </View>
        <View style={[styles.row, {marginBottom:-4}]}>
          <Text style={styles.label}>Start Date Timeline</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>{data?.lpp_document?.timeline[0]?.year_period || "-"} </Text>
        </View>
        <View style={{marginTop:-8}}>
        <TimelineData data={data?.lpp_document} />
        </View>
    </Page>
</Document>
)}


const LPP = ({ userUid, data, listCompany, uidDeals }) => {
  // console.log(data?.staging?.name);
  
  const [showLpp, setShowLpp] = useState(true);
  const uid = localStorage.getItem("uid");
  const handleShowLpp = () => setShowLpp(!showLpp);

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = "lpp_" + (data?.lpp_document?.customer?.name || "") + ".pdf";
    link.click();
  };
  return (
    <div id="LPP">
      <div className="col-12">
        <Card>
          <Card.Header>
            <div className="">
              <span className="fs-5 fw-semibold">
                {data?.lpp_document === null
                  ? "Lembar Persetujuan Project"
                  : "Edit Lembar Persetujuan Project"}
              </span>
              <div className="float-end">
                <button className="btn btn-primary" onClick={handleShowLpp}>
                  <FontAwesomeIcon
                    icon={
                      userUid !== uid ? faEye : showLpp ? faEye : faPenToSquare
                    }
                  />
                </button>
                
                <BlobProvider document={<LppPdf data={data} />}>
                    {({blob, url, loading, error}) => (
                      !loading && !error && (
                        <button className="btn ms-2 btn-success" onClick={() => handleDownload(url)}>
                        <FontAwesomeIcon icon={faDownload} />
                        </button>
                      )
                    )}
                </BlobProvider>
              </div>
            </div>
          </Card.Header>
          {data?.lpp_document === null ? (
            <InputLpp
              data={data}
              listCompany={listCompany}
              uidDeals={uidDeals}
            />
          ) : userUid !== uid ? (
            <ShowLPP data={data} />
          ) : showLpp ? (
            <EditLpp data={data?.lpp_document} listCompany={listCompany}  uidDeals={uidDeals} />
          ) : (
            <ShowLPP data={data} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default LPP;
