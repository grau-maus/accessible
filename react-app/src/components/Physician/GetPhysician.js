import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PhysicianTable from './PhysicianTable';

import './Physician.css';

const GetPhysician = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        Insurance
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
          className='modal-header-physician'
        >
          <Modal.Title>Insurance:</Modal.Title>
        </Modal.Header>
        <Modal.Body id='physician-list-container'>
          <PhysicianTable />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GetPhysician;
