import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../Auth/Auth";
import AuthInputForEmail from "../AuthInputForEmail/AuthInputForEmail";
import AuthInputForName from "../AuthInputForName/AuthInputForName";
import AuthInputForPassword from "../AuthInputForPassword/AuthInputForPassword";
import { useForm, useFormWithValidation } from "../../../utils/hooks/useForm";

function Register({ handleRegister }) {
  const [message, setMessage] = useState("");

  const [btnDisabled, setBtnDisabled] = useState(true);
  const { values, handleChangeInput, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values);
    //   .catch((e) => setMessage(e.message))
  }

  return (
    <Auth mode="register">
      <AuthInputForName />
      <AuthInputForEmail />
      <AuthInputForPassword />
    </Auth>
  );
}

export default Register;
