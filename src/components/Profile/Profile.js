import React, { useState, useContext } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import CurrentUserContext from "../../context/CurrentUserContext";
import useForm from "../../utils/hooks/useFormValidation";

function Profile({ onLogout }) {
  const [isInEditMode, setIsInEditMode] = useState(true);
  const currentUser = useContext(CurrentUserContext);

  const [values, errors, isValid, handleChange] = useForm();

  function switchEditMode(evt) {
    evt.preventDefault();
    setIsInEditMode((state) => !state);
  }

  const nameToDisplay = isInEditMode
    ? values.name
    : currentUser?.name ?? "Виталий";
  const emailToDisplay = isInEditMode ? values.email : currentUser?.email ?? "";

  return (
    <>
      <Header />
      <main className="profile content__stretched-element">
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${nameToDisplay}!`}</h1>
          <form className="profile__form">
            <label className="profile__input-container">
              <span className="profile__input-label">Имя</span>
              <input
                type="text"
                className="profile__input"
                name="name"
                minLength="2"
                maxLength="30"
                required={true}
                value={nameToDisplay}
                onChange={handleChange}
                {...(!isInEditMode ? { disabled: true } : {})}
              />
            </label>
            <label className="profile__input-container">
              <span className="profile__input-label">E-mail</span>
              <input
                type="email"
                className="profile__input"
                name="email"
                required={true}
                value={emailToDisplay}
                onChange={handleChange}
                {...(!isInEditMode ? { disabled: true } : {})}
              />
            </label>

            {isInEditMode && (
              <>
                <p className="profile__error-message">
                  При обновлении профиля произошла ошибка.
                </p>
                <button
                  className="input__submit-button"
                  onClick={switchEditMode}
                  type="submit"
                >
                  Сохранить
                </button>
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
