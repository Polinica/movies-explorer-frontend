import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../Auth/Auth";
import AuthInputForEmail from "../AuthInputForEmail/AuthInputForEmail";
import AuthInputForName from "../AuthInputForName/AuthInputForName";
import AuthInputForPassword from "../AuthInputForPassword/AuthInputForPassword";
import mainApi from "../../../utils/MainApi";

// Константы для повторяющихся текстовых полей
const TITLE = "Добро пожаловать!";
const HINT_TEXT = "Уже зарегистрированы?";
const HINT_LINK_TEXT = "Войти";
const BUTTON_TEXT = "Зарегистрироваться";

// Маппинг ошибок, которые могут прийти от сервера
const REQUEST_ERRORS = {
  SIGNUP_409: "Пользователь с таким email уже существует.",
  SIGNUP_DEFAULT: "При регистрации пользователя произошла ошибка.",
};

// Хук для управления стейтом формы
function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Обработчик ввода в поля формы
  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest("form").checkValidity());
  }

  return [values, errors, isValid, handleInputChange];
}

// Подсказка для пользователя
const hint = (
  <p className="auth__hint">
    {HINT_TEXT}{" "}
    <Link to="/signin" className="auth__hint-link">
      {HINT_LINK_TEXT}
    </Link>
  </p>
);

const Register = ({ onLogin }) => {
  const [values, errors, isValid, handleInputChange] = useForm();
  const [requestError, setRequestError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Обработчик отправки формы
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setRequestError("");

    try {
      await mainApi.register(values);
      const { email, password } = values;

      const res = await mainApi.login({ email, password });

      if (res.token) {
        onLogin(res);
      }
    } catch (err) {
      // Обработка ошибок, полученных от сервера
      setRequestError(
        REQUEST_ERRORS[err.message] || REQUEST_ERRORS.SIGNUP_DEFAULT
      );
    }

    setIsLoading(false);
  };

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
      <AuthInputForName
        value={values.name?.toString() || ""}
        error={errors.name}
        onChange={handleInputChange}
        isDisabled={isLoading}
      />
      <AuthInputForEmail
        value={values.email?.toString() || ""}
        error={errors.email}
        onChange={handleInputChange}
        isDisabled={isLoading}
      />
      <AuthInputForPassword
        value={values.password?.toString() || ""}
        error={errors.password}
        onChange={handleInputChange}
        isDisabled={isLoading}
      />
    </Auth>
  );
};
export default Register;
