import { useState, useEffect, useRef } from "react";

import Checkbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import useForm from "../../../utils/hooks/useFormValidation";

function SearchForm({
  onSubmit,
  onCheckboxChange,
  isBlocked,
  defaultSearchText,
  defaultAreMoviesSelected,
}) {
  const defaultValues = {
    searchText: defaultSearchText,
    areMoviesSelected: defaultAreMoviesSelected,
  };

  // eslint-disable-next-line no-unused-vars
  const [values, errors, isValid, handleChange] = useForm(defaultValues);

  // const DEFAULT_VALUES = { searchText: "", showShorties: true };
  // const form = useRef();
  // const [inputValues, setInputValues] = useState(defaultValues);
  // const [isValid, setIsValid] = useState(false);
  // const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorText, setErrorText] = useState("");

  //Функция handleChange обрабатывает изменения в полях формы и обновляет состояние inputValues.
  // function handleChange(event) {
  //   const input = event.target;
  //   const name = input.name;
  //   let value;
  //   if (input.type === "checkbox") {
  //     value = input.checked;
  //     onCheckboxChange(value);
  //   } else {
  //     value = input.value;
  //   }
  //   setInputValues((state) => ({ ...state, [name]: value }));
  //   validateForm();
  // }

  // function validateForm() {
  //   setIsValid(form.current.checkValidity());
  // }

  useEffect(() => {
    if (values.areMoviesSelected !== defaultAreMoviesSelected) {
      onCheckboxChange(values.areMoviesSelected);
    }
  }, [values.areMoviesSelected, onCheckboxChange, defaultAreMoviesSelected]);

  useEffect(() => {
    if (isValid) {
      setErrorText("");
    }
  }, [isValid]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid) {
      setErrorText("Нужно ввести ключевое слово");
      return;
    }
    onSubmit(values);
  }
  return (
    //Возвращается JSX - форма с инпутом для текста поиска,
    //компонент Checkbox для выбора короткометражек, иконкой
    //ошибки (если есть ошибка) и кнопкой "Найти".
    <form className="search-form section" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        className={`search-form__input ${
          errorText ? "search-form__input_invalid" : ""
        }`}
        placeholder="Фильм"
        name="searchText"
        required
        value={values.searchText}
        onChange={handleChange}
        disabled={isBlocked}
      />
      <Checkbox
        title="Короткометражки"
        className="search-form__checkbox"
        name="areMoviesSelected"
        checked={values.areMoviesSelected}
        onChange={handleChange}
        disabled={isBlocked}
      />
      <span className="search-form__error">{errorText}</span>
      <button
        type="submit"
        className="search-form__button"
        disabled={isBlocked}
      ></button>
    </form>
  );
}

export default SearchForm;
