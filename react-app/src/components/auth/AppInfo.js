import React, { useRef } from "react";
import { ReactComponent as CloseIcon } from "../../utils/icons/close-icon.svg";
import "./LoginForm.css";

const AppInfo = () => {
  const modalRef = useRef();

  const closeModal = (e) => {
    const className = e.target.className;

    if (className === "about-app") {
      e.target.close();
    }
  };

  return (
    <>
      <dialog className="about-app" ref={modalRef} onClick={closeModal}>
        <div className="about-app-content">
          <div className="about-app-header">
            <CloseIcon onClick={() => modalRef.current.close()} />
            <h3>About accessible:</h3>
          </div>
          <div>
            This web application aims to emulate a functional medical records
            database. Since medical information of a patient is protected health
            information, HIPAA regulations must be followed.
          </div>
          <br />
          <div>
            For more information about HIPAA, please visit the{" "}
            <a
              href="https://www.hhs.gov/hipaa/index.html"
              target="_blank"
              rel="noreferrer"
            >
              U.S. Department of Health & Human Services website
            </a>
            .
          </div>
          <br />
          <div>
            Otherwise, please contact your company's administrator about your
            account.
          </div>
          <br />
          <div>Have a nice day!</div>
          <div className="about-app-btn-wrapper">
            <button onClick={() => modalRef.current.close()} type="button">
              Close
            </button>
          </div>
        </div>
      </dialog>
      <div
        className="about-app-info"
        onClick={() => modalRef.current.showModal()}
      >
        Need an account?
      </div>
    </>
  );
};

export default AppInfo;
