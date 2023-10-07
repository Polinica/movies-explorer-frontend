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
import { MOVIE_API } from "../../../utils/apiConfig";
import mainApi from "../../../utils/MainApi";

function Movies() {
  // Функция для фильтрации фильмов
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

  // Состояния компонента
  const [allMovies, setAllMovies] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [areMoviesSelected, setAreMoviesSelected] = useState(true);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorOnLoading, setIsErrorOnLoading] = useState(false);

  // обрабатывает отправку формы поиска и вызывает функцию
  // const handleSearchFormSubmit = async ({ searchText, areMoviesSelected }) => {
  //   // if (!allMovies) {
  //   setIsLoading(true);
  //   await getMovies();
  //   setIsLoading(false);
  //   //}
  //   setAreMoviesSelected(areMoviesSelected);
  //   setSearchText(searchText);
  //   if (!allMovies) getMovies();

  //   // Сохраните параметры в localStorage
  //   saveToLocalStorage();
  // };
  const handleSearchFormSubmit = async ({ searchText, areMoviesSelected }) => {
    setIsLoading(true);
    if (!allMovies) {
      await getMovies();
    }
    setIsLoading(false);

    setAreMoviesSelected(areMoviesSelected);
    setSearchText(searchText);

    // Сохраните параметры в localStorage
    saveToLocalStorage();
  };

  // Обработчик изменения состояния чекбокса
  const handleCheckboxChange = (value) => {
    setAreMoviesSelected(value);
    if (!allMovies) getMovies();
  };

  // Получение фильмов
  async function getMovies() {
    setIsErrorOnLoading(false);
    setIsLoading(true);
    try {
      let movies = await moviesApi.getMovies();
      movies = movies.map(formatMovieData);
      setAllMovies(movies);
    } catch (error) {
      console.error("Ошибка при загрузке фильмов:", error);
      setIsErrorOnLoading(true);
    }
    setIsLoading(false);
  }

  //В функции getMovies(), после получения фильмов с
  //помощью moviesApi.getMovies(), вы можете устанавливать
  //фильмы в зависимости от текущих настроек (флажка "areMoviesSelected"):

  // async function getMovies() {
  //   setIsErrorOnLoading(false);
  //   setIsLoading(true);
  //   try {
  //     let movies;
  //     if (areMoviesSelected) {
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
        areMoviesSelected
      );
      setFoundMovies(foundMovies);
    }
  }, [searchText, areMoviesSelected, allMovies]);

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
    localStorage.setItem("areMoviesSelected", areMoviesSelected);
  }

  // Функция для загрузки параметров из localStorage
  function loadFromLocalStorage() {
    const savedSearchText = localStorage.getItem("searchText");
    const savedAreMoviesSelected = localStorage.getItem("areMoviesSelected");

    if (savedSearchText) {
      setSearchText(savedSearchText);
    }

    if (savedAreMoviesSelected) {
      setAreMoviesSelected(savedAreMoviesSelected === "true");
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
  async function handleCardClick(movie) {
    console.log(savedMovies);
    const isSaved = savedMovies.some(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );
    if (isSaved) {
      const savedMovie = savedMovies.find(
        (savedMovie) => savedMovie.movieId === movie.movieId
      );
      await deleteSavedMovie(savedMovie);
    } else {
      await addSavedMovie(movie);
    }
    // console.log(savedMovies);
  }

  async function deleteSavedMovie(movie) {
    try {
      await mainApi.deleteMovie(movie._id);
      setSavedMovies((movies) =>
        movies.filter((savedMovie) => savedMovie.id !== movie._id)
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

  function formatMovieData(movie) {
    return {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: MOVIE_API.MEDIA_BASE_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: MOVIE_API.MEDIA_BASE_URL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };
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
          defaultAreShortiesSelected={areMoviesSelected}
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
