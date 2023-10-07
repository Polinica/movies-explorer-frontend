import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../Auth/Auth";
import AuthInputForEmail from "../AuthInputForEmail/AuthInputForEmail";
import AuthInputForName from "../AuthInputForName/AuthInputForName";
import AuthInputForPassword from "../AuthInputForPassword/AuthInputForPassword";
import mainApi from "../../../utils/MainApi";

const TITLE = "Добро пожаловать!";
const HINT_TEXT = "Уже зарегистрированы?";
const HINT_LINK_TEXT = "Войти";
const BUTTON_TEXT = "Зарегистрироваться";
const REQUEST_ERRORS = {
  SIGNUP_409: "Пользователь с таким email уже существует.",
  SIGNUP_DEFAULT: "При регистрации пользователя произошла ошибка.",
};

function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest("form").checkValidity());
  }

  return [values, errors, isValid, handleInputChange];
}

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setRequestError("");
    try {
      await mainApi.register(values);
      const { email, password } = values;
      const res = await mainApi.login({
        email,
        password,
      });
      if (res.token) {
        onLogin(res);
      }
    } catch (err) {
      let message;
      switch (err.message) {
        case "409":
          message = REQUEST_ERRORS.SIGNUP_409;
          break;
        default:
          message = REQUEST_ERRORS.SIGNUP_DEFAULT;
      }
      setRequestError(message);
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
