import React, { useState } from "react";
import { Card } from "react-bootstrap";
import DataTableRab from "./Lpp/Rab";
import DataTableFeeAction from "./Lpp/FeeAction";
import DataTableRekapBiaya from "./Lpp/RekapBiaya";
import ReactQuill from "react-quill";
import Timeline from "./Lpp/Timeline";
import SupportKerjaSama from "./Lpp/SupportKerjaSama";

const LPP = ({}) => {
  const [jenisKerjasama, setJenisKerjaSama] = useState();
  const [Rab, setRab] = useState();
  const [feeAction, setFeeAction] = useState();
  const [supportKerjaSama, setSupportKerjaSama] = useState()
  const [statusKerjaSama, setStatusKerjaSama] = useState();
  const handleChangeJenisKerjaSama = (e) => {
    const target = e.target.value;
    setJenisKerjaSama(target);
  };

  const handleRab = (e) => {
    const target = e.target.value;
    setRab(target);
  };
  const handleFeeAction = (e) => {
    const target = e.target.value;
    setFeeAction(target);
  };
  const HandleStatusJenisKerjaSama = (e) => {
    const target = e.target.value;
    setStatusKerjaSama(target);
  };
  const handleSupportKerjaSama = (e) => {
    const target = e.target.value; 
    setSupportKerjaSama(target)
  }
  return (
    <div id="LPP">
      <div className="col-12">
        <Card>
          <Card.Header>
            <p className="fs-5 fw-semibold">Lembar Persetujuan Project</p>
          </Card.Header>
          <Card.Body>
            <div class="alert alert-primary mt-2" role="alert">
              <h6 style={{ fontWeight: "700" }}>Customer</h6>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                name=""
                id=""
                className="form-control"
                placeholder=""
              />
              <label htmlFor="">Name Customer</label>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-1">
                Badan Usaha
              </label>
              <select name="" id="" className="form-select">
                <option value="">Select Chose</option>
                <option value="faskes">Faskes</option>
                <option value="distributor">Distributor</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-1">
                Tipe Faskes
              </label>
              <select name="" id="" className="form-select">
                <option value="">Select Chose</option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                name=""
                id=""
                className="form-control"
                placeholder=""
              />
              <label htmlFor="">Regional BPJS</label>
            </div>
            <div class="alert alert-primary mt-2" role="alert">
              <h6 style={{ fontWeight: "700" }}>Jenis Kerjasama</h6>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-1 fw-semibold">
                Jenis Kerjasama
              </label>
              <select
                name=""
                id=""
                className="form-select"
                onChange={handleChangeJenisKerjaSama}
              >
                <option value="">Select Chose</option>
                <option value="RevenueSharing">Revenue Sharing</option>
                <option value="JualPutus">Jual Putus</option>
                <option value="KSO">KSO</option>
              </select>
            </div>
            {jenisKerjasama === "RevenueSharing" ? (
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name=""
                  id=""
                  className="form-control"
                  placeholder=""
                />
                <label htmlFor="">Revenue Sharing</label>
              </div>
            ) : jenisKerjasama === "JualPutus" ? (
              <div className="mb-3">
                <label htmlFor="" className="mb-1">
                  Jual Putus
                </label>
                <select name="" id="" className="form-select">
                  <option value="">Select Chose</option>
                  <option value="bhp">BHP</option>
                  <option value="mesin">Mesin</option>
                </select>
              </div>
            ) : jenisKerjasama === "KSO" ? (
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name=""
                  id=""
                  className="form-control"
                  placeholder=""
                />
                <label htmlFor="">KSO</label>
              </div>
            ) : (
              ""
            )}
            <div className="mb-3">
              <label htmlFor="">Status</label>
              <select
                name=""
                id=""
                className="form-select"
                onChange={HandleStatusJenisKerjaSama}
              >
                <option value="">Select Chose</option>
                <option value="replace">Replace</option>
                <option value="new_hd">New HD</option>
                <option value="expand">Expand</option>
              </select>
            </div>
            <div class="alert alert-primary mt-2" role="alert">
              <h6 style={{ fontWeight: "700" }}>Term Kerjasama</h6>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                name=""
                id=""
                className="form-control"
                placeholder=""
              />
              <label htmlFor="">Jangka Waktu Kerjasama</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                name=""
                id=""
                className="form-control"
                placeholder=""
              />
              <label htmlFor="">Harga</label>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-1">
                Pemakaian BHP
              </label>
              <select name="" id="" className="form-select">
                <option value="">Select Chose</option>
                <option value="">Single</option>
                <option value="">Reuse</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-1">
                PPN 11% ditanggung ?
              </label>
              <select name="" id="" className="form-select">
                <option value="">Select Chose</option>
                <option value="">Customer</option>
                <option value="">PT ISS</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-1">
                Ongkir ?
              </label>
              <select name="" id="" className="form-select">
                <option value="">Select Chose</option>
                <option value="">Customer</option>
                <option value="">PT ISS</option>
              </select>
            </div>
            <div class="alert alert-primary mt-2" role="alert">
              <h6 style={{ fontWeight: "700" }}>Peralatan</h6>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                name=""
                id=""
                className="form-control"
                placeholder=""
              />
              <label htmlFor="">RO</label>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    name=""
                    id=""
                    className="form-control"
                    placeholder=""
                  />
                  <label htmlFor="">Operate MKHD 1</label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    name=""
                    id=""
                    className="form-control"
                    placeholder=""
                  />
                  <label htmlFor="">Operate MKHD 2</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    name=""
                    id=""
                    className="form-control"
                    placeholder=""
                  />
                  <label htmlFor="">Back Up MKHD 1</label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    name=""
                    id=""
                    className="form-control"
                    placeholder=""
                  />
                  <label htmlFor="">Back Up MKHD 2</label>
                </div>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                name=""
                id=""
                className="form-control"
                placeholder=""
              />
              <label htmlFor="">Total Mesin</label>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    name=""
                    id=""
                    className="form-control"
                    placeholder=""
                  />
                  <label htmlFor="">Kirim Tahap 1 (qty)</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="">Tanggal Pengiriman</label>
                  <input type="date" name="" id="" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    name=""
                    id=""
                    className="form-control"
                    placeholder=""
                  />
                  <label htmlFor="">Kirim Tahap 2 (qty)</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="">Tanggal Pengiriman</label>
                  <input type="date" name="" id="" className="form-control" />
                </div>
              </div>
            </div>
            <div class="alert alert-primary mt-2" role="alert">
              <h6 style={{ fontWeight: "700" }}>Target</h6>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="">Tindakan</label>
                <select name="" id="" className="form-select">
                  <option value="">Select Chose</option>
                  <option value="">Mesin</option>
                  <option value="">Bulan</option>
                </select>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    name=""
                    id=""
                    className="form-control"
                    placeholder=""
                  />
                  <label htmlFor="">Tindakan</label>
                </div>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                name=""
                id=""
                className="form-control"
                placeholder=""
              />
              <label htmlFor="">Tindakan Selama Bekerja Sama</label>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-1 fw-bold">
                RAB Bangunan & Lainnya terkait pembiayaan awal (Optional)
              </label>
              <select
                name=""
                id=""
                className="form-select"
                onChange={handleRab}
              >
                <option value="">Select Chose</option>
                <option value="yes">Ya</option>
                <option value="no">Tidak</option>
              </select>
            </div>
            {Rab === "yes" ? <DataTableRab /> : ""}
            <div className="mb-3">
              <label htmlFor="" className="mb-1 fw-bold">
                Support Selama Kerja Sama (Optional)
              </label>
              <select
                name=""
                id=""
                className="form-select"
                onChange={handleSupportKerjaSama}
              >
                <option value="">Select Chose</option>
                <option value="yes">Ya</option>
                <option value="no">Tidak</option>
              </select>
            </div>
            {supportKerjaSama === "yes" ? <SupportKerjaSama /> : ""}
            <div className="mb-3">
              <label htmlFor="" className="mb-1 fw-bold">
                Fee Tindakan (Optional)
              </label>
              <select
                name=""
                id=""
                className="form-select"
                onChange={handleFeeAction}
              >
                <option value="">Select Chose</option>
                <option value="yes">Ya</option>
                <option value="no">Tidak</option>
              </select>
            </div>
            {feeAction === "yes" ? <DataTableFeeAction /> : ""}
            <div className="mb-3">
              <DataTableRekapBiaya />
            </div>
            <div className="mb-2">
              <h6 className="fw-bold ms-2 mt-3">Catatan Tambahan</h6>
              <ReactQuill className="p-2" theme="snow" />
            </div>
            <Timeline statusKerjaSama={statusKerjaSama} />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LPP;
