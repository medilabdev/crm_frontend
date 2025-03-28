import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import BreadcrumbNeedApproval from "./partials/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Card from "../../../components/Card";
import TopButton from "./partials/TopButton";
import DatatableNeedApproval from "./partials/Datatable";
import { GetListNeedApprovalManager } from "../../../action/DataNeedApprovalManager";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetListNeedApprovalAccounting } from "../../../action/DataNeedApprovalAccounting";

const NeedApprovalSecondDeals = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const {
    ResultNeedManager,
    LoadingNeedManager,
    ErrorNeedManager,
    totalDataManager,
  } = useSelector((state) => state.NeedApprovalManager);
  const [searchInput, setSearchInput] = useState([]);
  const [pending, setPending] = useState(true);
  const handleSearchInput = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value.toLowerCase();
      setSearchInput(value);
    }
  };

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const handleChangePage = (page) => {
    setPagination((e) => ({ ...e, page }));
  };

  const handlePagePerChange = (pageSize, page) => {
    setPagination((prev) => ({ ...prev, pageSize, page }));
  };
  useEffect(() => {
    dispatch(GetListNeedApprovalManager(token, pagination, searchInput));
    const timeoutId = setTimeout(() => {
      setPending(false);
    }, 1040);
    return () => clearTimeout(timeoutId);
  }, [dispatch, pagination, searchInput]);

  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
          <BreadcrumbNeedApproval />
          <Card className="shadow-sm">
            <TopButton />
              <div className="col-md-5 float-end">
              <div
                    className="input-group shadow mt-3"
                  >
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
                      onKeyDown={handleSearchInput}
                      className="form-control"
                      id=""
                    />
              </div>
              </div>
            <div className="col-12">
                <DatatableNeedApproval
                  NeedApprovalManager={ResultNeedManager}
                  paginationPerPage={pagination.limit}
                  handleChangePage={handleChangePage}
                  handlePagePerChange={handlePagePerChange}
                  totalRows={totalDataManager}
                  pending={pending}
                  />
                  </div>
          </Card>
                  </div>
        </div>
      </Main>
    </body>
  );
};

export default NeedApprovalSecondDeals;
