import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import EditPhysician from "./EditPhysician";
import { getAllPhysicians } from "../../store/physicians";
import { editFormStatus } from "../../store/edit";

const PhysicianTable = () => {
  const dispatch = useDispatch();
  const physicianList = useSelector((state) => state.physicians.physicianList);
  const showForm = useSelector((state) => state.edit.editForm);
  const [physician, setPhysician] = useState({});

  useEffect(() => {
    dispatch(getAllPhysicians());
  }, [dispatch]);

  const editPhysicianInfo = (mcpObj) => {
    dispatch(editFormStatus());
    setPhysician(mcpObj);
  };

  return (
    <>
      {showForm && <EditPhysician physician={physician} />}
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>E-Fax</th>
            <th>Address</th>
            <th>Phone</th>
            <th>NPI</th>
            <th>Added</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {physicianList.length
            ? physicianList.map((mcpObj) => (
                <tr key={mcpObj.id} onClick={() => editPhysicianInfo(mcpObj)}>
                  <td>{mcpObj.name}</td>
                  <td>{mcpObj.efax}</td>
                  <td>{mcpObj.address}</td>
                  <td>{mcpObj.phoneNumber}</td>
                  <td>{mcpObj.npiNumber}</td>
                  <td>{mcpObj.createdAt}</td>
                  <td>{mcpObj.updatedAt}</td>
                </tr>
              ))
            : "Loading..."}
        </tbody>
      </Table>
    </>
  );
};

export default PhysicianTable;
