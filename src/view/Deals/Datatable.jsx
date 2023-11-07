import React from "react";
import DataTable from "react-data-table-component";

const DataTableComponet = ({ data, selectUidDataTable }) => {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name_deals,
      cell: (row) => (
        <div style={{ whiteSpace: "normal" }}>{row.name_deals}</div>
      ),
      sortable: true,
      width:"150px"
    },
    {
      name: "Stage",
      selector: (row) => row.Stage,
      sortable: true,
    },
    {
      name: "Jumlah/Tertanggal",
      selector: (row) => row.jumlah,
      sortable: true,
    },
    {
      name: "Associated with",
      //   selector:
      sortable: true,
    },
    {
      name: "Owner/Created",
      selector: (row) => {
        return (
          <div>
            <p className="mt-2 fw-semibold" style={{ fontSize: "13px" }}>
              {row.name_owner} -
            </p>
            <p style={{ marginTop: "-8px" }}>{row.created_at}</p>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Approval Status",
      selector: (row) => {
        return (
          <div className="btn btn-primary mt-1" style={{ fontSize: "0.65rem" }}>
            {row.approval_status}
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Updated at",
      selector: (row) => row.updated_at,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <button className="ms-2 icon-button" title="edit">
            <i className="bi bi-pen edit"></i>
          </button>
          <button className="icon-button" title="delete">
            <i className="bi bi-trash-fill danger"></i>
          </button>
        </div>
      ),
      width: "120px",
    },
  ];
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        defaultSortFieldId={1}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        selectableRows
        onSelectedRowsChange={selectUidDataTable}
      />
    </div>
  );
};

export default DataTableComponet;
