import React, { useEffect, useState } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import axios from "axios";
import { Card } from "react-bootstrap";
import SingleProduct from "./singleProduct";
import PackageProduct from "./packageProduct";

const Products = () => {
  const token = localStorage.getItem("token");
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Products</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <a href="/" className="text-decoration-none">
                        Dashboard
                      </a>
                    </li>
                    <li className="breadcrumb-item active fw-bold">Products</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <Card className="shadow">
            <Card.Body className="pt-3">
              <ul className="nav nav-tabs nav-tabs-bordered">
                <li className="nav-item">
                  <button
                    className="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#product"
                  >
                    Single Product
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#packageProduct"
                  >
                    Packaged Products
                  </button>
                </li>
              </ul>
              <SingleProduct />

              <PackageProduct />
            </Card.Body>
          </Card>
        </div>
      </Main>
    </body>
  );
};

export default Products;
