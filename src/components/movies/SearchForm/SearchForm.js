import classNames from "classnames";
import React from "react";
import { SEARCH_PARAMS } from "../../../utils/config";
import useForm from "../../../utils/hooks/useForm";
import Checkbox from "../Checkbox/Checkbox";
import "./SearchForm.css";

function SearchForm({
  onSubmit,
  onCheckboxChange,
  isBlocked,
  defaultSearchText,
  defaultAreShortiesSeleted,
}) {
  const defaultValues = {
    searchText: defaultSearchText,
    areShortiesSeleted: defaultAreShortiesSeleted,
  };
  // const form = React.useRef();

  // eslint-disable-next-line no-unused-vars
  const [values, errors, isValid, handleChange] = useForm(
    defaultValues,
    !!defaultSearchText
  );
  const [errorText, setErrorText] = React.useState("");

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

  React.useEffect(() => {
    if (values.areShortiesSeleted !== defaultAreShortiesSeleted) {
      onCheckboxChange(values.areShortiesSeleted);
    }
  }, [values.areShortiesSeleted, onCheckboxChange, defaultAreShortiesSeleted]);

  React.useEffect(() => {
    if (isValid) {
      setErrorText("");
    }
  }, [isValid]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid) {
      setErrorText(SEARCH_PARAMS.REQUIRED_ERROR);

      return;
    }
    onSubmit(values);
  }
  return (
    <form className="search-form section" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        className={classNames("search-form__input", {
          "search-form__input_invalid": errorText,
        })}
        placeholder={SEARCH_PARAMS.PLACEHOLDER}
        name="searchText"
        required
        value={values.searchText}
        onChange={handleChange}
        disabled={isBlocked}
      />
      <Checkbox
        title={SEARCH_PARAMS.SHORTIES}
        className="search-form__checkbox"
        name="areShortiesSeleted"
        checked={values.areShortiesSeleted}
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
