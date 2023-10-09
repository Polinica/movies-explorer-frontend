import { NavLink } from "react-router-dom";
import "./AuthLinks.css";

function AuthLinks() {
  // создаем массив элементов для навигации
  const authLinksArray = [
    {
      path: "/signup", // путь для элемента навигации
      text: "Регистрация", // текст для элемента навигации
      classType: "auth-links__link", // class для элемента навигации
    },
    {
      path: "/signin", // путь для элемента навигации
      text: "Войти", // текст для элемента навигации
      classType: "auth-links__link auth-links__link_type_login", // class для элемента навигации
    },
  ];

  return (
    <nav className="auth-links">
      <ul className="auth-links__list">
        {
          // итерируем через массив authLinksArray, создавая элемент li для каждого элемента
          authLinksArray.map((link, index) => (
            <li key={index} className="auth-links__list-item">
              <NavLink to={link.path} className={link.classType}>
                {link.text}
              </NavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  );
}

export default AuthLinks;
