import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbsindex = () => {
  return (
    <div className="pagetitle">
      <h1>Task</h1>
      <nav>
        <ol className="breadcrumb mt-2">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item active">Task</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbsindex;
