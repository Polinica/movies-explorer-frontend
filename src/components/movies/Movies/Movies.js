import React from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import moviesApi from "../../../utils/MoviesApi";
import mainApi from "../../../utils/MainApi";
import searchMovies from "../../../utils/searchMovies";
import SearchResults from "../SearchResults/SearchResults";
import formatMovies from "../../../utils/formatMovies";

function Movies() {
  // Данные обо всех фильмах из API
  const [allMovies, setAllMovies] = React.useState(null);

  // Сохраненные фильмы
  const [savedMovies, setSavedMovies] = React.useState([]);

  // Значения параметров поиска при загрузке
  const defaultSearchText = localStorage.getItem("searchText") ?? "";
  const defaultAreShortiesSeleted =
    JSON.parse(localStorage.getItem("areShortiesSeleted")) ?? false;
  const defaultFoundMovies =
    JSON.parse(localStorage.getItem("foundMovies")) ?? [];

  // Параметры поиска
  const [searchText, setSearchText] = React.useState(defaultSearchText);
  const [areShortiesSeleted, setAreShortiesSeleted] = React.useState(
    defaultAreShortiesSeleted
  );
  const [foundMovies, setFoundMovies] = React.useState(defaultFoundMovies);

  // Служебные сообщения
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorOnLoading, setIsErrorOnLoading] = React.useState(false);

  // Сохранение параметров поиска в localStorage
  React.useEffect(() => {
    localStorage.setItem("searchText", searchText);
    localStorage.setItem("areShortiesSeleted", areShortiesSeleted);
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
  }, [searchText, areShortiesSeleted, foundMovies]);

  // Поиск фильмов
  React.useEffect(() => {
    if (allMovies) {
      const foundMovies = searchMovies(
        allMovies,
        searchText,
        areShortiesSeleted
      );
      setFoundMovies(foundMovies);
    }
  }, [searchText, areShortiesSeleted, allMovies]);

  // Запрос к API
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

  // Действия формы
  function handleSearchFormSubmit({ searchText, areShortiesSeleted }) {
    // if (!allMovies) {
    //   setIsLoading(true);
    //   await getMovies();
    //   setIsLoading(false);
    // }
    setAreShortiesSeleted(areShortiesSeleted);
    setSearchText(searchText);
    if (!allMovies) getMovies();
  }

  function handleCheckboxChange(value) {
    setAreShortiesSeleted(value);
    if (!allMovies) getMovies();
  }

  // Сохранение фильмов
  function handleCardClick(movie) {
    console.log(savedMovies);
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
    // console.log(savedMovies);
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
      const savedMovie = await mainApi.saveMovie(movie);
      if (savedMovie) {
        setSavedMovies((movies) => [...movies, savedMovie]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
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
          defaultAreShortiesSeleted={areShortiesSeleted}
        />
        {searchText && (
          <SearchResults
            isErrorOnLoading={isErrorOnLoading}
            isLoading={isLoading}
            movies={foundMovies}
            savedMovies={savedMovies}
            onCardClick={handleCardClick}
          />
        )}
        {/* <Preloader /> */}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
