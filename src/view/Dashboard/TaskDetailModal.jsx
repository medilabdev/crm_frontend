// src/components/Modals/TaskDetailModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TaskDetailModal = ({ show, onClose, task }) => {
  if (!task) {
    return null;
  }

  // Fungsi untuk merender HTML dengan aman
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Task Detail: {task.task_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* --- DATA YANG DIPERBAIKI --- */}
        <p><strong>Owner:</strong> {task.owner?.name || '-'}</p>
        <p><strong>Status:</strong> {task.status?.name || '-'}</p>
        
        <hr />

        <h5>Plan:</h5>
        {/* Gunakan dangerouslySetInnerHTML untuk merender tag <p> dari data */}
        <div dangerouslySetInnerHTML={createMarkup(task.plan || 'No plan provided.')} />
        
        <hr />

        <h5>Result:</h5>
        <div dangerouslySetInnerHTML={createMarkup(task.result || 'No result provided.')} />

        <hr />
        
        <p>
            <strong>Email Reminder Date:</strong> 
            {task.date_email_reminder ? new Date(task.date_email_reminder).toLocaleDateString('id-ID', {
                year: 'numeric', month: 'long', day: 'numeric'
            }) : '-'}
        </p>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDetailModal;