import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import ShowFQP from "./ShowFQP";
import InputFQP from "./ShowFQP/InputFQP";

const FQP = ({ userUid, dataFQP }) => {
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(!show);
  const uid = localStorage.getItem("uid");
 
  return (
    <div id="FQP">
      <div className="col-12">
        <Card>
          <Card.Header>
            <div className="">
              <span className="fs-5 fw-semibold">Qualifying Project Form</span>
              <div className="float-end">
                <button className="btn btn-primary" onClick={handleShow}>
                  <FontAwesomeIcon icon={userUid !== uid ? faEye : show ? faEye : faPenToSquare} />
                </button>
              </div>
            </div>
          </Card.Header>
          {userUid !== uid ? <ShowFQP data={dataFQP} /> : show ? <InputFQP /> : <ShowFQP data={dataFQP} />}
          <Card.Footer></Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default FQP;
