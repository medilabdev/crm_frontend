import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddPackageProduct from "./Overlay/addPackageProduct";
const PackageProduct = () => {
  const token = localStorage.getItem("token");
  const [packageProduct, setPackageProduct] = useState([]);
  const [search, setSearch] = useState([]);
  const [addPackageProduct, setAddPackageProduct] = useState(false);
  const handleClosePackage = () => setAddPackageProduct(false);
  const handleOpenPackage = () => setAddPackageProduct(true);

  const getPackageProduct = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/packages-product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPackageProduct(res.data.data);
        setSearch(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  const productDetail = () => {
    
  };
  // console.log(packageProduct);
  useEffect(() => {
    getPackageProduct(token);
  }, [token]);

  const columns = [
    {
      id: 1,
      name: "Name Package",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      id: 2,
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
      sortable: true,
    },
    {
      id: 3,
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
      sortable: true,
    },
  ];

  function searchPackage(e) {
    const packageData = packageProduct.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch(packageData);
  }
  return (
    <div className="tab-content pt-2">
      <div className="tab-pane fade show packageProduct" id="packageProduct">
        <button
          className="btn btn-primary mt-5 ms-4"
          style={{ fontSize: "0.85rem" }}
          onClick={handleOpenPackage}
        >
          Add Package Product
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
              placeholder="Search Package..."
              className="form-control"
              onChange={searchPackage}
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
          expandableRows
          expandableRowsComponent={productDetail}
          paginationComponentOptions={paginationComponentOptions}
        />
        <AddPackageProduct
          visible={addPackageProduct}
          onClose={handleClosePackage}
        />
      </div>
    </div>
  );
};

export default PackageProduct;
