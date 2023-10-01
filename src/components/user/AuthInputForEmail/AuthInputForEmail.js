import { PLACEHOLDERS } from "../../../utils/config";
import AuthInput from "../AuthInput/AuthInput";

function AuthInputForEmail({ ...validationParams }) {
  return (
    <AuthInput
      label="E-mail"
      type="email"
      name="email"
      required={true}
      pattern="[A-Za-zА-Яа-яЁё\s-]+"
      placeholder={PLACEHOLDERS.EMAIL}
      {...validationParams}
    />
  );
}

export default AuthInputForEmail;
