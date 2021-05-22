import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { addEditTask, removeTask } from '../../store/tasks';
import { getAllInsurance } from '../../store/insurance';
import { editForm } from '../../store/edit';

const EditTask = ({ patient }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.visitingUserList);
  const patientList = useSelector((state) => state.patients.patientList);
  const parseDate = new Date(patient.dob).toISOString().split('T')[0];
  const [show, setShow] = useState(true);
  const [firstName, setFirstName] = useState(patient.firstName);
  const [middleName, setMiddleName] = useState(patient.middleName);
  const [lastName, setLastName] = useState(patient.lastName);
  const [dob, setDob] = useState(parseDate);
  const [insurance, setInsurance] = useState(patient.insurance);
  const [insuranceId, setInsuranceId] = useState(insurance.id);
  const [authVisits, setAuthVisits] = useState(patient.authorizedVisits);
  const [mrn, setMrn] = useState(patient.mrn);
  const [ssn, setSsn] = useState(patient.ssn);
  const [address, setAddress] = useState(patient.primaryAddress);
  const [phoneNumber, setPhoneNumber] = useState(patient.phoneNumber);
  const [active, setActive] = useState(patient.active);
  const [showForm, setShowForm] = useState(false);
  const [deletedPatient, setDeletedPatient] = useState(false);

  if (!insuranceList) return 'Loading...';

  const handleClose = () => {
    setShow(false);
    dispatch(editForm());
  };

  const handleSubmit = async () => {
    console.log(parseDate);
    const dobYear = parseInt(dob.split('-')[0], 10);
    const dobMonth = parseInt(dob.split('-')[1], 10);
    const dobDate = parseInt(dob.split('-')[2], 10);

    const data = await dispatch(addEditTask({
      fetchType: 'PATCH',
      patientId: patient.id,
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
      setShowForm(false);
    } else {
      console.log(data.error);
    }
  };

  const handleEditForm = () => {
    setShowForm(!showForm);
  };

  const cancelEditPatient = () => {
    setShowForm(!showForm);
  };

  const handleDeletePatient = () => {
    dispatch(removeTask(patient.id));
    setDeletedPatient(true);
  };

  return (
    <div
      onKeyDown={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      onMouseOver={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        id='modal-edit-patient-container'
      >
        <Modal.Header
          closeButton
          id='modal-header-edit-patient'
          className='modal-header-patient'
        >
          <Modal.Title>Patient details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deletedPatient &&
            <div className='patient-deleted'>Patient removed from the database.</div>
          }
          {!showForm && !deletedPatient &&
            <>
              <div className='patient-name'>{`${lastName}, ${firstName}${middleName ? ` ${middleName}` : null}`}</div>
              <div className='patient-dob'>{`DOB: ${new Date(dob)}`}</div>
              <div className='patient-insuranceName'>{`Insurance: ${insurance.name}, ${insurance.type}`}</div>
              <div className='patient-authVisits'>{`Authorized visits: ${authVisits}`}</div>
              <div className='patient-mrn'>{`MRN: ${mrn}`}</div>
              <div className='patient-ssn'>{`SSN: ${ssn}`}</div>
              <div className='patient-primaryAddress'>{`Primary address: ${address}`}</div>
              <div className='patient-phoneNumber'>{`Phone: ${phoneNumber}`}</div>
              <div className='patient-active'>{`Active patient: ${active ? 'Yes' : 'No'}`}</div>
              <div className='patient-added'>{`Added: ${patient.createdAt}`}</div>
              <div className='patient-updated'>{`Updated: ${patient.updatedAt}`}</div>
              <Button onClick={handleEditForm}>Edit details</Button>
              <Button onClick={handleDeletePatient}>Delete patient</Button>
            </>
          }
          {showForm &&
            <Form id='edit-patient-form'>
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
              <Button onClick={handleSubmit}>Edit patient</Button>
              <Button onClick={cancelEditPatient}>Cancel</Button>
            </Form>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditTask;
