import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../../utils/hooks/useFormWithValidation";
import Auth from "../../Auth/Auth";
import AuthInputForEmail from "../AuthInputForEmail/AuthInputForEmail";
import AuthInputForName from "../AuthInputForName/AuthInputForName";
import AuthInputForPassword from "../AuthInputForPassword/AuthInputForPassword";
import mainApi from "../../../utils/MainApi";
import { REQUEST_ERRORS } from "../../../utils/config";

function Register({ onRegister }) {
  const TITLE = "Добро пожаловать!";
  const HINT = (
    <p className="auth__hint">
      Уже зарегистрированы?{" "}
      <Link to="/signin" className="auth__hint-link">
        Войти
      </Link>
    </p>
  );
  const BUTTON_TEXT = "Зарегистрироваться";

  const [values, errors, isValid, handleChange] = useForm();

  const [requestError, setRequestError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setRequestError("");
    try {
      await mainApi.register(values);
      const res = await mainApi.login({
        email: values.email,
        password: values.password,
      });
      await onRegister(res);
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
  }

  return (
    <Auth
      title={TITLE}
      hint={HINT}
      buttonText={BUTTON_TEXT}
      isValid={isValid}
      requestError={requestError}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <AuthInputForName
        value={values.name ?? ""}
        error={errors.name}
        onChange={handleChange}
      />
      <AuthInputForEmail
        value={values.email ?? ""}
        error={errors.email}
        onChange={handleChange}
      />
      <AuthInputForPassword
        value={values.password ?? ""}
        error={errors.password}
        onChange={handleChange}
      />
    </Auth>
  );
}

export default Register;
