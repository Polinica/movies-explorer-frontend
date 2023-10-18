import AuthInput from "../AuthInput/AuthInput";

function AuthInputForPassword(props) {
  const passwordValidationParams = {
    label: "Пароль",
    type: "password",
    name: "password",
    required: true,
    placeholder: "йцукен",
    ...props,
  };

  return <AuthInput {...passwordValidationParams} />;
}

export default AuthInputForPassword;
