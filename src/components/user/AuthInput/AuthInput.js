function AuthInput({ label, error, isDisabled, ...other }) {
  const inputClass = `auth__input ${error ? "auth__input_error" : ""}`;

  return (
    <label className="auth__input-container">
      <span className="auth__label">{label}</span>
      <input className={inputClass} disabled={isDisabled} {...other} />
      {error && <span className="auth__input-err">{error}</span>}
    </label>
  );
}

export default AuthInput;
