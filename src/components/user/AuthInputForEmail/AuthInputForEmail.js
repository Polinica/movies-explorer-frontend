import AuthInput from "../AuthInput/AuthInput";

function AuthInputForEmail({ ...validationParams }) {
  return (
    <AuthInput
      label="E-mail"
      type="email"
      name="email"
      required={true}
      placeholder="dl@dl.com"
      {...validationParams}
    />
  );
}

export default AuthInputForEmail;
