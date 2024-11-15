import React from "react";
import { Card } from "react-bootstrap";
import BasicInformation from "./part/BasicInformation";
import NpsCustomer from "./part/NpsCustomer";
import ExistingUnit from "./part/ExistingUnit";
import NewUnit from "./part/NewUnit";
import EnvironmentalBasic from "./part/EnvironmentalBasic";
import OtherInformation from "./part/OtherInformation";
import NoteOther from "./part/NoteOther";
const ShowFQP = ({ data }) => {
  const position = localStorage.getItem("position")
  return (
    <Card.Body>
      <BasicInformation data={data} />
      <NpsCustomer data={data} position={position} />
      {position !== "adsfasdf1321" ? 
      <ExistingUnit data={data} position={position} /> : "" }
      <NewUnit data={data} position={position} />
      {position !== "adsfasdf1321" ? 
      <EnvironmentalBasic data={data} /> : ""}
      {position !== "1-bZKHtNZCFWGg" && position !== "573MloZ8j--aaQ" && position !== "SzhgAQn6tP48xw" && position !== "adsfasdf1321" ? 
      <>
        <OtherInformation data={data} position={position} /> 
        <NoteOther data={data} />
      </>
      : "" }
    </Card.Body>
  );
};

export default ShowFQP;
