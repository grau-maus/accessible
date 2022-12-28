import React, { useState } from "react";
import { ReactComponent as IconLeft } from "../../utils/icons/chevron-bar-left.svg";
import { ReactComponent as IconRight } from "../../utils/icons/chevron-bar-right.svg";
import { useInterval } from "../../utils";

const Carousel = () => {
  const [imageClass1, setImageClass1] = useState("");
  const [imageClass2, setImageClass2] = useState("hide");
  const [imageClass3, setImageClass3] = useState("hide");
  const [imageClass4, setImageClass4] = useState("hide");
  const [dotPicker1, setDotPicker1] = useState("focused");
  const [dotPicker2, setDotPicker2] = useState("");
  const [dotPicker3, setDotPicker3] = useState("");
  const [dotPicker4, setDotPicker4] = useState("");
  const [currDot, setCurrDot] = useState("dot-1");

  useInterval(() => {
    iconRightClick();
  }, 6000);

  const classFuncMap = {
    "dot-1": () => {
      setDotPicker1("focused");
      setImageClass1("");
      setCurrDot("dot-1");
    },
    "dot-2": () => {
      setDotPicker2("focused");
      setImageClass2("");
      setCurrDot("dot-2");
    },
    "dot-3": () => {
      setDotPicker3("focused");
      setImageClass3("");
      setCurrDot("dot-3");
    },
    "dot-4": () => {
      setDotPicker4("focused");
      setImageClass4("");
      setCurrDot("dot-4");
    },
  };

  const clearState = () => {
    setDotPicker1("");
    setDotPicker2("");
    setDotPicker3("");
    setDotPicker4("");
    setImageClass1("hide");
    setImageClass2("hide");
    setImageClass3("hide");
    setImageClass4("hide");
  };

  const handleDotPicker = (e) => {
    const currDotEle = e.target.className.split(" ")[1];
    clearState();
    if (classFuncMap[currDotEle]) classFuncMap[currDotEle]();
  };

  function iconLeftClick() {
    const currImgNum = Number(currDot.split("-")[1]);

    clearState();

    if (currImgNum === 1) {
      classFuncMap["dot-4"]();
    } else {
      classFuncMap[`dot-${currImgNum - 1}`]();
    }
  }

  function iconRightClick() {
    const currImgNum = Number(currDot.split("-")[1]);

    clearState();

    if (currImgNum === 4) {
      classFuncMap["dot-1"]();
    } else {
      classFuncMap[`dot-${currImgNum + 1}`]();
    }
  }

  return (
    <div id="login-page-carousel">
      <div className={`carousel-image image-1 ${imageClass1}`}>
        <div className="image-container" />
        <div>
          Accessible is a platform that allows home health companies to schedule
          appointments and manage their schedules online
        </div>
      </div>
      <div className={`carousel-image image-2 ${imageClass2}`}>
        <div className="image-container" />
        <div>
          Get appointment reminder notifications and manage patient records
        </div>
      </div>
      <div className={`carousel-image image-3 ${imageClass3}`}>
        <div className="image-container" />
        <div>
          <div>Schedule a variety of healthcare services, such as:</div>
          <ul>
            <li>nursing care</li>
            <li>physical therapy</li>
            <li>occupational therapy</li>
            <li>and home health aide services</li>
          </ul>
        </div>
      </div>
      <div className={`carousel-image image-4 ${imageClass4}`}>
        <div className="image-container" />
        <div>
          Our goal is to make it easier for home health companies to manage and
          schedule appointments, streamlining the appointment process and saving
          time for users
        </div>
      </div>
      <div className="carousel-navigate-picker">
        <IconLeft className="chevron left" onClick={iconLeftClick} />
        <IconRight className="chevron right" onClick={iconRightClick} />
      </div>
      <div className="carousel-wrapper-picker">
        <div
          className={`carousel-dot dot-1 ${dotPicker1}`}
          onClick={handleDotPicker}
        />
        <div
          className={`carousel-dot dot-2 ${dotPicker2}`}
          onClick={handleDotPicker}
        />
        <div
          className={`carousel-dot dot-3 ${dotPicker3}`}
          onClick={handleDotPicker}
        />
        <div
          className={`carousel-dot dot-4 ${dotPicker4}`}
          onClick={handleDotPicker}
        />
      </div>
    </div>
  );
};

export default Carousel;
