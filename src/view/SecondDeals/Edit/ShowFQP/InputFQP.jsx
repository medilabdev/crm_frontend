import React from 'react'
import { Card } from 'react-bootstrap'
import ReactQuill from 'react-quill'

const InputFQP = () => {
  return (
    <Card.Body>
    <div class="alert alert-primary mt-2" role="alert">
      <h6 style={{ fontWeight: "700" }}>Data Dasar Informasi</h6>
    </div>
    <div className="form-floating mb-3">
      <input
        type="text"
        placeholder="Input in here"
        className="form-control"
      />
      <label htmlFor="floatingInput">Nama Rumah Sakit / Klinik</label>
    </div>
    <div className="form-floating mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Input in here"
      />
      <label htmlFor="floatingInput">Nama Kepala Ruangan HD</label>
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="form-floating mb-3">
          <input
            type="text"
            name=""
            id=""
            placeholder="Input in here"
            className="form-control"
          />
          <label htmlFor="floatingInput">
            Nama Dokter Umum / Pelaksana HD
          </label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating mb-3">
          <input
            type="text"
            name=""
            id=""
            placeholder="Input in here"
            className="form-control"
          />
          <label htmlFor="floatingInput">
            Nama Dokter Konsulen / SpPD KGH
          </label>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="form-floating mb-3">
          <input
            type="number"
            name=""
            id=""
            placeholder="Input in here"
            className="form-control"
          />
          <label htmlFor="floatingInput">
            No.Telp Perawat / Dokter
          </label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating mb-3">
          <input
            type="number"
            name=""
            id=""
            placeholder="Input in here"
            className="form-control"
          />
          <label htmlFor="floatingInput">
            No.Telp Pengadaan / Manajemen
          </label>
        </div>
      </div>
    </div>
    <div class="alert alert-primary mt-4" role="alert">
      <h6 style={{ fontWeight: "700" }}>NPS Customer</h6>
    </div>
    <div className="mb-2">
      <h6 className="fw-bold ms-2 mt-3">Promoters</h6>
      <input
        type="text"
        name=""
        id=""
        placeholder="Nama/Jabatan"
        className="form-control mb-2"
      />
      <input
        type="text"
        name=""
        id=""
        className="form-control mb-2"
      />
      <input
        type="text"
        name=""
        id=""
        className="form-control mb-2"
      />
    </div>
    <div className="mb-2">
      <h6 className="fw-bold ms-2 mt-3">Neutrals</h6>
      <input
        type="text"
        name=""
        id=""
        className="form-control mb-2"
      />
      <input
        type="text"
        name=""
        id=""
        className="form-control mb-2"
      />
      <input
        type="text"
        name=""
        id=""
        className="form-control mb-2"
      />
    </div>
    <div className="mb-2">
      <h6 className="fw-bold ms-2 mt-3">Detractors</h6>
      <input
        type="text"
        name=""
        id=""
        className="form-control mb-2"
      />
      <input
        type="text"
        name=""
        id=""
        className="form-control mb-2"
      />
      <input
        type="text"
        name=""
        id=""
        className="form-control mb-2"
      />
    </div>
    <div class="alert alert-primary mt-4" role="alert">
      <h6 style={{ fontWeight: "700" }}>Existing Unit</h6>
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="form-floating mb-3">
          <input
            type="text"
            name=""
            className="form-control"
            placeholder=""
            id=""
          />
          <label htmlFor="floatingInput">Existing vendor</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating mb-3">
          <input
            type="text"
            name=""
            className="form-control"
            placeholder=""
            id=""
          />
          <label htmlFor="floatingInput">Jumlah Unit Mesin</label>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="form-floating mb-3">
          <input
            type="text"
            name=""
            className="form-control"
            placeholder=""
            id=""
          />
          <label htmlFor="floatingInput">
            Total rata-rata tindakan per 6 bulan terakhir
          </label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating mb-3">
          <input
            type="text"
            name=""
            className="form-control"
            placeholder=""
            id=""
          />
          <label htmlFor="floatingInput">
            Jumlah pasien existing
          </label>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="form-floating mb-3">
          <input
            type="text"
            name=""
            className="form-control"
            placeholder=""
            id=""
          />
          <label htmlFor="floatingInput">Masa kontrak berakhir</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating mb-3">
          <input
            type="text"
            name=""
            className="form-control"
            placeholder=""
            id=""
          />
          <label htmlFor="floatingInput">Replace/ Expand</label>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="form-floating mb-3">
          <input
            type="text"
            name=""
            className="form-control"
            placeholder=""
            id=""
          />
          <label htmlFor="floatingInput">Harga BHP existing</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating mb-3">
          <input
            type="text"
            name=""
            className="form-control"
            placeholder=""
            id=""
          />
          <label htmlFor="floatingInput">Masa berlaku Izin HD</label>
        </div>
      </div>
    </div>
    <div className="mb-3">
      <label htmlFor="" className="mb-1">
        Apakah Bekerjasama Dengan BPJS
      </label>
      <select name="" id="" className="form-select">
        <option value="">Select Choose</option>
        <option value="">Ya</option>
        <option value="">Tidak</option>
      </select>
    </div>
    <div className="mb-3">
      <label htmlFor="">Jumlah Sarana Unit</label>
      <input type="text" className="form-control" />
    </div>
    <div class="alert alert-primary mt-4" role="alert">
      <h6 style={{ fontWeight: "700" }}>New Unit</h6>
    </div>
    <div className="form-floating mb-3">
      <input
        type="text"
        name=""
        placeholder=""
        id=""
        className="form-control"
      />
      <label htmlFor="">Jumlah Unit</label>
    </div>
    <div className="mb-3">
      <label htmlFor="" className="mb-1">
        Sistem Kerja Sama
      </label>
      <select name="" id="" className="form-select">
        <option value="">Select Choose</option>
      </select>
    </div>
    <div className="mb-3">
      <label htmlFor="" className="mb-1">
        SDM
      </label>
      <select name="" id="" className="form-select">
        <option value="">Select Choose</option>
      </select>
    </div>
    <div className="mb-2">
      <h6 className="ms-2 mt-3">Faskes HD 5 km sekitar New Unit</h6>
      <ReactQuill className="p-2" theme="snow" />
    </div>
    <div className="mb-2">
      <h6 className="ms-2 mt-3">
        Kapasitas Faskes HD Sekitar New Unit
      </h6>
      <ReactQuill className="p-2" theme="snow" />
    </div>
    <div class="alert alert-primary mt-4" role="alert">
      <h6 style={{ fontWeight: "700" }}>Other Information</h6>
    </div>
    <div className="form-floating mb-3">
      <input
        type="number"
        name=""
        id=""
        className="form-control"
        placeholder=""
      />
      <label htmlFor="">
        Jumlah unit HD kurang dari 20 km faskes
      </label>
    </div>
    <div className="form-floating mb-3">
      <input
        type="number"
        name=""
        id=""
        className="form-control"
        placeholder=""
      />
      <label htmlFor="">Jumlah mesin unit HD sekitar</label>
    </div>
    <div className="col">
      <button type="submit" className="btn btn-primary me-2">
        Save Changes
      </button>
      <a href="/deals-second" className="btn btn-secondary">
        Back
      </a>
    </div>
  </Card.Body>
  )
}

export default InputFQP