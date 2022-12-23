import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import EditTask from "./EditTask";
import { getEveryTask } from "../../store/tasks";
import { editFormStatus } from "../../store/edit";
import { parseVisitType } from "../../services/role";

const TaskTable = () => {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.tasks.taskList);
  const showForm = useSelector((state) => state.edit.editForm);
  const [task, setTask] = useState({});

  useEffect(() => {
    dispatch(getEveryTask());
  }, [dispatch]);

  const editTaskInfo = (taskObj) => {
    dispatch(editFormStatus());
    setTask(taskObj);
  };

  return (
    <>
      {showForm && <EditTask task={task} />}
      <Table responsive>
        <thead>
          <tr>
            <th>Assigned staff</th>
            <th>Patient</th>
            <th>Type of visit</th>
            <th>Scheduled date</th>
            <th>Status</th>
            <th>Added</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {taskList.length
            ? taskList.map((taskObj) => (
                <tr key={taskObj.id} onClick={() => editTaskInfo(taskObj)}>
                  <td>{`${taskObj.staff.lastName}, ${taskObj.staff.firstName} (${taskObj.staff.role})`}</td>
                  <td>{`${taskObj.patient.lastName}, ${
                    taskObj.patient.firstName
                  } ${
                    taskObj.patient.middleName
                      ? taskObj.patient.middleName[0]
                      : ""
                  }`}</td>
                  <td>{parseVisitType(taskObj.staff.role)}</td>
                  <td>{taskObj.scheduledDate}</td>
                  <td>{taskObj.completed ? "Completed" : "Pending"}</td>
                  <td>{taskObj.createdAt}</td>
                  <td>{taskObj.updatedAt}</td>
                </tr>
              ))
            : "Loading..."}
        </tbody>
      </Table>
    </>
  );
};

export default TaskTable;
