import React from "react";
import "./server-error.css";
import Transition from "react-transition-group/Transition";

const serverError = ({ content, show, mainClass }) => (
  <Transition mountOnEnter unmountOnExit in={show} timeout={500}>
    {state => (
      <div className={`${mainClass} ${show ? "open-error" : "close-error"}`}>{content}</div>
    )}
  </Transition>
);

export default serverError;
