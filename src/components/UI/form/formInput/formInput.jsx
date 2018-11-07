import React from "react";
import "./formInput.css";

const formInput = ({ type, error, title, selectItems, nullable, ...props }) => {

  const inputClass = error ? "invalid-input" : "valid-input";
  let input = null;
  switch (type) {
    case "textarea":
      input = <textarea {...props} id={title} className={inputClass} />;
      break;
    case "select":
      input = (
        <select {...props} id={title} className={inputClass}>
          {selectItems.map(i => {
            return <option key={i.label} value={i.value}>{i.label}</option>;
          })}
        </select>
      );
      break;
    default:
      input = <input {...props} type={type} id={title} className={inputClass} />;
      break;
  }
  return (
    <section className="input-container">
      <label htmlFor={title}>{title}{nullable || "*"}</label>
      {input}
      <p className="u-form-validation">{error && <span>{error}</span>}</p>
    </section>
  );
};

export default formInput;
