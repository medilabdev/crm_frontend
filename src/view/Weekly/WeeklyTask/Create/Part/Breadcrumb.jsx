import React from 'react'

const Breadcrumb = () => {
  return (

    <div className="col-md-12 mb-4">
      <div className="pagetitle">
        <h1>Create Weekly Task</h1>
        <nav>
          <ol className="breadcrumb mt-2">
            <li className="breadcrumb-item">
              <a href="/" className="text-decoration-none">
                Dashboard
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="/weekly-task" className="text-decoration-none">Weekly Task</a>
            </li>
            <li className="breadcrumb-item active" style={{fontWeight:"600"}}>Create Weekly Task</li>
          </ol>
        </nav>
      </div>
    </div>
  )
}

export default Breadcrumb