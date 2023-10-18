import { useState, useEffect } from "react";
import NavigationLink from "../NavigationLink/NavigationLink";
import "./Navigation.css";

function Navigation({ hasLinkToMain = true }) {
  const [isOpen, setIsOpen] = useState(false);

  // Открывает и закрывает меню
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Проверяет является ли элемент, по которому был выполнен клик, самым верхним уровнем, чтобы закрыть меню
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      toggleMenu();
    }
  };

  //Обработчик нажатия клавиши 'Escape' - закрывает меню при его нажатии
  const handleEscClose = (event) => {
    if (event.key === "Escape") {
      toggleMenu();
    }
  };

  // Ловляет нажатие клавиши 'Escape', только когда меню открыто и удаляет листенер после закрытия меню
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      return () => {
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [isOpen]);

  return (
    // Использует isOpen для добавления класса и изменения состояния меню
    <div className="navigation">
      <button
        type="button"
        className="navigation__open-button"
        aria-label="Открыть меню"
        onClick={toggleMenu}
      ></button>
      <div
        className={`navigation__menu${
          isOpen ? " navigation__menu_opened" : ""
        }`}
        onClick={handleOverlayClick}
      >
        <nav className="navigation__panel">
          <button
            type="button"
            className="navigation__close-button"
            aria-label="Закрыть меню"
            onClick={toggleMenu}
          ></button>
          <ul className="navigation__list">
            {hasLinkToMain && (
              <NavigationLink title="Главная" to="/" isLinkToMain />
            )}
            <NavigationLink title="Фильмы" to="/movies" />
            <NavigationLink title="Сохранённые фильмы" to="/saved-movies" />
            <NavigationLink title="Аккаунт" to="/profile" isLinkToProfile />
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
