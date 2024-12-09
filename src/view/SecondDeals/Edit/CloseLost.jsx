import React from 'react'
import { Card } from "react-bootstrap";


const CloseLost = ({ data }) => {
  return (
    <div className='col'>
    <Card>
        <Card.Header><span className="fs-5 fw-semibold text-danger">Close Lost</span></Card.Header>
        <Card.Body>
        <table className="mb-4"> 
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Lost Reason
          </td>
          <td className="px-1">:</td>
          <td>{data && data.lost_reason ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: data.lost_reason,
                }}
              />
            ) : (
              "-"
            )}</td>
        </tr>
        </table >   
        <table className="mb-4"> 
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Competitor
          </td>
          <td className="px-1">: </td>
          <td>{data && data.lost_competitor ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: data.lost_competitor,
                }}
              />
            ) : (
              "-"
            )}</td>
        </tr>
        </table >   
        <table className="mb-4"> 
        <tr className="fw-medium">
          <td style={{ width: "300px", fontSize: "0.9rem" }}>
            Competitor Quantity / Quality
          </td>
          <td className="px-1">:</td>
          <td>{data && data.lost_competitor ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: data.lost_competitor,
                }}
              />
            ) : (
              "-"
            )}</td>
        </tr>
        </table >   
        </Card.Body>
    </Card>
    </div>
  )
}

export default CloseLost