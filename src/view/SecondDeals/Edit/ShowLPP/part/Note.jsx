import React from 'react'
import { Card, Table } from 'react-bootstrap'

const Note = ({ data }) => {
  return (
    <Card className="mb-3 uniform-spacing col-md">
        <Card.Body> 
          <h5 className="fw-bold mb-3"> Catatan</h5>
          <Table borderless className="mb-0">
            <tbody style={{ fontFamily:"Rubik"}}>
            <tr className="fw-medium">
          <td>
          {data && data.lpp_document?.postscript ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: data.lpp_document?.postscript,
                }}
              />
            ) : (
              "-"
            )}</td>
        </tr>
            </tbody>
          </Table>
        </Card.Body>
    </Card>
  )
}

export default Note