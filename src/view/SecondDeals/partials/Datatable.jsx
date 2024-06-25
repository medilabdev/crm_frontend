import React from "react";
import DataTable from "react-data-table-component";
import { ColumnsTable, CustomStyles } from "./ColumnsTable";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const DatatableDealSecond = ({
  data,
  paginationPerPage,
  handleChangePage,
  handlePagePerChange,
  totalRows,
  pending,
}) => {
  const isMobile = useMediaQuery({ maxWidth:767 })
  const ExpandedComponent = ({data}) => {
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
         <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Stage : </span>  
          {data?.staging?.name ?? '-'}
        </div>
         <div className="mt-1 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Owner : </span>  
          {data?.owner?.name ?? '-'}
        </div>
        <div className="mt-3 " style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Dibuat : </span>  
          {time}
        </div>
        <div className="mt-3 d-flex" style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight:600, whiteSpace:"nowrap"}}> 
          <span style={{ fontWeight : 400}}>Action : </span>  
          <a
            href={`/deals-second/${data.uid}/edit`}
            className="me-2 btn btn-primary"
            target="_blank"
          >
            Lihat Detail
          </a>
        </div>
      </div>
    )
  }
  return (
    <div>
      <DataTable
        data={data}
        columns={ColumnsTable}
        pagination
        paginationServer
        selectableRows
        customStyles={CustomStyles}
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
            collapsed: <FontAwesomeIcon icon={faChevronRight} />,
            expanded: <FontAwesomeIcon icon={faChevronDown} isExpanded />
          } : null
        }
      />
    </div>
  );
};

export default DatatableDealSecond;
