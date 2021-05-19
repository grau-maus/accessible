import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { addEditInsurance } from '../../store/insurance';

const AddInsurance = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('HMO');

  const resetForm = () => {
    setName('');
    setType('HMO');
  };
  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);
  const handleSubmit = async () => {
    const data = await dispatch(addEditInsurance({
      fetchType: 'POST',
      name,
      type,
    }));

    if (!data.error) {
      resetForm();
      console.log('Insurance added!');
    } else {
      console.log(data.error);
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
        Add insurance
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header
          closeButton
          className='modal-header-insurance'
        >
          <Modal.Title>Add new insurance:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='add-insurance-form'>
            <Form.Group controlId='formGroupInsuranceName'>
              <Form.Label>Name of insurance</Form.Label>
              <Form.Control
                type='text'
                placeholder='AETNA, Cigna, Kaiser Permanente, etc...'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formGroupType'>
              <Form.Label>Type</Form.Label>
              <Form.Control
                as='select'
                value={type}
                onChange={(e) => { setType(e.target.value) }}
                custom
              >
                <option value='HMO'>HMO</option>
                <option value='EPO'>EPO</option>
                <option value='POS'>POS</option>
                <option value='PPO'>PPO</option>
                <option value='HDHP w/ HSA'>HDHP w/ HSA</option>
                <option value='HDHP w/o HSA'>HDHP w/o HSA</option>
              </Form.Control>
            </Form.Group>
            <Button variant='primary' onClick={handleSubmit}>
              Add insurance
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddInsurance;
