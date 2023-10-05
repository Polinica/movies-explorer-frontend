import React from "react";
import "./CardButton.css";

function CardButton({ className, type, onClick }) {
  // Конфигурация для разных типов кнопок
  const TYPE_CONFIG = {
    save: {
      text: "",
      className: "card-button_type_save",
      alt: "поставить отметку с фильма",
    },
    done: {
      text: "",
      className: "card-button_type_done",
      alt: "Снять отметку с фильма",
    },
    delete: {
      text: "",
      className: "card-button_type_delete",
      alt: "Удалить фильм из сохранённых",
    },
  };

  // Создаем класс кнопки
  const buttonClass = ["card-button", className, TYPE_CONFIG[type]?.className]
    .filter(Boolean)
    .join(" ");

  // Создаем атрибуты кнопки
  const buttonProps = {
    type: "button",
    onClick,
    ...(TYPE_CONFIG[type]?.alt ? { "aria-label": TYPE_CONFIG[type].alt } : {}),
  };

  return (
    <button className={buttonClass} {...buttonProps}>
      {TYPE_CONFIG[type].text}
    </button>
  );
}

export default CardButton;

// import classNames from "classnames";
// import "./CardButton.css";

// function CardButton({ className, type, onClick }) {
//   const TYPE_CONFIG = {
//     save: {
//       text: "",
//       className: "card-button_type_save",
//       alt: "поставить отметку с фильма",
//     },
//     done: {
//       text: "",
//       className: "card-button_type_done",
//       alt: "Снять отметку с фильма",
//     },
//     delete: {
//       text: "",
//       className: "card-button_type_delete",
//       alt: "Удалить фильм из сохранённых",
//     },
//   };

//   return (
//     <button
//       className={classNames(
//         className,
//         TYPE_CONFIG[type].className,
//         "card-button"
//       )}
//       type="button"
//       {...(TYPE_CONFIG[type].alt
//         ? { "aria-label": TYPE_CONFIG[type].alt }
//         : {})}
//       onClick={onClick}
//     >
//       {TYPE_CONFIG[type].text}
//     </button>
//   );
// }

// export default CardButton;
