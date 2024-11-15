import React, { useState } from "react";
import { Card } from "react-bootstrap";
import DataTableRab from "./Lpp/Rab";
import DataTableFeeAction from "./Lpp/FeeAction";
import DataTableRekapBiaya from "./Lpp/RekapBiaya";
import ReactQuill from "react-quill";
import Timeline from "./Lpp/Timeline";
import SupportKerjaSama from "./Lpp/SupportKerjaSama";
import {
  faDownload,
  faEye,
  faMoneyBillTrendUp,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowLPP from "./ShowLPP";
import InputLpp from "./Lpp/InputLpp";
import EditLpp from "./ShowLPP/EditLpp";
import { BlobProvider, Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import Betul from "./../../../assets/img/betul.png"
import { LppPdf } from "./ShowLPP/downloadLpp/PdfLpp";
import { position } from "../partials/ColumnsTable";

const LPP = ({ userUid, data, listCompany, uidDeals }) => {
  // console.log(data?.staging?.name);
  
  const [showLpp, setShowLpp] = useState(true);
  const uid = localStorage.getItem("uid");
  const handleShowLpp = () => setShowLpp(!showLpp);

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = "lpp_" + (data?.lpp_document?.customer?.name || "") + ".pdf";
    link.click();
  };
  const staging = data?.staging?.name;
  
  return (
    <div id="LPP">
      <div className="col-12">
        <Card>
          <Card.Header className="text-center">
            <div className="">
              <span className="fs-5 fw-semibold" style={{ fontWeight: 700, letterSpacing:"1.3px"}}>
                {data?.lpp_document === null
                  ? "Lembar Persetujuan Project"
                  : "Edit Lembar Persetujuan Project"}
              </span>
              <div className="float-end">
                <button className="btn btn-primary" onClick={handleShowLpp}>
                  <FontAwesomeIcon
                    icon={
                      userUid !== uid ? faEye : showLpp ? faEye : faPenToSquare
                    }
                  />
                </button>
                {position !== "adsfasdf1321" ?
                <BlobProvider document={<LppPdf data={data} />}>
                    {({blob, url, loading, error}) => (
                      !loading && !error && (
                        <button className="btn ms-2 btn-success" onClick={() => handleDownload(url)}>
                        <FontAwesomeIcon icon={faDownload} />
                        </button>
                      )
                    )}
                </BlobProvider> : ""}
              </div>
            </div>
          </Card.Header>
          {data?.lpp_document === null ? (
            <InputLpp
              data={data}
              listCompany={listCompany}
              uidDeals={uidDeals}
            />
          ) : userUid !== uid ? (
            <ShowLPP data={data} />
          ) : showLpp ? (
            <EditLpp data={data?.lpp_document} listCompany={listCompany}  uidDeals={uidDeals} dataFqp={data} />
          ):(
            <ShowLPP data={data} />
          )
          }
        </Card>
      </div>
    </div>
  );
};

export default LPP;
