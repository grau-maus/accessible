import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import EditUser from './EditUser';
import { addEditUser, getAllUsers } from '../../store/users';
import { editUserForm } from '../../store/edit';

const UserTable = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.userList);
  const showForm = useSelector((state) => state.edit.editUserForm);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch]);

  if (!userList) return null;

  const editUserInfo = (userObj) => {
    dispatch(editUserForm());
    setUser(userObj);
  };

  const parseRole = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'S':
        return 'Scheduler';
      case 'RN':
        return 'Nurse';
      case 'CNA':
        return 'Medical Health Aide';
      case 'PT':
        return 'Physical Therapist';
      case 'PTA':
        return 'Physical Therapist Assistant';
      case 'OT':
        return 'Occupational Therapist';
      case 'OTA':
        return 'Occupational Therapist Assistant';
      case 'ST':
        return 'Speech Therapist';
      case 'STA':
        return 'Speech Therapist Assistant';
      default:
        return 'N/A';
    }
  };

  return (
    <>
      {showForm &&
        <EditUser user={user} />
      }
      <Table responsive>
        <thead>
          <tr>
            <th>Role</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Added</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            Object.values(userList).map((userObj, index) => (
              <tr key={`tr-${index}`} onClick={() => editUserInfo(userObj)}>
                <td key={`role-${index}`}>{parseRole(userObj.role)}</td>
                <td key={`lastName-${index}`}>{userObj.lastName}</td>
                <td key={`firstName-${index}`}>{userObj.firstName}</td>
                <td key={`email-${index}`}>{userObj.email}</td>
                <td key={`added-${index}`}>{userObj.createdAt}</td>
                <td key={`updated-${index}`}>{userObj.updatedAt}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;
