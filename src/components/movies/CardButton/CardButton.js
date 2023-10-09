import React from "react";
import "./CardButton.css";

function createCardButton({ className, alt, onClick, disabled }) {
  const buttonClass = `card-button ${className} movie-card__button`;

  return (
    <button
      className={buttonClass}
      type="button"
      aria-label={alt}
      onClick={onClick}
      disabled={disabled}
    ></button>
  );
}

export function WorkCardButton({ isSaved, onClick, disabled }) {
  const className = isSaved ? "card-button_type_done" : "card-button_type_save";
  const alt = isSaved ? "Удалить фильм из сохраненных" : "";

  return createCardButton({
    className,
    alt,
    onClick,
    disabled,
  });
}

export function SavedCardButton({ onClick, disabled }) {
  const className = "card-button_type_delete";
  const alt = "Удалить фильм из сохраненных";

  return createCardButton({
    className,
    alt,

    onClick,
    disabled,
  });
}
