import classNames from "classnames";
import "./CardButton.css";

function CardButton({ className, alt, text, onClick }) {
  // const TYPE_CONFIG = {
  //   save: {
  //     text: "",
  //     className: "card-button_type_save",
  //     alt: "поставить отметку с фильма",
  //   },
  //   done: {
  //     text: "",
  //     className: "card-button_type_done",
  //     alt: "Снять отметку с фильма",
  //   },
  //   delete: {
  //     text: "",
  //     className: "card-button_type_delete",
  //     alt: "Удалить фильм из сохранённых",
  //   },
  // };

  return (
    <button
      //   className={classNames(
      //     className,
      //     TYPE_CONFIG[type].className,
      //     "card-button"
      //   )}
      //   type="button"
      //   {...(TYPE_CONFIG[type].alt
      //     ? { "aria-label": TYPE_CONFIG[type].alt }
      //     : {})}
      //   onClick={onClick}
      // >
      //   {TYPE_CONFIG[type].text}
      className={classNames("card-button", className, "movie-card__button")}
      type="button"
      aria-label={alt}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default CardButton;
