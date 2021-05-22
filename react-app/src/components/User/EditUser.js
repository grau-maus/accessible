import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { addEditUser, removeUser } from '../../store/users';
import { editForm } from '../../store/edit';
import { parseRole } from '../../services/role';

import './User.css';

const EditUser = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [show, setShow] = useState(true);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [fullRole, setFullRole] = useState(user.fullRole);
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [deletedUser, setDeletedUser] = useState(false);

  // const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    dispatch(editForm());
  };

  const handleSubmit = async () => {
    const data = await dispatch(addEditUser({
      type: 'PATCH',
      userId: user.id,
      firstName,
      lastName,
      email,
      role,
      password
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

  const cancelEditUser = () => {
    setShowForm(!showForm);
  };

  const handleDeleteUser = () => {
    dispatch(removeUser(user.id));
    setDeletedUser(true);
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
        id='modal-edit-user-container'
      >
        <Modal.Header
          closeButton
          id='modal-header-edit-user'
          className='modal-header-user'
        >
          <Modal.Title>User details:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deletedUser &&
            <div className='user-deleted'>User removed from the database.</div>
          }
          {!showForm && !deletedUser &&
            <>
              <div className='user-name'>{`${lastName}, ${firstName}`}</div>
              <div className='user-role'>{`Role: ${fullRole}`}</div>
              <div className='user-email'>{`Email: ${email}`}</div>
              <div className='user-added'>{`Added: ${user.createdAt}`}</div>
              <div className='user-updated'>{`Updated: ${user.updatedAt}`}</div>
              {user.id !== currentUser.id &&
                <>
                  <Button onClick={handleEditForm}>Edit details</Button>
                  <Button onClick={handleDeleteUser}>Delete user</Button>
                </>
              }
            </>
          }
          {showForm &&
            <Form id='edit-user-form'>
              <Form.Group controlId='formGroupFirstName'>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='First name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formGroupLastName'>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Last name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formGroupEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formGroupRole'>
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as='select'
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setFullRole(parseRole(e.target.value));
                  }}
                  custom
                >
                  <option value='admin'>Administrator</option>
                  <option value='S'>Scheduler</option>
                  <option value='RN'>Nurse</option>
                  <option value='CNA'>Medical Health Aide</option>
                  <option value='PT'>Physical Therapist</option>
                  <option value='PTA'>Physical Therapist Assistant</option>
                  <option value='OT'>Occupational Therapist</option>
                  <option value='OTA'>Occupational Therapist Assistant</option>
                  <option value='ST'>Speech Therapist</option>
                  <option value='STA'>Speech Therapist Assistant</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='formGroupPassword'>
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button onClick={handleSubmit}>Edit user</Button>
              <Button onClick={cancelEditUser}>Cancel</Button>
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

export default EditUser;
