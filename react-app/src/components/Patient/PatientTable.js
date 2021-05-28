import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import EditPatient from './EditPatient';
import { getAllPatients } from '../../store/patients';
import { editForm } from '../../store/edit';

const PatientTable = () => {
  const dispatch = useDispatch();
  const patientList = useSelector((state) => state.patients.patientList);
  const showForm = useSelector((state) => state.edit.editForm);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    dispatch(getAllPatients());
  }, [dispatch]);

  const editPatientInfo = (patientObj) => {
    dispatch(editForm());
    setPatient(patientObj);
  };

  return (
    <>
      {showForm &&
        <EditPatient patient={patient} />
      }
      <Table responsive>
        <thead>
          <tr>
            <th>Last name</th>
            <th>First name</th>
            <th>Middle name</th>
            <th>MRN</th>
            <th>Insurance</th>
            <th>Authorized visits</th>
            <th>DOB</th>
            <th>SSN</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Active patient</th>
            <th>Added</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {!patientList &&
            <div>Loading...</div>
          }
          {patientList &&
            Object.values(patientList).map((patientObj, index) => (
              <tr key={`tr-${index}`} onClick={() => editPatientInfo(patientObj)}>
                <td key={`lastName-${index}`}>{patientObj.lastName}</td>
                <td key={`firstName-${index}`}>{patientObj.firstName}</td>
                <td key={`middleName-${index}`}>{patientObj.middleName}</td>
                <td key={`mrn-${index}`}>{patientObj.mrn}</td>
                <td key={`insurance-${index}`}>{patientObj.insurance.name}</td>
                <td key={`authVisits-${index}`}>{patientObj.authorizedVisits}</td>
                <td key={`dob-${index}`}>{patientObj.dob}</td>
                <td key={`ssn-${index}`}>{patientObj.ssn}</td>
                <td key={`address-${index}`}>{patientObj.primaryAdddress}</td>
                <td key={`phone-${index}`}>{patientObj.phoneNumber}</td>
                <td key={`active-${index}`}>{patientObj.active ? 'Yes' : 'No'}</td>
                <td key={`added-${index}`}>{patientObj.createdAt}</td>
                <td key={`updated-${index}`}>{patientObj.updatedAt}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
};

export default PatientTable;
