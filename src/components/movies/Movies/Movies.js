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
  // const handleSearchFormSubmit = async ({ searchText, areShortiesSeleted }) => {
  //   // if (!allMovies) {
  //   setIsLoading(true);
  //   await getMovies();
  //   setIsLoading(false);
  //   //}
  //   setAreShortiesSeleted(areShortiesSeleted);
  //   setSearchText(searchText);
  //   if (!allMovies) getMovies();

  //   // Сохраните параметры в localStorage
  //   saveToLocalStorage();
  // };
  const handleSearchFormSubmit = async ({ searchText, areShortiesSeleted }) => {
    setIsLoading(true);
    if (!allMovies) {
      await getMovies();
    }
    setIsLoading(false);

    setAreShortiesSeleted(areShortiesSeleted);
    setSearchText(searchText);

    // Сохраните параметры в localStorage
    saveToLocalStorage();
  };

  // Обработчик изменения состояния чекбокса
  const handleCheckboxChange = (value) => {
    setAreShortiesSeleted(value);
    if (!allMovies) getMovies();
  };

  // Получение фильмов
  async function getMovies() {
    setIsErrorOnLoading(false);
    setIsLoading(true);
    try {
      const movies = await moviesApi.getMovies();
      setAllMovies(movies);
    } catch (error) {
      console.error("Ошибка при загрузке фильмов:", error);
      setIsErrorOnLoading(true);
    }
    setIsLoading(false);
  }

  //В функции getMovies(), после получения фильмов с
  //помощью moviesApi.getMovies(), вы можете устанавливать
  //фильмы в зависимости от текущих настроек (флажка "areShortiesSeleted"):

  // async function getMovies() {
  //   setIsErrorOnLoading(false);
  //   setIsLoading(true);
  //   try {
  //     let movies;
  //     if (areShortiesSeleted) {
  //       // Здесь делайте запрос для короткометражных фильмов
  //       movies = await moviesApi.getShortMovies();
  //     } else {
  //       // Здесь делайте запрос для всех фильмов
  //       movies = await moviesApi.getMovies();
  //     }
  //     setAllMovies(movies);
  //   } catch (error) {
  //     console.error("Ошибка при загрузке фильмов:", error);
  //     setIsErrorOnLoading(true);
  //   }
  //   setIsLoading(false);
  // }

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

  function SearchResults({
    isErrorOnLoading,
    isLoading,
    movies,
    savedMovies,
    onCardClick,
    isSavedMoviesSearchResult = false,
  }) {
    return isErrorOnLoading ? (
      <Message text={ERROR_MSGS.CANT_GET_MOVIES} isError />
    ) : isLoading ? (
      <Preloader />
    ) : movies.length === 0 ? (
      <Message text={ERROR_MSGS.NOT_FOUND} />
    ) : (
      <MoviesCardList
        movies={movies}
        savedMovies={savedMovies}
        onCardClick={onCardClick}
        isSavedMoviesCardList={isSavedMoviesSearchResult}
      />
    );
  }

  // Сохраненные фильмы
  const [savedMovies, setSavedMovies] = useState([]);

  // Сохранение фильмов
  function handleCardClick(movieId) {
    const isSaved = savedMovies.some((savedMovie) => savedMovie.id === movieId);
    if (isSaved) {
      deleteSavedMovie(movieId);
    } else {
      addSavedMovie(movieId);
    }
    console.log(savedMovies);
  }

  function deleteSavedMovie(movieId) {
    setSavedMovies((movies) => movies.filter((movie) => movie.id !== movieId));
  }

  function addSavedMovie(movieId) {
    setSavedMovies((movies) => [
      ...movies,
      allMovies.find((movie) => movie.id === movieId),
    ]);
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
            savedMovies={savedMovies}
            onCardClick={handleCardClick}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
