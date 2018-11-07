import React from "react";
import "./button.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Aux from "../../../hoc/hoc";
const button = ({ name, iconOn, iClass, type, ...props }) => {
  let button = null;
  if (!type) {
    button = (
      <button {...props}>
        {name}
        {props.children}
        {iconOn && <i className={iClass} />}
      </button>
    );
  } else if (type === "link") {
    button = (
      <Link {...props}>
        {name}
        {iconOn && <i className={iClass} />}
      </Link>
    );
  } else {
    button = (
      <NavLink {...props}>
        {name}
        {iconOn && <i className={iClass} />}
      </NavLink>
    );
  }
  return <Aux>{button}</Aux>;
};
export default button;
