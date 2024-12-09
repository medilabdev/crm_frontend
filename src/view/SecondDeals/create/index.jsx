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
import { handleSubmit } from "./System/SubmitCreate";

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
                  onClick={(e) => handleSubmit(inputData, inputNps, inputValue, uid, token, e)}

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
