import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { ColumnsTable, ExpandedComponent } from "./ColumnsTable";
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
