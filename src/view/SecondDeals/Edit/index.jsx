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

const EditDataSecondDeals = () => {
  const token = localStorage.getItem("token");
  const { detailDataDeals } = useSelector((state) => state.DataDeals);
  const stage = detailDataDeals?.staging?.name;
  const [ShowFQP, setShowFQP] = useState(stage === "leads" ? true : false);
  const [ShowLPP, setShowLPP] = useState(stage === "Approaching" ? true : false);
  const [ShowFDC, setShowFDC] = useState(stage === "Decide" ? true : false);
  const handleShowFQP = () => {
    setShowFQP(!ShowFQP);
  };

  const handleShowLPP = () => {
    setShowLPP(!ShowLPP);
  };

  const handleShowFDC = () => {
    setShowFDC(!ShowFDC);
  };
  const { uid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetDataDealsDetail(uid, token));
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
          />
          <div className="row mt-3">
            {ShowFQP ? (
              <FQP
                userUid={detailDataDeals.owner_user_uid}
                dataFQP={detailDataDeals?.fqp_document}
              />
            ) : (
              ""
            )}
            {ShowLPP ? <LPP userUid={detailDataDeals.owner_user_uid} /> : ""}
            {ShowFDC ? <FDC userUid={detailDataDeals.owner_user_uid} /> : ""}
          </div>
        </div>
      </Main>
    </body>
  );
};

export default EditDataSecondDeals;
