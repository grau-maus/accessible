import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import EditUser from "./EditUser";
import { getAllUsers, clearUserState } from "../../store/users";
import { editFormStatus } from "../../store/edit";
import { parseRole } from "../../services/role";

const UserTable = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.userList);
  const showForm = useSelector((state) => state.edit.editForm);
  const [user, setUser] = useState({});

  useEffect(() => {
    dispatch(getAllUsers());

    return () => {
      dispatch(clearUserState());
    };
  }, [dispatch]);

  const editUserInfo = (userObj) => {
    dispatch(editFormStatus());
    const newUserObj = { ...userObj };
    newUserObj.fullRole = parseRole(userObj.role);
    setUser(newUserObj);
  };

  return (
    <>
      {showForm && <EditUser user={user} />}
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
          {userList.length ? (
            userList.map((userObj) => (
              <tr key={userObj.id} onClick={() => editUserInfo(userObj)}>
                <td>{parseRole(userObj.role)}</td>
                <td>{userObj.lastName}</td>
                <td>{userObj.firstName}</td>
                <td>{userObj.email}</td>
                <td>{userObj.createdAt}</td>
                <td>{userObj.updatedAt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;
