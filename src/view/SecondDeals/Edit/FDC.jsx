import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card } from "react-bootstrap";

import ShowFDC from "./ShowFDC";
import InputFDC from "./ShowFDC/InputFDC";
import EditFdc from "./ShowFDC/EditFdc";

const FDC = ({ userUid, data }) => {
  const [showFDC, setShowFDC] = useState(true);
  const handleShowFDC = () => setShowFDC(!showFDC);
  const uid = localStorage.getItem("uid");
  
  return (
    <div id="FDC" className="col-12">
      <Card className="shadow-sm">
        <Card.Header className="text-center">
          <div className="">
            <span className="fs-5 fw-semibold" style={{ fontWeight: 700, letterSpacing:"1.2px"}}>Formulir Data Customer</span>
            <div className="float-end">
              <button className="btn btn-primary" onClick={handleShowFDC}>
                <FontAwesomeIcon
                  icon={
                    userUid != uid ? faEye : showFDC ? faEye : faPenToSquare
                  }
                />
              </button>
            </div>
          </div>
        </Card.Header>
               
        {!data?.fdc_document && userUid === uid ? (
     // Jika tidak ada fdc_document dan userUid sama dengan uid, tampilkan InputFDC
        <InputFDC data={data} />
      ) : data?.fdc_document && userUid === uid ? (
        // Jika ada fdc_document dan userUid sama dengan uid, tampilkan EditFdc dan ShowFDC
        <>{showFDC ? <EditFdc data={data} /> :  
        <ShowFDC
            show={data.fdc_document}
            CompanyName={data?.lpp_document?.customer?.name}
            data={data}
          />
        }
          
          
        </>
      ) : !data?.fdc_document && userUid !== uid ? (
        // Jika tidak ada fdc_document dan userUid tidak sama dengan uid, tampilkan pesan "Belum Ada Data"
        <p className="p-5 fw-bold">Belum Ada Data</p>
      ) : (
        // Jika ada fdc_document dan userUid tidak sama dengan uid, tampilkan ShowFDC saja
        <ShowFDC
          show={data.fdc_document}
          CompanyName={data?.lpp_document?.customer?.name}
        />
      )}

      
      </Card>
    </div>
  );
};

export default FDC;
