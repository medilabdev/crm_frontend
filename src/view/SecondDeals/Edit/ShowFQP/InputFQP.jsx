import React, { useEffect, useState } from "react";
import { Card, Table, ToastHeader } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { getListCompany } from "../../../../action/FormCompany";
import { useSelector } from "react-redux";
import OverlayAddCompany from "../../../../components/Overlay/addCompany";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import axios from "axios";
import Feedback from "react-bootstrap/esm/Feedback";
import BaseInformation from "./PartEdit/BaseInformation";
import ExistingUnit from "./PartEdit/ExistingUnit";
import NewUnit from "./PartEdit/NewUnit";
import EnvironmentalConditions from "./PartEdit/EnvironmentalConditions";

const getNames = (items) => {
  return [0,1,2].map(index => items && items[index] ? items[index].name : '')
}
const InputFQP = ({ data, listCompany }) => {
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");
  const uidDeals = useParams();
  const [inputData, setInputData] = useState(data);
  const [error, setError] =useState('')
  
  const [inputNps, setInputNps] = useState({
    promoters: getNames(data.promoters),
    neutrals: getNames(data.neutrals),
    detcractors: getNames(data.detcractors) 
  });

  console.log(inputNps);
  
  

  const categoriesNps = ['promoters', 'neutrals', 'detcractors'];

  const [showOverlay, setShowOverlay] = useState(false);
  const handleShow = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);
  const selectCompany = () => {
    const result = [];
    if (Array.isArray(listCompany)) {
      listCompany.map((data) => {        
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
  const handleInputData = (e) => {
    const { name, value} = e.target
      setInputData((prevInputData) => {
        if(prevInputData[name] !== value){
          return{
            ...prevInputData,
            [name] : value,
          };
        }
        return prevInputData
      })
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
    if(!inputData.is_validate){
     setError('Wajib Memilih apakah membutuhkan approval manager atau tidak!')
     Swal.fire({
      text:'Ada Form yang belum diisi',
      icon:'warning'
     })
     return
    }
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
        categoriesNps.forEach(category => {
          if (inputNps[category] && inputNps[category].length > 0) {
            inputNps[category].forEach((item, index) => {
              formData.append(`${category}[${index}]`, item || "");
            });
          }
        });

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
        formData.append('is_validate', inputData.is_validate);
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



  const autoResizeTextarea = (e) => {
    e.target.style.height = "auto"; // Reset tinggi ke auto
    e.target.style.height = `${e.target.scrollHeight}px`; // Sesuaikan tinggi berdasarkan konten
  };
  return (
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
        <BaseInformation inputData={inputData} handleInputData={handleInputData}/>
        <div class="header-box">
           NPS CUSTOMER
          </div>
        <Table className="table table-bordered w-100">
          <thead>
            <tr className="text-center">
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
                    value={inputNps?.promoters[idx] || ""}
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
                    value={inputNps?.neutrals[idx] || ""}
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
                    value={inputNps?.detcractors[idx] || ""}
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

          <ExistingUnit handleInputData={handleInputData} inputData={inputData} inputPrice={inputPrice} handleInputDataRP={handleInputDataRP}/>
      
          <NewUnit inputData={inputData} handleInputData={handleInputData} />
            <EnvironmentalConditions inputData={inputData} handleInputData={handleInputData} />
            <div class="header-box mt-4">
                INFORMASI LAINNYA
            </div>
        <div className="row">
          <div className="col-md-6">
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
          </div>
          <div className="col-md-6">
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
          </div>
        </div>
      
       
        
        <div className="mb-2">
          <h6 className="ms-2 mt-3">Catatan</h6>
          <ReactQuill
            className="p-2"
            theme="snow"
            value={inputData?.another_notes || ""}
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
        <div className="mb-3">
          <label htmlFor="" className="mb-1">
           <span className="text-danger fw-bold">*</span> Apakah membutuhkan approval untuk ke stage selanjutnya ? 
          </label>
          <select
            name="is_validate"
            id=""
            onChange={handleInputData}
            className={`form-select ${error ? 'is-invalid' :''}`}
          >
            <option value="">Select Choose</option>
            <option value="yes">Iya</option>
            <option value="no">Tidak</option>
          </select>
          {error && <div className="invalid-feedback">{error}</div>}
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
