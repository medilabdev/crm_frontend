import React from 'react'
import { Link } from 'react-router-dom'

const BreadcrumbIndex = () => {
  return (
    <div className="pagetitle">
    <h1>Deals Ambasador</h1>
    <nav>
      <ol className="breadcrumb mt-2">
        <li className="breadcrumb-item">
          <a href="/" className="text-decoration-none breadcrumb-item">
            Dashboard
          </a>
        </li>
        <li className="breadcrumb-item active">Deals Ambasador</li>
      </ol>
    </nav>
  </div>
  )
}

export default BreadcrumbIndex