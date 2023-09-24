import React from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Navigation from "../../Navigation/Navigation";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import Preloader from "../../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
// import More from "../More/More";
import "./Movies.css";
import moviesApi from "../../../utils/MoviesApi";
import searchMovies from "../../../utils/searchMovies";
// import Message from "../Message/Message";
import SearchResults from "../SearchResults/SearchResults";

function Movies() {
  // Значения параметров поиска при загрузке
  const defaultSearchText = localStorage.getItem("searchText") ?? "";
  const defaultAreShortiesSeleted =
    JSON.parse(localStorage.getItem("areShortiesSeleted")) ?? true;
  const defaultFoundMovies =
    JSON.parse(localStorage.getItem("foundMovies")) ?? [];

  // Параметры поиска
  const [searchText, setSearchText] = React.useState(defaultSearchText);
  const [areShortiesSeleted, setAreShortiesSeleted] = React.useState(
    defaultAreShortiesSeleted
  );
  const [foundMovies, setFoundMovies] = React.useState(defaultFoundMovies);

  // Данные обо всех фильмах из API
  const [allMovies, setAllMovies] = React.useState(null);

  // Сохраненные фильмы
  const [savedMovies, setSavedMovies] = React.useState([]);

  // Служебные сообщения

  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorOnLoading, setIsErrorOnLoading] = React.useState(false);

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

  // Сохранение параметров поиска в localStorage
  React.useEffect(() => {
    localStorage.setItem("searchText", searchText);
    localStorage.setItem("areShortiesSeleted", areShortiesSeleted);
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
  }, [searchText, areShortiesSeleted, foundMovies]);

  // Запрос к API
  async function getMovies() {
    setIsErrorOnLoading(false);
    setIsLoading(true);
    try {
      const movies = await moviesApi.getMovies();
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
