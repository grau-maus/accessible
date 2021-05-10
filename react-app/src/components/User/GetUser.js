import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import UserTable from '../User/UserTable';

import './User.css';

const GetUser = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        Users
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
          className='modal-header-user'
        >
          <Modal.Title>Users:</Modal.Title>
        </Modal.Header>
        <Modal.Body id='user-list-container'>
          <UserTable />
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

export default GetUser;
