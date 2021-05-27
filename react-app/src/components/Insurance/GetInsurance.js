import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InsuranceTable from './InsuranceTable';

import './Insurance.css';

const GetInsurance = () => {
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
          className='modal-header-insurance'
        >
          <Modal.Title>Insurance:</Modal.Title>
        </Modal.Header>
        <Modal.Body id='insurance-list-container'>
          <InsuranceTable />
        </Modal.Body>
        <Modal.Footer>
          <h4>Click on insurance to edit details...</h4>
          <Button variant='secondary' onClick={handleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GetInsurance;
