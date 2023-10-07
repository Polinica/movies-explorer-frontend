import { useState } from "react";

export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
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
