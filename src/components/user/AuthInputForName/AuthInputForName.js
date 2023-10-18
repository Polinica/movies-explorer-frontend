import AuthInput from "../AuthInput/AuthInput";

function AuthInputForName(props) {
  const nameValidationParams = {
    label: "Имя",
    type: "text",
    name: "name",
    required: true,
    minLength: "2",
    maxLength: "30",
    placeholder: "йцукен",
    ...props,
  };

  return <AuthInput {...nameValidationParams} />;
}

export default AuthInputForName;
