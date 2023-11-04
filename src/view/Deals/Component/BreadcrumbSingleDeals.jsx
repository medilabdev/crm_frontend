import React from "react";
import { Link } from "react-router-dom";

const BreadcrumbSingleDeals = () => {
  return (
    <div className="col">
      <div className="pagetitle">
        <h1>Add Single Deals</h1>
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
            <li className="breadcrumb-item active">Add Single Deals</li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default BreadcrumbSingleDeals;
