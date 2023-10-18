import AuthInput from "../AuthInput/AuthInput";

function AuthInputForEmail(props) {
  const emailValidationParams = {
    label: "E-mail",
    type: "email",
    name: "email",
    required: true,
    placeholder: "йцукен",
    ...props,
  };

  return <AuthInput {...emailValidationParams} />;
}

export default AuthInputForEmail;
