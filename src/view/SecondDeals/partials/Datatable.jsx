import React from "react";
import DataTable from "react-data-table-component";
import { ColumnsTable, CustomStyles } from "./ColumnsTable";
import DataDumy from "./dummy";
const DatatableDealSecond = () => {
  return (
    <>
      <DataTable
        columns={ColumnsTable}
        data={DataDumy}
        pagination
        paginationServer
        defaultSortFieldId={1}
        selectableRows
        customStyles={CustomStyles}
      />
    </>
  );
};

export default DatatableDealSecond;
