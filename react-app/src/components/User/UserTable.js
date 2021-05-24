import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import EditUser from './EditUser';
import { getAllUsers, clearUserState } from '../../store/users';
import { editForm } from '../../store/edit';
import { parseRole } from '../../services/role';

const UserTable = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.userList);
  const showForm = useSelector((state) => state.edit.editForm);
  const [user, setUser] = useState({});

  useEffect(() => {
    dispatch(getAllUsers());

    return () => { dispatch(clearUserState()) };
  }, [dispatch]);

  if (!userList) return null;

  const editUserInfo = (userObj) => {
    dispatch(editForm());
    userObj.fullRole = parseRole(userObj.role);
    setUser(userObj);
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
