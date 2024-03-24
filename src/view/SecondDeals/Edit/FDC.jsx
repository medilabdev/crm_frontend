import {
  faEye,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card } from "react-bootstrap";

import ShowFDC from "./ShowFDC";
import InputFDC from "./ShowFDC/InputFDC";

const FDC = ({ userUid}) => {
  const [showFDC, setShowFDC] = useState(true);
  const handleShowFDC = () => setShowFDC(!showFDC);
  const uid = localStorage.getItem("uid")
  
  return (
    <div id="FDC" className="col-12">
      <Card className="shadow-sm">
        <Card.Header>
          <div className="">
            <span className="fs-5 fw-semibold">Formulir Data Customer</span>
            <div className="float-end">
              <button className="btn btn-primary" onClick={handleShowFDC}>
                <FontAwesomeIcon icon={userUid !== uid ? faEye : showFDC ? faEye : faPenToSquare} />
              </button>
            </div>
          </div>
        </Card.Header>
        {userUid !== uid ? <ShowFDC /> :
        showFDC ? (
          <InputFDC />
        ) : (
          <ShowFDC />
        )}
      </Card>
    </div>
  );
};

export default FDC;
