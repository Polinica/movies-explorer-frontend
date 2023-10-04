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

  const [allMovies, setAllMovies] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [areShortiesSeleted, setAreShortiesSeleted] = useState(true);
  const [foundMovies, setFoundMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSearchFormSubmit = async ({ searchText, areShortiesSeleted }) => {
    if (!allMovies) {
      setIsLoading(true);
      await getMovies();
      setIsLoading(false);
    }
    setAreShortiesSeleted(areShortiesSeleted);
    setSearchText(searchText);
  };

  const handleCheckboxChange = (value) => {
    setAreShortiesSeleted(value);
  };

  const getMovies = async () => {
    const movies = await moviesApi.getMovies();
    setAllMovies(movies);
  };

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

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <main>
        <SearchForm
          onSubmit={handleSearchFormSubmit}
          onCheckboxChange={handleCheckboxChange}
          isBlocked={isLoading}
          defaultSearchText={searchText}
          defaultAreShortiesSelected={areShortiesSeleted}
        />
        <MoviesCardList type="all" movies={foundMovies} />
        <More />
        <Preloader />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
