import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { getListCompany } from "../../../../action/FormCompany";
import { useSelector } from "react-redux";
import OverlayAddCompany from "../../../../components/Overlay/addCompany";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import axios from "axios";
const InputFQP = ({ data, listCompany }) => {
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");
  const uidDeals = useParams();
  const [inputData, setInputData] = useState(data);
  const [inputNps, setInputNps] = useState({
    promoters: [
      data.promoters && data.promoters[0] ? data.promoters[0].name : "",
      data.promoters && data.promoters[1] ? data.promoters[1].name : "",
      data.promoters && data.promoters[2] ? data.promoters[2].name : "",
    ],
    neutrals: [
      data.neutrals && data.neutrals[0] ? data.neutrals[0].name : "",
      data.neutrals && data.neutrals[1] ? data.neutrals[1].name : "",
      data.neutrals && data.neutrals[2] ? data.neutrals[2].name : "",
    ],
    detractors: [
      data.detcractors && data.detcractors[0] ? data.detcractors[0].name : "",
      data.detcractors && data.detcractors[1] ? data.detcractors[1].name : "",
      data.detcractors && data.detcractors[2] ? data.detcractors[2].name : "",
    ],
  });

  const [showOverlay, setShowOverlay] = useState(false);
  const handleShow = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);
  const selectCompany = () => {
    const result = [];
    if (Array.isArray(listCompany)) {
      listCompany.map((data) => {
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
  const handleInputData = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const [inputPrice, setInputPrice] = useState(data?.existing_bhp_price);
  const handleInputDataRP = (e) => {
    const value = e.target.value;
    const formated = formatCurrency(value);
    setInputPrice(formated);
  };

  const formatCurrency = (value) => {
    const sanitizedValue = value.replace(/[^\d]/g, "");
    const formattedValue = Number(sanitizedValue).toLocaleString("id-ID");
    return formattedValue;
  };

  const uidFQP = data?.uid;
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
        formData.append("deals_uid", uidDeals.uid);
        formData.append("hospital_uid", inputData.hospital_uid || "");
        formData.append("head_name_hd_room", inputData.head_name_hd_room || "");
        formData.append(
          "name_of_general_practitioner",
          inputData.name_of_general_practitioner || ""
        );
        formData.append(
          "name_of_consular_doctor",
          inputData.name_of_consular_doctor || ""
        );
        formData.append(
          "contact_person_nurse_or_doctor",
          inputData.contact_person_nurse_or_doctor || ""
        );
        formData.append(
          "procurement_or_management_contact_person",
          inputData.procurement_or_management_contact_person || ""
        );
        if (inputNps.promoters && inputNps.promoters.length > 0) {
          formData.append(`promoters[0]`, inputNps.promoters[0] || "");
          formData.append(`promoters[1]`, inputNps.promoters[1] || "");
          formData.append(`promoters[2]`, inputNps.promoters[2] || "");
        }
        if (inputNps.neutrals && inputNps.neutrals.length > 0) {
          formData.append("neutrals[0]", inputNps.neutrals[0] || "");
          formData.append("neutrals[1]", inputNps.neutrals[1] || "");
          formData.append("neutrals[2]", inputNps.neutrals[2] || "");
        }
        if (inputNps.detractors && inputNps.detractors.length > 0) {
          formData.append("detcractors[0]", inputNps.detractors[0] || "");
          formData.append("detcractors[1]", inputNps.detractors[1] || "");
          formData.append("detcractors[2]", inputNps.detractors[2] || "");
        }

        formData.append("existing_vendor", inputData.existing_vendor || "");
        formData.append(
          "number_of_machine_unit",
          inputData.number_of_machine_unit || ""
        );
        formData.append(
          "average_total_actions_last_six_months",
          inputData.average_total_actions_last_six_months || ""
        );
        formData.append(
          "number_of_existing_patients",
          inputData.number_of_existing_patients || ""
        );
        formData.append(
          "expired_contract_period",
          inputData.expired_contract_period || ""
        );
        formData.append(
          "status_contract_unit",
          inputData.status_contract_unit || ""
        );

        if (typeof inputPrice === 'string') {
          const inputValueWithoutDot = inputPrice.replace(/\./g, "");
          formData.append("existing_bhp_price", inputValueWithoutDot || "");
        }else {
          formData.append("existing_bhp_price", data?.existing_bhp_price  || "")
        }
        formData.append(
          "expired_hd_permit_period",
          inputData.expired_hd_permit_period || ""
        );
        formData.append(
          "collaborating_with_bpjs",
          inputData.collaborating_with_bpjs || ""
        );
        formData.append(
          "number_of_unit_facilities",
          inputData.number_of_unit_facilities || ""
        );
        formData.append(
          "total_of_machine_unit",
          inputData.total_of_machine_unit || ""
        );
        formData.append(
          "cooperation_system",
          inputData.cooperation_system || ""
        );
        formData.append("human_resources", inputData.human_resources || "");
        formData.append(
          "hd_unit_count_distance_from_faskes",
          inputData.hd_unit_count_distance_from_faskes || ""
        );
        formData.append(
          "hd_health_facilities_arround",
          inputData.hd_health_facilities_arround || ""
        );
        formData.append(
          "hd_health_facilities_capacity_approximately",
          inputData.hd_health_facilities_capacity_approximately || ""
        );
        formData.append("cataclysm", inputData.cataclysm || "");
        formData.append("near_the_sea", inputData.near_the_sea || "");
        formData.append(
          "availability_of_human_resource",
          inputData.availability_of_human_resource || ""
        );
        formData.append(
          "access_to_transportation",
          inputData.access_to_transportation || ""
        );
        formData.append(
          "hd_unit_count_distance_from_faskes",
          inputData.hd_unit_count_distance_from_faskes || ""
        );
        formData.append(
          "hd_machine_unit_count",
          inputData.hd_machine_unit_count || ""
        );
        formData.append("another_notes", inputData.another_notes || "");
        formData.append("_method", "put");
        for (const pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/v2/fqp-document/${uidFQP}`,
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
          text: error.message,
          icon: "error",
        });
      }
    }
  };
  return (
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
            value={selectCompany().find(
              (e) => e.value === inputData.hospital_uid
            )}
            onChange={(selected) =>
              setInputData({
                ...inputData,
                hospital_uid: selected.value,
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
          <OverlayAddCompany visible={showOverlay} onClose={handleClose} />
        </div>
        <div className="mb-3">
          <label htmlFor="floatingInput">
            <span className="text-danger fs-6 fw-bold">*</span> Nama Kepala
            Ruangan HD
          </label>
          <input
            type="text"
            className="form-control"
            name="head_name_hd_room"
            value={inputData.head_name_hd_room}
            onChange={handleInputData}
            required
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="floatingInput">
                <span className="text-danger fs-6 fw-bold">*</span> Nama Dokter
                Umum / Pelaksana HD
              </label>
              <input
                type="text"
                name="name_of_general_practitioner"
                value={inputData.name_of_general_practitioner}
                onChange={handleInputData}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="floatingInput">
                <span className="text-danger fs-6 fw-bold">*</span> Nama Dokter
                Konsulen / SpPD KGH
              </label>
              <input
                type="text"
                name="name_of_consular_doctor"
                value={inputData.name_of_consular_doctor}
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
                name="contact_person_nurse_or_doctor"
                value={inputData.contact_person_nurse_or_doctor}
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
                name="procurement_or_management_contact_person"
                value={inputData.procurement_or_management_contact_person}
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
            value={inputNps.promoters[0] || ""}
            onChange={(e) =>
              setInputNps({
                ...inputNps,
                promoters: [
                  e.target.value,
                  inputNps.promoters[1] || "",
                  inputNps.promoters[2] || "",
                ],
              })
            }
            placeholder="Input Nama/Jabatan"
            className="form-control mb-2"
          />

          <input
            type="text"
            name={`promoters[1]`}
            value={inputNps.promoters[1] || ""}
            onChange={(e) =>
              setInputNps({
                ...inputNps,
                promoters: [
                  inputNps.promoters[0] || "",
                  e.target.value,
                  inputNps.promoters[2] || "",
                ],
              })
            }
            placeholder="Input Nama/Jabatan"
            className="form-control mb-2"
          />

          <input
            type="text"
            name={`promoters[2]`}
            value={inputNps.promoters[2] || ""}
            onChange={(e) =>
              setInputNps({
                ...inputNps,
                promoters: [
                  inputNps.promoters[0] || "",
                  inputNps.promoters[1] || "",
                  e.target.value,
                ],
              })
            }
            placeholder="Input Nama/Jabatan"
            className="form-control mb-2"
          />
        </div>
        <div className="mb-2">
          <h6 className="fw-bold ms-2 mt-3">Neutrals</h6>
          <input
            type="text"
            name={`neutrals[0]`}
            value={inputNps.neutrals[0] || ""}
            onChange={(e) =>
              setInputNps({
                ...inputNps,
                neutrals: [
                  e.target.value,
                  inputNps.neutrals[1] || "",
                  inputNps.neutrals[2] || "",
                ],
              })
            }
            placeholder="Input Nama/Jabatan"
            className="form-control mb-2"
          />

          <input
            type="text"
            name={`neutrals[1]`}
            value={inputNps.neutrals[1] || ""}
            onChange={(e) =>
              setInputNps({
                ...inputNps,
                neutrals: [
                  inputNps.neutrals[0] || "",
                  e.target.value,
                  inputNps.neutrals[2] || "",
                ],
              })
            }
            placeholder="Input Nama/Jabatan"
            className="form-control mb-2"
          />

          <input
            type="text"
            name={`neutrals[2]`}
            value={inputNps.neutrals[2] || ""}
            onChange={(e) =>
              setInputNps({
                ...inputNps,
                neutrals: [
                  inputNps.neutrals[0] || "",
                  inputNps.neutrals[1] || "",
                  e.target.value,
                ],
              })
            }
            placeholder="Input Nama/Jabatan"
            className="form-control mb-2"
          />
        </div>
        <div className="mb-2">
          <h6 className="fw-bold ms-2 mt-3">Detractors</h6>
          <input
            type="text"
            name={`detractors[0]`}
            value={inputNps.detractors[0] || ""}
            onChange={(e) =>
              setInputNps({
                ...inputNps,
                detractors: [
                  e.target.value,
                  inputNps.detractors[1] || "",
                  inputNps.detractors[2] || "",
                ],
              })
            }
            placeholder="Input Nama/Jabatan"
            className="form-control mb-2"
          />

          <input
            type="text"
            name={`detractors[1]`}
            value={inputNps.detractors[1] || ""}
            onChange={(e) =>
              setInputNps({
                ...inputNps,
                detractors: [
                  inputNps.detractors[0] || "",
                  e.target.value,
                  inputNps.detractors[2] || "",
                ],
              })
            }
            placeholder="Input Nama/Jabatan"
            className="form-control mb-2"
          />

          <input
            type="text"
            name={`detractors[2]`}
            value={inputNps.detractors[2] || ""}
            onChange={(e) =>
              setInputNps({
                ...inputNps,
                detractors: [
                  inputNps.detractors[0] || "",
                  inputNps.detractors[1] || "",
                  e.target.value,
                ],
              })
            }
            placeholder="Input Nama/Jabatan"
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
                value={inputData.existing_vendor || ""}
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
                name="number_of_machine_unit"
                value={inputData.number_of_machine_unit || ""}
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
                name="average_total_actions_last_six_months"
                value={inputData.average_total_actions_last_six_months || ""}
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
                name="number_of_existing_patients"
                value={inputData.number_of_existing_patients || ""}
                onChange={handleInputData}
                className="form-control"
                placeholder=""
                id=""
              />
              <label htmlFor="floatingInput">Jumlah pasien existing</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="expired_contract_period"
                value={inputData.expired_contract_period || ""}
                onChange={handleInputData}
                className="form-control"
                placeholder=""
                id=""
              />
              <label htmlFor="floatingInput">Masa kontrak berakhir</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="floatingInput">Replace/ Expand</label>
              <select
                name="status_contract_unit"
                value={inputData.status_contract_unit || ""}
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
                name="existing_bhp_price"
                className="form-control"
                placeholder=""
                value={inputPrice || ""}
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
                name="expired_hd_permit_period"
                value={inputData.expired_hd_permit_period || ""}
                onChange={handleInputData}
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
          <select
            name="collaborating_with_bpjs"
            id=""
            value={inputData.collaborating_with_bpjs || ""}
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
            name="number_of_unit_facilities"
            value={inputData.number_of_unit_facilities || ""}
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
            name="total_of_machine_unit"
            placeholder=""
            value={inputData.total_of_machine_unit || ""}
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
            name="cooperation_system"
            value={inputData.cooperation_system || ""}
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
            name="human_resources"
            className="form-control"
            value={inputData.human_resources || ""}
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
            value={inputData.hd_health_facilities_arround || ""}
            onChange={(value) =>
              handleInputData({
                target: { name: "hd_health_facilities_arround", value },
              })
            }
          />
        </div>
        <div className="mb-2">
          <h6 className="ms-2 mt-3">Kapasitas Faskes HD Sekitar New Unit</h6>
          <ReactQuill
            className="p-2"
            theme="snow"
            value={inputData.hd_health_facilities_capacity_approximately || ""}
            onChange={(value) =>
              handleInputData({
                target: {
                  name: "hd_health_facilities_capacity_approximately",
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
            name="cataclysm"
            id=""
            value={inputData.cataclysm || ""}
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
            name="near_the_sea"
            id=""
            value={inputData.near_the_sea || ""}
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
            name="availability_of_human_resource"
            id=""
            value={inputData.availability_of_human_resource || ""}
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
            name="access_to_transportation"
            id=""
            value={inputData.access_to_transportation || ""}
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
            name="hd_unit_count_distance_from_faskes"
            id=""
            value={inputData.hd_unit_count_distance_from_faskes || ""}
            onChange={handleInputData}
            className="form-control"
            placeholder=""
          />
          <label htmlFor="">Jumlah unit HD kurang dari 20 km faskes</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            name="hd_machine_unit_count"
            value={inputData.hd_machine_unit_count || ""}
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
            value={inputData.another_notes || ""}
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
        <div className=" mt-2">
          <button className="btn btn-primary me-2" onClick={handleSubmit}>
            Simpan
          </button>
          <button className="btn btn-secondary">Kembali</button>
        </div>
      </>
    </Card.Body>
  );
};

export default InputFQP;
