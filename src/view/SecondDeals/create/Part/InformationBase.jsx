import React from 'react'

const InformationBase = ({ handleInputData }) => {
  return (
    <div>
         <div className="mb-3">
                  <label htmlFor="floatingInput">
                    <span className="text-danger fs-6 fw-bold">*</span> Nama
                    Kepala Ruangan HD{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name_kepala_ruangan_hd"
                    onChange={handleInputData}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="floatingInput">
                        <span className="text-danger fs-6 fw-bold">*</span> Nama
                        Dokter Umum / Pelaksana HD
                      </label>
                      <input
                        type="text"
                        name="name_dokter_umum_or_hd"
                        id=""
                        onChange={handleInputData}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="floatingInput">
                        <span className="text-danger fs-6 fw-bold">*</span> Nama
                        Dokter Konsulen / SpPD KGH
                      </label>
                      <input
                        type="text"
                        name="name_dokter_konsulen_or_sppd"
                        onChange={handleInputData}
                        id=""
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="floatingInput">
                        <span className="text-danger fs-6 fw-bold">*</span>
                        No.Telp Perawat / Dokter
                      </label>
                      <input
                        type="number"
                        name="no_telp_perawat_or_dokter"
                        onChange={handleInputData}
                        id=""
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="floatingInput">
                        <span className="text-danger fs-6 fw-bold">*</span>
                        No.Telp Pengadaan / Manajemen
                      </label>
                      <input
                        type="number"
                        name="no_telp_pengadaan_manajemen"
                        onChange={handleInputData}
                        id=""
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
    </div>
  )
}

export default InformationBase