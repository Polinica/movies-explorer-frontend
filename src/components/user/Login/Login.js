import { Link } from "react-router-dom";
import Auth from "../../Auth/Auth";
import AuthInputForEmail from "../AuthInputForEmail/AuthInputForEmail";
import AuthInputForPassword from "../AuthInputForPassword/AuthInputForPassword";
import useForm from "../../../utils/hooks/useFormValidation";

// Константы для текста и заголовков
const TITLE = "Рады видеть!";
const HINT_TEXT = "Ещё не зарегистрированы?";
const HINT_LINK_TEXT = "Регистрация";
const BUTTON_TEXT = "Войти";

function Login() {
  // Использование хука useForm
  const [values, errors, isValid, handleChange] = useForm();

  const hint = (
    <p className="auth__hint">
      {HINT_TEXT}{" "}
      <Link to="/signup" className="auth__hint-link">
        {HINT_LINK_TEXT}
      </Link>
    </p>
  );

  return (
    <Auth title={TITLE} hint={hint} buttonText={BUTTON_TEXT} isValid={isValid}>
      {/* Вставка компонентов с использованием хука useForm */}
      <AuthInputForEmail
        value={values.email}
        error={errors.email}
        onChange={handleChange}
      />
      <AuthInputForPassword
        value={values.password}
        error={errors.password}
        onChange={handleChange}
      />
    </Auth>
  );
}

export default Login;
