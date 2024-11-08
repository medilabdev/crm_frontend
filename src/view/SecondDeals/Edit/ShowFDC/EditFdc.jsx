import {
  faBuilding,
  faEnvelopesBulk,
  faFolderPlus,
  faPercent,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
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
        formData.append("ktp_file", fileKtp || "");
        formData.append("npwp_file", fileNpwp || "");
        formData.append("sppkp_file", sppkp || "");
        formData.append("siup_file", siup || "");
        formData.append("kso_file", kso || "");
        formData.append(
          "company_registration_file",
          tandaDaftarPerusahaan || ""
        );
        formData.append("business_license_file", izinDagang || "");
        formData.append('is_validate', editData.is_validate)
        // for (const pair of formData.entries()) {
        //   console.log(pair[0] + ": " + pair[1]);
        // }
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
      <div class="alert alert-primary mt-2" role="alert">
        <h6 style={{ fontWeight: "700" }}>
          <FontAwesomeIcon icon={faBuilding} className="me-2" /> Informasi
          perusahaan
        </h6>
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
      <div class="alert alert-primary mt-2" role="alert">
        <h6 style={{ fontWeight: "700" }}>
          <FontAwesomeIcon icon={faPercent} className="me-2" /> Data Pajak
        </h6>
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
      <div class="alert alert-primary mt-2" role="alert">
        <h6 style={{ fontWeight: "700" }}>
          <FontAwesomeIcon icon={faFolderPlus} className="me-2" /> Dokumen yang
          harus dilengkapi
        </h6>
      </div>
      <div className="mb-3">
        {editData?.ktp_file ? (
          <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
                KTP Penanggung Jawab
              </td>
              <td className="px-1">:</td>
              <td>
                <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${editData.ktp_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {editData?.ktp_file || "-"}
                </a>
              </td>
            </tr>
          </table>
        ) : (
          ""
        )}
        <label htmlFor="" className="fw-semibold mt-3 fs-6 mb-1">
          KTP Penanggung Jawab
        </label>
        <input
          type="file"
          name=""
          className="form-control"
          onChange={(e) => {
            const file = e.target.files[0];
            setFileKtp(file);
          }}
        />
      </div>
      <div className="mb-3">
        {editData?.npwp_file ? (
          <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>Kartu NPWP</td>
              <td className="px-1">:</td>
              <td>
                <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${editData.npwp_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {editData?.npwp_file || "-"}
                </a>
              </td>
            </tr>
          </table>
        ) : (
          ""
        )}
        <label htmlFor="" className="fw-semibold mt-3 fs-6 mb-1">
          Kartu NPWP
        </label>
        <input
          type="file"
          name=""
          className="form-control"
          onChange={(e) => {
            const file = e.target.files[0];
            setFileNpwp(file);
          }}
        />
      </div>
      <div className="mb-3">
        {editData?.npwp_file ? (
          <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
                Surat Pengukuhan Pengusaha Kena Pajak (SPPKP)
              </td>
              <td className="px-1">:</td>
              <td>
                <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${editData.sppkp_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {editData?.sppkp_file || "-"}
                </a>
              </td>
            </tr>
          </table>
        ) : (
          ""
        )}
        <label htmlFor="" className="fw-semibold mt-3 fs-6 mb-1">
          Surat Pengukuhan Pengusaha Kena Pajak (SPPKP)
        </label>
        <input
          type="file"
          name=""
          className="form-control"
          onChange={(e) => {
            const file = e.target.files[0];
            setSppkp(file);
          }}
        />
      </div>
      <div className="mb-3">
        {editData?.company_registration_file ? (
          <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
                Tanda Daftar Perusahaan
              </td>
              <td className="px-1">:</td>
              <td>
                <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${editData.company_registration_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {editData?.company_registration_file || "-"}
                </a>
              </td>
            </tr>
          </table>
        ) : (
          ""
        )}
        <label htmlFor="" className="fw-semibold mt-3 fs-6 mb-1">
          Tanda Daftar Perusahaan
        </label>
        <input
          type="file"
          name=""
          className="form-control"
          onChange={(e) => {
            const file = e.target.files[0];
            setTandaDaftarPerusahaan(file);
          }}
        />
      </div>
      <div className="mb-3">
        {editData?.business_license_file ? (
          <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
                Surat Izin Usaha Perdagangan
              </td>
              <td className="px-1">:</td>
              <td>
                <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${editData?.business_license_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {editData?.business_license_file || "-"}
                </a>
              </td>
            </tr>
          </table>
        ) : (
          ""
        )}
        <label htmlFor="" className="fw-semibold mt-3 fs-6 mb-1">
          Surat Izin Usaha Perdagangan
        </label>
        <input
          type="file"
          name=""
          className="form-control"
          id=""
          onChange={(e) => {
            const file = e.target.files[0];
            setIzinDagang(file);
          }}
        />
      </div>
      <div className="mb-3">
        {editData?.siup_file ? (
          <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
                Surat keterangan Domisili Usaha (SIUP)
              </td>
              <td className="px-1">:</td>
              <td>
                <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${editData.siup_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {editData?.siup_file || "-"}
                </a>
              </td>
            </tr>
          </table>
        ) : (
          ""
        )}
        <label htmlFor="" className="fw-semibold mt-3 fs-6 mb-1">
          Surat keterangan Domisili Usaha (SIUP)
        </label>
        <input
          type="file"
          name=""
          className="form-control"
          onChange={(e) => {
            const file = e.target.files[0];
            setSiup(file);
          }}
        />
      </div>
      <div className="mb-3">
        {editData?.kso_file ? (
          <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
                Tanda Tangan Kontrak Kerja Sama (KSO)
              </td>
              <td className="px-1">:</td>
              <td>
                <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/fdc/${editData.kso_file}`}
                  target="_blank"
                  style={{
                    whiteSpace: "normal",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {editData?.kso_file || "-"}
                </a>
              </td>
            </tr>
          </table>
        ) : (
          ""
        )}
        <label htmlFor="" className="fw-semibold mt-3 fs-6 mb-1">
          Tanda Tangan Kontrak Kerja Sama (KSO)
        </label>
        <input
          type="file"
          name=""
          className="form-control"
          id=""
          onChange={(e) => {
            const file = e.target.files[0];
            setKso(file);
          }}
        />
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
