import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import EditInsurance from './EditInsurance';
import { getAllInsurance } from '../../store/insurance';
import { editForm } from '../../store/edit';

const InsuranceTable = () => {
  const dispatch = useDispatch();
  const insuranceList = useSelector((state) => state.insurance.insuranceList);
  const showForm = useSelector((state) => state.edit.editForm);
  const [insurance, setInsurance] = useState({});

  useEffect(() => {
    dispatch(getAllInsurance());
  }, [dispatch]);

  if (!insuranceList) return null;

  const editInsuranceInfo = (insObj) => {
    dispatch(editForm());
    setInsurance(insObj);
  };

  return (
    <>
      {showForm &&
        <EditInsurance insurance={insurance} />
      }
      <Table responsive>
        <thead>
          <tr>
            <th>Company</th>
            <th>Type</th>
            <th>Added</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {insuranceList &&
            Object.values(insuranceList).map((insObj, index) => (
              <tr key={`tr-${index}`} onClick={() => editInsuranceInfo(insObj)}>
                <td key={`name-${index}`}>{insObj.name}</td>
                <td key={`type-${index}`}>{insObj.type}</td>
                <td key={`added-${index}`}>{insObj.createdAt}</td>
                <td key={`updated-${index}`}>{insObj.updatedAt}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
};

export default InsuranceTable;
