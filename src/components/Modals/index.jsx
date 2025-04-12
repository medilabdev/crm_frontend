import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from 'react-bootstrap'
import Modal from "react-bootstrap/Modal";

const Modals = ({ children, title, buttonAction, buttonActionTitle, show, close, submit }) => {

    return (
        <Modal show={show} onHide={close} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                <button type="button" className="btn btn-icon" onClick={close}><FontAwesomeIcon icon={faTimes} /></button>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>Close</Button>
                {buttonAction ? (
                    <Button variant="primary" onClick={submit}>{buttonActionTitle}</Button>
                ) : ""}
            </Modal.Footer>
        </Modal>
    )
}

export default Modals
