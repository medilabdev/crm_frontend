import React from 'react'

const HandleApprove = ({ handleApprove, handleReject}) => {
  return (
    <div>
        <button
            className="btn btn-success me-2"
            style={{
            fontSize: "0.85rem",
            fontWeight: "600",
            }}
            onClick={handleApprove}>
            Approve
        </button>
    <button
        className="btn btn-danger me-2"
        style={{ fontSize: "0.85rem", fontWeight: "600" }}
        onClick={handleReject}
    >
        Reject
    </button>
  </div>
  )
}

export default HandleApprove