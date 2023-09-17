import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

import testData from "../../../utils/testData";

function MoviesCardList({ type }) {
  const [movies, setMovies] = React.useState([]);
  function testGetMovies() {
    setMovies(testData);
  }

  React.useEffect(() => {
    testGetMovies();
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
