import React, { useState } from "react";
import { Accordion, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEnvelope, faPhone, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";

const FormDireksiAndPic = ({ handleInputChange, touchedFields, formDataDireksi, data, groups }) => {


  // Struktur Grup
 


  const isGroupComplete = (fields, groupIndex) => {
    // Grup dianggap lengkap jika semua field memiliki nilai DAN semua field disentuh
    return fields.every(
      (field) =>
        touchedFields[`direksi[${groupIndex}][${field}]`] &&
      formDataDireksi[`direksi[${groupIndex}][${field}]`]?.trim() !== ""
    );
  };

  return (
    <div>
      <div className="header-box">
        <FontAwesomeIcon icon={faUserTie} className="me-2" />
        Data Direksi
      </div>
      <Accordion defaultActiveKey="0" className="mb-3">
        {groups.map((group, index) => (
          <Accordion.Item eventKey={index.toString()} key={group.title}>
            <Accordion.Header>
              <FontAwesomeIcon icon={faUserTie} className="me-2" />
              {group.title}
              {isGroupComplete(group.fields, index) && (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ marginLeft: "10px", color: "green" }}
                />
              )}
            </Accordion.Header>
            <Accordion.Body>
              <Row>
                {group.fields.map((field, idx) => (
                  <Col md={4} key={idx}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FontAwesomeIcon
                          icon={
                            field === "phone_number"
                              ? faPhone
                              : field === "email"
                              ? faEnvelope
                              : faUser
                          }
                          className="me-2"
                        />
                        {field === "name"
                          ? "Nama"
                          : field === "phone_number"
                          ? "No. Telepon"
                          : "Email"}
                      </Form.Label>
                      <Form.Control
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        placeholder={`Masukkan ${field === "phone_number" ? `No Telp` : field}`}
                        onChange={(e) => handleInputChange(e, index, group.position)}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default FormDireksiAndPic;
