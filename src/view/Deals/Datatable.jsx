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
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const DataTableComponet = ({
  data,
  selectUidDataTable,
  pending,
  paginationPerPage,
  paginationTotalRows,
  handleChangePage,
  handlePagePerChange,
}) => {
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 767 })
  const ExpandedComponent = ({ data }) => {
    const associatedCompanies = data?.associate?.slice(0, 3)
    .map((item) => item?.company?.name)
    .filter((name) => name)
    .join(" & ")

    const associatedContact = data?.associate?.slice(0, 3)
    .map((item) => item?.contact?.name)
    .filter((name) => name)
    .join(" & ")

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
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Stage : </span>  
          {data?.staging?.name}
        </div>
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Jumlah : </span>  
          Rp. {new Intl.NumberFormat().format(data?.deal_size)}
        </div>
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Assosiasi Perusahaan : </span>  
          {associatedCompanies}
        </div>
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Assosiasi Kontak : </span>  
          {associatedContact}
        </div>
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Owner : </span>  
          {data?.owner?.name}
        </div>
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Dibuat : </span>  
          {time}
        </div>
        {data?.created_at !== data?.updated_at ?  
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Diperbarui : </span>  
          {updated}
        </div>
        :""}
    </div>
    </>
  )
  }
  const columns = [
    {
      
      name: "Name",
      cell: (row) => {
        const createdDate = new Date(row?.created_at)
        const currentDate = new Date();
        const twoDaysAgo = new Date(currentDate)
        twoDaysAgo?.setDate(currentDate.getDate() - 2)
        const isNew = createdDate > twoDaysAgo;   
        const updatedDate = new Date(row?.updated_at)
        const isUpdate = updatedDate > twoDaysAgo;
       return (
        <div>
        <a
          href={`deals/${row.uid}/edit`}
          target="_blank"
          className="text-decoration-none"
          style={{ whiteSpace: "normal", color: "#191919", fontWeight: "500" }}
        >
          {row.deal_name}
        </a>
        { isNew ?  isNew && <span className="badge bg-primary ms-2">New</span> : isUpdate ?  isUpdate && <span className="badge bg-success ms-2">Update</span> : "" }
        </div>
      )},
      sortable: true,
      width: "150px",
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
      hide:"sm"
    },
    {
      name: "Jumlah",
      selector: (row) => `Rp. ${new Intl.NumberFormat().format(row.deal_size)}`,
      sortable: true,
      width: "150px",
      hide:"sm"
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
      width: "150px",
      hide:"sm"
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
              {time}
            </p>
          </div>
        );
      },
      sortable: true,
      width: "150px",
      hide:"sm"
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          {row?.owner_user_uid === uid || role === "hG5sy_dytt95" ? (
            <>
              <a
                href={`/deals/${row.uid}/edit`}
                className="me-3 icon-button text-dark"
                title="edit"
                target="_blank"
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </a>

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
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          ) : null}
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
        expandableRows={isMobile}
        expandableRowsComponent={isMobile ? ExpandedComponent : null}
        expandableIcon={
          isMobile ? {
            collapsed: <FontAwesomeIcon icon={faChevronRight} />,
            expanded: <FontAwesomeIcon icon={faChevronDown} isExpanded/>
          } : null
        }
      />
    </div>
  );
};

export default DataTableComponet;
