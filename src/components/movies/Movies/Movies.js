import { useState, useEffect } from "react";
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
  const SHORTIES_MAX_DURATION = 40;

  const [movies, setMovies] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [areShortiesSelected, setAreShortiesSelected] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movies.length) {
      setIsLoading(true);
      getMovies().finally(() => setIsLoading(false));
    }
  }, [movies.length]);

  const handleSearchSubmit = ({ searchText, areShortiesSelected }) => {
    setSearchText(searchText);
    setAreShortiesSelected(areShortiesSelected);
  };

  const handleCheckboxChange = (value) => {
    setAreShortiesSelected(value);
  };

  const getMovies = async () => {
    try {
      const movies = await moviesApi.getMovies();
      setMovies(movies);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    let filtered = [...movies];

    if (!areShortiesSelected) {
      filtered = filtered.filter(
        (movie) => movie.duration > SHORTIES_MAX_DURATION
      );
    }

    const regex = new RegExp(searchText, "i");
    filtered = filtered.filter((movie) => regex.test(movie.nameRU));

    setFilteredMovies(filtered);
  }, [movies, searchText, areShortiesSelected]);

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <main>
        <SearchForm
          onSubmit={handleSearchSubmit}
          onCheckboxChange={handleCheckboxChange}
          isBlocked={isLoading}
          defaultSearchText={searchText}
          defaultAreShortiesSelected={areShortiesSelected}
        />
        <MoviesCardList type="all" movies={filteredMovies} />
        <More />
        <Preloader />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
