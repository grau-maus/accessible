import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/session";
import Carousel from "./Carousel";
import AppInfo from "./AppInfo";
import { ReactComponent as Logo } from "../../utils/icons/accessible-logo3.svg";
import { ReactComponent as LogoName } from "../../utils/icons/accessible-logo3-name.svg";
import { ReactComponent as ShowPassword } from "../../utils/icons/pass-eye.svg";
import { ReactComponent as HidePassword } from "../../utils/icons/pass-eye-slash.svg";
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
  const [passInputType, setPassInputType] = useState("password");
  const [displayPassTooltip, setDisplayPassTooltip] = useState("hide");

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

  const showPassword = (e) => {
    setPassInputType("text");
  };

  const hidePassword = (e) => {
    setPassInputType("password");
  };

  if (user) {
    return navigate("/");
  }

  return (
    <div
      id="login-form-container"
      onMouseEnter={() => setDisplayPassTooltip("hide")}
    >
      <Carousel />
      <form id="login-form" onSubmit={onLogin}>
        <LogoName className="login-logo-name" />
        <Logo className="login-logo" />
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
            type={passInputType}
            id="password-login"
            className={hasError ? "input-error" : null}
            onFocus={() => setPasswordLabelClass("focused-input")}
            onBlur={blurredPassInput}
            value={password}
            onChange={updatePassword}
          />
          <div className="password-icon-wrapper">
            <div className={`password-icon-tooltip ${displayPassTooltip}`}>
              show / hide password
              <div className="tooltip-triangle" />
            </div>
            {passInputType === "password" ? (
              <button
                onClick={showPassword}
                onMouseEnter={() => setDisplayPassTooltip("")}
                onMouseLeave={() => setDisplayPassTooltip("hide")}
                type="button"
              >
                <ShowPassword className="password-icon" />
              </button>
            ) : (
              <button
                onClick={hidePassword}
                onMouseEnter={() => setDisplayPassTooltip("")}
                onMouseLeave={() => setDisplayPassTooltip("hide")}
                type="button"
              >
                <HidePassword className="password-icon" />
              </button>
            )}
          </div>
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
            type="button"
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
