import React from 'react'

const DataBank = ({ show }) => {
  return (
    <div>
        <div class="fw-bold mb-3">
          <span className="fs-6 text-decoration-underline">Data Bank</span>
        </div>
        {show?.bank.map((item) => (
          <>
            <table className="mb-2">
              <tr className="fw-medium mb-4">
                <td style={{ width: "300px", fontSize: "0.9rem" }}>
                  Nama Bank
                </td>
                <td className="px-1">:</td>
                <td>{item?.bank_name || ""}</td>
              </tr>
              <tr className="fw-medium">
                <td style={{ width: "300px", fontSize: "0.9rem" }}>Cabang</td>
                <td className="px-1">:</td>
                <td>{item?.branch_bank || ""}</td>
              </tr>
              <tr className="fw-medium">
                <td style={{ width: "200px", fontSize: "0.9rem" }}>
                  Nama Account (A/N)
                </td>
                <td className="px-1">:</td>
                <td>{item?.account_name || ""}</td>
              </tr>
              <tr className="fw-medium ">
                <td style={{ width: "200px", fontSize: "0.9rem" }}>Kota</td>
                <td className="px-1">:</td>
                <td>{item?.city || ""}</td>
              </tr>
              <tr className="fw-medium ">
                <td style={{ width: "200px", fontSize: "0.9rem" }}>
                  No. Rekening
                </td>
                <td className="px-1">:</td>
                <td>{item?.bank_account_number || "-"}</td>
              </tr>
              <tr className="fw-medium ">
                <td style={{ width: "200px", fontSize: "0.9rem" }}>
                  Mata Uang
                </td>
                <td className="px-1">:</td>
                <td>{item?.currency || "-"}</td>
              </tr>
              <tr className="fw-medium ">
                <td style={{ width: "200px", fontSize: "0.9rem" }}>
                  Swift Code
                </td>
                <td className="px-1">:</td>
                <td>{item?.swift_code || ""}</td>
              </tr>
            </table>
            <hr />
          </>
        ))}
    </div>
  )
}

export default DataBank