import React from "react";
import { Link } from "react-router-dom";

const BreadcrumbAccounting = () => {
  return (
    <div className="pagetitle">
      <h1>Accounting</h1>
      <nav>
        <ol className="breadcrumb mt-2">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/deals" className="text-decoration-none">
              Deals
            </Link>
          </li>
          <li className="breadcrumb-item active">Accounting</li>
        </ol>
      </nav>
    </div>
  );
};

export default BreadcrumbAccounting;
