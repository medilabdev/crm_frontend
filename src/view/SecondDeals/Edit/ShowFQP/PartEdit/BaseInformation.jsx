import React from 'react'

const BaseInformation = ({inputData, handleInputData}) => {
  return (
    <div>
        <div className="mb-3">
          <label htmlFor="floatingInput">
            <span className="text-danger fs-6 fw-bold">*</span> Nama Kepala
            Ruangan HD
          </label>
          <input
            type="text"
            className="form-control"
            name="head_name_hd_room"
            value={inputData.head_name_hd_room}
            onChange={handleInputData}
            required
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="floatingInput">
                <span className="text-danger fs-6 fw-bold">*</span> Nama Dokter
                Umum / Pelaksana HD
              </label>
              <input
                type="text"
                name="name_of_general_practitioner"
                value={inputData.name_of_general_practitioner}
                onChange={handleInputData}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="floatingInput">
                <span className="text-danger fs-6 fw-bold">*</span> Nama Dokter
                Konsulen / SpPD KGH
              </label>
              <input
                type="text"
                name="name_of_consular_doctor"
                value={inputData.name_of_consular_doctor}
                onChange={handleInputData}
                id=""
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="floatingInput">
                <span className="text-danger fs-6 fw-bold">*</span>
                No.Telp Perawat / Dokter
              </label>
              <input
                type="number"
                name="contact_person_nurse_or_doctor"
                value={inputData.contact_person_nurse_or_doctor}
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
                name="procurement_or_management_contact_person"
                value={inputData.procurement_or_management_contact_person}
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

export default BaseInformation