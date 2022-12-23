import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { addEditTask, removeTask, getSingleTask } from "../../store/tasks";
import { editFormStatus } from "../../store/edit";
import { parseVisitType } from "../../services/role";

const EditTask = ({ task }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.visitingUserList);
  const patientList = useSelector((state) => state.patients.patientList);
  const parseDate = new Date(task.scheduledDate).toISOString().split("T")[0];
  const [show, setShow] = useState(true);
  const [staff, setStaff] = useState(task.staff);
  const [staffId, setStaffId] = useState(staff.id);
  const [patient, setPatient] = useState(task.patient);
  const [patientId, setPatientId] = useState(patient.id);
  const [scheduledDate, setScheduledDate] = useState(parseDate);
  const [status, setStatus] = useState(task.completed);
  const [visit, setVisit] = useState(parseVisitType(task.staff.role));
  const [showForm, setShowForm] = useState(false);
  const [deletedTask, setDeletedTask] = useState(false);

  if (!patientList) return "Loading...";

  const handleClose = () => {
    setShow(false);
    dispatch(editFormStatus());
  };

  const handleSubmit = async () => {
    const visitType = parseVisitType(userList[staffId].role);
    const visitYear = parseInt(scheduledDate.split("-")[0], 10);
    const visitMonth = parseInt(scheduledDate.split("-")[1], 10);
    const visitDay = parseInt(scheduledDate.split("-")[2], 10);

    const data = await dispatch(
      addEditTask({
        fetchType: "PATCH",
        taskId: task.id,
        staffId,
        patientId,
        visitType,
        visitYear,
        visitMonth,
        visitDay,
        status,
      })
    );

    if (!data.error) {
      setShowForm(false);
    } else {
      window.alert(data.error);
    }
  };

  const handleEditForm = () => {
    setShowForm(!showForm);
  };

  const cancelEditTask = () => {
    setShowForm(!showForm);
  };

  const handleDeleteTask = () => {
    dispatch(removeTask(task.id));
    setDeletedTask(true);
  };

  const handlePatientName = (patient) => {
    if (patient.middleName) {
      return `Patient: ${patient.lastName}, ${patient.firstName} ${patient.middleName[0]}.`;
    }

    return `Patient: ${patient.lastName}, ${patient.firstName}`;
  };

  const handlePatient = (patientId) => {
    setPatientId(patientId);
    setPatient(patientList[patientId]);
  };

  const handleStaff = (staffId) => {
    setStaffId(staffId);
    setStaff(userList[staffId]);
    setVisit(parseVisitType(userList[staffId].role));
  };

  const handleStatus = (status) => {
    if (status) {
      return "Completed";
    }

    return "Pending";
  };

  const handleSetStatus = (string) => {
    if (string === "true") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  return (
    <div
      onKeyDown={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      onMouseOver={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        id="modal-edit-task-container"
      >
        <Modal.Header
          closeButton
          id="modal-header-edit-task"
          className="modal-header-task"
        >
          <Modal.Title>Task details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deletedTask && (
            <div className="task-deleted">Task removed from the database.</div>
          )}
          {!showForm && !deletedTask && (
            <>
              <div className="task-staff">{`Assigned staff: ${staff.lastName}, ${staff.firstName} (${staff.role})`}</div>
              <div className="task-patient">{handlePatientName(patient)}</div>
              <div className="task-type">{`Type of visit: ${visit}`}</div>
              <div className="task-scheduledDate">{`Date of visit: ${new Date(
                scheduledDate
              )}`}</div>
              <div className="task-status">{`Status: ${handleStatus(
                status
              )}`}</div>
              <div className="task-added">{`Added: ${task.createdAt}`}</div>
              <div className="task-updated">{`Updated: ${task.updatedAt}`}</div>
              <Button onClick={handleEditForm}>Edit details</Button>
              <Button onClick={handleDeleteTask}>Delete task</Button>
            </>
          )}
          {showForm && (
            <Form id="add-task-form">
              <Form.Group controlId="formGroupTaskStaff">
                <Form.Label>Select staff</Form.Label>
                <Form.Control
                  as="select"
                  value={staffId}
                  onChange={(e) => handleStaff(e.target.value)}
                  custom
                >
                  {userList &&
                    Object.values(userList).map((staff) => (
                      <option key={`staff-${staff.id}`} value={staff.id}>
                        {`${staff.lastName}, ${staff.firstName}: ${staff.role}`}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGroupTaskPatient">
                <Form.Label>Select patient</Form.Label>
                <Form.Control
                  as="select"
                  value={patientId}
                  onChange={(e) => handlePatient(e.target.value)}
                  custom
                >
                  {patientList &&
                    Object.values(patientList).map((patient) => (
                      <option key={`patient-${patient.id}`} value={patient.id}>
                        {`${patient.lastName}, ${patient.firstName} ${
                          patient.middleName ? patient.middleName[0] + "." : ""
                        }`}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGroupTaskVisitDate">
                <Form.Label>Visit date</Form.Label>
                <Form.Control
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formGroupTaskVisitStatus">
                <Form.Label>Visit status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => handleSetStatus(e.target.value)}
                  custom
                >
                  <option value={false}>Pending</option>
                  <option value={true}>Completed</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" onClick={handleSubmit}>
                Save changes
              </Button>
              <Button variant="secondary" onClick={cancelEditTask}>
                Cancel
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditTask;
