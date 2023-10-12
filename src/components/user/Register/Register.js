import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../Auth/Auth";
import AuthInputForEmail from "../AuthInputForEmail/AuthInputForEmail";
import AuthInputForName from "../AuthInputForName/AuthInputForName";
import AuthInputForPassword from "../AuthInputForPassword/AuthInputForPassword";
import mainApi from "../../../utils/MainApi";
import isEmail from "validator/lib/isEmail";

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

  function validateInputValue(inputType, value) {
    if (inputType === "email") {
      const ERROR_MSG =
        "Адрес почты должен быть валидным и содержать домен первого уровня.";
      return isEmail(value) ? "" : ERROR_MSG;
    }
    return "";
  }

  function handleChange(event) {
    const input = event.target;
    const name = input.name;
    const value = input.type === "checkbox" ? input.checked : input.value;
    const errorMessage = validateInputValue(input.type, value);

    setErrors((errors) => ({ ...errors, [name]: errorMessage }));
    input.setCustomValidity(errorMessage);

    setValues((values) => ({ ...values, [name]: value }));
    setIsValid(input.closest("form").checkValidity());
  }

  return [values, errors, isValid, handleChange];
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
