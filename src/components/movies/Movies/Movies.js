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

    const regexp = new RegExp(searchText, "i");
    foundMovies = foundMovies.filter((movie) => regexp.test(movie.nameRU));

    return foundMovies;
  }

  // Состояния компонента
  const [allMovies, setAllMovies] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [areShortiesSeleted, setAreShortiesSeleted] = useState(true);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorOnLoading, setIsErrorOnLoading] = useState(false);

  // Обработчик отправки формы поиска
  const handleSearchFormSubmit = async ({ searchText, areShortiesSeleted }) => {
    if (!allMovies) {
      setIsLoading(true);
      await getMovies();
      setIsLoading(false);
    }
    setAreShortiesSeleted(areShortiesSeleted);
    setSearchText(searchText);
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
        {isErrorOnLoading ? (
          <Message
            text="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            isError
          />
        ) : isLoading ? (
          <Preloader />
        ) : foundMovies.length ? (
          <MoviesCardList type="all" movies={foundMovies} />
        ) : allMovies ? (
          <Message text="Ничего не найдено" />
        ) : (
          false
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
