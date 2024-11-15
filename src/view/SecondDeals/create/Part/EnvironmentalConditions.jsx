import React from 'react'

const EnvironmentalConditions = ({ handleInputData }) => {
  return (
    <div className=''>
         <div class="header-box mt-2">
                KEADAAN LINGKUNGAN
            </div>
            <div className="row">
             <div className="mb-3 col-md-6">
                  <label htmlFor="" className="mb-1">
                    Banjir
                  </label>
                  <select
                    name="is_banjir"
                    id=""
                    onChange={handleInputData}
                    className="form-select"
                  >
                    <option value="">Select Choose</option>
                    <option value="yes">Ya</option>
                    <option value="no">Tidak</option>
                  </select>
             </div>
             <div className="mb-3 col-md-6">
                  <label htmlFor="" className="mb-1">
                    Dekat Laut (Kurang dari 5km)
                  </label>
                  <select
                    name="dekat_laut"
                    id=""
                    onChange={handleInputData}
                    className="form-select"
                  >
                    <option value="">Select Choose</option>
                    <option value="yes">Ya</option>
                    <option value="no">Tidak</option>
                  </select>
            </div>
            <div className="mb-3 col-md-6">
                  <label htmlFor="" className="mb-1">
                    Ketersedian SDM
                  </label>
                  <select
                    name="ketersedian_sdm"
                    id=""
                    onChange={handleInputData}
                    className="form-select"
                  >
                    <option value="">Select Choose</option>
                    <option value="available">Ada</option>
                    <option value="not_yet_available">Tidak</option>
                  </select>
                </div>
            <div className="mb-3 col-md-6">
                  <label htmlFor="" className="mb-1">
                    Akses Transportasi / Logistik
                  </label>
                  <select
                    name="akses_transportasi"
                    id=""
                    onChange={handleInputData}
                    className="form-select"
                  >
                    <option value="">Select Choose</option>
                    <option value="easy">Mudah</option>
                    <option value="difficult">Sulit</option>
                  </select>
                </div>
                </div>
    </div>
  )
}

export default EnvironmentalConditions