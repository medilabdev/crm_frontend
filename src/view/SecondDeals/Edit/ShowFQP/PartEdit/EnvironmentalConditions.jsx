import React from 'react'

const EnvironmentalConditions = ({ inputData, handleInputData }) => {
  return (
    <div>
        <div class="header-box mt-2">
                KEADAAN LINGKUNGAN
            </div>
            <div className="row">
          <div className="col-md-6 mb-3">
              <label htmlFor="" className="mb-1">
                Banjir
              </label>
                <select
                  name="cataclysm"
                  id=""
                  value={inputData.cataclysm || ""}
                  onChange={handleInputData}
                  className="form-select"
                >
                  <option value="">Select Choose</option>
                  <option value="yes">Ya</option>
                  <option value="no">Tidak</option>
                </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="" className="mb-1">
              Dekat Laut (Kurang dari 5km)
            </label>
            <select
              name="near_the_sea"
              id=""
              value={inputData.near_the_sea || ""}
              onChange={handleInputData}
              className="form-select"
            >
              <option value="">Select Choose</option>
              <option value="yes">Ya</option>
              <option value="no">Tidak</option>
            </select>
          </div>
          <div className="col-md-6">
          <label htmlFor="" className="mb-1">
            Ketersedian SDM
          </label>
          <select
            name="availability_of_human_resource"
            id=""
            value={inputData.availability_of_human_resource || ""}
            onChange={handleInputData}
            className="form-select"
          >
            <option value="">Select Choose</option>
            <option value="available">Ada</option>
            <option value="not_yet_available">Tidak</option>
          </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="" className="mb-1">
              Akses Transportasi / Logistik
            </label>
            <select
              name="access_to_transportation"
              id=""
              value={inputData.access_to_transportation || ""}
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