import { Link } from "react-router-dom";
import React from "react";
import mainApi from "../../../utils/MainApi";
import Auth from "../../Auth/Auth";
import AuthInputForEmail from "../AuthInputForEmail/AuthInputForEmail";
import AuthInputForPassword from "../AuthInputForPassword/AuthInputForPassword";
import useForm from "../../../utils/hooks/useFormValidation";

// Константы для текста и заголовков
const TITLE = "Рады видеть!";
const HINT_TEXT = "Ещё не зарегистрированы?";
const HINT_LINK_TEXT = "Регистрация";
const BUTTON_TEXT = "Войти";

export const REQUEST_ERRORS = {
  SIGNIN_401: "Вы ввели неправильный логин или пароль.",
  SIGNIN_NO_TOKEN:
    "При авторизации произошла ошибка. Токен не передан или передан невтом формате.",
  SIGNIN_INVALID_TOKEN:
    "При авторизации произошла ошибка. Переданный токен некорректен.",
  SIGNIN_DEFAULT: "При входе произошла ошибка.",
};

function Login({ onLogin }) {
  // Использование хука useForm
  const [values, errors, isValid, handleChange] = useForm();

  const hint = (
    <p className="auth__hint">
      {HINT_TEXT}{" "}
      <Link to="/signup" className="auth__hint-link">
        {HINT_LINK_TEXT}
      </Link>
    </p>
  );

  const [requestError, setRequestError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setRequestError("");

    try {
      const res = await mainApi.login(values);
      if (res.token) {
        onLogin(res);
      }
    } catch (err) {
      let message;
      switch (err.message) {
        case "401":
          message = REQUEST_ERRORS.SIGNIN_401;
          break;
        default:
          message = err?.message || REQUEST_ERRORS.SIGNIN_DEFAULT;
      }
      setRequestError(message);
    }
    setIsLoading(false);
  }

  return (
    <Auth
      title={TITLE}
      hint={hint}
      buttonText={BUTTON_TEXT}
      isValid={isValid}
      requestError={requestError}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      {/* Вставка компонентов с использованием хука useForm */}
      <AuthInputForEmail
        value={values.email || ""}
        error={errors.email}
        onChange={handleChange}
        isDisabled={isLoading}
      />
      <AuthInputForPassword
        value={values.password || ""}
        error={errors.password}
        onChange={handleChange}
        isDisabled={isLoading}
      />
    </Auth>
  );
}

export default Login;
