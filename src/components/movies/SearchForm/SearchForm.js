import { useState, useEffect, useRef } from "react";

import Checkbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({
  onSubmit,
  onCheckboxChange,
  isBlocked,
  defaultSearchText,
  defaultAreShorties,
}) {
  const defaultValues = {
    searchText: defaultSearchText,
    showShorties: defaultAreShorties,
  };
  // const DEFAULT_VALUES = { searchText: "", showShorties: true };
  const form = useRef();
  const [inputValues, setInputValues] = useState(defaultValues);
  const [isValid, setIsValid] = useState(true);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorText, setErrorText] = useState("");
  //Функция handleChange обрабатывает изменения в полях формы и обновляет состояние inputValues.
  function handleChange(event) {
    const input = event.target;
    const name = input.name;
    let value;
    if (input.type === "checkbox") {
      value = input.checked;
      onCheckboxChange(value);
    } else {
      value = input.value;
    }
    setInputValues((state) => ({ ...state, [name]: value }));
    validateForm();
  }

  function validateForm() {
    setIsValid(form.current.checkValidity());
  }

  useEffect(() => {
    validateForm();
  }, []);

  useEffect(() => {
    if (isValid) {
      setIsErrorShown(false);
    }
  }, [isValid]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid) {
      setErrorText("Нужно ввести ключевое слово");
      setIsErrorShown(true);
      return;
    }
    onSubmit(inputValues);
  }
  return (
    //Возвращается JSX - форма с инпутом для текста поиска,
    //компонент Checkbox для выбора короткометражек, иконкой
    //ошибки (если есть ошибка) и кнопкой "Найти".
    <form
      className="search-form section"
      onSubmit={handleSubmit}
      noValidate
      ref={form}
    >
      <input
        type="text"
        className={`search-form__input ${
          isErrorShown ? "search-form__input_invalid" : ""
        }`}
        placeholder="Фильм"
        name="searchText"
        required
        value={inputValues.searchText}
        onChange={handleChange}
        disabled={isBlocked}
      />
      <Checkbox
        title="Короткометражки"
        className="search-form__checkbox"
        name="showShorties"
        checked={inputValues.showShorties}
        onChange={handleChange}
        disabled={isBlocked}
      />
      <span className="search-form__error">{isErrorShown && errorText}</span>
      <button
        type="submit"
        className="search-form__button"
        disabled={isBlocked}
      ></button>
    </form>
  );
}

export default SearchForm;
