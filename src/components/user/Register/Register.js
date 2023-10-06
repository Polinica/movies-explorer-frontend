import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../Auth/Auth";
import AuthInputForEmail from "../AuthInputForEmail/AuthInputForEmail";
import AuthInputForName from "../AuthInputForName/AuthInputForName";
import AuthInputForPassword from "../AuthInputForPassword/AuthInputForPassword";

const TITLE = "Добро пожаловать!";
const HINT_TEXT = "Уже зарегистрированы?";
const HINT_LINK_TEXT = "Войти";
const BUTTON_TEXT = "Зарегистрироваться";

export function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const input = event.target;
    const name = input.name;
    const value = input.type === "checkbox" ? input.checked : input.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());
  }

  return [values, errors, isValid, handleChange];
}

function Register() {
  const [values, errors, isValid, handleChange] = useForm();

  const hint = (
    <p className="auth__hint">
      {HINT_TEXT}{" "}
      <Link to="/signin" className="auth__hint-link">
        {HINT_LINK_TEXT}
      </Link>
    </p>
  );

  return (
    <Auth title={TITLE} hint={hint} buttonText={BUTTON_TEXT} isValid={isValid}>
      <AuthInputForName
        value={values.name}
        error={errors.name}
        onChange={handleChange}
      />
      <AuthInputForEmail
        value={values.email}
        error={errors.email}
        onChange={handleChange}
      />
      <AuthInputForPassword
        value={values.password}
        error={errors.password}
        onChange={handleChange}
      />
    </Auth>
  );
}

export default Register;
