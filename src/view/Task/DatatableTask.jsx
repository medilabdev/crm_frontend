import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import EditTask from './Overlay/EditTask'

const DatatableTask = ({ data, selectUidDataTable }) => {
    const token = localStorage.getItem("token")
    const [editTask, setEditTask] = useState(false)
    const handleCloseEdit = () => {
      setEditTask(false)
    }
    const handleDelete = async (e) => {
      e.preventDefault();
      const isResult = await Swal.fire({
        title: "Hapus Task!.. apakah kamu yakin?",
        text: "Anda tidak dapat mengembalikan data ini setelah menghapusnya!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      })
      if(isResult.isConfirmed){

      }
    }


  
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
                  className="ms-2 icon-button" onClick={() =>setEditTask(row.uid)}
                  title="Edit"
                >
                  <i className="bi bi-pen edit"></i>
                </button>
                <button
                  className="ms-2 icon-button" onClick={handleDelete}
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
        <EditTask onClose={handleCloseEdit} visible={editTask !== false} uid={editTask} />
    </div>
  )
}

export default DatatableTask