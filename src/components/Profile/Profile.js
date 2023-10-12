import classNames from "classnames";
import React, { useState, useContext, useEffect } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import CurrentUserContext from "../../context/CurrentUserContext";
import useForm from "../../utils/hooks/useFormValidation";
import { REQUEST_ERRORS } from "../../utils/apiConfig";
import mainApi from "../../utils/MainApi";
import SubmitButton from "../user/SubmitButton/SubmitButton";

function Profile({ onLogout, onUpdate }) {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const [values, errors, isValid, handleChange] = useForm(currentUser);

  const [requestError, setRequestError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [areSameValues, setAreSameValues] = useState(true);

  const [isSuccessful, setIsSuccessful] = useState(false);

  function switchEditMode() {
    setIsInEditMode((state) => !state);
  }

  useEffect(() => {
    if (
      values.name === currentUser.name &&
      values.email === currentUser.email
    ) {
      setAreSameValues(true);
      return;
    }
    setAreSameValues(false);
  }, [values, currentUser]);

  function showSuccessMessage() {
    setIsSuccessful(true);
    setTimeout(() => setIsSuccessful(false), 2000);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setRequestError("");
    setIsSuccessful(false);
    try {
      const res = await mainApi.updateUserInfo(values);
      onUpdate(res);
      switchEditMode();
      showSuccessMessage();
    } catch (err) {
      console.log(err);
      let message;
      switch (err.message) {
        case "409":
          message = REQUEST_ERRORS.UPDATE_409;
          break;
        default:
          message = REQUEST_ERRORS.UPDATE_DEFAULT;
      }
      setRequestError(message);
    }
    setIsLoading(false);
  }

  const nameToDisplay = isInEditMode
    ? values.name
    : currentUser?.name ?? "Виталий";

  return (
    <>
      <Header />
      <main className="profile content__stretched-element">
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${nameToDisplay}!`}</h1>
          <p className="profile__save-message">
            {isSuccessful && "Профиль успешно сохранен!"}
          </p>
          <form className="profile__form" noValidate onSubmit={handleSubmit}>
            <label className="profile__input-container">
              <span className="profile__input-label">Имя</span>
              <input
                type="text"
                className={classNames("profile__input", {
                  profile__input_type_error: errors.name,
                })}
                name="name"
                minLength="2"
                maxLength="30"
                required={true}
                // value={nameToDisplay}
                value={values.name ?? ""}
                onChange={handleChange}
                disabled={isLoading}
                {...(!isInEditMode ? { disabled: true } : {})}
              />
            </label>
            <label className="profile__input-container">
              <span className="profile__input-label">E-mail</span>
              <input
                type="email"
                className={classNames("profile__input", {
                  profile__input_type_error: errors.email,
                })}
                name="email"
                required={true}
                value={values.email ?? ""}
                onChange={handleChange}
                disabled={isLoading}
                {...(!isInEditMode ? { disabled: true } : {})}
              />
            </label>

            {isInEditMode && (
              <>
                <p className="profile__error-message">{requestError}</p>
                <SubmitButton
                  title="Сохранить"
                  isDisabled={!isValid || areSameValues}
                  isLoading={isLoading}
                />
              </>
            )}
          </form>

          {!isInEditMode && (
            <ul className="profile__links">
              <li className="profile__links-item">
                <button className="profile__link" onClick={switchEditMode}>
                  Редактировать
                </button>
              </li>
              <li className="profile__links-item">
                <button
                  className="profile__link profile__link_type_logout"
                  onClick={onLogout}
                >
                  Выйти из аккаунта
                </button>
              </li>
            </ul>
          )}
        </div>
      </main>
    </>
  );
}

export default Profile;
