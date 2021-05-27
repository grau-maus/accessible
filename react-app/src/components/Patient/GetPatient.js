import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PatientTable from './PatientTable';

import './Patient.css';

const GetPatient = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        Patients
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
          className='modal-header-patient'
        >
          <Modal.Title>Patients:</Modal.Title>
        </Modal.Header>
        <Modal.Body id='patient-list-container'>
          <PatientTable />
        </Modal.Body>
        <Modal.Footer>
          <h4>Click on a patient to edit details...</h4>
          <Button variant='secondary' onClick={handleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GetPatient;
