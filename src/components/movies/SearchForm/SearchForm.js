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
  const [errorText, setErrorText] = useState("");

  // Функция useEffect вызывается, когда меняется состояние areMoviesSelected.
  // Если это произошло, то вызывается переданная в props функция onCheckboxChange.
  useEffect(() => {
    if (values.areMoviesSelected !== defaultAreMoviesSelected) {
      onCheckboxChange(values.areMoviesSelected);
    }
  }, [values.areMoviesSelected, onCheckboxChange, defaultAreMoviesSelected]);

  // Функция useEffect вызывается, когда изменяется состояние валидации.
  // Если значения валидны, то текст ошибки очищается.
  useEffect(() => {
    if (isValid) {
      setErrorText("");
    }
  }, [isValid]);

  // Функция handleSubmit вызывается при нажатии кнопки отправки формы.
  // Если данные не прошли проверку, то устанавливается текст ошибки.
  // В противном случае вызывается переданный в props обработчик onSubmit.
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
