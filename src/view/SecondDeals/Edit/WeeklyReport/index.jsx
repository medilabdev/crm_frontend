import React from 'react'
import { Modal } from 'react-bootstrap'

const WeeklyReport = ({ show, handleButtonWeeklyReport, uid }) => {
  return (
    <Modal show={show} onHide={handleButtonWeeklyReport}>
        <Modal.Header></Modal.Header>
        <Modal.Body></Modal.Body>
    </Modal>
  )
}

export default WeeklyReport