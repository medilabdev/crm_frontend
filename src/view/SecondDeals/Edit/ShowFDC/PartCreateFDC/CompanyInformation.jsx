import { faBuilding, faEnvelopesBulk, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CompanyInformation = ({ data, handleInput}) => {    
  return (
    <div>
          <div class="alert alert-primary mt-2" role="alert">
        <h6 style={{ fontWeight: "700" }}>
          <FontAwesomeIcon icon={faBuilding} className="me-2" /> Informasi
          perusahaan
        </h6>
      </div>
      <input
        type="text"
        name=""
        className="form-control mb-3"
        disabled
        value={data?.fqp_document?.hospital?.name  + " ( " + data?.fqp_document?.hospital?.company_type?.name + " ) " }
        id=""
      />
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="floatingInput">Nama Pemilik Perusahaan</label>
          <input
            type="text"
            className="form-control"
            name="owner_company"
            onChange={handleInput}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="floatingInput">Didirikan Sejak Tahun</label>
          <input
            type="text"
            className="form-control"
            name="founded_year_at"
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="floatingInput">Jenis Usaha</label>
          <input
            type="text"
            className="form-control"
            name="business_type"
            onChange={handleInput}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="floatingInput">Alamat Situs</label>
          <input
            type="text"
            className="form-control"
            name="website"
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          placeholder="Input in here"
          className="form-control"
          name="name_person_in_charge"
          onChange={handleInput}
        />
        <label htmlFor="floatingInput">Nama Penanggung Jawab & Jabatan</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          name="email"
          placeholder="Input in here"
          className="form-control"
          onChange={handleInput}
        />
        <label htmlFor="floatingInput">
          <FontAwesomeIcon icon={faEnvelopesBulk} /> Alamat Email
        </label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          name="phone_number"
          placeholder="Input in here"
          onChange={handleInput}
          className="form-control"
        />
        <label htmlFor="floatingInput">
          <FontAwesomeIcon icon={faPhone} /> No. Telepon kantor
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="">Alamat Perusahaan (Sesuai NPWP)</label>
        <textarea
          name="company_address"
          id=""
          cols="15"
          rows="5"
          className="form-control"
          onChange={handleInput}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="">
          Alamat Lain perusahaan (Apabila alamat : Perusahaan berbeda dengan
          yang tersebut Diatas)
        </label>
        <textarea
          name="other_company_address"
          onChange={handleInput}
          id=""
          cols="15"
          rows="5"
          className="form-control"
        ></textarea>
      </div>
    </div>
  )
}

export default CompanyInformation