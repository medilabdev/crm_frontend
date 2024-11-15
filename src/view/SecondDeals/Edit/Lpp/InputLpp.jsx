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
import AddRegBPJS from "./modals/addRegBPJS";
import AddTipeFaskes from "./modals/AddTipeFaskes";

const InputLpp = ({ data, listCompany, uidDeals }) => {
  const uidPerson = localStorage.getItem("uid");
  const [inputData, setInputData] = useState(
    data?.lpp_document ? data.lpp_document : []
  );
  const [tindakanPerbulan, setTindakanPerbulan ] = useState(48)
  const [jenisKerjasama, setJenisKerjaSama] = useState();
  const [Rab, setRab] = useState([]);
  const [feeAction, setFeeAction] = useState([]);
  const [supportKerjaSama, setSupportKerjaSama] = useState([]);
  const [error, setError] = useState({
    tindakanPerbulan:'',
    categoryType:''
  })

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

  const [showModalBpjs, setShowModalBpjs] = useState(false)
  const handleShowBpjs = () => setShowModalBpjs(true)
  const handleCloseBpjs = () => setShowModalBpjs(false)

  const [showModalFaskes, setShowModalFaskes] = useState(false)
  const handleShowFaskes = () => setShowModalFaskes(true)
  const handleCloseFaskes = () => setShowModalFaskes(false)
  
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

  function handleInputTindakanPerbulan(e) {
    const newValue = parseInt(e.target.value, 10)
      setTindakanPerbulan(newValue);
  }
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
          label: `${data.name_location} - (${data?.regional})`,
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
  function isNumeric(value){
    return !isNaN(parseFloat(value)) && isFinite(value)
  }
  function validateAndSetDefault(value, defaultValue){
    return isNumeric(value) ? value : defaultValue
  }
  const defaultQty = 0
  const resultMesin = validateAndSetDefault(firstQty, defaultQty) + validateAndSetDefault(secondQty, defaultQty) + validateAndSetDefault(backUpOne, defaultQty) + validateAndSetDefault(backUpTwo, defaultQty) 

  
  const actionDuringCoperationQty = (firstQty + secondQty) * tindakanPerbulan * (inputData.collaboration_period * 12);

  let tempSupport = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("SupportKerjaSama")) {
      const data = JSON.parse(localStorage.getItem(key));
      tempSupport.push(data);
    }
  }

  let FeeData = [];
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

 
  const [inputTimeline, setInputTimeline] = useState([]);
 

  const handleInputTimeline = (event, processIndex, weekIndex) => {
    const isChecked = event.target.checked ? 1 : 0;
    const newTimeline = {
      ...inputTimeline,
      [`timeline[${processIndex}][${weekIndex}]`]: isChecked,
    };
    setInputTimeline(newTimeline);
  };
  const processNames = [
    "Renovasi",
    "Kirim Mesin",
    "Install Mesin",
    "Izin HD & BPJS",
    "Training",
    "1st Running Patient",
  ];

  console.log(inputTimeline);
  
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


  const customStyles = (error) => ({
    control: (provided) => ({
      ...provided,
      borderColor: error ? 'red' : provided.borderColor,
      '&:hover': {
        borderColor: error ? 'red' : provided['&:hover'].borderColor,
      },
    }),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newError = {tindakanPerbulan:'', categoryType:''}
    if(tindakanPerbulan < 48){
      newError.tindakanPerbulan = 'tindakan harus lebih atau sama dengan 48'
      Swal.fire({
        text: "Value Tindakan per mesin/bulan harus lebih atau sama dengan 48 ",
        icon: "warning",
      });
      valid = false;
    }
    if(!inputData.category_type_uid){
      newError.categoryType = 'Status Wajib dipilih'
      Swal.fire({
        text: "Category Jenis Kerja Sama Wajib Diisi ",
        icon: "warning",
      });
      valid = false;
    }
    setError(newError);
    if(!valid) return;

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
        formData.append("customer_name_uid", data?.fqp_document?.hospital_uid || "");
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
          "stage_first_delivery_qty",
          inputData.stage_first_delivery_qty || ""
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
          tindakanPerbulan || ""
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
            let valueFee = (fee?.nilai ? fee.nilai.toString().replace(/\./g, "") : "");
            formData.append(`fee[${index}][value]`, valueFee || "");
            formData.append(`fee[${index}][qty]`, fee?.qty || "");
            formData.append(`fee[${index}][total_price]`, fee?.total || "");
            formData.append(`fee[${index}][realization_note]`, fee?.note || "");
          });
        }
        
        formData.append("postscript", inputData.postscript || "");

        formData.append("timeline[0][name]", categoryType || "");
        for (let weekIndex = 1; weekIndex <= 12; weekIndex++) {
          formData.append(
            `timeline[0][${weekIndex}]`,
            inputTimeline[`timeline[0][${weekIndex}]`] || 0
          );
        }
        processNames.forEach((processName, processIndex) => {
          const actualIndex = processIndex + 1; // Mulai dari 1 untuk proses tambahan
      
          // Tambahkan nama proses ke FormData
          formData.append(`timeline[${actualIndex}][name]`, processName);
      
          // Tambahkan data mingguan untuk setiap proses
          for (let weekIndex = 1; weekIndex <= 12; weekIndex++) {
            formData.append(
              `timeline[${actualIndex}][${weekIndex}]`,
              inputTimeline[`timeline[${actualIndex}][${weekIndex}]`] || 0
            );
          }
        });
        formData.append("date_period", inputData.date_period || "");
        for (const pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
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
      <div class="header-box">
                  CUSTOMER
      </div>
      <div className=" mb-3">
      <div className="form-floating mb-3">
        <input
          type="text"
          name="price"
          id=""
          value={data?.fqp_document?.hospital?.name  + " ( " + data?.fqp_document?.hospital?.company_type?.name + " ) " }
          className="form-control"
          placeholder=""
          disabled={true}
        />
        <label htmlFor="">Customer</label>
      </div>
        {/* <Select
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
        </button> */}
        <OverlayAddCompany visible={showOverlay} onClose={handleClose} />
      </div>
      {data?.fqp_document && data?.fqp_document?.hospital?.company_type_uid !== "D8iidh2341sf_kJ" ? (
        <>
          <div className="mb-3">
            <Select
              options={selectFaskes()}
              placeholder="Tipe Faskes"
              onChange={(e) =>
                setInputData({ ...inputData, faskes_type_uid: e.value })
              }
            />
             <div className="form-text">
            Jika Data Tidak Ada Tipe Faskes Klik 
            <button
          className="form-text text-primary fw-semibold border-0 "
          onClick={handleShowFaskes}
        >
          Tambah Tipe Faskes
        </button>
        <AddTipeFaskes show={showModalFaskes} handleClose={handleCloseFaskes} />
            </div>
          </div>
          <div className="mb-3">
            <Select
              options={selectBpjs()}
              placeholder="Bpjs Regional"
              onChange={(e) =>
                setInputData({ ...inputData, bpjs_regional_uid: e.value })
              }
            />
            <div className="form-text">
            Jika Data Tidak Ada BPJS Regional Klik 
            <button
          className="form-text text-primary fw-semibold border-0 "
          onClick={handleShowBpjs}
        >
          Tambah BPJS Regional
        </button>
        <AddRegBPJS show={showModalBpjs} handleClose={handleCloseBpjs} />
            </div>
          </div>
          
        </>
      ) : (
        ""
      )}
      <div class="header-box mt-4">
                  JENIS KERJASAMA 
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
      <label htmlFor="" className="mb-1">
           <span className="text-danger">*</span> Pilih Status
          </label>
        <Select
          options={SelectCategory()}
          placeholder="Select Status"
          onChange={(e) =>
            setInputData({ ...inputData, category_type_uid: e.value })
          }
          className={error.categoryType ? 'is-invalid' : ''}
          styles={customStyles(!!error.categoryType)}
        />
         {error && <div className="invalid-feedback">{error.categoryType}</div>}
      </div>
      <div class="header-box mt-4">
                  JANGKA WAKTU KERJASAMA 
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

      <div class="header-box mt-4">
                  PERALATAN 
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
              name="stage_first_delivery_qty"
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
      <div class="header-box mt-4">
                  TARGET 
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          name="action_machine_per_month_qty"
          onChange={handleInputTindakanPerbulan}
          value={tindakanPerbulan}
          id=""
          className={`form-control ${error.tindakanPerbulan ? 'is-invalid' : ''}`}
          placeholder=""
        />
        <label htmlFor="">Tindakan per mesin/ bulan</label>
        {error && <div className="invalid-feedback">{error.tindakanPerbulan}</div>}
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
     
      <DataTableRab rab={Rab} handleRab={handleRab} supportKerjaSama={supportKerjaSama} handleSupportKerjaSama={handleSupportKerjaSama} feeAction={feeAction} handleFeeAction={handleFeeAction}/>
 
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
