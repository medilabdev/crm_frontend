import React from "react";
import DataTable from "react-data-table-component";
import DataDumy from "../../../Deals/Dummy";
import { ColumnsTable } from "./ColumnsTable";

const DatatableNeedApproval = () => {
  return (
    <div>
      <DataTable
        columns={ColumnsTable}
        data={DataDumy}
        pagination
        paginationServer
        defaultSortFieldId={1}
        selectableRows
      />
    </div>
  );
};

export default DatatableNeedApproval;
