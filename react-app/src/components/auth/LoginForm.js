import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/session";
import { Form, Button } from "react-bootstrap";
import AppInfo from "./AppInfo";
import ambulanceIcon from "../../utils/icons/font-awesome/ambulance-solid.svg";
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const retryLogin = (email, password) => {
    setIsLoggingIn(true);

    let retries = 0;
    const loginInterval = setInterval(async () => {
      if (retries < 5) {
        retries += 1;

        const action = await dispatch(login({ email, password }));
        const data = action.payload;

        if (data && data.errors) {
          for (const ele of data.errors) {
            const type = ele.split(" ")[0];

            if (type === "email") setEmailError(ele);
            if (type === "password") setPassError(ele);
          }

          setIsLoggingIn(false);
          clearInterval(loginInterval);
        } else if (data && (!data.errors || !data.errors.length)) {
          clearInterval(loginInterval);
        }
      } else {
        setIsLoggingIn(false);
        clearInterval(loginInterval);
      }
    }, 500);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    retryLogin(email, password);
  };

  const adminDemoLogin = () => {
    retryLogin("demo@user.io", "password");
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setPassError("");
  };

  if (user) {
    return navigate("/");
  }

  return (
    <div id="login-form-container">
      <Form id="login-form" onSubmit={onLogin}>
        <div className="login-logo">
          <div className="login-icon-wrapper">
            <ReactSVG src={ambulanceIcon} wrapper="svg" id="ambulance-login" />
          </div>

          <h2>accessible</h2>
        </div>

        <Form.Group controlId="formBasicEmail" className="login-email">
          <Form.Label>Email address</Form.Label>

          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />

          {emailError && <div className="login-errors">{emailError}</div>}
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="login-password">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />

          {passError && <div className="login-errors">{passError}</div>}
        </Form.Group>

        <div id="login-buttons">
          <Button
            id="login-submit"
            variant="primary"
            type="submit"
            disabled={isLoggingIn}
          >
            Login
          </Button>

          <Button
            id="login-admin-demo"
            onClick={adminDemoLogin}
            disabled={isLoggingIn}
          >
            Admin Demo Login
          </Button>
          <AppInfo />
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
