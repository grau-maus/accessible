import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/session";
import AppInfo from "./AppInfo";
// import { ReactComponent as Logo } from "../../utils/icons/accessible-logo2-colored.svg";
import { ReactComponent as Logo } from "../../utils/icons/image2vector.svg";
import { ReactComponent as TestLogo } from "../../utils/icons/new-logo.svg";
import { ReactComponent as TestLogo1 } from "../../utils/icons/test2.svg";
import "./LoginForm.css";

// TODO: refactor error handling
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailLabelClass, setEmailLabelClass] = useState("");
  const [passwordLabelClass, setPasswordLabelClass] = useState("");
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

            if (type === "email") {
              setEmailError(ele.split(" : ")[1]);
            }
            if (type === "password") {
              setPassError(ele.split(" : ")[1]);
            }
          }

          setHasError(true);
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
    setHasError(false);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setHasError(false);
  };

  const blurredEmailInput = (e) => {
    if (!email.trim()) {
      setEmailLabelClass("blurred-input");
      // setEmail("");
      e.target.value = ""; // <--- b/c "setEmail" hook not working?
    }
  };

  const blurredPassInput = (e) => {
    if (!password.trim()) {
      setPasswordLabelClass("blurred-input");
      setPassword("");
    }
  };

  if (user) {
    return navigate("/");
  }

  return (
    <div id="login-form-container">
      <div id="login-page-image">
        <h1>image here</h1>
      </div>
      <form id="login-form" onSubmit={onLogin}>
        <Logo className="login-logo" />
        <TestLogo className="login-logo" />
        <TestLogo1 className="login-logo" />
        <div className="login-input-container">
          <label
            htmlFor="email-login"
            className={`login-input-label ${emailLabelClass}`}
          >
            Email
          </label>
          <input
            type="email"
            id="email-login"
            className={hasError ? "input-error" : null}
            onFocus={() => setEmailLabelClass("focused-input")}
            onBlur={blurredEmailInput}
            value={email}
            onChange={updateEmail}
          />
          <div className={hasError ? "login-error" : "login-error hide"}>
            {emailError}
          </div>
        </div>
        <div className="login-input-container">
          <label
            htmlFor="password-login"
            className={`login-input-label ${passwordLabelClass}`}
          >
            Password
          </label>
          <input
            type="password"
            id="password-login"
            className={hasError ? "input-error" : null}
            onFocus={() => setPasswordLabelClass("focused-input")}
            onBlur={blurredPassInput}
            value={password}
            onChange={updatePassword}
          />
          <div className={hasError ? "login-error" : "login-error hide"}>
            {passError}
          </div>
        </div>
        <div className="login-buttons">
          <button
            className="login-submit-btn"
            type="submit"
            disabled={isLoggingIn}
          >
            Log in
          </button>
          <button
            className="login-demo-btn"
            onClick={adminDemoLogin}
            disabled={isLoggingIn}
          >
            Admin demo log in
          </button>
        </div>
        <AppInfo />
      </form>
    </div>
  );
};

export default LoginForm;
