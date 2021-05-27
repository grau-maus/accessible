import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { addEditTask, removeTask } from '../../store/tasks';
import { getAllInsurance } from '../../store/insurance';
import { editForm } from '../../store/edit';

const EditTask = ({ task }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.visitingUserList);
  const patientList = useSelector((state) => state.patients.patientList);
  const parseDate = new Date(task.dob).toISOString().split('T')[0];
  const [show, setShow] = useState(true);
  const [staffId, setStaffId] = useState(1);
  const [patientId, setPatientId] = useState(1);
  const [scheduledDate, setScheduledDate] = useState('');
  const [status, setStatus] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deletedTask, setDeletedTask] = useState(false);

  if (!insuranceList) return 'Loading...';

  const handleClose = () => {
    setShow(false);
    dispatch(editForm());
  };

  const handleSubmit = async () => {
    const visitType = parseVisitType(userList[staffId].role);
    const visitYear = parseInt(scheduledDate.split('-')[0], 10);
    const visitMonth = parseInt(scheduledDate.split('-')[1], 10);
    const visitDay = parseInt(scheduledDate.split('-')[2], 10);

    const data = await dispatch(addEditTask({
      fetchType: 'PATCH',
      staffId,
      patientId,
      visitType,
      visitYear,
      visitMonth,
      visitDay,
      status
    }));

    if (!data.error) {
      setShowForm(false);
    } else {
      window.alert(data.error);
    }
  };

  const handleEditForm = () => {
    setShowForm(!showForm);
  };

  const cancelEditTask = () => {
    setShowForm(!showForm);
  };

  const handleDeleteTask = () => {
    dispatch(removeTask(task.id));
    setDeletedTask(true);
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
        id='modal-edit-task-container'
      >
        <Modal.Header
          closeButton
          id='modal-header-edit-task'
          className='modal-header-task'
        >
          <Modal.Title>Task details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deletedTask &&
            <div className='task-deleted'>Task removed from the database.</div>
          }
          {!showForm && !deletedTask &&
            <>
              <div className='task-name'>{`${lastName}, ${firstName}${middleName ? ` ${middleName}` : null}`}</div>
              <div className='task-dob'>{`DOB: ${new Date(dob)}`}</div>
              <div className='task-insuranceName'>{`Insurance: ${insurance.name}, ${insurance.type}`}</div>
              <div className='task-authVisits'>{`Authorized visits: ${authVisits}`}</div>
              <div className='task-mrn'>{`MRN: ${mrn}`}</div>
              <div className='task-ssn'>{`SSN: ${ssn}`}</div>
              <div className='task-primaryAddress'>{`Primary address: ${address}`}</div>
              <div className='task-phoneNumber'>{`Phone: ${phoneNumber}`}</div>
              <div className='task-active'>{`Active task: ${active ? 'Yes' : 'No'}`}</div>
              <div className='task-added'>{`Added: ${task.createdAt}`}</div>
              <div className='task-updated'>{`Updated: ${task.updatedAt}`}</div>
              <Button onClick={handleEditForm}>Edit details</Button>
              <Button onClick={handleDeleteTask}>Delete task</Button>
            </>
          }
          {showForm &&
            <Form id='edit-task-form'>
              <Form.Group controlId='formGroupTaskFirstName'>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='John / Jane'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formGroupTaskMiddleName'>
                <Form.Label>Middle name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Mary / Smith'
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formGroupTaskLastName'>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Doe / Deer'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formGroupTaskDOB'>
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type='date'
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formGroupTaskInsurance'>
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

              <Form.Group controlId='formGroupTaskMRN'>
                <Form.Label>MRN</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='123456789'
                  value={mrn}
                  onChange={(e) => setMrn(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formGroupTaskSSN'>
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

              <Form.Group controlId='formGroupTaskAddress'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='123 Ontario Road'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formGroupTaskPhoneNumber'>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='753-4432'
                  maxLength='7'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formGroupTaskActive'>
                <Form.Label>Active task?</Form.Label>
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

              <Form.Group controlId='formGroupTaskAuthVisits'>
                <Form.Label>Authorized visits</Form.Label>
                <Form.Control
                  type='number'
                  value={authVisits}
                  onChange={(e) => setAuthVisits(e.target.value)}
                />
              </Form.Group>
              <Button onClick={handleSubmit}>Edit task</Button>
              <Button onClick={cancelEditTask}>Cancel</Button>
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
