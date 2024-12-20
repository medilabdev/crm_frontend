import React from "react";
import { Card } from "react-bootstrap";
import TableRab from "./TableRab";
import TableSupport from "./TableSupport";
import TableFee from "./TableFee";
import RekapBiaya from "./RekapBiaya";
import Timeline from "./Timeline";
import TypeWork from "./part/TypeWork";
import TermWork from "./part/TermWork";
import Equipment from "./part/Equipment";
import Target from "./part/Target";
import Customer from "./part/Customer";
import Note from "./part/Note";
import TimelineShow from "./part/Timeline";

const ShowLPP = ({ data }) => {
  const position = localStorage.getItem('position')
  
  return (
    <Card.Body>
      {position !== "1-bZKHtNZCFWGg" && position !== "573MloZ8j--aaQ" && position !== "SzhgAQn6tP48xw"  ? <Customer data={data}/>  : ""}
        {position !== "1-bZKHtNZCFWGg" && position !== "SzhgAQn6tP48xw"  ? <TypeWork data={data} /> : ""}
       {position !== "1-bZKHtNZCFWGg" && position !== "573MloZ8j--aaQ" && position !== "SzhgAQn6tP48xw"  ? <TermWork data={data} />  : ""}
     
      <Equipment data={data} />
      {position !== "1-bZKHtNZCFWGg" && position !== "SzhgAQn6tP48xw"  ? <Target data={data} /> : "" } 
      
      {position !== "1-bZKHtNZCFWGg" && position !== "SzhgAQn6tP48xw" ?
         data?.lpp_document?.rab.length > 0 ? (
          <>
          <div className="p-2 mb-3">
          <TableRab data={data?.lpp_document || ""} />
          </div>
          <hr />
          </> )
        : ('')
        : ''}
      {(position !== "1-bZKHtNZCFWGg" && position !== "SzhgAQn6tP48xw")  ?
        data?.lpp_document?.support.length > 0  ? (
        <>
          <div className="p-2 mb-3">
            <TableSupport data={data?.lpp_document} />
          </div>
        <hr />
       </>
        ) : (
          " "
        )
     
      : '' }
      {position !== "1-bZKHtNZCFWGg" && position !== "573MloZ8j--aaQ" && position !== "SzhgAQn6tP48xw"  ? 
        data?.lpp_document?.fee.length > 0 ? (
          <>
            <div className="p-2 mb-3">
                <TableFee data={data?.lpp_document || ""} />
            </div>
            <hr />
         </> 
        ) : (" ")
      : '' }

    
      {position !== "1-bZKHtNZCFWGg" && position !== "SzhgAQn6tP48xw" && position !== "573MloZ8j--aaQ" ?  <RekapBiaya data={data?.lpp_document || ""} /> : ''}
      
    <TimelineShow data={data} />
    {position !== "1-bZKHtNZCFWGg" && position !== "573MloZ8j--aaQ" && position !== "SzhgAQn6tP48xw"  ? 
      <>
      <Note data={data}/>
    </> 
    : ''}
    </Card.Body>
  );
};

export default ShowLPP;
