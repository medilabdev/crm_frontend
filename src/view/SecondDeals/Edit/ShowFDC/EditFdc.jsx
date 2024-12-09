import {
  faBuilding,
  faEnvelopesBulk,
  faFileAlt,
  faFolderPlus,
  faPercent,
  faPhone,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { token } from "../../partials/ColumnsTable";
import EditBank from "./EditBank";
import EditDireksi from "./EditDireksi";

const EditFdc = ({ data }) => {
  
  const [editData, setEditData] = useState(data?.fdc_document);
  const [fileKtp, setFileKtp] = useState([]);
  const [fileNpwp, setFileNpwp] = useState([]);
  const [sppkp, setSppkp] = useState([]);
  const [tandaDaftarPerusahaan, setTandaDaftarPerusahaan] = useState([]);
  const [siup, setSiup] = useState([]);
  const [kso, setKso] = useState([]);
  const [izinDagang, setIzinDagang] = useState([]);
  const [error, setError] = useState('')
  const handleInput = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };
  const CompanyUid = data?.fdc_document?.company?.uid;

  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "KTP Penanggung Jawab", key: "ktp_file", file: null, fileOld: null },
    { name: "Kartu NPWP", key: "npwp_file", file: null, fileOld: null },
    { name: "Surat Pengukuhan Pengusaha Kena Pajak (SPPKP)", key: "sppkp_file", file: null, fileOld: null },
    { name: "Tanda Daftar Perusahaan", key: "company_registration_file", file: null, fileOld: null },
    { name: "Surat Izin Usaha Perdagangan", key: "business_license_file", file: null, fileOld: null },
    { name: "Surat Keterangan Domisili Usaha (SIUP)", key: "siup_file", file: null, fileOld: null },
    { name: "Tanda Tangan Kontrak Kerja Sama (KSO)", key: "kso_file", file: null, fileOld: null },
  ]);

  
  

  useEffect(() => {
    if (data?.fdc_document) {
      const updatedFiles = uploadedFiles.map((fileData) => ({
        ...fileData,
        fileOld: data.fdc_document[fileData.key]
          ? { name: data.fdc_document[fileData.key] }
          : null,
      }));
      setUploadedFiles(updatedFiles);
    }
  }, [data]);

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    setUploadedFiles((prevFiles) =>
      prevFiles.map((doc) =>
        doc.key === key ? { ...doc, file } : doc
      )
    );
  };

  const renderFileRow = (label, key, file, fileOld) => (
    <div className="row align-items-center mb-4" key={key}>
      {/* Kolom File Lama */}
      <div className="col-md-6">
        {fileOld ? (
          <div className="file-old">
            <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
              {label} (File Lama):
            </p>
            <a
              href={`$${process.env.REACT_APP_BACKEND_IMAGE}/storage/file/deals/fdc/${fileOld.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" mt-2"
            >
              {fileOld.name}
            </a>
          </div>
        ) : (
          <p style={{ fontStyle: "italic", color: "#999" }}>{label} (File Lama): Tidak ada</p>
        )}
      </div>
  
      {/* Kolom File Baru */}
      <div className="col-md-6">
        <div
          style={{
            border: "2px dashed #d3d3d3",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
          }}
          onClick={() => document.getElementById(`file-${key}`).click()}
        >
          {/* Input File */}
          <input
            type="file"
            id={`file-${key}`}
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, key)}
          />
  
          {/* Tampilan Jika File Baru Tidak Ada */}
          {!file ? (
            <div>
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
            </div>
          ) : (
            /* Tampilan Jika File Baru Ada */
            <div>
              <div
                style={{
                  fontSize: "2rem",
                  color: "#28a745",
                  marginBottom: "10px",
                }}
              >
                <FontAwesomeIcon icon={faFileAlt} className="fs-2" />
              </div>
              <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                {label} (File Baru): {file.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  const handleUpdate = async (e) => {
    e.preventDefault();

    if(!editData.is_validate){
      setError('Wajib Memilih apakah membutuhkan approval manager atau tidak!')
      Swal.fire({
        text:'Ada Form yang belum diisi',
        icon:'warning'
      })
     return
    }
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
        formData.append("_method", "put");
        formData.append("company_uid", CompanyUid);
        formData.append("owner_company", editData.owner_company || "");
        formData.append("founded_year_at", editData.founded_year_at || "");
        formData.append("business_type", editData.business_type || "");
        formData.append("website", editData.website || "");
        formData.append(
          "name_person_in_charge",
          editData.name_person_in_charge || ""
        );
        formData.append("email", editData.email || "");
        formData.append("phone_number", editData.phone_number || "");
        formData.append("company_address", editData.company_address || "");
        formData.append(
          "other_company_address",
          editData.other_company_address || ""
        );
        formData.append("npwp", editData.npwp || "");
        formData.append("pkp_number", editData.pkp_number || "");
        formData.append(
          "tax_invoice_number",
          editData.tax_invoice_number || ""
        );
        uploadedFiles.forEach(({ key, file }) => {
          formData.append(key, file || ""); 
        });
        formData.append("business_license_file", izinDagang || "");
        formData.append('is_validate', editData.is_validate)
        for (const pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/v2/fdc-document/${data.fdc_document?.uid}`,
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
        <div class="header-box">
       <FontAwesomeIcon icon={faBuilding} className="me-2" /> INFORMASI PERUSAHAAN
              </div>
      <input
        type="text"
        name=""
        className="form-control mb-3"
        disabled
        value={data?.company?.name}
        id=""
      />
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="floatingInput">Nama Pemilik Perusahaan</label>
          <input
            type="text"
            className="form-control"
            name="owner_company"
            value={editData?.owner_company || ""}
            onChange={handleInput}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="floatingInput">Didirikan Sejak Tahun</label>
          <input
            type="text"
            className="form-control"
            name="founded_year_at"
            value={editData?.founded_year_at || ""}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="floatingInput">Jenis Usaha</label>
          <input
            type="text"
            className="form-control"
            name="business_type"
            value={editData?.business_type || ""}
            onChange={handleInput}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="floatingInput">Alamat Situs</label>
          <input
            type="text"
            className="form-control"
            name="website"
            value={editData?.website || ""}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          placeholder="Input in here"
          className="form-control"
          name="name_person_in_charge"
          value={editData?.name_person_in_charge || ""}
          onChange={handleInput}
        />
        <label htmlFor="floatingInput">Nama Penanggung Jawab & Jabatan</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          name="email"
          placeholder="Input in here"
          className="form-control"
          value={editData?.email || ""}
          onChange={handleInput}
        />
        <label htmlFor="floatingInput">
          <FontAwesomeIcon icon={faEnvelopesBulk} /> Alamat Email
        </label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          name="phone_number"
          placeholder="Input in here"
          className="form-control"
          value={editData?.phone_number || ""}
          onChange={handleInput}
        />
        <label htmlFor="floatingInput">
          <FontAwesomeIcon icon={faPhone} /> No. Telepon kantor
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="">Alamat Perusahaan (Sesuai NPWP)</label>
        <textarea
          name="company_address"
          id=""
          cols="15"
          rows="5"
          onChange={handleInput}
          className="form-control"
        >
          {editData?.company_address || ""}
        </textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="">
          Alamat Lain perusahaan (Apabila alamat : Perusahaan berbeda dengan
          yang tersebut Diatas)
        </label>
        <textarea
          name="other_company_address"
          id=""
          cols="15"
          rows="5"
          onChange={handleInput}
          className="form-control"
        >
          {editData?.other_company_address || ""}
        </textarea>
      </div>
      <div class="header-box mt-2">
       <FontAwesomeIcon icon={faPercent} className="me-2" /> DATA PAJAK
              </div>
      
      <div className="form-floating mb-3">
        <input
          type="text"
          name="npwp"
          placeholder="Input in here"
          className="form-control"
          onChange={handleInput}
          value={editData?.npwp || ""}
        />
        <label htmlFor="floatingInput">
          Nomor NPWP (Sesuai dengan Faktur Pajak)
        </label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          placeholder="Input in here"
          name="tax_invoice_number"
          className="form-control"
          value={editData?.tax_invoice_number || ""}
          onChange={handleInput}
        />
        <label htmlFor="floatingInput">Nomor Serial Faktur Pajak</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          placeholder="Input in here"
          className="form-control"
          name="pkp_number"
          value={editData?.pkp_number || ""}
          onChange={handleInput}
        />
        <label htmlFor="floatingInput">Nomor Surat Pengukuhan PKP</label>
      </div>
      <EditDireksi valueOld={data?.fdc_document?.direksi} data={data} />
      <EditBank valueOld={data?.fdc_document?.bank} />  
      <div class="header-box mt-2">
       <FontAwesomeIcon icon={faFolderPlus} className="me-2" /> DOKUMEN YANG HARUS DILENGKAPI
              </div>
      <div className="mb-3">
      {uploadedFiles.map(({ name, key, file, fileOld }) =>
      renderFileRow(name, key, file, fileOld)
    )}
      </div>
      <div className="mb-3">
          <label htmlFor="" className="mb-1">
           <span className="text-danger fw-bold">*</span> Apakah membutuhkan approval untuk ke stage selanjutnya ? 
          </label>
          <select
            name="is_validate"
            id=""
            onChange={handleInput}
            className={`form-select ${error ? 'is-invalid' :''}`}
          >
            <option value="">Select Choose</option>
            <option value="yes">Iya</option>
            <option value="no">Tidak</option>
          </select>
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      <div className=" mt-2">
        <button className="btn btn-primary me-2" onClick={handleUpdate}>
          Update
        </button>
        <button className="btn btn-secondary">Kembali</button>
      </div>
    </Card.Body>
  );
};

export default EditFdc;
