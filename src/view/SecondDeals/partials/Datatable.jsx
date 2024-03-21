import React from "react";
import DataTable from "react-data-table-component";
import { ColumnsTable, CustomStyles } from "./ColumnsTable";

const DatatableDealSecond = ({
  data,
  selectUidDataTable,
  paginationPerPage,
  handleChangePage,
  handlePagePerChange,
}) => {
  return (
    <div>
      <DataTable
        data={data}
        columns={ColumnsTable}
        pagination
        paginationServer
        selectableRows
        customStyles={CustomStyles}
        onSelectedRowsChange={selectUidDataTable}
        paginationPerPage={paginationPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handlePagePerChange}
        paginationComponentOptions={{
          noRowsPerPage: true,
        }}
      />
    </div>
  );
};

export default DatatableDealSecond;
