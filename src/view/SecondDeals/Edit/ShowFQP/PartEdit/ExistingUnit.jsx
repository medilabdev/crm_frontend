import React from 'react'

const ExistingUnit = ({ handleInputData, inputData, inputPrice, handleInputDataRP }) => {
  return (
    <div>
          <div class="header-box mt-2">
          EXISTING UNIT
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
    </div>
  )
}

export default ExistingUnit