import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import EditInsurance from "./EditInsurance";
import { getAllInsurance } from "../../store/insurance";
import { editFormStatus } from "../../store/edit";

const InsuranceTable = () => {
  const dispatch = useDispatch();
  const insuranceList = useSelector((state) => state.insurance.insuranceList);
  const showForm = useSelector((state) => state.edit.editForm);
  const [insurance, setInsurance] = useState({});

  useEffect(() => {
    dispatch(getAllInsurance());
  }, [dispatch]);

  const editInsuranceInfo = (insObj) => {
    dispatch(editFormStatus());
    setInsurance(insObj);
  };

  return (
    <>
      {showForm && <EditInsurance insurance={insurance} />}
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
          {insuranceList.length
            ? insuranceList.map((insObj) => (
                <tr key={insObj.id} onClick={() => editInsuranceInfo(insObj)}>
                  <td>{insObj.name}</td>
                  <td>{insObj.type}</td>
                  <td>{insObj.createdAt}</td>
                  <td>{insObj.updatedAt}</td>
                </tr>
              ))
            : "Loading..."}
        </tbody>
      </Table>
    </>
  );
};

export default InsuranceTable;
