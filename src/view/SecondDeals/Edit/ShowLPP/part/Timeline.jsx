import React from 'react'
import { Card, Table } from 'react-bootstrap'
import Timeline from '../Timeline'

const TimelineShow = ({ data }) => {
  return (
    <>
        <Card className="mb-3 uniform-spacing col-md">
        <Card.Body> 
          <h5 className="fw-bold mb-3"> Term Kerjasama</h5>
          <Table borderless className="mb-2">
            <tbody style={{ fontFamily:"Rubik"}}>
              <tr>
                <td style={{ width: "350px" }}>Start Date Timeline</td>
                <td style={{ width: "5px", textAlign: "center" }}>:</td>
                <td> {data?.lpp_document?.timeline[0]?.year_period || "-"}</td>
              </tr>
            </tbody>
          </Table>
          <Timeline data={data?.lpp_document} />
        </Card.Body>
    </Card>
    </>
  )
}

export default TimelineShow