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
  const [jenisKerjasama, setJenisKerjaSama] = useState();
  const [Rab, setRab] = useState();
  const [feeAction, setFeeAction] = useState();
  const [supportKerjaSama, setSupportKerjaSama] = useState();
  const [inputData, setInputData] = useState(data?.lpp_document);
  const [showOverlay, setShowOverlay] = useState(false);
  const [priceFormat, setPriceFormat] = useState("");
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

  useEffect(() => {
    dispatch(GetDataFaskes(token));
    dispatch(GetDataRegionalBpjs(token));
    dispatch(CategoryType(token));
  }, [dispatch]);

  const firstQty = parseFloat(inputData.operate_mkhd_first_qty);
  const secondQty = parseFloat(inputData.operate_mkhd_second_qty);
  const backUpOne = parseFloat(inputData.backup_mkhd_first_qty);
  const backUpTwo = parseFloat(inputData.backup_mkhd_second_qty);
  const resultMesin = firstQty + secondQty + backUpTwo + backUpOne;
  const actionDuringCoperationQty = (firstQty + secondQty) * 48 * 60;

  const SupportData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("SupportKerjaSama")) {
      const data = JSON.parse(localStorage.getItem(key));
      SupportData.push(data);
    }
  }
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

        formData.append("is_support", supportKerjaSama || "");
        // SupportData[0].forEach((support, index) => {
        //   formData.append(`support[${index}][item_uid]`, support.item || "");
        //   formData.append(
        //     `support[${index}][estimated_cost]`,
        //     support.nilai_estimasi_biaya || ""
        //   );
        //   formData.append(`support[${index}][qty]`, support.qty || "");
        //   formData.append(
        //     `support[${index}][realization_note]`,
        //     support.note || ""
        //   );
        // });

        formData.append("postscript", inputData.postscript || "");
        formData.append("is_rab", Rab || "");
        formData.append("is_fee", feeAction || "");
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
  const [dataRab, setDataRab] = useState([]);
  const [totalRab, setTotalRab] = useState(0);
  useEffect(() => {
    const rabFromLocalStorage = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("RAB")) {
        const data = JSON.parse(localStorage.getItem(key));
        rabFromLocalStorage.push(data);
      }
    }
    setDataRab(rabFromLocalStorage);
  }, [localStorage]); // useEffect akan dijalankan ketika localStorage berubah

  useEffect(() => {
    let totalPrice = 0;
    if (dataRab.length > 0) {
      dataRab.forEach((data) => {
        totalPrice += data.reduce(
          (subtotal, item) => subtotal + item.total_estimasi_biaya,
          0
        );
      });
    }
    setTotalRab(totalPrice);
  }, [dataRab]);
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
          value={selectCompany().find(
            (e) => e.value === inputData.customer_name_uid || ""
          )}
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
      {inputData.type !== "D8iidh2341sf_kJ" ? (
        <>
          <div className="mb-3">
            <Select
              options={selectFaskes()}
              placeholder="Tipe Faskes"
              onChange={(e) =>
                setInputData({ ...inputData, faskes_type_uid: e.value })
              }
              value={selectFaskes().find(
                (e) => e.value === inputData.faskes_type_uid || ""
              )}
            />
          </div>
          <div className="mb-3">
            <Select
              options={selectBpjs()}
              placeholder="Bpjs Regional"
              onChange={(e) =>
                setInputData({ ...inputData, bpjs_regional_uid: e.value })
              }
              value={selectBpjs().find(
                (e) => e.value === inputData.bpjs_regional_uid || ""
              )}
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
          value={inputData.type_collaboration || ""}
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
      {Rab === "yes" ? <DataTableRab /> : ""}
      <div className="mb-3">
        <label htmlFor="" className="mb-1 fw-bold">
          Support Selama Kerja Sama (Optional)
        </label>
        <select
          name="support"
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
          name=""
          onChange={handleInputData}
          id=""
          className="form-control"
        />
      </div>
      <Timeline
        statusKerjaSama={inputData.category_type_uid}
        className="mb-3"
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
