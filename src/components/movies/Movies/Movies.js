import { useState, useEffect } from "react";
import { SEARCH_PARAMS } from "../../../utils/apiConfig";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Navigation from "../../Navigation/Navigation";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import More from "../More/More";
import "./Movies.css";
import moviesApi from "../../../utils/MoviesApi";

function Movies() {
  // Функция для фильтрации фильмов
  function searchMovies(movies, searchText, areShortiesSeleted) {
    if (!movies.length) return movies;

    let foundMovies = movies;

    if (!areShortiesSeleted) {
      foundMovies = foundMovies.filter(
        (movie) => movie.duration > SEARCH_PARAMS.SHORTIES_MAX_DURATION
      );
    }

    // Приводим текст поиска и названия фильмов к нижнему регистру
    const searchTextLower = searchText.toLowerCase();

    // Фильтруем фильмы
    foundMovies = foundMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchTextLower)
    );

    return foundMovies;
  }

  // Состояния компонента
  const [allMovies, setAllMovies] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [areShortiesSeleted, setAreShortiesSeleted] = useState(true);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorOnLoading, setIsErrorOnLoading] = useState(false);

  // обрабатывает отправку формы поиска и вызывает функцию
  const handleSearchFormSubmit = async ({ searchText, areShortiesSeleted }) => {
    if (!allMovies) {
      setIsLoading(true);
      await getMovies();
      setIsLoading(false);
    }
    setAreShortiesSeleted(areShortiesSeleted);
    setSearchText(searchText);

    // Сохраните параметры в localStorage
    saveToLocalStorage();
  };

  // Обработчик изменения состояния чекбокса
  const handleCheckboxChange = (value) => {
    setAreShortiesSeleted(value);
  };

  // Получение фильмов
  async function getMovies() {
    setIsErrorOnLoading(false);
    try {
      const movies = await moviesApi.getMovies();
      setAllMovies(movies);
    } catch (error) {
      console.error("Ошибка при загрузке фильмов:", error);
      setIsErrorOnLoading(true);
    }
  }

  // Эффект для поиска фильмов при изменении состояния
  useEffect(() => {
    if (allMovies) {
      const foundMovies = searchMovies(
        allMovies,
        searchText,
        areShortiesSeleted
      );
      setFoundMovies(foundMovies);
    }
  }, [searchText, areShortiesSeleted, allMovies]);

  function Message({ text, isError = false }) {
    return (
      <div className="message section">
        <p
          className={`message__text ${
            isError ? "message__text_type_error" : ""
          }`}
        >
          {text}
        </p>
      </div>
    );
  }

  // Функция для сохранения параметров в localStorage
  function saveToLocalStorage() {
    localStorage.setItem("searchText", searchText);
    localStorage.setItem("areShortiesSeleted", areShortiesSeleted);
  }

  // Функция для загрузки параметров из localStorage
  function loadFromLocalStorage() {
    const savedSearchText = localStorage.getItem("searchText");
    const savedAreShortiesSeleted = localStorage.getItem("areShortiesSeleted");

    if (savedSearchText) {
      setSearchText(savedSearchText);
    }

    if (savedAreShortiesSeleted) {
      setAreShortiesSeleted(savedAreShortiesSeleted === "true");
    }
  }

  // Вызывайте функцию loadFromLocalStorage при монтировании компонента
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const ERROR_MSGS = {
    NOT_FOUND: "Ничего не найдено",
    CANT_GET_MOVIES:
      "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
  };

  function SearchResults({ isErrorOnLoading, isLoading, movies }) {
    return isErrorOnLoading ? (
      <Message text={ERROR_MSGS.CANT_GET_MOVIES} isError />
    ) : isLoading ? (
      <Preloader />
    ) : movies.length === 0 ? (
      <Message text={ERROR_MSGS.NOT_FOUND} />
    ) : (
      <MoviesCardList type="all" movies={movies} />
    );
  }

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <main aria-label="Поиск фильмов">
        <SearchForm
          onSubmit={handleSearchFormSubmit}
          onCheckboxChange={handleCheckboxChange}
          isBlocked={isLoading}
          defaultSearchText={searchText}
          defaultAreShortiesSelected={areShortiesSeleted}
        />
        {/* <MoviesCardList type="all" movies={foundMovies} /> */}
        {/* <More /> */}
        {searchText && (
          <SearchResults
            isErrorOnLoading={isErrorOnLoading}
            isLoading={isLoading}
            movies={foundMovies}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
