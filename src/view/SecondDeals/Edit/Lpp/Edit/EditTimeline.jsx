import React from 'react'

const EditTimeline = ({ data, handleChangeTimeline, CategoryData}) => {
  return (
    <div>
      <table className="table table-sm caption-top table-bordered">
        <caption className="fw-bold fs-5">Timeline</caption>
        <thead className="text-center table-info">
          <tr>
            <th colSpan="13">Minggu</th>
          </tr>
        </thead>
        <thead className="table-primary">
          <tr>
            <th scope="col" className="fw-bold">
              Process
            </th>
            <th scope="col">1</th>
            <th scope="col">2</th>
            <th scope="col">3</th>
            <th scope="col">4</th>
            <th scope="col">5</th>
            <th scope="col">6</th>
            <th scope="col">7</th>
            <th scope="col">8</th>
            <th scope="col">9</th>
            <th scope="col">10</th>
            <th scope="col">11</th>
            <th scope="col">12</th>
          </tr>
        </thead>
        <tbody>
        {data?.map((item, index) => (
            <tr>
              <td className="fw-semibold">
                {index === 0 ? 
                    (CategoryData === "hs_L0YxrtdK1" ? "Replace" : CategoryData === "ls_Y7hsg13Gg" ? "New HD" : "Expand")
                    : item?.name
                }
              </td>
              <td><input type="checkbox" checked={item?.[0] == 1} onChange={() => handleChangeTimeline(index, 0)} className="form-check-input border-secondary" /></td>
              <td><input type="checkbox" checked={item?.[1] == 1} onChange={() => handleChangeTimeline(index, 1)} className="form-check-input border-secondary" /></td>
              <td><input type="checkbox" checked={item?.[2] == 1} onChange={() => handleChangeTimeline(index, 2)} className="form-check-input border-secondary" /></td>
              <td><input type="checkbox" checked={item?.[3] == 1} onChange={() => handleChangeTimeline(index, 3)} className="form-check-input border-secondary" /></td>
              <td><input type="checkbox" checked={item?.[4] == 1} onChange={() => handleChangeTimeline(index, 4)} className="form-check-input border-secondary" /></td>
              <td><input type="checkbox" checked={item?.[5] == 1} onChange={() => handleChangeTimeline(index, 5)} className="form-check-input border-secondary" /></td>
              <td><input type="checkbox" checked={item?.[6] == 1} onChange={() => handleChangeTimeline(index, 6)} className="form-check-input border-secondary" /></td>
              <td><input type="checkbox" checked={item?.[7] == 1} onChange={() => handleChangeTimeline(index, 7)} className="form-check-input border-secondary" /></td>
              <td><input type="checkbox" checked={item?.[8] == 1} onChange={() => handleChangeTimeline(index, 8)} className="form-check-input border-secondary" /></td>
              <td><input type="checkbox" checked={item?.[9] == 1} onChange={() => handleChangeTimeline(index, 9)} className="form-check-input border-secondary" /></td>
              <td><input type="checkbox" checked={item?.[10] == 1} onChange={() => handleChangeTimeline(index, 10)} className="form-check-input border-secondary" /></td>
              <td><input type="checkbox" checked={item?.[11] == 1} onChange={() => handleChangeTimeline(index, 11)} className="form-check-input border-secondary" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EditTimeline