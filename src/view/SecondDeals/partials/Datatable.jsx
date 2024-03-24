import React from "react";
import DataTable from "react-data-table-component";
import { ColumnsTable, CustomStyles } from "./ColumnsTable";

const DatatableDealSecond = ({
  data,
  paginationPerPage,
  handleChangePage,
  handlePagePerChange,
  totalRows
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
        paginationPerPage={paginationPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handlePagePerChange}
        paginationTotalRows={totalRows}
        paginationComponentOptions={{
          noRowsPerPage: true,
        }}
      />
    </div>
  );
};

export default DatatableDealSecond;
