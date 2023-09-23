import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import moviesApi from "../../../utils/MoviesApi";

import testData from "../../../utils/testData";

function MoviesCardList({ type }) {
  const [movies, setMovies] = React.useState([]);
  // function testGetMovies() {
  //   setMovies(testData);
  // }
  async function getMovies() {
    const movies = await moviesApi.getMovies();
    setMovies(movies);
  }

  React.useEffect(() => {
    getMovies();
  }, []);
  return (
    <ul className="movie-card-list section" aria-label="Список фильмов">
      {movies.map((movie) => {
        return (
          <MoviesCard
            type={type}
            key={movie._id}
            name={movie.name}
            duration={movie.duration}
            link={movie.link}
          />
        );
      })}
    </ul>
  );
}

export default MoviesCardList;
