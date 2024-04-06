import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import Timeline from "./Timeline";
import ReactQuill from "react-quill";
import DataTableFeeAction from "./FeeAction";
import { Card } from "react-bootstrap";
import DataTableRab from "./Rab";
import DataTableRekapBiaya from "./RekapBiaya";
import Select from "react-select";
import OverlayAddCompany from "../../../../components/Overlay/addCompany";
import { useDispatch } from "react-redux";
import { GetDataFaskes } from "../../../../action/DataFaskes";
import { token } from "../../partials/ColumnsTable";
import { useSelector } from "react-redux";
import { GetDataRegionalBpjs } from "../../../../action/RegionalBpjs";
import SupportKerjaSama from "./SupportKerjaSama";
import { CategoryType } from "../../../../action/CategoryType";
import Swal from "sweetalert2";
import axios from "axios";

const InputLpp = ({ data, listCompany, uidDeals }) => {
  const uidPerson = localStorage.getItem("uid");
  const [inputData, setInputData] = useState(
    data?.lpp_document ? data.lpp_document : []
  );
  const [jenisKerjasama, setJenisKerjaSama] = useState();
  const [Rab, setRab] = useState([]);
  const [feeAction, setFeeAction] = useState([]);
  const [supportKerjaSama, setSupportKerjaSama] = useState([]);

  const [showOverlay, setShowOverlay] = useState(false);
  const [priceFormat, setPriceFormat] = useState(
    inputData !== null ? inputData.price : ""
  );
  const handleInputDataRP = (event) => {
    const rawValue = event.target.value;
    const formattedValue = formatCurrency(rawValue);
    setPriceFormat(formattedValue);
  };

  const formatCurrency = (value) => {
    const sanitizedValue = value.replace(/[^\d]/g, "");
    const formattedValue = Number(sanitizedValue).toLocaleString("id-ID");
    return formattedValue;
  };

  const handleShow = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);
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

  const handleSupportKerjaSama = (e) => {
    const target = e.target.value;
    setSupportKerjaSama(target);
  };
  const handleInputData = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const selectCompany = () => {
    const result = [];
    if (Array.isArray(listCompany)) {
      listCompany.map((data) => {
        const finalResult = {
          label: `${data.name} - (${data.company_type?.name})`,
          value: data.uid,
          type: data.company_type_uid,
        };
        result.push(finalResult);
      });
    } else {
      console.error("listResult is not an array or is not yet initialized.");
    }
    return result;
  };

  const { fasksesData } = useSelector((state) => state.DataFaskes);
  const { BpjsData } = useSelector((state) => state.BpjsRegional);
  const { CategoryTypeData } = useSelector((state) => state.CategoryType);
  const selectFaskes = () => {
    const result = [];
    if (Array.isArray(fasksesData)) {
      fasksesData.map((data) => {
        const finalResult = {
          label: `${data.name}`,
          value: data.uid,
          type: data.company_type_uid,
        };
        result.push(finalResult);
      });
    } else {
      console.error("listResult is not an array or is not yet initialized.");
    }
    return result;
  };
  const selectBpjs = () => {
    const result = [];
    if (Array.isArray(BpjsData)) {
      BpjsData.map((data) => {
        const finalResult = {
          label: `${data.name_location} `,
          value: data.uid,
        };
        result.push(finalResult);
      });
    } else {
      console.error("listResult is not an array or is not yet initialized.");
    }
    return result;
  };
  const SelectCategory = () => {
    const result = [];
    if (Array.isArray(CategoryTypeData)) {
      CategoryTypeData.map((data) => {
        const finalResult = {
          label: `${data.name} `,
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

  const firstQty = parseFloat(
    inputData && inputData.operate_mkhd_first_qty !== null
      ? inputData.operate_mkhd_first_qty
      : ""
  );
  const secondQty = parseFloat(
    inputData && inputData.operate_mkhd_second_qty !== null
      ? inputData.operate_mkhd_second_qty
      : ""
  );
  const backUpOne = parseFloat(
    inputData && inputData.backup_mkhd_first_qty !== null
      ? inputData.backup_mkhd_first_qty
      : ""
  );
  const backUpTwo = parseFloat(
    inputData && inputData.backup_mkhd_second_qty !== null
      ? inputData.backup_mkhd_second_qty
      : ""
  );
  const resultMesin = firstQty + secondQty + backUpTwo + backUpOne;
  const actionDuringCoperationQty = (firstQty + secondQty) * 48 * 60;

  const tempSupport = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("SupportKerjaSama")) {
      const data = JSON.parse(localStorage.getItem(key));
      tempSupport.push(data);
    }
  }

  const FeeData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("FeeTindakan")) {
      const data = JSON.parse(localStorage.getItem(key));
      FeeData.push(data);
    }
  }
  let RabData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("RAB")) {
      const data = JSON.parse(localStorage.getItem(key));
      RabData.push(data);
    }
  }

  const NoAlkes = [];
  const Alkes = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("RAB")) {
      const data = JSON.parse(localStorage.getItem(key));
      data.forEach((item) => {
        if (item.is_alkes === "no") {
          NoAlkes.push({ ...item });
        } else if (item.is_alkes === "yes") {
          Alkes.push({ ...item });
        }
      });
    }
  }
  const [inputTimeline, setInputTimeline] = useState([]);
  const handleInputTimeline = (e) => {
    if (e.target.checked) {
      setInputTimeline({
        ...inputTimeline,
        [e.target.name]: "1",
      });
    } else {
      const updatedInputTimeline = { ...inputTimeline };
      delete updatedInputTimeline[e.target.name];
      setInputTimeline(updatedInputTimeline);
    }
  };
  const [categoryType, setCategoryType] = useState("");

  useEffect(() => {
    const newCategoryType =
      inputData.category_type_uid === "hs_L0YxrtdK1"
        ? "Replace"
        : inputData.category_type_uid === "ls_Y7hsg13Gg"
          ? "New HD"
          : "Expand";
    setCategoryType(newCategoryType);
  }, [inputData.category_type_uid]);

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
              }, 200);
            }
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
        const formData = new FormData();
        formData.append("deals_uid", uidDeals);
        formData.append("customer_name_uid", inputData.customer_name_uid || "");
        formData.append("faskes_type_uid", inputData.faskes_type_uid || "");
        formData.append("bpjs_regional_uid", inputData.bpjs_regional_uid || "");
        formData.append("type_collaboration", jenisKerjasama || "");
        formData.append(
          "revenue_sharing_iss",
          inputData.revenue_sharing_iss || ""
        );
        formData.append(
          "revenue_sharing_customer",
          inputData.revenue_sharing_customer || ""
        );
        formData.append("category_type_uid", inputData.category_type_uid || "");
        formData.append("sell_disconect", inputData.sell_disconect || "");
        formData.append(
          "collaboration_period",
          inputData.collaboration_period || ""
        );
        if (priceFormat) {
          const inputValueWithoutDot = priceFormat.replace(/\./g, "");
          formData.append("price", inputValueWithoutDot || "");
        }
        formData.append("bhp_usage", inputData.bhp_usage || "");
        formData.append("ppn", "Customer");
        formData.append("shipping_cost", inputData.shipping_cost || "");
        formData.append("ro", inputData.ro || "");
        formData.append(
          "operate_mkhd_first_qty",
          inputData.operate_mkhd_first_qty || ""
        );
        formData.append(
          "operate_mkhd_second_qty",
          inputData.operate_mkhd_second_qty || ""
        );
        formData.append(
          "backup_mkhd_first_qty",
          inputData.backup_mkhd_first_qty || ""
        );
        formData.append(
          "backup_mkhd_second_qty",
          inputData.backup_mkhd_second_qty || ""
        );
        formData.append(
          "delivery_mkhd_first_qty",
          inputData.delivery_mkhd_first_qty || ""
        );
        formData.append(
          "delivery_mkhd_second_qty",
          inputData.delivery_mkhd_second_qty || ""
        );
        formData.append("total_mesin_qty", resultMesin || "");
        formData.append(
          "date_first_delivery",
          inputData.date_first_delivery || ""
        );
        formData.append(
          "action_machine_per_month_qty",
          inputData.action_machine_per_month_qty || ""
        );
        formData.append(
          "action_during_cooperation_qty",
          actionDuringCoperationQty || ""
        );
        formData.append("is_rab", Rab || "");
        if (Array.isArray(RabData[0]) && RabData[0].length > 0) {
          RabData[0].forEach((rab, index) => {
            formData.append(`rab[${index}][item_uid]`, rab?.item || "");
            formData.append(`rab[${index}][is_alkes]`, rab?.is_alkes || "");
            formData.append(
              `rab[${index}][estimated_cost]`,
              rab?.nilai_estimasi_biaya || ""
            );
            formData.append(`rab[${index}][qty]`, rab?.qty || "");
            formData.append(
              `rab[${index}][total_price]`,
              rab?.total_estimasi_biaya || ""
            );
            formData.append(`rab[${index}][realization_note]`, rab?.note || "");
          });
        }
        formData.append("is_support", supportKerjaSama || "");
        if (Array.isArray(tempSupport[0]) && tempSupport[0].length > 0) {
          tempSupport[0].forEach((support, index) => {
            formData.append(`support[${index}][item_uid]`, support?.item || "");
            formData.append(
              `support[${index}][estimated_cost]`,
              support?.nilai_estimasi_biaya || ""
            );
            formData.append(`support[${index}][qty]`, support?.qty || "");
            formData.append(
              `support[${index}][total_price]`,
              support?.total_estimasi_biaya || ""
            );
            formData.append(
              `support[${index}][realization_note]`,
              support?.note || ""
            );
          });
        }

        formData.append("is_fee", feeAction || "");
        if (Array.isArray(FeeData[0]) && FeeData[0].length > 0) {
          FeeData[0].forEach((fee, index) => {
            formData.append(`fee[${index}][recieve_name]`, fee?.name || "");
            const valueFee = fee?.nilai.replace(/\./g, "");
            formData.append(`fee[${index}][value]`, valueFee || "");
            formData.append(`fee[${index}][qty]`, fee?.qty || "");
            formData.append(`fee[${index}][total_price]`, fee?.total || "");
            formData.append(`fee[${index}][realization_note]`, fee?.note || "");
          });
        }
        formData.append("postscript", inputData.postscript || "");

        formData.append("timeline[0][name]", categoryType || "");
        formData.append("timeline[0][1]", inputTimeline.timeline01 || 0);
        formData.append("timeline[0][2]", inputTimeline.timeline02 || 0);
        formData.append("timeline[0][3]", inputTimeline.timeline03 || 0);
        formData.append("timeline[0][4]", inputTimeline.timeline04 || 0);
        formData.append("timeline[0][5]", inputTimeline.timeline05 || 0);
        formData.append("timeline[0][6]", inputTimeline.timeline06 || 0);
        formData.append("timeline[0][7]", inputTimeline.timeline07 || 0);
        formData.append("timeline[0][8]", inputTimeline.timeline08 || 0);
        formData.append("timeline[0][9]", inputTimeline.timeline09 || 0);
        formData.append("timeline[0][10]", inputTimeline.timeline10 || 0);
        formData.append("timeline[0][11]", inputTimeline.timeline11 || 0);
        formData.append("timeline[0][12]", inputTimeline.timeline12 || 0);
        formData.append("timeline[1][name]", "Renovasi");
        formData.append("timeline[1][1]", inputTimeline.timeline13 || 0);
        formData.append("timeline[1][2]", inputTimeline.timeline14 || 0);
        formData.append("timeline[1][3]", inputTimeline.timeline15 || 0);
        formData.append("timeline[1][4]", inputTimeline.timeline16 || 0);
        formData.append("timeline[1][5]", inputTimeline.timeline17 || 0);
        formData.append("timeline[1][6]", inputTimeline.timeline18 || 0);
        formData.append("timeline[1][7]", inputTimeline.timeline19 || 0);
        formData.append("timeline[1][8]", inputTimeline.timeline20 || 0);
        formData.append("timeline[1][9]", inputTimeline.timeline21 || 0);
        formData.append("timeline[1][10]", inputTimeline.timeline22 || 0);
        formData.append("timeline[1][11]", inputTimeline.timeline23 || 0);
        formData.append("timeline[1][12]", inputTimeline.timeline24 || 0);
        formData.append("timeline[2][name]", "Kirim Mesin");
        formData.append("timeline[2][1]", inputTimeline.timeline25 || 0);
        formData.append("timeline[2][2]", inputTimeline.timeline26 || 0);
        formData.append("timeline[2][3]", inputTimeline.timeline27 || 0);
        formData.append("timeline[2][4]", inputTimeline.timeline28 || 0);
        formData.append("timeline[2][5]", inputTimeline.timeline29 || 0);
        formData.append("timeline[2][6]", inputTimeline.timeline30 || 0);
        formData.append("timeline[2][7]", inputTimeline.timeline31 || 0);
        formData.append("timeline[2][8]", inputTimeline.timeline32 || 0);
        formData.append("timeline[2][9]", inputTimeline.timeline33 || 0);
        formData.append("timeline[2][10]", inputTimeline.timeline34 || 0);
        formData.append("timeline[2][11]", inputTimeline.timeline35 || 0);
        formData.append("timeline[2][12]", inputTimeline.timeline36 || 0);
        formData.append("timeline[3][name]", "Install Mesin");
        formData.append("timeline[3][1]", inputTimeline.timeline37 || 0);
        formData.append("timeline[3][2]", inputTimeline.timeline38 || 0);
        formData.append("timeline[3][3]", inputTimeline.timeline39 || 0);
        formData.append("timeline[3][4]", inputTimeline.timeline40 || 0);
        formData.append("timeline[3][5]", inputTimeline.timeline41 || 0);
        formData.append("timeline[3][6]", inputTimeline.timeline42 || 0);
        formData.append("timeline[3][7]", inputTimeline.timeline43 || 0);
        formData.append("timeline[3][8]", inputTimeline.timeline44 || 0);
        formData.append("timeline[3][9]", inputTimeline.timeline45 || 0);
        formData.append("timeline[3][10]", inputTimeline.timeline46 || 0);
        formData.append("timeline[3][11]", inputTimeline.timeline47 || 0);
        formData.append("timeline[3][12]", inputTimeline.timeline48 || 0);
        formData.append("timeline[4][name]", "Izin HD & BPJS");
        formData.append("timeline[4][1]", inputTimeline.timeline49 || 0);
        formData.append("timeline[4][2]", inputTimeline.timeline50 || 0);
        formData.append("timeline[4][3]", inputTimeline.timeline51 || 0);
        formData.append("timeline[4][4]", inputTimeline.timeline52 || 0);
        formData.append("timeline[4][5]", inputTimeline.timeline53 || 0);
        formData.append("timeline[4][6]", inputTimeline.timeline54 || 0);
        formData.append("timeline[4][7]", inputTimeline.timeline55 || 0);
        formData.append("timeline[4][8]", inputTimeline.timeline56 || 0);
        formData.append("timeline[4][9]", inputTimeline.timeline57 || 0);
        formData.append("timeline[4][10]", inputTimeline.timeline58 || 0);
        formData.append("timeline[4][11]", inputTimeline.timeline59 || 0);
        formData.append("timeline[4][12]", inputTimeline.timeline60 || 0);
        formData.append("timeline[5][name]", "Training");
        formData.append("timeline[5][1]", inputTimeline.timeline61 || 0);
        formData.append("timeline[5][2]", inputTimeline.timeline62 || 0);
        formData.append("timeline[5][3]", inputTimeline.timeline63 || 0);
        formData.append("timeline[5][4]", inputTimeline.timeline64 || 0);
        formData.append("timeline[5][5]", inputTimeline.timeline65 || 0);
        formData.append("timeline[5][6]", inputTimeline.timeline66 || 0);
        formData.append("timeline[5][7]", inputTimeline.timeline67 || 0);
        formData.append("timeline[5][8]", inputTimeline.timeline68 || 0);
        formData.append("timeline[5][9]", inputTimeline.timeline69 || 0);
        formData.append("timeline[5][10]", inputTimeline.timeline70 || 0);
        formData.append("timeline[5][11]", inputTimeline.timeline71 || 0);
        formData.append("timeline[5][12]", inputTimeline.timeline72 || 0);
        formData.append("timeline[6][name]", "1st Running Patient");
        formData.append("timeline[6][1]", inputTimeline.timeline73 || 0);
        formData.append("timeline[6][2]", inputTimeline.timeline74 || 0);
        formData.append("timeline[6][3]", inputTimeline.timeline75 || 0);
        formData.append("timeline[6][4]", inputTimeline.timeline76 || 0);
        formData.append("timeline[6][5]", inputTimeline.timeline77 || 0);
        formData.append("timeline[6][6]", inputTimeline.timeline78 || 0);
        formData.append("timeline[6][7]", inputTimeline.timeline79 || 0);
        formData.append("timeline[6][8]", inputTimeline.timeline80 || 0);
        formData.append("timeline[6][9]", inputTimeline.timeline81 || 0);
        formData.append("timeline[6][10]", inputTimeline.timeline82 || 0);
        formData.append("timeline[6][11]", inputTimeline.timeline83 || 0);
        formData.append("timeline[6][12]", inputTimeline.timeline84 || 0);
        formData.append("date_period", inputData.date_period || "");
        // for (const pair of formData.entries()) {
        //   console.log(pair[0] + ": " + pair[1]);
        // }
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/v2/lpp-document`,
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
          text: "Something went wrong !",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    dispatch(GetDataFaskes(token));
    dispatch(GetDataRegionalBpjs(token));
    dispatch(CategoryType(token));
    const clearDataSupportKerjaSamaLocalstorage = () => {
      localStorage.removeItem("SupportKerjaSama");
    };
    window.addEventListener("unload", clearDataSupportKerjaSamaLocalstorage);
    return () => {
      window.removeEventListener(
        "unload",
        clearDataSupportKerjaSamaLocalstorage
      );
    };
  }, [dispatch]);

  useEffect(() => {
    const clearFeeTindakan = () => {
      localStorage.removeItem("FeeTindakan");
    };
    window.addEventListener("unload", clearFeeTindakan);
    return () => {
      window.removeEventListener("unload", clearFeeTindakan);
    };
  }, []);

  useEffect(() => {
    const ClearRAB = () => {
      localStorage.removeItem("RAB");
    };
    const ClearEditRab = () => {
      localStorage.removeItem("rabEdit")
    }
    const ClearEditFee = () => {
      localStorage.removeItem("feeEdit")
    }
    const ClearEditSupport = () => {
      localStorage.removeItem("supportEdit")

    }
    window.addEventListener("beforeunload", ClearRAB);
    window.addEventListener("beforeunload", ClearEditRab);
    window.addEventListener("beforeunload", ClearEditFee);
    window.addEventListener("beforeunload", ClearEditSupport);
    return () => {
      window.removeEventListener("beforeunload", ClearRAB);
      window.addEventListener("beforeunload", ClearEditRab);
      window.addEventListener("beforeunload", ClearEditFee);
      window.addEventListener("beforeunload", ClearEditSupport);
    };
  }, []);
  return (
    <Card.Body>
      <div class="alert alert-primary mt-2" role="alert">
        <h6 style={{ fontWeight: "700" }}>Customer</h6>
      </div>
      <div className=" mb-3">
        <Select
          options={selectCompany()}
          placeholder="Select Customer"
          onChange={(e) =>
            setInputData({
              ...inputData,
              customer_name_uid: e.value,
              type: e.type,
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
      {inputData && inputData.type !== "D8iidh2341sf_kJ" ? (
        <>
          <div className="mb-3">
            <Select
              options={selectFaskes()}
              placeholder="Tipe Faskes"
              onChange={(e) =>
                setInputData({ ...inputData, faskes_type_uid: e.value })
              }
            />
          </div>
          <div className="mb-3">
            <Select
              options={selectBpjs()}
              placeholder="Bpjs Regional"
              onChange={(e) =>
                setInputData({ ...inputData, bpjs_regional_uid: e.value })
              }
            />
          </div>
        </>
      ) : (
        ""
      )}
      <div class="alert alert-primary mt-2" role="alert">
        <h6 style={{ fontWeight: "700" }}>Jenis Kerjasama</h6>
      </div>
      <div className="mb-3">
        <label htmlFor="" className="mb-1 fw-semibold">
          Jenis Kerjasama
        </label>
        <select
          name="type_collaboration"
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
        <div className="row mb-3">
          <div className="col-md-6 ">
            <div className="form-floating">
              <input
                type="number"
                name="revenue_sharing_iss"
                onChange={handleInputData}
                id=""
                className="form-control"
                placeholder="%"
              />
              <label htmlFor="">ISS</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="number"
                name="revenue_sharing_customer"
                onChange={handleInputData}
                placeholder="%"
                id=""
                className="form-control"
              />
              <label htmlFor="">Customer</label>
            </div>
          </div>
        </div>
      ) : jenisKerjasama === "JualPutus" ? (
        <div className="mb-3">
          <label htmlFor="" className="mb-1">
            Jual Putus
          </label>
          <select
            name="sell_disconect"
            id=""
            onChange={handleInputData}
            className="form-select"
          >
            <option value="">Select Chose</option>
            <option value="bhp">BHP</option>
            <option value="machine">Mesin</option>
          </select>
        </div>
      ) : (
        ""
      )}
      <div className="mb-5">
        <Select
          options={SelectCategory()}
          placeholder="Select Status"
          onChange={(e) =>
            setInputData({ ...inputData, category_type_uid: e.value })
          }
        />
      </div>
      <div class="alert alert-primary mt-4" role="alert">
        <h6 style={{ fontWeight: "700" }}>Term Kerjasama</h6>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          name="collaboration_period"
          id=""
          onChange={handleInputData}
          className="form-control"
          placeholder=""
        />
        <label htmlFor="">Jangka Waktu Kerjasama</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          name="price"
          id=""
          value={priceFormat}
          onChange={handleInputDataRP}
          className="form-control"
          placeholder=""
        />
        <label htmlFor="">Harga</label>
      </div>
      <div className="mb-3">
        <label htmlFor="" className="mb-1">
          Pemakaian BHP
        </label>
        <select
          name="bhp_usage"
          onChange={handleInputData}
          id=""
          className="form-select"
        >
          <option value="">Select Chose</option>
          <option value="single">Single</option>
          <option value="reuse">Reuse</option>
        </select>
      </div>
      <input
        type="hidden"
        value="customer"
        name="ppn"
        onChange={handleInputData}
      />
      <div>
        <label htmlFor="" className="mb-1">
          Ongkir
        </label>
        <select
          name="shipping_cost"
          onChange={handleInputData}
          id=""
          className="form-select"
        >
          <option value="">Select Chose</option>
          <option value="customer">Customer</option>
          <option value="iss">PT ISS</option>
        </select>
      </div>
      <div class="alert alert-primary mt-2" role="alert">
        <h6 style={{ fontWeight: "700" }}>Peralatan</h6>
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          name="ro"
          id=""
          onChange={handleInputData}
          className="form-control"
          placeholder=""
        />
        <label htmlFor="">RO (Kapasitas GPD)</label>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="form-floating mb-3">
            <input
              type="number"
              name="operate_mkhd_first_qty"
              onChange={handleInputData}
              id=""
              className="form-control"
              placeholder=""
            />
            <label htmlFor="">Operate MKHD 1 (unit)</label>
          </div>
        </div>
        <div className="col-6">
          <div className="form-floating mb-3">
            <input
              type="number"
              name="operate_mkhd_second_qty"
              onChange={handleInputData}
              id=""
              className="form-control"
              placeholder=""
            />
            <label htmlFor="">Operate MKHD 2 (unit)</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="form-floating mb-3">
            <input
              type="number"
              name="backup_mkhd_first_qty"
              onChange={handleInputData}
              id=""
              className="form-control"
              placeholder=""
            />
            <label htmlFor="">Back Up MKHD 1 (unit)</label>
          </div>
        </div>
        <div className="col-6">
          <div className="form-floating mb-3">
            <input
              type="number"
              name="backup_mkhd_second_qty"
              onChange={handleInputData}
              id=""
              className="form-control"
              placeholder=""
            />
            <label htmlFor="">Back Up MKHD 2 (unit)</label>
          </div>
        </div>
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          name="total_mesin_qty"
          value={resultMesin}
          onChange={handleInputData}
          id=""
          className="form-control"
          placeholder=""
        />
        <label htmlFor="">Total Mesin (unit)</label>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-floating mb-3">
            <input
              type="number"
              name="total_mesin_qty"
              id=""
              onChange={handleInputData}
              className="form-control"
              placeholder=""
            />
            <label htmlFor="">Kirim Qty Tahap 1 (unit)</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="">Tanggal Pengiriman Tahap 1</label>
            <input
              type="date"
              name="date_first_delivery"
              onChange={handleInputData}
              id=""
              className="form-control"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating mb-3">
            <input
              type="number"
              name="delivery_mkhd_first_qty"
              onChange={handleInputData}
              id=""
              className="form-control"
              placeholder="unit"
            />
            <label htmlFor="">Operate MKHD 1(unit)</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating mb-3">
            <input
              type="number"
              name="delivery_mkhd_second_qty"
              onChange={handleInputData}
              id=""
              className="form-control"
              placeholder="unit"
            />
            <label htmlFor="">Operate MKHD 2(unit)</label>
          </div>
        </div>
      </div>
      <div class="alert alert-primary mt-2" role="alert">
        <h6 style={{ fontWeight: "700" }}>Target</h6>
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          name="action_machine_per_month_qty"
          onChange={handleInputData}
          value={48}
          id=""
          className="form-control"
          placeholder=""
        />
        <label htmlFor="">Tindakan per mesin/ bulan</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          name="action_during_cooperation_qty"
          onChange={handleInputData}
          value={actionDuringCoperationQty}
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
        <select name="" id="" className="form-select" onChange={handleRab}>
          <option value="">Select Chose</option>
          <option value="yes">Ya</option>
          <option value="no">Tidak</option>
        </select>
      </div>
      {Rab === "yes" ? <DataTableRab Alkes={Alkes} NoAlkes={NoAlkes} /> : ""}
      <div className="mb-3">
        <label htmlFor="" className="mb-1 fw-bold">
          Support Selama Kerja Sama (Optional)
        </label>
        <select
          name="support"
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
          name="fee"
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
        <ReactQuill
          className="p-2"
          theme="snow"
          onChange={(value) =>
            handleInputData({
              target: { name: "postscript", value },
            })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="">Start Date</label>
        <input
          type="date"
          name="date_period"
          onChange={handleInputData}
          id=""
          className="form-control"
        />
      </div>
      <Timeline
        statusKerjaSama={inputData.category_type_uid}
        handleInputTimeline={handleInputTimeline}
      />
      <div className=" mt-2">
        <button className="btn btn-primary me-2" onClick={handleSubmit}>
          Simpan
        </button>
        <button className="btn btn-secondary">Kembali</button>
      </div>
    </Card.Body>
  );
};

export default InputLpp;
