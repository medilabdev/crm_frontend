import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import BreadcrumbEdit from "./breadcrumb";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TopButton from "./TopButton";
import FQP from "./FQP";
import LPP from "./LPP";
import FDC from "./FDC";
import { useDispatch } from "react-redux";
import { GetDataDealsDetail } from "../../../action/DataDeals";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getListCompany } from "../../../action/FormCompany";
import InputRoi from "./Lpp/InputRoi";
import FormPks from "./FormPks";
import HistoryDeals from "./ShowLPP/history";

const EditDataSecondDeals = () => {
  const token = localStorage.getItem("token");
  const { detailDataDeals } = useSelector((state) => state.DataDeals);
  const stage = detailDataDeals?.staging?.name;
  const [ShowFQP, setShowFQP] = useState(true);
  const [ShowLPP, setShowLPP] = useState(false);
  const [ShowFDC, setShowFDC] = useState(false);
  const [showFormRoi, setShowFormRoi] = useState(false);
  const [showFormPks, setShowFormPks] = useState(false);
  const handleShowFQP = () => {
    setShowFQP(!ShowFQP);
  };

  const handleShowLPP = () => {
    setShowLPP(!ShowLPP);
  };

  const handleShowFDC = () => {
    setShowFDC(!ShowFDC);
  };
  const handleShowRoi = () => {
    setShowFormRoi(!showFormRoi);
  };
  const handleShowPks = () => {
    setShowFormPks(!showFormPks);
  };
  const { uid } = useParams();
  const dispatch = useDispatch();
  const { listResult } = useSelector((state) => state.FormCompany);

  useEffect(() => {
    dispatch(GetDataDealsDetail(uid, token));
    dispatch(getListCompany(token));
  }, [dispatch]);
  
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <BreadcrumbEdit />
          <TopButton
            handleShowFQP={handleShowFQP}
            ShowFQP={ShowFQP}
            handleShowLPP={handleShowLPP}
            ShowLPP={ShowLPP}
            handleShowFDC={handleShowFDC}
            ShowFDC={ShowFDC}
            data={detailDataDeals}
            uid={uid}
            handleShowRoi={handleShowRoi}
            showFormRoi={showFormRoi}
            handleShowPks={handleShowPks}
            showFormPks={showFormPks}
          />
          <div className="row mt-3">
            {showFormPks ? <FormPks data={detailDataDeals} /> : ""}
            {showFormRoi ? <InputRoi data={detailDataDeals} /> : ""}
            {ShowFDC ? (
              <FDC
                userUid={detailDataDeals.owner_user_uid}
                data={detailDataDeals}
              />
            ) : (
              ""
            )}
            {ShowLPP ? (
              <LPP
                userUid={detailDataDeals.owner_user_uid}
                data={detailDataDeals}
                listCompany={listResult}
                uidDeals={detailDataDeals.uid}
              />
            ) : (
              ""
            )}
            {ShowFQP ? (
              <FQP
                userUid={detailDataDeals.owner_user_uid}
                dataFQP={detailDataDeals?.fqp_document}
                listCompany={listResult}
                data={detailDataDeals}
              />
            ) : (
              ""
            )}
            <HistoryDeals data={detailDataDeals.history} />
          </div>
        </div>
      </Main>
    </body>
  );
};

export default EditDataSecondDeals;
