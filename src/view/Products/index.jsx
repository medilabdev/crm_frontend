import React, { useEffect, useState } from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Main from "../../components/Template/Main";
import Card from "../../components/Card";
import axios from "axios";

const Products = () => {
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState([]);

  const getAllProduct = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res.data.data))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllProduct(token);
  }, [token]);
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
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
          <Card className="shadow">
            <button className="btn btn-primary mt-3">Add Product</button>
          </Card>
        </div>
      </Main>
    </body>
  );
};

export default Products;
