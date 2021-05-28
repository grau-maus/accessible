import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import EditTask from './EditTask';
import { getEveryTask } from '../../store/tasks';
import { editForm } from '../../store/edit';
import { parseVisitType } from '../../services/role';

const TaskTable = () => {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.tasks.taskList);
  const showForm = useSelector((state) => state.edit.editForm);
  const [task, setTask] = useState({});

  useEffect(() => {
    dispatch(getEveryTask());
  }, [dispatch]);

  if (!taskList) return 'Loading...';

  const editTaskInfo = (taskObj) => {
    dispatch(editForm());
    setTask(taskObj);
  };

  return (
    <>
      {showForm &&
        <EditTask task={task} />
      }
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
          {taskList &&
            Object.values(taskList).map((taskObj, index) => (
              <tr key={`tr-${index}`} onClick={() => editTaskInfo(taskObj)}>
                <td key={`name-${index}`}>{`${taskObj.staff.lastName}, ${taskObj.staff.firstName} (${taskObj.staff.role})`}</td>
                <td key={`patient-${index}`}>{`${taskObj.patient.lastName}, ${taskObj.patient.firstName} ${taskObj.patient.middleName ? taskObj.patient.middleName[0] : ''}`}</td>
                <td key={`vistType-${index}`}>{parseVisitType(taskObj.staff.role)}</td>
                <td key={`visitDate-${index}`}>{taskObj.scheduledDate}</td>
                <td key={`status-${index}`}>{taskObj.completed ? 'Completed' : 'Pending'}</td>
                <td key={`added-${index}`}>{taskObj.createdAt}</td>
                <td key={`updated-${index}`}>{taskObj.updatedAt}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
};

export default TaskTable;
