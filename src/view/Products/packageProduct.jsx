import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import AddPackageProduct from "./Overlay/addPackageProduct";
// import EditPackageProduct from "./Overlay/editPackageProduct";
import Swal from "sweetalert2";
import DeletePackage from "./Modals/deletePackage";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const PackageProduct = () => {
  const token = localStorage.getItem("token");
  const [packageProduct, setPackageProduct] = useState([]);
  const [search, setSearch] = useState([]);
  const [addPackageProduct, setAddPackageProduct] = useState(false);
  const [rowProduct, setRowProduct] = useState([]);
  const handleClosePackage = () => setAddPackageProduct(false);
  const handleOpenPackage = () => setAddPackageProduct(true);

  // const [editPackageProduct, setEditPackageProduct] = useState(false);
  const [packageDelete, setPackageDelete] = useState(false);
  const handleDeletePackage = () => setPackageDelete(false);
  const [selectUid, setSelectUid] = useState(false);
  const navigate = useNavigate();
  const selectUidDatatable = (e) => {
    const select = e.selectedRows.map((row) => row.uid);
    setSelectUid(select);
  };
  // const handleCloseEditPackage = () => {
  //   setEditPackageProduct(false);
  // };
  // console.log(selectUid);
  const handleSelectedDeleted = async (e) => {
    e.preventDefault();
    const isResult = await Swal.fire({
      title: "Apakah anda yakin",
      text: "Anda tidak dapat mengembalikan data ini setelah menghapusnya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });
    if (isResult.isConfirmed) {
      try {
        const formData = new FormData();
        for (const uid of selectUid) {
          formData.append("package_product[]", uid);
        }
        formData.append("_method", "delete");
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/packages-product/package/delete`,
            formData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            Swal.fire({
              title: res.data.message,
              text: "Successfully delete package product",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            });
          });
      } catch (error) {
        if (error.response.data.message === "Unauthenticated.") {
          Swal.fire({
            title: error.response.data.message,
            text: "Tolong Login Kembali",
            icon: "warning",
          });
          localStorage.clear();
          window.location.href = "/login";
        }
        if (error.message) {
          Swal.fire({
            text: error.response.data.message,
            icon: "warning",
          });
        }
      }
    }
  };
  const getPackageProduct = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/packages-product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const packageData = res.data.data;
        setPackageProduct(packageData);
        setSearch(packageData);

        packageData.map((packageLoop, index) => {
          setRowProduct(packageLoop?.package_detail_with_product);
        });
      })
      .catch((err) => console.error(err));
  };

  const ExpandableRowComponent = ({ data }) => {
    const productNames = data.package_detail_with_product?.map(
      (product) => product?.product
    );
    return (
      <div>
        <Table striped bordered hover size="md">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          {productNames.map((data, index) => (
            <tbody>
              <tr>
                <td>{data.name}</td>
                <td>Rp {new Intl.NumberFormat().format(data.price)}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    );
  };
  rowProduct.map((data) => {
    const productName = data;
    return <ExpandableRowComponent data={productName} />;
  });

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  const [pending, setPending] = useState(true)
  useEffect(() => {
    getPackageProduct(token);

    const timeOut = setTimeout(() => {
      setPending(false)
    }, 2500)
    return () => clearTimeout(timeOut)
  }, [token]);

  const columns = [
    {
      name: "Name Package",
      selector: (row) => (
        <p
          className="mt-2"
          style={{
            whiteSpace: "normal",
            fontWeight: "400",
            fontSize: "0.80rem",
          }}
        >
          {row.name}
        </p>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Discount",
      selector: (row) => {
        if (row.discount_type === "nominal") {
          return `Rp. ${new Intl.NumberFormat().format(row.discount)}`;
        } else if (row.discount_type === "percent") {
          return `${row.discount} %`;
        } else {
          return "-";
        }
      },
      sortable: true,
    },
    {
      name: "Total Price",
      selctor: (row) => row.total_price,
      cell: (row) => `Rp. ${new Intl.NumberFormat().format(row.total_price)}`,
      sortable: true,
    },
    {
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
          <p
            className="mt-2"
            style={{ fontSize: "11px", whiteSpace: "normal" }}
          >
            {time}
          </p>
        );
      },
      sortable: true,
      width: "150px",
    },

    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            title="edit"
            className="icon-button"
            onClick={() => navigate(`/packed-product/${row.uid}/edit`)}
          >
            <i className="bi bi-pen"></i>
          </button>
          <button
            title="delete"
            className="ms-3 icon-button"
            onClick={() => setPackageDelete(row.uid)}
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

  // const customStyle = {
  //   headRow: {
  //     style: {
  //       backgroundColor: "#ADC4CE",
  //       color: "white",
  //     },
  //   },
  // };

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
        <button
          className="btn btn-danger mt-5 ms-4"
          style={{ fontSize: "0.85rem" }}
          onClick={handleSelectedDeleted}
        >
          Delete Package
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
          className="mt-4 rounded"
          defaultSortFieldId={1}
          columns={columns}
          data={search}
          pagination
          selectableRows
          onSelectedRowsChange={selectUidDatatable}
          expandableRows
          expandableRowsComponent={ExpandableRowComponent}
          paginationComponentOptions={paginationComponentOptions}
          progressPending={pending}
          // customStyles={customStyle}
        />
        <AddPackageProduct
          visible={addPackageProduct}
          onClose={handleClosePackage}
        />
        {/* <EditPackageProduct
          onClose={handleCloseEditPackage}
          visible={editPackageProduct !== false}
          uid={editPackageProduct}
        /> */}
        <DeletePackage
          onClose={handleDeletePackage}
          visible={packageDelete !== false}
          uid={packageDelete}
        />
      </div>
    </div>
  );
};

export default PackageProduct;
