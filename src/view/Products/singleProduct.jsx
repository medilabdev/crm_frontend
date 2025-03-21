import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import OverlayAddProducts from "./Overlay/addProduct";
import DeleteSingle from "./Modals/delete";
import Swal from "sweetalert2";
import OverlayEditProduct from "./Overlay/editProduct";
import { debounce } from 'lodash';

const SingleProduct = () => {
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const [deleteSingle, setDeleteProduct] = useState(false);
  const handleDeleteSingle = () => setDeleteProduct(false);
  const [selectUid, setSelectUid] = useState(false);
  const selectUidDataTable = (e) => {
    const select = e.selectedRows.map((row) => row.uid);
    setSelectUid(select);
  };
  const [editProduct, setEditProduct] = useState(false);
  const handleCloseEditOverlay = () => {
    setEditProduct(false);
  };
  // console.log(editProduct);
  const handleDeleteSelected = async (e) => {
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
          formData.append("product_uid[]", uid);
        }
        formData.append("_method", "delete");
        const deleteSelect = await axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/products/delete/item`,
            formData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            Swal.fire({
              title: res.data.message,
              text: "Successfully delete contact",
              icon: "success",
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            });
          });
      } catch (error) {
        if (error.response.data.message === "Unauthenticated") {
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

  const [pagination, setPagination] = useState ({
    page: 1, 
    limit: 10
  })
  
  const [totalRows, setTotalRows] = useState(0)

  const getProduct = async (token, term, retryCount = 0 ) => {
    try {
      const response =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`, {
        headers:{
          Authorization:`Bearer ${token}`
        },
        params:{
          page:pagination.page,
          limit: pagination.limit,
          search: term
        }
      })
      setProduct(response.data.data);
      setTotalRows(response.data.pagination.totalData)
      setPending(false)
    } catch (error) {
      if (error.response && error.response.data.message === "Unauthenticated") {
        localStorage.clear();
        window.location.href = "/login";
      }
      else if(error.response && error.response.status === 404){
        setTotalRows(0);
        setProduct([]);
      }
      else if(error.response && error.response.status === 429){
        const maxRetries = 3;
        if (retryCount < maxRetries) {
          setTimeout(() => {
            getProduct(retryCount + 1);
          }, 2000);
        } else {
          console.error('Max retry attempts reached. Unable to complete the request.');
        }
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  const [pending, setPending] = useState(true)
  
  useEffect(() => {
      getProduct(token, search);
  }, [token, search, pagination.page, pagination.limit]);

  const handleChangePage = (page) => {
    setPagination((prev) => ({...prev, page}))
  }
  const handlePagePerPage = (pageSize, page) => {
    setPagination((prev) => ({...prev, pageSize, page}))
  }
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
            onClick={() => setEditProduct(row.uid)}
          >
            <i className="bi bi-pen"></i>
          </button>
          <button
            title="delete"
            className="ms-3 icon-button"
            onClick={() => setDeleteProduct(row.uid)}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      ),
    },
  ];

  const debouncedHandleFilter = debounce((value) => {
    setSearch(value.toLowerCase())
  }, 1000)

  function SearchFilter(e) {
    if(e.key === "Enter"){
      const value = e.target.value.toLowerCase()
      debouncedHandleFilter(value)
    }
  }
  
  return (
    <div className="tab-content pt-2">
      <div className="tab-pane fade show active product" id="product">
        <button
          className="btn btn-primary mt-5 ms-4"
          style={{ fontSize: "0.85rem" }}
          onClick={handleShowAdd}
        >
          Add Product
        </button>
        <button
          className="btn btn-danger mt-5 ms-4"
          style={{ fontSize: "0.85rem" }}
          onClick={handleDeleteSelected}
        >
          Delete Product
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
              onKeyDown={SearchFilter}
              style={{ fontSize: "0.85rem" }}
            />
          </div>
        </div>
        <DataTable
          className="mt-3"
          defaultSortFieldId={1}
          columns={columns}
          data={product}
          pagination
          paginationServer
          selectableRows
          paginationComponentOptions={{
            noRowsPerPage: true,
          }}
          onChangePage={handleChangePage}
          paginationPerPage={pagination.limit}
          onChangeRowsPerPage={handlePagePerPage}
          paginationTotalRows={totalRows}
          onSelectedRowsChange={selectUidDataTable}
          progressPending={pending}
        />
        <DeleteSingle
          onClose={handleDeleteSingle}
          visible={deleteSingle !== false}
          uid={deleteSingle}
        />
        <OverlayEditProduct
          onClose={handleCloseEditOverlay}
          visible={editProduct !== false}
          uid={editProduct}
        />
        <OverlayAddProducts visible={showAdd} onClose={handleCloseAdd} />
      </div>
    </div>
  );
};

export default SingleProduct;
