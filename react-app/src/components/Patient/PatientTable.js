import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import EditPatient from "./EditPatient";
import { getAllPatients } from "../../store/patients";
import { editFormStatus } from "../../store/edit";

const PatientTable = () => {
  const dispatch = useDispatch();
  const patientList = useSelector((state) => state.patients.patientList);
  const showForm = useSelector((state) => state.edit.editForm);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    dispatch(getAllPatients());
  }, [dispatch]);

  const editPatientInfo = (patientObj) => {
    dispatch(editFormStatus());
    setPatient(patientObj);
  };

  return (
    <>
      {showForm && <EditPatient patient={patient} />}
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
          {patientList.length ? (
            patientList.map((patientObj) => (
              <tr
                key={patientObj.id}
                onClick={() => editPatientInfo(patientObj)}
              >
                <td>{patientObj.lastName}</td>
                <td>{patientObj.firstName}</td>
                <td>{patientObj.middleName}</td>
                <td>{patientObj.mrn}</td>
                <td>{patientObj.insurance.name}</td>
                <td>{patientObj.authorizedVisits}</td>
                <td>{patientObj.dob}</td>
                <td>{patientObj.ssn}</td>
                <td>{patientObj.primaryAdddress}</td>
                <td>{patientObj.phoneNumber}</td>
                <td>{patientObj.active ? "Yes" : "No"}</td>
                <td>{patientObj.createdAt}</td>
                <td>{patientObj.updatedAt}</td>
              </tr>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default PatientTable;
