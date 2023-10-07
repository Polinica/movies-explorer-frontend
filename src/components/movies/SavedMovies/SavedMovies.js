import React from "react";
import mainApi from "../../../utils/MainApi";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Navigation from "../../Navigation/Navigation";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import { SEARCH_PARAMS } from "../../../utils/apiConfig";
import Preloader from "../../Preloader/Preloader";

function searchMovies(movies, searchText, areMoviesSelected) {
  if (!movies.length) return movies;

  let foundMovies = movies;

  if (!areMoviesSelected) {
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

function Message({ text, isError = false }) {
  return (
    <div className="message section">
      <p
        className={`message__text ${isError ? "message__text_type_error" : ""}`}
      >
        {text}
      </p>
    </div>
  );
}

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

function SavedMovies() {
  // Сохраненные фильмы
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorOnLoading, setIsErrorOnLoading] = React.useState(false);

  const [foundMovies, setFoundMovies] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [areMoviesSelected, setAreMoviesSelected] = React.useState(true);

  React.useEffect(() => {
    getSavedMovies();
  }, []);

  async function getSavedMovies() {
    setIsErrorOnLoading(false);
    setIsLoading(true);

    try {
      const movies = await mainApi.getSavedMovies();
      setSavedMovies(movies);
      setFoundMovies(movies);
    } catch (err) {
      console.error(err);
      setIsErrorOnLoading(true);
    }
    setIsLoading(false);
  }

  function handleSearchFormSubmit({ searchText, areMoviesSelected }) {
    setAreMoviesSelected(areMoviesSelected);
    setSearchText(searchText);
  }

  function handleCheckboxChange(value) {
    setAreMoviesSelected(value);
  }

  React.useEffect(() => {
    if (savedMovies) {
      const foundMovies = searchMovies(
        savedMovies,
        searchText,
        areMoviesSelected
      );
      setFoundMovies(foundMovies);
    }
  }, [searchText, areMoviesSelected, savedMovies]);

  // Сохранение фильмов
  async function handleCardClick(movie) {
    const savedMovie = savedMovies.find(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );
    await deleteSavedMovie(savedMovie);
  }

  async function deleteSavedMovie(movie) {
    try {
      await mainApi.deleteMovie(movie._id);

      setSavedMovies((movies) =>
        movies.filter((savedMovie) => savedMovie._id !== movie._id)
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Header />
      <main>
        <SearchForm
          onSubmit={handleSearchFormSubmit}
          onCheckboxChange={handleCheckboxChange}
          isBlocked={isLoading}
          defaultSearchText={searchText}
          defaultAreMoviesSelected={areMoviesSelected}
        />
        <SearchResults
          isErrorOnLoading={isErrorOnLoading}
          isLoading={isLoading}
          movies={foundMovies}
          savedMovies={savedMovies}
          onCardClick={handleCardClick}
          isSavedMoviesSearchResult
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
