import { Link } from "react-router-dom";
import { useState } from "react";
import mainApi from "../../../utils/MainApi";
import Auth from "../../Auth/Auth";
import AuthInputForEmail from "../AuthInputForEmail/AuthInputForEmail";
import AuthInputForPassword from "../AuthInputForPassword/AuthInputForPassword";
import useForm from "../../../utils/hooks/useFormValidation";

// Заголовки и тексты
const TITLE = "Рады видеть!";
const HINT_TEXT = "Ещё не зарегистрированы?";
const HINT_LINK_TEXT = "Регистрация";
const BUTTON_TEXT = "Войти";

// Ошибки и их тексты
const REQUEST_ERRORS = {
  401: "Вы ввели неправильный логин или пароль.",
  SIGNIN_DEFAULT: "При входе произошла ошибка.",
};

function Login({ onLogin }) {
  // Начальные значения формы
  const [values, errors, isValid, handleChange] = useForm();

  // Состояния ошибки и загрузки
  const [requestError, setRequestError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Обработчик отправки формы
  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true); // Включить индикатор загрузки
    setRequestError(""); // Очистить сообщения об ошибках

    try {
      const res = await mainApi.login(values);
      if (res.token) {
        onLogin(res);
      }
    } catch (err) {
      setRequestError(
        REQUEST_ERRORS[err.message] || REQUEST_ERRORS.SIGNIN_DEFAULT
      );
    }

    setIsLoading(false); // Выключить индикатор загрузки
  }

  return (
    <Auth
      title={TITLE}
      hint={
        <p className="auth__hint">
          {HINT_TEXT}{" "}
          <Link to="/signup" className="auth__hint-link">
            {HINT_LINK_TEXT}
          </Link>
        </p>
      }
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
