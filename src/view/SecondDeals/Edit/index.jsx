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
import { GetDataActivity, GetDataDealsDetail } from "../../../action/DataDeals";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getListCompany } from "../../../action/FormCompany";
import InputRoi from "./Lpp/InputRoi";
import FormPks from "./FormPks";
import HistoryDeals from "./ShowLPP/history";
import CloseLost from "./CloseLost";
import Activity from "./activity";

const EditDataSecondDeals = () => {
  const token = localStorage.getItem("token");

  const { detailDataDeals } = useSelector((state) => state.DataDeals);
  const [ShowFQP, setShowFQP] = useState(true);
  const [ShowLPP, setShowLPP] = useState(false);
  const [ShowFDC, setShowFDC] = useState(false);
  const [showFormRoi, setShowFormRoi] = useState(false);
  const [showFormPks, setShowFormPks] = useState(false);
  const [showActivity, setShowActivity] = useState(false)
  const handleShowFQP = () => {
    setShowFQP(!ShowFQP);
    setShowLPP(false);
    setShowFDC(false);
    setShowFormRoi(false);
    setShowFormPks(false)
  };

  const handleShowLPP = () => {
    setShowLPP(!ShowLPP);
    setShowFDC(false);
    setShowFQP(false);
    setShowFormRoi(false);
    setShowFormPks(false)
  };

  const handleShowFDC = () => {
    setShowFDC(!ShowFDC);
    setShowLPP(false);
    setShowFQP(false);
    setShowFormRoi(false);
    setShowFormPks(false)
  };
  const handleShowRoi = () => {
    setShowFormRoi(!showFormRoi);
    setShowFDC(false);
    setShowFQP(false);
    setShowLPP(false);
    setShowFormPks(false)
  };
  const handleShowPks = () => {
    setShowFormPks(!showFormPks);
    setShowFDC(false);
    setShowFQP(false);
    setShowLPP(false);
    setShowFormRoi(false);
  };
  const HandleButtonActivity = () => {
    setShowActivity(!showActivity)
  }
  const { uid } = useParams();
  const dispatch = useDispatch();
  const { listResult } = useSelector((state) => state.FormCompany);
  const { dataActivityDeals } = useSelector((state) => state.DataActivityDeals)
 
  useEffect(() => {
    dispatch(GetDataActivity(uid, token));
    dispatch(GetDataDealsDetail(uid, token));
    dispatch(getListCompany(token));
  }, [dispatch, uid, token]);
  
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <BreadcrumbEdit />
          {detailDataDeals?.staging_uid !== "M-s3254fdg" ? (
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
            HandleButtonActivity={HandleButtonActivity}
            showActivity={showActivity}
          />
          ) : ""}
          
          <div className="row mt-3">
            {detailDataDeals?.staging_uid === "M-s3254fdg" ? 
            <CloseLost  data={detailDataDeals} /> : ""}
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
          <Activity show={showActivity} HandleButtonActivity={HandleButtonActivity} uid={uid} data={dataActivityDeals}/>
        </div>
      </Main>
    </body>
  );
};

export default EditDataSecondDeals;
