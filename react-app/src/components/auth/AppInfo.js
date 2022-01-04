import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import './LoginForm.css';

const AppInfo = () => {
  const [show, setShow] = useState(false);

  return (
    <div
      onKeyDown={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      onMouseOver={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        onClick={() => setShow(true)}
        id='app-info-text-click'
      >
        Need an account?
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header
          closeButton
          className='modal-header-app-info'
        >
          <Modal.Title>About accessible:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This web application aims to emulate a functional medical records database. Since medical information of a patient is protected health information, HIPAA regulations must be followed.
          <br />
          <br />
          For more information about HIPAA, please visit the <a href='https://www.hhs.gov/hipaa/index.html'>U.S. Department of Health & Human Services website</a>.
          <br />
          <br />
          Otherwise, please contact your company's administrator about your account.
          <br />
          <br />
          Have a nice day!
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppInfo;
