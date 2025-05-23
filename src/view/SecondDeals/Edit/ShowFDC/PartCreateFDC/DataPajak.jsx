import { faPercent } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const DataPajak = ({ handleInput }) => {
  return (
    <div>
       <div class="header-box">
       <FontAwesomeIcon icon={faPercent} className="me-2" /> DATA PAJAK
              </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          name="npwp"
          onChange={handleInput}
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
          name="tax_invoice_number"
          onChange={handleInput}
          className="form-control"
        />
        <label htmlFor="floatingInput">Nomor Serial Faktur Pajak</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          placeholder="Input in here"
          className="form-control"
          name="pkp_number"
          onChange={handleInput}
        />
        <label htmlFor="floatingInput">Nomor Surat Pengukuhan PKP</label>
      </div>
    </div>
  )
}

export default DataPajak