import React from 'react'

const TopButton = () => {
  return (
    <div className='row'>
        <div className="col mb-2 me-2">
            <div className="d-flex float-end">
                <a
                    href="/weekly-task/create"
                    className="btn btn-primary"
                    style={{ fontSize: "0.85rem", fontWeight: "600" }}
                    >
                    Add Weekly Task
                    </a>
            </div>
        </div>
    </div>
  )
}

export default TopButton