import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import DataDumy from "./dummy";
import { ColumnsTable } from "./ColumnsTable";

const DatatableNeedApproval = ({ NeedApprovalManager, NeedApprovalAccounting }) => {
  console.log(NeedApprovalAccounting);
  return (
    <div>
      <DataTable
        // data={NeedApprovalManager}
        columns={ColumnsTable}
        pagination
        paginationServer
        selectableRows
      />
    </div>
  );
};

export default DatatableNeedApproval;
