import React, { useState } from "react";
import FormDireksiAndPic from "../FDC/FormDireksiAndPic";
import FormDataBank from "../FDC/FormDataBank";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faEnvelopesBulk,
  faFolderPlus,
  faPercent,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import EditFormDataBank from "../FDC/EditFormDataBank";

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

  const handleInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (e, index, fieldName) => {
    const { value } = e.target;
    setInputBank((prev) => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [fieldName]: value };
      return newData;
    });
  };

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
        formData.append("direksi[0][name]", inputData.direktur_name || "");
        formData.append("direksi[0][position]", "Direktur");
        formData.append("direksi[0][email]", inputData.email_direktur || "");
        formData.append(
          "direksi[0][phone_number]",
          inputData.no_telp_direktur || ""
        );
        formData.append("direksi[1][name]", inputData.wadik_name || "");
        formData.append("direksi[1][position]", "Wakil Direktur");
        formData.append("direksi[1][email]", inputData.wadik_email || "");
        formData.append(
          "direksi[1][phone_number]",
          inputData.wadik_no_telp || ""
        );
        formData.append("direksi[2][name]", inputData.pj_name || "");
        formData.append("direksi[2][position]", "Penanggung jawab operasional");
        formData.append("direksi[2][email]", inputData.pj_email || "");
        formData.append("direksi[2][phone_number]", inputData.pj_no_telp || "");
        formData.append("direksi[3][name]", inputData.kprs_name || "");
        formData.append("direksi[3][position]", "Kepala Rumah Sakit");
        formData.append("direksi[3][email]", inputData.kprs_email || "");
        formData.append(
          "direksi[3][phone_number]",
          inputData.kprs_no_telp || ""
        );
        formData.append("direksi[4][name]", inputData.kr_name || "");
        formData.append("direksi[4][position]", "Kepala Ruang");
        formData.append("direksi[4][email]", inputData.kr_email || "");
        formData.append("direksi[4][phone_number]", inputData.kr_no_telp || "");
        formData.append("direksi[5][name]", inputData.kp_hd || "");
        formData.append("direksi[5][position]", "Kepala perawat HD");
        formData.append("direksi[5][email]", inputData.kp_email || "");
        formData.append("direksi[5][phone_number]", inputData.kp_no_telp || "");
        formData.append("direksi[6][name]", inputData.dokter_sppd_name || "");
        formData.append("direksi[6][position]", "Dokter SpPD");
        formData.append("direksi[6][email]", inputData.dokter_sppd_email || "");
        formData.append(
          "direksi[6][phone_number]",
          inputData.dokter_sppd_notelp || ""
        );
        formData.append("direksi[7][name]", inputData.dokter_kgh_name || "");
        formData.append("direksi[7][position]", "Dokter Kgh");
        formData.append("direksi[7][email]", inputData.dokter_kgh_email || "");
        formData.append(
          "direksi[7][phone_number]",
          inputData.dokter_kgh_no_telp || ""
        );
        formData.append("direksi[8][name]", inputData.du_hd_name || "");
        formData.append("direksi[8][position]", "Dokter umum HD");
        formData.append("direksi[8][email]", inputData.du_email || "");
        formData.append("direksi[8][phone_number]", inputData.du_no_telp || "");
        formData.append("direksi[9][name]", inputData.finance_name || "");
        formData.append("direksi[9][position]", "Finance AP");
        formData.append("direksi[9][email]", inputData.finance_email || "");
        formData.append(
          "direksi[9][phone_number]",
          inputData.finance_no_telp || ""
        );
        formData.append("direksi[10][name]", inputData.acc_tax_name || "");
        formData.append("direksi[10][position]", "Accounting & tax");
        formData.append("direksi[10][email]", inputData.acc_tax_email || "");
        formData.append(
          "direksi[10][phone_number]",
          inputData.acc_tax_telp || ""
        );
        formData.append("direksi[11][name]", inputData.purchase_name || "");
        formData.append("direksi[11][position]", "Purchasing");
        formData.append("direksi[11][email]", inputData.purchase_email || "");
        formData.append(
          "direksi[11][phone_number]",
          inputData.purchase_no_telp || ""
        );
        formData.append("direksi[12][name]", inputData.logistik_name || "");
        formData.append("direksi[12][position]", "Logistik");
        formData.append("direksi[12][email]", inputData.logistik_email || "");
        formData.append(
          "direksi[12][phone_number]",
          inputData.logistik_no_telp || ""
        );
        formData.append("direksi[13][name]", inputData.teknisi_name || "");
        formData.append("direksi[13][position]", "Teknisi");
        formData.append("direksi[13][email]", inputData.teknisi_email || "");
        formData.append(
          "direksi[13][phone_number]",
          inputData.teknisi_no_telp || ""
        );
        formData.append("direksi[14][name]", inputData.klinik_name || "");
        formData.append("direksi[14][position]", "Klinikal");
        formData.append(
          "direksi[14][email]",
          inputData.klinik_name_email || ""
        );
        formData.append(
          "direksi[14][phone_number]",
          inputData.klinik_name_no_telp || ""
        );
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
        value={data?.fqp_document?.hospital?.name  + " ( " + data?.fqp_document?.hospital?.company_type?.name + " ) " }
        id=""
      />
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="floatingInput">Nama Pemilik Perusahaan</label>
          <input
            type="text"
            className="form-control"
            name="owner_company"
            onChange={handleInput}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="floatingInput">Didirikan Sejak Tahun</label>
          <input
            type="text"
            className="form-control"
            name="founded_year_at"
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
            onChange={handleInput}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="floatingInput">Alamat Situs</label>
          <input
            type="text"
            className="form-control"
            name="website"
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
          onChange={handleInput}
          className="form-control"
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
          className="form-control"
          onChange={handleInput}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="">
          Alamat Lain perusahaan (Apabila alamat : Perusahaan berbeda dengan
          yang tersebut Diatas)
        </label>
        <textarea
          name="other_company_address"
          onChange={handleInput}
          id=""
          cols="15"
          rows="5"
          className="form-control"
        ></textarea>
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
          onChange={handleInput}
          placeholder="Input in here"
          className="form-control"
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
          onChange={handleInput}
          className="form-control"
        />
        <label htmlFor="floatingInput">Nomor Serial Faktur Pajak</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          placeholder="Input in here"
          className="form-control"
          name="pkp_number"
          onChange={handleInput}
        />
        <label htmlFor="floatingInput">Nomor Surat Pengukuhan PKP</label>
      </div>
        <FormDireksiAndPic handleInput={handleInput} />
        <FormDataBank handleInputChange={handleInputChange} />

      <div class="alert alert-primary mt-2" role="alert">
        <h6 style={{ fontWeight: "700" }}>
          <FontAwesomeIcon icon={faFolderPlus} className="me-2" /> Dokumen yang
          harus dilengkapi
        </h6>
      </div>
      <div className="mb-3">
        <label htmlFor="" className="fw-semibold mt-3 fs-6 mb-1">
          KTP Penanggung Jawab
        </label>
        <input
          type="file"
          name=""
          onChange={(e) => {
            const file = e.target.files[0];
            setFileKtp(file);
          }}
          className="form-control"
          id=""
        />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="fw-semibold mt-3 fs-6 mb-1">
          Kartu NPWP
        </label>
        <input
          type="file"
          name=""
          className="form-control"
          id=""
          onChange={(e) => {
            const file = e.target.files[0];
            setFileNpwp(file);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="fw-semibold mt-3 fs-6 mb-1">
          Surat Pengukuhan Pengusaha Kena Pajak (SPPKP)
        </label>
        <input
          type="file"
          name=""
          className="form-control"
          id=""
          onChange={(e) => {
            const file = e.target.files[0];
            setSppkp(file);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="fw-semibold mt-3 fs-6 mb-1">
          Tanda Daftar Perusahaan
        </label>
        <input
          type="file"
          name=""
          className="form-control"
          id=""
          onChange={(e) => {
            const file = e.target.files[0];
            setTandaDaftarPerusahaan(file);
          }}
        />
      </div>
      <div className="mb-3">
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
        <label htmlFor="" className="fw-semibold mt-3 fs-6 mb-1">
          Surat keterangan Domisili Usaha (SIUP)
        </label>
        <input
          type="file"
          name=""
          className="form-control"
          id=""
          onChange={(e) => {
            const file = e.target.files[0];
            setSiup(file);
          }}
        />
      </div>
      <div className="mb-3">
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
