import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import BreadCrumbCreate from "./breadcrumb";
import { Card, FloatingLabel, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import TobButton from "./TobButton";
import Select from "react-select";
import OverlayAddCompany from "../../../components/Overlay/addCompany";
import { useDispatch, useSelector } from "react-redux";
import { getListCompany } from "../../../action/FormCompany";
import axios from "axios";
import Swal from "sweetalert2";

const CreateSecondDeals = () => {
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");
  const [showOverlay, setShowOverlay] = useState(false);
  const handleShow = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);
  const [buttonBlocked, setButtonBlocked] = useState(false);
  const [inputData, setInputData] = useState([]);
  const handleInputData = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const { listResult, listLoading, listError } = useSelector(
    (state) => state.FormCompany
  );
  const selectCompany = () => {
    const result = [];
    if (Array.isArray(listResult)) {
      listResult.map((data) => {
        const finalResult = {
          label: `${data.name}`,
          value: data.uid,
        };
        result.push(finalResult);
      });
    } else {
      console.error("listResult is not an array or is not yet initialized.");
    }
    return result;
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListCompany(token));
  }, [dispatch]);

  const [inputValue, setInputValue] = useState("");
  const [inputNps, setInputNps] = useState({
    promoters: ["", "", ""],
    neutrals: ["", "", ""],
    detractors: ["", "", ""],
  });
  const handleInputDataRP = (event) => {
    const rawValue = event.target.value;
    const formattedValue = formatCurrency(rawValue);
    setInputValue(formattedValue);
  };

  const formatCurrency = (value) => {
    const sanitizedValue = value.replace(/[^\d]/g, "");
    const formattedValue = Number(sanitizedValue).toLocaleString("id-ID");

    return formattedValue;
  };
  const handleInputNps = (e) => {
    const { name, value } = e.target;
    const [field, index] = name.split("[");
    const fieldArray = field.slice(0, -1);
    const updatedInputData = { ...inputNps };
    if (!updatedInputData[fieldArray]) {
      updatedInputData[fieldArray] = ["", "", ""];
    }
    updatedInputData[fieldArray][index.slice(0, -1)] = value;
    setInputNps(updatedInputData);
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
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
        const formData = new FormData();
        formData.append("owner_user_uid", uid);
        formData.append("hospital_uid", inputData.company_uid || "");
        formData.append(
          "head_name_hd_room",
          inputData.name_kepala_ruangan_hd || ""
        );
        formData.append(
          "name_of_general_practitioner",
          inputData.name_dokter_umum_or_hd || ""
        );
        formData.append(
          "name_of_consular_doctor",
          inputData.name_dokter_konsulen_or_sppd || ""
        );
        formData.append(
          "contact_person_nurse_or_doctor",
          inputData.no_telp_perawat_or_dokter || ""
        );
        formData.append(
          "procurement_or_management_contact_person",
          inputData.no_telp_pengadaan_manajemen || ""
        );
        formData.append(`promoters[0]`, inputNps.promoter[0] || "");
        formData.append(`promoters[1]`, inputNps.promoter[1] || "");
        formData.append(`promoters[2]`, inputNps.promoter[2] || "");
        formData.append("neutrals[0]", inputNps.neutral[0] || "");
        formData.append("neutrals[1]", inputNps.neutral[1] || "");
        formData.append("neutrals[2]", inputNps.neutral[2] || "");
        formData.append("detcractors[0]", inputNps.detractor[0] || "");
        formData.append("detcractors[1]", inputNps.detractor[1] || "");
        formData.append("detcractors[2]", inputNps.detractor[2] || "");
        formData.append("existing_vendor", inputData.existing_vendor || "");
        formData.append(
          "number_of_machine_unit",
          inputData.jumlah_unit_mesin || ""
        );
        formData.append(
          "average_total_actions_last_six_months",
          inputData.tindakan_enam_bulan || ""
        );
        formData.append(
          "number_of_existing_patients",
          inputData.jumlah_pasien_existing || ""
        );
        formData.append(
          "expired_contract_period",
          inputData.masa_kontrak_berakhir || ""
        );
        formData.append("status_contract_unit", inputData.is_replace || "");
        formData.append("existing_bhp_price", inputValue || "");
        formData.append(
          "expired_hd_permit_period",
          inputData.masa_berlaku_izin || ""
        );
        formData.append(
          "collaborating_with_bpjs",
          inputData.is_berkerja_bpjs || ""
        );
        formData.append(
          "number_of_unit_facilities",
          inputData.jumlah_sarana_unit || ""
        );
        formData.append("total_of_machine_unit", inputData.jumlah_unit || "");
        formData.append("cooperation_system", inputData.sistem_kerjasama || "");
        formData.append("human_resources", inputData.sdm || "");
        formData.append(
          "hd_unit_count_distance_from_faskes",
          inputData.faskes_hd_lima_km || ""
        );
        formData.append(
          "hd_health_facilities_arround",
          inputData.kapasistas_faskes_hd_sekitar_unit || ""
        );
        formData.append(
          "hd_health_facilities_capacity_approximately",
          inputData.jumlah_unit_hd_kurang_dua_pulu_km || ""
        );
        formData.append("cataclysm", inputData.is_banjir || "");
        formData.append("near_the_sea", inputData.dekat_laut || "");
        formData.append(
          "availability_of_human_resource",
          inputData.ketersedian_sdm || ""
        );
        formData.append(
          "access_to_transportation",
          inputData.akses_transportasi || ""
        );
        formData.append("another_notes", inputData.another_notes || "");
        for (const pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        setButtonBlocked(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/v2/deals`,
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
          text: "Successfully Created Data",
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.href = "/deals-second";
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
                QUALIFYING PROJECT FORM
              </h4>
            </Card.Header>
            <Card.Body>
              <>
                <div class="alert alert-primary mt-2" role="alert">
                  <h6 style={{ fontWeight: "700" }}>Data Dasar Informasi</h6>
                </div>
                <div className="mb-3">
                  <Select
                    placeholder="Pilih Rumah Sakit / Klinik"
                    className="mb-2"
                    options={selectCompany()}
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        company_uid: e.value,
                      })
                    }
                    required
                  />
                  <button
                    className="form-text text-primary fw-semibold border-0 "
                    onClick={handleShow}
                  >
                    Tambah Rumah Sakit / Klinik
                  </button>
                  <OverlayAddCompany
                    visible={showOverlay}
                    onClose={handleClose}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="floatingInput">
                    <span className="text-danger fs-6 fw-bold">*</span> Nama
                    Kepala Ruangan HD{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name_kepala_ruangan_hd"
                    onChange={handleInputData}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="floatingInput">
                        <span className="text-danger fs-6 fw-bold">*</span> Nama
                        Dokter Umum / Pelaksana HD
                      </label>
                      <input
                        type="text"
                        name="name_dokter_umum_or_hd"
                        id=""
                        onChange={handleInputData}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="floatingInput">
                        <span className="text-danger fs-6 fw-bold">*</span> Nama
                        Dokter Konsulen / SpPD KGH
                      </label>
                      <input
                        type="text"
                        name="name_dokter_konsulen_or_sppd"
                        onChange={handleInputData}
                        id=""
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="floatingInput">
                        <span className="text-danger fs-6 fw-bold">*</span>
                        No.Telp Perawat / Dokter
                      </label>
                      <input
                        type="number"
                        name="no_telp_perawat_or_dokter"
                        onChange={handleInputData}
                        id=""
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="floatingInput">
                        <span className="text-danger fs-6 fw-bold">*</span>
                        No.Telp Pengadaan / Manajemen
                      </label>
                      <input
                        type="number"
                        name="no_telp_pengadaan_manajemen"
                        onChange={handleInputData}
                        id=""
                        className="form-control"
                        required
                      />
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
                    name={`promoters[0]`}
                    onChange={handleInputNps}
                    placeholder="Input Nama/Jabatan"
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    name={`promoters[1]`}
                    onChange={handleInputNps}
                    id=""
                    placeholder="Input Nama/Jabatan"
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    name={`promoters[2]`}
                    onChange={handleInputNps}
                    id=""
                    placeholder="Input Nama/Jabatan"
                    className="form-control mb-2"
                  />
                </div>
                <div className="mb-2">
                  <h6 className="fw-bold ms-2 mt-3">Neutrals</h6>
                  <input
                    type="text"
                    name={`neutrals[0]`}
                    onChange={handleInputNps}
                    id=""
                    placeholder="Input Nama/Jabatan"
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    name={`neutrals[1]`}
                    onChange={handleInputNps}
                    placeholder="Input Nama/Jabatan"
                    id=""
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    name={`neutrals[2]`}
                    onChange={handleInputNps}
                    placeholder="Input Nama/Jabatan"
                    id=""
                    className="form-control mb-2"
                  />
                </div>
                <div className="mb-2">
                  <h6 className="fw-bold ms-2 mt-3">Detractors</h6>
                  <input
                    type="text"
                    name={`detractors[0]`}
                    onChange={handleInputNps}
                    placeholder="Input Nama/Jabatan"
                    id=""
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    name={`detractors[1]`}
                    onChange={handleInputNps}
                    placeholder="Input Nama/Jabatan"
                    id=""
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    name={`detractors[2]`}
                    onChange={handleInputNps}
                    placeholder="Input Nama/Jabatan"
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
                        name="existing_vendor"
                        onChange={handleInputData}
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
                        type="number"
                        name="jumlah_unit_mesin"
                        onChange={handleInputData}
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
                        type="number"
                        name="tindakan_enam_bulan"
                        onChange={handleInputData}
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
                        type="number"
                        name="jumlah_pasien_existing"
                        onChange={handleInputData}
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
                        name="masa_kontrak_berakhir"
                        onChange={handleInputData}
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
                    <div className="mb-3">
                      <label htmlFor="floatingInput">Replace/ Expand</label>
                      <select
                        name="is_replace"
                        id=""
                        onChange={handleInputData}
                        className="form-control"
                      >
                        <option value="">Select Chose</option>
                        <option value="replace">Replace</option>
                        <option value="expand">Expand</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        name="harga_bhp_existing"
                        className="form-control"
                        placeholder=""
                        value={inputValue}
                        onChange={handleInputDataRP}
                        id=""
                      />
                      <label htmlFor="floatingInput">Harga BHP existing</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        name="masa_berlaku_izin"
                        onChange={handleInputData}
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
                  <select
                    name="is_berkerja_bpjs"
                    id=""
                    onChange={handleInputData}
                    className="form-select"
                  >
                    <option value="">Select Choose</option>
                    <option value="yes">Ya</option>
                    <option value="no">Tidak</option>
                  </select>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    name="jumlah_sarana_unit"
                    onChange={handleInputData}
                    placeholder=""
                  />
                  <label htmlFor="">Jumlah Sarana Unit</label>
                </div>
                <div class="alert alert-primary mt-4" role="alert">
                  <h6 style={{ fontWeight: "700" }}>New Unit</h6>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    name="jumlah_unit"
                    placeholder=""
                    onChange={handleInputData}
                    id=""
                    className="form-control"
                  />
                  <label htmlFor="">Jumlah Unit</label>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="mb-1">
                    Sistem Kerja Sama
                  </label>
                  <select
                    name="sistem_kerjasama"
                    onChange={handleInputData}
                    id=""
                    className="form-control"
                  >
                    <option value="">Select Chose</option>
                    <option value="buy">Buy</option>
                    <option value="kso">Kso</option>
                    <option value="etc">Lainnya</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="mb-1">
                    SDM
                  </label>
                  <select
                    name="sdm"
                    className="form-control"
                    onChange={handleInputData}
                  >
                    <option value="">Select Chose</option>
                    <option value="available">Tersedia</option>
                    <option value="not_yet_available">Belum Tersedia</option>
                  </select>
                </div>
                <div className="mb-2">
                  <h6 className="ms-2 mt-3">Faskes HD 5 km sekitar New Unit</h6>
                  <ReactQuill
                    className="p-2"
                    theme="snow"
                    onChange={(value) =>
                      handleInputData({
                        target: { name: "faskes_hd_lima_km", value },
                      })
                    }
                  />
                </div>
                <div className="mb-2">
                  <h6 className="ms-2 mt-3">
                    Kapasitas Faskes HD Sekitar New Unit
                  </h6>
                  <ReactQuill
                    className="p-2"
                    theme="snow"
                    onChange={(value) =>
                      handleInputData({
                        target: {
                          name: "kapasistas_faskes_hd_sekitar_unit",
                          value,
                        },
                      })
                    }
                  />
                </div>
                <div class="alert alert-primary mt-4" role="alert">
                  <h6 style={{ fontWeight: "700" }}>Keadaan Lingkungan</h6>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="mb-1">
                    Banjir
                  </label>
                  <select
                    name="is_banjir"
                    id=""
                    onChange={handleInputData}
                    className="form-select"
                  >
                    <option value="">Select Choose</option>
                    <option value="yes">Ya</option>
                    <option value="no">Tidak</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="mb-1">
                    Dekat Laut (Kurang dari 5km)
                  </label>
                  <select
                    name="dekat_laut"
                    id=""
                    onChange={handleInputData}
                    className="form-select"
                  >
                    <option value="">Select Choose</option>
                    <option value="yes">Ya</option>
                    <option value="no">Tidak</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="mb-1">
                    Ketersedian SDM
                  </label>
                  <select
                    name="ketersedian_sdm"
                    id=""
                    onChange={handleInputData}
                    className="form-select"
                  >
                    <option value="">Select Choose</option>
                    <option value="available">Ada</option>
                    <option value="not_yet_available">Tidak</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="mb-1">
                    Akses Transportasi / Logistik
                  </label>
                  <select
                    name="akses_transportasi"
                    id=""
                    onChange={handleInputData}
                    className="form-select"
                  >
                    <option value="">Select Choose</option>
                    <option value="easy">Mudah</option>
                    <option value="difficult">Sulit</option>
                  </select>
                </div>
                <div class="alert alert-primary mt-4" role="alert">
                  <h6 style={{ fontWeight: "700" }}>Other Information</h6>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    name="jumlah_unit_hd_kurang_dua_pulu_km"
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
                    name="jumlah_mesin_unit_hd"
                    onChange={handleInputData}
                    id=""
                    className="form-control"
                    placeholder=""
                  />
                  <label htmlFor="">Jumlah mesin unit HD sekitar</label>
                </div>
                <div className="mb-2">
                  <h6 className="ms-2 mt-3">Catatan</h6>
                  <ReactQuill
                    className="p-2"
                    theme="snow"
                    onChange={(value) =>
                      handleInputData({
                        target: {
                          name: "another_notes",
                          value,
                        },
                      })
                    }
                  />
                </div>
              </>
            </Card.Body>
            <Card.Footer>
              <div className="float-end mt-2">
                <button
                  className="btn btn-primary me-2"
                  // disabled={buttonBlocked}
                  onClick={handleSubmit}
                >
                  Simpan
                </button>
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
