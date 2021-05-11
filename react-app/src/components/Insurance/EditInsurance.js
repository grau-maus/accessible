import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { addEditInsurance, removeInsurance } from '../../store/insurance';
import { editForm } from '../../store/edit';

const EditInsurance = ({ insurance }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [show, setShow] = useState(true);
  const [name, setName] = useState(insurance.name);
  const [type, setType] = useState(insurance.type);
  const [showForm, setShowForm] = useState(false);
  const [deletedIns, setDeletedIns] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch(editForm());
  };

  const handleSubmit = async () => {
    const data = await dispatch(addEditInsurance({
      fetchType: 'PATCH',
      insuranceId: insurance.id,
      name,
      type
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

  const cancelEditInsurance = () => {
    setShowForm(!showForm);
  };

  const handleDeleteInsurance = () => {
    dispatch(removeInsurance(insurance.id));
    setDeletedIns(true);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        id='modal-edit-insurance-container'
      >
        <Modal.Header
          closeButton
          id='modal-header-edit-insurance'
          className='modal-header-insurance'
        >
          <Modal.Title>Insurance details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deletedIns &&
            <div className='insurance-deleted'>Insurance removed from the database.</div>
          }
          {!showForm && !deletedIns &&
            <>
              <div className='insurance-name'>{name}</div>
              <div className='insurance-type'>{type}</div>
              <div className='insurance-added'>{insurance.createdAt}</div>
              <div className='insurance-updated'>{insurance.updatedAt}</div>
              <Button onClick={handleEditForm}>Edit details</Button>
              <Button onClick={handleDeleteInsurance}>Delete insurance</Button>
            </>
          }
          {showForm &&
            <Form id='edit-insurance-form'>
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
              <Button onClick={handleSubmit}>Edit insurance</Button>
              <Button onClick={cancelEditInsurance}>Cancel</Button>
            </Form>
          }
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

export default EditInsurance;
