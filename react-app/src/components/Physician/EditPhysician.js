import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { addEditPhysician, removePhysician } from '../../store/physicians';
import { editForm } from '../../store/edit';

const EditPhysician = ({ physician }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [name, setName] = useState(physician.name);
  const [efax, setEfax] = useState(physician.efax);
  const [address, setAddress] = useState(physician.address);
  const [phoneNumber, setPhoneNumber] = useState(physician.phoneNumber);
  const [npiNumber, setNpiNumber] = useState(physician.npiNumber);
  const [showForm, setShowForm] = useState(false);
  const [deletedMCP, setDeletedMCP] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch(editForm());
  };

  const handleSubmit = async () => {
    const data = await dispatch(addEditPhysician({
      fetchType: 'PATCH',
      physicianId: physician.id,
      name,
      efax,
      address,
      phoneNumber,
      npiNumber
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

  const cancelEditPhysician = () => {
    setShowForm(!showForm);
  };

  const handleDeletePhysician = () => {
    dispatch(removePhysician(physician.id));
    setDeletedMCP(true);
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
        id='modal-edit-physician-container'
      >
        <Modal.Header
          closeButton
          id='modal-header-edit-physician'
          className='modal-header-physician'
        >
          <Modal.Title>Physician details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deletedMCP &&
            <div className='physician-deleted'>Physician removed from the database.</div>
          }
          {!showForm && !deletedMCP &&
            <>
              <div className='physician-name'>{name}</div>
              <div className='physician-efax'>{`E-Fax: ${efax}`}</div>
              <div className='physician-address'>{address}</div>
              <div className='physician-efax'>{`Phone: ${phoneNumber}`}</div>
              <div className='physician-efax'>{`NPI: ${npiNumber}`}</div>
              <div className='physician-added'>{`Added: ${physician.createdAt}`}</div>
              <div className='physician-updated'>{`Updated: ${physician.updatedAt}`}</div>
              <Button onClick={handleEditForm}>Edit details</Button>
              <Button onClick={handleDeletePhysician}>Delete physician</Button>
            </>
          }
          {showForm &&
            <Form id='edit-physician-form'>
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
              <Button onClick={handleSubmit}>Edit physician</Button>
              <Button onClick={cancelEditPhysician}>Cancel</Button>
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

export default EditPhysician;
