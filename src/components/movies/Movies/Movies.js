import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import moviesApi from "../../../utils/MoviesApi";
import mainApi from "../../../utils/MainApi";
// import searchMovies from "../../../utils/searchMovies";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../../Preloader/Preloader";
import {
  MOVIE_API,
  formatMovies,
  SEARCH_PARAMS,
} from "../../../utils/apiConfig";

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
  CANT_GET_MOVIES: "Во время запроса произошла ошибка.",
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

// Функция для фильтрации фильмов
function searchMovies(movies, searchText, areMoviesSelected) {
  if (!movies.length) return movies;

  let foundMovies = movies;

  if (areMoviesSelected) {
    foundMovies = foundMovies.filter(
      (movie) => movie.duration <= SEARCH_PARAMS.SHORTIES_MAX_DURATION
    );
  }

  foundMovies = foundMovies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
  );

  return foundMovies;
}

function Movies() {
  const [hasSearchBeenMade, setHasSearchBeenMade] = useState(
    JSON.parse(localStorage.getItem("hasSearchBeenMade")) || false
  );
  const [allMovies, setAllMovies] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);
  const defaultSearchText = localStorage.getItem("searchText") || "";
  const defaultAreMoviesSelected =
    JSON.parse(localStorage.getItem("areMoviesSelected")) || false;
  const defaultFoundMovies =
    JSON.parse(localStorage.getItem("foundMovies")) || [];

  const [searchText, setSearchText] = useState(defaultSearchText);
  const [areMoviesSelected, setAreMoviesSelected] = useState(
    defaultAreMoviesSelected
  );
  const [foundMovies, setFoundMovies] = useState(defaultFoundMovies);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorOnLoading, setIsErrorOnLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("searchText", searchText);
    localStorage.setItem("areMoviesSelected", areMoviesSelected);
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
  }, [searchText, areMoviesSelected, foundMovies]);

  useEffect(() => {
    if (allMovies) {
      const foundMovies = searchMovies(
        allMovies,
        searchText,
        areMoviesSelected
      );
      setFoundMovies(foundMovies);
    }
  }, [searchText, areMoviesSelected, allMovies]);

  async function getMovies() {
    setIsErrorOnLoading(false);
    setIsLoading(true);
    try {
      let movies = await moviesApi.getMovies();
      movies = movies.map(formatMovies);
      setAllMovies(movies);
    } catch {
      setIsErrorOnLoading(true);
    }
    setIsLoading(false);
  }

  function handleSearchFormSubmit({ searchText, areMoviesSelected }) {
    setAreMoviesSelected(areMoviesSelected);
    setSearchText(searchText);
    setHasSearchBeenMade(true);
    localStorage.setItem("searchText", searchText);
    localStorage.setItem(
      "areMoviesSelected",
      JSON.stringify(areMoviesSelected)
    );
    localStorage.setItem("hasSearchBeenMade", JSON.stringify(true));
    if (!allMovies) getMovies();
  }

  function handleCheckboxChange(value) {
    setAreMoviesSelected(value);
  }

  useEffect(() => {
    if (!allMovies) getMovies();
  }, []);

  function handleCardClick(movie) {
    const isSaved = savedMovies.some(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );
    if (isSaved) {
      const savedMovie = savedMovies.find(
        (savedMovie) => savedMovie.movieId === movie.movieId
      );
      deleteSavedMovie(savedMovie);
    } else {
      addSavedMovie(movie);
    }
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

  async function addSavedMovie(movie) {
    try {
      const isSaved = savedMovies.some(
        (savedMovie) => savedMovie.movieId === movie.movieId
      );
      if (!isSaved) {
        const savedMovie = await mainApi.saveMovie(movie);
        if (savedMovie) {
          setSavedMovies((movies) => [...movies, savedMovie]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getSavedMovies();
  }, []);

  async function getSavedMovies() {
    try {
      const movies = await mainApi.getSavedMovies();
      setSavedMovies(movies);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Header />
      <main aria-label="Поиск фильмов">
        <SearchForm
          onSubmit={handleSearchFormSubmit}
          onCheckboxChange={handleCheckboxChange}
          isBlocked={isLoading}
          defaultSearchText={searchText}
          defaultAreMoviesSelected={areMoviesSelected}
        />
        {foundMovies.length > 0 ? (
          <SearchResults
            isErrorOnLoading={isErrorOnLoading}
            isLoading={isLoading}
            movies={foundMovies}
            savedMovies={savedMovies}
            onCardClick={handleCardClick}
          />
        ) : (
          <Message text={ERROR_MSGS.NOT_FOUND} />
        )}
        {/* {isErrorOnLoading && (
          <Message text="Ошибка при загрузке фильмов" isError />
        )}
        {isLoading && <Preloader />} */}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
