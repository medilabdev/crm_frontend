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

import React from "react";
import { useMediaQuery } from "react-responsive";

export const CustomStyles = {
  head: {
    style: {
      fontWeight: "650",
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
          href={`/company/${row.uid}/edit`}
          target="_blank"
          className="image-name text-decoration-none fw-semibold"  
          style={{
            whiteSpace: "normal",
            color: "#191919",
          }}
        >
              {row.name}
          
        </a>{ isNew ?  isNew && <span className="badge bg-primary ms-2">New</span> : isUpdate ?  isUpdate && <span className="badge bg-success ms-2">Update</span> : "" }</div>
      )},
      left: true,
      width: "200px",
      wrap:true,
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
      right: true,
      hide: 'md'
      // width: "130px",
    },
    {
      id: 3,
      name: "Type",
      selector: (row) => (
        <div className="badge bg-primary fw-medium">
          {row?.company_type?.name}
        </div>
      ),
      sortable: true,
      width: "150px",
      hide: 'md'
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
      width: "200px",
      hide:"md",
    },

    {
      id: 6,
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <a
            className="icon-button text-dark"
            title="edit"
            href={`/company/${row.uid}/edit`}
            target="_blank"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="fs-6" />
          </a>
          <button
            className="ms-2 icon-button"
            title="delete"
            onClick={() => setDeleteCompany(row.uid)}
          >
            <FontAwesomeIcon icon={faTrash} className="fs-6" />
          </button>
        </div>
      ),
      // width: "150px",
    },
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
        
      />
    </>
  );
};

export default ColumnsDataTable;
