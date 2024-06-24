import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { ColumnsTable } from "./ColumnsTable";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const DatatableNeedApproval = ({
  NeedApprovalManager,
  paginationPerPage,
  handleChangePage,
  handlePagePerChange,
  totalRows,
  pending,
}) => {

  const isMobile = useMediaQuery({ maxWidth:767 })
  const position = localStorage.getItem("position");
  const ExpandedComponent = ({ data }) => {
    const date = new Date(data.created_at);
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
         <div className="mt-2" style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Permintaan ke Stage : </span>  
          {data?.staging?.name}
        </div>
         <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Status : </span>  
          {position === "pRGYXVKdzCPoQ8" ? (
            data.manager_approval == 0 ? (
              <span style={{ fontWeight: "600" }}>Waiting</span>
            ) : (
              <span style={{ fontWeight: "600" }}>Approved</span>
            )
          ) : data.manager_approval == 2 ? (
            <span style={{ fontWeight: "600" }}>Reject</span>
          ) : position === "_dLjLFdH-Nw8vg8U" ? (
            data.finance_approval == 0 ? (
              <span style={{ fontWeight: "600" }}>Waiting</span>
            ) : (
              <span style={{ fontWeight: "600" }}>Approved</span>
            )
          ) : data.finance_approval == 2 ? (
            <span style={{ fontWeight: "600" }}>Reject</span>
          ) : position === "pRGYXVKdzCPoQ1" ? (
            data.director_approval == 0 ? (
              <span style={{ fontWeight: "600" }}>Waiting</span>
            ) : (
              <span style={{ fontWeight: "600" }}>Approved</span>
            )
          ) : data.director_approval == 2 ? (
            <span style={{ fontWeight: "600" }}>Reject</span>
          ) : (
            ""
          )}
        </div>
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Owner : </span>  
          {data?.deal?.owner?.name}
        </div>
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Dibuat : </span>  
          {time}
        </div>
      </div>
    )
  }
  return (
    <div>
      <DataTable
        data={NeedApprovalManager}
        columns={ColumnsTable}
        pagination
        paginationServer
        selectableRows
        paginationPerPage={paginationPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handlePagePerChange}
        paginationTotalRows={totalRows}
        paginationComponentOptions={{
          noRowsPerPage: true,
        }}
        progressPending={pending}
        responsive
        highlightOnHover
        expandableRows={isMobile}
        expandableRowsComponent={isMobile ? ExpandedComponent : null}
        expandableIcon={
          isMobile ? {
            collapsed : <FontAwesomeIcon icon={faChevronRight} />,
            expanded : <FontAwesomeIcon icon={faChevronDown} isExpanded />
          } : null
        }
      />
    </div>
  );
};

export default DatatableNeedApproval;
