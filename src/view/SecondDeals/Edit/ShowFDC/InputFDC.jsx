import React from 'react'
import FormDireksiAndPic from '../FDC/FormDireksiAndPic'
import FormDataBank from '../FDC/FormDataBank'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faEnvelopesBulk, faPercent, faPhone } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { Card } from 'react-bootstrap'

const InputFDC = () => {
  return (
    <Card.Body>
            <div class="alert alert-primary mt-2" role="alert">
              <h6 style={{ fontWeight: "700" }}>
                <FontAwesomeIcon icon={faBuilding} className="me-2" /> Informasi
                perusahaan
              </h6>
            </div>
            <Select placeholder="Pilih Nama Perusahaan" className="mb-3" />
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="floatingInput">Nama Pemilik Perusahaan</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label htmlFor="floatingInput">Didirikan Sejak Tahun</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="floatingInput">Jenis Usaha</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label htmlFor="floatingInput">Alamat Situs</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">
                Nama Penanggung Jawab & Jabatan
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">
                <FontAwesomeIcon icon={faEnvelopesBulk} /> Alamat Email
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">
                <FontAwesomeIcon icon={faPhone} /> No. Telepon kantor
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="">Alamat Perusahaan (Sesuai NPWP)</label>
              <textarea
                name=""
                id=""
                cols="15"
                rows="5"
                className="form-control"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="">
                Alamat Lain perusahaan (Apabila alamat : Perusahaan berbeda
                dengan yang tersebut Diatas)
              </label>
              <textarea
                name=""
                id=""
                cols="15"
                rows="5"
                className="form-control"
              ></textarea>
            </div>
            <div class="alert alert-primary mt-2" role="alert">
              <h6 style={{ fontWeight: "700" }}>
                <FontAwesomeIcon icon={faPercent} className="me-2" /> Data Pajak
              </h6>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">
                Nomor NPWP (Sesuai dengan Faktur Pajak)
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nomor Serial Faktur Pajak</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Input in here"
                className="form-control"
              />
              <label htmlFor="floatingInput">Nomor Surat Pengukuhan PKP</label>
            </div>
            <FormDireksiAndPic />
            <FormDataBank />
            <div className="mb-3">
              <label htmlFor="" className="fw-semibold mt-3">
                Data yang harus dilengkapi
              </label>
              <input type="file" name="" className="form-control" id="" />
            </div>
          </Card.Body>
  )
}

export default InputFDC