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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faChevronDown,
  faChevronRight,
  faPenToSquare,
  faPhone,
  faPhoneVolume,
  faTrash,
  faComments
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";


const ExpandedProductComponent = ({ data }) => {
    return (
        <div style={{ padding: '15px 30px', backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
            <h6 className="fw-bold">Products in this Deal:</h6>
            {data.detail_product && data.detail_product.length > 0 ? (
                <ul className="list-unstyled">
                    {data.detail_product.map(detail => (
                        <li key={detail.uid}>
                            - {detail.product ? detail.product.name : 'N/A'} 
                            <span className="text-muted"> (Qty: {detail.qty})</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted">No products associated with this deal.</p>
            )}
        </div>
    );
};

const ExpandedComponent = ({ data, openFollowUpModal }) => {
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");
  const role = localStorage.getItem("role");

  const associatedCompanies = data?.associate
    ?.slice(0, 3)
    .map((item) => item?.company?.name)
    .filter((name) => name)
    .join(" & ");

  const associatedContact = data?.associate
    ?.slice(0, 3)
    .map((item) => item?.contact?.name)
    .filter((name) => name)
    .join(" & ");

  const date = new Date(data.created_at);
  const update = new Date(data.updated_at);
  const formatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formate = new Intl.DateTimeFormat("en-US", formatOptions);
  const time = formate.format(date);
  const updated = formate.format(update);
  return (
    <>
      <div>
        <div
          className="mt-3 "
          style={{
            marginLeft: "1rem",
            marginBottom: "1rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontWeight: 400 }}>Stage : </span>
          {data?.staging?.name}
        </div>
        <div
          className="mt-3 "
          style={{
            marginLeft: "1rem",
            marginBottom: "1rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontWeight: 400 }}>Jumlah : </span>
          Rp. {new Intl.NumberFormat().format(data?.deal_size)}
        </div>
        <div
          className="mt-3 "
          style={{
            marginLeft: "1rem",
            marginBottom: "1rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontWeight: 400 }}>Assosiasi Perusahaan : </span>
          {associatedCompanies}
        </div>
        <div
          className="mt-3 "
          style={{
            marginLeft: "1rem",
            marginBottom: "1rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontWeight: 400 }}>Assosiasi Kontak : </span>
          {associatedContact}
        </div>
        <div
          className="mt-3 "
          style={{
            marginLeft: "1rem",
            marginBottom: "1rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontWeight: 400 }}>Owner : </span>
          {data?.owner?.name}
        </div>
        <div
          className="mt-3 "
          style={{
            marginLeft: "1rem",
            marginBottom: "1rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontWeight: 400 }}>Dibuat : </span>
          {time}
        </div>
        {data?.created_at !== data?.updated_at ? (
          <div
            className="mt-3 "
            style={{
              marginLeft: "1rem",
              marginBottom: "1rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontWeight: 400 }}>Diperbarui : </span>
            {updated}
          </div>
        ) : (
          ""
        )}
        <div
          className="mt-3 d-flex"
          style={{
            marginLeft: "1rem",
            marginBottom: "1rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontWeight: 400 }}>Action : </span>
          <div className="ms-3">
          {data?.owner_user_uid === uid || role === "hG5sy_dytt95" ? (
            <>
              <a
                href={`/deals/${data.uid}/edit`}
                className=" btn btn-primary "
                title="edit"
                target="_blank"
              >
                Edit
              </a>

              <button
                className="btn btn-danger ms-2"
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
                      formData.append("deals_uid[]", data.uid);
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
                          if (
                            err.response.data.message === "Delete failed!"
                          ) {
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
                Delete
              </button>

              <button
                  className="btn btn-outline-info ms-2"
                  title="Follow-Up"
                  onClick={() => openFollowUpModal(data)}
                >
                  <i className="fa-solid fa-comments"></i> Follow-Up
              </button>



            </>
          ) : null}

          </div>
        </div>
      </div>
    </>
  );
};

const ConditionalExpandedComponent = ({ data, isMobile, openFollowUpModal }) => {
   
    if (isMobile) {
        return <ExpandedComponent data={data} openFollowUpModal={openFollowUpModal} />;
    } else {
        return <ExpandedProductComponent data={data} openFollowUpModal={openFollowUpModal} />;
    }
};

const DataTableComponent = ({
  data,
  selectUidDataTable,
  pending,
  paginationPerPage,
  paginationTotalRows,
  handleChangePage,
  handlePagePerChange,
  openFollowUpModal
}) => {
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  const columns = [
    {
        name: "Company Name", 
        cell: (row) => {
            const displayName = row.company ? row.company.name : row.deal_name;
            const displaySubtext = row.company ? row.deal_name : (row.position || "-");

            const createdDate = new Date(row?.created_at);
            const currentDate = new Date();
            const twoDaysAgo = new Date(currentDate);
            twoDaysAgo?.setDate(currentDate.getDate() - 2);
            const isNew = createdDate > twoDaysAgo;
            const updatedDate = new Date(row?.updated_at);
            const isUpdate = updatedDate > twoDaysAgo;

            return (
                <div>
                    <a
                        href={`deals/${row.uid}/edit`}
                        target="_blank"
                        className="text-decoration-none"
                        style={{
                            whiteSpace: "normal",
                            color: "#191919",
                            fontWeight: "500",
                        }}
                    >
                        {displayName} 
                    </a>
                    {isNew
                        ? isNew && <span className="badge bg-primary ms-2">New</span>
                        : isUpdate
                            ? isUpdate && (
                                <span className="badge bg-success ms-2">Update</span>
                            )
                            : ""}
                    <div style={{ fontSize: "0.75rem", color: "#666" }}>{displaySubtext}</div>
                </div>
            );
        },
        sortable: true,
        width: "250px",
    },
    {
      name: "Stage",
      selector: (row) => (
        <div>
          <p
            className={`btn shadow- ${
              row.staging?.name === "Closed Won"
                ? "btn-success"
                : row.staging?.name === "Closed Lost"
                  ? "btn-danger"
                  : "btn-primary"
            }`}
            style={{ fontSize: "0.65rem", fontWeight: "400" }}
          >
            {row.staging?.name}
          </p>
        </div>
      ),
      sortable: true,
      hide: "sm",
    },
    {
      name: "Jumlah",
      selector: (row) => `Rp. ${new Intl.NumberFormat().format(row.deal_size)}`,
      sortable: true,
      width: "150px",
      hide: "sm",
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
                <a
                  href={`/company/${row.company?.uid}/edit`}
                  target="_blank"
                  className="text-dark"
                >
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="fs-4"
                    data-tip={row.company?.name}
                  />
                </a>
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
                    <a
                      href={`/contact/${row.company?.uid}/edit`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faPhoneVolume}
                        style={{ width: "30px", height: "18px" }}
                        data-tip={row.company?.name}
                        className="text-black"
                      />
                    </a>
                  </div>
                </OverlayTrigger>
              ))
            : null}
        </div>
      ),
      sortable: true,
      left:true,
      width: "150px",
      hide: "sm",
    },

    {
      name: "Owner/Created",
      selector: (row) => {
        const updatedAt = new Date(row.updated_at);
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
        const updatedTime = formatResult.format(updatedAt);
      
        return (
          <div>
            <p
              className="mt-2 fw-bold"
              style={{
                fontSize: "0.90rem",
                fontWeight: "500",
                whiteSpace: "normal",
              }}
            >
              {row.owner?.name}
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                marginTop: "-8px",
                whiteSpace: "normal",
                color: "#191919",
              }}
            >
              {row?.created_at === row?.updated_at
                ? time
                : (
                  <>
                    <strong>Created:</strong> {time} <br /> <strong>Updated:</strong> {updatedTime}
                  </>
                )}
            </p>
          </div>
        );
      },
      sortable: true,
      width: "150px",
      hide:'sm'
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex align-items-center">
          {row?.owner_user_uid === uid || role === "hG5sy_dytt95" ? (
            <>
              {/* ✏️ Tombol Edit */}
              <OverlayTrigger placement="top" overlay={<Tooltip>Edit Deal</Tooltip>}>
                <a
                  href={`/deals/${row.uid}/edit`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark me-3"
                  style={{ fontSize: "1rem" }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </a>
              </OverlayTrigger>

              {/* 🗑️ Tombol Delete */}
              <OverlayTrigger placement="top" overlay={<Tooltip>Delete Deal</Tooltip>}>
                <button
                  className="btn btn-link text-danger p-0 me-3"
                  title="Delete"
                  style={{ fontSize: "1rem" }}
                  onClick={() => {
                    Swal.fire({
                      title: "Konfirmasi",
                      text: "Apakah kamu yakin ingin menghapus deal ini?",
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
                        axios
                          .post(
                            `${process.env.REACT_APP_BACKEND_URL}/deals/item/delete`,
                            formData,
                            {
                              headers: { Authorization: `Bearer ${token}` },
                            }
                          )
                          .then((res) => {
                            Swal.fire({
                              title: res.data.message,
                              text: "Successfully delete deals",
                              icon: "success",
                            }).then(() => window.location.reload());
                          })
                          .catch((err) => {
                            if (err.response?.data?.message === "Delete failed!") {
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
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </OverlayTrigger>

              {/* 💬 Tombol Follow-Up */}
              <OverlayTrigger placement="top" overlay={<Tooltip>Follow-Up</Tooltip>}>
                <button
                  className="btn btn-link text-info p-0"
                  title="Follow-Up"
                  style={{ fontSize: "1rem" }}
                  onClick={() => openFollowUpModal(row)}
                >
                  <FontAwesomeIcon icon={faComments} />
                </button>
              </OverlayTrigger>
            </>
          ) : null}
        </div>
      ),
      width: "140px",
      hide: "sm",
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
              noRowsPerPage: true,
          }}
          selectableRows
          onSelectedRowsChange={selectUidDataTable}
          progressPending={pending}
          paginationTotalRows={paginationTotalRows}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handlePagePerChange}
          responsive
          highlightOnHover
          
          expandableRows={true}
          expandableRowsComponent={ConditionalExpandedComponent}
          expandableRowsComponentProps={{ isMobile: isMobile, openFollowUpModal: openFollowUpModal }}
          expandableRowDisabled={row => !isMobile && (!row.detail_product || row.detail_product.length === 0)}

          expandableIcon={
              isMobile
              ? {
                  collapsed: <FontAwesomeIcon icon={faChevronRight} />,
                  expanded: <FontAwesomeIcon icon={faChevronDown} />,
              }
              : undefined
          }
      />
    </div>
  );
};

export default DataTableComponent;
