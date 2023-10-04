import { useState, useEffect, useRef } from "react";

import Checkbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

//Компонент принимает входным параметром функцию onSubmit,
//которая будет вызвана при отправке формы.
function SearchForm({ onSubmit }) {
  //Внутри компонента определены константы DEFAULT_VALUES,
  //которая содержит значения по умолчанию для полей формы, и два состояния - inputValues и errorText.
  const DEFAULT_VALUES = { searchText: "", showShorties: true };
  const form = useRef();
  const [inputValues, setInputValues] = useState(DEFAULT_VALUES);
  const [isValid, setIsValid] = useState(false);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorText, setErrorText] = useState("");
  //Функция handleChange обрабатывает изменения в полях формы и обновляет состояние inputValues.
  function handleChange(event) {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setInputValues((state) => ({ ...state, [name]: value }));
    validateForm();
  }

  function validateForm() {
    setIsValid(form.current.checkValidity());
  }

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
        value={inputValues.search}
        onChange={handleChange}
      />
      <Checkbox
        title="Короткометражки"
        className="search-form__checkbox"
        name="showShorties"
        checked={inputValues.showShorties}
        onChange={handleChange}
      />
      <span className="search-form__error">{isErrorShown && errorText}</span>
      <button type="submit" className="search-form__button"></button>
    </form>
  );
}

export default SearchForm;
