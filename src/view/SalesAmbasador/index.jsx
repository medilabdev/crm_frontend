import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Template/Topbar'
import Sidebar from '../../components/Template/Sidebar'
import Main from '../../components/Template/Main'
import BreadcrumbIndex from './part/BreadcrumbIndex'
import Card from '../../components/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'
import DatatableAmbasador from './part/DatatableAmbasador'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getDataDealsAmbasador } from '../../action/GetDataAmbasador'

const SalesAmbasador = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [searchInput, setSearchInput] = useState({});
  const [pending, setPending] = useState(true);
  const handleSearchInput = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value.toLowerCase();
      setSearchInput(value);
    }
  };

  const handleChangePage = (page) => {
    setPagination((e) => ({ ...e, page }));
  };
  
  const handlePagePerChange = (pageSize, page) => {
    setPagination((prev) => ({ ...prev, pageSize, page }));
  };

  const token = localStorage.getItem("token")
  const {listDataAmbasador} = useSelector((state) => state.DataDealsAmbasador)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataDealsAmbasador(token, pagination, searchInput))
    const timeoutId = setTimeout(() => {
      setPending(false);
    }, 1040);
    return () => clearTimeout(timeoutId);
  }, [dispatch, pagination, searchInput])

  console.log(listDataAmbasador);
  
  return (
    <body id='body'>
        <Topbar />
        <Sidebar />
        <Main>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <BreadcrumbIndex />
                </div>
                <div className="col-md-12">
                  <Card className="shadow-sm">
                    <div className="row">
                        <div className="col-md-5 ms-auto mt-3">
                          <div className="input-group shadow-sm mt-3">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              style={{
                                borderEndEndRadius: 0,
                                borderStartEndRadius: 0,
                              }}
                            >
                            <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              className="fs-4"
                            />
                          </span>
                       </div>
                        <input
                          type="text"
                          placeholder="Search Input"
                          className="form-control"
                          onKeyDown={handleSearchInput}
                        />
                          </div>
                        </div>
                        <div className="col-md-12 mt-3 p-4">
                              <DatatableAmbasador data={listDataAmbasador} paginationPerPage={pagination.limit} handleChangePage={handleChangePage} handlePagePerChange={handlePagePerChange} />
                        </div>
                    </div>
                  </Card>
                </div>
              </div>
              
            </div>
        </Main>
    </body>
  )
}

export default SalesAmbasador