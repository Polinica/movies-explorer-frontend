import React from "react";
import { useState, useCallback } from "react";
import isEmail from "validator/lib/isEmail";

//хук управления формой
export function useForm() {
  const [values, setValues] = useState({});

  const handleChangeInput = (e) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { values, handleChangeInput, setValues };
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    if (name === "name" && event.target.validity.patternMismatch) {
      event.target.setCustomValidity(
        "Имя должно содержать только латиницу, кириллицу, пробел или дефис."
      );
    } else if (name === "email" && !isEmail(value)) {
      event.target.setCustomValidity("Некорректый адрес почты.");
    } else {
      event.target.setCustomValidity("");
    }

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: event.target.validationMessage,
    }));
    setIsValid(event.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [] // Убраны лишние зависимости
  );

  return { values, handleChangeInput, errors, isValid, resetForm };
}
