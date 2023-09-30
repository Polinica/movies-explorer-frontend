import AuthInput from '../AuthInput/AuthInput';

function AuthInputForPassword({ ...validationParams }) {
  return (
    <AuthInput
      label="Пароль"
      type="password"
      name="password"
      required={true}
      placeholder="qwerty"
      {...validationParams}
    />
  );
}

export default AuthInputForPassword;
