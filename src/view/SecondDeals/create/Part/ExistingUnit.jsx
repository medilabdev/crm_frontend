import React from 'react'

const ExistingUnit = ({ handleInputData, inputValue, handleInputDataRP }) => {
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
    </div>
  )
}

export default ExistingUnit