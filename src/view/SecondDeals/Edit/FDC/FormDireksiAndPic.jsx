import { faIdCardClip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const FormDireksiAndPic = ({ handleInput }) => {
  return (
    <div>
      <div class="alert alert-primary mt-2" role="alert">
        <h6 style={{ fontWeight: "700" }}>
          <FontAwesomeIcon icon={faIdCardClip} className="me-2" /> Data Direksi
          dan PIC
        </h6>
      </div>
      <div>
        <h6 className="fw-semibold">
          Direktur RS
          <span className="text-danger fw-bold fs-5">*</span>
        </h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="direktur_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="no_telp_direktur"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email_direktur"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">
          Wakil direktur
          <span className="text-danger fw-bold fs-5">*</span>
        </h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="wadik_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="wadik_no_telp"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="email"
                name="wadik_email"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">
          Penanggung jawab operasional
          <span className="text-danger fw-bold fs-5">*</span>
        </h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="pj_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="pj_no_telp"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="pj_email"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">
          Kepala Rumah Sakit
          <span className="text-danger fw-bold fs-5">*</span>
        </h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="kprs_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="kprs_no_telp"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="email"
                name="kprs_email"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">
          Kepala Ruang
          <span className="text-danger fw-bold fs-5">*</span>
        </h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="kr_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="kr_no_telp"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="kr_email"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">
          Kepala perawat HD
          <span className="text-danger fw-bold fs-5">*</span>
        </h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="kp_hd"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="kp_no_telp"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="kp_email"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">
          Dokter SpPD
          <span className="text-danger fw-bold fs-5">*</span>
        </h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="dokter_sppd_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="dokter_sppd_notelp"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="dokter_sppd_email"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">
          Dokter Kgh
          <span className="text-danger fw-bold fs-5">*</span>
        </h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="dokter_kgh_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                onBlur={handleInput}
                name="dokter_kgh_no_telp"
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="email"
                name="dokter_kgh_email"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">
          Dokter umum HD
          <span className="text-danger fw-bold fs-5">*</span>
        </h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="du_hd_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="du_no_telp"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="du_email"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">
          Finance AP
          <span className="text-danger fw-bold fs-5">*</span>
        </h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="finance_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="finance_no_telp"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="finance_email"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">
          Accounting & tax
          <span className="text-danger fw-bold fs-5">*</span>
        </h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="acc_tax_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="acc_tax_telp"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="acc_tax_email"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">
          Purchasing
          <span className="text-danger fw-bold fs-5">*</span>
        </h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="purchase_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="purchase_no_telp"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="email"
                name="purchase_email"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">
          Logistik
          <span className="text-danger fw-bold fs-5">*</span>
        </h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="logistik_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="logistik_no_telp"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="email"
                name="logistik_email"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">Teknisi</h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="teknisi_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="teknisi_no_telp"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="teknisi_email"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 className="fw-semibold">Klinikal</h6>
        <div className="row">
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="klinik_name"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nama</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="klinik_name_no_telp"
                onBlur={handleInput}
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">No. Telepon</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="email"
                name="klinik_name_email"
                placeholder="Input in here"
                onBlur={handleInput}
                className="form-control"
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDireksiAndPic;
