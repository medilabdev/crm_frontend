import { faArrowRight, faArrowRightLong, faBuilding, faContactCard, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

const TopSales = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className='mb-3'>
      <div className="d-flex justify-content-end align-items-center mb-4">
        <button className="mb-0 me-3 fs-5 btn btn-sm btn-primary d-flex align-items-center">
          Filter Date <FontAwesomeIcon icon={faArrowRightLong} className="ms-2" />
        </button>
        <input
          type="date"
          placeholder="dd/mm/yyyy"
          className="form-control me-2"
          style={{ maxWidth: "200px" }}
        />
        <input
          type="date"
          placeholder="dd/mm/yyyy"
          className="form-control"
          style={{ maxWidth: "200px" }}
        />
    </div>

         <Row className="g-4">
        <Col md={8}>
          {/* Info Cards */}
          <Row>
            <Col md={6}>
              <Card className="info-card shadow-sm">
                <Card.Body>
                  <h5 className='fw-semibold'><FontAwesomeIcon icon={faContactCard}  className='fs-4 me-2'/> Data Contact</h5>
                  <h4>
                     Data Contact Today  <span style={{
                          color: "white",
                          fontSize: "1.2rem",
                          backgroundColor: "rgba(59, 130, 246, 0.8)",
                          borderRadius: "20%",
                          padding: "0.5rem",
                          textAlign: "center",
                          height: "2rem",
                    }}>10</span> 
                  </h4>
                  <hr />
                  <Button className='btn-sm btn-success'>100</Button> Than Yesterday
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="info-card shadow-sm">
                <Card.Body>
                  <h5 className='fw-semibold'><FontAwesomeIcon icon={faBuilding} className='fs-4 me-2' /> Data Deals</h5>
                  <h4>
                    Stage Leads Deals Today <span style={{
                          color: "white",
                          fontSize: "1.2rem",
                          backgroundColor: "rgba(59, 130, 246, 0.8)",
                          borderRadius: "20%",
                          padding: "0.5rem",
                          textAlign: "center",
                          height: "2rem",
                    }}>22</span> 
                  </h4>
                  <hr />
                  <Button className='btn-sm' bg="primary">50</Button> Than last week
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col md={4}>
          {/* Top 5 Lead Sources */}
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3"><FontAwesomeIcon icon={faTrophy} className='fs-4 me-2'/> Top Sales Off The Month</h5>
              <ol className="lead-sources-list">
                <li>
                  Nina  <span className="float-end">(65)</span>
                </li>
                <li>
                  Joni <span className="float-end">(74)</span>
                </li>
                <li>
                  Toni <span className="float-end">(32)</span>
                </li>
                <li>
                  Tono <span className="float-end">(25)</span>
                </li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default TopSales