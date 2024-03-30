import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { ColumnsTable } from "./ColumnsTable";

const DatatableNeedApproval = ({
  NeedApprovalManager,
  paginationPerPage,
  handleChangePage,
  handlePagePerChange,
  totalRows,
  pending,
}) => {
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
      />
    </div>
  );
};

export default DatatableNeedApproval;
