import React, { useState } from "react";
import FormDireksiAndPic from "../FDC/FormDireksiAndPic";
import FormDataBank from "../FDC/FormDataBank";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faEnvelopesBulk,
  faFileAlt,
  faFolderPlus,
  faPercent,
  faPhone,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import EditFormDataBank from "../FDC/EditFormDataBank";
import CompanyInformation from "./PartCreateFDC/CompanyInformation";
import DataPajak from "./PartCreateFDC/DataPajak";

const InputFDC = ({ data }) => {
  const token = localStorage.getItem("token");
  const uidOwner = localStorage.getItem("uid");
  const [inputData, setInputData] = useState([]);
  const [inputBank, setInputBank] = useState([]);
  const [fileKtp, setFileKtp] = useState([]);
  const [fileNpwp, setFileNpwp] = useState([]);
  const [sppkp, setSppkp] = useState([]);
  const [tandaDaftarPerusahaan, setTandaDaftarPerusahaan] = useState([]);
  const [siup, setSiup] = useState([]);
  const [kso, setKso] = useState([]);
  const [izinDagang, setIzinDagang] = useState([]);
  const [formDataDireksi, setFormDataDireksi] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const handleInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleInputChange = (e, groupIndex, position) => {
    const { name, value } = e.target;

    const match = name.match(/^([^\[]+)/); // ambil sebelum tanda '['
    const fieldName = match ? match[1] : name; 
    // Update formData dengan nama, posisi, dan field
    setFormDataDireksi((prevData) => ({
      ...prevData,
      [`direksi[${groupIndex}][${name}]`]: value,
      [`direksi[${groupIndex}][position]`]: position, // Tambahkan posisi
    }));

    // Tandai field sebagai disentuh
    setTouchedFields((prevFields) => ({
      ...prevFields,
      [`direksi[${groupIndex}][${name}]`]: true,
    }));
    
  
  };  

  const handleBankInputChange = (e, index, field) => {
    const { value } = e.target;
  
    setInputBank((prevData) => {
      const newData = [...prevData];
      if (!newData[index]) {
        newData[index] = {};
      }
      newData[index][field] = value;
      return newData;
    });
  };
  
  


  
  const HospitalType = data?.company?.hospital_type || null;
  const groups = [
    { title: "Direktur RS", position: "Direktur", fields: ["name", "phone_number", "email"] },
    { title: "Wakil Direktur", position: "Wakil Direktur", fields: ["name", "phone_number", "email"] },
    { title: "Penanggung Jawab Operasional", position: "Penanggung Jawab Operasional", fields: ["name", "phone_number", "email"] },
    ...(HospitalType && HospitalType.name !== "PT" && HospitalType.name !== "Yayasan"
      ? [
          { title: "Kepala Rumah Sakit", position: "Kepala Rumah Sakit", fields: ["name", "phone_number", "email"] },
          { title: "Kepala Perawat HD", position: "Kepala Perawat HD", fields: ["name", "phone_number", "email"] },
        ]
      : []),
    { title: "Kepala Ruang", position: "Kepala Ruang", fields: ["name", "phone_number", "email"] },
    { title: "Dokter SpPD", position: "Dokter SpPD", fields: ["name", "phone_number", "email"] },
    { title: "Finance AP", position: "Finance AP", fields: ["name", "phone_number", "email"] },
    { title: "Logistik", position: "Logistik", fields: ["name", "phone_number", "email"] },
  ];

 
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "KTP Penanggung Jawab", key: "ktp_file", file: null },
    { name: "Kartu NPWP", key: "npwp_file", file: null },
    { name: "Surat Pengukuhan Pengusaha Kena Pajak (SPPKP)", key: "sppkp_file", file: null },
    { name: "Tanda Daftar Perusahaan", key: "company_registration_file", file: null },
    { name: "Surat Izin Usaha Perdagangan", key: "business_license_file", file: null },
    { name: "Surat Keterangan Domisili Usaha (SIUP)", key: "siup_file", file: null },
    { name: "Tanda Tangan Kontrak Kerja Sama (KSO)", key: "kso_file", file: null },
  ]);
  
  

  
  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    setUploadedFiles((prevFiles) =>
      prevFiles.map((doc) =>
        doc.key === key ? { ...doc, file } : doc
      )
    );
  };
  

  const renderFileUpload = (label, key, file) => (
    <div
      className="mb-4"
      style={{
        border: "2px dashed #d3d3d3",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        cursor: "pointer",
        position: "relative",
      }}
      onClick={() => document.getElementById(`file-${key}`).click()}
    >
      <input
        type="file"
        id={`file-${key}`}
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e, key)}
      />
      <div>
        {!file ? (
          <>
            <div
              style={{
                fontSize: "2rem",
                color: "#007bff",
                marginBottom: "10px",
              }}
            >
              <FontAwesomeIcon icon={faUpload} className="fs-5" />
            </div>
            <p style={{ margin: 0, fontWeight: "bold" }}>Upload {label}</p>
            <small style={{ color: "#999" }}>or, click to browse (4 MB max)</small>
          </>
        ) : (
          <>
            <div
              style={{
                fontSize: "2rem",
                color: "#28a745",
                marginBottom: "10px",
              }}
            >
              <FontAwesomeIcon icon={faFileAlt} className="fs-2" />
            </div>
            <p style={{ margin: 0, color: "#333" }}><span className="fw-bold">  {label} </span>: {file.name}</p>
            <small style={{ color: "#007bff", cursor: "pointer" }}>Click to replace file</small>
          </>
        )}
      </div>
    </div>
  );

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let timerInterval;
      const { isConfirmed } = await Swal.fire({
        title: "Apakah kamu yakin untuk menyimpan?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });
      if (isConfirmed) {
        Swal.fire({
          title: "Loading...",
          html: "Tolong Tunggu <b></b> Beberapa Detik.",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            if (timer) {
              timerInterval = setInterval(() => {
                if (timer.textContent) {
                  timer.textContent = `${Swal.getTimerLeft()}`;
                }
              }, 100);
            }
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
        const formData = new FormData();
        formData.append("deals_uid", data.uid);
        formData.append("company_uid", data?.fqp_document?.hospital?.uid);
        formData.append("owner_company", inputData.owner_company || "");
        formData.append("founded_year_at", inputData.founded_year_at || "");
        formData.append("business_type", inputData.business_type || "");
        formData.append("website", inputData.website || "");
        formData.append(
          "name_person_in_charge",
          inputData.name_person_in_charge || ""
        );
        formData.append("email", inputData.email || "");
        formData.append("phone_number", inputData.phone_number || "");
        formData.append("company_address", inputData.company_address || "");
        formData.append(
          "other_company_address",
          inputData.other_company_address || ""
        );
        formData.append("npwp", inputData.npwp || "");
        formData.append("pkp_number", inputData.pkp_number || "");
        formData.append(
          "tax_invoice_number",
          inputData.tax_invoice_number || ""
        );
        uploadedFiles.forEach((doc) => {
          formData.append(doc.key, doc.file || "");
        });
        formData.append("business_license_file", izinDagang || "");
        if (inputBank && inputBank.length > 0) {
          inputBank.forEach((item, index) => {            
            formData.append(`bank[${index}][bank_name]`, item.nameBank || "");
            formData.append(`bank[${index}][branch_bank]`, item.cabang || "");
            formData.append(
              `bank[${index}][account_name]`,
              item.nameAccount || ""
            );
            formData.append(`bank[${index}][city]`, item.cityBank || "");
            formData.append(
              `bank[${index}][bank_account_number]`,
              item.noRek || ""
            );
            formData.append(`bank[${index}][currency]`, item.mataUang || "");
            formData.append(`bank[${index}][swift_code]`, item.swiftCode || "");
          });
        }
        
        groups.forEach((group, index) => {
          // Tambahkan posisi
          formData.append(`direksi[${index}][position]`, group.position);
  
          // Tambahkan semua field
          group.fields.forEach((field) => {
            const fieldName = `direksi[${index}][${field}]`;
            formData.append(fieldName, formDataDireksi[fieldName] || ""); // Gunakan nilai dari formDataDireksi jika ada, atau kosongkan
          });
        });
        // for (const pair of formData.entries()) {
        //   console.log(pair[0] + ": " + pair[1]);
        // }
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/v2/fdc-document`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        Swal.close();
        await Swal.fire({
          title: response.data.message,
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      } else {
        Swal.fire({
          text: "Something went wrong !",
          icon: "error",
        });
      }
    }
  };
  
  
  return (
    <Card.Body>
      <CompanyInformation data={data} handleInput={handleInput} />
      <DataPajak handleInput={handleInput} />
        <FormDireksiAndPic handleInputChange={handleInputChange} touchedFields={touchedFields} formDataDireksi={formDataDireksi} groups={groups} />
        <FormDataBank handleBankInputChange={handleBankInputChange} />

        <div className="header-box mt-2">
          <FontAwesomeIcon icon={faFolderPlus} className="me-2" /> DOKUMEN YANG HARUS DILENGKAPI
        </div>
        {uploadedFiles.map(({ name, key, file }) => renderFileUpload(name, key, file))}

      <div className=" mt-2">
        <button
          className="btn btn-primary me-2"
          onClick={handleSubmit}
        >
          Simpan
        </button>
        <button className="btn btn-secondary">Kembali</button>
      </div>
    </Card.Body>
  );
};

export default InputFDC;
