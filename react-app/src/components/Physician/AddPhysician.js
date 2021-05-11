import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { addEditPhysician } from '../../store/physicians';

import './Physician.css';

const AddPhysician = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [efax, setEfax] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [npiNumber, setNpiNumber] = useState('');

  const resetForm = () => {
    setName('');
    setEfax('');
    setAddress('');
    setPhoneNumber('');
    setNpiNumber('');
  };
  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);
  const handleSubmit = async () => {
    const data = await dispatch(addEditPhysician({
      fetchType: 'POST',
      name,
      efax,
      address,
      phoneNumber,
      npiNumber
    }));

    if (!data.error) {
      resetForm();
      console.log('Physician added!');
    } else {
      console.log(data.error);
    }
  };

  return (
    <>
      <div onClick={handleShow}>
        Add physician
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header
          closeButton
          className='modal-header-physician'
        >
          <Modal.Title>Add new physician:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='add-physician-form'>
            <Form.Group controlId='formGroupPhysicianName'>
              <Form.Label>Name of physician</Form.Label>
              <Form.Control
                type='text'
                placeholder='John Doe / Jane Deer'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupPhysicianEfax'>
              <Form.Label>E-Fax number</Form.Label>
              <Form.Control
                type='text'
                placeholder='(123) 456-7890'
                value={efax}
                onChange={(e) => setEfax(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupPhysicianAddress'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='4200 Grimwald Lane'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupPhysicianPhoneNumber'>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='text'
                placeholder='(456) 753-4432'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupPhysicianNPI'>
              <Form.Label>NPI number</Form.Label>
              <Form.Control
                type='text'
                placeholder='5884621185'
                value={npiNumber}
                onChange={(e) => setNpiNumber(e.target.value)}
              />
            </Form.Group>

            <Button variant='primary' onClick={handleSubmit}>
              Add physician
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddPhysician;
