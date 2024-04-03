import React, { useState } from "react";
import { Card } from "react-bootstrap";
import DataTableRab from "./Lpp/Rab";
import DataTableFeeAction from "./Lpp/FeeAction";
import DataTableRekapBiaya from "./Lpp/RekapBiaya";
import ReactQuill from "react-quill";
import Timeline from "./Lpp/Timeline";
import SupportKerjaSama from "./Lpp/SupportKerjaSama";
import {
  faEye,
  faMoneyBillTrendUp,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowLPP from "./ShowLPP";
import InputLpp from "./Lpp/InputLpp";
import EditLpp from "./ShowLPP/EditLpp";

const LPP = ({ userUid, data, listCompany, uidDeals }) => {
  const [showLpp, setShowLpp] = useState(true);
  const uid = localStorage.getItem("uid");
  const handleShowLpp = () => setShowLpp(!showLpp);
  console.log(data);
  return (
    <div id="LPP">
      <div className="col-12">
        <Card>
          <Card.Header>
            <div className="">
              <span className="fs-5 fw-semibold">
                Lembar Persetujuan Project
              </span>
              <div className="float-end">
                <button className="btn btn-primary" onClick={handleShowLpp}>
                  <FontAwesomeIcon
                    icon={
                      userUid !== uid ? faEye : showLpp ? faEye : faPenToSquare
                    }
                  />
                </button>
              </div>
            </div>
          </Card.Header>
          {data?.lpp_document === null ? <InputLpp data={data} listCompany={listCompany} uidDeals={uidDeals} /> : userUid !== uid ? (
            <ShowLPP />
          ) : showLpp ? (
            <EditLpp />
          ) : (
            <ShowLPP data={data} />
          )}
         
        </Card>
      </div>
    </div>
  );
};

export default LPP;
