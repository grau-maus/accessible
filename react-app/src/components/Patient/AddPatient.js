import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { addEditPatient } from '../../store/patients';
import { getAllInsurance } from '../../store/insurance';

import './Patient.css';

const AddPatient = () => {
  const dispatch = useDispatch();
  const insuranceList = useSelector((state) => state.insurance.insuranceList);
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [insuranceId, setInsuranceId] = useState(1);
  const [mrn, setMrn] = useState('');
  const [ssn, setSsn] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [active, setActive] = useState(true);
  const [authVisits, setAuthVisits] = useState(0);

  useEffect(() => {
    dispatch(getAllInsurance());
  }, [dispatch]);

  if (!insuranceList) return null;

  const resetForm = () => {
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setDob('');
    setInsuranceId(1);
    setMrn('');
    setSsn('');
    setAddress('');
    setPhoneNumber('');
    setActive(true);
    setAuthVisits(0);
  };
  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);
  const handleSubmit = async () => {
    if (!dob) {
      window.alert('Error. Provide a DOB.');
      return;
    }

    const dobYear = parseInt(dob.split('-')[0], 10);
    const dobMonth = parseInt(dob.split('-')[1], 10);
    const dobDate = parseInt(dob.split('-')[2], 10);

    const data = await dispatch(addEditPatient({
      fetchType: 'POST',
      insuranceId,
      firstName,
      middleName,
      lastName,
      dobYear,
      dobMonth,
      dobDate,
      mrn,
      ssn,
      address,
      phoneNumber,
      active,
      authVisits
    }));

    if (!data.error) {
      window.alert('Patient added!');
      handleClose();
    } else {
      window.alert(data.error);
    }
  };

  return (
    <div
      onKeyDown={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      onMouseOver={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div onClick={handleShow}>
        Add patient
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
          <Modal.Title>Add new patient:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='add-patient-form'>
            <Form.Group controlId='formGroupPatientFirstName'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='text'
                placeholder='John / Jane'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupPatientMiddleName'>
              <Form.Label>Middle name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Mary / Smith'
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupPatientLastName'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Doe / Deer'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupPatientDOB'>
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type='date'
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupPatientInsurance'>
              <Form.Label>Insurance</Form.Label>
              <Form.Control
                as='select'
                value={insuranceId}
                onChange={(e) => { setInsuranceId(e.target.value) }}
                custom
              >
                {
                  Object.values(insuranceList).map((insObj, index) => (
                    <option
                      key={`ins-${index}`}
                      value={insObj.id}
                    >
                      {insObj.name}
                    </option>
                  ))
                }
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='formGroupPatientMRN'>
              <Form.Label>MRN</Form.Label>
              <Form.Control
                type='text'
                placeholder='123456789'
                value={mrn}
                onChange={(e) => setMrn(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupPatientSSN'>
              <Form.Label>SSN</Form.Label>
              <Form.Control
                type='text'
                placeholder='123-45-6789'
                minLength='9'
                maxLength='9'
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupPatientAddress'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='123 Ontario Road'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupPatientPhoneNumber'>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='text'
                placeholder='753-4432'
                maxLength='7'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupPatientActive'>
              <Form.Label>Active patient?</Form.Label>
              <Button onClick={() => setActive(!active)}>
                {!active &&
                  'No'
                }
                {active &&
                  'Yes'
                }
              </Button>
              <Form.Check
                type='checkbox'
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                hidden
              />
            </Form.Group>

            <Form.Group controlId='formGroupPatientAuthVisits'>
              <Form.Label>Authorized visits</Form.Label>
              <Form.Control
                type='number'
                value={authVisits}
                onChange={(e) => setAuthVisits(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleSubmit}>
            Add patient
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddPatient;
