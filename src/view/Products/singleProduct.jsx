import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const SingleProduct = () => {
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState([]);

  const getProduct = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProduct(res.data.data);
        setSearch(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };
  useEffect(() => {
    getProduct(token);
  }, [token]);

  const columns = [
    {
      id: 1,
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      id: 2,
      name: "Price List",
      selector: (row) => row.price,
      cell: (row) => `IDR ${new Intl.NumberFormat().format(row.price)}`,
      sortable: true,
    },
    {
      id: 3,
      name: "Last Updated",
      selector: (row) => {
        const date = new Date(row.updated_at);
        const formatDate = {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        const formatResult = new Intl.DateTimeFormat("en-US", formatDate);
        const time = formatResult.format(date);
        return (
          <p className="mt-2" style={{ fontSize: "11px" }}>
            {time}
          </p>
        );
      },
    },
    {
      id: 4,
      name: "Action",
      selector: (row) => (
        <div>
          <button
            title="edit"
            className="icon-button"
            onClick={() => `${row.uid}`}
          >
            <i className="bi bi-pen"></i>
          </button>
          <button
            title="delete"
            className="ms-3 icon-button"
            onClick={() => `${row.uid}`}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      ),
    },
  ];

  function SearchFilter(e) {
    const newData = product.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(newData);
  }
  return (
    <div className="tab-pane fade show active product" id="product">
      <button
        className="btn btn-primary mt-5 ms-4"
        style={{ fontSize: "0.85rem" }}
      >
        Add Product
      </button>
      <div className="float-end col-3 me-3">
        <div className="input-group mt-5">
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              style={{ borderEndEndRadius: 0, borderStartEndRadius: 0 }}
            >
              <i className="bi bi-search"></i>
            </span>
          </div>
          <input
            type="text"
            placeholder="Search Product..."
            className="form-control"
            onChange={SearchFilter}
            style={{ fontSize: "0.85rem" }}
          />
        </div>
      </div>
      <DataTable
        className="mt-3"
        defaultSortFieldId={1}
        columns={columns}
        data={search}
        pagination
        selectableRows
        paginationComponentOptions={paginationComponentOptions}
      />
    </div>
  );
};

export default SingleProduct;
