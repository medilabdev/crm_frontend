import React from 'react'

const Breadcrumb = () => {
  return (
    <div className="row">
    <div className="col">
      <div className="pagetitle">
        <h1>Weekly Task</h1>
        <nav>
          <ol className="breadcrumb mt-2">
            <li className="breadcrumb-item">
              <a href="/" className="text-decoration-none">
                Dashboard
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="/wekkly-task" className="text-decoration-none">Weekly Task</a>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
  )
}

export default Breadcrumb