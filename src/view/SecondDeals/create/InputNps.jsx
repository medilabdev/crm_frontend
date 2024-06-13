import React from 'react'

const InputNps = ({title, groupName, handleInputNps }) => {
  return (
   <>
    <div className="mb-2">
      <h6 className="fw-bold ms-2 mt-3">{title}</h6>
      <div className="row">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="col-md-4">
            <input
              type="text"
              name={`${groupName}[${i}]`}
              onChange={handleInputNps}
              placeholder="input nama/jabatan"
              className="form-control mb-2"
            />
          </div>
        ))}
      </div>
    </div>
   </>
  )
}

export default InputNps