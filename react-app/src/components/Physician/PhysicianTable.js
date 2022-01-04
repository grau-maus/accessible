import React, { useEffect, useState } from 'react';
import TableInfo from '../TableInfo/TableInfo';
import { useDispatch, useSelector } from 'react-redux';
import EditPhysician from './EditPhysician';
import { getAllPhysicians } from '../../store/physicians';
import { editForm } from '../../store/edit';

const PhysicianTable = () => {
  const dispatch = useDispatch();
  const physicianList = useSelector((state) => state.physicians.physicianList);
  const showForm = useSelector((state) => state.edit.editForm);
  const [physician, setPhysician] = useState({});
  const header = ["Name", "E-Fax", "Address", "Phone", "NPI", "Added", "Updated"];
  const orderOfDetails = [
    "name",
    "efax",
    "address",
    "phoneNumber",
    "npiNumber",
    "createdAt",
    "updatedAt"
  ];

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
      <TableInfo
        tableHead={header}
        tableBody={Object.values(physicianList)}
        tableRowOrder={orderOfDetails}
        tableRowOnClick={editPhysicianInfo}
      />
    </>
  );
};

export default PhysicianTable;
