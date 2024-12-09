import { faCalendarWeek, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import DataTable from 'react-data-table-component'

const DatatableAmbasador = ({ data, paginationPerPage, handleChangePage, handlePagePerChange }) => {
  return (
    <>
        <DataTable 
            // data={data}
            columns={ColumnsTable}
            customStyles={CustomStyles}
            pagination
            paginationServer
            responsive
            highlightOnHover
            paginationPerPage={paginationPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handlePagePerChange}
            paginationComponentOptions={{
                noRowsPerPage: true,
              }}
        />
    </>
  )
}

export default DatatableAmbasador


export const ColumnsTable = [
    {
      name: "Name",
      selector:(row) => {
        return(
          <div style={{ fontSize:"12px", fontWeight:"500"}}>
              {row?.deals?.company?.name || ""}
          </div>
        )
        
      },
      width:"180px",
    },
    {
      name: "Sales Ambasador",
      selector:(row) => {
        return(
          <div style={{ fontSize:"12px", fontWeight:"500"}}>
            {row?.user?.name || ""}
          </div>
        )
      }
    },
    {
      name:"Owner Deals",
      selector:(row) => {
        return(
          <div style={{ fontSize:"13px", fontWeight:"500"}}>
            {row?.deals?.owner?.name || ""}
          </div>
        )
        
      }
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <button
            className="ms-2 btn btn-primary btn-sm"
            title="delete"
          >
            <FontAwesomeIcon
              icon={faCalendarWeek}
              style={{ width: "23px", height: "13px" }}
            />
          </button>
        </div>
      ),
    },
  ];

  export const CustomStyles = {
    headCells: {
        style: {
          fontSize: '45px', // Ubah ukuran font header
          fontWeight: '500',
        },
      },
      cells: {
        style: {
          fontSize: '20px', // Ubah ukuran font body tabel
        },
      },
  };