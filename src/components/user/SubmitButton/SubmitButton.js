import React from "react";
import "./SubmitButton.css";

function SubmitButton({ onClick, title, className, isDisabled }) {
  return (
    <button
      className={`submit-button ${className}`}
      onClick={onClick}
      type="submit"
      disabled={isDisabled}
    >
      {title}
    </button>
  );
}

export default SubmitButton;
