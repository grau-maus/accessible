import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { DateTime } from "luxon";
import { clearUserState } from "../../store/users";
import { clearInsuranceState, getAllInsurance } from "../../store/insurance";
import { clearPhysicianState, getAllPhysicians } from "../../store/physicians";
import { clearPatientState, getAllPatients } from "../../store/patients";
import { clearTaskState, getEveryTask } from "../../store/tasks";

import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const insuranceList = useSelector((state) => state.insurance.insuranceList);
  const physicianList = useSelector((state) => state.physicians.physicianList);
  const patientList = useSelector((state) => state.patients.patientList);
  const taskList = useSelector((state) => state.tasks.taskList);
  const [timeToday, setTimeToday] = useState(
    DateTime.now().toLocaleString(DateTime.DATETIME_MED)
  );

  useEffect(() => {
    dispatch(getAllInsurance());
    dispatch(getAllPhysicians());
    dispatch(getAllPatients());
    dispatch(getEveryTask());

    return () => {
      dispatch(clearUserState());
      dispatch(clearInsuranceState());
      dispatch(clearPhysicianState());
      dispatch(clearPatientState());
      dispatch(clearTaskState());
    };
  }, [dispatch]);

  useEffect(() => {
    const updateTime = setInterval(() => {
      setTimeToday(DateTime.now().toLocaleString(DateTime.DATETIME_MED));
    }, 1000);

    return () => {
      clearInterval(updateTime);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="home-nav-spacer"></div>

      <div className="dashboard-container">
        <div className="dashboard-navbar">
          <div className="dashboard-navbar-left">
            <p className="dashboard-hello-user">Hello {user.firstName}!</p>
            <p className="dashboard-current-date">{timeToday}</p>
          </div>

          <div className="dashboard-navbar-right">
            <p className="dashboard-company-name">Super Health Inc.</p>
            <p className="dashboard-company-address">444 Academy Blvd.</p>
          </div>
        </div>

        <div className="dashboard-body">
          <div className="dashboard-body-left">
            <div className="dashboard-task-header">
              <p>Tasks this month:</p>
            </div>
            {taskList.length
              ? taskList.map((task, idx) => {
                  if (idx === 0) {
                    return (
                      <div className="dashboard-tasks-start" key={task.id}>
                        <h4>{`${task.type}:`}</h4>
                        <h4>{`${task.patient.lastName}, ${task.patient.firstName}`}</h4>
                      </div>
                    );
                  } else {
                    return (
                      <div className="dashboard-tasks" key={task.id}>
                        <h4>{`${task.type}:`}</h4>
                        <h4>{`${task.patient.lastName}, ${task.patient.firstName}`}</h4>
                      </div>
                    );
                  }
                })
              : "Loading tasks..."}
          </div>

          <div className="dashboard-body-right">
            <div className="dashboard-body-right-insurance">
              <div className="dashboard-insurance-header">
                <p>Insurance:</p>
              </div>
              {insuranceList.length
                ? insuranceList.map((insurance, idx) => {
                    if (idx === 0) {
                      return (
                        <div
                          className="dashboard-insurance-start"
                          key={insurance.id}
                        >
                          <h4>{insurance.name}</h4>
                        </div>
                      );
                    } else {
                      return (
                        <div className="dashboard-insurance" key={insurance.id}>
                          <h4>{insurance.name}</h4>
                        </div>
                      );
                    }
                  })
                : "Loading insurance..."}
            </div>

            <div className="dashboard-body-right-physician">
              <div className="dashboard-physicians-header">
                <p>Referring physicians:</p>
              </div>
              {physicianList.length
                ? physicianList.map((physician, idx) => {
                    if (idx === 0) {
                      return (
                        <div
                          className="dashboard-physicians-start"
                          key={physician.id}
                        >
                          <h4>{physician.name}</h4>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="dashboard-physicians"
                          key={physician.id}
                        >
                          <h4>{physician.name}</h4>
                        </div>
                      );
                    }
                  })
                : "Loading physicians..."}
            </div>
          </div>
        </div>

        <div className="dashboard-footer">
          <h4>Patient birthdays:</h4>
          {patientList.length ? (
            <>
              <h3>
                <p>{patientList[0].firstName}</p>
                <p>
                  {new Date(patientList[0].dob)
                    .toDateString()
                    .split(" ")
                    .splice(1, 20)
                    .join(" ")}
                </p>
              </h3>
              <h3>
                <p>{patientList[1].firstName}</p>
                <p>
                  {new Date(patientList[1].dob)
                    .toDateString()
                    .split(" ")
                    .splice(1, 20)
                    .join(" ")}
                </p>
              </h3>
              <h3>
                <p>{patientList[2].firstName}</p>
                <p>
                  {new Date(patientList[2].dob)
                    .toDateString()
                    .split(" ")
                    .splice(1, 20)
                    .join(" ")}
                </p>
              </h3>
            </>
          ) : (
            "Loading patients..."
          )}
          <Button>View all birthdays</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
