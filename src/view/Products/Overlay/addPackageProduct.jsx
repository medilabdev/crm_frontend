import React from "react";
import { Offcanvas, Overlay } from "react-bootstrap";

const AddPackageProduct = ({ visible, onClose }) => {
  return (
    <Offcanvas
      show={visible}
      onHide={onClose}
      placement="end"
      className="offcanvas-content"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Package Product</Offcanvas.Title>
      </Offcanvas.Header>
    </Offcanvas>
  );
};

export default AddPackageProduct;
