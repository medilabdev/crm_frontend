import { faCircleCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { handleApprovePks, handleRejectPks } from './HandleApprove'

const Action = ({ position , row}) => {
  return (
<>
  {position !== "_dLjLFdH-Nw8vg8U_005" && row.is_status !== "reject" ? (
    // Untuk posisi "review_sales"
    position === "_dLjLFdH-Nw8vg" && row.is_status === "review_sales" ? (
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-success me-2"
          onClick={() => handleApprovePks(row.uid)}
        >
          <FontAwesomeIcon icon={faCircleCheck} />
        </button>
        <button
          type="button"
          className="btn btn-danger me-2"
          onClick={() => handleRejectPks(row.uid)}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
    ) : // Untuk posisi "review_manager"
    position === "pRGYXVKdzCPoQ8" && row.is_status === "review_manager" ? (
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-success me-2"
          onClick={() => handleApprovePks(row.uid)}
        >
          <FontAwesomeIcon icon={faCircleCheck} />
        </button>
        <button
          type="button"
          className="btn btn-danger me-2"
          onClick={() => handleRejectPks(row.uid)}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
    ) : (
      ''
    )
  ) : (
    row.note
  )}
</>

  )
}

export default Action