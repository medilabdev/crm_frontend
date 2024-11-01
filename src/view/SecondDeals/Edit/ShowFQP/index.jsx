import React from "react";
import { Card } from "react-bootstrap";
import BasicInformation from "./part/BasicInformation";
import NpsCustomer from "./part/NpsCustomer";
import ExistingUnit from "./part/ExistingUnit";
import NewUnit from "./part/NewUnit";
import EnvironmentalBasic from "./part/EnvironmentalBasic";
import OtherInformation from "./part/OtherInformation";
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
        <div class="fw-bold mb-3">
          <span className="fs-6 text-decoration-underline">Catatan lainnya</span>
        </div>
        <table className="mb-4">
          <tr className="fw-medium">
            <td>{data && data.another_notes ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: data.another_notes,
                  }}
                />
              ) : (
                "-"
              )}</td>
          </tr>
        </table>
      </>
      : "" }
    </Card.Body>
  );
};

export default ShowFQP;
