import React from "react";
import { Card } from "react-bootstrap";

const NoteOther = ({ data }) => {
  return (
    <Card className="mb-3 uniform-spacing">
      <Card.Body>
        <h5 className="fw-bold mb-3">Catatan Lainnya</h5>
        <p>
          {data && typeof data.another_notes === "string" ? (
            <span
              dangerouslySetInnerHTML={{
                __html: data.another_notes,
              }}
            />
          ) : (
            "-"
          )}
        </p>
      </Card.Body>
    </Card>
  );
};

export default NoteOther;
