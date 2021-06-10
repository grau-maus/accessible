import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { getAllInsurance } from '../../store/insurance';
import { getAllPhysicians } from '../../store/physicians';
import { getAllPatients } from '../../store/patients';
import { getEveryTask } from '../../store/tasks';

import './Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const insuranceList = useSelector((state) => state.insurance.insuranceList);
  const physicianList = useSelector((state) => state.physicians.physicianList);
  const patientList = useSelector((state) => state.patients.patientList);
  const taskList = useSelector((state) => state.tasks.taskList);

  useEffect(() => {
    dispatch(getAllInsurance());
    dispatch(getAllPhysicians());
    dispatch(getAllPatients());
    dispatch(getEveryTask());
  }, [dispatch]);

  return (
    <div className='home-container'>
      <div className='home-nav-spacer'></div>

      <div className='dashboard-container'>
        <div className='dashboard-navbar'>
          <div className='dashboard-navbar-left'>
            <p className='dashboard-hello-user'>Hello {user.firstName}!</p>
            <p className='dashboard-current-date'>{new Date().toDateString()}</p>
          </div>

          <div className='dashboard-navbar-right'>
            <p className='dashboard-company-name'>Super Health Inc.</p>
            <p className='dashboard-company-address'>444 Academy Blvd.</p>
          </div>
        </div>

        <div className='dashboard-body'>
          <div className='dashboard-body-left'>
            <div className='dashboard-task-header'>
              <p>Tasks this month:</p>
            </div>
            {taskList ?
              Object.values(taskList).map((task, idx) => (
                <div className='dashboard-tasks' key={`tasks-div-${idx}`}>
                  <h4 key={`taskType-${idx}`}>{`${task.type}:`}</h4>
                  <h4 key={`taskPatient-${idx}`}>{`${task.patient.lastName}, ${task.patient.firstName}`}</h4>
                </div>
              )) : 'Loading tasks...'
            }
          </div>

          <div className='dashboard-body-right'>
            <div className='dashboard-body-right-insurance'>
              <div className='dashboard-insurance-header'>
                <p>Insurance:</p>
              </div>
              {insuranceList ?
                Object.values(insuranceList).map((insurance, idx) => (
                  <div className='dashboard-insurance' key={`insurance-div-${idx}`}>
                    <h4 key={`insurance-${idx}`}>{insurance.name}</h4>
                  </div>
                )) : 'Loading insurance...'
              }
            </div>

            <div className='dashboard-body-right-physician'>
              <div className='dashboard-physicians-header'>
                <p>Referring physicians:</p>
              </div>
              {physicianList ?
                Object.values(physicianList).map((physician, idx) => (
                  <div className='dashboard-physicians' key={`physicians-div-${idx}`}>
                    <h4 key={`physicians-${idx}`}>{physician.name}</h4>
                  </div>
                )) : 'Loading physicians...'
              }
            </div>
          </div>
        </div>

        <div className='dashboard-footer'>
          <h4>Patient birthdays:</h4>
          {patientList ? (
            <>
              <h3>
                <p>
                  {Object.values(patientList)[0].firstName}
                </p>
                <p>
                  {new Date(Object.values(patientList)[0].dob).toDateString().split(' ').splice(1, 20).join(' ')}
                </p>
              </h3>
              <h3>
                <p>
                  {Object.values(patientList)[1].firstName}
                </p>
                <p>
                  {new Date(Object.values(patientList)[1].dob).toDateString().split(' ').splice(1, 20).join(' ')}
                </p>
              </h3>
              <h3>
                <p>
                  {Object.values(patientList)[2].firstName}
                </p>
                <p>
                  {new Date(Object.values(patientList)[2].dob).toDateString().split(' ').splice(1, 20).join(' ')}
                </p>
              </h3>
            </>
          ) : 'Loading patients...'
          }
          <Button>View all birthdays</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
