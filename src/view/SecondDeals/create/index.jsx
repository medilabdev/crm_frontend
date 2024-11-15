import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import BreadCrumbCreate from "./breadcrumb";
import { Card, FloatingLabel, Form, Table } from "react-bootstrap";
import ReactQuill from "react-quill";
import TobButton from "./TobButton";
import Select from "react-select";
import OverlayAddCompany from "../../../components/Overlay/addCompany";
import { useDispatch, useSelector } from "react-redux";
import { getListCompany } from "../../../action/FormCompany";
import axios from "axios";
import Swal from "sweetalert2";
import InputNps from "./InputNps";
import InformationBase from "./Part/InformationBase";
import ExistingUnit from "./Part/ExistingUnit";
import NewUnit from "./Part/NewUnit";
import EnvironmentalConditions from "./Part/EnvironmentalConditions";

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
    if (Array?.isArray(listResult)) {
      listResult?.map((data) => {
        const finalResult = {
          label: `${data.name} (${data?.company_type?.name})`,
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
    detcractors: ["", "", ""],
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
        ["promoters", "neutrals", "detcractors"].forEach((key) => {
          if (inputNps[key]) {
            inputNps[key].forEach((value, idx) => {
              if (value) {
                formData.append(`${key}[${idx}]`, value || "");
              }
            });
          }
        });
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
        if (inputValue) {
          const inputValueWithoutDot = inputValue.replace(/\./g, "");
          formData.append("existing_bhp_price", inputValueWithoutDot || "");
        }
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
          "hd_health_facilities_arround",
          inputData.faskes_hd_lima_km || ""
        );
        formData.append(
          "hd_health_facilities_capacity_approximately",
          inputData.kapasistas_faskes_hd_sekitar_unit || ""
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
        formData.append(
          "hd_unit_count_distance_from_faskes",
          inputData.jumlah_unit_hd_kurang_dua_pulu_km || ""
        );
        formData.append(
          "hd_machine_unit_count",
          inputData.jumlah_mesin_unit_hd || ""
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

  const autoResizeTextarea = (e) => {
    e.target.style.height = "auto"; // Reset tinggi ke auto
    e.target.style.height = `${e.target.scrollHeight}px`; // Sesuaikan tinggi berdasarkan konten
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
              <h4 className="mt-2" style={{ fontWeight: 700, letterSpacing:"1.3px"}}>
                QUALIFYING PROJECT FORM
              </h4>
            </Card.Header>
            <Card.Body>
              <>
              <div class="header-box">
                  DATA DASAR INFORMASI
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
               <InformationBase  handleInputData={handleInputData}/>
                <div class="header-box mt-2">
                NPS CUSTOMER
                </div>
                <Table className="table table-bordered w-100">
                  <thead>
                    <tr>
                    <th className="fw-semibold">Promoters</th>
                    <th className="fw-semibold">Neutrals</th>
                    <th className="fw-semibold">Detractors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1, 2].map((idx) => (
                          <tr key={idx}>
                            <td className="p-3">
                              <textarea
                                name={`promoters[${idx}]`}
                                onChange={(e) => {
                                  setInputNps({
                                    ...inputNps,
                                    promoters: [
                                      ...inputNps.promoters.slice(0, idx),
                                      e.target.value,
                                      ...inputNps.promoters.slice(idx + 1),
                                    ],
                                  });
                                  autoResizeTextarea(e);
                                }}
                                placeholder="Input Nama / Jabatan"
                                className="form-control mb-2"
                                style={{
                                  resize: "none",
                                  overflow: "hidden",
                                  minHeight: "38px",
                                }}
                              />
                            </td>
                            <td className="p-3">
                              <textarea
                                name={`neutrals[${idx}]`}
                                onChange={(e) => {
                                  setInputNps({
                                    ...inputNps,
                                    neutrals: [
                                      ...inputNps.neutrals.slice(0, idx),
                                      e.target.value,
                                      ...inputNps.neutrals.slice(idx + 1),
                                    ],
                                  });
                                  autoResizeTextarea(e);
                                }}
                                placeholder="Input Nama / Jabatan"
                                className="form-control mb-2"
                                style={{
                                  resize: "none",
                                  overflow: "hidden",
                                  minHeight: "38px",
                                }}
                              />
                            </td>
                            <td className="p-3">
                              <textarea
                                name={`detcractors[${idx}]`}
                                onChange={(e) => {
                                  setInputNps({
                                    ...inputNps,
                                    detcractors: [
                                      ...inputNps.detcractors.slice(0, idx),
                                      e.target.value,
                                      ...inputNps.detcractors.slice(idx + 1),
                                    ],
                                  });
                                  autoResizeTextarea(e);
                                }}
                                placeholder="Input Nama / Jabatan"
                                className="form-control mb-2"
                                style={{
                                  resize: "none",
                                  overflow: "hidden",
                                  minHeight: "38px",
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </Table>
                <ExistingUnit handleInputData={handleInputData} inputValue={inputValue} handleInputDataRP={handleInputDataRP} />
                <NewUnit handleInputData={handleInputData} />
               <EnvironmentalConditions handleInputData={handleInputData} />
               <div class="header-box mt-2">
                INFORMASI LAINNYA
              </div>
                <div className="row">
                  <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      name="jumlah_unit_hd_kurang_dua_pulu_km"
                      onChange={handleInputData}
                      id=""
                      className="form-control"
                      placeholder=""
                    />
                    <label htmlFor="">
                      Jumlah unit HD kurang dari 20 km faskes
                    </label>
                  </div>
                  </div>
                  <div className="col-md-6">
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
                  </div>  
               
                  <div className="mb-2 col-md">
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
