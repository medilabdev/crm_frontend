import React from 'react'
import ReactQuill from 'react-quill'

const NewUnit = ({ handleInputData }) => {
  return (
    <div className='row'>
        <div className="col-md">
            <div class="header-box">
                NEW UNIT
            </div>
        </div>
        <div className="col-md-12">
            <div className="form-floating mb-3">
                  <input
                    type="number"
                    name="jumlah_unit"
                    placeholder=""
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
                    name="sistem_kerjasama"
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
                    name="sdm"
                    className="form-control"
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
                    onChange={(value) =>
                      handleInputData({
                        target: { name: "faskes_hd_lima_km", value },
                      })
                    }
                  />
                </div>
        </div>
        <div className="col-md-6">
            
        <div className="mb-2">
                  <h6 className="ms-2 mt-3">
                    Kapasitas Faskes HD Sekitar New Unit
                  </h6>
                  <ReactQuill
                    className="p-2"
                    theme="snow"
                    onChange={(value) =>
                      handleInputData({
                        target: {
                          name: "kapasistas_faskes_hd_sekitar_unit",
                          value,
                        },
                      })
                    }
                  />
                </div>
        </div>       
             
    </div>
  )
}

export default NewUnit