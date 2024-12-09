import { faDownload, faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import ShowFQP from "./ShowFQP";
import InputFQP from "./ShowFQP/InputFQP";
import { BlobProvider } from '@react-pdf/renderer'
import PdfFqp from "./ShowFQP/part/PdfFqp";





const FQP = ({ userUid, dataFQP, listCompany }) => {
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(!show);

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Fqp.pdf';
    link.click();
  };
  
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
                  <FontAwesomeIcon
                    icon={
                      userUid !== uid ? faEye : show ? faEye : faPenToSquare
                    }
                  />
                </button>
                <BlobProvider document={<PdfFqp data={dataFQP} />}>
                  {({ blob, url, loading, error }) =>
               
                    !loading && !error && (
                      <button className="btn ms-2 btn-success" onClick={() => handleDownload(url)}>
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                    )
                  }
                </BlobProvider>
              </div>
            </div>
          </Card.Header>
          {userUid !== uid ? (
            <ShowFQP data={dataFQP} />
          ) : show ? (
            <InputFQP data={dataFQP} listCompany={listCompany} />
          ) : (
            <ShowFQP data={dataFQP} />
          )}
          <Card.Footer></Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default FQP;

