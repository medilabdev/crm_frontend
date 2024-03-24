import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { ColumnsTable } from "./ColumnsTable";

const DatatableNeedApproval = ({ NeedApprovalManager }) => {
  console.log(NeedApprovalManager);
  return (
    <div>
      <DataTable
        data={NeedApprovalManager}
        columns={ColumnsTable}
        pagination
        paginationServer
        selectableRows
      />
    </div>
  );
};

export default DatatableNeedApproval;
