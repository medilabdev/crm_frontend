import React, { useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import BreadCrumbCreate from "./breadcrumb";
import { Card, FloatingLabel, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import TobButton from "./TobButton";

const CreateSecondDeals = () => {
  const [showFQP, setShowFQP] = useState(false);
  const handleSelectFQP = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value === "yes") {
      setShowFQP(true);
    } else {
      setShowFQP(false);
    }
  };
  return (
    <div id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <BreadCrumbCreate />
          <TobButton />
          <Card className="shadow-sm">
            <Card.Header className="text-center">
              <h4 className="mt-2" style={{ fontWeight: 700 }}>
                Create Data
              </h4>
            </Card.Header>
            <Card.Body>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  placeholder="Input in here"
                  className="form-control"
                  required
                />
                <label htmlFor="">Deals Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  placeholder="Input in Here"
                  className="form-control"
                />
                <label htmlFor="">Deal Size</label>
              </div>
              <div className="mb-3">
                <label htmlFor="" className="mb-3">
                  Ingin Melanjutkan Pengisian Form FQP ?
                </label>
                <select
                  name=""
                  id="SelectFQP"
                  className="form-control"
                  onChange={handleSelectFQP}
                >
                  <option value="">Select Choose</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {showFQP && (
                <>
                  <div class="alert alert-primary mt-2" role="alert">
                    <h6 style={{ fontWeight: "700" }}>Data Dasar Informasi</h6>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      placeholder="Input in here"
                      className="form-control"
                    />
                    <label htmlFor="floatingInput">
                      Nama Rumah Sakit / Klinik
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Input in here"
                    />
                    <label htmlFor="floatingInput">
                      Nama Kepala Ruangan HD
                    </label>
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
                    <ReactQuill className="p-2" theme="snow" />
                  </div>
                  <div className="mb-2">
                    <h6 className="fw-bold ms-2 mt-3">Neutrals</h6>
                    <ReactQuill className="p-2" theme="snow" />
                  </div>
                  <div className="mb-2">
                    <h6 className="fw-bold ms-2 mt-3">Detractors</h6>
                    <ReactQuill className="p-2" theme="snow" />
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
                        <label htmlFor="floatingInput">
                          Masa kontrak berakhir
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
                        <label htmlFor="floatingInput">
                          Harga BHP existing
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
                          Masa berlaku Izin HD
                        </label>
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
                    <h6 className="ms-2 mt-3">
                      Faskes HD 5 km sekitar New Unit
                    </h6>
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
                </>
              )}
            </Card.Body>
            <Card.Footer>
              <div className="float-end mt-2">
                <button className="btn btn-primary me-2">Simpan</button>
                <button className="btn btn-secondary">Kembali</button>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Main>
    </div>
  );
};

export default CreateSecondDeals;