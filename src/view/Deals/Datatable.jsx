import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import IconCompany from "../../assets/img/condo.png";
import IconPhone from "../../assets/img/telephone-call.png";

const DataTableComponet = ({ data, selectUidDataTable, pending, paginationPerPage, paginationTotalRows, handleChangePage, handlePagePerChange  }) => {
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem('uid');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const columns = [
    {
      name: "Name",
      cell: (row) => (
        <a href={`deals/${row.uid}/edit`} target="_blank" className="text-decoration-none" style={{ whiteSpace: "normal", color:"black", fontWeight:"600" }}>{row.deal_name}</a>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Stage",
      selector: (row) => (
        <div>
          <p
            className={`btn ${
              row.staging?.name === "Closed Won"
                ? "btn-success"
                : row.staging?.name === "Closed Lost"
                  ? "btn-danger"
                  : "btn-primary"
            }`}
            style={{ fontSize: "0.65rem" }}
          >
            {row.staging?.name}
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Jumlah/Tertanggal",
      selector: (row) => `Rp. ${new Intl.NumberFormat().format(row.deal_size)}`,
      sortable: true,
      width: "150px",
    },
    {
      name: "Associated with",
      selector: (row) => (
        <div className="d-flex">
          {row.company ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{row?.company?.name}</Tooltip>}
            >
              <div>
                <img
                  className="ms-1"
                  src={IconCompany}
                  alt=""
                  style={{ width: "18px" }}
                  data-tip={row.company?.name}
                />
              </div>
            </OverlayTrigger>
          ) : null}
          {row.contact_person
            ? row.contact_person.slice(0, 4).map((item, index) => (
                <OverlayTrigger
                  key={index}
                  placement="top"
                  overlay={
                    <Tooltip
                      id={`tooltip-${item?.contact?.name}-${item?.contact?.phone?.[0]?.number}`}
                    >
                      {item?.contact?.name}
                      <br />
                      {item?.contact?.phone?.[0]?.number}
                    </Tooltip>
                  }
                >
                  <div>
                    <img
                      className="ms-1"
                      src={IconPhone}
                      alt=""
                      style={{ width: "18px" }}
                    />
                  </div>
                </OverlayTrigger>
              ))
            : null}
        </div>
      ),
      sortable: true,
      width: "150px",
    },

    {
      name: "Owner/Created",
      selector: (row) => {
        // console.log(row);
        const date = new Date(row.created_at);
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
          <div>
            <p
              className="mt-2 fw-semibold"
              style={{ fontSize: "13px", whiteSpace: "normal" }}
            >
              {row.owner?.name} -
            </p>
            <p style={{ marginTop: "-8px", whiteSpace: "normal" }}>{time}</p>
          </div>
        );
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
            {row?.owner_user_uid === uid || (role === "hG5sy_dytt95")? (
              <>
                <button
                      className="ms-2 icon-button"
                      title="edit"
                      target="_blank"
                      onClick={() => navigate(`/deals/${row.uid}/edit`)}
                    >
                      <i className="bi bi-pen edit"></i>
                </button>
              
            <button
              className="icon-button"
              title="delete"
              onClick={() => {
                Swal.fire({
                  title: "Konfirmasi",
                  text: "Apakah kamu yakin ingin menghapus ini deals ini?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ya, Hapus!",
                  cancelButtonText: "Batal",
                }).then((res) => {
                  if (res.isConfirmed) {
                    const formData = new FormData();
                    formData.append("deals_uid[]", row.uid);
                    // console.log("FormData:", Object.fromEntries(formData.entries()));
                    axios
                      .post(
                        `${process.env.REACT_APP_BACKEND_URL}/deals/item/delete`,
                        formData,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                      .then((res) => {
                        Swal.fire({
                          title: res.data.message,
                          text: "Successfully delete deals",
                          icon: "success",
                        }).then((res) => {
                          if (res.isConfirmed) {
                            window.location.reload();
                          }
                        });
                      })
                      .catch((err) => {
                        if (err.response.data.message === "Delete failed!") {
                          Swal.fire({
                            title: "Delete Failed",
                            text: "Tidak dapat menghapus, data master ini terkait dengan data lainnya",
                            icon: "warning",
                          });
                        }
                      });
                  }
                });
              }}
            >
              <i className="bi bi-trash-fill danger"></i>
            </button>
            </>
              ): null}
        </div>
      ),
      width: "120px",
    },
  ];
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        defaultSortFieldId={1}
        pagination
        paginationServer
        paginationPerPage={paginationPerPage}
        paginationComponentOptions={{
          noRowsPerPage : true
        }}
        selectableRows
        onSelectedRowsChange={selectUidDataTable}
        progressPending={pending}
        paginationTotalRows={paginationTotalRows}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handlePagePerChange}
      />
    </div>
  );
};

export default DataTableComponet;
