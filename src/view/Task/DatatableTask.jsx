import React from 'react'
import DataTable from 'react-data-table-component'

const DatatableTask = ({ data, selectUidDataTable }) => {
    const token = localStorage.getItem("token")

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL",
      };
      const columns = [
        {
            name:"Task Name",
            selector: (row) => row.task_name,
            cell:(row) => (
                <div style={{ whiteSpace: "normal" }}>{row.task_name}</div>
            ),
            sortable: true,
            width: "150px",
        },
        {
            name:"Status", 
            selector: (row) => row.status,
            sortable: true

        },
        {
            name:"Associated",
            sortable: true
        },
        {
            name:"Due Date",
            selector:(row) => row.due_date,
            sortable: true
        },
        {
            name:"Updated Date",
            selector:(row) => row.updated_at,
            sortable: true
        },
        {
            name: "Action",
            selector: (row) => (
                <div className="action-icon">
                <button
                  className="ms-2 icon-button"
                  title="Edit"
                >
                  <i className="bi bi-pen edit"></i>
                </button>
                <button
                  className="ms-2 icon-button"
                  title="Delete"
                >
                  <i className="bi bi-trash-fill danger"></i>
                </button>
              </div>
            )
        }
      ]
  return (
    <div>
        <DataTable columns={columns} data={data} defaultSortFieldId={1} pagination paginationComponentOptions={paginationComponentOptions} selectableRows onSelectedRowsChange={selectUidDataTable} />
    </div>
  )
}

export default DatatableTask