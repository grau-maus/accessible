import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { addEditUser } from "../../store/users";

import "./User.css";

const AddUser = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("admin");
    setPassword("");
  };
  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);
  const handleSubmit = async () => {
    const data = await dispatch(
      addEditUser({
        fetchType: "POST",
        firstName,
        lastName,
        email,
        role,
        password,
      })
    );

    if (!data.error) {
      resetForm();
      window.alert("User added!");
    } else {
      window.alert(data.error);
    }
  };

  return (
    <div
      onKeyDown={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      onMouseOver={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div onClick={handleShow}>Add new user</div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="modal-header-user">
          <Modal.Title>Add new user:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="add-user-form">
            <Form.Group controlId="formGroupFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formGroupLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formGroupRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                custom
              >
                <option value="admin">Administrator</option>
                <option value="S">Scheduler</option>
                <option value="RN">Nurse</option>
                <option value="CNA">Medical Health Aide</option>
                <option value="PT">Physical Therapist</option>
                <option value="PTA">Physical Therapist Assistant</option>
                <option value="OT">Occupational Therapist</option>
                <option value="OTA">Occupational Therapist Assistant</option>
                <option value="ST">Speech Therapist</option>
                <option value="STA">Speech Therapist Assistant</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
              Add user
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddUser;
