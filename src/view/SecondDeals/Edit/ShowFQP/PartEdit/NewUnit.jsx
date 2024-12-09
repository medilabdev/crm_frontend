import React from 'react'
import ReactQuill from 'react-quill'

const NewUnit = ({ inputData, handleInputData}) => {
  return (
    <div>
         <div class="header-box">
                NEW UNIT
            </div>
         <div className="row">
          <div className="col-md-12">
            <div className="form-floating mb-3">
              <input
                type="number"
                name="total_of_machine_unit"
                placeholder=""
                value={inputData.total_of_machine_unit || ""}
                onChange={handleInputData}
                id=""
                className="form-control"
              />
              <label htmlFor="">Jumlah Unit</label>
             </div>
          </div>
          <div className="col-md-6">
              <div className="mb-3">
              <label htmlFor="" className="mb-1">
                Sistem Kerja Sama
              </label>
              <select
                name="cooperation_system"
                value={inputData.cooperation_system || ""}
                onChange={handleInputData}
                id=""
                className="form-control"
              >
                <option value="">Select Chose</option>
                <option value="buy">Buy</option>
                <option value="kso">Kso</option>
                <option value="etc">Lainnya</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
              <div className="mb-3">
              <label htmlFor="" className="mb-1">
                SDM
              </label>
              <select
                name="human_resources"
                className="form-control"
                value={inputData.human_resources || ""}
                onChange={handleInputData}
              >
                <option value="">Select Chose</option>
                <option value="available">Tersedia</option>
                <option value="not_yet_available">Belum Tersedia</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
              <div className="mb-2">
              <h6 className="ms-2 mt-3">Faskes HD 5 km sekitar New Unit</h6>
              <ReactQuill
                className="p-2"
                theme="snow"
                value={inputData.hd_health_facilities_arround || ""}
                onChange={(value) =>
                  handleInputData({
                    target: { name: "hd_health_facilities_arround", value },
                  })
                }
              />
            </div>
          </div>
          <div className="col-md-6">
          <div className="mb-2">
          <h6 className="ms-2 mt-3">Kapasitas Faskes HD Sekitar New Unit</h6>
          <ReactQuill
            className="p-2"
            theme="snow"
            value={inputData.hd_health_facilities_capacity_approximately || ""}
            onChange={(value) =>
              handleInputData({
                target: {
                  name: "hd_health_facilities_capacity_approximately",
                  value,
                },
              })
            }
          />
        </div>
          </div>
        </div>
    </div>
  )
}

export default NewUnit