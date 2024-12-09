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
import WeeklyReport from "./WeeklyReport";
import { fa } from "@faker-js/faker";
import { getPks } from "../../../action/GetPks";

const EditDataSecondDeals = () => {
  const token = localStorage.getItem("token");

  const { detailDataDeals } = useSelector((state) => state.DataDeals);
  const [ShowFQP, setShowFQP] = useState(false);
  const [ShowLPP, setShowLPP] = useState(false);
  const [ShowFDC, setShowFDC] = useState(false);
  const [showFormRoi, setShowFormRoi] = useState(false);
  const [showFormPks, setShowFormPks] = useState(false);
  const [showActivity, setShowActivity] = useState(false)
  const [showWeeklyReport, setShowWeeklyReport] = useState(false)
  const handleShowFQP = () => {
    setShowFQP(!ShowFQP);
    setShowLPP(false);
    setShowFDC(false);
    setShowFormRoi(false);
    setShowFormPks(false)
    setShowWeeklyReport(false)
    localStorage.setItem('activeForm', 'FQP');
  };

  const handleShowLPP = () => {
    setShowLPP(!ShowLPP);
    setShowFDC(false);
    setShowFQP(false);
    setShowFormRoi(false);
    setShowFormPks(false)
    setShowWeeklyReport(false)
    localStorage.setItem('activeForm', 'LPP');
  };

  const handleShowFDC = () => {
    setShowFDC(!ShowFDC);
    setShowLPP(false);
    setShowFQP(false);
    setShowFormRoi(false);
    setShowFormPks(false)
    setShowWeeklyReport(false)
    localStorage.setItem('activeForm', 'FDC');
  };
  const handleShowRoi = () => {
    setShowFormRoi(!showFormRoi);
    setShowFDC(false);
    setShowFQP(false);
    setShowLPP(false);
    setShowFormPks(false)
    setShowWeeklyReport(false)
    localStorage.setItem('activeForm', 'ROI');
  };
  const handleShowPks = () => {
    setShowFormPks(!showFormPks);
    setShowFDC(false);
    setShowFQP(false);
    setShowLPP(false);
    setShowFormRoi(false);
    setShowWeeklyReport(false)
    localStorage.setItem('activeForm', 'PKS');
  };
  const HandleButtonActivity = () => {
    setShowActivity(!showActivity)
  }

  const handleButtonWeeklyReport = () => {
    setShowWeeklyReport(!showWeeklyReport)
    setShowFDC(false);
    setShowFQP(false);
    setShowLPP(false);
    setShowFormRoi(false);
    setShowFormPks(false)
    localStorage.setItem('activeForm', 'WeeklyActivities');
  }
  const { uid } = useParams();
  const dispatch = useDispatch();
  const { listResult } = useSelector((state) => state.FormCompany);
  const { dataActivityDeals } = useSelector((state) => state.DataActivityDeals)
  const { dataPks } = useSelector((state) => state.DataPks) 
  
  
  
  
  useEffect(() => {
    dispatch(GetDataActivity(uid, token));
    dispatch(GetDataDealsDetail(uid, token));
    dispatch(getListCompany(token));
    dispatch(getPks(uid, token))

    const savedState = localStorage.getItem('activeForm')
   
    if (savedState) {
      // Set the correct state based on the saved value
      switch (savedState) {
        case 'FQP':
          setShowFQP(true);
          break;
        case 'LPP':
          setShowLPP(true);
          break;
        case 'FDC':
          setShowFDC(true);
          break;
        case 'ROI':
          setShowFormRoi(true);
          break;
        case 'PKS':
          setShowFormPks(true);
          break;
        case 'WeeklyActivities':
          setShowWeeklyReport(true);
        default:
          break;
      }
    }
    
    const handleBeforeUnload = () => {
      localStorage.removeItem('activeForm');
    };

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
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
            HandleButtonActivity={HandleButtonActivity}
            showActivity={showActivity}
            handleButtonWeeklyReport={handleButtonWeeklyReport}
            showWeeklyReport={showWeeklyReport}
          />
          
          <div className="row mt-3">
            {detailDataDeals?.staging_uid === "M-s3254fdg" ? 
            <CloseLost  data={detailDataDeals} /> : ""}
            {showFormPks ? <FormPks data={detailDataDeals} dataPks={dataPks}/> : ""}
            {showFormRoi ? <InputRoi data={detailDataDeals} /> : ""}
            {showWeeklyReport ? <WeeklyReport data={detailDataDeals} /> : ''}
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
          {/* <WeeklyReport show={showWeeklyReport} handleButtonWeeklyReport={handleButtonWeeklyReport} uid={uid} /> */}
        </div>
      </Main>
    </body>
  );
};

export default EditDataSecondDeals;
