import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import EditPhysician from './EditPhysician';
import { getAllPhysicians } from '../../store/physicians';
import { editForm } from '../../store/edit';

const PhysicianTable = () => {
  const dispatch = useDispatch();
  const physicianList = useSelector((state) => state.physicians.physicianList);
  const showForm = useSelector((state) => state.edit.editForm);
  const [physician, setPhysician] = useState({});

  useEffect(() => {
    dispatch(getAllPhysicians());
  }, [dispatch]);

  if (!physicianList) return null;

  const editPhysicianInfo = (mcpObj) => {
    dispatch(editForm());
    setPhysician(mcpObj);
  };

  return (
    <>
      {showForm &&
        <EditPhysician physician={physician} />
      }
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
          {physicianList &&
            Object.values(physicianList).map((mcpObj, index) => (
              <tr key={`tr-${index}`} onClick={() => editPhysicianInfo(mcpObj)}>
                <td key={`name-${index}`}>{mcpObj.name}</td>
                <td key={`efax-${index}`}>{mcpObj.efax}</td>
                <td key={`address-${index}`}>{mcpObj.address}</td>
                <td key={`phone-${index}`}>{mcpObj.phoneNumber}</td>
                <td key={`npi-${index}`}>{mcpObj.npiNumber}</td>
                <td key={`added-${index}`}>{mcpObj.createdAt}</td>
                <td key={`updated-${index}`}>{mcpObj.updatedAt}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
};

export default PhysicianTable;
