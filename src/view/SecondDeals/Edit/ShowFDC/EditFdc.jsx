import {
  faBuilding,
  faEnvelopesBulk,
  faFolderPlus,
  faPercent,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card } from "react-bootstrap";

const EditFdc = ({ data }) => {
  const [editData, setEditData] = useState(data?.fdc_document);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
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
        value={data?.lpp_document?.customer?.name}
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
        >{editData?.other_company_address || ""}</textarea>
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
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/${editData.ktp_file}`}
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
        <input type="file" name="" className="form-control" id="" />
      </div>
      <div className="mb-3">
      {editData?.npwp_file ? (
          <table className="mt-3">
            <tr className="fw-medium">
              <td style={{ width: "150px", fontSize: "0.9rem" }}>
              Kartu NPWP
              </td>
              <td className="px-1">:</td>
              <td>
                <a
                  className="btn btn-primary"
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/${editData.npwp_file}`}
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
        <input type="file" name="" className="form-control" id="" />
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
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/${editData.sppkp_file}`}
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
        <input type="file" name="" className="form-control" id="" />
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
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/${editData.company_registration_file}`}
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
        <input type="file" name="" className="form-control" id="" />
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
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/${editData.business_license_file}`}
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
        <input type="file" name="" className="form-control" id="" />
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
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/${editData.siup_file}`}
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
        <input type="file" name="" className="form-control" id="" />
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
                  href={`https://api-crm-iss.medilabjakarta.id/storage/file/deals/${editData.kso_file}`}
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
        <input type="file" name="" className="form-control" id="" />
      </div>
      <div className=" mt-2">
        <button className="btn btn-primary me-2">Simpan</button>
        <button className="btn btn-secondary">Kembali</button>
      </div>
    </Card.Body>
  );
};

export default EditFdc;
