import React from "react";

const BreadCrumbCreate = () => {
  return (
    <div className="row">
      <div className="col">
        <div className="pagetitle">
          <h1>Create Deals</h1>
          <nav>
            <ol className="breadcrumb mt-2">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">
                  Dashboard
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="/deals-second" className="text-decoration-none">Deals</a>
              </li>
              <li className="breadcrumb-item active" style={{fontWeight:"600"}}>Create Deals</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbCreate;
