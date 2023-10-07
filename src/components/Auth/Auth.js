import "./Auth.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Auth({
  title,
  hint,
  buttonText,
  children,
  isValid,
  requestError,
  onSubmit,
  isLoading,
}) {
  // const MODES = {
  //   register: {
  //     title: "Добро пожаловать!",
  //     hint: (
  //       <p className="auth__hint">
  //         Уже зарегистрированы?{" "}
  //         <Link to="/signin" className="auth__hint-link">
  //           Войти
  //         </Link>
  //       </p>
  //     ),
  //     buttonText: "Зарегистрироваться",
  //   },
  //   login: {
  //     title: "Рады видеть!",
  //     hint: (
  //       <p className="auth__hint">
  //         Ещё не зарегистрированы?{" "}
  //         <Link to="/signup" className="auth__hint-link">
  //           Регистрация
  //         </Link>
  //       </p>
  //     ),
  //     buttonText: "Войти",
  //   },
  // };

  return (
    <main className="auth content__stretched-element">
      <div className="auth__container">
        <Link className="auth__logo-link" to="/">
          <img
            className="header__logo"
            alt="Логотип приложения: круг"
            src={logo}
          />
        </Link>
        <h1 className="auth__title">{title}</h1>
        <form className="auth__form" noValidate onSubmit={onSubmit}>
          {children}
          <p className="auth__request-error">{requestError}</p>
          <button
            title={buttonText}
            className="auth__submit-button"
            type="submit"
            isDisabled={!isValid}
            isLoading={isLoading}
          >
            Зарегистрироваться
          </button>
        </form>
        {hint}
      </div>
    </main>
  );
}

export default Auth;
