import React, { useState } from "react";
import { Card } from "react-bootstrap";
import EditFormDataBank from "../FDC/EditFormDataBank";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import InformationCompany from "./PartShowFDC/InformationCompany";
import DataTax from "./PartShowFDC/DataTax";
import DataBank from "./PartShowFDC/DataBank";
import DokumentFDC from "./PartShowFDC/DokumentFDC";
import DataDirection from "./PartShowFDC/DataDirection";

const ShowFDC = ({ show, CompanyName, data }) => {
  const typeHospital = data?.company?.hospital_type?.name || '';
  
  return (
    <Card.Body>
      <InformationCompany show={show} CompanyName={CompanyName} />
      <DataTax show={show} />
      <DataDirection show={show} typeHospital={typeHospital} />
      
        <DataBank show={show} />
        <DokumentFDC show={show} />
    </Card.Body>
  );
};

export default ShowFDC;
