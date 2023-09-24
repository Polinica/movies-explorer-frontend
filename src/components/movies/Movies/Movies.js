import React from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Navigation from "../../Navigation/Navigation";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
// import More from "../More/More";
import "./Movies.css";
import moviesApi from "../../../utils/MoviesApi";
import searchMovies from "../../../utils/searchMovies";
import Message from "../Message/Message";

function Movies() {
  const [allMovies, setAllMovies] = React.useState(null);

  const [searchText, setSearchText] = React.useState("");
  const [areShortiesSeleted, setAreShortiesSeleted] = React.useState(true);
  const [foundMovies, setFoundMovies] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorOnLoading, setIsErrorOnLoading] = React.useState(false);

  async function handleSearchFormSubmit({ searchText, areShortiesSeleted }) {
    if (!allMovies) {
      setIsLoading(true);
      await getMovies();
      setIsLoading(false);
    }
    setAreShortiesSeleted(areShortiesSeleted);
    setSearchText(searchText);
  }
  function handleCheckboxChange(value) {
    setAreShortiesSeleted(value);
  }

  async function getMovies() {
    setIsErrorOnLoading(false);
    try {
      const movies = await moviesApi.getMovies();
      setAllMovies(movies);
    } catch {
      setIsErrorOnLoading(true);
    }
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
        {isErrorOnLoading ? (
          <Message
            text="Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз"
            isError
          />
        ) : isLoading ? (
          <Preloader />
        ) : foundMovies.length ? (
          <MoviesCardList type="all" movies={foundMovies} />
        ) : allMovies ? (
          <Message text="Ничего не&nbsp;найдено" />
        ) : (
          false
        )}

        {/* <More /> */}
        <Preloader />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
