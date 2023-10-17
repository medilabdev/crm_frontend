import React, { useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";

const AddContact = () => {
  const [telephone, setTelephone] = useState([""]);

  //menambah telephone
  const addTelephone = () => {
    setTelephone([...telephone, ""]);
  };

//   mengubah nomor telepon pada indeks tertentu
  const handleChangeTelephone = (index, value) => {
    const newTelephone = [...telephone];
    newTelephone[index] = value;
    setTelephone(newTelephone);
  };

//   menghapus telephone
  const removeTelephone = (index) => {
    const newTelephone = [...telephone];
    newTelephone.splice(index, 1);
    setTelephone(newTelephone);
  };

  return (
    <Card className="shadow">
      <Card.Header>
        <h5 className="mt-2">
          <i class="bi bi-person-circle fs-4"></i>
          <span className="ms-2 fs-5 fw-bold mt-5">Contact</span>
        </h5>
      </Card.Header>
      <Card.Body>
        <form action="" method="post">
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Job Title"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="floatingInput"
            label="Owner"
          >
            <Form.Control type="text" placeholder="owner@example" />
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="floatingInput"
            label="Email"
          >
            <Form.Control type="email" placeholder="@gmail.com" />
          </FloatingLabel>
          {telephone.map((telephone, index) => (
            <div key={index}>
              <FloatingLabel
                controlId={`floatingInput${index}`}
                label={`Telephone #${index + 1}`}
                className="mb-2"
              >
                <Form.Control
                  type="number"
                  placeholder="@gmail."
                  value={telephone}
                  onChange={(e) => handleChangeTelephone(index, e.target.value)}
                />
              </FloatingLabel>
              {index > 0 && (
                <Button
                  variant="danger"
                  onClick={() => removeTelephone(index)}
                  style={{ fontSize: "0.65rem" }}
                  className="mb-1"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="primary"
            onClick={addTelephone}
            style={{ fontSize: "0.65rem" }}
            className="mb-2"
          >
            Add Telephone
          </Button>
          <FloatingLabel
            className="mb-3"
            controlId="floatingInput"
            label="Address"
          >
            <Form.Control type="text" placeholder="@gmail" />
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="floatingInput"
            label="City"
          >
            <Form.Control type="text" placeholder="@gmail" />
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="floatingInput"
            label="Zip Code"
          >
            <Form.Control type="number" placeholder="@gmail" />
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="floatingInput"
            label="Date"
          >
            <Form.Control type="date" placeholder="@gmail" name="birthday" />
          </FloatingLabel>
          <Form.Select
            className="mb-3"
            size="lg"
            style={{ fontSize: "0.85rem" }}
            name="source"
          >
            <option>Source</option>
            <option value="database">Database</option>
            <option value="event">Event</option>
            <option value="referral">Referral</option>
            <option value="others">Others</option>
          </Form.Select>
          <Form.Select
            className="mb-3"
            size="lg"
            style={{ fontSize: "0.85rem" }}
            name="sex"
          >
            <option>Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
          <FloatingLabel
            className="mb-3"
            controlId="floatingInput"
            label="Remarks(Other Source)"
          >
            <Form.Control type="text" name="remarks" placeholder="@gmail" />
          </FloatingLabel>
        </form>
      </Card.Body>
    </Card>
  );
};

export default AddContact;
