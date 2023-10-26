import React, { useState } from "react";
import { Card, FloatingLabel, Form, Offcanvas } from "react-bootstrap";
import OverlayAddDeals from "../../../components/Overlay/addDeals";

const AddDeals = () => {
  const [showCanvasDeals, setShowCanvasDeals] = useState(false);
  const handleCloseCanvasDeals = () => setShowCanvasDeals(false);
  const handleShowCanvasDeals = () => setShowCanvasDeals(true);
  return (
    <>
      <Card className="shadow">
        <Card.Header>
          <h5 className="mt-2">
            <i class="bi bi-currency-dollar  fs-4"></i>
            <span className="ms-2 fs-5 fw-bold mt-5">Deals</span>
          </h5>
        </Card.Header>
        <Card.Body>
          <form action="" method="post">
            <FloatingLabel
              controlId="floatingInput"
              label="Search Deals"
              className="mb-3"
            >
              <Form.Select>
                <option>Select Company</option>
                <option value="">Company 1</option>
                <option value="">Company 2</option>
              </Form.Select>
            </FloatingLabel>
          </form>
          <div className="text-center">
            <a
              onClick={handleShowCanvasDeals}
              className="text-primary text-decoration-none fw-semibold"
              style={{ cursor: "pointer" }}
            >
              <i class="bi bi-plus-lg" style={{ fontSize: "15px" }}></i>
              <span className="fs-6"> Create Another Deal</span>
            </a>
          </div>
        </Card.Body>
      </Card>
      <OverlayAddDeals
        visible={showCanvasDeals}
        onClose={handleCloseCanvasDeals}
      />
    </>
  );
};

export default AddDeals;
