import AuthInput from '../AuthInput/AuthInput';

function AuthInputForEmail({ ...validationParams }) {
  return (
    <AuthInput
      label="E-mail"
      type="email"
      name="email"
      required={true}
      placeholder="mail@gmail.com"
      {...validationParams}
    />
  );
}

export default AuthInputForEmail;
