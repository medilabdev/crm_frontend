import React from "react";
import {
  faBuilding,
  faChevronDown,
  faChevronRight,
  faPenToSquare,
  faPhoneVolume,
  faSackDollar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useMediaQuery } from "react-responsive";

const conditionalRowStyles = [
  {
    when: (row) => !!row.pending_deletion_request, // kalau masih pending delete
    style: {
      opacity: 0.5,
      pointerEvents: "none",
      cursor: "not-allowed",
      backgroundColor: "#f8f9fa",
    },
  },
];


export const CustomStyles = {
  headCells: {
   style: {
     fontSize: "2rem", // Sesuaikan ukuran font header
     fontWeight: "semibold", // Atur agar teks lebih tebal
     color: "black", // Sesuaikan warna jika perlu
     backgroundColor: "#F7F9F2", // Sesuaikan warna latar belakang header jika diperlukan
     padding: "9px 12px", // Sesuaikan padding untuk header
   },
 },
 cells: {
   style: {
     padding: "1px 5px",
     fontFamily:"Nunito Sans, sans-serif",
   },
 },
};

const ColumnsDataTable = ({
  data,
  selectUid,
  paginationPerPage,
  onChangePage,
  onChangeRowsPerPage,
  pending,
  totalRows,
  setDeleteCompany,
}) => {
  const TableData = [
    {
      id: 1,
      name: "Company Name",
      selector: (row) => {
        const now = new Date();
        const createdAt = new Date(row.created_at);
        const updatedAt = new Date(row.updated_at);

        const rejection = row.latest_deletion_request;
        const rejectedAt = rejection?.approved_or_rejected_at
          ? new Date(rejection.approved_or_rejected_at)
          : null;

        const hoursSinceCreated = (now - createdAt) / (1000 * 60 * 60);
        const hoursSinceUpdated = (now - updatedAt) / (1000 * 60 * 60);
        const hoursSinceRejected = rejectedAt
          ? (now - rejectedAt) / (1000 * 60 * 60)
          : Infinity;

        const isNew = hoursSinceCreated <= 48;
        const isUpdated = hoursSinceUpdated <= 24 && updatedAt > createdAt;
        const isRejectedRecently =
          rejection &&
          rejection.status === "rejected" &&
          hoursSinceRejected <= 24;
        const isPending = !!row.pending_deletion_request;

        const renderBadge = () => {
          // 1️⃣ Pending request delete (prioritas tertinggi)
          if (isPending) {
            return (
              <span
                className="badge bg-warning text-dark ms-2"
                style={{ fontSize: "0.65rem" }}
              >
                Pending
              </span>
            );
          }

          // 2️⃣ Rejected (ada tooltip detail)
          if (isRejectedRecently) {
            return (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-reject-${row.uid}`}>
                    <div>
                      <strong>Rejected by:</strong>{" "}
                      {rejection?.approver?.name || "-"}
                      <br />
                      <strong>Date:</strong>{" "}
                      {rejectedAt.toLocaleDateString("id-ID")}
                      <br />
                      <strong>Reason:</strong>{" "}
                      {rejection?.reason_for_rejection || "-"}
                    </div>
                  </Tooltip>
                }
              >
                <span
                  className="badge bg-danger ms-2"
                  style={{ fontSize: "0.65rem", cursor: "help" }}
                >
                  Rejected
                </span>
              </OverlayTrigger>
            );
          }

          // 3️⃣ Baru dibuat
          if (isNew) {
            return (
              <span className="badge bg-primary ms-2" style={{ fontSize: "0.65rem" }}>
                New
              </span>
            );
          }

          // 4️⃣ Baru diperbarui
          if (isUpdated) {
            return (
              <span className="badge bg-success ms-2" style={{ fontSize: "0.65rem" }}>
                Updated
              </span>
            );
          }

          return null;
        };

        return (
          <div>
            <a
              href={`/company/${row.uid}`}
              target="_blank"
              className="image-name text-decoration-none"
              style={{
                whiteSpace: "normal",
                color: "black",
                fontWeight: 600,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.9rem",
              }}
            >
              {row.name}
            </a>
            {renderBadge()}
          </div>
        );
      },
      left: true,
      width: "200px",
      wrap: true,
      sortable: true,
    },

    {
      id: 2,
      name: "Associated with",
      selector: (row) => (
        <div className="d-flex">
          {row?.associate?.slice(0, 3).map((item, index) => (
            <div key={index} className="d-flex">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    {item?.contact?.name ?? null}
                    <br />
                    {item?.contact?.phone?.[0]?.number}
                  </Tooltip>
                }
              >
                <div>
                  {item?.contact ? (
                    <a
                      href={`/contact/${item?.contact?.uid}/edit`}
                      target="_blank"
                      className="text-dark"
                    >
                      <FontAwesomeIcon
                        icon={faPhoneVolume}
                        style={{ width: "30px", height: "18px" }}
                        data-tip={item?.contact?.name}
                      />
                    </a>
                  ) : null}
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    {item?.deals?.deal_name ?? null}
                    <br />
                    {item?.deals?.deal_size
                      ? `Rp. ${new Intl.NumberFormat().format(
                          item?.deals?.deal_size
                        )}`
                      : null}
                  </Tooltip>
                }
              >
                <div>
                  {item?.deals ? (
                    <a
                      href={`/deals/${item?.deals?.uid}/edit`}
                      target="_blank"
                      className="text-dark"
                    >
                      <FontAwesomeIcon
                        icon={faSackDollar}
                        style={{ width: "30px", height: "18px" }}
                        data-tip={item?.deals?.dealName}
                      />
                    </a>
                  ) : null}
                </div>
              </OverlayTrigger>
            </div>
          ))}
        </div>
      ),
      sortable: true,
      center: true,
      hide: 'md'
      // width: "130px",
    },
    {
      id: 3,
      name: "Type",
      selector: (row) => {
        const type = row?.company_type?.name ?? "Unknown";
    
        // Mapping warna berdasarkan tipe
        const getBadgeClass = (type) => {
          switch (type.toLowerCase()) {
            case "badan":
              return "btn btn-danger btn-sm fw-medium";
            case "cabang":
              return "btn btn-success btn-sm fw-medium";
            case "faskes":
              return "btn btn-warning btn-sm fw-medium text-dark";
            case "distributor":
              return "btn btn-info btn-sm fw-medium";
            default:
              return "btn btn-secondary btn-sm fw-medium";
          }
        };
    
        return (
          <div className={getBadgeClass(type)}>
            {type}
          </div>
        );
      },
      center: true,
    },
    
    {
      id: 4,
      name: "Owner (Created/Updated)",
      selector: (row) => {
        const date = new Date(row.created_at);
        const update = new Date(row.updated_at);
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
          <div className="mt-2">
            <span
              className="fw-semibold"
              style={{
                fontSize: "0.85rem",
                whiteSpace: "normal",
                color: "#191919",
              }}
            >
              {row?.owner?.name}
            </span>
            <p className="mt-1" style={{ fontSize: "10.8px" }}>
              {time}
            </p>
            <p style={{ fontSize: "10.8px", marginTop: "-10px" }}>
              {time === updated ? "-" : updated}
            </p>
          </div>
        );
      },
      sortable: true,
      width: "210px",
      hide:"md",
    },
    {
      id: 6,
      name: "Action",
      selector: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          <a
            href={`/company/${row.uid}/edit`}
            target="_blank"
            className="btn btn-outline-primary btn-sm d-flex align-items-center"
            title="Edit"
          >
            <FontAwesomeIcon icon={faPenToSquare}/>
            
          </a>
          <button
            onClick={() => setDeleteCompany(row.uid)}
            className="btn btn-outline-danger btn-sm d-flex align-items-center"
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
        
          </button>
        </div>
      ),
      width: "180px",
    }
    
  ];
  const ExpandedComponent = ({data}) => {
    const associatedContact = data?.associate?.slice(0, 3)
    .map((item) => item?.contact?.name)
    .filter((name) => name)
    .join(" & ")
    const associatedDeals = data?.associate?.slice(0, 3)
    .map((item) => item?.deals?.deal_name)
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
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Assosiasi Contact : </span>  
          {associatedContact}
        </div>
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Assosiasi Deals : </span>  
          {associatedDeals}
        </div>
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Tipe : </span>  
          {data?.company_type?.name}
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

        <div className="mt-3 d-flex" style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Action : </span>  
          <div className="action-icon ms-2">
          <a
            className="btn btn-primary"
            title="edit"
            href={`/company/${data.uid}/edit`}
            target="_blank"
          >
             Edit
          </a>
          <button
            className="ms-2 btn btn-danger"
            title="delete"
            onClick={() => setDeleteCompany(data.uid)}
          >
            Hapus
          </button>
        </div>
        </div>
    </div>
    </>
   )
  }
  const isMobile = useMediaQuery({ maxWidth:767 })
  return (
    <>
      <DataTable
        data={data}
        columns={TableData}
        defaultSortFieldId={1}
        pagination
        paginationServer
        selectableRows
        customStyles={CustomStyles}
        onSelectedRowsChange={selectUid}
        paginationPerPage={paginationPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        progressPending={pending}
        paginationTotalRows={totalRows}
        paginationComponentOptions={{
          noRowsPerPage: true,
        }}
        responsive
        highlightOnHover
        expandableRows={isMobile}
        expandableRowsComponent={isMobile ?ExpandedComponent : null}
        expandableIcon={
          isMobile ? {
            collapsed: <FontAwesomeIcon icon={faChevronRight} />,
            expanded: <FontAwesomeIcon icon={faChevronDown} isExpanded />
          } : null
        }
        conditionalRowStyles={conditionalRowStyles}

        
      />
    </>
  );
};

export default ColumnsDataTable;

