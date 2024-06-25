import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import ReactQuill from "react-quill";
import Select from "react-select";
import OverlayAddCompany from "../../../../components/Overlay/addCompany";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetDataRegionalBpjs } from "../../../../action/RegionalBpjs";
import { GetDataFaskes } from "../../../../action/DataFaskes";
import { CategoryType } from "../../../../action/CategoryType";
import EditRab from "../Lpp/Edit/EditRab";
import DataTableRab from "../Lpp/Rab";
import EditSupport from "../Lpp/Edit/EditSupport";
import EditFee from "../Lpp/Edit/EditFee";
import EditRekap from "../Lpp/Edit/EditRekap";
import EditTimeline from "../Lpp/Edit/EditTimeline";
import Swal from "sweetalert2"
import AddRegBPJS from "../Lpp/modals/addRegBPJS";
import AddTipeFaskes from "../Lpp/modals/AddTipeFaskes";

const EditLpp = ({ data, listCompany, uidDeals }) => {
  const uidLpp = data?.uid;
  const [dataLpp, setDataLpp] = useState(data);
  const [error, setError] = useState({
    categoryType:'',
    tindakanPerbulan:'',
    needApproval:''
  })
  const [showOverlay, setShowOverlay] = useState(false);
  const handleShow = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);

  const [showModalBpjs, setShowModalBpjs] = useState(false)
  const handleShowBpjs = () => setShowModalBpjs(true)
  const handleCloseBpjs = () => setShowModalBpjs(false)

  const [showModalFaskes, setShowModalFaskes] = useState(false)
  const handleShowFaskes = () => setShowModalFaskes(true)
  const handleCloseFaskes = () => setShowModalFaskes(false)

  const [actionMachinePerMonthQty, setActionMachinePerMonthQty] = useState(dataLpp?.action_machine_per_month_qty)

  const token = localStorage.getItem("token");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLpp({
      ...dataLpp,
      [name]: value,
    });
  };
  function handleInputTindakanPerbulan(e) {
    const newValue = parseInt(e.target.value, 10)
    setActionMachinePerMonthQty(newValue);
  }
  
  const customStyles = (error) => ({
    control: (provided) => ({
      ...provided,
      borderColor: error ? 'red' : provided.borderColor,
      '&:hover': {
        borderColor: error ? 'red' : provided['&:hover'].borderColor,
      },
    }),
  });

  const dispatch = useDispatch();
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
      // console.error("listResult is not an array or is not yet initialized.");
    }
    return result;
  };
  const { CategoryTypeData } = useSelector((state) => state.CategoryType);
  const { fasksesData } = useSelector((state) => state.DataFaskes);
  const { BpjsData } = useSelector((state) => state.BpjsRegional);
  const selectFaskes = () => {
    const result = [];
    if (Array.isArray(fasksesData)) {
      fasksesData.map((data) => {
        const finalResult = {
          label: `${data.name}` ,
          value: data.uid,
          type: data.company_type_uid,
        };
        result.push(finalResult);
      });
    } else {
      // console.error("listResult is not an array or is not yet initialized.");  
    }
    return result;
  };
  const selectBpjs = () => {
    const result = [];
    if (Array.isArray(BpjsData)) {
      BpjsData.map((data) => {
        const finalResult = {
          label: `${data.name_location} - (${data?.regional}) `,
          value: data.uid,
        };
        result.push(finalResult);
      });
    } else {
      // console.error("listResult is not an array or is not yet initialized.");
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
      // console.error("listResult is not an array or is not yet initialized.");
    }
    return result;
  };
  const [priceFormat, setPriceFormat] = useState(
    dataLpp !== null ? dataLpp?.price : 0
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
  const firstQty = parseFloat(
    dataLpp && dataLpp?.operate_mkhd_first_qty !== null
      ? dataLpp?.operate_mkhd_first_qty
      : ""
  );
  const secondQty = parseFloat(
    dataLpp && dataLpp?.operate_mkhd_second_qty !== null
      ? dataLpp?.operate_mkhd_second_qty
      : ""
  );
  const backUpOne = parseFloat(
    dataLpp && dataLpp?.backup_mkhd_first_qty !== null
      ? dataLpp.backup_mkhd_first_qty
      : 0 
  );
  const backUpTwo = parseFloat(
    dataLpp && dataLpp?.backup_mkhd_second_qty !== null
      ? dataLpp?.backup_mkhd_second_qty
      : 0
  );
  
  function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  function validateAndSetDefault(value, defaultValue) {
    return isNumeric(value) ? value : defaultValue;
  }
  const defaultQty = 0;

 const resultMesin = validateAndSetDefault(firstQty, defaultQty) + 
                    validateAndSetDefault(secondQty, defaultQty) + 
                    validateAndSetDefault(backUpTwo, defaultQty) + 
                    validateAndSetDefault(backUpOne, defaultQty);
  const actionDuringCoperationQty = (firstQty + secondQty) *  actionMachinePerMonthQty * 60;

  useEffect(() => {
    dispatch(GetDataRegionalBpjs(token));
    dispatch(GetDataFaskes(token));
    dispatch(CategoryType(token));
    
    const clearRab = () => {
      localStorage.removeItem("RAB")
    }
    const ClearEditRab = () => {
      localStorage.removeItem("rabEdit")
    }
    const ClearEditFee = () => {
      localStorage.removeItem("feeEdit")
    }
    const ClearEditSupport = () => {
      localStorage.removeItem("supportEdit")
    }

    window.addEventListener("beforeunload", clearRab)
    window.addEventListener("beforeunload", ClearEditRab);
    window.addEventListener("beforeunload", ClearEditFee);
    window.addEventListener("beforeunload", ClearEditSupport);

    return () => {
      window.addEventListener("beforeunload", clearRab)
      window.addEventListener("beforeunload", ClearEditRab);
      window.addEventListener("beforeunload", ClearEditFee);
      window.addEventListener("beforeunload", ClearEditSupport);
    };

  }, [dispatch]);

  const [TimelineData, setTimelineData] = useState(data?.timeline)
  const handleChangeTimeline = (index, valueIndex) => {
    const newData = [...TimelineData];
    newData[index][valueIndex] = newData[index][valueIndex] === "1" ? "0" : "1";
    setTimelineData(newData);
  };

  let RabData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("rabEdit")) {
      const data = JSON.parse(localStorage.getItem(key));
      RabData.push(data);
    }
  }

  let SupportData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("supportEdit")) {
      const data = JSON.parse(localStorage.getItem(key));
      SupportData.push(data);
    }
  }

  let FeeData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("feeEdit")) {
      const data = JSON.parse(localStorage.getItem(key));
      FeeData.push(data);
    }
  }

  const handleUpdate = async(e) => {
    e.preventDefault()
    let valid = true
    const newErrors = {categoryType:'', tindakanPerbulan:'', needApproval:''}
    if(actionMachinePerMonthQty < 48){
      newErrors.tindakanPerbulan = 'tindakan harus lebih atau sama dengan 48'
      Swal.fire({
        text: "Value Tindakan per mesin/bulan harus lebih atau sama dengan 48 ",
        icon: "warning",
      });
      valid=false
    }
    if(!dataLpp.category_type_uid){
      newErrors.categoryType = 'Status Wajib Dipilih'
      Swal.fire({
        text: "Status Wajib Dipilih",
        icon: "warning",
      });
      valid=false
    }
    if(!dataLpp.is_validate){
      newErrors.needApproval = 'Wajib Dipilih!'
      Swal.fire({
        text: "Terdapat Form yang belum diisi",
        icon: "warning",
      })
      valid=false
    }
    setError(newErrors)
    if(!valid) return;
    try {
      let timerInterval
      const { isConfirmed } = await Swal.fire({
        title: "Apakah kamu yakin untuk menyimpan?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });
      if(isConfirmed){
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
        formData.append("deals_uid", uidDeals)
        formData.append("customer_name_uid", dataLpp?.customer_name_uid || "");
        formData.append("faskes_type_uid", dataLpp?.faskes_type_uid || "");
        formData.append("bpjs_regional_uid", dataLpp?.bpjs_regional_uid || "");
        formData.append("type_collaboration", dataLpp?.type_collaboration || "");
        formData.append("revenue_sharing_iss", dataLpp?.revenue_sharing_iss || "")
        formData.append("revenue_sharing_customer", dataLpp?.revenue_sharing_customer || "")
        formData.append("category_type_uid", dataLpp?.category_type_uid || "")
        formData.append("sell_disconect", dataLpp?.sell_disconect || "")
        formData.append("collaboration_period", dataLpp?.collaboration_period || "")
        if (typeof priceFormat === 'string') {
          const inputValueWithoutDot = priceFormat.replace(/\./g, "");
          formData.append("price", inputValueWithoutDot || ""); 
        } else {
          formData.append("price", dataLpp?.price || ""); 
        }
        formData.append("bhp_usage", dataLpp?.bhp_usage || "")
        formData.append("ppn", "Customer")
        formData.append("shipping_cost", dataLpp?.shipping_cost || "")
        formData.append("ro", dataLpp?.ro || "");
        formData.append(
          "operate_mkhd_first_qty",
          dataLpp?.operate_mkhd_first_qty || ""
        );
        formData.append(
          "operate_mkhd_second_qty",
          dataLpp?.operate_mkhd_second_qty || ""
        );
        formData.append(
          "backup_mkhd_first_qty",
          dataLpp?.backup_mkhd_first_qty || ""
        );
        formData.append(
          "backup_mkhd_second_qty",
          dataLpp?.backup_mkhd_second_qty || ""
        );
        formData.append(
          "delivery_mkhd_first_qty",
          dataLpp?.delivery_mkhd_first_qty || ""
        );
        formData.append(
          "delivery_mkhd_second_qty",
          dataLpp?.delivery_mkhd_second_qty || ""
        );
        formData.append("total_mesin_qty", dataLpp?.total_mesin_qty || "")
        formData.append("date_first_delivery", dataLpp?.date_first_delivery || "")
        formData.append("action_machine_per_month_qty", actionMachinePerMonthQty|| "")
        formData.append("action_during_cooperation_qty", actionDuringCoperationQty)
        formData.append("postscript", dataLpp?.postscript || "")

        if (Array.isArray(RabData[0]) && RabData[0].length > 0) {
          RabData[0].forEach((rab, index) => {
            formData.append(`rab[${index}][item_uid]`, rab?.item_uid || "");
            formData.append(`rab[${index}][is_alkes]`, rab?.is_alkes || "");
            formData.append(
              `rab[${index}][estimated_cost]`,
              rab?.estimated_cost || ""
            );
            formData.append(`rab[${index}][qty]`, rab?.qty || "");
            formData.append(
              `rab[${index}][total_price]`,
              rab?.total_estimated_cost || ""
            );
            formData.append(`rab[${index}][realization_note]`, rab?.realization_note || "");
          });
        }
        if (Array.isArray(SupportData[0]) && SupportData[0].length > 0) {
          SupportData[0].forEach((support, index) => {
            formData.append(`support[${index}][item_uid]`, support?.item_uid || "");
            formData.append(
              `support[${index}][estimated_cost]`,
              support?.estimated_cost || ""
            );
            formData.append(`support[${index}][qty]`, support?.qty || "");
            formData.append(
              `support[${index}][total_price]`,
              support?.total_estimated_cost || ""
            );
            formData.append(`support[${index}][realization_note]`, support?.realization_note || "");
          });
        }

        if (Array.isArray(FeeData[0]) && FeeData[0].length > 0) {
          FeeData[0].forEach((fee, index) => {
            formData.append(`fee[${index}][recieve_name]`, fee?.recieve_name || "");
            formData.append(
              `fee[${index}][value]`,
              fee?.value || ""
            );
            formData.append(`fee[${index}][qty]`, fee?.qty || "");
            formData.append(
              `fee[${index}][total_price]`,
              fee?.total || ""
            );
            formData.append(`fee[${index}][realization_note]`, fee?.realization_note || "");
          });
        }
        formData.append("date_period", dataLpp?.date_period || "")
        if(Array.isArray(TimelineData) && TimelineData.length > 0){
          TimelineData.forEach((time, index) => {
            
            formData.append(
              `timeline[${index}][name]`,
              index === 0 ? 
                (dataLpp?.category_type_uid === "hs_L0YxrtdK1" ? "Replace" : 
                  (dataLpp?.category_type_uid === "ls_Y7hsg13Gg" ? "New HD" : "Expand")) 
              : 
                time?.name
            );            
            formData.append(`timeline[${index}][1]`, time?.[0] || 0)
            formData.append(`timeline[${index}][2]`, time?.[1] || 0)
            formData.append(`timeline[${index}][3]`, time?.[2] || 0)
            formData.append(`timeline[${index}][4]`, time?.[3] || 0)
            formData.append(`timeline[${index}][5]`, time?.[4] || 0)
            formData.append(`timeline[${index}][6]`, time?.[5] || 0)
            formData.append(`timeline[${index}][7]`, time?.[6] || 0)
            formData.append(`timeline[${index}][8]`, time?.[7] || 0)
            formData.append(`timeline[${index}][9]`, time?.[8] || 0)
            formData.append(`timeline[${index}][10]`, time?.[9] || 0)
            formData.append(`timeline[${index}][11]`, time?.[10] || 0)
            formData.append(`timeline[${index}][12]`, time?.[11] || 0)
          })
        }
        formData.append('is_validate', dataLpp.is_validate)
        formData.append("_method", "put")
        for (const pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
       const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/v2/lpp-document/${uidLpp}`, formData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
       })
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
          text: "Error: " + error.message,
          icon: "error",
        });
      }
    }
  }
  return (
    <Card.Body>
      <div class="alert alert-primary mt-2" role="alert">
        <h6 style={{ fontWeight: "700" }}>Customer</h6>
      </div>
      <div className=" mb-3">
        <Select
          placeholder="Select Customer"
          options={selectCompany()}
          value={selectCompany().find(
            (e) => e.value === dataLpp.customer_name_uid
          )}
          onChange={(selected) =>
            setDataLpp({
              ...dataLpp,
              customer_name_uid: selected.value,
              type: selected.type,
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
      {dataLpp && dataLpp.type !== "D8iidh2341sf_kJ" ? (
        <>
          <div className="mb-3">
            <Select
              placeholder="Tipe Faskes"
              options={selectFaskes()}
              value={selectFaskes().find(
                (e) => e.value === dataLpp.faskes_type_uid
              )}
              onChange={(e) =>
                setDataLpp({ ...dataLpp, faskes_type_uid: e.value })
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
              placeholder="Bpjs Regional"
              options={selectBpjs()}
              value={selectBpjs().find(
                (e) => e.value === dataLpp.bpjs_regional_uid
              )}
              onChange={(e) =>
                setDataLpp({ ...dataLpp, bpjs_regional_uid: e.value })
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
          value={dataLpp?.type_collaboration || ""}
          className="form-select"
          onChange={handleChange}
        >
          <option value="">Select Chose</option>
          <option value="RevenueSharing">Revenue Sharing</option>
          <option value="JualPutus">Jual Putus</option>
          <option value="KSO">KSO</option>
        </select>
      </div>
      {dataLpp?.type_collaboration === "RevenueSharing" ? (
        <div className="row mb-3">
          <div className="col-md-6 ">
            <div className="form-floating">
              <input
                type="number"
                name="revenue_sharing_iss"
                value={dataLpp?.revenue_sharing_iss || ""}
                onChange={handleChange}
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
                value={dataLpp?.revenue_sharing_customer || ""}
                placeholder="%"
                onChange={handleChange}
                id=""
                className="form-control"
              />
              <label htmlFor="">Customer</label>
            </div>
          </div>
        </div>
      ) : dataLpp?.type_collaboration === "JualPutus" ? (
        <div className="mb-3">
          <label htmlFor="" className="mb-1">
            Jual Putus
          </label>
          <select
            name="sell_disconect"
            value={dataLpp?.sell_disconect || ""}
            onChange={handleChange}
            id=""
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
            <span className="text-danger">*</span>Pilih Status
          </label>
        <Select
          options={SelectCategory()}
          placeholder="Select Status"
          value={SelectCategory().find(
            (e) => e.value === dataLpp?.category_type_uid
          )}
          onChange={(e) =>
            setDataLpp({ ...dataLpp, category_type_uid: e.value })
          }
          styles={customStyles(!!error.categoryType)}
          className={error.categoryType ? 'is-invalid' : ''}
        />
          {error && <div className="invalid-feedback">{error.categoryType}</div>}
      </div>
      <div class="alert alert-primary mt-4" role="alert">
        <h6 style={{ fontWeight: "700" }}>Term Kerjasama</h6>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          name="collaboration_period"
          value={dataLpp?.collaboration_period || ""}
          onChange={handleChange}
          id=""
          className="form-control"
          placeholder=""
        />
        <label htmlFor="">Jangka Waktu Kerjasama</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          name="price"
          value={priceFormat}
          onChange={handleInputDataRP}
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
        <select
          name="bhp_usage"
          id=""
          value={dataLpp?.bhp_usage || ""}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select Chose</option>
          <option value="single">Single</option>
          <option value="reuse">Reuse</option>
        </select>
      </div>
      <input type="hidden" value="customer" name="ppn" />
      <div>
        <label htmlFor="" className="mb-1">
          Ongkir
        </label>
        <select
          name="shipping_cost"
          id=""
          value={dataLpp?.shipping_cost || ""}
          onChange={handleChange}
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
          value={dataLpp?.ro || ""}
          onChange={handleChange}
          id=""
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
              value={dataLpp?.operate_mkhd_first_qty || ""}
              onChange={handleChange}
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
              value={dataLpp?.operate_mkhd_second_qty || ""}
              onChange={handleChange}
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
              value={dataLpp?.backup_mkhd_first_qty || ""}
              onChange={handleChange}
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
              value={dataLpp?.backup_mkhd_second_qty || ""}
              onChange={handleChange}
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
              value={dataLpp?.total_mesin_qty || ""}
              onChange={handleChange}
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
              value={dataLpp?.date_first_delivery || ""}
              onChange={handleChange}
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
              value={dataLpp?.delivery_mkhd_first_qty || ""}
              onChange={handleChange}
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
              value={dataLpp?.delivery_mkhd_second_qty || ""}
              onChange={handleChange}
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
          onChange={handleInputTindakanPerbulan}
          value={actionMachinePerMonthQty}
          id=""
          className={`form-control ${error.tindakanPerbulan ? 'is-invalid' : ''}`}
          placeholder=""
        />
        <label htmlFor="">Tindakan per mesin/ bulan</label>
        {error.tindakanPerbulan && <div className="invalid-feedback">{error.tindakanPerbulan}</div>}
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          name="action_during_cooperation_qty"
          value={actionDuringCoperationQty}
          id=""
          className="form-control"
          placeholder=""
        />
        <label htmlFor="">Tindakan Selama Bekerja Sama</label>
      </div>
      <div className="mb-2">
      <EditRab data={dataLpp?.rab} dataSupport={dataLpp?.support} dataFee={dataLpp?.fee} />
      </div>
      {/* <div className="mb-2">
      <EditSupport data={dataLpp?.support} />
      </div>
      <div className="mb-2">
      <EditFee data={dataLpp?.fee} />
      </div> */}
      {/* <div className="mb-2">
        <EditRekap />
      </div> */}
      <div className="mb-2">
        <h6 className="fw-bold ms-2 mt-3">Catatan Tambahan</h6>
        <ReactQuill
          className="p-2"
          theme="snow"
          onChange={(value) =>
            handleChange({
              target: { name: "postscript", value },
            })
          }
          value={dataLpp?.postscript || ""}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="">Start Date</label>
        <input
          type="date"
          name="date_period"
          id=""
          value={dataLpp?.date_period || ""}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <EditTimeline data={dataLpp?.timeline} handleChangeTimeline={handleChangeTimeline}  CategoryData={dataLpp?.category_type_uid} />
      <div className="mb-3">
          <label htmlFor="" className="mb-1">
           <span className="text-danger fw-bold">*</span> Apakah membutuhkan approval untuk ke stage selanjutnya ? 
          </label>
          <select
            name="is_validate"
            id=""
            onChange={handleChange}
            className={`form-select ${error.needApproval ? 'is-invalid' :''}`}
          >
            <option value="">Select Choose</option>
            <option value="yes">Iya</option>
            <option value="no">Tidak</option>
          </select>
          {error.needApproval && <div className="invalid-feedback">{error.needApproval}</div>}
        </div>
      <div className=" mt-2">
        <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
        <a className="btn btn-secondary" href="/">Kembali</a>
      </div>
    </Card.Body>
  );
};

export default EditLpp;
