import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const NpsCustomer = ({data, position}) => {
  return (
      <>
      {position !== "1-bZKHtNZCFWGg" && position !== "573MloZ8j--aaQ" && position !== "SzhgAQn6tP48xw" ?(
        <>
        <Card className="mb-3 uniform-spacing">
        <Card.Body>
          <h5 className="fw-bold mb-3">NPS Customer</h5>
          <Row style={{ fontFamily:"Rubik"}}>
            <Col md={4}>
              <h6>Promoters</h6>
              <ul className="ps-3">
                <li>{data && data.promoters && data.promoters.length > 0
                        ? data.promoters[0]?.name
                        : "-"}</li>
                <li>{data && data.promoters && data.promoters.length > 1
                        ? data.promoters[1]?.name
                        : "-"}</li>
                <li>{data && data.promoters && data.promoters.length > 2
                        ? data.promoters[2]?.name
                        : "-"}</li>
              </ul>
            </Col>
            <Col md={4}>
              <h6>Neutrals</h6>
              <ul className="ps-3">
                <li>{data && data.neutrals && data.neutrals.length > 0
                        ? data.neutrals[0]?.name
                        : "-"}</li>
                <li>{data && data.neutrals && data.neutrals.length > 1
                        ? data.neutrals[1]?.name
                        : "-"}</li>
                <li>{data && data.neutrals && data.neutrals.length > 2
                        ? data.neutrals[2]?.name
                        : "-"}</li>
              </ul>
            </Col>
            <Col md={4}>
              <h6>Detractors</h6>
              <ul className="ps-3">
                <li>{data && data.detcractors && data.detcractors.length > 0
                        ? data.detcractors[0]?.name
                        : "-"}</li>
                <li>{data && data.detcractors && data.detcractors.length > 1
                        ? data.detcractors[1]?.name
                        : "-"}</li>
                <li>{data && data.detcractors && data.detcractors.length > 2
                        ? data.detcractors[2]?.name
                        : "-"}</li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      </>
      ) : ""}
    </> 
  )
}

export default NpsCustomer