import React from "react";
import DataTable from "react-data-table-component";
import { ColumnsTable, CustomStyles } from "./ColumnsTable";
import DataDumy from "../../Deals/Dummy/index";
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
