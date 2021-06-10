import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { addEditTask } from '../../store/tasks';
import { getAllPatients } from '../../store/patients';
import { getAllVisitingUsers } from '../../store/users';
import { parseVisitType } from '../../services/role';

import './Task.css';

const AddTask = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.visitingUserList);
  const patientList = useSelector((state) => state.patients.patientList);
  const [show, setShow] = useState(false);
  const [staffId, setStaffId] = useState(1);
  const [patientId, setPatientId] = useState(1);
  const [scheduledDate, setScheduledDate] = useState('');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getAllPatients());
      await dispatch(getAllVisitingUsers());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (userList) setStaffId(Object.values(userList)[0].id);
    if (patientList) setPatientId(Object.values(patientList)[0].id);
  }, [userList, patientList]);

  if (!patientList) return 'Loading...';

  const resetForm = () => {
    setStaffId(Object.values(userList)[0].id);
    setPatientId(Object.values(patientList)[0].id);
    setScheduledDate('');
    setStatus(false);
  };
  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);
  const handleSubmit = async () => {
    const visitType = parseVisitType(userList[staffId].role);
    const visitYear = parseInt(scheduledDate.split('-')[0], 10);
    const visitMonth = parseInt(scheduledDate.split('-')[1], 10);
    const visitDay = parseInt(scheduledDate.split('-')[2], 10);

    const data = await dispatch(addEditTask({
      fetchType: 'POST',
      staffId,
      patientId,
      visitType,
      visitYear,
      visitMonth,
      visitDay,
      status
    }));

    if (!data.error) {
      handleClose();
      window.alert('Task added!');
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
        Add task
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header
          closeButton
          className='modal-header-task'
        >
          <Modal.Title>Add new task:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='add-task-form'>
            <Form.Group controlId='formGroupTaskStaff'>
              <Form.Label>Select staff</Form.Label>
              <Form.Control
                as='select'
                value={staffId}
                onChange={(e) => setStaffId(Number(e.target.value))}
                custom
              >
                {userList &&
                  Object.values(userList).map((staff) => (
                    <option
                      key={`staff-${staff.id}`}
                      value={staff.id}
                    >
                      {`${staff.lastName}, ${staff.firstName}: ${staff.role}`}
                    </option>
                  ))
                }
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='formGroupTaskPatient'>
              <Form.Label>Select patient</Form.Label>
              <Form.Control
                as='select'
                value={patientId}
                onChange={(e) => setPatientId(Number(e.target.value))}
                custom
              >
                {patientList &&
                  Object.values(patientList).map((patient) => (
                    <option
                      key={`patient-${patient.id}`}
                      value={patient.id}
                    >
                      {`${patient.lastName}, ${patient.firstName} ${patient.middleName ? patient.middleName[0] + '.' : ''}`}
                    </option>
                  ))
                }
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='formGroupTaskVisitDate'>
              <Form.Label>Visit date</Form.Label>
              <Form.Control
                type='date'
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupTaskVisitStatus'>
              <Form.Label>Visit status</Form.Label>
              <Form.Control
                as='select'
                value={status}
                onChange={(e) => setStatus(Boolean(e.target.value))}
                custom
              >
                <option value={false}>Pending</option>
                <option value={true}>Completed</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleSubmit}>
            Add task
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddTask;
