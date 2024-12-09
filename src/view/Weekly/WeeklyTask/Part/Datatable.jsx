import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { DataDummy } from '../Dummy/Data';
import { ColumnsWeeklyTask } from './Columns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faList, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { GetDataWeeklyPlanTask } from '../../../../action/GetDataTask';
const Datatable = () => {
  const token = localStorage.getItem('token')
  const [pagination, setPagination] = useState({
    page:1,
    limit:10,
  })
  const [showFillOffCanvas, setShowFillOffCanvas] = useState([])
  const handleOpenOffcanvas = () => setShowFillOffCanvas(false);
  const handleCloseOffcanvas = () => showFillOffCanvas(false);
  
    const customStyles = {
        headCells: {
          style: {
            fontSize: "18px",
            fontWeight: "semibold",
            backgroundColor: "#f8f9fa",
            color: "#6c757d",
          },
        },
        rows: {
          style: {
            fontSize: "14px",
            minHeight: "72px",
            borderBottom: "1px solid #dee2e6",
          },
          highlightOnHoverStyle: {
            backgroundColor: "#f1f5f9",
          },
        },
      };
      const [search, setSearch] = useState("");
      // const filteredData = DataDummy.filter((item) =>
      //   item.profile.name.toLowerCase().includes(search.toLowerCase())
      // );
      const dispatch = useDispatch()
      const { dataWeekly } = useSelector((state) => state.DataWeeklyTask)
      const handleSearchDatatable = (e) => {
        if(e.key === "Enter"){
          const value = e.target.value.toLowerCase();
          setSearch(value)
        }
      }

      const handleChangePage = (page) => {
        setPagination((e) => ({ ...e, page }));
      };
    
      const handlePagePerChange = (pageSize, page) => {
        setPagination((prev) => ({ ...prev, pageSize, page }));
      };
      
      useEffect(() => {
        dispatch(GetDataWeeklyPlanTask(token, search, pagination))
      },[dispatch, search, pagination])
    return (
      <div className='container mt-4"'>
          <div className="d-flex justify-content-between mb-3">
          <div class="input-group m-2 w-50">
            <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faSearch} /></span>
            <input
              type="text"
              placeholder="Search"
              className="form-control"
              onKeyDown={handleSearchDatatable}
              />
            </div>
            </div>
            <DataTable
            data={dataWeekly || []}
            columns={ColumnsWeeklyTask(handleOpenOffcanvas)}
            customStyles={customStyles}
            highlightOnHover
            pagination
            selectableRows 
            className='mt-4 mb-3'
            />
      </div>
    )
}

export default Datatable