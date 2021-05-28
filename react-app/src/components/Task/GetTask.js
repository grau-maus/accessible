import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TaskTable from './TaskTable';

import './Task.css';

const GetTask = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        Tasks
      </div>

      <Modal
        size='xl'
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header
          closeButton
          className='modal-header-task'
        >
          <Modal.Title>Tasks:</Modal.Title>
        </Modal.Header>
        <Modal.Body id='task-list-container'>
          <TaskTable />
        </Modal.Body>
        <Modal.Footer>
          <h4>Click on task to edit details...</h4>
          <Button variant='secondary' onClick={handleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GetTask;
